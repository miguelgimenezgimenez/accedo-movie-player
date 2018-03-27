
module.exports = (error, req, res, next) => {
  switch (error.message) {
    default:
      res.status(500).send({ error: error.message })
  }
}
