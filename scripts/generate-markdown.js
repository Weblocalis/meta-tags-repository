const fs = require('fs');
const path = require('path');

// Paths
const jsonFilePath = path.join(__dirname, '../data/meta-tags.json');
const htmlFilePath = path.join(__dirname, '../index.html'); // Générer index.html à la racine

// Load JSON data
const metaData = require(jsonFilePath);

// Start building HTML content
let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>META Tags Documentation</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <div class="container">
        <h1>META Tags Documentation</h1>
        <p>This document is generated automatically from <strong>meta-tags.json</strong>.</p>
`;

// Iterate over each meta type in the JSON data
Object.keys(metaData.metaTypes).forEach((type) => {
  htmlContent += `<h2>${type.toUpperCase()}</h2>\n`;

  metaData.metaTypes[type].forEach(({ attribute, description }) => {
    // Generate the full meta tag
    const metaTag =
      type === "name"
        ? `<meta name="${attribute}" content="...">`
        : type === "http-equiv"
        ? `<meta http-equiv="${attribute}" content="...">`
        : `<meta property="${attribute}" content="...">`;

    // Add to HTML content
    htmlContent += `
        <h3>${attribute}</h3>
        <p>${description}</p>
        <div class="code-block">${metaTag}</div>
        <button class="copy-btn" onclick="copyToClipboard('${metaTag.replace(/"/g, '&quot;')}')">Copy</button>
        <hr>
    `;
  });
});

// Close the HTML structure
htmlContent += `
    </div>
    <script src="assets/js/scripts.js"></script>
</body>
</html>
`;

// Write HTML file
fs.writeFile(htmlFilePath, htmlContent, (err) => {
  if (err) {
    console.error('Error writing HTML file:', err);
  } else {
    console.log('HTML file generated successfully at root:', htmlFilePath);
  }
});