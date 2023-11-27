// Import the required packages
const express = require('express');
const app = express();

const { MNavLogger, SecStatus, SecType } = require('@juno/mnavlogging');

const logger = new MNavLogger('node_test_app')

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            text-align: center; /* Centers content of the body */
            margin-top: 20px; /* Adds some space at the top */
          }
          .button {
            background-color: red;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 25px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-top: 20px; /* Adds some space above the button */
          }
        </style>
      </head>
      <body>
        <h1>Server-side Test App</h1>
        <button id="toggle-button" class="button">Click me</button>
        <script>
          const button = document.getElementById('toggle-button');
          let color = 'red';
          button.addEventListener('click', () => {
            // Send a request to the server to toggle the color
            fetch('/toggle-color').then(response => {
              // Parse the response and toggle the button color
              response.text().then(newColor => {
                button.style.backgroundColor = newColor;
                color = newColor;
              });
            });
          });
        </script>
      </body>
    </html>
  `);
});


// Handle requests to toggle the button color
let currentColor = 'red';
app.get('/toggle-color', (req, res) => {
  if (currentColor === 'red') {
    currentColor = 'green';
    logger.setCorrelationId("1234ASDF")
    logger.diagInfo(`currentColor = green`)
    logger.diagInfo("999393", "another message")
    logger.secInfo('someCorrId', SecType.INPV, SecStatus.PASS, "security message")
  } else {
    currentColor = 'red';
    logger.diagInfo(`currentColor = red`)
    logger.secInfo('someCorrId', SecType.INPV, SecStatus.PASS, "security message")
  }
  res.send(currentColor);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});