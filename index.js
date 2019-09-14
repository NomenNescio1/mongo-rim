const express = require('express');
const mongoc = require('mongoose');
const app = express();

var schema = mongoc.Schema({
    date: Date,
    name: {type:String, default: 'Anónimo'}
    //published: {type: Boolean, default: false}
});
var Visitor = mongoc.model('Visitor', schema);

/*var first = new Visitor({title: 'Articulo 1', body: 'cuerpo del articulo'});
first.save((err)=>{if(err)return console.log(err)}) */

mongoc.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', {useNewUrlParser:true,  useUnifiedTopology: true });

mongoc.connection.on('error', (e)=>{console.error(e)});


app.get('/', (req, res) => {
    var addMongo = new Visitor({date:Date.now(), name:req.query.name});
    addMongo.save((err)=>{
        if(err){
            return console.log(err)
        }
            else{
                res.send('<h1>El visitante fue almacenado con éxito</h1>')
            }
        });    
});


app.listen(3000, () => console.log('Listening on port 3000!'));