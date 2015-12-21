define([ "jquery", "i18n", "vo", "date", "files" ], function( $, i18n, vo, date, files ) {

    "use strict";

    function setInfoURL() {
        var info = vo.cur.info;
        if ( i18n.GetLocale() != "zh_CN" ) {
            info = vo.cur.info.replace( "/knows/", "/" );
        }

        $( ".controlink[url='info']" ).attr({
            "title"    : vo.cur.name,
            "href"     : info
        });
    }

    function setDownloadURL() {

        var shortname = vo.cur.shortname;
        if ( shortname == "#" ) {
            shortname = vo.cur.name;
        }

        $( ".controlink[url='download']" ).attr({
            "title"    : vo.cur.name,
            "href"     : vo.cur.hdurl,
            "download" : "SimpTab-" + date.Now() + "-" + shortname + ".jpg"
        });

    }

    function setBackground( url ) {
        $("body").css({ "background-image": "url(" + url + ")" });
    }

    function setFavorteState( is_show ) {
        is_show ? $( ".controlink[url='favorite']" ).show() : $( ".controlink[url='favorite']" ).hide();
    }

    function setFavorteIcon() {
        var newclass = vo.cur.favorite == -1 ? "unfavoriteicon" : "favoriteicon";
        $( ".controlink[url='favorite']" ).find("span").attr( "class", "icon " + newclass );
    }

    function setCurBackgroundURI() {
        files.GetDataURI( vo.constructor.CURRENT_BACKGROUND ).done( function( dataURI) {
            files.DataURI( dataURI );
        });
    }

    return {
        Listen: function ( callBack ) {

            // listen chrome link
            $( ".chromelink" ).click( function( event ) {
                chrome.tabs.getCurrent( function( tab ) {
                    chrome.tabs.update( tab.id, { url : $( event.currentTarget ).attr( "url" ) });
                });
            });

            // listen control link
            $( ".controlink" ).click( function( event ) {
                var $target =  $( event.currentTarget ),
                    url     = $target.attr( "url" );

                switch ( url ) {
                    case "setting":
                        var width = i18n.GetSettingWidth();
                        if ( !$target.hasClass( "close" )) {
                            $( ".setting" ).animate({ width: i18n.GetSettingWidth(), opacity : 0.8 }, 500, function() {
                                $target.addClass( "close" );
                            });
                            $( ".bottom, .seniorgp" ).animate({ width: $(".bottom").width() - width }, 500 ); // 116-simptab-optimize-layout
                            // 116-simptab-optimize-layout
                            var selector = ".content, .sidebar, .controlbar, .bottom"
                            $( ".content, .sidebar, .controlbar, .bottom" ).on( "click", function( event ) {
                                var cls     = $( event.target ).attr("class");
                                if ( selector.indexOf( cls ) != -1 ) {
                                    $( selector ).off( "click" );
                                    $( ".controlink .settingicon" ).trigger( "click" );
                                }
                            });
                        }
                        else {
                            $( ".setting" ).animate({ width: 0, opacity : 0 }, 500, function() {
                                $target.removeClass( "close" );
                            });
                            $( ".bottom, .seniorgp" ).animate({ width: "100%" }, 500 );    // 116-simptab-optimize-layout
                        }
                        break;
                    case "favorite":
                        var is_favorite = $($target.find("span")).hasClass("unfavoriteicon") ? true : false;
                        callBack( is_favorite );
                        break;
                    case "download":
                        // hack code
                        if ( vo.cur.hdurl.indexOf( "unsplash.com" ) == -1 ) {
                            event.currentTarget.href = files.DataURI() || vo.cur.hdurl;
                        }
                        break;
                    case "upload":
                        var input  = document.createElement("input"),
                            $input = $(input);

                        $input.attr({ type : "file", multiple : "true" });
                        $input.one( "change", function(event){
                            callBack( event.currentTarget.files );
                            input  = null;
                            $input = null;
                        });
                        $input.trigger("click");
                        break;
                }
            });
        },

        AutoClick: function( idx ) {
            if ( idx < 3 ) {
                $( $(".chromelink")[idx] ).click();
            }
            else {
                var target    = $( $(".controlbar").find( "a" )[idx] )[0],
                    $favorite = $( ".controlink[url='favorite']" ),
                    $hidden   = $favorite.has(":hidden");
                // hack code
                if ( target !== $favorite[0] || ( target === $favorite[0] && $hidden && $hidden.length === 0 )) {
                    target.click();
                }
            }
        },

        Set: function( is_default ) {

            // set default background
            if ( is_default ) {
                vo.cur = vo.Clone( vo.Create( vo.constructor.DEFAULT_BACKGROUND, vo.constructor.DEFAULT_BACKGROUND, "Wallpaper", "#", date.Now(), "Wallpaper", "default" ));
            }
            else {
                setCurBackgroundURI();
            }

            setInfoURL();
            setDownloadURL();
            setBackground( is_default ? vo.constructor.DEFAULT_BACKGROUND: vo.constructor.CURRENT_BACKGROUND );
            setFavorteState( !is_default );
            setFavorteIcon();
        },
        SetFavorteIcon    : setFavorteIcon
    };
});
