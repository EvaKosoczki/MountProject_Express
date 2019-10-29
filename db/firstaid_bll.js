const db = require('./Database')

module.exports = class FirstAidDB {

  async getFaTips(id = '') {
    const result = await db.getData('firstaid', id);
    return result;
  }


}