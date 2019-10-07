const db = require('./Database')

module.exports = class MountDB {

  async getMountain(id = '') {
    const result = await db.getData('mountains', id);
    return result;
  }

  async getFirstAscent(condValue) {
    const result = await db.getDataFromJoined('mountains', 'firstascent', 'Mountain', 'peak', 'peak', condValue);
    return result;
  }
  //not ready
  async createMountData(table, columnNames, values) {
    const result = await db.creatData()
  }
}