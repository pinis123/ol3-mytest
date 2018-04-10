/**
 * Created by Administrator on 2017/3/20.
 */
/**
 * Created by Administrator on 2017/3/16.
 */
define(['ajaxModel',
    '/gps/v3.19.1/gps/gpspg/GPSJP.js',
    'pubsub',
    'jquery',
    'handlebars'
], function(ajaxModel,gpsTransferLib,pubsub) {
    return (function(scope, $) {
        var mainhistoryXYarray;
        var completed=false;
        var firstRender=true;
        var pIndexTowardsPoint=2;
        var vectorLayerHistory;
        var vectorLayerHistoryVertx;
        //加载模板信息
        var flashOpen=false;
        var flashFeaturesCollection=new Array();
        var _mainMap=null;
        var _loadCompiler = function(url) {
            var htmlobj = $.ajax({
                url: url,
                async: false
            });
            if (htmlobj.status === 200) {
                return htmlobj.responseText;
            } else {
                return "";
            }
        };
      /*  var styles = {
            'route': new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: 6, color: [237, 212, 0, 0.8]
                })
            }),
            'icon': new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: 'data/icon.png'
                })
            }),
            'geoMarker': new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    snapToPixel: false,
                    fill: new ol.style.Fill({color: 'blue'}),
                    stroke: new ol.style.Stroke({
                        color: 'red', width: 2
                    })
                })
            })
        };*/
        //
        /*new ol.style.Style({
         image: new ol.style.Icon(/!** @type {olx.style.IconOptions} *!/ ({
         anchor: [0.5, 46],
         anchorXUnits: 'fraction',
         anchorYUnits: 'pixels',
         src: '/gps/v3.19.1/gps/images/map/icon.png'
         }))
         })*/
        //
        function  stop() {
            map.un('postcompose', renderCustom);
        }
        var index=0;
        function renderCustom(event) {

            // setInterval(function () {
            if (!completed){
                pIndexTowardsPoint++;
                if (pIndexTowardsPoint == 8) {
                    completed = true;
                }
                //dynamic
                vectorLayerHistory.getSource().clear(false);
                var feature = new ol.Feature({
                    geometry: new ol.geom.LineString(mainhistoryXYarray)
                });
                feature.setStyle(new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        width: 3,
                        color: [255, 0, 0, 1]
                    })
                }));
                // vectorLayerHistory.getSource().addFeature(feature);

                var routeCoords = feature.getGeometry().getCoordinates();
                var routeLength = routeCoords.length;

                speed = 0.0001;
                //render
                var vectorContext = event.vectorContext;
                var frameState = event.frameState;


                var elapsedTime = frameState.time - now;
                // here the trick to increase speed is to jump some indexes
                // on lineString coordinates
                //var index = Math.round(speed * elapsedTime / 1000);


                if (index >= routeLength) {
                    stop();
                    return;
                }
                debugger
                var currentPoint = new ol.geom.Point(routeCoords[index]);
                index++;
                var featuret = new ol.Feature(currentPoint);
                vectorContext.drawFeature(featuret, styles.geoMarker);

                // tell OL3 to continue the postcompose animation
                map.render();
                //render
                //dynamic
                //vertx
                vectorLayerHistoryVertx.getSource().clear(false);
                var currentVertx=mainhistoryXYarray.slice(0, pIndexTowardsPoint);

                var featurevertx = new ol.Feature({
                    geometry: new ol.geom.MultiPoint(currentVertx)
                });
                var vertxstyle= new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 7,
                        snapToPixel: false,
                        fill: new ol.style.Fill({color: 'black'}),
                        stroke: new ol.style.Stroke({
                            color: 'white', width: 2
                        })
                    })
                });
                featurevertx.setStyle(vertxstyle);
                // vectorLayerHistoryVertx.getSource().addFeature(featurevertx);
                //vertx

                //history path
                setTimeout(function () {
                    /*   vectorLayerHistory.getSource().clear(false);
                     var feature = new ol.Feature({
                     geometry: new ol.geom.LineString(mainhistoryXYarray.slice(0, pIndexTowardsPoint))
                     });
                     feature.setStyle(new ol.style.Style({
                     stroke: new ol.style.Stroke({
                     width: 3,
                     color: [255, 0, 0, 1]
                     })
                     }));
                     vectorLayerHistory.getSource().addFeature(feature);*/
                },0);
                //history path
                //适配最佳显示区域
                /*pmap.getView().fit(feature.getGeometry().getExtent(), map.getSize(), {
                 padding: [0, 0, 0, 0],
                 nearest: true
                 });*/
            }
            //   }, 2000)


        }
        //添加历史路线
        scope.addHistoryRouteOfGPSPoint=function (pmap,polylinegeom) {
            mainhistoryXYarray=polylinegeom;

            var feature_tofit = new ol.Feature({
                geometry:new ol.geom.LineString(polylinegeom)
            });
            /* var feature = new ol.Feature({
             geometry:new ol.geom.LineString(polylinegeom.slice(0, 2))
             });
             feature.setStyle(new ol.style.Style({
             stroke: new ol.style.Stroke({
             width: 3,
             color: [255, 0, 0, 1]
             })
             }));*/
            var vectorSource = new ol.source.Vector({
                features: []
            });
            vectorLayerHistory = new ol.layer.Vector({
                source: vectorSource
            });
            var vectorVertx=new ol.source.Vector({features:[]});
            vectorLayerHistoryVertx = new ol.layer.Vector({
                source: vectorVertx
            });

            pmap.addLayer(vectorLayerHistory);
            pmap.addLayer(vectorLayerHistoryVertx);
            //测试区域
            debugger
            /*    var currentPoint2 = new ol.geom.Point(mainhistoryXYarray[0]);
             var featuret2 = new ol.Feature(currentPoint2);
             //vectorContext.drawFeature(featuret, styles.geoMarker);
             vectorLayerHistoryVertx.drawFeature(featuret2, styles.geoMarker);*/
            //测试区域

            //适配最佳显示区域
            pmap.getView().fit(feature_tofit.getGeometry().getExtent(),map.getSize(),{
                padding:[0, 0, 0, 0],
                nearest:true
            });
            // change mouse cursor when over marker
            pmap.on('pointermove', function(e) {
                var pixel = window.map.getEventPixel(e.originalEvent);
                var hit = window.map.hasFeatureAtPixel(pixel);
                if(hit) {
                    window.map.getTarget().style.cursor = hit ? 'pointer' : '';
                }
            });
            now = new Date().getTime();
            pmap.on('postcompose',renderCustom );

        };

       var vectorLayer_rt=null;
       var vectorLayer_alone=null;
       var receivedpassive=function (event) {
       var receiveddata=event.data;
     //  debugger
       //  var tttt=  receiveddata.substring(1,receiveddata.length-2);
           var t4=JSON.parse(receiveddata);
           var  t40=t4[0];
            if(t40.hasOwnProperty("disc"))
            { //事件

                realtimeLbsByPassiveReceived(t40,"event");
            }else if(t40.hasOwnProperty("evtStatusPlusMinus")){
                  var p=t40.evtStatusPlusMinus;
            }
            else{
               //位置
           realtimeLbsByPassiveReceived(t40,"loc");
         }

           //  alert(receiveddata);
       };
       var realtimeLbsByPassiveReceived=function(pfeature,mode){
           debugger
          var toUpdateFeature= vectorLayer_rt.getSource().getFeatureById(pfeature.code);
          if(toUpdateFeature!==null){
              //update
              var previousXY=toUpdateFeature.getGeometry().getCoordinates();
              if(pfeature.type.toString()==window.realtimeMode) {
                  var toParse = [Number(pfeature.lat), Number(pfeature.long)];
                  var gcj = gpsTransferLib.gcj_encrypt(toParse[1], toParse[0]);
                  var tc = ol.proj.fromLonLat([Number(gcj.lon), Number(gcj.lat)], "EPSG:3857");

                  var unionProps = {};
                  var object = $.extend(unionProps, toUpdateFeature.getProperties(), pfeature);  //有target,

                  toUpdateFeature.setProperties(unionProps);//具有先后顺序
                  toUpdateFeature.setGeometry(new ol.geom.Point([Number(tc[0]), Number(tc[1])]));//具有先后顺序

                  if (pfeature.hasOwnProperty("disc")) {
                      if(flashFeaturesCollection.indexOf(pfeature.code)==-1)
                      {
                          flashFeaturesCollection.push(pfeature.code);
                      }

                      //事件
                      if (pfeature.type.toString() == "1") {
                          toUpdateFeature.setStyle(styles.event_man);

                      }
                      else if (pfeature.type.toString() == "2") {
                          toUpdateFeature.setStyle(styles.event_car);
                      }
                      //   debugger
                      if(!flashOpen) {
                          window.setInterval(flash, 444);
                      }

                  }
                  else{
                          if (pfeature.type.toString() == "1" && pfeature.status.toString() == "1") {
                              toUpdateFeature.setStyle(styles.man_on);
                          }
                          else if (pfeature.type.toString() == "1" && pfeature.status.toString() == "0") {
                              toUpdateFeature.setStyle(styles.man_off);
                          }
                          if (pfeature.type.toString() == "2" && pfeature.status.toString() == "1") {
                              toUpdateFeature.setStyle(styles.car_on);
                          } else if (pfeature.type.toString() == "2" && pfeature.status.toString() == "0") {
                              toUpdateFeature.setStyle(styles.car_off);
                          }

                  }
                  var toUpdateOverlay = window.map.getOverlayById(pfeature.code);
                  //toUpdateOverlay.setPosition([Number(tc[0]), Number(tc[1])]);
                  /*
                   toUpdateFeature.setGeometry(new ol.geom.Point([Number(pfeature.lat),Number(pfeature.long)]));
                   */
              }
           //vectorLayer_rt.getSource().removeFeature(toUpdateFeature);
          }
          else if(toUpdateFeature===null){
              //new
              var toParse=[Number(pfeature.lat),Number(pfeature.long)];
              var gcj=  gpsTransferLib.gcj_encrypt(toParse[1],toParse[0]);
              var tc=ol.proj.fromLonLat([Number(gcj.lon),Number(gcj.lat)],"EPSG:3857");

              var geomObj={};
              geomObj.geometry=new ol.geom.Point([Number(tc[0]), Number(tc[1])]);
              var empty = {};
              var object = $.extend(empty , pfeature, geomObj);  //有target,
            //  realtimeArray.push(empty);
               scope.addStaticGPSPoint(window.map,"realtime",empty);
          }
        };
      var mapIntersectionMove=  function(e) {
            var pixel = map.getEventPixel(e.originalEvent);
            var hit = map.hasFeatureAtPixel(pixel);

            map.getTarget().style.cursor = hit ? 'pointer' : '';
            if(hit)
            {
          /*      var feature = pmap.forEachFeatureAtPixel(pixel, function(feature,layer) {
                    var layerType=layer.get('name');
                    return feature;
                });*/
                //feature.get("type")
            }

        };
        var mapIntersectionClick=  function(evt) {

           // debugger
            //var testobj={};
            //testobj.content="pubsub.js";
            //pubsub.publish("playVideoWin", testobj);
            var coordinate = evt.coordinate;
            var pixelcoors=evt.pixel;
            var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature,layer) {
               // var layerType=layer.get('name');
                //alert(layerType);
                return feature;
            });
            if(feature!==undefined) {
                if (flashFeaturesCollection.indexOf(feature.getId()) != -1) {
                    flashFeaturesCollection.splice(flashFeaturesCollection.indexOf(feature.getId()), 1);
                    var evtchange={};
                    evtchange.evtId=feature.get("session");
                    ajaxModel.getData("/beidou/eventManage/updateEventStatus.do",evtchange,null);
                }

            //加载该模块代码
            require(["/gps/v3.19.1/gps/js/infoWindow.js"], function(info){
                var inf=info;
                inf.testframe(map,coordinate,pixelcoors);
                //alert(str);
            });
            }
