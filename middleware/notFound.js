const notFound = (req, res) => {
    let url_parts = req.url;
    console.log(url_parts);
    res.status(404).send('Route does not exist')
}

module.exports = notFound