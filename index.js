const fs = require("fs");
const server = require("http").createServer();
server.on("request", (req, res) => {
    //request type 1
	// fs.readFile("./data/tours.json", (err, data) => {
	// 	if (err) console.error(err.message);
	// 	res.end(data)
	// });
    //request type 2
    //^ response not able to read as fast as the reading process is done !
    // const readable = fs.createReadStream("./data/test-file.txt")
    // readable.on('data',chunk=>{
    //     res.write(chunk)
    // })
    // readable.on("end",()=>{
    //     res.end()
    // })
    // readable.on('error',err=>{
    //     console.log(err)
    //     res.statusCode = 500
    //     res.end("File not Found")
    // })
    //With pipe operator we can handle the 'data' , 'end' and 'error' very easily
    //^we are now going to use the pipe operator
    const readable = fs.createReadStream('./data/test-file.txt')
    readable.pipe(res)
});
server.listen(8001,'127.0.0.1',()=>{
    console.log("listening to port : 8001 ___")
})
