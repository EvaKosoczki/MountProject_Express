const db = require('./Database')

module.exports = class MountDB {

  async getMountain(table, id = '') {
    const result = await db.getData(table, id);
    return result;
  }

  async getFirstAscent(table1, table2, t1column, t2column, condColumn, condValue) {
    const result = await db.getDataFromJoined(table1, table2, t1column, t2column, condColumn, condValue);
    return result;
  }


}