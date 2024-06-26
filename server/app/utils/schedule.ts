import schedule from "node-schedule";

class Interval {
  public unit_name: string;
  public maintain_time: number;
  public last_alarm: string;
  constructor({ unit_name, maintain_time, last_alarm }) {
    this.unit_name = unit_name; // 任务名字
    this.maintain_time = maintain_time; // 定时时间
    this.last_alarm = last_alarm || ""; // 上一次定时任务名字
  }

  // 生成新的定时任务
  async create(callback) {
    // 终止之前的定时任务
    if (this.last_alarm !== "") {
      this.delete();
    }
    schedule.scheduleJob(
      `${this.unit_name}`,
      `${this.maintain_time}`,
      callback
    );
  }

  // 删除定时任务
  delete() {
    if (schedule.scheduledJobs[this.unit_name]) {
      schedule.scheduledJobs[this.unit_name].cancel();
      return true;
    }
    return false;
  }

  // 找到一个定时任务
  findOne(name) {
    if (schedule.scheduledJobs[name]) {
      return schedule.scheduledJobs[name];
    } else {
      throw new Error("未找到任务名");
    }
  }

  // 查看所有的定时任务
  findAll() {
    return schedule.scheduledJobs;
  }
}

export default Interval;
