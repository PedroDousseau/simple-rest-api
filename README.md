# simple-rest-api
Simple rest API project from balta.io course

#To get the app running, add a config.js file at src/ and set the below constants:

global.SALT_KEY = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem-vindo';

module.exports = {
    connectiongString: 'xxxxxx',
    sendgridKey: 'xxxxxx',
    containerConnectionString: 'xxx'
}
