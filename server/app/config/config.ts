const config = {
  server: {
    port: process.env.SERVER_PORT,
  },
  db: {
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_port: process.env.DB_PORT,
    db_password: process.env.DB_PASSWORD,
  },
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expire: process.env.JWT_EXPIRE,
  },

  md5: {
    password: process.env.MD5_PASSWORD,
  },
};

export default config;
