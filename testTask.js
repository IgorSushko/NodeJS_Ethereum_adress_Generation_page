// this line should be moved to docker settings as ive tired to rewrite different folders
// im starting server from CURRENT folder - not outside
// you start from ./testTask (its even not in repo nothing like this - just your local folder name testTask etc
process.env.FILES_ROOT_FOLDER = '.';

const http = require('http');
const fs = require('fs');
const extnote = require('./src/operations.js');
const logfile = require('./src/workWithJson.js');
const mysqltest = require('./src/workWithMySql.js');
const etheriumtest = require('./src/workWithEthereum.js');

const settings = require('./src/settings');

function showHtml(response, answerValue, enteredValue, ethereumAddress) {
  response.writeHeader(200, { 'Content-Type': 'text/html' });
  fs.readFile(settings.TEMPLATE_PATH, 'utf8', (error, data) => {
    if (error) {
      throw error;
    }
    const replaced = data.toString()
      .replace('{answerValue}', answerValue)
      .replace('{enteredValue}', enteredValue)
      .replace('{EthereumAddress}', ethereumAddress);
    response.end(replaced);
  });
}


async function getRecords() {
  console.log('records', await mysqltest.readFromDbCorrect());
}
console.log('find records');
getRecords();

http.createServer((request, response) => {
  console.log(`Request was made :${request.url}`);
  console.log(`Request method :${request.method}`);

  if (request.method === 'GET') {
    if (settings.TEMPLATE_FILES[request.url]) {
      response.writeHeader(200, { 'Content-Type': settings.TEMPLATE_FILES[request.url].type });
      fs.createReadStream(settings.TEMPLATE_FILES[request.url].path).pipe(response);
    } else {
      showHtml(response, 'Your result will be shown here', ' ', '');
    }
  } else if (request.method === 'POST') {
    console.log(`Request method :${request.method}`);
    request.on('data', (chunk) => {
      const [showingResult, number] = extnote.parseAndCheckInput(chunk.toString());
      //const [xprv, xpub, walletAdress] = etheriumtest.generateWalleteAddress(number);
      const walletAdress = etheriumtest.generateWalleteAddress(number); 
      console.log('etherium walletAdress '+ walletAdress);
      showHtml(response, showingResult, number, walletAdress);
      logfile.saveToLogFile(showingResult, number);
      mysqltest.writeToDb(number, showingResult);
      // response.writeHead(200);
    }); // response.end(form);
  } else {
    response.writeHead(200);
    response.end();
  }
}).listen(settings.PORT);


// http://localhost:8080/


// example card number  == 4532015112830366
// https://www.npmjs.com/package/fast-luhn
