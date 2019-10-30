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

  async getData(table, id = '') {
    if (id) {
      let sql = `
     SELECT *
     FROM ${table}
     WHERE id=${id} 
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





  /* async getMountains() {
     let sql = `
      SELECT Mountain,Height,Country,id
      FROM mountains
      `
     let result = await this.conn.query(sql);
     return result;
   };

   async getOneMountains(id) {
     let sql = `
      SELECT * 
      FROM mountains
      WHERE id=${id}
      `
     let result = await this.conn.query(sql);
     return result;
   };

   async getOneFA(mountainName) {
     let sql = `
     SELECT fa.FADate,fa.id,fa.Climbers,fa.peak FROM mountains AS m 
     INNER JOIN firstascent AS fa ON m.Mountain=fa.peak
     where fa.peak='${mountainName}'
     `
     let result = await this.conn.query(sql);
     return result
   };

   async readFirstAid() {
     let sql = `
     select * from firstaid`
     let result = await this.conn.query(sql);
     return result
   };

   async readOneCard(id) {
     let sql = `
     select * from firstaid 
     where id=${id}
     `
     let result = await this.conn.query(sql);
     return result
   };

   async readUserProfil(id) {
     let sql = `
     select * from userprofil 
     where id=${id}
     `
     let result = await this.conn.query(sql);
     return result;
   };

   async updateUserProfil(user) {
     let sql = `
         update userprofil
         set firstname='${user.firstname}',lastname='${user.lastname}',email='${user.email}',
         age=${user.age},country='${user.country}',city='${user.city}'
         where id=${user.id}
     `
     let result = await this.conn.query(sql);
     return result;
   };

   async createUser(user) {
     let sql = `
     INSERT INTO userprofil
       (firstname,lastname,email,age,country,city,password ) 
       values ('${user.firstname}','${user.lastname}','${user.email}',
       ${user.age},'${user.country}','${user.city}',SHA1('${user.password}'))
     `
     let result = await this.conn.query(sql);
     return result;
   }*/

}
const db = new DB();
module.exports = db