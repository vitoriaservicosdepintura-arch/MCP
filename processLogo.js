const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function processLogo() {
    try {
        console.log("Lendo imagem...");
        const img = await loadImage('MPC-LOGO.jpg');

        let canvas = createCanvas(img.width, img.height);
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // If the pixel is close to black, make it transparent
            if (r < 60 && g < 60 && b < 60) {
                data[i + 3] = 0;
            } else {
                // If it's part of the logo, make it pure white to improve visibility
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;

                // Find bounding box to crop
                const x = (i / 4) % canvas.width;
                const y = Math.floor((i / 4) / canvas.width);
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }

        ctx.putImageData(imgData, 0, 0);

        // Crop to bounding box
        const width = maxX - minX + 1;
        const height = maxY - minY + 1;

        const cropCanvas = createCanvas(width, height);
        const cropCtx = cropCanvas.getContext('2d');
        cropCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);

        // Resize
        const targetHeight = 150;
        const targetWidth = Math.floor(width * (targetHeight / height));

        const finalCanvas = createCanvas(targetWidth, targetHeight);
        const finalCtx = finalCanvas.getContext('2d');
        finalCtx.drawImage(cropCanvas, 0, 0, width, height, 0, 0, targetWidth, targetHeight);

        console.log("Salvando arquivo final...");
        const buffer = finalCanvas.toBuffer('image/png');
        fs.writeFileSync('MPC-LOGO-TRANSPARENTE.png', buffer);
        console.log("Sucesso! MPC-LOGO-TRANSPARENTE.png criado.");
    } catch (e) {
        console.error(e);
    }
}

processLogo();
