const fs = require("fs");
const Jimp = require("jimp");

const squareSize = 500;
const picHeight = 848;
const picWidth = 640;

async function addLogoToImages() {
    const logoImage = await Jimp.read('./images/source/overlay.png')
    logoImage.opacity(1);

    const arrFileNames = fs.readdirSync("./images/uploads");
    for (const fileName of arrFileNames) {
        const image = await Jimp.read(`./images/uploads/${fileName}`);

        image.resize(picWidth, picHeight);
        console.log("Resizing " + fileName);

        image.composite(logoImage, 0, 0);
        console.log("Adding watermark to " + fileName);
        
        const imageFileName = "Stared_" + fileName;
        image.write("./images/new/" + imageFileName);
    }
}

addLogoToImages();