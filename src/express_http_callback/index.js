const expressHttpCallback = (controller) => {
  return async (req, res) => {
    try {
      const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          'User-Agent': req.get('User-Agent')
        }
      }
      
      const response = await controller(httpRequest)
      
      if (response.headers) {
        res.set(response.headers)
      }
  
      res.type('json')
      res.status(response.statusCode).send(response.body)
      console.log('FINISHED')
    } catch (e) {
      res.status(500).send({ error: e.message || 'Can not process the request at this time. Please contact customer service.' })
    }


    // controller(httpRequest)
    // .then(response => {
    //   console.log('controller resp: ', response)
    //   if (response.headers) {
    //     res.set(response.headers)
    //   }

    //   res.type('json')
    //   res.status(response.statusCode).send(response.body)
    // })
    // .catch(e => {
    //   console.log('hit error of express htpp callback', e)
    //   res.status(500).send({ error: e.message || 'Can not process the request at this time. Please contact customer service.' })
    // })
  }
}

export default expressHttpCallback