const path = require('path');
const fs = require('fs');
const mariadb = require('mariadb');


class DB {
  constructor() {
    const pool = mariadb.createPool({
      database: 'mountains',
      user: 'root',
      password: 'root',
      connectionLimit: 5
    });
    pool.getConnection().then(conn => this.conn = conn)
  };

  async getData(table, condColumn = '', condValue = '') {
    if (condColumn) {
      let sql = `
     SELECT *
     FROM ${table}
     WHERE ${condColumn}='${condValue}' 
     `;
      let result = await this.conn.query(sql);
      return result;
    } else {
      let sql = `
     SELECT *
     FROM ${table}
     `;
      let result = await this.conn.query(sql);
      return result;
    };
  };

  async getDataFromJoined(table1, table2, t1column, t2column, condColumn, condValue) {
    let sql = `
    SELECT * 
    FROM ${table1} 
    INNER JOIN ${table2} ON ${table1}.${t1column}=${table2}.${t2column}
    where ${condColumn}='${condValue}'
    `
    let result = await this.conn.query(sql);
    return result
  };


  async creatData(table, data) {
    let sql = `
    INSERT INTO ${table} (`
    for (let [key, val] of Object.entries(data)) {
      sql += `${key},`
    }
    sql += `) VALUES (`
    for (let [key, val] of Object.entries(data)) {
      sql += `'${val}',`
    }
    sql += `)`
    sql = sql.replace(/,\)/g, ')');
    sql = sql.replace(/'SHA1/g, 'SHA1')
    sql = sql.replace(/'\)'/, '\')')
    console.log(sql)
    let result = await this.conn.query(sql);
    return result
  }

  async updateOne(table, data) {
    let sql = `
         update ${table}
         set `
    for (let [key, val] of Object.entries(data)) {
      sql += `${key}='${val}', `
    };
    sql += `where id=${data.id}
     `;
    sql = sql.replace(', where', ' where')
    console.log(sql)
    let result = await this.conn.query(sql);
    return result;
  };

  async deleteOne(table, id) {
    let sql = `DELETE FROM ${table} 
    WHERE id=${id}
    `;
    let result = await this.conn.query(sql);
    return result;
  }

  async checkLogin(table, data) {
    let sql = `SELECT * FROM ${table}
    WHERE email='${data.email}' AND passw=SHA1('${data.passw}')`;
    let result = await this.conn.query(sql);
    return result;
  }




}
const db = new DB();
module.exports = db