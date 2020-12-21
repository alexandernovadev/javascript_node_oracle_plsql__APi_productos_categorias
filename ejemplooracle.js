const oracledb = require('oracledb');

// MANUAL 
//https://github.com/oracle/node-oracledb/blob/master/doc/api.md#refcursors
const con =  async()=> {

  let connection;
  
  try {
    connection = await oracledb.getConnection(  {
      user          : "INTEGRADOR_DB",
      password      : 'oracle',
      connectString : "DESKTOP-M966U1C/XEPDB1"
    });
    let binds = {
      cursor:  { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    };
    
    let b={
        max: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        min: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    }
    let sql = 'begin categoria_min_max(:max, :min); end;'
    let result = await connection.execute(sql, b);
    // console.log("RESULt: ", result);
    // console.log("sera ?: ", b);
    
    return result.outBinds;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

exports.con = con;