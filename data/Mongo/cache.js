const mongoose = require('mongoose');
const redis = require('redis');


const util = require('util');

const port_redis = process.env.REDIS_PORT;

const client = redis.createClient({
  port: '6379',
  host: '3.22.168.61'
});
client.on('connect', (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('redis connected');
  }
})
// client get does not support promises. this is a way to promisify them
client.hget = util.promisify(client.hget);


mongoose.Query.prototype.cache = function(hkey, options = { expire:20 }) {
  // if statement to only cache shoe id < 10000
  if(hkey < 10000 ) {
    this.useCache = true;
    this.expire = options.expire
    this.hashKey = JSON.stringify(hkey || '');
    return this;
  } else {
    this.useCache = false;
    return this;
  }

}


// We are storing the default exec() function in the exec variable
const exec = mongoose.Query.prototype.exec 

mongoose.Query.prototype.exec = async function(){ // Modifing the exec property of mongoose
    // this = mongoose.Query.prototype.exec
    // When useCache = false we should directly send the query to MongoDB and return the result to app.js
    if(!this.useCache){
        return exec.apply(this, arguments)
    }

  
    let key = JSON.stringify({...this.getQuery()});

    /* Querying the cache
     * if value for key exists then, cacheValue = data
     * else, cacheValue = null
    */
    const cacheValue = await client.hget(this.hashKey, key)
    
    // When data is found in redis cache
    if(cacheValue){
        const doc = JSON.parse(cacheValue)  // converting back to original datatype from string
        /* While storing data in redis we may store a single object or an array of objects. 
         * We need to convert normal json into mongoose model instance before returning to app.js, 
         * this.model() is used for this purpose
        */
        return  Array.isArray(doc)
                ? doc.map((d)=>new this.model(d))
                : new this.model(doc);
    }

    // Data not present in redis cache, get the data from Mongodb and save the data to redis cache also
    const result = await exec.apply(this, arguments) // using the default exec function

    // just some logic to check if the data for the required query is even present in the database
    if(result){ // mongodb retured non-null value (can be empty array)
        if(Array.isArray(result) && result.length==0){
            // array is empty
            return null
        }
        else{
            // data is there (non-empty array or an single object)
            client.hset(this.hashKey, key, JSON.stringify(result)); // saving data in redis cache
            return result
        }
    }else{ // database returned null value
        console.log("data not present")
        return null
    } 
}