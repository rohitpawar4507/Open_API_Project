const schedule = require('node-schedule');

//Define the date and time for run the task
const date = new Date(2023, 8, 22, 11, 46);

//Create a schedule rule
const job = schedule.scheduleJob(date, function(){
    console.log('Task is running at', new Date());
});

console.log('Task scheduled for', date);