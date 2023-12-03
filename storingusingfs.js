const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data', 'products.json');
const loadData = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) || [];
  } catch (error) {
    return [];
  }
};
const saveData = (data) => {
  const dataString = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, dataString, 'utf8');
};
let products = loadData();
saveData(products);
