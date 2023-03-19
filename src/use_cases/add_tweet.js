import createTweet from "../entities/index.js"

const buildAddTweet = ({ tweetDb, moderate }) => {
  console.log('tweet db from build adda tweet:', tweetDb)
  return async function addTweet(tweetInfo) {
    const tweet = createTweet(tweetInfo)

    const tweetExists = await tweetDb.findByHash(tweet.getHash())
    
    console.log('tweet Exists: ', tweetExists)
    if (tweetExists) {
      console.log('Tweet already exists in database')
      return tweet
    }
    
    const moderatedTweet = await moderate({ tweet })

    console.log('Tweet after moderation: ', moderatedTweet)
    return await tweetDb.insert({
      id: moderatedTweet.getId(),
      postId: moderatedTweet.getPostId(),
      replyToId: moderatedTweet.getReplyToId(),
      text: moderatedTweet.getText(),
      tweeter: moderatedTweet.getTweeter(),
      hashTags: moderatedTweet.getHashTags(),
      createdOn: moderatedTweet.getCreatedOn(),
      updatedOn: moderatedTweet.getUpdatedOn(),
      isPublished: moderatedTweet.isPublished(),
      isDeleted: moderatedTweet.isDeleted(),
      hash: moderatedTweet.getHash(),
    })
  }
}

export default buildAddTweet 