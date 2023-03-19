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
  
  const insert = async ({ id: _id = ID.makeId(), ...commentInfo }) => {
    console.log('hit insert:', {_id, ...commentInfo})
    const db = await makeDb()
    const query = { _id, ...commentInfo }
    const result = await db.collection('tweets').insertOne(query)
    const insertedDoc = await db.collection('tweets').findOne({ _id: result.insertedId })

    console.log('result from inserting:', insertedDoc)
    const { _id: id, ...insertedInfo } = insertedDoc
    console.log('returning...', { id, ...insertedInfo })
    return { id, ...insertedInfo }
  }
    
  return Object.freeze({
    findByHash, 
    insert 
  })
}

export default buildSqlDb