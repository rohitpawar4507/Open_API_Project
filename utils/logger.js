const { createLogger, info } = require('winston');
const DailyRotateFile = require("winston-daily-rotate-file");
const config = require("config");
const winston = require("winston");

const logFormat = winston.format.combine(
    //winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
    info => `${info.timestamp}: ${info.level}: ${info.message}`,
),);

const transport = new DailyRotateFile({
    filename: config.get("logConfig.logFolder") +      config.get("logConfig.logFile"),
    datePattern: 'YYYY-MM-DD', // 'YYYY-MM-DD-HH'
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    prepend: true,
    level: config.get("logConfig.logLevel"),
});
transport.on('rotate', function () {
// call function like upload to s3 or on cloud
});


// Logging function
const logger = winston.createLogger({
    format: logFormat,
    transports: [
         transport,
         new winston.transports.Console({
               level: "info",
            //    prettyPrint : true,
            //    colorize    : process.stdout.isTTY,
            //    silent      : false,
            //    timestamp   : false,
            //    json        : false
            }),
    ]});

module.exports = { logger };
