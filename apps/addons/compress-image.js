/* eslint-disable */
const glob = require("glob");
const imagemin = require("imagemin");
const mozJpeg = require("imagemin-mozjpeg");
const optiPNG = require("imagemin-optipng");
const gifSicle = require("imagemin-gifsicle");
const svgo = require("imagemin-svgo");

const blob = "build_deploy/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}";

const compressImage = async (input, output) => {
  const files = await imagemin([input], {
    destination: output,
    plugins: [
      mozJpeg({
        quality: 82,
      }),
      optiPNG({ optimizationLevel: 4 }),
      svgo(),
      gifSicle(),
    ],
  });

  files.map((file) => {
    console.log(`✅ ${file.sourcePath} `);
  });
};

const compressAllImages = () => {
  console.log(`Compressing all images...`);
  glob(blob, function(er, files) {
    files.map((file) => {
      const input = file;
      const output = file.substring(0, file.lastIndexOf("/")) + "/";
      compressImage(input, output);
    });
  });
};

compressAllImages();
