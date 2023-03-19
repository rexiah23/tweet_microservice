import md6                      from 'md6-hash'
import buildCreateTweet         from "./tweet.js";
import buildCreateTweeterSource from "./tweeter_source.js";
import ID                       from "../ID/index.js";

console.log('MD6 :', md6)
//TODO - find libraries for each 
const isIpValid = (ipAddress) => { 
  console.log('Validating ip address...', ipAddress)
  console.log('ipAddress is valid')
  return true 
}

const sanitizeText = (text) => {
  console.log('Sanitizing tweet text...', text)
  console.log('Sanitized tweet text.')
  return text 
}

const isHashtagValid = (hashTag) => {
  console.log('Checking if hashtag is valid...', hashTag)
  console.log('Hashtag is valid.')
  return true 
}

const createTweeterSource = buildCreateTweeterSource({ isIpValid })
const createTweet = buildCreateTweet({ ID, md6, sanitizeText, isHashtagValid, createTweeterSource})

console.log('Created Tweet: ', createTweet)

export default createTweet 
