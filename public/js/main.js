(function () {
    /*TMODJS:{"version":"1.0.0"}*/
    !function () {

        function template (filename, content) {
            return (
                /string|function/.test(typeof content)
                    ? compile : renderFile
            )(filename, content);
        };


        var cache = template.cache = {};
        var String = this.String;

        function toString (value, type) {

            if (typeof value !== 'string') {

                type = typeof value;
                if (type === 'number') {
                    value += '';
                } else if (type === 'function') {
                    value = toString(value.call(value));
                } else {
                    value = '';
                }
            }

            return value;

        };


        var escapeMap = {
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "&": "&#38;"
        };


        function escapeFn (s) {
            return escapeMap[s];
        }


        function escapeHTML (content) {
            return toString(content)
                .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
        };


        var isArray = Array.isArray || function(obj) {
                return ({}).toString.call(obj) === '[object Array]';
            };


        function each (data, callback) {
            if (isArray(data)) {
                for (var i = 0, len = data.length; i < len; i++) {
                    callback.call(data, data[i], i, data);
                }
            } else {
                for (i in data) {
                    callback.call(data, data[i], i);
                }
            }
        };


        function resolve (from, to) {
            var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
            var dirname = ('./' + from).replace(/[^/]+$/, "");
            var filename = dirname + to;
            filename = filename.replace(/\/\.\//g, "/");
            while (filename.match(DOUBLE_DOT_RE)) {
                filename = filename.replace(DOUBLE_DOT_RE, "/");
            }
            return filename;
        };


        var utils = template.utils = {

            $helpers: {},

            $include: function (filename, data, from) {
                filename = resolve(from, filename);
                return renderFile(filename, data);
            },

            $string: toString,

            $escape: escapeHTML,

            $each: each

        };


        var helpers = template.helpers = utils.$helpers;


        function renderFile (filename, data) {
            var fn = template.get(filename) || showDebugInfo({
                    filename: filename,
                    name: 'Render Error',
                    message: 'Template not found'
                });
            return data ? fn(data) : fn;
        };


        function compile (filename, fn) {

            if (typeof fn === 'string') {
                var string = fn;
                fn = function () {
                    return new String(string);
                };
            }

            var render = cache[filename] = function (data) {
                try {
                    return new fn(data, filename) + '';
                } catch (e) {
                    return showDebugInfo(e)();
                }
            };

            render.prototype = fn.prototype = utils;
            render.toString = function () {
                return fn + '';
            };

            return render;
        };


        function showDebugInfo (e) {

            var type = "{Template Error}";
            var message = e.stack || '';

            if (message) {
                // 利用报错堆栈信息
                message = message.split('\n').slice(0,2).join('\n');
            } else {
                // 调试版本，直接给出模板语句行
                for (var name in e) {
                    message += "<" + name + ">\n" + e[name] + "\n\n";
                }
            }

            return function () {
                if (typeof console === "object") {
                    console.error(type + "\n\n" + message);
                }
                return type;
            };
        };


        template.get = function (filename) {
            return cache[filename.replace(/^\.\//, '')];
        };


        template.helper = function (name, helper) {
            helpers[name] = helper;
        };


        if (typeof define === 'function') {define('templateModule',[],function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}

        /*v:1*/
        template('catalog',function($data,$filename
                                    /**/) {
            'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,i=$data.i,$escape=$utils.$escape,content=$data.content,$index=$data.$index,$out='';$out+='<p class="ct-menu-blue">央体体育</p> <p class="ct-menu-bold">赛事及经纪资源手册</p> <div class="ct-menu-divider"></div> <div class="ct-menu-body"> ';
            $each(data,function(value,i){
                $out+=' <div class="ct-menu-part" id="part';
                $out+=$escape(i+1);
                $out+='"> <p class="ct-menu-blue"> >';
                $out+=$escape(value.title);
                $out+='</p> ';
                $out+='<ul class="ls-menu"> ';
                $each(value.content,function(content,$index){
                    $out+=' <li class="item-menu" data-index=';
                    $out+=$escape(content.group[0].id);
                    $out+='>';
                    $out+=$escape(content.groupName);
                    $out+='</li> ';
                });
                $out+=' </ul> </div> ';
            });
            $out+=' </div> ';
            return new String($out);
        });/*v:1*/
        template('page',function($data,$filename
                                 /**/) {
            'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,i=$data.i,content=$data.content,page=$data.page,j=$data.j,$escape=$utils.$escape,btn=$data.btn,$out='';$each(data,function(value,i){
                $out+=' ';
                $each(value.content,function(content,i){
                    $out+=' ';
                    $each(content.group,function(page,j){
                        $out+=' <div class="ct-page" id=page';
                        $out+=$escape(page.id);
                        $out+=' data-index=';
                        $out+=$escape(page.index||i+j+1);
                        $out+=' data-title=';
                        $out+=$escape(value.title);
                        $out+='> <i class="logo" style=" width:';
                        $out+=$escape(page.logoWidth);
                        $out+='; height: ';
                        $out+=$escape(page.logoHeight);
                        $out+='; background-image: url(';
                        $out+=$escape(page.logoImg);
                        $out+='); background-size: ';
                        $out+=$escape(page.logoWidth);
                        $out+=' ';
                        $out+=$escape(page.logoHeight);
                        $out+='"></i> <img class="title" src=';
                        $out+=$escape(page.textImg);
                        $out+='></img> <a href="javascript:;" class="btn-hz" data-index=';
                        $out+=$escape(page.btn);
                        $out+='>';
                        $out+=$escape(btn[page.btn].btnName);
                        $out+='</a> <div class="bgImg" style="background-image: url(';
                        $out+=$escape(page.bgImg);
                        $out+=')"></div> </div> ';
                    });
                    $out+=' ';
                });
                $out+=' ';
            });
            $out+=' ';
            return new String($out);
        });

    }();
    define('slider',['zepto','templateModule'], function($, templateModule) {
        // 使用artTemplate
        $('#pages').html(templateModule('page', obj));

        var curPage = 0;
        var pages = $(".ct-page");
        var $opts = $("#ct-opts");

        var $title = $("#title"),
            $index = $("#txt-page");

        pages.on('touchstart', handleTouchStart, false);
        pages.on('touchmove', handleTouchMove, false);
        pages.on('touchend', handleTouchEnd, false);

        var xDown = null,
            yDown = null,
            xDiff = null,
            yDiff = null,
            pointStart = null;


        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
            xDiff = 0;
            pointStart = Date.now();
            $("#ct-menu").removeClass("show");
        };

        function handleTouchMove(evt) {
            evt.preventDefault();
            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            xDiff = xDown - xUp;
            yDiff = yDown - yUp;

        };

        function handleTouchEnd(evt) {
            if (Math.abs(xDiff) > Math.abs(yDiff) && Date.now() - pointStart < 200) {
                if (xDiff > 20) {
                    playNext();
                } else if (xDiff < -20) {
                    playPrev();
                }
            }
        }

        function playNext() {
            if ($(curPage).next().length>0) {
                sliderTo($(curPage).next());
            }
        }

        function playPrev() {
            if ($(curPage).prev().length>0) {
                sliderTo($(curPage).prev());
            }
        }
        function sliderTo(page) {
            if(Number.isInteger(page)){
                page = $("#page"+page);
            }
            $opts.addClass('show')
            pages.removeClass('show');
            page.show();

            page.prevAll().attr("class", 'ct-page moveOutLeft');
            page.attr("class", 'ct-page moveIn show');
            page.nextAll().attr("class", 'ct-page moveOutRight');

            curPage =page;

            $title.text(page.data("title"));
            $index.text((page.data("index")>9?page.data("index") : '0'+page.data("index")) + '#');
        }

        //扩展zepto的preAll方法
        $.fn.prevAll = function(selector) {
            var prevEls = [];
            var el = this[0];
            if (!el) return $([]);
            while (el.previousElementSibling) {
                var prev = el.previousElementSibling;
                if (selector) {
                    if ($(prev).is(selector)) prevEls.push(prev);
                } else prevEls.push(prev);
                el = prev;
            }
            return $(prevEls);
        };

        //扩展zepto的nextAll方法
        $.fn.nextAll = function(selector) {
            var nextEls = [];
            var el = this[0];
            if (!el) return $([]);
            while (el.nextElementSibling) {
                var next = el.nextElementSibling;
                if (selector) {
                    if ($(next).is(selector)) nextEls.push(next);
                } else nextEls.push(next);
                el = next;
            }
            return $(nextEls);
        };

        return {
            sliderTo: sliderTo
        }
    });

    define('popWindow',['zepto'], function(){
        var $modal = $("#ct-modal")[0];
        console.log($("#ct-modal")[0].className)
        $(".btn-hz").click(function(event){
            var btn = obj.btn[$(this).data("index")];
            $modal.className = "show";
            $(".ct-modal-body").css("backgroundImage", "url("+btn.bgImg+")")
                .css("backgroundSize",btn.ImgWidth+" "+btn.ImgHeight)
                .css("width",btn.ImgWidth)
                .css("height",btn.ImgHeight);

        })

        $(".btn-modal-close").click(function(e) {
            $modal.className = '';
        })
    });
    define('catalog',['zepto','slider','templateModule'], function($, slider, templateModule) {

        // 使用artTemplate
        $('#ct-menu').html(templateModule('catalog', obj));

        $("#ct-opts").click(function(e){
            e.stopPropagation();
            $("#ct-menu").toggleClass("show");
            // $("body").toggleClass("modal-open");
        });

        function menuShow(index) {
            $("#part"+index).addClass('show').ul;
        }

        menuShow(1)

        var $ctMenu = $(".ct-menu-part");
        $(".ct-menu-blue").click(function(event) {
            $ctMenu.removeClass('show');
            $(this).parent().addClass('show');
        });

        $("#ct-menu .item-menu").click(function(event) {
            $("#ct-menu").removeClass("show");
            slider.sliderTo($(this).attr('data-index')-0)
        });
    })
    ;
    define('music',['zepto'],function($) {
        var audio = document.getElementById('musicid');
        var $btnPlay = $("#icon-play");

        audio.src = "http://mat1.gtimg.com/sports/sports/skyfullofstars.mp3";
        // audio.addEventListener('canplaythrough', function(){
        // 	$btnPlay.addClass('playing');
        // }, false);

        $btnPlay.click(function(event) {
            $btnPlay.hasClass('playing')?audio.pause():audio.play();
            $btnPlay.toggleClass('playing');
        });

        return {
            play: function() {
                audio.play();
                $btnPlay.addClass('playing');
            }
        }
    });
    define('main',['zepto','slider','popWindow','catalog','music', 'finalboss'], function ($,slider ,popWindow, catalog, music, finalboss) {

        finalboss('BossId=3175&Pwd=1745364445&iQQ={QQ}&sUrl={URL}&pageType=SYSC&vertical=ZHTY&attribute=BUSS&sIp=&ftime=').start();

        $("#btn-zz").click(function(event) {
            $("#home").removeClass('show');
            slider.sliderTo(obj.data[0].content[0].group[0].id);
            music.play();
        });
        $("#btn-dl").click(function(event) {
            $("#home").removeClass('show');
            slider.sliderTo(obj.data[1].content[0].group[0].id);
            music.play();

        });
        $("#btn-jj").click(function(event) {
            $("#home").removeClass('show');
            slider.sliderTo(obj.data[2].content[0].group[0].id);
            music.play();
        });
        $("#btn-tyhd").click(function(event) {
            $("#home").removeClass('show');
            slider.sliderTo(obj.data[3].content[0].group[0].id);
            music.play();
        });
        $("#btn-tymt").click(function(event) {
            $("#home").removeClass('show');
            slider.sliderTo(obj.data[4].content[0].group[0].id);
            music.play();
        });
        $("#btn-tyblh").click(function(event) {
            $("#home").removeClass('show');
            slider.sliderTo(obj.data[5].content[0].group[0].id);
            music.play();
        });
        $("#home a").click(function(){
            $(".icon-cr").css("opacity","1");
            $(".icon-cr-t").css("top","42px");
            $(".icon-cr-b").css("bottom","0");
        });


        // share
        $(function(){
            var shareURL = "/wechat/sign";
            var location_href = location.href.split('#')[0];
            var shareData = {
                title: '央体体育产品和资源手册', // 分享标题
                desc: '最完整的央体体育自制赛事、俱乐部冠名赞助及代理产品和资源手册。', // 分享描述
                link: location_href, // 分享链接
                imgUrl: "http://gymh5.sportsdream.com/logo.png" // 分享图标
            };
            $.ajax({
                url: shareURL,
                type: "post",
                data: {
                    url: location_href
                },
                dataType: "json",
                success: function(res) {
                    var agu = res || {};
                    if (agu.code == 1) {
                        wx_callback(agu.data);
                    }
                }
            });
            function wx_callback(res) {
                var agu = res || {};
                wx.config({
                    appId: agu.appId,
                    timestamp: agu.timestamp,
                    nonceStr: agu.nonceStr,
                    signature: agu.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ]
                });
                wx.ready(function() {
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareTimeline(shareData);
                });
            }
        })
    });

// if (/(iPhone|Android|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  
// } else {  
//     window.location.href ="http://fo.stats.qq.com/live/index.htm"; 
// };  
    require.config({
        baseUrl:'./scripts/',
        waitSeconds: 5000,
        paths: {
            zepto: 'http://mat1.gtimg.com/libs/zepto/1.1.6/zepto',
            finalboss:'http://mat1.gtimg.com/libs/t/finalboss/0.1.4/finalboss.min',
            touch: 'touch'
        },
        shim: {
            zepto: {
                exports: '$'
            },
            touch: {
                deps: ['zepto']
            },
        }
    });
    require(['main']);

    define("config", function(){});

}());