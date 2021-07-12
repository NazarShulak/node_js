const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {
    constants: { SYSTEM_MAIL, SYSTEM_MAIL_PASS },
    responseCodesEnum: { BAD_REQUEST }
} = require('../constants');
const { ErrorHandler, errorMessages: { WRONG_TEMPLATE } } = require('../errors');
const templateInfo = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SYSTEM_MAIL,
        pass: SYSTEM_MAIL_PASS
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const template = templateInfo[action];

        if (!template) {
            throw new ErrorHandler(BAD_REQUEST, WRONG_TEMPLATE.message, WRONG_TEMPLATE.customCode);
        }

        const html = await templateParser.render(template.templateName, context);

        return transporter.sendMail({
            from: 'No reply',
            to: userMail,
            subject: template.subject,
            html
        });
    } catch (e) {
        throw new ErrorHandler(BAD_REQUEST, e.message);
    }
};

module.exports = {
    sendMail
};
