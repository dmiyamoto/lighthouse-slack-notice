const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

launchChromeAndRunLighthouse = (url, opts, config = null) => {
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      return chrome.kill().then(() => {
        return Object.entries(results.lhr.categories).reduce(
          (acc, [key, a]) => {
            return Object.assign({}, acc, { [a.title]: a.score * 100 });
          },
          {}
        );
      });
    });
  });
}

const opts = {
  port: 0,
  autoSelectChrome: true,
  chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
};

module.exports = url => {
  return launchChromeAndRunLighthouse(url, opts);
};
