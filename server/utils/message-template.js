function generateEmailTemplate(userName, resetURL) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .header {
          background-color: #3f51b5;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          background-color: white;
          padding: 20px;
          margin: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Email Header</h1>
      </div>
      <div class="content">
        <p>Hi ${userName},</p>
        <p>Click the button below to copy the URL: ${resetURL}</p>
        <button class="button" onclick="copyToClipboard('${resetURL}')">Copy URL</button>
      </div>
      <script>
        function copyToClipboard(text) {
          const tempInput = document.createElement('input');
          tempInput.value = text;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          alert('URL copied to clipboard!');
        }
      </script>
    </body>
    </html>
  `;
}
module.exports = generateEmailTemplate;
