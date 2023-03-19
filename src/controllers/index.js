import buildPostTweet       from "./post_tweet.js"
import buildEditTweet       from "./update_tweet.js"
import { addTweet, editTweet, removeTweet } 
                            from "../use_cases/index.js"
import buildDeleteTweet     from "./delete_tweet.js"

const postTweet = buildPostTweet({ addTweet })
const updateTweet = buildEditTweet({ editTweet })
const deleteTweet = buildDeleteTweet({ removeTweet })

const controller = Object.freeze({
  postTweet,
  updateTweet,
  deleteTweet
})

export default controller