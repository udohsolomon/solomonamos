const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputImage = path.join(__dirname, '..', 'public', 'profile.jpg');
const publicDir = path.join(__dirname, '..', 'public');

async function generateFavicons() {
  console.log('Generating favicons from profile image...');

  // Read the image and get dimensions
  const image = sharp(inputImage);
  const metadata = await image.metadata();

  // Calculate crop to make it square (center crop)
  const size = Math.min(metadata.width, metadata.height);
  const left = Math.floor((metadata.width - size) / 2);
  const top = Math.floor((metadata.height - size) / 2);

  // Create base square image
  const squareImage = image.extract({
    left,
    top,
    width: size,
    height: size
  });

  // Generate different sizes
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
  ];

  for (const { name, size: s } of sizes) {
    await sharp(inputImage)
      .extract({ left, top, width: size, height: size })
      .resize(s, s)
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Created ${name}`);
  }

  // Create ICO file (using 32x32 PNG as base)
  await sharp(inputImage)
    .extract({ left, top, width: size, height: size })
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Created favicon.ico');

  console.log('Done! Favicons generated in public folder.');
}

generateFavicons().catch(console.error);
