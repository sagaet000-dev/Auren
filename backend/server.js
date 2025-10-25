
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend'));

app.post('/api/chat', (req,res)=>{
  const {message, aiName, aiTone} = req.body;
  let reply = '';
  if(message.toLowerCase().includes('merhaba')){
    reply = `Merhaba! Sana nasıl yardımcı olabilirim?`;
  } else if(message.length < 20){
    reply = `İlginç, devam edelim.`;
  } else {
    reply = `Bu konuda düşündüm ve şunu söyleyebilirim: ${message.split(' ').reverse().join(' ')}`;
  }
  res.json({reply});
});

app.listen(3000, ()=>console.log('AUREN GPT backend 3000 portunda çalışıyor'));
