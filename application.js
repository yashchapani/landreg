var http = require('http');
var app = require('../landreg-hyperledger/application/app');

var id = 5;
var server = http.createServer(
    function (request, response) {
        var origin = (request.headers.origin || "*");
        if (request.method.toUpperCase() === "OPTIONS") {
            response.writeHead(
                "204",
                "No Content",
                {
                    "access-control-allow-origin": origin,
                    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "access-control-allow-headers": "content-type, accept",
                    "access-control-max-age": 10, // Seconds.
                    "content-length": 0
                }
            );
            return (response.end());
        }

        var requestBodyBuffer = [];
        request.on(
            "data",
            function (chunk) {
                requestBodyBuffer.push(chunk);
            }
        );

        request.on(
            "end",
            function () {
                var requestBody = requestBodyBuffer.join("");
                var obj = JSON.parse(requestBody);
                var param = [];
                if (obj.name === "issue") {
                    console.log(id);
                    obj.surveyId = id;
                    obj.owner = "government";
                    param.push(obj.surveyId.toString());
                    param.push(obj.owner);
                    param.push(obj.desc);
                    param.push(obj.price);
                    param.push(obj.area);
                    id++;
                }
                else if (obj.name === "sell") {
                    var date = new Date();
                    var dateStr = date.toString();
                    if (obj.cowner === "government") {
                        obj.name = "firstBuy";
                    }
                    else {
                        obj.name = "buy";
                    }
                    obj.surveyId = obj.id;
                    obj.date = dateStr;
                    param.push(obj.surveyId.toString());
                    param.push(obj.cowner);
                    param.push(obj.nowner);
                    param.push(obj.price);
                    param.push(obj.date);

                }
                else {// obj.name === "query"
                    obj.surveyId = obj.id;
                    param.push(obj.surveyId.toString());

                }
                app.main(obj.name, ...param).then((res) => {
                    var responseBody = res;
                    console.log('Issue program complete.');

                    console.log(responseBody);

                    response.writeHead(
                        "200",
                        "OK",
                        {
                            "access-control-allow-origin": origin,
                            "content-type": "application/json",
                            "content-length": responseBody.length
                        }
                    );

                    return (response.end(responseBody));
                }).catch((e) => {

                    console.log('Issue program exception.');
                    console.log(e);
                    console.log(e.stack);
                    // process.exit(-1);
                    response.writeHead(
                        "400",
                        "user error",
                        {
                            "access-control-allow-origin": origin,
                            "content-type": "application/json",
                            "content-length": responseBody.length
                        }
                    );
                    let responseBody = e;

                    return (response.end(responseBody));

                });

            }
        );
    }
);

server.listen(3000);