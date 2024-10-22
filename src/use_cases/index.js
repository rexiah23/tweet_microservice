import buildAddTweet       from "./add_tweet.js"
import createModerateTweet from "./moderate_tweet.js";
import tweetDb             from "../data_access/index.js"
import buildEditTweet      from "./edit_tweet.js";
import buildRemoveTweet    from "./remove_tweet.js";
import buildFetchTweets from "./fetch_tweets.js";
//TODO: Create real functions for below


const isSuspicious = (tweet) => {
  const randomNumber = Math.random()
  return randomNumber > 0.5 
}

const initiateReview = () => {
  console.log('hit initiate review')
}

const moderate = createModerateTweet({isSuspicious, initiateReview})

const fetchTweets = buildFetchTweets({ tweetDb })
const addTweet = buildAddTweet({ tweetDb, moderate }) 
const editTweet = buildEditTweet({ tweetDb, moderate })
const removeTweet = buildRemoveTweet({ tweetDb })

export { fetchTweets, addTweet, editTweet, removeTweet }
