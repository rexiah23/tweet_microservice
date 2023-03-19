const buildRemoveTweet = ({ tweetDb }) => {
  return async function removeTweet({ id }) {
    console.log('Removing tweet with id: ', id)
    if (!id) {
      throw new Error('Tweet must contain an id.')
    }
    
    const existingTweet = await tweetDb.findById(id)
    
    console.log('tweet Exists: ', existingTweet)
    if (!existingTweet) {
      console.log('Tweet does not exist. Cannot remove an non-existing tweet')
      throw new Error('Tweet does not exist.')
    }
    
    return await tweetDb.remove({ id: existingTweet.id })
  }
}

export default buildRemoveTweet 