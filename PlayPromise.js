//const mysqltest = require('./src/workWithMySql.js');

/* setTimeout(() => {
  console.log('Timer is done!!');
}, 4000);
console.log('Hello');
console.log('Hi');  */
/*
 const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Done!');
      }, 1500);    });
    return promise;
  };
  
  setTimeout(() => {
    console.log('Timer is done!');
    fetchData()
      .then(text => {
        console.log(text);
        return fetchData();
      })
      .then(text2 => {
        console.log(text2);
      });
  }, 2000);
  
  console.log('Hello!');
  console.log('Hi!');   

  */
 /* let myFirstPromise = new Promise((resolve, reject) => {
    // Мы вызываем resolve(...), когда асинхронная операция завершилась успешно, и reject(...), когда она не удалась.
    // В этом примере мы используем setTimeout(...), чтобы симулировать асинхронный код. 
    // В реальности вы, скорее всего, будете использовать XHR, HTML5 API или что-то подобное.
    setTimeout(function(){
      resolve("Success!"); // Ура! Всё прошло хорошо!
    }, 250);
  });
  
myFirstPromise.then((successMessage) => {
    // successMessage - это что угодно, что мы передали в функцию resolve(...) выше.
    // Это необязательно строка, но если это всего лишь сообщение об успешном завершении, это наверняка будет она.
    console.log("Ура! " + successMessage);
});  */

//**************************My Promise */
/*
const dataFromDb = () => {
  const promiseDb = new Promise((resolve, reject) => {
    resolve(mysqltest.readFromDbCorrect());
    
  });
  return promiseDb;
};
 
dataFromDb().then((message) =>{console.log('records', message) } );

console.log('Hello!');
console.log('Hi!');   */

//*******************************RegExp */
const rx1 = /abc/;
console.log('Do you know  ahtung abf  aby abc?'.match(rx1));

const rx2 = new RegExp('abc');
console.log('Do you know abc?'.match(rx2));


const rx3 = /[a-z]+a[a-z]+/g;
const st3 = 'A man can die but once';
console.log(st3.match(rx3));

let st10 = 'A=4532015112830366';
let st11 = '256';
let st12 = 'A=1';
let st13 = 'C=453201511283e36656';
let st14 = 'B=4532015112837766';
let st15 = 'A=4532015112830345'

const rx8 = /^A=\d{16}$/;
const st8 = '+380661234567';
console.log('*****************************RegEXp******************************************');
console.log(st8.match(rx8));
console.log(st10.match(rx8));
console.log(st11.match(rx8));
console.log(st12.match(rx8));
console.log(st13.match(rx8));
console.log(st14.match(rx8));
console.log(st15.match(rx8));