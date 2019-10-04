const db = require('./Database')

module.exports = class FirstAidDB {

  async getFaTips(table, id = '') {
    const result = await db.getData(table);
    return result;
  }


}