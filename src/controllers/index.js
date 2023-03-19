import buildPostTweet from "./post_tweet.js"
import { addTweet } from "../use_cases/index.js"

const postTweet = buildPostTweet({ addTweet })
const controller = Object.freeze({
  postTweet 
})

console.log('hit controller here!')
export default controller