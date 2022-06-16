const crypt = require("crypto");
const secret = crypt.randomBytes(32).toString("hex");

const jwt = require("jsonwebtoken");

async function createToken(username) {
    return await jwt.sign({username}, secret, {expiresIn: "1h"});
}

async function verifyToken(token) {
    try {
        const payload = await jwt.verify(token, secret);
        return payload.username;
    } catch {
        return null;
    }
}

module.exports = {
    createToken,
    verifyToken
}
