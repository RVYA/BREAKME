#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const entityName = process.argv[2];

if (!entityName) {
  console.error('Error: Please specify an entity name.');
  console.log('Usage: node scripts/create-entity.js <entity-name>');
  console.log('Example: node scripts/create-entity.js variants');
  process.exit(1);
}

const slug = entityName.toLowerCase().trim().replace(/\s+/g, '-');
const pascalName = slug
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');

const rootDir = path.join(__dirname, '..');
const configsDir = path.join(rootDir, 'configs');
const visualsDir = path.join(rootDir, 'visuals');

if (!fs.existsSync(configsDir)) {
  fs.mkdirSync(configsDir, { recursive: true });
}

if (!fs.existsSync(visualsDir)) {
  fs.mkdirSync(visualsDir, { recursive: true });
}

const configsSchemaPath = path.join(configsDir, 'configs.schema.json');
if (!fs.existsSync(configsSchemaPath)) {
  const configsSchemaContent = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'ConfigDefinitions',
    $defs: {
      RarityTier: {
        type: 'string',
        enum: ['common', 'uncommon', 'rare', 'legendary']
      }
    }
  };
  fs.writeFileSync(configsSchemaPath, JSON.stringify(configsSchemaContent, null, 2) + '\n', 'utf-8');
}

const jsonPath = path.join(configsDir, `${slug}.json`);
const schemaPath = path.join(configsDir, `${slug}.schema.json`);

if (!fs.existsSync(schemaPath)) {
  const schemaContent = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: `${pascalName}CatalogSchema`,
    type: 'object',
    required: ['$schema', 'items'],
    properties: {
      $schema: { type: 'string' },
      items: {
        type: 'array',
        items: {
          type: 'object',
          required: ['name', 'rarity'],
          properties: {
            name: { type: 'string' },
            rarity: { $ref: './configs.schema.json#/$defs/RarityTier' }
          }
        }
      }
    }
  };
  fs.writeFileSync(schemaPath, JSON.stringify(schemaContent, null, 2) + '\n', 'utf-8');
  console.log(` - Created configs/${slug}.schema.json`);
} else {
  console.log(` - Skipped configs/${slug}.schema.json (already exists)`);
}

if (!fs.existsSync(jsonPath)) {
  const jsonContent = {
    $schema: `./${slug}.schema.json`,
    items: []
  };
  fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2) + '\n', 'utf-8');
  console.log(` - Created configs/${slug}.json`);
} else {
  console.log(` - Skipped configs/${slug}.json (already exists)`);
}

const entityCssPath = path.join(visualsDir, `${slug}.css`);
if (!fs.existsSync(entityCssPath)) {
  fs.writeFileSync(entityCssPath, '', 'utf-8');
  console.log(` - Created visuals/${slug}.css`);
} else {
  console.log(` - Skipped visuals/${slug}.css (already exists)`);
}

const mainCssPath = path.join(visualsDir, 'visuals.css');
const importStatement = `@import "./${slug}.css";`;

let mainCssContent = '';
if (fs.existsSync(mainCssPath)) {
  mainCssContent = fs.readFileSync(mainCssPath, 'utf-8');
}

if (!mainCssContent.includes(importStatement)) {
  mainCssContent = mainCssContent.trim();
  if (mainCssContent.length > 0) {
    mainCssContent += '\n';
  }
  mainCssContent += `${importStatement}\n`;
  fs.writeFileSync(mainCssPath, mainCssContent, 'utf-8');
  console.log(` - Updated visuals/visuals.css with @import "./${slug}.css"`);
} else {
  console.log(` - Skipped visuals/visuals.css (@import already present)`);
}

console.log(`Finished processing entity "${slug}".`);
