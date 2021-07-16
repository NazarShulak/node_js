module.exports = {
    userNormalizer: (userToNormalize = {}) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((filed) => {
            delete userToNormalize[filed];
        });

        return userToNormalize;
    }
};
