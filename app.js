const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const Nexmo = require('nexmo')
const socketio = require('socket.io')
const port =3000;
const configs = require('./config/index') // a js file where your key and secret will be there
let app = express()

app.use(express.static(__dirname+'/public'))
app.use(bodyParser.json())
app.set('view engine','html')
app.engine('html',ejs.renderFile)
app.use(bodyParser.urlencoded({extended:true}))

const nexmo = new Nexmo({
  apiKey:configs.apiKey,//your api key
  apiSecret:configs.apiSecret // your api secret
},{debug:true})

app.get('/',(req,res)=>{
  res.render('index')
})

app.post('/',(req,res)=>{
  let number = req.body.number;
  let text = req.body.text;
  nexmo.message.sendSms(
    '8789737533',number, text, {type:'unicode'},
  (err,responseData)=>{
    if(err) console.log(err)
    else
    console.dir(responseData)
    //get data from response
    const data = {
      id: responseData.messages[0]['message-id'],
      number:responseData.messages[0]['to']
    }
    //emit to client
    io.emit('smsStatus',data)
  })})
  

const server = app.listen(port,()=>{console.log(`server started at ${port}`)})
const io=socketio(server)
io.on('connection',(socket)=>{
console.log('connected')
})
io.on('disconnect',()=>{
  console.log('disconnected')
})