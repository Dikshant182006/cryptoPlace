const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
)

const verifyGoogleToken = async (idToken) => {
    const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
        throw new Error('Invalid Google Token Payload');
    }

    if(!payload.email) {
        throw new Error('Google email is missing');
    }

    return {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        firstname: payload.given_name,
        lastname: payload.family_name,
        picture: payload.picture,
        emailVerified: payload.email_verified,
    }
}

module.exports = { verifyGoogleToken };
