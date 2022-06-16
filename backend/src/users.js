const users = [];

function addUser(user) {
    users.push(user);
}

function isUsernameTaken(username) {
    return users.some(user => user.username === username);
}

function isEmailTaken(email) {
    return users.some(user => user.email === email);
}

function getUserByUsernameOrEmail(usernameOrEmail) {
    return users.find(user => user.username === usernameOrEmail || user.email === usernameOrEmail);
}

function getUserByUsername(username) {
    return users.find(user => user.username === username);
}

module.exports = {
    addUser,
    isUsernameTaken,
    isEmailTaken,
    getUserByUsernameOrEmail,
    getUserByUsername
};
