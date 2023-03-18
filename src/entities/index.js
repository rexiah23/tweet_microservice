import buildCreateTweet         from "./tweet";
import buildCreateTweeterSource from "./tweeterSource";
import ID                       from "../Id";

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
const createTweet = buildCreateTweet({ ID, sanitizeText, isHashtagValid, createTweeterSource})

console.log('Created Tweet: ', createTweet)

export default createTweet 
