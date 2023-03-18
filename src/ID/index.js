const ID = {
  makeId: () => {
    const id = Math.random(20) * 102030
    console.log('Making tweet id...', id)
    return id
  }
}

export default ID