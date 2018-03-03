const numberInput = document.getElementById('number')
const textInput = document.getElementById('msg')
const button = document.getElementById('button')
const response = document.querySelector('.response')

button.addEventListener('click',send,false)
const socket = io();

socket.on('smsStatus',(data)=>{
response.innerHTML='<h5> Text message sent to '+data.number+' </h5>'
})
function send() {
  console.log('send');
  const number = numberInput.value.replace(/\D/g, '');
  const text = textInput.value;

  fetch('/', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({number: number, text: text})
  })
  .then(function(res){
    console.log(res);
  })
  .catch(function(err){
    console.log(err);
  });
}