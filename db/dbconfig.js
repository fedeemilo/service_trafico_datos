// Configuración para conectar a la base de datos de Oracle

module.exports = {

    user: process.env.NODE_ORACLEDB_USER,

    password: process.env.NODE_ORACLEDB_PASSWORD,

    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING,

  // Setting externalAuth is optional.  It defaults to false.  See:
  // https://oracle.github.io/node-oracledb/doc/api.html#extauth
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false

}