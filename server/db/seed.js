const { create } = require("domain");
cconst { client } = require("./client");


const createTables = async () => {
  try { 
    
    console.log('creating tables...'); 
  } catch(err)  { 
    console.log ('error creating tables', err);
  }
}


const synceAndSeed = async () => { 
  await client.connect();
  console.log('connected to the database'); 

  await client.end();
  console.log('disconnected from the database');  

}

  synceAndSeed(); 

  
