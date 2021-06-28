const { userService } = require('../services');

module.exports = {
    getUserContent: async (req, res) => {
        const users = await userService.getAllUsers();
        res.json(users);
    },
    getUserById: (req, res) => {
        res.json(req.user);
    },
    createUser: async (req, res) => {
        await userService.createUser(req.body);
        res.json('user is successfully created ');
    },
    deleteUserById: async (req, res) => {
        const { userId } = req.params;
        await userService.deleteUser(userId);
        res.json('user is successfully deleted');
    },
    updateUserById: async (req, res) => {
        const { userId } = req.params;
        await userService.updateUser(userId, req.body);
        res.json('user info is successfully updated');
    }
};
