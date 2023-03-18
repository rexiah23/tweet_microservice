const expressHttpCallback = (controller) => {
  return async (req, res) => {
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

    const { headers, statusCode, body} = await controller(httpRequest)

    try {

      if (headers) {
        res.set(headers)
      }

      res.type('json')
      res.status(statusCode).send(body)

    } catch (e) {
      res.status(500).send({ error: 'Can not process the request at this time. Please contact customer service.' })
    }

  }
}

export default expressHttpCallback