var static = require('node-static');

var file = new(static.Server)('./app');
var port = process.env.PORT || 5000;

require('http').createServer(function (request, response){
    request.addListener('end', function() {
        file.serve(request, response);
    });
}).listen(port);
