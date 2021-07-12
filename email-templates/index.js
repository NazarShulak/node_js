const {
    mailActionsEnum: {
        WELCOME, DELETE, UPDATE
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
    }
};
