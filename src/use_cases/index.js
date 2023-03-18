import buildAddTweet       from "./add_tweet"
import createModerateTweet from "./moderate_tweet";
import tweetsDb            from "../data_access";

//TODO: Create real functions for below


const isQuestionable = (tweet) => {
  const randomNumber = Math.random()
  return randomNumber > 0.5 
}

const initiateReview = () => {
  console.log('hit initiate review')
}

const moderateTweet = createModerateTweet({isQuestionable, initiateReview})
const addTweet = buildAddTweet({ tweetDb, moderate }) 

console.log('created add tweet: ', addTweet)
export default addTweet 
