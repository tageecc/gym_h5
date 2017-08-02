var express = require('express');
var router = express.Router();
var request = require('request');
var cache = require('memory-cache');
var sha1 = require('sha1');

const appid = 'wx9badfc3f854b3dac';
const secret = 'ac7c0370ab246dd5dd1b48af3a503ba4';
const noncestr = 'Wm3WZYTPz0wzccnW';
const grant_type = 'client_credential';
const accessTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token';
const ticketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket';
const cache_duration = 1000 * 60 * 60 * 24; //缓存时长为24小时

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.post('/wechat/sign', function (req, res, next) {
    var jsapi_ticket, timestamp = Math.floor(Date.now() / 1000),url=req.body.url; //精确到秒
    console.log('url:'+url);
    if (cache.get('ticket')) {
        jsapi_ticket = cache.get('ticket');
        res.json({code:1,data:{
            appid:appid,
            noncestr: noncestr,
            timestamp: timestamp,
            url: url,
            jsapi_ticket: jsapi_ticket,
            signature: sha1('jsapi_ticket=' + jsapi_ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url)
        }});
    } else {
        request(accessTokenUrl + '?grant_type=' + grant_type + '&appid=' + appid + '&secret=' + secret, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var tokenMap = JSON.parse(body);
                request(ticketUrl + '?access_token=' + tokenMap.access_token + '&type=jsapi', function (error, resp, json) {
                    if (!error && response.statusCode === 200) {
                        var ticketMap = JSON.parse(json);
                        cache.put('ticket', ticketMap.ticket, cache_duration);  //加入缓存
                        res.json({code:1,data:{
                            appid:appid,
                            noncestr: noncestr,
                            timestamp: timestamp,
                            url: url,
                            jsapi_ticket: ticketMap.ticket,
                            signature: sha1('jsapi_ticket=' + ticketMap.ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url)
                        }});
                    }
                })
            }
        })
    }
});
module.exports = router;
