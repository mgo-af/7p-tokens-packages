const fs = require('fs');
const { parse } = require('json2csv');

// Read JSON data from a file
const rawData = fs.readFileSync('Atlassian-Light.json'); // Replace 'data.json' with your JSON file path
const jsonData = JSON.parse(rawData);

// Initialize final result array
const finalResult = [];

// Recursive function to parse tokens
function parseTokens(tokens, parentScope) {
  if (tokens == null) {
    return;
  }
  const keys = Object.keys(tokens);

  keys.forEach((key) => {
    let scope = key;
    if (parentScope != '') {
      scope = parentScope + '.' + key;
    }

    if (tokens[key].value == undefined) {
      parseTokens(tokens[key], scope);
    } else {
      finalResult.push({
        atlassian_light_token_cleaned: scope,
        atlassian_value:
          typeof tokens[key].value == 'object'
            ? JSON.stringify(tokens[key].value)
            : tokens[key].value,
        atlassian_type: tokens[key].type,
        atlassian_description: tokens[key].description,
      });
    }
  });
}

// Function to get base object by path
function baseGet(object, path) {
  path = path.split('.');

  let index = 0,
    length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return index && index == length ? object : undefined;
}

// Parse tokens with initial scope
parseTokens(jsonData, '');

// Convert JSON to CSV
const csv = parse(finalResult, {
  fields: [
    'atlassian_light_token_cleaned',
    'atlassian_value',
    'atlassian_type',
    'atlassian_description',
  ],
});

// Write the CSV to a file
fs.writeFileSync('output.csv', csv);

console.log('CSV file has been created successfully.');
