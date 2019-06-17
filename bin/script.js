const getSpreadsheetData = require("../lib/getSpreadsheetData.js");
const getLighthouseScore = require("../lib/getLighthouseScore.js");
const slackSend = require("../lib/slackSend.js");

(async () =>{
  let urls = await getSpreadsheetData();
  let params;

  for(let i = 0; i < urls.length; i++) {
    params = await getLighthouseScore(urls[i][1]);
    await slackSend(urls[i][0], params);
  }
})();
