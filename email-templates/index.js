const {
    mailActionsEnum: {
        WELCOME, DELETE, UPDATE, VERIFY
    }
} = require('../constants');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on board'
    },
    [DELETE]: {
        templateName: 'delete-account',
        subject: 'Account successful deleted'
    },
    [UPDATE]: {
        templateName: 'update-account',
        subject: 'Account successful updated'
    },
    [VERIFY]: {
        templateName: 'activate-account',
        subject: 'Activate account'
    }
};
