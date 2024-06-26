import { Op, fn, col } from "sequelize";
import moment from "moment";
import fs from "fs";
import path from "path";

type GenerateSQLConfig = {
  op: "eq" | "like" | "between" | "find_in_set";
  value: string | number | string[] | number[];
  field: string;
};

export default {
  //  处理参数
  formatParams(rules) {
    let filterRules = rules.filter((v) => {
      if (v.op !== "between" && v.op !== "date") {
        return Boolean(v.value);
      } else {
        return (
          Array.isArray(v.value) && v.value.filter((t) => Boolean(t)).length
        );
      }
    });

    return filterRules;
  },

  /**
   * 动态生成sql语句
   * @params config
   * @returns
   */

  generateSQL(config) {
    let sql = {};

    config.map((v) => {
      switch (v.op) {
        case "eq":
          sql[v.field] = v.value;
        case "like":
          sql[v.field] = { [Op[v.op]]: v.value };
          break;
        case "between":
          sql[v.field] = { [Op[v.op]]: v.value };
          break;
        case "find_in_set":
          sql[Op.and] =  fn("FIND_IN_SET", v.value, col(v.field));
          break;
      }
    });

    return sql;
  },

  /**
   * 上传文件
   */

  async uploadFile(file) {
    return new Promise(async (resolve, reject) => {
      const reader = fs.createReadStream(file.filepath);
      const ext = file.originalFilename.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const stream = fs.createWriteStream(
        path.resolve(__dirname, `../../public/uploads/${fileName}`)
      );
      reader.pipe(stream);

      reader.on("end", () => {
        resolve({ fileName });
      });

      reader.on("error", () => {
        reject(0);
      });
    });
  },
};
