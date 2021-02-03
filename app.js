const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
app.get('/', (req, res) => {
  (async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'json',port: chrome.port};
  const runnerResult = await lighthouse('https://example.com', options);
  const result= runnerResult.report;
  res.send(result)
  await chrome.kill();
})();	
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})