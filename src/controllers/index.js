import buildPostTweet from "./post_tweet.js"
import buildEditTweet from "./update_tweet.js"
import { addTweet, editTweet } from "../use_cases/index.js"

const postTweet = buildPostTweet({ addTweet })
const updateTweet = buildEditTweet({ editTweet })

const controller = Object.freeze({
  postTweet,
  updateTweet 
})

export default controller