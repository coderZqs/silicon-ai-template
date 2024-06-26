import sequelizeConfig from "../config/sequelize";
import { Sequelize, DataTypes, Op } from "sequelize";

const sequelize = new Sequelize(
  sequelizeConfig.database as string,
  sequelizeConfig.username as string,
  sequelizeConfig.password as string,
  {
    dialect: sequelizeConfig.dialect as any,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    host: sequelizeConfig.host,
    port: sequelizeConfig.port,
    pool: sequelizeConfig.pool,
    define: sequelizeConfig.define,
    timezone: "+08:00",
    logging: console.log,
  }
);

export { sequelize, DataTypes, Op };
