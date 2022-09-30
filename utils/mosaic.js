var TILE_WIDTH=10;
var TILE_HEIGHT=10;

function createMosaic() {
  var image = document.getElementById('image');
  var canvas = photomosaic(image);
  document.getElementById("output").appendChild(canvas);
};

// first function call to create photomosaic
function photomosaic(image) {

  // Dimensions of each tile
  var tileWidth = TILE_WIDTH;
  var tileHeight = TILE_HEIGHT;

  //creating the canvas for photomosaic
  var canvas = document.createElement('canvas');
  var context = canvas.getContext("2d");
  canvas.height = image.height;
  canvas.width = image.width;

  var imageData = context.getImageData(0, 0, image.width, image.height);
  var pixels = imageData.data;

  // Number of mosaic tiles
  var numTileRows = image.width / tileWidth;
  var numTileCols = image.height / tileHeight;


  //canvas copy of image
  var imageCanvas = document.createElement('canvas');
  var imageCanvasContext = canvas.getContext('2d');
  imageCanvas.height = image.height;
  imageCanvas.width = image.width;
  imageCanvasContext.drawImage(image, 0, 0);


  //function for finding the average color
  function averageColor(row, column) {
    var blockSize = 1, // we can set how many pixels to skip

      data, width, height,
      i = -4,
      length,
      rgb = {
        r: 0,
        g: 0,
        b: 0
      },
      count = 0;

    try {
      data = imageCanvasContext.getImageData(column * TILE_WIDTH, row * TILE_HEIGHT, TILE_HEIGHT, TILE_WIDTH);
    } catch (e) {
      alert('Not happening this time!');
      return rgb;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;

  }

  // Loop through each tile
  for (var r = 0; r < numTileRows; r++) {
    for (var c = 0; c < numTileCols; c++) {
      // Set the pixel values for each tile
      var rgb = averageColor(r, c)
      var red = rgb.r;
      var green = rgb.g;
      var blue = rgb.b;

      // Loop through each tile pixel
      for (var tr = 0; tr < tileHeight; tr++) {
        for (var tc = 0; tc < tileWidth; tc++) {

          // Calculate the true position of the tile pixel
          var trueRow = (r * tileHeight) + tr;
          var trueCol = (c * tileWidth) + tc;

          // Calculate the position of the current pixel in the array
          var pos = (trueRow * (imageData.width * 4)) + (trueCol * 4);

          // Assign the colour to each pixel
          pixels[pos + 0] = red;
          pixels[pos + 1] = green;
          pixels[pos + 2] = blue;
          pixels[pos + 3] = 255;
        };
      };
    };
  };

  // Draw image data to the canvas
  context.putImageData(imageData, 0, 0);
  return canvas;
}


