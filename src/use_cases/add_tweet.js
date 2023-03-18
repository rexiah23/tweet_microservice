import createTweet from "../entities"

const buildAddTweet = ({ tweetDb, moderate }) => {
  return async function addTweet(tweetInfo) {
    const tweet = createTweet(tweetInfo)

    const tweetExists = tweetDb.findByHash(tweet.getHash())

    console.log('Does tweet exist in database?:', tweetExists)

    if (tweetExists) {
      return tweet
    }

    console.log('Tweet exists in database.')

    const moderatedTweet = moderate({ tweet })

    console.log('Tweet after moderation: ', moderatedTweet)
    return tweetDb.insert({
      id: moderatedTweet.getId(),
      postId: moderatedTweet.getPostId(),
      replyToId: moderatedTweet.replyToId(),
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