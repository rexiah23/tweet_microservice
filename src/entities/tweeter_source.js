const buildCreateTweeterSource = ({ isIpValid }) => {
  return function createTweeterSource ({
    ip, 
    browser, 
  }) {
    if (!ip) {
      throw new Error('Tweet Tweeter\'s ip address must be provided.')
    }

    if (!isIpValid(ip)) {
      throw new Error('Tweet Tweeter must have a valid id.')
    }
    
    if (!browser) {
      throw new Error('Tweet Tweeter\'s browser must be provided.')
    }

    return Object.freeze({
      getIp: () => ip, 
      getBrowser: () => browser 
    })
  }
}

export default buildCreateTweeterSource