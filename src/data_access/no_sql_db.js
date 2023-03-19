import ID from "../Id/index.js"

const buildSqlDb = ({ makeDb }) => {

  const getActiveTweetsByTweeter = async ({ tweeter }) => {
    console.log('hit find tweeter:', tweeter)
    const db = await makeDb()
    const query = { tweeter, isPublished: true, isDeleted: false }
    const result = await db.collection('tweets').find(query)
    const found = await result.toArray()
    console.log('found: ', found)
    if (!found.length) {
      return null 
    }

    return found.map(tweet => {
      tweet.id = tweet._id 
      delete tweet._id
      return tweet 
    })
  }

  const findByHash = async (hash) => {
    console.log('hit find by hash:', hash)
    const db = await makeDb()
    const query = { hash }
    const result = await db.collection('tweets').find(query)
    console.log('result: ', result)
    const found = await result.toArray()
    console.log('found: ', found)
    if (!found.length) {
      return null
    }
    const { _id: id, ...foundInfo } = found[0]
    console.log('returning...', { id, ...foundInfo})
    return { id, ...foundInfo }
  }

  const findById = async (findId) => {
    console.log('hit find by id:', findId)
    const db = await makeDb()
    const query = { _id: findId }
    const result = await db.collection('tweets').findOne(query)
    console.log('result: ', result)
    if (!result) {
      return null 
    }
    const { _id: id, ...foundInfo } = result
    console.log('returning...', { id, ...foundInfo})
    return { id, ...foundInfo }
  }

  const update = async ({ id: _id, ...updateInfo }) => {
    console.log('hit update by id:', _id)
    const db = await makeDb()
    const result = await db.collection('tweets').updateOne({ _id }, { $set: { ...updateInfo }})
    console.log('result: ', result)
    return result.modifiedCount > 0 ? { id: _id, ...updateInfo } : null
  }
  
  const insert = async ({ id: _id = ID.makeId(), ...insertInfo }) => {
    console.log('hit insert:', {_id, ...insertInfo})
    const db = await makeDb()
    const query = { _id, ...insertInfo }
    const result = await db.collection('tweets').insertOne(query)
    const insertedDoc = await db.collection('tweets').findOne({ _id: result.insertedId })

    console.log('result from inserting:', insertedDoc)
    const { _id: id, ...insertedInfo } = insertedDoc
    console.log('returning...', { id, ...insertedInfo })
    return { id, ...insertedInfo }
  }

  const remove = async ({ id: _id }) => {
    console.log('hit delete by id:', _id)
    const db = await makeDb()
    const result = await db.collection('tweets').deleteOne({ _id })
    console.log('result: ', result)
    return result.deletedCount > 0 
  }
    
  return Object.freeze({
    getActiveTweetsByTweeter,
    findByHash, 
    findById,
    update,
    insert,
    remove
  })
}

export default buildSqlDb