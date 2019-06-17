const { promisify } = require('util');
const GoogleSpreadsheet = require('google-spreadsheet');
require('dotenv').config();

// Google service account info(using dotenv)
const credentials = {
  type: `${process.env.TYPE}`,
  project_id: `${process.env.PROJECT_ID}`,
  private_key_id: `${process.env.PRIVATE_KEY_ID}`,
  private_key: `${process.env.PRIVATE_KEY.replace(/\\n/g, '\n')}`,
  client_email: `${process.env.CLIENT_EMAIL}`,
  client_id: `${process.env.CLIENT_ID}`,
  auth_uri: `${process.env.AUTH_URI}`,
  token_uri: `${process.env.TOKEN_URI}`,
  auth_provider_x509_cert_url: `${process.env.AUTH_PROVIDER_X509_CERT_URL}`,
  client_x509_cert_url: `${process.env.CLIENT_X509_CERT_URL}`
}

const mySheet = new GoogleSpreadsheet(`${process.env.GOOGLESPREADSHEET_ID}`);

// Column position in which target urls of Googlespreadsheet are written
const COL_URL = 2;

module.exports = async() => {
  const urls = [];

  await promisify(mySheet.useServiceAccountAuth)(credentials);
  const data = await promisify(mySheet.getInfo)();

  const option = {
    'min-row': 1,
    'max-row': 25,
    'return-empty': false,
  };

  // Get target urls and titles from Googlespreadsheet
  for(const worksheet of data.worksheets) {
    if(worksheet.title === 'シート1') {
      const cells = await promisify(worksheet.getCells)(option);

      for(let i = 0; i < cells.length; i++) {
        if(cells[i].col === COL_URL && cells[i].value) {
          urls.push([`${cells[i-1].value}`, `${cells[i].value}`]);
        }
      }
    }
  }

  return urls;
};
