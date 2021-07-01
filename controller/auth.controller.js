module.exports = {
    // eslint-disable-next-line no-unused-vars
    login: (req, res, next) => {
        res.json(req.user);
    }
};
