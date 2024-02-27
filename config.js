const express = require('express');
const mongoose = require('mongoose');
uri = `mongodb+srv://satishjnvr:Satish%40123@cluster0.plcwh0h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const MdbConnect = ()=>{
    mongoose.connect(`${uri}/Nomad`)
    .then(()=>{
        console.log('Mongo databse Connected');
    })
    .catch((err)=>{
        console.error('Error Found ' +err);
    })
}

module.exports = MdbConnect;