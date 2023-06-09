var app = {
    config: config || {},
    // 简单的点击实现元素展开和收缩的功能
    clickToggle: function(elea,eleb){
        $(elea).click(function(){
            if(!$(eleb).is(':visible')){
                $(this).addClass('clicked');
                $(eleb).slideDown();
            }else{
                $(this).removeClass('clicked');
                $(eleb).slideUp();
            }
        })
    },
    

    //返回顶部
    backTop: function(ele,time){
        $(ele).click(function () {
            $('html, body').animate({
                scrollTop:'0'
            },time);
        })
    },

    // 随机数字
    RndNum: function(n){
        var rand="";
        for(var i=0;i<n;i++)
            rand += Math.floor(Math.random()*10);
        return rand;
    },



    // tab 切换
    tabs: function(tabs, tab_box, _event) {
        $(tab_box).hide();
        $(tab_box).eq(0).show();
        $(tabs).eq(0).addClass('on');
        $(tabs).bind(_event,function(){
            $(this).addClass("on").siblings().removeClass("on");
            var _index = $(this).index();
            $(tab_box).eq(_index).show().siblings().hide();
        })
    },



    // 是否支持 placeholder 属性
    placeholderSupport: function () {
        return 'placeholder' in document.createElement('input');
    },
    // ie9 兼容 placeholder
    iePlaceholder: function () {
        $("[placeholder]").each(function(){
            var _this = $(this);
            _this.wrapAll('<div class="input-box"></div>');
            var left = _this.css("padding-left");
            _this.parent().append('<span class="placeholder" data-type="placeholder" style="left: ' + left + '">' + _this.attr("placeholder") + '</span>');
            if(_this.val() != ""){
                _this.parent().find("span.placeholder").hide();
            }
            else{
                _this.parent().find("span.placeholder").show();
            }
        }).on("focus", function(){
            $(this).parent().find("span.placeholder").hide();
        }).on("blur", function(){
            var _this = $(this);
            if(_this.val() != ""){
                _this.parent().find("span.placeholder").hide();
            }
            else{
                _this.parent().find("span.placeholder").show();
            }
        });
        // 点击表示placeholder的标签相当于触发input
        $("span.placeholder").on("click", function(){
            $(this).hide();
            $(this).siblings("[placeholder]").trigger("click");
            $(this).siblings("[placeholder]").trigger("focus");
        });
        $("input[name='checkcode']").css('width', '100%').parents('.input-box').css('display','inline-block');
    },
    // 防复制代码
    antiClone: function () {
        // 防止ctrl+C
        document.onkeydown = function (e) {
            var e = e || event;
            if (e.ctrlKey == 1 && e.keyCode == 67) {
                return false;
            }
        };
        // 阻止复制
        document.body.oncopy = function (){ return false; };
        //禁止选取
        document.body.onselectstart=document.body.oncontextmenu=function(){return false;};
    },

};