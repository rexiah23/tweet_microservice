const buildGetTweets = ({ fetchTweets }) => {
  return async function getTweets (httpRequest) {
    try {
      console.log('hit get tweets!', httpRequest)
      
      const { tweeter } = httpRequest.params 
      
      console.log('tweeter!:', tweeter)

      const tweetsResult = await fetchTweets({ tweeter })
      
      console.log('get tweets result!', tweetsResult)
      return { 
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200, 
        body: { tweetsResult }
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

export default buildGetTweets