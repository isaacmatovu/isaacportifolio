const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'src', 'images');
const optimizedDir = path.join(__dirname, 'src', 'images', 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir);
}

const optimizeImage = async (filename) => {
    if (!filename.match(/\.(jpg|jpeg|png)$/i)) return;
    
    const inputPath = path.join(imagesDir, filename);
    const outputPath = path.join(optimizedDir, filename);
    
    try {
        await sharp(inputPath)
            .resize(800, 600, { // Resize to reasonable dimensions
                fit: 'cover',
                position: 'center'
            })
            .webp({ quality: 80 }) // Convert to WebP format with 80% quality
            .toFile(outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
        
        console.log(`Optimized: ${filename}`);
    } catch (error) {
        console.error(`Error optimizing ${filename}:`, error);
    }
};

// Read and optimize all images
fs.readdir(imagesDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    
    files.forEach(file => {
        optimizeImage(file);
    });
});
