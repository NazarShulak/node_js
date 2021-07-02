module.exports = {
    login: (req, res) => {
        res.json(req.user);
    }
};
