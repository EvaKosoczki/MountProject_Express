const db = require('./Database')

module.exports = class LoginDB {
    async loginUser(data) {
        const result = await db.checkLogin('userprofil', data);
        return result;
    }

    async updateToken(data) {
        const result = await db.updateOne('userprofil', data);
        return result;
    }

}