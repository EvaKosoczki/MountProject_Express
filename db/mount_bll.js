const db = require('./Database')

module.exports = class MountDB {

  async getMountain(table, id = '') {
    const result = await db.getData(table, id);
    return result;
  }


}