const http = require("http");

const routes = require("./routes");

// function rqListener(req, res){
// }
// http.createServer(rqListener);

const server = http.createServer(routes.handler);

server.listen(5000);
