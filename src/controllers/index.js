import buildGetTweets       from "./get_tweets.js"
import buildPostTweet       from "./post_tweet.js"
import buildEditTweet       from "./update_tweet.js"
import buildDeleteTweet     from "./delete_tweet.js"
import { fetchTweets, addTweet, editTweet, removeTweet } 
                            from "../use_cases/index.js"

const getTweets = buildGetTweets({ fetchTweets })
const postTweet = buildPostTweet({ addTweet })
const updateTweet = buildEditTweet({ editTweet })
const deleteTweet = buildDeleteTweet({ removeTweet })

const controller = Object.freeze({
  getTweets,
  postTweet,
  updateTweet,
  deleteTweet
})

export default controller