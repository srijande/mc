'use strict';
const express = require('express');
const router = express.Router();
const minecraftServer = require('../server');

const executeCommand = async(command) => { 
  return await minecraftServer.send(command);
}

router.get('/', (req, res) => res.status(200).json({
	message: 'Healthy',
}));

router.get('/start', (req, res) => {

        try {
          minecraftServer.start();
          res.status(200).json({message: 'You turned me on (maybe 🤔).' });
        }
        catch(err){
          res.status(404).json({message: 'server couldnt be started' });
        }
    
});

router.get('/stop', (req, res) => {
  try {
    minecraftServer.stop();
    minecraftServer.isOnline = false;
  }
  catch(err){
    console.log(err)
    res.status(404).json({message: 'server couldnt be stopped' });
  }
});


module.exports = router;
