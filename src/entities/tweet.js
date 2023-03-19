const buildCreateTweet = ({ ID, md6, sanitizeText, isHashtagValid, createTweeterSource }) => {
  return function createText({
    id = ID.makeId(), 
    postId, 
    replyToId, 
    text, 
    tweeter, 
    source, 
    hashTags = [], 
    textMinLength = 12, 
    textMaxLength = 124, 
    published = false, 
    createdOn = Date.now(), 
    updatedOn = Date.now(), 
  } = {}) {

    if (!ID.isValid(id)) {
      throw new Error('Tweet must have a valid id.')
    }

    if (!postId) {
      throw new Error('Tweet must have a valid post id.')
    }

    if (replyToId && !ID.isValid(replyToId)) {
      throw new Error('Tweet has an invalid replyToId.')
    }

    if (!text || text.length < textMinLength) {
      throw new Error(`Tweet must be more than ${textMaxLength} characters.`)
    }

    if (text.length > textMaxLength) {
      throw new Error(`Tweet must be less than ${textMaxLength} characters.`)
    }
    
    if (!tweeter) {
      throw new Error('Tweet must be created by a valid Tweeter.')
    }

    if (hashTags && hashTags.some((hashTag) => !isHashtagValid(hashTag))) {
      throw new Error('Tweet cannot contain invalid hashtags.')
    }

    let sanitizedText = sanitizeText(text)

    if (!sanitizedText.length) {
      throw new Error('Tweet does not contain any acceptable text.')
    }

    const deletedText = 'This tweet has been deleted.'
    const deletedTweeter = 'deleted'

    const tweeterSource = createTweeterSource(source)
    
    let hash

    const makeHash = () => {
      return md6(
        id +
        postId + 
        sanitizedText + 
        tweeter
      )
    }

    return Object.freeze({
      getId: () => id, 
      getPostId: () => postId, 
      getReplyToId: () => replyToId, 
      getText: () => sanitizedText, 
      getTweeter: () => tweeter, 
      getTweeterSource: () => tweeterSource,
      getHashTags: () => hashTags,
      getCreatedOn: () => createdOn, 
      getUpdatedOn: () => updatedOn, 
      isPublished: () => published, 
      isDeleted: () => sanitizedText === deletedText, 
      getHash: () => hash || (hash = makeHash()),
      markAsDeleted: () => {
        sanitizedText = deletedText
        tweeter = deletedTweeter
      }, 
      publish: () => {
        published = true 
      }, 
      unPublish: () => {
        published = false 
      }
    })
  }
}

export default buildCreateTweet
