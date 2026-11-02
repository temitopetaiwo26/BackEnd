const http = require("http");

const server = http.createServer((req, res)=>{
res.writeHead(200, {"content-Type": "application/json"});
console.log("request received:", req.method, req.url);
res.end(JSON.stringify({ message: "Hello, World!"}));
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});