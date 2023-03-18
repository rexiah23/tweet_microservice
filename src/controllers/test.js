const buildTestController = () => {
  return function testController() {
    try {
      console.log('HIT TEST CONTROLLER!')
      const headers = {
        'Content-Type': 'application/json'
      }

      return { 
        headers, 
        statusCode: 200, 
        body: { test: true }
      }
    } catch (e) {
      console.log('error', e)

      return { 
        headers, 
        statusCode: 400, 
        body: { error: e.message }
      }
    }
  }
}

export default buildTestController