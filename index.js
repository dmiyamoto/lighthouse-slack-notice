const express = require('express');

const webApp = express();
const webPORT = process.env.PORT || 8080;

webApp.listen(webPORT, (err) => {
  if (err) throw err;
  else console.log(`Listening on port ${webPORT}`);
});
