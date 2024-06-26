import Config from "./config";

export default {
  database: Config.db.db_name,
  username: Config.db.db_user,
  password: Config.db.db_password,
  dialect: "mysql",
  host: Config.db.db_host,
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
  },
  logging: true,
};
