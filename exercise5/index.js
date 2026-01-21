console.log("Start of program");

setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

setImmediate(() => {
  console.log("setImmediate callback");
});

process.nextTick(() => {
  console.log("process.nextTick callback");
});

Promise.resolve().then(() => {
  console.log("Promise callback");
});

console.log("End of program");