// ################################################### //

// Chapter9 - JavaScript - Promises, async / await

function A() {
  console.log("Function A");
}

// function B() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("Function B");
//     }, 2000);
//   });
// }

function B(ok) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ok) {
        resolve("Function B OK");
      } else {
        reject("Function B Fails");
      }
    }, 2000);
  });
}

function C() {
  console.log("Function C");
}

// console.log(A());
// console.log(B());
// console.log(C());

// console.log(A());
// B().then((res) => console.log(res));
// console.log(C());

// console.log(A());
// B().then((res) => {
//   console.log(res);
//   console.log(C());
// });

// B(true)
//   .then((res) => console.log(res))
//   .catch((rej) => console.log(rej)); // Function B OK
// B(false)
//   .then((res) => console.log(res))
//   .catch((rej) => console.log(rej)); // Function B Fails

async function app() {
  console.log(A());
  try {
    console.log(await B());
  } catch (e) {
    console.log(e);
  }
  console.log(C());
}
app();
