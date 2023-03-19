import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import buildNoSqlDb from './no_sql_db.js'

dotenv.config()
const uri = process.env.DB_URI
const dbName = process.env.DB_NAME

console.log('uri: ', uri)
console.log('dbName: ', dbName)


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: { w: "majority", j: true }
})

const makeDb = async () => {
  try {
    // if (!client.isConnected()) {
      const resp = await client.connect()
      console.log('Connected to mongodb server.', resp)
    // }
    const finalDb = client.db(dbName)
    console.log('finalDb: ', finalDb)
    return finalDb
  } catch(e) {
    console.log('erroasd', e)
  }
}

const tweetDb = buildNoSqlDb({ makeDb })

console.log('tweet db:', tweetDb)
export default tweetDb 
