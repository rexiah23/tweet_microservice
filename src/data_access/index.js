import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import buildNoSqlDb from './no_sql_db.js'

dotenv.config()
const uri = process.env.DB_URI
const dbName = process.env.DB_NAME

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: { w: "majority", j: true }
})

const makeDb = async () => {
  const resp = await client.connect()
  console.log('Connected to mongodb server.')
  const finalDb = client.db(dbName)
  return finalDb
}

const tweetDb = buildNoSqlDb({ makeDb })

export default tweetDb 
