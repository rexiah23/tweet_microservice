import dotenv from 'dotenv'
import mongodb from 'mongodb'
// import buildNoSqlDb from './no_sql_db'

const MongoClient = mongodb.MongoClient
const uri = process.env.DM_COMMENTS_DB_URI
const dbName = process.env.DM_COMMENTS_DB_NAME
const client = new MongoClient(uri, { useNewUrlParser: true })

const makeDb = async () => {
  try {
    dotenv.config()
    console.log('a')
    if (!client.isConnected()) {
      console.log('b')
      await client.connect()
    }
    console.log('c')
    return client.db(dbName)
  } catch(e) {
    console.log('erroasd', e)
  } finally {
    await client.close()
  }
}

makeDb().catch(console.log)

// const tweetsDb = buildNoSqlDb({ makeDb })

// export default tweetsDb
