const http = require("http");
const { constants } = require("http2");
const routes = require("./routes");

const server = http.createServer(routes);
server.listen(3000);
