module.exports = function (opts) {
        var time = opts.time || 100
        console.log("request_time:" + time);
        return function (req, res, next) {
                var timer = setTimeout(function() {
                        console.log('Too long', req.method, req.url);
                }, time);

                var end = res.end;
                res.end = function(chunk, encoding){
                        res.end = end;
                        res.end(chunk, encoding);
                        clearTimeout(timer);
                };
                next();
                console.log("request_time: End" );
        };
};