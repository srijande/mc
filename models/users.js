const mongoose = require('mongoose');

const users = new mongoose.Schema({
  
  externalID: { type: String, required: true, unique:true },
  minecraftUsername: { type: String, required:true, unique:true },
  createdAt: { type:Date, default:Date.now },
  serverPoints:{ type:Number, default:5 }, 
  lastCreditedAt:{ type:Date, default:Date.now },
  lastRaffledAt:{ type:Date, default:Date.now },
  RafflesOwned:{ type:Number, default:0 },
  didEnd:{ type:Boolean, default:false },
  connectionType:{type:String, required:true}

});

const UsersModel = mongoose.model('User', users);

//read
UsersModel.findUser = async function (object) {
   try {
      const query = { externalID : object.externalID, connectionType:object.connectionType }
      const user =  await UsersModel.find(query);

      if(user.length >= 1) { return {user:user[0],status:true}; } 
      else { return { user:{},status:true };}
   }
   catch(err) {
    console.log(err);
    return {user:{},status:false};
   }
};

UsersModel.findUserWithMinecraftUsername = async function (object) {
  try {
     const query = { minecraftUsername : object.minecraftUsername, connectionType:object.connectionType }
     const user =  await UsersModel.find(query);

     if(user.length >= 1) { return {user:user[0],status:true}; } 
     else { return { user:{},status:true };}
  }
  catch(err) {
   console.log(err);
   return {user:{},status:false};
  }
};

//create
UsersModel.addUser = async function (object) {
  try {
    
    const query = { externalID: object.externalID, connectionType:object.connectionType };
    
     const user =  await UsersModel.findUser(query);
    if(Object.keys(user.user).length < 1) {
      const newUser = new UsersModel({
        externalID:object.externalID,
        minecraftUsername:object.minecraftUsername,
        connectionType:object.connectionType
      })

      try {

        const addedUser = await newUser.save();
        return {user:addedUser,status:true};

      } catch(error) {
        console.log(error);
        return {user:{},status:false};
      }

    } 
    else { return {user:user.user,status:false};}
  }
  catch(err) {
   console.log(err);
   return {user:{},status:false};;
  }
};

//update
UsersModel.updateUser = async function (object) {
  
  try {
    const query = { externalID: object.externalID, connectionType:object.connectionType };
    const user = object;
    const updated = await UsersModel.findOneAndUpdate(query, user ,{new:true});
    return {user:updated,status:true};
  }
  catch(error) {
    console.log(error.codeName);
    if(error.codeName === 'DuplicateKey') {
      return {user:{},status:false};
    }
    return {user:{},status:false};
  }
};

//delete
UsersModel.deleteUser = async function (req) {

    try {
      const query = { externalID: object.externalID, connectionType:object.connectionType };
      const deletedUser = await UsersModel.findOneAndRemove(query);
      if(deletedUser) {
        return {user:deletedUser, status:true};
      } else {
        return {user:deletedUser, status:true};
      }
    } catch(error) {
      console.log(error);
      return {user:{}, status:false};
    }
};


module.exports = UsersModel;
