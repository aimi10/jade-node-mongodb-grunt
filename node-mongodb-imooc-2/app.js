var express = require("express");
var port = process.env.PORT || 3000;
var app = express();
var path = require("path");

app.listen(port);
//服务器启动
console.log("server start success");
//路由配置
//静态资源路径
app.use(express.static(path.join(__dirname, "public")));
//静态页面路径
app.set("views", __dirname + "/views/pages");
app.set("view engine", "jade");
//主页,index
app.get('/', function (request, response1) {
    var http = require("http");
    //转发请求,请求第一页图片数据
    http.get("http://localhost:3000/indexContentImg/page=1", function (response2) {
        var body = '';
        response2.on('data', function (chunk) {
            body += chunk;
        });
        response2.on('end', function () {
            var fbResponse = JSON.parse(body);
            //渲染主页
            response1.render("index", {
                title: "首页",
                //处理导航
                pageIndexActive: "am-active",
                slides: [
                    {
                        img: "http://static.xiaomi.cn/xiaomicms/uploadfile/2015/0616/20150616115235599.jpg"
                    },
                    {
                        img: "http://static.xiaomi.cn/xiaomicms/uploadfile/2015/0616/20150616115107485.jpg"
                    }
                ],
                thumbnail: [
                    {
                        title: "小米Note 1300万镜头样片",
                        img: "http://static.xiaomi.cn/xiaomicms/uploadfile/2015/0126/20150126053636753.jpg",
                        summary: "小米Note 1300万镜头样片"
                    },
                    {
                        title: "小米Note 400万前置镜头美颜",
                        img: "http://static.xiaomi.cn/xiaomicms/uploadfile/2015/0126/20150126053756777.jpg",
                        summary: "小米Note 1300万镜头样片"
                    },
                    {
                        title: "小米Note手动曝光创意无限",
                        img: "http://static.xiaomi.cn/xiaomicms/uploadfile/2015/0126/20150126053842129.jpg",
                        summary: "小米Note 1300万镜头样片"
                    },
                    {
                        title: "小米Note全景扫描拍摄模式",
                        img: "http://static.xiaomi.cn/xiaomicms/uploadfile/2015/0126/20150126055151623.jpg",
                        summary: "小米Note 1300万镜头样片"
                    }
                ],
                imgdata: fbResponse,
                pretty: true
            });
        });
    });
});
//瀑布流图片加载
app.get("/indexContentImg/:page", function (request, response) {
    var params = request.params.page;
    response.send({
        imgdata: [
            {
                src: "http://www.aimi10.com/will/upload/1.jpg?time="
            },
            {
                src: "http://www.aimi10.com/will/upload/2.jpg?time="
            },
            {
                src: "http://www.aimi10.com/will/upload/3.jpg?time="
            },
            {
                src: "http://www.aimi10.com/will/upload/4.jpg?time="
            },
            {
                src: "http://www.aimi10.com/will/upload/5.jpg?time="
            },
            {
                src: "http://www.aimi10.com/will/upload/6.jpg?time="
            },
            {
                src: "http://www.aimi10.com/will/upload/7.jpg?time="
            }
        ]
    })
});
//后台,admin
app.get('/admin', function (request, response) {
    response.render("admin", {
        title: "后台",
        pageActiveActive: "am-active",
        pretty: true
    });
});


