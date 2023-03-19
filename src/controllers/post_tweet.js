const buildPostTweet = ({ addTweet }) => {
  return async function postTweet (httpRequest) {
    try {
      console.log('hit build post tweet!', httpRequest)
      
      const { source = {}, ...tweetInfo } = httpRequest.body 
      
      source.ip = httpRequest.ip 
      source.browser = httpRequest.headers['User-Agent']    
      
      console.log('source is this: ', source)
      const postResult = await addTweet({
        ...tweetInfo,
        source 
      })
      
      console.log('post result!', postResult)
      return { 
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201, 
        body: { postResult }
      }
    } catch (e) {
      console.log('err from build post tweet', e)
        return {
          headers: {
            'Content-Type': 'application/json',
          },
          statusCode: 400, 
          body: {
            error: e.message
          }
        }  
    }
      


  }
} 

export default buildPostTweet