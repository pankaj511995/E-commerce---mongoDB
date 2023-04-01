const {MongoClient}=require('mongodb')
let _db;
const mongoClient=async(callback)=>{
    try{
        const result=await MongoClient.connect(process.env.URL_MONGO)
        _db=result.db ()
       
        callback('database connected')
    }catch(err){
        console.log('not able to create database ')
    }
}
const getDB=()=>{
    if(_db){
        return _db
    }else
         throw new Error('')
    
   
}
exports.mongoClient=mongoClient
exports.getDB=getDB
