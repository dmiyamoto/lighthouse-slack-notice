require('dotenv').config();

module.exports = (title, params) => {
  const https = require('https');

  const channel = `#${process.env.SLACK_CHANNEL}`;
  const text = `【${title} lighthouse score】 Performance：${params.Performance}、Best Practices：${params["Best Practices"]}、SEO：${params.SEO}、Progressive Web App：${params["Progressive Web App"]}`;
  const method = 'post';
  const username   = 'Lighthouse notice';

  const payload = {
    "channel": channel,
    "username": username,
    "text": text
  };

  const data = JSON.stringify(payload);

  const options = {
    hostname: 'hooks.slack.com',
    port: 443,
    path: `${process.env.SLACK_PATH}`,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const req = https.request(options, (res) => {
    console.log('status code : ' + res.statusCode);
    res.setEncoding('utf8');
    res.on('data', (d) => {
      console.log(d)
    });
  });

  req.on('error', (e) => {
    console.error(e)
  ;});

  req.write(data);
  req.end();
}
