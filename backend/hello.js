const moment = require('moment-timezone');

// Get the current time in Pakistan Standard Time (PKT)
const localTime = moment.utc().tz('Asia/Karachi');

// Add 15 minutes to the current time
const newTime = localTime.clone().add(15, 'minutes');

// Format the new time as desired
const formattedTime = newTime.format('YYYY-MM-DD HH:mm:ss');

console.log(formattedTime); // Output: 2024-05-02 00:07:00