const buildDeleteTweet = ({ removeTweet }) => {
  return async function deleteTweet (httpRequest) {
    try {
      console.log('hit build delete tweet!', httpRequest)
      
      const { source = {}, ...tweetInfo } = httpRequest.body 
      
      source.ip = httpRequest.ip 
      source.browser = httpRequest.headers['User-Agent']    
      
      console.log('source is this: ', source)
      const deleteResult = await removeTweet({
        ...tweetInfo,
        source 
      })
      
      return { 
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200, 
        body: { deleteResult }
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

export default buildDeleteTweet