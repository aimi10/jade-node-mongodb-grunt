;
var am10 = am10 || {};
am10.domain = "http://192.168.1.108:3000";
(function (w) {
    var foo = function () {
        this.init();
    }
    foo.prototype = {
        constructor: foo,
        init: function () {
        },
        /*
         *   其他区域图片加载 
         *   @ param String container
         *   @ area String 区域参数,传给后台用的
         *   
         * */
        otherImgLoad: function (container) {
            var $container = $(container);
            $container.imagesLoaded()
                .progress(function (instance, image) {
                    $(image.img).addClass("animation-opacity")
                });
        },
        /*
         *   瀑布流区图片加载
         *   @ param String container
         *   @ page String 第几页
         * 
         * */
        imgload: function (container, page) {
            var $container = $(container);
            $.ajax({
                url: am10.domain + "/indexContentImg/page=" + page
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
                        var msnry = new Masonry(container, {
                            itemSelector: '.aimi10-grid-item',
                            columnWidth: '.aimi10-grid-sizer',
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
    }
    w.aimi10 = foo;
})(window);
var aimi = new aimi10();
$(function () {
    aimi.imgload(".aimi10-img-container", 1);
    aimi.otherImgLoad("#topAd");
    aimi.otherImgLoad("#centerAd");
})