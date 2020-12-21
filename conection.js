const oracledb = require('oracledb');

// MANUAL 
//https://github.com/oracle/node-oracledb/blob/master/doc/api.md#refcursors
const con =  async(sql)=> {

  let connection;
  
  try {
    connection = await oracledb.getConnection(  {
      user          : "z",
      password      : 'oracle',
      connectString : "DESKTOP-M966U1C/XEPDB1"
    });
    
  // ESPIFICAR EL CURSOR
    let binds = {
      cursor:  { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    };
    let options = {
     outFormat: oracledb.OUT_FORMAT_OBJECT,
     
    };
    let result = await connection.execute(sql, binds);

    // console.dir(result.outBinds.cursor.getRows, { depth: null });
    const resultSet = result.outBinds.cursor;
    let row;
    let data = []
    while ((row = await resultSet.getRow())) {
      console.log(row);
      data.push(row);
    }
    
    // console.log("Metadata: ");
    // console.dir(result.metaData, { depth: null });
    // console.log("Query results: ");
    // console.dir(result.rows, { depth: null });
    // console.log(result.rows);
    
    // return result.rows;
    return data;
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