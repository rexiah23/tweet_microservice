import createTweet from "../entities/index.js"

const buildEditTweet = ({ tweetDb, moderate }) => {
  console.log('tweet db from build adda tweet:', tweetDb)
  return async function editTweet({ id, ...editedTweetInfo }) {

    if (!id) {
      throw new Error('Tweet must contain an id.')
    }

    if (!editedTweetInfo.text) {
      throw new Error('Tweet must contain text.')
    }
    
    const existingTweet = await tweetDb.findById(id)
    
    console.log('tweet Exists: ', existingTweet)
    if (!existingTweet) {
      console.log('Tweet does not exist. Cannot edit a non-existing tweet')
      throw new Error('Tweet does not exist.')
    }
    
    const editedTweet = createTweet({ ...existingTweet, ...editedTweetInfo, createdOn: existingTweet.createdOn })

    console.log('editedTweet: ', editedTweet)
    const moderatedTweet = await moderate({ tweet: editedTweet })

    console.log('Tweet after moderation: ', moderatedTweet)
    return await tweetDb.update({
      id: moderatedTweet.getId(),
      text: moderatedTweet.getText(),
      hashTags: moderatedTweet.getHashTags(),
      updatedOn: moderatedTweet.getUpdatedOn(),
      isPublished: moderatedTweet.isPublished(),
      hash: moderatedTweet.getHash(),
    })
  }
}

export default buildEditTweet 