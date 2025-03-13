const http = require("http");
const fs = require("fs");
const path = require("path");

// Define the port number
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
  // Remove the '/user' or any other dynamic route part from the request path for static files
  let requestedUrl = req.url;
  let filePath;

  console.log("requestedUrl", requestedUrl);
  // If the request is for a static file, serve it directly
  if (requestedUrl === "/") {
    filePath = path.join(__dirname, "public", "index.html");
    return serveFile(filePath, "text/html", res);
  }

  // If the request is for any static file (JS, CSS, etc.), serve it
  if (requestedUrl.includes("/router.js")) {
    // Rewrite the URL to '//router.js'
    requestedUrl = "/router.js";
  }
  const extname = path.extname(requestedUrl);
  let contentType = "text/html";

  if (extname === ".js") {
    contentType = "application/javascript";
  } else if (extname === ".css") {
    contentType = "text/css";
  }

  // If the requested URL is a static file (not a dynamic route like /user/*)
  if (extname === ".js" || extname === ".css") {
    filePath = path.join(__dirname, "public", requestedUrl);
    return serveFile(filePath, contentType, res);
  }

  // If the URL is a dynamic route like /user/*, serve the index.html page
  if (requestedUrl.startsWith("/user")) {
    filePath = path.join(__dirname, "public", "index.html");
    return serveFile(filePath, "text/html", res);
  };

  if(requestedUrl == '/contact' || requestedUrl == '/home' || requestedUrl == '/about'){
    filePath = path.join(__dirname, "public", "index.html");
    return serveFile(filePath, "text/html", res);
  }

  // If nothing matches, return 404
  res.statusCode = 404;
  res.end("404 Not Found");
});

// Function to serve the requested file
function serveFile(filePath, contentType, res) {
  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.statusCode = 404;
      res.end("404 File Not Found");
    } else {
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("500 Internal Server Error");
        } else {
          res.setHeader("Content-Type", contentType);
          res.statusCode = 200;
          res.end(data);
        }
      });
    }
  });
}

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
