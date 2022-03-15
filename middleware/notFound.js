const notFound = (req, res) => {
   res.status(404).send(`${req.url} route does not exist`)
}

module.exports = notFound