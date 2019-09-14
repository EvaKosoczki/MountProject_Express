const path = require('path');
const fs = require('fs');
const mariadb = require('mariadb');


module.exports = class MountDB {
  constructor() {
    const pool = mariadb.createPool({
      database: 'mountains',
      user: 'root',
      password: 'root',
      connectionLimit: 5
    });
    pool.getConnection().then(conn => this.conn = conn)
  }

  async getMountains() {
    let sql = `
     SELECT Mountain,Height,Country,id
     FROM mountains
     `
    let result = await this.conn.query(sql);
    return result;
  }

  async getOneMountains(id) {
    let sql = `
     SELECT * 
     FROM mountains
     WHERE id=${id}
     `
    let result = await this.conn.query(sql);
    return result;
  }

  async getOneFA(mountainName) {
    let sql = `
    SELECT fa.FADate,fa.id,fa.Climbers,fa.peak FROM mountains AS m 
    INNER JOIN firstascent AS fa ON m.Mountain=fa.peak
    where fa.peak='${mountainName}'
    `
    let result = await this.conn.query(sql);
    return result
  }

  async readFirstAid() {
    let sql = `
    select * from firstaid`
    let result = await this.conn.query(sql);
    return result
  }

  async readOneCard(id) {
    let sql = `
    select * from firstaid 
    where id=${id}
    `
    let result = await this.conn.query(sql);
    return result
  }

  async readUserProfil(id) {
    let sql = `
    select * from userprofil 
    where id=${id}
    `
    let result = await this.conn.query(sql);
    return result;
  }

  async updateUserProfil(user) {
    let sql = `
        update userprofil
        set firstname='${user.firstname}',lastname='${user.lastname}',email='${user.email}',
        age=${user.age},country='${user.country}',city='${user.city}'
        where id=${user.id}
    `
    let result = await this.conn.query(sql);
    return result;
  }

}