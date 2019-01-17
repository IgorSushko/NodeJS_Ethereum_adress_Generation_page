const crypto = require('crypto');
const fs = require('fs');

function makeBankRandom(bankCardNumber) {
  const bankValue2 = bankCardNumber.toString().split('').reverse().join('');
  const bankSum = bankCardNumber + bankValue2;
  return bankSum;
}
// need to double this string
const bankValue = '4532015112830366';
//const bankValue2 = bankValue.split('').reverse().join('');
//const bankSum = bankValue + bankValue2;
console.log(bankValue);
console.log(makeBankRandom(bankValue));
const randomBytes = crypto.randomBytes(16);

console.log(randomBytes.map(hobby => hobby.toString()));
console.log(typeof randomBytes);
fs.writeFile('playJS.txt', randomBytes.toString('hex'), function (err) {
    if (err) 
        return console.log(err);
    console.log('Data in file');
});
// ********************************************************** */
//const digitArray =[58,12,39,81,4,19,14,32,69];
const digitArray = randomBytes;
let minDigit = digitArray[0];
let maxDigit = digitArray[0];
for (let i = 0; i < digitArray.length; i++) {
  if (maxDigit < digitArray[i])maxDigit = digitArray[i];
  if (minDigit > digitArray[i])minDigit = digitArray[i];
};
console.log('MaxDigit is: ' + maxDigit.toString());
console.log('MinDigit is: ' + minDigit.toString());