const fs = require('fs');

// Read the actual CSV file
const csvData = fs.readFileSync('app/app/data/quotes.csv', 'utf-8');
const lines = csvData.trim().split('\n');

const quotes = [];
const categoryCount = {};

console.log('Processing CSV file...');

// Skip the header row and process quotes
for (let i = 1; i < lines.length; i++) {
  if (i % 10000 === 0) {
    console.log(`Processed ${i} lines...`);
  }
  
  const line = lines[i];
  
  // Simple CSV parsing for most cases
  const match = line.match(/^"([^"]*(?:""[^"]*)*)","([^"]*(?:""[^"]*)*)","([^"]*(?:""[^"]*)*)"$/);
  
  if (match) {
    const quote = match[1].replace(/""/g, '"');
    const author = match[2].replace(/""/g, '"');
    const categoryString = match[3].replace(/""/g, '"');
    
    // Split categories and count them
    const categories = categoryString.split(',').map(cat => 
      cat.trim().toLowerCase().replace(/\s+/g, '-')
    ).filter(cat => cat.length > 0 && cat.length < 50);
    
    categories.forEach(category => {
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    
    // Store quote with primary category (first one)
    if (categories.length > 0) {
      quotes.push({
        quote: quote,
        author: author,
        category: categories[0]
      });
    }
  }
}

console.log(`\nFound ${quotes.length} quotes`);

// Get top 50 categories by count
const topCategories = Object.entries(categoryCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 50)
  .map(([category]) => category);

console.log(`\nTop 50 categories:`, topCategories);

// Filter quotes to only include top categories
const filteredQuotes = quotes.filter(quote => 
  topCategories.includes(quote.category)
).slice(0, 10000); // Limit to 10,000 quotes for performance

console.log(`\nFiltered to ${filteredQuotes.length} quotes from top categories`);

// Create data directory
const dataDir = 'app/app/public/data';
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Group by category
const categorizedQuotes = {};
filteredQuotes.forEach(quote => {
  if (!categorizedQuotes[quote.category]) {
    categorizedQuotes[quote.category] = [];
  }
  categorizedQuotes[quote.category].push(quote);
});

// Save all quotes
fs.writeFileSync(`${dataDir}/all-quotes.json`, JSON.stringify(filteredQuotes, null, 2));

// Save individual category files
Object.keys(categorizedQuotes).forEach(category => {
  const safeFilename = category
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const filename = `${dataDir}/${safeFilename}.json`;
  fs.writeFileSync(filename, JSON.stringify(categorizedQuotes[category], null, 2));
});

// Save categories
const finalCategories = Object.keys(categorizedQuotes).sort();
fs.writeFileSync(`${dataDir}/categories.json`, JSON.stringify(finalCategories, null, 2));

console.log(`\n✅ Successfully created optimized dataset:`);
console.log(`📊 Total quotes: ${filteredQuotes.length}`);
console.log(`📂 Categories: ${finalCategories.length}`);
console.log(`\n🏆 Top categories:`);
finalCategories.forEach(cat => {
  console.log(`   ${cat}: ${categorizedQuotes[cat].length} quotes`);
});