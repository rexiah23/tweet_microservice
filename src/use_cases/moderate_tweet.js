const createModerateTweet = ({ isSuspicious, initiateReview }) => {
  return async function moderateTweet ({ tweet }) {
    console.log('Moderating tweet...', tweet)
    // check if tweet is suspicious 
    const shouldModerate = await isSuspicious({
      ip: tweet.getTweeterSource().getIp(), 
      browser: tweet.getTweeterSource().getBrowser(),
      text: tweet.getText(),
      tweeter: tweet.getTweeter(), 
      createdOn: tweet.getCreatedOn(),
      modifiedOn: tweet.getModifiedOn()
    })

    console.log('Should we moderate tweet?: ', shouldModerate)
    const moderated = { ...tweet }
    // if tweet is suspicious, initiate review and unpublish the tweet 
    if (shouldModerate) {
      console.log('Moderating tweet...')
      initiateReview({ id: moderated.getId(), content: moderated.getText() })
      moderated.unPublish()
    } else {
      moderated.publish()
    }
    // if not, just return the tweet 
    return moderated
  }
}

export default createModerateTweet