module.paths.push('/usr/lib/node_modules');
const bip39 = require('bip39');
//const hdkey = require('ethereumjs-wallet/hdkey');
const Wallet = require('ethereumjs-wallet');
var EthUtil = require('ethereumjs-util');

function makeBankRandom(bankCardNumber) {
  const bankCardNumberStr = bankCardNumber.toString();
  const bankValue2 = bankCardNumberStr.split('').reverse().join('');
  const bankSum = bankCardNumber + bankValue2;
  return bankSum;
}

module.exports.generateWalleteAddress = (bankCardNumber) => {

  const randomBytes = makeBankRandom(bankCardNumber);
  const privateKeyBuffer = EthUtil.toBuffer(randomBytes.toString('hex'));
  const wallet = Wallet.fromPrivateKey(privateKeyBuffer);

  const publicKey = wallet.getPublicKeyString();
  console.log(publicKey);    
  const address = wallet.getAddressString();
  console.log('igorSu Adress'+ address);   
  const keystoreFilename = wallet.getV3Filename();
  console.log(keystoreFilename);  
  const keystore = wallet.toV3("PASSWORD");
  console.log(keystore); 
  return address;
};
