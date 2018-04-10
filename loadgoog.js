window.onload=function() {
    var projection = ol.proj.get("EPSG:3857");
    //var resolutions = [];
    for (var i = 0; i < 19; i++) {
        //resolutions[i] = Math.pow(2, 18 - i);
    }
    var resolutions= [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677, 0.14929107084870338, 0.07464553542435169, 0.037322767712175846, 0.018661383856087923, 0.009330691928043961, 0.004665345964021981, 0.0023326729820109904, 0.0011663364910054952, 5.831682455027476E-4, 2.915841227513738E-4, 1.457920613756869E-4];
    var tilegrid = new ol.tilegrid.TileGrid({
        origin: [-20037508.34,20037508.34],
        resolutions: resolutions
    });
    //m@177000000
    //s@110
    var google_image_source = new ol.source.TileImage({
        projection: projection,
        tileGrid: tilegrid,
        tileUrlFunction: function (tileCoord, pixelRatio, proj) {
            if (!tileCoord) {
                return "";
            }
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = tileCoord[2];

            if (x < 0) {
                /*         x = "M" + (-x);*/
                x = (-x);
            }
            if (y < 0) {
                /*y = "M" + (-y);*/
                y =(-y);
            }
            // debugger
            //  return "http://online2.map.bdimg.com/tile/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&scaler=1&udt=20170408";
            var hu="http://mt1.google.cn/maps/vt?lyrs=s@110&hl=zh-CN&gl=CN&z="+z+"&x="+x+"&y="+y;
            var jj="http://mt2.google.cn/vt/imgtp=png32&lyrs=h@205000000&hl=zh-CN&gl=CN&z="+z+"&x="+x+"&y="+y;
            return hu;

            //   return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20151021&scaler=1&p=1";
        }
    });

    var google_image_layer = new ol.layer.Tile({
        source: google_image_source,
        //preload:18
    });
    var tilesLoading = 0,
        tilesLoaded = 0;

    google_image_source.on("tileloadend",function (e) {
        tilesLoaded++;
        if (tilesLoading === tilesLoaded) {
            console.log(tilesLoaded + ' tiles finished loading');
            tilesLoading = 0;
            tilesLoaded = 0;
            //trigger another event, do something etc...
        }
    });
    google_image_source.on("tileloadstart",function () {
        tilesLoading++;
    });
    var google_biaozhu_source = new ol.source.TileImage({
        projection: projection,
        tileGrid: tilegrid,
        tileUrlFunction: function (tileCoord, pixelRatio, proj) {
            if (!tileCoord) {
                return "";
            }
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = tileCoord[2];

            if (x < 0) {
                /*         x = "M" + (-x);*/
                x = (-x);
            }
            if (y < 0) {
                /*y = "M" + (-y);*/
                y =(-y);
            }
            //    debugger
            //  return "http://online2.map.bdimg.com/tile/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&scaler=1&udt=20170408";
            var hu="http://mt1.google.cn/maps/vt?lyrs=s@110&hl=zh-CN&gl=CN&z="+z+"&x="+x+"&y="+y;
            var jj="http://mt1.google.cn/vt/imgtp=png32&lyrs=h@205000000&hl=zh-CN&gl=CN&z="+z+"&x="+x+"&y="+y;
            return jj;

            //   return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20151021&scaler=1&p=1";
        }
    });

    var google_biaozhu_layer = new ol.layer.Tile({
        source: google_biaozhu_source
    });
    var google_lukuang_source = new ol.source.TileImage({
        projection: projection,
        tileGrid: tilegrid,
        tileUrlFunction: function (tileCoord, pixelRatio, proj) {
            if (!tileCoord) {
                return "";
            }
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = tileCoord[2];

            if (x < 0) {
                /*         x = "M" + (-x);*/
                x = (-x);
            }
            if (y < 0) {
                /*y = "M" + (-y);*/
                y =(-y);
            }
            // debugger
            //  return "http://online2.map.bdimg.com/tile/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&scaler=1&udt=20170408";
            var hu="http://mt1.google.cn/maps/vt?lyrs=m@177000000&hl=zh-CN&gl=CN&z="+z+"&x="+x+"&y="+y;
            var tt="http://mt1.google.cn/vt?lyrs=m@205000000,traffic|seconds_into_week:-1&hl=zh-CN&gl=CN&src=app&z="+z+"&x="+x+"&y="+y;
            return tt;

            //   return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20151021&scaler=1&p=1";
        }
    });

    var google_lukuang_layer = new ol.layer.Tile({
        source: google_lukuang_source
    });
    var googleMapLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            //   url:'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
            url:'http://ditu.google.cn/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i378067104!3m12!2szh-CN!3sCN!5e18!12m4!1e68!2m2!1sset!2sRoadmapSatellite!12m3!1e37!2m1!1ssmartmaps!4e0'
        })
    });
    var mapElement = document.getElementById('mapContent');
    var map = new ol.Map({
        target: mapElement,
        layers: [google_image_layer,google_biaozhu_layer],
        /*     layers: [google_image_layer,googleMapLayer],*/
        /*  view: new ol.View({
         // 设置成都为地图中心
         // center: [104.06, 30.67],
         center:[12277233.79240,4657789.85560],
         projection: 'EPSG:3857',
         zoom: 10
         }),*/
//        interactions:new ol.interaction.defaults({"zoomDuration":100}),
       // interactions:[ new ol.interaction.Pointer({})],

        loadTilesWhileAnimating:true,
        loadTilesWhileInteracting:true,
        view: new ol.View({

            //center:[12277848.871611996,4658043.053256197],//神木
            //center:[12116418.13429533, 4055196.7498091166],//西安
            center:_mapconfig.lbscenter,
            minZoom: 15,
            maxZoom:18,
            zoom: _mapconfig._zoomlevel
        })

    });
    var latestfeature=null;
    var styles_main = {
        'man_on':function (feature) {
            var textcontent;
            var offx, offy;
            if (feature.getProperties().type.toString() == "2") {
                textcontent = feature.getProperties().reporter;
                offx = 30;
                offy = -30;
            } else if (feature.getProperties().type.toString() == "1") {
                textcontent = feature.getProperties().username;
                offx = -36;
                offy = -30;
            }
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    opacity: 1,
                    src: '/gps/v3.19.1/gps/images/map/renyuan_on.png'
                }),
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',    //字体与大小
                    offsetX:offx,
                    offsetY:offy,
                    text: textcontent,
                    fill: new ol.style.Fill({    //文字填充色
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({    //文字边界宽度与颜色
                        color: '#000',
                        width: 3
                    })
                })
            });
        },
        'man_on_big':function (feature) {
            var textcontent;
            var offx, offy;
            if (feature.getProperties().type.toString() == "2") {
                textcontent = feature.getProperties().reporter;
                offx = 30;
                offy = -30;
            } else if (feature.getProperties().type.toString() == "1") {
                textcontent = feature.getProperties().username;
                offx = -36;
                offy = -30;
            }
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    opacity: 1,
                    src: '/gps/v3.19.1/gps/images/map/renyuan_on_big.png'
                }),
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',    //字体与大小
                    offsetX:offx,
                    offsetY:offy,
                    text: textcontent,
                    fill: new ol.style.Fill({    //文字填充色
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({    //文字边界宽度与颜色
                        color: '#000',
                        width: 3
                    })
                })
            });
        },
        'man_off':function (feature) {
            var textcontent;
            var offx,offy;
            if(feature.getProperties().type.toString()=="2")
            {
                textcontent=feature.getProperties().reporter;
                offx=30;
                offy=-30;
            }else if(feature.getProperties().type.toString()=="1"){
                textcontent=feature.getProperties().username;
                offx=-36;
                offy=-30;
            }
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5,1],
                    opacity:1,
                    src: '/gps/v3.19.1/gps/images/map/renyuan_off.png'
                })
                ,
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',    //字体与大小
                    offsetX:offx,
                    offsetY:offy,
                    text: textcontent,
                    fill: new ol.style.Fill({    //文字填充色
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({    //文字边界宽度与颜色
                        color: '#000',
                        width: 3
                    })
                })
            });
        },
        'man_off_big':function (feature) {
            var textcontent;
            var offx,offy;
            if(feature.getProperties().type.toString()=="2")
            {
                textcontent=feature.getProperties().reporter;
                offx=30;
                offy=-30;
            }else if(feature.getProperties().type.toString()=="1"){
                textcontent=feature.getProperties().username;
                offx=-36;
                offy=-30;
            }
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5,1],
                    opacity:1,
                    src: '/gps/v3.19.1/gps/images/map/renyuan_off_big.png'
                })
                ,
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',    //字体与大小
                    offsetX:offx,
                    offsetY:offy,
                    text: textcontent,
                    fill: new ol.style.Fill({    //文字填充色
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({    //文字边界宽度与颜色
                        color: '#000',
                        width: 3
                    })
                })
            });
        },
        'car_on':function (feature) {
            var textcontent;
            var offx, offy;
            if (feature.getProperties().type.toString() == "2") {
                textcontent = feature.getProperties().reporter;
                offx = 40;
                offy = -23;
            } else if (feature.getProperties().type.toString() == "1") {
                textcontent = feature.getProperties().username;
                offx = -30;
                offy = -30;
            }
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    opacity: 1,
                    src: '/gps/v3.19.1/gps/images/map/car_on.png'
                }),
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',    //字体与大小
                    offsetX:offx,
                    offsetY:offy,
                    text: textcontent,
                    fill: new ol.style.Fill({    //文字填充色
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({    //文字边界宽度与颜色
                        color: '#000',
                        width: 3
                    })
                })
            })
        },
        'car_on_big':function (feature) {
            var textcontent;
            var offx, offy;
            if (feature.getProperties().type.toString() == "2") {
                textcontent = feature.getProperties().reporter;
                offx = 40;
                offy = -23;
            } else if (feature.getProperties().type.toString() == "1") {
                textcontent = feature.getProperties().username;
                offx = -30;
                offy = -30;
            }
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    opacity: 1,
                    src: '/gps/v3.19.1/gps/images/map/car_on_big.png'
                }),
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',    //字体与大小
                    offsetX:offx,
                    offsetY:offy,
                    text: textcontent,
                    fill: new ol.style.Fill({    //文字填充色
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({    //文字边界宽度与颜色
                        color: '#000',
                        width: 3
                    })
                })
            })
        },
        'car_off': function (feature) {
            var textcontent;
            var offx, offy;
            if (feature.getProperties().type.toString() == "2") {
                textcontent = feature.getProperties().reporter;
                offx = 40;
                offy = -23;
            } else if (feature.getProperties().type.toString() == "1") {
                textcontent = feature.getProperties().username;
                offx = -30;
                offy = -30;
            }
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    opacity: 1,
                    src: '/gps/v3.19.1/gps/images/map/car_off.png'
                })
                ,
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',    //字体与大小
                    offsetX:offx,
                    offsetY:offy,
                    text: textcontent,
                    fill: new ol.style.Fill({    //文字填充色
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({    //文字边界宽度与颜色
                        color: '#000',
                        width: 3
                    })
                })
            })
        },
        'car_off_big': function (feature) {
            var textcontent;
            var offx, offy;
            if (feature.getProperties().type.toString() == "2") {
                textcontent = feature.getProperties().reporter;
                offx = 40;
                offy = -23;
            } else if (feature.getProperties().type.toString() == "1") {
                textcontent = feature.getProperties().username;
                offx = -30;
                offy = -30;
            }
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    opacity: 1,
                    src: '/gps/v3.19.1/gps/images/map/car_off_big.png'
                })
                ,
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',    //字体与大小
                    offsetX:offx,
                    offsetY:offy,
                    text: textcontent,
                    fill: new ol.style.Fill({    //文字填充色
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({    //文字边界宽度与颜色
                        color: '#000',
                        width: 3
                    })
                })
            })
        },
        'event_car': function (feature) {
            var textcontent;
            var offx, offy;
            if (feature.getProperties().type.toString() == "2") {
                textcontent = feature.getProperties().reporter;
                offx = 40;
                offy = -23;
            } else if (feature.getProperties().type.toString() == "1") {
                textcontent = feature.getProperties().username;
                offx = -30;
                offy = -30;
            }
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    opacity: 1,
                    src: '/gps/v3.19.1/gps/images/map/car_red.png'
                }),
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',    //字体与大小
                    offsetX:offx,
                    offsetY:offy,
                    text: textcontent,
                    fill: new ol.style.Fill({    //文字填充色
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({    //文字边界宽度与颜色
                        color: '#000',
                        width: 3
                    })
                })
            })
        },
        'event_car_big': function (feature) {
            var textcontent;
            var offx, offy;
            if (feature.getProperties().type.toString() == "2") {
                textcontent = feature.getProperties().reporter;
                offx = 40;
                offy = -23;
            } else if (feature.getProperties().type.toString() == "1") {
                textcontent = feature.getProperties().username;
                offx = -30;
                offy = -30;
            }
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    opacity: 1,
                    src: '/gps/v3.19.1/gps/images/map/car_red_big.png'
                }),
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',    //字体与大小
                    offsetX:offx,
                    offsetY:offy,
                    text: textcontent,
                    fill: new ol.style.Fill({    //文字填充色
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({    //文字边界宽度与颜色
                        color: '#000',
                        width: 3
                    })
                })
            })
        },
        'event_man': function (feature) {
            var textcontent;
            var offx, offy;
            if (feature.getProperties().type.toString() == "2") {
                textcontent = feature.getProperties().reporter;
                offx = 30;
                offy = -30;
            } else if (feature.getProperties().type.toString() == "1") {
                textcontent = feature.getProperties().username;
                offx = -36;
                offy = -30;
            }
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    opacity: 1,
                    src: '/gps/v3.19.1/gps/images/map/renyuan_red.png'
                }),
                text: new ol.style.Text({font: '12px Calibri,sans-serif',    //字体与大小
                    offsetX:offx,
                    offsetY:offy,
                    text: textcontent,
                    fill: new ol.style.Fill({    //文字填充色
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({    //文字边界宽度与颜色
                        color: '#000',
                        width: 3
                    })})
            })
        },
        'event_man_big': function (feature) {
            var textcontent;
            var offx, offy;
            if (feature.getProperties().type.toString() == "2") {
                textcontent = feature.getProperties().reporter;
                offx = 30;
                offy = -30;
            } else if (feature.getProperties().type.toString() == "1") {
                textcontent = feature.getProperties().username;
                offx = -36;
                offy = -30;
            }
            return new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    opacity: 1,
                    src: '/gps/v3.19.1/gps/images/map/renyuan_red_big.png'
                }),
                text: new ol.style.Text({font: '12px Calibri,sans-serif',    //字体与大小
                    offsetX:offx,
                    offsetY:offy,
                    text: textcontent,
                    fill: new ol.style.Fill({    //文字填充色
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({    //文字边界宽度与颜色
                        color: '#000',
                        width: 3
                    })})
            })
        }
    };
    window.currentOverFeature=null;
    map.on('pointermove', function (e) {
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTarget().style.cursor = hit ? 'pointer' : ('url(/gps/v3.19.1/gps/images/map/openhand.cur),default');
        var feature = map.forEachFeatureAtPixel(pixel, function(feature,layer) {
            // var layerType=layer.get('name');
            //alert(layerType);
            return feature;
        });

      /*  if(typeof (feature)!="undefined")
        {
            if(latestfeature!=null)
            {
               if(latestfeature.get("type")=="1"&&latestfeature.get("status")=="0"){
                       latestfeature.setStyle(styles_main.man_off(latestfeature));
               }
            }

             if(typeof (feature.get("dairead"))!="undefined"&&parseInt(feature.get("dairead"))>0)
             {
                 if (feature.get("type").toString() == "1") {
                     feature.setStyle(styles.event_man_big(feature));

                 }
                 else if (feature.get("type").toString() == "2") {
                     feature.setStyle(styles.event_car_big(feature));
                 }
             }
             else {
                 if (feature.get("type") == "1" && feature.get("status") == "0") {
                     feature.setStyle(styles_main.man_off_big(feature));
                     window.currentOverFeature = feature;
                 }
             }
            latestfeature=feature;
        }
        else{
            window.currentOverFeature=null;
            if(latestfeature!=null)
            {
                if(latestfeature.get("type")=="1"&&latestfeature.get("status")=="0"){
                      latestfeature.setStyle(styles_main.man_off(latestfeature));
                }
            }
            latestfeature=null;
        }*/
    });
   // $("#mapcontent").appendChild();
    //tests
 /*   var zoom = ol.animation.zoom({
        duration: 2500,
        resolution: map.getView().getResolution()
    });
    map.beforeRender(zoom);*/
    //tests


    window.map=map;
    window.zoomlevel=_mapconfig._zoomlevel;

    require(['/gps/v3.19.1/gps/Video/videop.js'],function (v) {
        v.addVideoWide();
    });

    $("#locbox").click(function () {
        var pan = ol.animation.pan({
            duration: 700,
            source:( map.getView().getCenter())
        });
        map.beforeRender(pan);
        map.getView().setCenter( _mapconfig.lbscenter);

    });

    requirejs.config({
        urlArgs: "v=" + (new Date()).getTime(),
        baseUrl: '.',
        paths: {
            'handlebars': '/gps/v3.19.1/gps/lib/handlebars/handlebars',
            'jquery': '/gps/v3.19.1/gps/lib/jquery/jquery-1.10.2.min',
            'ajaxModel': '/gps/v3.19.1/gps/lib/base/ajaxModel',
            'underscore': '/gps/v3.19.1/gps/lib/underscore/underscore',
            'pubsub' : '/gps/v3.19.1/gps/lib/pubsub/pubsub',
            'middlemsg':'/gps/v3.19.1/gps/gpspg/middle',
        },
        waitSeconds: 0,
        map: {
            '*': {
                'style': '/gps/v3.19.1/gps/lib/requirejs/css.js',
                'text': '/gps/v3.19.1/gps/lib/requirejs/text.js',
            }
        },
        shim: {
            'handlebars': {
                exports: 'Handlebars'
            },
            'ajaxModel': {
                deps: ['jquery']
            },
            'underscore': {
                exports: '_'
            },
        }
    });
    var  testzoom=map.getView().getZoom();
   map.getView().on('change:resolution',checkZoom);//checkZoom为调用的函数
    map.getView().on('change:center',function(e){
       console.log('moveing了'+window.map.getView().getZoom().toString());
    });
    //准备渲染，未开始渲染
    map.on('dblclick',function(e){
     //   console.log('双击');
    });
    map.on('moveend',function(e){
        console.log('moveend了');
        if(map.getView().getZoom()!=testzoom) {
            testzoom=map.getView().getZoom();
            console.log('结束zoom了,change:zoom了');
        }
    });
    function getSinPtOrRelPts() {
        var mapLayers=window.map.getLayers().getArray();
        for (var i =  window.map.getLayers().getLength() - 1; i >= 0; i--) {
            var tlyr= mapLayers[i];
            // var layerVector = pmap.getLayers().item(1);//get target vector layer
            if(tlyr.get('name')=="singlept")
            {

                var fc=tlyr.getSource().getFeatures();
               // var fccoord=fc[0].getGeometry().getCoordinates();
                var lon=fc[0].get("long");
                var lat=fc[0].get("lat");
                var pfcInfos=fc[0].getProperties();
                var toParse=[Number(lat),Number(lon)];
                require(['/gps/v3.19.1/gps/js/staticLbsgoog.js','/gps/v3.19.1/gps/gpspg/GPSJP.js'], function(staticOp,gpspg){

                    var gcj=  gpspg.gcj_encrypt(toParse[1],toParse[0]);
                    var tc=ol.proj.fromLonLat([Number(gcj.lon),Number(gcj.lat)],"EPSG:3857");
                   // var inf=pfcInfos;
                    var geomObj={};
                    geomObj.geometry=new ol.geom.Point([Number(tc[0]), Number(tc[1])]);
                    /*   geomObj.geometry=new ol.geom.Point([Number(tc.lon), Number(tc.lat)]);*/
                    var empty = {};
                    var object = $.extend(empty , pfcInfos, geomObj);  //有target,

                    staticOp.initLayersGroup(window.map,"singlept");
                    staticOp.addStaticGPSPoint(window.map,"singlept",empty);
                });
                window.map.removeOverlay(window.map.getOverlayById("eqInfoPoPup"));
            }
            if(tlyr.get('name')=="realtime")
            {

                var fc=tlyr.getSource().getFeatures();
                var realtimeArray=new Array();
                require(['/gps/v3.19.1/gps/gpspg/GPSJP.js'], function(gpspg) {

                    for (var single in fc) {
                        var lon = fc[single].get("long");
                        var lat = fc[single].get("lat");
                        var pfcInfos = fc[single].getProperties();
                        var toParse = [Number(lat), Number(lon)];

                        var gcj = gpspg.gcj_encrypt(toParse[1], toParse[0]);
                        var tc = ol.proj.fromLonLat([Number(gcj.lon), Number(gcj.lat)], "EPSG:3857");
                        // var inf=pfcInfos;
                        var geomObj = {};
                        geomObj.geometry = new ol.geom.Point([Number(tc[0]), Number(tc[1])]);
                        var empty = {};
                        var object = $.extend(empty, pfcInfos, geomObj);  //有target,
                        realtimeArray.push(empty);
                    }
                });
                var overlays=window.map.getOverlays().getArray();
                window.map.getOverlays().clear();
                window.map.removeOverlay(window.map.getOverlayById("eqInfoPoPup"));
                /*for(var index in overlays){
                    if(overlays[index].getId()==undefined) {
                        window.map.removeOverlay(overlays[index]);
                        if (overlays.length == 1) {
                            if(overlays[0].getId()==undefined) {
                                window.map.removeOverlay(overlays[0]);
                            }
                        }
                    }*/
                    //if(overlays[index].getId()=="eqInfoPoPup"){
                        //window.map.removeOverlay(overlays[index]);
                    //}
                //}

                require(['/gps/v3.19.1/gps/js/staticLbsgoog.js'], function(realtimeInitOp) {
                    realtimeInitOp.initLayersGroup(window.map,"realtime");
                    for(var singlert in realtimeArray) {
                        realtimeInitOp.addStaticGPSPoint(window.map, "realtime",realtimeArray[singlert],"zoomsource");
                    }
                });
            }
        }
    }
    var poitargettc;
    function checkZoom() {
        console.log('开始checkzoom');
        if (map.getView().getZoom() == 18) {
            window.zoomlevel = map.getView().getZoom();
            if (window.mode == "realtime" || window.mode == "singlept") {
                getSinPtOrRelPts();
            } else if (window.mode == "historypath") {
                dynamicpianyipath();
            }
        }
        if (map.getView().getZoom() == 15) {
            window.zoomlevel = map.getView().getZoom();
            if (window.mode == "realtime" || window.mode == "singlept") {
                getSinPtOrRelPts();
            }
            else if (window.mode == "historypath") {
                dynamicpianyipath();
            }
        }
        if (map.getView().getZoom() == 16) {
            window.zoomlevel = map.getView().getZoom();
            if (window.mode == "realtime" || window.mode == "singlept") {
                getSinPtOrRelPts();
            }
            else if (window.mode == "historypath") {
                dynamicpianyipath();
            }
        }
        if (map.getView().getZoom() == 17) {
            window.zoomlevel = map.getView().getZoom();
            if (window.mode == "realtime" || window.mode == "singlept") {
                getSinPtOrRelPts();
            }
            else if (window.mode == "historypath") {
                dynamicpianyipath();
            }
        }
    }
    function dynamicpianyipath() {
        require(['/gps/v3.19.1/gps/js/dynamicPolyline.js','/gps/v3.19.1/gps/gpspg/GPSJP.js'],function (staticOp,gpspg) {
            var xyArray=new Array();
            var  res=window._original84XY;
            for(var temp in res){
                var gcj=  gpspg.gcj_encrypt(Number(res[temp].long),Number(res[temp].lat));
                var tc=ol.proj.fromLonLat([Number(gcj.lon),Number(gcj.lat)],"EPSG:3857");

                var xy=[Number(tc[0]), Number(tc[1])];
                var iFeature = new ol.Feature({geometry:new ol.geom.Point(xy)});
                xyArray.push(xy);
            }
            staticOp.addlevelchangeHistoryRouteOfGPSPoint(window.map,xyArray,res,window._dateStart,window._dateEnd);//待提供时间点
        });
    }
    require(['/gps/v3.19.1/gps/exdata/gjbPdata.js'],function (sdf) {

    });


    var js = document.getElementsByTagName("script");
    for (var i = 0; i < js.length; i++) {
        if (js[i].src.indexOf("loadgoog.js") >= 0) {
            var arraytemp = new Array();
            arraytemp = js[i].src.split('?');
            arraytemp = arraytemp[1].split('=');
                      //  alert(arraytemp[0] + "=" + arraytemp[1]);
            if(arraytemp[1].toString()=="people")
            {
                window.realtimeMode="1";
                var data = {"equipmentCodes":"","equipmentType":"1","equipmentStatus":"all","uname":"","uacc":"","ucarno":"","udname":"","udphone":""};
            }else if(arraytemp[1].toString()=="car")
            {
                window.realtimeMode="2";
                var data = {"equipmentCodes":"","equipmentType":"2","equipmentStatus":"all","uname":"","uacc":"","ucarno":"","udname":"","udphone":""};
            }
            require(['/gps/v3.19.1/gps/js/staticLbsgoog.js','/gps/v3.19.1/gps/gpspg/GPSJP.js'],function (staticOp,gpspg) {
                var hurl = "/beidou/api/getRealTimeLbsOfAllEquipmentsSingle.do";
                /* data.equipmentCodes = "";
                 data.equipmentType = "all";
                 data.equipmentStatus = "all";*/
                var paras={
                    url:hurl,
                    type:'GET',
                    async:true,
                    data:data,
                    dataType: "json",
                    success: function (res) {//ajax请求成功后触发的方法
                        // alert('请求成功');
                        var resList = [];
                        if (res.count == 0) {
                            alert('暂无GPS记录!')
                            return;
                        }
                        var realtimeArray = new Array();
                        for (var single in res) {

                            var geomObj = {};
                            var gcj=  gpspg.gcj_encrypt(Number(res[single].long),Number(res[single].lat));
                            var tc=ol.proj.fromLonLat([Number(gcj.lon),Number(gcj.lat)],"EPSG:3857");

                            geomObj.geometry = new ol.geom.Point([Number(tc[0]), Number(tc[1])]);
                       //     geomObj.geometry = new ol.geom.Point([Number(res[single].lat), Number(res[single].long)]);
                            var empty = {};
                            var object = $.extend(empty, res[single], geomObj);  //有target,
                            realtimeArray.push(empty);

                        }
                        staticOp.initLayersGroup(window.map, "realtime");
                        for (var singlert in realtimeArray) {

                            staticOp.addStaticGPSPoint(window.map, "realtime", realtimeArray[singlert]);
                        }

                    },
                    error: function (msg) {//ajax请求失败后触发的方法
                        alert(msg);//弹出错误信息
                    }
                };
                $.ajax(paras);
                require(['/gps/v3.19.1/gps/heatmap/myheatlayer.js'],function (heated) {

                    heated.addHeatLayer();
                    require(['pubsub','/gps/v3.19.1/gps/gpspg/middle.js'],function (pubsub,evtbus) {
                        window.eventbus=evtbus;
                        pubsub.publish("addHeatmapLegend","business");
                    });
                });
            });
        }
    }
}