// ################################################### //

// Chapter9 - JavaScript - Promises, async / await

function A() {
  console.log("Function A");
}

function B() {
  return setTimeout(() => {
    console.log("Function B");
  }, 2000);
}

function C() {
  console.log("Function C");
}

console.log(A());
console.log(B());
console.log(C());
