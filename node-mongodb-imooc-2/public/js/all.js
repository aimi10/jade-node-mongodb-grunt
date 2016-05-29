;
var aimi10 = aimi10 || {};
aimi10.domain = "http://192.168.1.105:3000";
/*
 *   其他区域图片加载
 *   @ options obj.page 当图片加载完成的时候,赋一个class
 *
 * */
$.fn.areaImageLoad = function (options) {
    var _default = {
        imgClass: "animation-opacity"
    }
    var opts = $.extend({}, _default, options);
    var $container = this;
    $container.imagesLoaded()
        .progress(function (instance, image) {
            $(image.img).addClass(opts.imgClass);
        });
}
/*
 *   瀑布流区图片加载
 *   @ options obj.page 第几页
 *
 * */
$.fn.pubuLoad = function (options) {
    var _default = {
        page: 1
    }
    var opts = $.extend({}, _default, options);
    var $container = this;
    $.ajax({
        url: aimi10.domain + "/indexContentImg/page=" + opts.page
    }).done(function (response) {
        var imgdata = response.imgdata;
        var items = "";
        for (var i = 0; i < imgdata.length; i++) {
            var src = imgdata[i].src;
            items += "<div class='aimi10-grid-item am-u-lg-3'><div class='am-thumbnail'><img src='" + src + "' /></div></div>";
        }
        $container.append($(items));
        //每张图片
        $container.imagesLoaded()
            .progress(function (instance, image) {
                //这里是能获取每张图片的宽和高耶!
                //console.log(arguments)
                //var width = image.img.clientWidth;//clientWidth和clientHeight不是每次都有的哦
                //var height = image.img.clientHeight;//当有缓存的时候,为0,没缓存的时候,为实际数值,src加了时间戳,就会有数值了
                //var width = image.img.width;//这个不受缓存影响,每次都会有数值
                var height = image.img.height;//这个不受缓存影响,每次都会有数值
                var $parentNode = $(image.img.offsetParent);
                $parentNode.height(height);
                var msnry = new Masonry($container[0], {//这里是dom,不是jquery对象
                    itemSelector: '.aimi10-grid-item',
                    //columnWidth: '.aimi10-grid-sizer',//css已经设置宽度了,所以不用这个了
                    initLayout: false,
                    //gutter: 10,//margin值
                    percentPosition: true,
                    fitWidth: true
                });
                msnry.on('layoutComplete', function (items) {
                    //$(image.img)这个就是element
                    $(image.img).addClass("animation-opacity");
                });
                msnry.layout();
            })
            .always(function (instance) {
                // console.log('all images loaded');
            })
            .done(function (instance) {
                //console.log('all images successfully loaded');
            })
            .fail(function () {
                // console.log('all images loaded, at least one is broken');
            });
    });
}
$(".aimi10-img-container").pubuLoad();
$("#topAd").areaImageLoad();
$("#centerAd").areaImageLoad();
/****************************************iscroll--start--**************************************************/


/****************************************iscroll--end--**************************************************/
