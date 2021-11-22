const akismetClient = require('akismet-api');

const key = 'ef32823c37b3';
// const blog = 'https://meetyourdronacharya.netlify.app/';
const blog = 'http://localhost:3000';
const client = new akismetClient.AkismetClient({ key, blog });

async function verifyKey() {
    try {
        const isValid = await client.verifyKey();

        if (isValid) console.log('Valid key!');
        else console.log('Invalid key!');
    } catch (err) {
        console.error('Could not reach Akismet:', err.message);
    }
}

async function checkSpam(comment) {
    try {
        const isSpam = await client.checkSpam(comment);

        if (isSpam) {
            console.log('OMG Spam!');
            return true;
        } else {
            console.log('Totally not spam');
            return false;
        }
    } catch (err) {
        console.error('Something went wrong in checking spam:', err.message);
        return false;
    }
}

module.exports = { verifyKey, checkSpam };
