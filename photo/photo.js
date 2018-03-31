/**
 2  * Created by soone on 17-9-2.
 3  */
 
 
  var photojs={
     page: 1,
    offset: 20,
    init: function () {
        var that = this;
        var imgurl = "/photo/output.json";
        $.getJSON(imgurl, function (data) {
             that.render(that.page, data);
            that.scroll(data);
        });
     },

     render: function (page, data) {
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
         var html, li = "";
         for (var i = begin; i < end && i < data.length; i++) {
            var filename = data[i].substring(0,data[i].lastIndexOf("."));
            li += '<div class="wall-li">' +
                 '<a class="show-pic lightbox soone'+page+'" href="'+CONFIG.resurl+'/static/photo/' + data[i] + '?raw=true" title="'+filename+'" rel="group">' +
                '<img class="img_loading" src="'+CONFIG.resurl+'/static/photo/' + data[i] + '?raw=true" title="'+filename+'" alt="'+filename+'">' +
                '</a></div>';
         }

         $(".img-box-ul").append(li);
         $('.soone'+page).find('img').lazyload({
            // placeholder: '/images/loading.gif',
             effect: 'fadeIn'
         });
         NexT.utils.wrapImageWithFancyBox1('.soone'+page);
        //瀑布流start
        $('.wall').jaliswall({ item: '.wall-li' });
         //瀑布流end
         $(".img_loading").load(function(){
             $(this).removeClass("img_loading");
         });
     },

     scroll: function (data) {
         var that = this;
         $(window).scroll(function() {
             var windowPageYOffset = window.pageYOffset;
             var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
             var sensitivity = 0;
 
             var offsetTop = $(".instagram").offset().top + $(".instagram").height();
 
             if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                 that.render(++that.page, data);
             }
         })
     }
 }
 photojs.init();
