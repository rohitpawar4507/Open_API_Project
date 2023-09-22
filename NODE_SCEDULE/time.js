//Scheudule a task to run every day at specific time

const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();

rule.hour = 12; // at 1 PM
rule.minute = 5; // 5 minutes past the hour

const job = schedule.scheduleJob(rule, function(){
    console.log('Task is running at', new Date());
});