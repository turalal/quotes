const fs = require('fs');

// Read the actual CSV file
const csvData = fs.readFileSync('app/app/data/quotes.csv', 'utf-8');
const lines = csvData.trim().split('\n');

// Skip the header row
const quotes = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  
  // More sophisticated CSV parsing to handle complex quotes
  let inQuotes = false;
  let currentField = '';
  let fields = [];
  
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    
    if (char === '"') {
      if (inQuotes && line[j + 1] === '"') {
        // Escaped quote
        currentField += '"';
        j++; // Skip next quote
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      fields.push(currentField.trim());
      currentField = '';
    } else {
      currentField += char;
    }
  }
  
  // Add the last field
  fields.push(currentField.trim());
  
  if (fields.length >= 3) {
    const quote = fields[0];
    const author = fields[1];
    const categoryString = fields[2];
    
    // Split categories by comma and clean them up
    const categories = categoryString.split(',').map(cat => 
      cat.trim()
        .replace(/"/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
    ).filter(cat => cat.length > 0);
    
    // Create quote object for each category
    categories.forEach(category => {
      quotes.push({
        quote: quote.replace(/"/g, ''),
        author: author.replace(/"/g, ''),
        category: category
      });
    });
  }
}

// Create data directory in the app if it doesn't exist
const dataDir = 'app/app/public/data';
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Group by category
const categorizedQuotes = {};
quotes.forEach(quote => {
  if (!categorizedQuotes[quote.category]) {
    categorizedQuotes[quote.category] = [];
  }
  categorizedQuotes[quote.category].push(quote);
});

// Create all quotes file (split into smaller chunks due to size)
const chunkSize = 10000;
const chunks = [];
for (let i = 0; i < quotes.length; i += chunkSize) {
  chunks.push(quotes.slice(i, i + chunkSize));
}

// Save main quotes file
fs.writeFileSync(`${dataDir}/all-quotes.json`, JSON.stringify(quotes.slice(0, 5000), null, 2)); // First 5000 for main file

// Save chunks
chunks.forEach((chunk, index) => {
  fs.writeFileSync(`${dataDir}/quotes-chunk-${index + 1}.json`, JSON.stringify(chunk, null, 2));
});

// Create individual category files
Object.keys(categorizedQuotes).forEach(category => {
  // Sanitize filename
  const safeFilename = category
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100); // Limit length
  
  const filename = `${dataDir}/${safeFilename}.json`;
  
  try {
    fs.writeFileSync(filename, JSON.stringify(categorizedQuotes[category], null, 2));
  } catch (error) {
    console.log(`Skipped category: ${category} (${error.message})`);
  }
});

// Create categories index
const categories = Object.keys(categorizedQuotes).sort();
fs.writeFileSync(`${dataDir}/categories.json`, JSON.stringify(categories, null, 2));

console.log(`\nProcessed your CSV file successfully!`);
console.log(`Total quotes: ${quotes.length}`);
console.log(`Categories: ${categories.length}`);
console.log(`\nTop 10 categories by quote count:`);
categories
  .sort((a, b) => categorizedQuotes[b].length - categorizedQuotes[a].length)
  .slice(0, 10)
  .forEach(cat => {
    console.log(`- ${cat}: ${categorizedQuotes[cat].length} quotes`);
  });