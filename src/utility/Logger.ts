require("dotenv").config();

class Logger {
  private log4js;
  private logger;

  constructor() {
    this.log4js = require("log4js");
    this.log4js.configure({
      appenders: {
        default: {
          type: "file",
          filename: process.env.LOG_DIR + "/system.log",
          maxLogSize: 10485760,
          layout: { type: "pattern", pattern: "%d [%p] %m" },
        },
      },
      categories: { default: { appenders: ["default"], level: "debug" } },
    });
    this.logger = this.log4js.getLogger("default");
    this.logger.level = "debug";
  }

  connectLogger() {
    return this.log4js.connectLogger(this.logger);
  }

  info(message?: any, ...options: any[]) {
    var text = "";
    for (var i = 0; i < arguments.length; i++) {
      text += arguments[i];
    }
    this.logger.info(text);
  }

  warn(message?: any, ...options: any[]) {
    var text = "";
    for (var i = 0; i < arguments.length; i++) {
      text += arguments[i];
    }
    this.logger.warn(text);
  }

  error(message?: any, ...options: any[]) {
    var text = "";
    for (var i = 0; i < arguments.length; i++) {
      text += arguments[i];
    }
    this.logger.error(text);
  }
}

const logger = new Logger();

export default logger;