/*
            var pixel = map.getEventPixel(e.originalEvent);
            var hit = map.hasFeatureAtPixel(pixel);
            map.getTarget().style.cursor = hit ? 'pointer' : '';*/
        };
        var flash=function () {
            flashOpen=true;
            vectorLayer_rt.getSource().forEachFeature(function (feature) {
                var sdfsf="";
                if($.inArray("disc", feature.getKeys())!=-1){

                    if(flashFeaturesCollection.indexOf(feature.getId())!=-1) {
                        if (typeof(feature.getStyle()) == "undefined") {
                            //事件
                            if (feature.get("type").toString() == "1") {
                                feature.setStyle(styles.event_man);

                            }
                            else if (feature.get("type").toString() == "2") {
                                feature.setStyle(styles.event_car);
                            }

                        } else {
                            feature.setStyle();
                        }
                    }
                    else{
                        if (feature.getProperties().type.toString() == "1" && feature.getProperties().status.toString() == "1") {
                            feature.setStyle(styles.man_on);
                        }
                        else if (feature.getProperties().type.toString() == "1" && feature.getProperties().status.toString() == "0") {
                            feature.setStyle(styles.man_off);
                        }
                        if (feature.getProperties().type.toString() == "2" && feature.getProperties().status.toString() == "1") {
                            feature.setStyle(styles.car_on);
                        } else if (feature.getProperties().type.toString() == "2" && feature.getProperties().status.toString() == "0") {
                            feature.setStyle(styles.car_off);
                        }
                    }
            }else{
                    //历史遗留事件

                }
            })
        };
       scope.initLayersGroup=function (pmap,mode) {
           _mainMap=pmap;
           if(mode==="realtime"){
               var mapLayers=pmap.getLayers().getArray();
               for (var i =  pmap.getLayers().getLength() - 1; i >= 0; i--) {
                   var tlyr= mapLayers[i];
                   // var layerVector = pmap.getLayers().item(1);//get target vector layer
                   if(tlyr.get('name')=="realtime")
                   {
                       //break;
                       tlyr.getSource().clear();
                       return;
                   }
               }

               debugger
               var websocket;
               websocket = new SockJS("/beidou/sockjs/websck/info");
               websocket.onopen = function (evnt) {
                                  console.log('服务主推通道连接成功');
               };
               websocket.onmessage =receivedpassive;
     /*          websocket.onmessage = function (evnt) {
                   debugger
                   var recdata = evnt.data;
                   alert(recdata);
                };*/
               websocket.onerror = function (evnt) {
              //     alert('服务主推通道连接异常');
               };
               websocket.onclose = function (evnt) {
                               console.log('服务主推通道连接关闭');
                  websocket = new SockJS("/beidou/sockjs/websck/info");
               }

               var vectorSource = new ol.source.Vector({
                   features: []
               });
               vectorLayer_rt = new ol.layer.Vector({
                   source: vectorSource,
                   name:"realtime"
               });
               window.mode="realtime";
               window.tr_vectorLayer_rt=vectorLayer_rt;
               pmap.addLayer(vectorLayer_rt);

               

           }else if(mode==="singlept"){
               var mapLayers=pmap.getLayers().getArray();
               for (var i =  pmap.getLayers().getLength() - 1; i >= 0; i--) {
                   var tlyr= mapLayers[i];
                   // var layerVector = pmap.getLayers().item(1);//get target vector layer
                   if(tlyr.get('name')=="singlept")
                   {
                       //break;
                       return;
                   }
               }
               var vectorSource_ = new ol.source.Vector({
                   features: []
               });
               vectorLayer_alone = new ol.layer.Vector({
                   source: vectorSource_,
                   name:"singlept"
               });
               window.mode="singlept";
               pmap.addLayer(vectorLayer_alone);

           }
          pmap.on('pointermove', mapIntersectionMove);
           pmap.on('singleclick', mapIntersectionClick);
       };
        var styles = {
            'man_on':new ol.style.Style({
                image: new ol.style.Icon({
                     anchor: [0.5, 1],
                    src: '/gps/v3.19.1/gps/images/map/renyuan_on.png'
                })
            }),
            'man_off': new ol.style.Style({
                image: new ol.style.Icon({
                     anchor: [0.5,1],
                    src: '/gps/v3.19.1/gps/images/map/renyuan_off.png'
                })
            }),
            'car_on': new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: '/gps/v3.19.1/gps/images/map/car_on.png'
                })
            }),
            'car_off': new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: '/gps/v3.19.1/gps/images/map/car_off.png'
                })
            }),
            'event_car': new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: '/gps/v3.19.1/gps/images/map/car_red.png'
                })
            }),
            'event_man': new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: '/gps/v3.19.1/gps/images/map/renyuan_red.png'
                })
            })
        };
        scope.clearInfoPopup=function (pmap) {
            window.map.getOverlays().clear();
            if(pmap.getOverlayById("eqInfoPoPup")!=null) {
                pmap.removeOverlay(pmap.getOverlayById("eqInfoPoPup"));
            }

        };
        //添加单点
        scope.flyto= function(map,location) {
            var duration = 2000;
            var start = +new Date();
            var pan = ol.animation.pan({
                duration: duration,
                source: /** @type {ol.Coordinate} */ (map.getView().getCenter()),
                start: start
            });
            var bounce = ol.animation.bounce({
                duration: duration,
                resolution: 4 * map.getView().getResolution(),
                start: start
            });
            map.beforeRender(pan, bounce);
            map.getView().setCenter(location);
        };
        scope.addStaticGPSPoint = function(pmap,mode,attributes,tr) {

            var iconFeature = new ol.Feature(attributes);
                iconFeature.setId(attributes.code);
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '/gps/v3.19.1/gps/images/map/icon.png'
                }))
            });

            if(attributes.hasOwnProperty("disc")){

                //事件
                if(attributes.type.toString()==window.realtimeMode) {
                    if(flashFeaturesCollection.indexOf(attributes.code)!=-1) {
                        if (attributes.type.toString() == "1") {
                            iconFeature.setStyle(styles.event_man);

                        }
                        else if (attributes.type.toString() == "2") {
                            iconFeature.setStyle(styles.event_car);
                        }
                    }
                    //   debugger
                    if(!flashOpen) {
                        window.setInterval(flash, 444);
                    }
                }
            }else {
                if(mode=="singlept") {
                    if (attributes.type.toString() == "1" && attributes.status.toString() == "1") {
                        iconFeature.setStyle(styles.man_on);
                    }
                    else if (attributes.type.toString() == "1" && attributes.status.toString() == "0") {
                        iconFeature.setStyle(styles.man_off);
                    } else if (attributes.type.toString() == "2" && attributes.status.toString() == "1") {
                        iconFeature.setStyle(styles.car_on);
                    } else if (attributes.type.toString() == "2" && attributes.status.toString() == "0") {
                        iconFeature.setStyle(styles.car_off);
                    }
                }
                else if(mode=="realtime")
                {
                   if( window.realtimeMode=="1") {
                       if (attributes.type.toString() == "1" && attributes.status.toString() == "1") {
                           iconFeature.setStyle(styles.man_on);
                       }
                       else if (attributes.type.toString() == "1" && attributes.status.toString() == "0") {
                           iconFeature.setStyle(styles.man_off);
                       }
                   }else if(window.realtimeMode=="2") {
                       if (attributes.type.toString() == "2" && attributes.status.toString() == "1") {
                           iconFeature.setStyle(styles.car_on);
                       } else if (attributes.type.toString() == "2" && attributes.status.toString() == "0") {
                           iconFeature.setStyle(styles.car_off);
                       }
                   }
                }
            }


            if(mode==="singlept"){
               // if(window.zoomlevel==16) {
                    vectorLayer_alone.getSource().clear();
                //}
                vectorLayer_alone.getSource().addFeature(iconFeature);
                //适配最佳显示区域
                var pe=ol.extent.buffer(iconFeature.getGeometry().getExtent(),0.01);
   /*              pmap.getView().fit(pe,map.getSize(),{
                    padding:[0, 0, 0, 0],
                     nearest:true
                });*/
               var pan = ol.animation.pan({
                    duration: 700,
                    source:( pmap.getView().getCenter())
                });
                pmap.beforeRender(pan);
                pmap.getView().setCenter( iconFeature.getGeometry().getCoordinates());

            }else if(mode==="realtime") {
                if (attributes.type.toString() == window.realtimeMode){
                    var mapLayers = window.map.getLayers().getArray();
                require(["/gps/v3.19.1/gps/js/infoWindow.js", '/gps/v3.19.1/gps/gpspg/GPSJP.js'], function (infopao, gpspg) {
                    for (var i = window.map.getLayers().getLength() - 1; i >= 0; i--) {
                        var tlyr = mapLayers[i];
                        // var layerVector = pmap.getLayers().item(1);//get target vector layer
                        if (tlyr.get('name') == "realtime") {
                            //break;
                            tlyr.getSource().addFeature(iconFeature);
                            var lon = iconFeature.get("long");
                            var lat = iconFeature.get("lat");
                            var toParse = [Number(lat), Number(lon)];
                            var gcj = gpspg.gcj_encrypt(toParse[1], toParse[0]);
                            var tc = ol.proj.fromLonLat([Number(gcj.lon), Number(gcj.lat)], "EPSG:3857");
                            if (tc[0] != 0) {
                                infopao.pname(window.map, iconFeature, tc);
                            }

                        }
                    }
                });
                    if(!flashOpen) {
                        window.setInterval(flash, 444);
                    }
            }
                //适配最佳显示区域
             /*   var pex=[110.2770345055088,38.54270831115447,110.30133950550879,38.56019831115447];
                pmap.getView().fit(pex,map.getSize(),{
                    padding:[0, 0, 0, 0],
                    nearest:true
                });*/
                //    flyto(pmap,pmap.getView(),coor);
            }
        };
        return scope;
    }({}, jQuery));
});
