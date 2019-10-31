const db = require('./Database')

module.exports = class FirstAidDB {

  async getFaTips(condColumn = '', id = '') {
    const result = await db.getData('firstaid', condColumn, id);
    return result;
  }


}