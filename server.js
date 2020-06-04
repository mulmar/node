
import http from 'http';
import fs  from 'fs';
import url from 'url';

http.createServer(function (req, res){
	var q = url.parse(req.url, true);
	var filename = '.' + q.pathname;
	if (filename == "./") {filename = "./index";}
	filename = filename + ".html";
	fs.readFile(filename, function(err, data){
		if (err) {
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end('404 Not found');
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		return res.end();
	});
}).listen(process.env.PORT || 5000);

console.log('Server listening on Port 5000...');