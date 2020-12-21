const oracledb = require('oracledb');

// MANUAL 
//https://github.com/oracle/node-oracledb/blob/master/doc/api.md#refcursors
const con =  async(sql,cursor)=> {

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
    

    // Si es true el segiundo parametro, devuelve un curso
    // Si no hace Insert, update o delete
    let rta;
    if(cursor){
      let result = await connection.execute(sql, binds);
      const resultSet = result.outBinds.cursor;
      let row;
      let data = []
      while ((row = await resultSet.getRow())) {
        data.push(row);
      }

      rta = data;

    }else if(!cursor){
      let extract_sql = sql.sql;
      let extract_binds = sql.binds;

      console.log('sql-> ', extract_sql);
      console.log('binds-> ', extract_binds);
      
      // let result = await connection.execute(extract_sql,
      //   {id: 777,
      //   nombre: 'Pelucche',
      // description: 'Descripto'}, 
      //   {autoCommit:true});
      let result = await connection.execute(extract_sql,extract_binds,
        {autoCommit:true});
      // rta = result.outBinds;
      let estado = result?true:false; 
      rta = estado;
      // console.log("entor al else", estado);
    }
    
    
    return rta;


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