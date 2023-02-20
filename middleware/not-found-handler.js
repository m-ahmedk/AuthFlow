/**
 * If user access a non existent page, they will be redirected to api-docs
 */

const pageNotFound = (req, res) => {
    res.redirect('/api-docs');
}

module.exports = pageNotFound;