module.paths.push('/usr/lib/node_modules');
const bip39 = require('bip39');
//const hdkey = require('ethereumjs-wallet/hdkey');
const Wallet = require('ethereumjs-wallet');
var EthUtil = require('ethereumjs-util');

function makeBankRandom(bankCardNumber) {
  const bankCardNumberStr = bankCardNumber.toString();
  const bankValue2 = bankCardNumberStr.split('').reverse().join('');
  const bankSum = bankCardNumber + bankValue2;
  console.log(bankSum);
  return bankSum;
}

module.exports.generateWalleteAddress = (bankCardNumber) => {

  const randomBytes = makeBankRandom(bankCardNumber);
  const mnemonic = bip39.entropyToMnemonic(randomBytes);
  //let hdwallet = hdkey.fromMasterSeed(mnemonic);
  //const publicKey = hdwallet.getPublicKeyString();
  //console.log(publicKey);
  //const xprv = hdwallet.privateExtendedKey();
  //const xpub = hdwallet.publicExtendedKey();
  //let walletAdress = hdwallet.generateWalleteAddress();
  //const walletAdress = hdwallet.getAddress();
  //console.log(walletAdress);
        //return [xprv, xpub, walletAdress];
       // return walletAdress;
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
      }