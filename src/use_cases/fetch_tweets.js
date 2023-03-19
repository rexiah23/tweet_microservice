const buildFetchTweets = ({ tweetDb }) => {
  return async function fetchTweets({ tweeter }) {

    if (!tweeter) {
      throw new Error('Please provide a valid tweeter.')
    }
    
    const tweetsResult = await tweetDb.getActiveTweetsByTweeter({ tweeter })
    
    if (!tweetsResult) {
      throw new Error('No valid tweets exist for this tweeter.')
    }

    return tweetsResult
  }
}

export default buildFetchTweets 