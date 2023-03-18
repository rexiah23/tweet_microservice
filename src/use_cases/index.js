import buildAddTweet       from "./add_tweet"
import createModerateTweet from "./moderate_tweet";

//TODO: Create real functions for below
const tweetDb = () => ({
  insert: (data) => {console.log('inserted tweet!'); return data},
  findByHash: (data) => {console.log('found tweet by hash!'); return data},
})

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
