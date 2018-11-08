
define([ "jquery", "mousetrap", "lodash", "notify", "i18n", "vo", "date" ], function( $, Mousetrap, _, Notify, i18n, vo, date ) {

    "use strict";

    /*********************************************
     * Data Structure
     *********************************************/

    var storage = ( function() {
        var _themes  = [ "19CAAD", "8CC7B5", "A0EEE1", "BEE7E9", "BEEDC7", "D6D5B7", "D1BA74", "E6CEAC", "ECAD9E", "F4606C", "3D5AFE", "363b40", "222222", "ffffff", "random", "custom" ],
            _storage = {
                theme: "#" + _themes[0],
                time:    { size: "", color: "" },
                day:     { size: "", color: "" },
                devices: { size: "", color: "" },
                css: "",
                version: "1.0.0",
            },
            key     = "simptab-tenmode-option",
            random  = function( min, max ) {
                return Math.floor( Math.random() * ( max - min + 1 ) + min );
            };

        function Storage() {
            this.db = localStorage[ key ];
            if ( !this.db ) {
                this.db = $.extend( {}, _storage );
                localStorage.setItem( key, JSON.stringify( this.db ));
            } else this.db = JSON.parse( this.db );
            this.themes = _themes;
        }

        Storage.prototype.Set = function() {
            localStorage.setItem( key, JSON.stringify( this.db ));
        }

        Storage.prototype.Get = function() {
            return this.db;
        }

        Storage.prototype.Clear = function() {
            localStorage.removeItem( key );
        }

        Storage.prototype.Random = function() {
            var idx   = random( 0, this.themes.length - 4 );
            return this.themes[ idx ];
        }

        return new Storage();

    })();

    /*********************************************
     * Theme
     *********************************************/

    function themeView() {
        var tmpl     = '<div class="theme name-<%- theme %> waves-effect" name="<%- theme %>" style="background-color:#<%- theme %>;"></div>',
            compiled = _.template( '<% jq.each( themes, function( idx, theme ) { %>' + tmpl + '<% }); %>', { 'imports': { 'jq': jQuery }} ),
            html     = compiled({ 'themes': storage.themes });
        return html;
    }

    function themeModel() {
        $( ".setting-zen-mode" ).on( "click", ".theme", function( event ) {
            var color = event.target.attributes.name.value;
            if ( color == "random" ) {
                new Notify().Render( i18n.GetLang( "notify_zen_mode_theme_random" ) );
                customTheme( "remove" );
                changAllTheme( "dark", "random" );
            } else if ( color == "ffffff" ) {
                customTheme( "remove" );
                changAllTheme( "light", "#" + event.target.attributes.name.value );
            } else if ( color == "custom" ) {
                customTheme( "add" );
            } else {
                customTheme( "remove" );
                changAllTheme( "dark", "#" + event.target.attributes.name.value );
            }
        });
        storage.themes.indexOf( storage.db.theme.replace( "#", "" ) ) == -1 && customTheme( "add" );
    }

    function customTheme( type ) {
        var target = ".setting-zen-mode .themes input";
        if ( type == "add" ) {
            if ( $(target).length > 0 ) return;
            $( ".setting-zen-mode .themes .content" ).append( '<input type="text" placeholder="' + i18n.GetLang( "zen_mode_setting_theme_placeholder" ) + '"/>' );
            setTimeout( function() {
                storage.themes.indexOf( storage.db.theme.replace( "#", "" ) ) == -1 &&
                    $(target).val( storage.db.theme );
                $(target)
                    .animate({ "opacity": 1 }).on( "keyup", function( event ) {
                        storage.db.theme = event.target.value;
                        storage.db.theme == "" && ( storage.db.theme = "#" + storage.themes[ 0 ]);
                        changAllTheme( "dark", storage.db.theme );
                });
            }, 10 );
        } else {
            setTimeout( function() {
                $(target).fadeOut( "slow", function() {
                    $(target).remove();
                });
            }, 10 );
        }
    }

    function changAllTheme( type, theme ) {
        var value = type == "light" ? "#555" : "#fff";

        storage.db.theme         = theme;
        storage.db.time.color    = value;
        storage.db.day.color     = value;
        storage.db.devices.color = value;
        storage.Set();

        theme == "random" && ( theme = "#" + storage.Random() );
        $( ".clock-bg-zen-mode" ).css( "background-color", theme );
        readStorage( "#time", "time" );
        readStorage( ".day-zen-mode", "day" );
        readStorage( ".devices-zen-mode", "devices" );
        changeTopsitsTheme( type );
    }

    function readStorage( selector, key ) {
        var size  = storage.db[ key ].size,
            color = storage.db[ key ].color;
        size  && $( selector ).css( "font-size", size );
        color && $( selector ).css( "color", color );
    }

    function changeTopsitsTheme( type ) {
        var value = type == "light" ? "#555" : "#fff";
        $( ".topsites a" ).css( "color", value );
    }

    /*********************************************
     * Footer
     *********************************************/

    function footerModel() {
        $( ".setting-zen-mode" ).on( "click", ".footer .exit", function( event ) {
            new Notify().Render( i18n.GetLang( "notify_zen_mode_exit" ) );
            exit();
            close();
        });
        $( ".setting-zen-mode" ).on( "click", ".footer .close", function( event ) {
            close();
        });
    }

    /*********************************************
     * Zen mode Setting
     *********************************************/

    function settingTmpl() {
        var tmpl = '\
                    <div class="setting-zen-mode">\
                        <div class="themes">\
                            <div class="title">' + i18n.GetLang( "zen_mode_setting_theme_title" ) + '</div>\
                            <div class="content">' + themeView() + '</div>\
                        </div>\
                        <div class="footer">\
                            <div class="waves-effect button exit">' + i18n.GetLang( "zen_mode_setting_exit" ) + '</div>\
                            <div class="waves-effect button close">' + i18n.GetLang( "zen_mode_setting_close" ) + '</div>\
                        </div>\
                    </div>';
        $( "body" ).append( tmpl );

        themeModel();
        footerModel();
    }

    function open() {
        setTimeout( function(){
            $( ".setting-zen-mode" ).css({ "transform": "translateY(0px)", "opacity": 1 });
        }, 10 );
    }

    function close() {
        $( ".setting-zen-mode" ).css({ "transform": "translateY(100px)", "opacity": 0 });
        setTimeout( function(){
            $( ".setting-zen-mode" ).remove();
        }, 500 );
    }

    /*********************************************
     * Modules
     *********************************************/

    function exit() {
        localStorage["simptab-topsites"] = localStorage["simptab-topsites-backup"];
        localStorage.removeItem( "simptab-topsites-backup" );

        localStorage["simptab-background-clock"] = localStorage["simptab-background-clock-backup"];
        localStorage.removeItem( "simptab-background-clock-backup" );

        localStorage["simptab-zenmode"] = "false";
    }

    function shortcuts() {
        var styles = "";
        [ "5", "6", "7", "f", "m", "s", "a", "n", "u" ].forEach( function( value ) {
            styles += ".keycode-" + value + "{text-decoration: line-through!important;}";
            Mousetrap.unbind( value );
        });
        $( "head" ).append( '<style type="text/css">' + styles + '</style>' );
    }

    function timeMode() {
        $( ".clock" ).css( "background-color", storage.db.theme != "random" ? storage.db.theme : "#" + storage.Random() );
        $( ".clock" ).addClass( "clock-bg-zen-mode" ).css( "z-index", "initial" );
        $( "#time"  ).addClass( "time-zen-mode" );
        readStorage( "#time", "time" );
    }

    function dayMode() {
        var date = new Date(),
            day  = date.toLocaleDateString( navigator.language, { weekday: 'long', month: 'long', day: 'numeric' });
        $( "#time" ).after( '<div class="day-zen-mode">' + day + '</div>' );
        readStorage( ".day-zen-mode", "day" );
    }

    function devicesMode() {
        navigator.getBattery().then( function( battery ) {
            var network = navigator.onLine ? '≈ ' + navigator.connection.downlink + ' Mbps' : 'Offline',
                charge  = ( battery.level * 100 ).toFixed() + '% ' + ( battery.charging ? 'Charging' : 'Battery' );
            $( ".day-zen-mode" ).after( '<div class="devices-zen-mode">' + network + ' · ' + charge + '</div>' );
            readStorage( ".devices-zen-mode", "devices" );
        });
    }

    function topSitesMode() {
        $( ".bottom" ).addClass( "bottom-zen-mode" );
        $( ".topsites" ).addClass( "topsites-zen-mode" );
        changeTopsitsTheme( storage.db.theme == "#ffffff" ? "light" : "dark" );
    }

    function settingMode() {
        $( ".controlbar" ).addClass( "controlbar-zen-mode" );
        $( ".progress"   ).addClass( "progress-zen-mode" );
        $( ".clock"      ).append( '<div class="setting-trigger-zen-mode"></div>' )
        storage.db.theme == "#ffffff" && $( ".setting-trigger-zen-mode" ).addClass( "setting-trigger-white-zen-mode" );
        $( ".setting-trigger-zen-mode" ).on( "click", function( event ) {
            settingTmpl();
            open();
        });
    }

    return {
        Render: function() {
            timeMode();
            dayMode();
            devicesMode();
            settingMode();

            setTimeout( function() {
                topSitesMode();
                shortcuts();
            }, 500 );
        },

        Init: function() {
            localStorage["simptab-topsites-backup"] = localStorage["simptab-topsites"];
            localStorage["simptab-topsites"] = "simple";

            localStorage["simptab-background-clock-backup"] = localStorage["simptab-background-clock"];
            localStorage["simptab-background-clock"] = "show";
        },

        Exit: function() {
            exit();
        }
    }

});