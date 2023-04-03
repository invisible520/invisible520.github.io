$(function () {
    // 手机端 到导航点击特效
    $(".xymob-menu-jt").click(function () {
        var xymobSubmenuBox = $(this).siblings('.xymob-sub-menu');
        var xymobSubmenuSiblingsBox = $(this).parents('li').siblings('li').find('.xymob-sub-menu');
        var xymobSubmenuSiblingsJt = $(this).parents('li').siblings('li').find('.xymob-menu-jt');
        if(!xymobSubmenuBox.is(":visible")){
            $(this).addClass('clicked');
            xymobSubmenuBox.slideDown();
            xymobSubmenuSiblingsJt.removeClass('clicked');
            xymobSubmenuSiblingsBox.slideUp();
        }else {
            $(this).removeClass('clicked');
            xymobSubmenuBox.slideUp();
        }
    });

    //导航条固定在头部
    if($(window).scrollTop() > 30){
        $('.xy-head').addClass('scroll');
    }
    $(window).scroll(function () {
        var len = $(this).scrollTop();
        if (len > 30) {
            $('.xy-head').addClass('scroll');
        }else{
            $('.xy-head').removeClass('scroll')
        }
    });

    //返回顶部
    app.backTop(".xymob-page-backtop",300);

    // 搜索框判断
    $("input[name='wd']").each(function () {
        var _plac = $(this).attr('placeholder');
        $(this).focus(function () {
            $(this).attr('placeholder','');
        });
        $(this).blur(function () {
            $(this).attr('placeholder', _plac);
        });
    });

    /* 内页共用js代码 */

    // 内页左侧导航栏点击特效
    $(".first-nav-btn").click(function () {
        var boxa = $(this).siblings('.xypg-left-subnav');
        var parbox = $(this).parents('li');
        var parSibBox = $(this).parents('li').siblings('li');
        var boxb = $(this).parents('li').siblings('li').find('.xypg-left-subnav');
        var jta = $(this).parents('li').siblings('li').find('.first-nav-btn');

        var subLiLen = boxa.find('li').length;
        if(subLiLen == 0){
            return false
        }
        if(!boxa.is(":visible")){
            boxa.slideDown();
            parbox.addClass('clicked');
            $(this).addClass('clicked');
            boxb.slideUp();
            jta.removeClass('clicked');
            parSibBox.removeClass('clicked');
        }else {
            boxa.slideUp();
            $(this).removeClass('clicked');
            parbox.removeClass('clicked');
        }
    });

    // 内页标题 字母获取
    $(".xypg-left-title").each(function () {
        var words = $(this).find('span').text();
        var firstLetter = words.substr(0,1);
        $('<i>'+firstLetter+'</i>').appendTo($(this));
    });

    // 内页手机端端 做的导航弹出特效
    $(".xymob-page-navbtn").click(function(){
        $(".xymob-menu-click").addClass('click');
        $('html,body').addClass('no-scroll');
    });
    $(".xymob-left-close-btn").click(function(){
        $(".xymob-menu-click").removeClass('click');
        $('html,body').removeClass('no-scroll');
    });

    // 详情页面 相关产品滚动特效
    if($(".relate-product-slick").length != 0) {
        $(".relate-product-slick").owlCarousel({
            margin: 14,
            dots:false,
            autoplay: true,
            responsive:{
                0:{
                    items:2
                },
                600:{
                    items:3
                },
                1000:{
                    items: 4
                }
            }
        });
    }

    //详细页分页点击效果
    $(".paging_num > a").click(function(){
        var index = $(this).index();
        location.hash = index + 1;
        var hash = location.hash;
        $(this).parent().siblings('.total').find('.paging').eq(hash.slice(1)-1).css("display","block").siblings('.paging').css("display","none");
        $(this).addClass("paging_hover").siblings().removeClass("paging_hover");
    });

    // 详情页下载文件 下拉点击特效
    app.clickToggle('.file-down-title','.file-down-list');

    // 内页左侧当前分类颜色高亮
    $(".xypg-left-nav li a[href='"+window.location.href+"']").closest('li').addClass('clicked');
    $(".xypg-left-threenav .clicked").parents('.xypg-left-subnav').show();
    $(".xypg-left-threenav .clicked").parents('.xypg-left-threenav').show();
    $(".xypg-left-subnav .clicked").parents('.xypg-left-subnav').show();

    // ie9 兼容 placeholder
    if(!app.placeholderSupport()){
        app.iePlaceholder()
    }

    // 防复制代码
    if(app.config.copyCode == 1 && !(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i))) {
        app.antiClone();
    }

});





//设为首页
function SetHome(obj, vrl) {
    try {
        obj.style.behavior = 'url(#default#homepage)'; obj.setHomePage(vrl);
    }
    catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("抱歉！您的浏览器不支持直接设为首页。请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为“true”，点击“加入收藏”后忽略安全提示，即可设置成功。");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        } else {
            alert('抱歉，您的浏览器不支持自动设置首页, 请使用浏览器菜单手动设置!');
        }
    }
}
