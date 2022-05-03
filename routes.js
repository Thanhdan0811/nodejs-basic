const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.write('<html>')
        res.write('<head><title>My first nodejs page</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }
    if (url === '/message' && method === "POST") {
        // Event data sẽ được gọi mỗi khi 1 new chunk sẵn sàng được đọc.
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split("=")[1];
            // writeFileSync sẽ có thể làm block code
            // fs.writeFileSync('./message.txt', message);
            // fs.writeFile('./message.txt', "DUMMY");
            // fs.writeFileSync('./message.txt', "DUMMY");
            fs.writeFile("./message.txt", message, (err) => {
                console.log("ádlkfjsaldfjlsạdfljsaldf");
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            })
        })
    }
    res.setHeader("Content-type", "text/html");
    res.write('<html>')
    res.write('<head><title>My first nodejs page</title></head>')
    res.write('<body><h1>Hello from my nodejs</h1></body>')
    res.write('</html>')
    res.end();
 };


module.exports = {
    requestHandler,
    someText: "Some code test",
};

/*
    module.exports.handle = requestHandler;
*/ 