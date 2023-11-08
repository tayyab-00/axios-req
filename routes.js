const fs = require('fs');

function handleHome(req, res) {
  fs.readFile('messages.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <div>
          <h2><p>${data}</p></h2>
        </div>
        <form action="/" method="POST">
          <input type="text" name="message" placeholder="Enter your message">
          <button type="submit">Submit</button>
        </form>
      `);
    }
  });
}

function handlePost(req, res) {
  let requestBody = '';
  req.on('data', (chunk) => {
    requestBody += chunk;
  });

  req.on('end', () => {
    const parts = requestBody.split('=');
    const newMessage = decodeURIComponent(parts[1]);

    console.log(newMessage);
    fs.writeFile('messages.txt', newMessage, 'utf8', (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.writeHead(302, { Location: '/' });
    res.end();
  });
}

module.exports = { handleHome, handlePost };
