"use strict";function getQueryString(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(e);return null!==a?unescape(a[2]):null}function tooltips(t){var e={origins:[{element:$(".feature[data-type=origins]")[0],position:"right",intro:'简 Tab 支持从多个壁纸源获取数据，包括：<ul><li>必应每日图片</li><li>必应随机图片</li><li>wallhaven.cc</li><li>unsplash.com</li><li>googleartproject.com</li><li>desktoppr.co</li><li>visualhunt.com</li></ul>详细请看开发文档 <a href="https://simptab.art/docs/#/%E8%83%8C%E6%99%AF%E6%BA%90?id=%e5%a4%9a%e7%a7%8d%e8%83%8c%e6%99%af%e6%ba%90" target="_blank">多种背景源</a>'}],positionmode:[{element:$(".feature[data-type=positionmode]")[0],position:"right",intro:'简 Tab 具有多种方式的壁纸更换模式，包括：<ul><li>每天更换背景<br><abbr>每天更换一次，背景源只来源于 必应每日图片</abbr></li><li>随机更换<br><abbr>每次新打开标签页，即可看到一副新的背景图</abbr></li><li>只显示当前背景</li><li>地球每刻</li></ul>详细请看开发文档 <a href="https://simptab.art/docs/#/%E8%83%8C%E6%99%AF%E6%BA%90?id=%e5%a4%9a%e7%a7%8d%e8%83%8c%e6%99%af%e6%ba%90" target="_blank">背景更换模式</a>'},{element:$(".feature[data-type=positionmode]")[0],position:"right",intro:'<img src="https://simptab-1254315611.cos.ap-shanghai.myqcloud.com/www/earth.jpg" alt="地球每刻"><br><span style="border-left:.25em solid rgba(255,255,255,0.9);padding-left:5px;">地球每刻由 <a href="http://himawari8.nict.go.jp/" target="_blank">向日葵-8號</a> 提供，详细请看 <a href="https://simptab.art/docs/#/%E8%83%8C%E6%99%AF%E6%BA%90?id=%e5%9c%b0%e7%90%83%e6%af%8f%e5%88%bb" target="_blank">地球每刻</a></span>'}],controlbar:[{element:$(".feature[data-type=controlbar]")[0],position:"left",intro:'直观的控制栏，包含多种操作方案：<br><ul><li>上传 · 下载</li><li>收藏</li><li>固定</li><li>下一张（刷新）</li><li>不喜欢</li></ul>详细请看开发文档 <a href="https://simptab.art/docs/#/%E6%8E%A7%E5%88%B6%E6%A0%8F" target="_blank">控制栏</a>'}],unsplash:[{element:$(".feature[data-type=unsplash]")[0],position:"left",intro:"深度集成 对 Unsplash 源的定制化设置，包含：<ul><li>自定义 Unsplash 源</li><li>更改 Unsplash 源分辨率</li></ul>"}]},a=introJs();a.setOptions({hintButtonLabel:"确认",nextLabel:"下一条 →",prevLabel:"← 上一条",skipLabel:"",doneLabel:"完成",hidePrev:!0,hideNext:!0,exitOnEsc:!0,exitOnOverlayClick:!0,overlayOpacity:.8,steps:e[t]}),a.onexit(function(){$(".feature").removeClass("active")}),a.start()}$(document).ready(function(){var t=navigator.language;"en"==t.split("-")[0]&&(t="en");var e=$.cookie("lang");void 0!==e&&(t=e),e=getQueryString("lang"),null!==e&&(t=e),t=t.toLowerCase(),"en"!=t&&"zh-cn"!==t&&"zh-tw"!==t&&(t="en");var a={load:"current",lng:t,lowerCaseLng:!0,fallbackLng:!1,cookieName:"lang",useCookie:!0,detectLngQS:"lang"};i18n.init(a,function(e){$($(".title div")[0]).html(e("title")),$($(".title div")[1]).html(e("desc")),$(".download .btn-download h3").html(e("download")),$(".download .smaller").html(e("or")),$(".download .btn-offline-download").html(e("offline")),$($(".top ul li a")[0]).text(e("nav3")),$($(".top ul li a")[1]).text(e("nav2")),$($(".top ul li a")[2]).text(e("nav4")),$($(".top ul li a")[6]).text(e("nav5")),$($(".top ul li a")[7]).text(e("nav6")),"zh-tw"==t&&$($(".top ul li a")[1]).attr("href","http://ksria.com/simptab/docs/#/CHANGELOG.tw"),"en"==t&&$($(".top ul li a")[1]).attr("href","http://ksria.com/simptab/docs/#/CHANGELOG.en"),$.each($(".feature"),function(t,a){$(a).find(".desc").text(e($(a).attr("data-type")))}),$(".feature .learnmore").html(e("learn")),$(".middle a:nth-child(1)").html(e("middle1")),$(".footer li:nth-child(1) h2").html(e("support")),$(".footer li:nth-child(1) div p:nth-of-type(1)").html(e("feedback")),$(".footer li:nth-child(1) div p:nth-of-type(2) span:nth-of-type(1)").html(e("contact")),$(".footer li:nth-child(1) div p:nth-of-type(2) a:nth-of-type(2)").html(e("author").toLowerCase()),$(".footer li:nth-child(1) div p:nth-of-type(2) span:nth-of-type(2)").html(e("end").toLowerCase()),$(".footer li:nth-child(2) h2").html(e("author")),$(".footer li:nth-child(2) p:nth-child(2)").html(e("job")),$(".footer .copyright span:nth-child(1)").html(e("footer"))}),$(".btn-download").click(function(){window.location.href="https://chrome.google.com/webstore/detail/kbgmbmkhepchmmcnbdbclpkpegbgikjc?hl="+i18n.lng()}),$(".middle a:nth-child(1)").click(function(){var t=i18n.lng();t="en"===t?t:t.split("-")[1],t="cn"===t?"":"."+t,window.location.href=".en"==t?"http://github.com/kenshin/simptab/blob/master/README"+t+".md":"http://ksria.com/simptab/docs/#/"}),$(".feature .learnmore").on("click",function(t){var e=$(t.currentTarget).parent().parent(),a=e.attr("data-type");e.addClass("active"),tooltips(a)}),Waves.init(),Waves.attach(".feature",["waves-block"]),Waves.attach(".btn-download",["waves-button","waves-float"]),Waves.attach(".feature .learnmore",["waves-button","waves-float"])});