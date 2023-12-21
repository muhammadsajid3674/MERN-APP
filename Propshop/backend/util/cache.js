import mongoose from 'mongoose';
import redis from 'redis';


const client = redis.createClient();
const exec = mongoose.Query.prototype.exec;

(async function () {
    await client.connect()
})()

mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');
    return this;
}

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        // console.log('NO CACHE');
        return exec.apply(this, arguments);
    }
    // console.log('I AM ABOUT TO RUN A QUERY');

    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));

    // * See if we have a value for 'key' in redis 
    const cacheValue = await client.hGet(this.hashKey, key);

    // * If we do, return that 
    if (cacheValue) {
        const doc = JSON.parse(cacheValue)
        return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc);
    }

    // * Otherwise, issue the query and store the result in redis 
    const result = await exec.apply(this, arguments);
    await client.hSet(this.hashKey, key, JSON.stringify(result))
    return result;
}

async function clearHash(hashKey) {
    await client.del(JSON.stringify(hashKey))
}

export {
    clearHash
}