const buildEditTweet = ({ editTweet }) => {
  return async function postTweet (httpRequest) {
    try {
      console.log('hit build post tweet!', httpRequest)
      
      const { source = {}, ...tweetInfo } = httpRequest.body 
      
      source.ip = httpRequest.ip 
      source.browser = httpRequest.headers['User-Agent']    
      
      console.log('source is this: ', source)
      const editResult = await editTweet({
        ...tweetInfo,
        source 
      })
      
      console.log('post result!', editResult)
      return { 
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200, 
        body: { editResult }
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

export default buildEditTweet