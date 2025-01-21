const fs = require('fs');
const path = require('path');

// Paths
const jsonFilePath = path.join(__dirname, '../data/meta-tags.json');
const markdownFilePath = path.join(__dirname, '../docs/meta-tags.md');

// Load JSON data
const jsonData = require(jsonFilePath);

// Generate Markdown content
let markdownContent = `# META Tags Documentation\n\n`;
markdownContent += `This document is automatically generated from [meta-tags.json](../data/meta-tags.json).\n\n`;

Object.keys(jsonData.metaTypes).forEach((type) => {
  markdownContent += `## ${type.toUpperCase()}\n\n`;
  jsonData.metaTypes[type].forEach(({ attribute, description }) => {
    markdownContent += `- **${attribute}**: ${description}\n`;
  });
  markdownContent += `\n`;
});

// Write Markdown file
fs.writeFile(markdownFilePath, markdownContent, (err) => {
  if (err) {
    console.error('Error writing Markdown file:', err);
  } else {
    console.log('Markdown file generated successfully:', markdownFilePath);
  }
});