function simulateAndDisplay() {
    var inputFile = document.getElementById('uploadInput').files[0];
    var deficiencyType = document.getElementById('deficiencyType').value;

    simulateColorblindness(inputFile, deficiencyType, function(originalImageUrl, modifiedImageUrl) {
        displayModifiedImage(originalImageUrl, modifiedImageUrl);
    });
}


function simulateColorblindness(inputFile, deficiencyType, callback) {
    var img = new Image();
    img.onload = function() {
        var canvasOriginal = document.getElementById('originalCanvas');
        var ctxOriginal = canvasOriginal.getContext('2d');

        var canvasModified = document.getElementById('modifiedCanvas');
        var ctxModified = canvasModified.getContext('2d');

        var imgWidth = img.width;
        var imgHeight = img.height;

        canvasOriginal.width = imgWidth;
        canvasOriginal.height = imgHeight;
        ctxOriginal.drawImage(img, 0, 0, imgWidth, imgHeight);

        canvasModified.width = imgWidth;
        canvasModified.height = imgHeight;

        // Create a copy of the original image data
        var imageDataOriginal = ctxOriginal.getImageData(0, 0, imgWidth, imgHeight);
        var dataOriginal = imageDataOriginal.data;

        // Iterate through each pixel and simulate colorblindness
        for (var i = 0; i < dataOriginal.length; i += 4) {
            var red = dataOriginal[i];
            var green = dataOriginal[i + 1];
            var blue = dataOriginal[i + 2];

            // Simulate color deficiency based on the selected type
            if (deficiencyType === 'protanopia') {
                var grayValue = (red + green + blue) / 3;
                dataOriginal[i] = grayValue; // Set red channel to grayscale
                dataOriginal[i + 1] = grayValue; 
              
            } else if (deficiencyType === 'deuteranopia') {
                var grayValue = (red + green + blue) / 3;
                dataOriginal[i + 1] = grayValue;
            } else if (deficiencyType === 'tritanopia') {
                // Simulate Tritanopia (blue-blindness)
                var grayValue = (red + green + blue) / 3;
                dataOriginal[i + 2] = grayValue;
            }
        }

        // Display the modified image on the modified canvas
        ctxModified.putImageData(imageDataOriginal, 0, 0);
    };

    img.src = URL.createObjectURL(inputFile);
}




function displayModifiedImage(originalImageUrl, modifiedImageUrl) {
    var originalCanvas = document.getElementById('originalCanvas');
    var modifiedCanvas = document.getElementById('modifiedCanvas');
    
    var originalCtx = originalCanvas.getContext('2d');
    var modifiedCtx = modifiedCanvas.getContext('2d');
    
    var originalImg = new Image();
    originalImg.onload = function() {
        originalCtx.drawImage(originalImg, 0, 0);
    };
    originalImg.src = originalImageUrl;
    
    var modifiedImg = new Image();
    modifiedImg.onload = function() {
        modifiedCtx.drawImage(modifiedImg, 0, 0);
    };
    modifiedImg.src = modifiedImageUrl;
}
