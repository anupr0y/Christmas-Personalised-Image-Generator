// scripts.js
async function generateGreeting() {
    const senderName = document.getElementById('senderName').value;
    const recipientName = document.getElementById('recipientName').value;
    const message = document.getElementById('message').value;

    // Fetch an image from the backend with custom text
    const imageUrl = await fetchGeneratedImage(senderName, recipientName, message);

    const preview = document.getElementById('preview');
    preview.innerHTML = `<img src="${imageUrl}" alt="Generated Greeting">`;

    const downloadButton = document.getElementById('downloadButton');
    downloadButton.style.display = 'block';
}

async function fetchGeneratedImage(senderName, recipientName, message) {
    // Get a list of template images
    const templateImageUrls = [
        'templates/christmas_template_1.jpg',
        'templates/christmas_template_2.jpg',
        'templates/christmas_template_3.jpg',
        'templates/christmas_template_4.jpg',
        'templates/christmas_template_5.jpg',
        'templates/christmas_template_6.jpg',
        'templates/christmas_template_7.jpg',
        'templates/christmas_template_8.jpg',
        'templates/christmas_template_9.jpg',
        'templates/christmas_template_10.jpg',
        'templates/christmas_template_11.jpg',
        'templates/christmas_template_12.jpg',
        'templates/christmas_template_13.jpg',
        'templates/christmas_template_14.jpg',
        'templates/christmas_template_15.jpg',
        'templates/christmas_template_16.jpg',
        'templates/christmas_template_17.jpg',
        'templates/christmas_template_18.jpg',
        'templates/christmas_template_19.jpg',
        'templates/christmas_template_20.jpg',
        'templates/christmas_template_21.jpg',
        'templates/christmas_template_22.jpg',
        'templates/christmas_template_23.jpg',
        'templates/christmas_template_24.jpg',
        'templates/christmas_template_25.jpg',
        'templates/christmas_template_26.jpg',
        'templates/christmas_template_27.jpg',
        'templates/christmas_template_28.jpg',
        'templates/christmas_template_29.jpg',
        'templates/christmas_template_30.jpg',


        // Add more template image URLs as needed
    ];

    // Choose a random template image from the list
    const randomTemplateImageUrl = getRandomItem(templateImageUrls);

    // Load the chosen template image
    const templateImage = await loadImage(randomTemplateImageUrl);

    // Determine the canvas size based on the template image
    const canvas = document.createElement('canvas');
    canvas.width = templateImage.width;
    canvas.height = templateImage.height;

    // Get the 2D drawing context
    const ctx = canvas.getContext('2d');

    // Draw the template image onto the canvas
    ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height);

    // Set font and color for text
    // Sender name settings
    ctx.font = '28px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(senderName, canvas.width - ctx.measureText(senderName).width - 80, canvas.height - 200);



    // Recipient name settings
    ctx.font = '48px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(recipientName, canvas.width / 2, canvas.height / 2 + 100);

    // Message settings with word-wrapping
    ctx.font = '56px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    // ctx.fillText(message, canvas.width / 2, 700 - canvas.height / 2);

    // Function to apply CSS class to canvas text


    // Word-wrapping logic
    const maxLineWidth = canvas.width * 0.8;
    let words = message.split(' ');
    let line = '';
    let yPos =   canvas.height / 2 - 300;

    for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + ' ';
        let testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxLineWidth && i > 0) {
            ctx.fillText(line, canvas.width / 2, yPos);
            line = words[i] + ' ';
            yPos += 70; // Adjust this value for line spacing
        } else {
            line = testLine;
        }
    }

    ctx.fillText(line, canvas.width / 2, yPos);

    // Convert the canvas to a data URL (image)
    const imageUrl = canvas.toDataURL('image/jpeg');

    return imageUrl;
}

// Helper function to load an image asynchronously
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

// Helper function to get a random item from an array
function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// New function to trigger download
function downloadGreeting() {
    // Trigger the click event on the hidden download link
    const downloadLink = document.createElement('a');
    downloadLink.href = document.getElementById('preview').firstElementChild.src;
    downloadLink.download = 'Christmus_greeting_image.jpg';
    downloadLink.click();
}
