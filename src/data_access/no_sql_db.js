import ID from "../Id/index.js"

const buildSqlDb = ({ makeDb }) => {
  const findByHash = async (hash) => {
    console.log('hit find by hash:', hash)
    const db = await makeDb()
    const query = { hash }
    const result = await db.collection('tweets').find(query)
    console.log('result: ', result)
    const found = await result.toArray()
    console.log('found: ', found)
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...insertedInfo } = found[0]
    console.log('returning...', { id, ...insertedInfo})
    return { id, ...insertedInfo }
  }

  const findById = async (findId) => {
    console.log('hit find by id:', findId)
    const db = await makeDb()
    const query = { _id: findId }
    const result = await db.collection('tweets').findOne(query)
    console.log('result: ', result)
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
    
  return Object.freeze({
    findByHash, 
    findById,
    update,
    insert,
  })
}

export default buildSqlDb