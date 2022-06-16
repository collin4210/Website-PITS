const users = require('../users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser(username, email, password) {
    if (users.isEmailTaken(email)) {
        throw new Error('Email is already taken');
    }
    if (users.isUsernameTaken(username)) {
        throw new Error('Username is already taken');
    }
    const user = {
        username,
        email,
        password: await bcrypt.hash(password, saltRounds)
    };
    users.addUser(user);
    return user;
}

async function getUserByLogin(usernameOrEmail, password) {
    const user = users.getUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Password is incorrect');
    }
    return user;
}

function getUserByUsername(username) {
    return users.getUserByUsername(username);
}

module.exports = {
    createUser,
    getUserByLogin,
    getUserByUsername
};
