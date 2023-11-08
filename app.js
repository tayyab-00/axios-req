const http = require('http');
const url = require('url');
const { handleHome, handlePost } = require('./routes');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/') {
    if (req.method === 'GET') {
      handleHome(req, res);
    } else if (req.method === 'POST') {
      handlePost(req, res);
    }
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
