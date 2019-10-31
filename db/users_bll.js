const db = require('./Database')

module.exports = class UserDB {
  async getUsers(id = '') {
    const result = await db.getData('userprofil', id);
    return result;
  }
  async updateUserProfile(data) {
    const result = await db.updateOne('userprofil', data);
    return result;
  }

  async deleteUser(id) {
    const result = await db.deleteOne('userprofil', id);
    return result;
  }

  async createUser(data) {
    data.passw = `SHA1('${data.passw}')`;
    const result = await db.creatData('userprofil', data);
    return result;
  }

  /*async checkLogin(req){
    const result=await 
  }*/
}