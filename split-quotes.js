
const fs = require('fs');
const path = require('path');

// Read and parse CSV
const csvData = fs.readFileSync('quotes.csv', 'utf-8');
const lines = csvData.trim().split('\n');
const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));

// Parse CSV data
const quotes = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const match = line.match(/"([^"]*?)","([^"]*?)","([^"]*?)"/);
  if (match) {
    quotes.push({
      quote: match[1],
      author: match[2],
      category: match[3]
    });
  }
}

// Group by category
const categorizedQuotes = {};
quotes.forEach(quote => {
  if (!categorizedQuotes[quote.category]) {
    categorizedQuotes[quote.category] = [];
  }
  categorizedQuotes[quote.category].push(quote);
});

// Create data directory
if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}

// Create all quotes file
fs.writeFileSync('data/all-quotes.json', JSON.stringify(quotes, null, 2));

// Create individual category files
Object.keys(categorizedQuotes).forEach(category => {
  const filename = `data/${category}.json`;
  fs.writeFileSync(filename, JSON.stringify(categorizedQuotes[category], null, 2));
});

// Create categories index
const categories = Object.keys(categorizedQuotes).sort();
fs.writeFileSync('data/categories.json', JSON.stringify(categories, null, 2));

console.log(`Split ${quotes.length} quotes into ${categories.length} categories:`);
categories.forEach(cat => {
  console.log(`- ${cat}: ${categorizedQuotes[cat].length} quotes`);
});