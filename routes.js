const fs = require("fs");

function requestHandler(req, res){
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(`
      <html>
      <head><title>Home Pages</title></head>\
      <body>
        <form action="/message" method="POST">
          <input type="text" name="message">
          <input type="submit" value="Submit">
        </form>
      </body>
      </html>
    `);
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedData = Buffer.concat(body).toString();
      const message = parsedData.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<p>Hello from Node.js Server</p>");
  res.end();
}

module.exports = requestHandler;
