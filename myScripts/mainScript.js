const fs = require("fs");
const path = require("path");

const services = require("./data/konbert-export-56580e8638a74.json");

const params = [];
const objWithCorrectTypes = {};
const objWithCorrectNames = {};
const objWithCorrectAllParams = {};
const keysTable = {};

const allServices = services;

allServices.forEach((item) =>
  Object.keys(item).map((key) => {
    if (!params.includes(key)) {
      params.push(key);
      objWithCorrectTypes[key] = {
        type:
          typeof item[key] === "object"
            ? "json"
            : typeof item[key] === "boolean"
            ? "string"
            : typeof item[key],
      };
    }
  })
);

Object.keys(objWithCorrectTypes).map((item) => {
  const newName = [];
  [...item].map((letter) => {
    if (letter === "_") {
      return newName.push("_");
    }
    if (letter === ".") {
      return newName.push("_");
    }
    if (letter === letter.toUpperCase()) {
      newName.push("_");
    }
    return newName.push(letter.toLowerCase());
  });
  const correctName = newName.join("");
  keysTable[item] = correctName;
  objWithCorrectNames[correctName] = { type: "string" };
  objWithCorrectAllParams[correctName] = objWithCorrectTypes[item];
  return correctName;
});

fs.writeFile(
  "./myScripts/out/attributesFirstStep.json",
  JSON.stringify(objWithCorrectNames),
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
  }
);

fs.writeFile(
  "./myScripts/out/attributesSecondStep.json",
  JSON.stringify(objWithCorrectAllParams),
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
  }
);

const dataForImport = allServices.map((item) => {
  const newItem = {};
  Object.keys(item).forEach((key) => {
    newItem[keysTable[key]] = item[key];
  });
  return newItem;
});

fs.writeFile(
  "./myScripts/dataForImport/allServices.json",
  JSON.stringify(dataForImport),
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
  }
);

// fs.writeFile(
//   "./myScripts/out/dataForImport.json",
//   JSON.stringify(dataForImport),
//   (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   }
// );

// fs.writeFile(
//   "./myScripts/out/correctNamesForBase.json",
//   JSON.stringify(correctNamesForBase),
//   (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   }
// );

// correctNamesForBase.forEach((item) => {
//   obj[item] = { type: "string" };
// });

// fs.writeFile(
//   "./myScripts/out/attributesForSchema.json",
//   JSON.stringify(obj),
//   (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   }
// );
