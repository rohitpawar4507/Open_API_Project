const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();
rule.second = 0; // Run at the start of every minutes

const job = schedule.scheduleJob(rule, function(){
    console.log('Task is running at', new Date());
});