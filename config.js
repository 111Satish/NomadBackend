const express = require('express');
const mongoose = require('mongoose');
const RoomModel = require('./DataModels/rooms');
const uri = `mongodb+srv://satishjnvr:Satish%40123@cluster0.plcwh0h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//const uri = 'mongodb://localhost:27017/Nomad'; 

const MdbConnect = async () => {
    try {
        await mongoose.connect(uri);

        console.log('Mongo database Connected');
    } catch (error) {
        console.error('Error Found: ' + error);
    }
};

module.exports = MdbConnect;
