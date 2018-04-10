/**
 * Created by Administrator on 2017/3/21.
 */

define(['ajaxModel',
    '/gps/v3.19.1/gps/js/infoWindow.js',
    '/gps/v3.19.1/gps/gpspg/GPSJP.js',
    'jquery',
    'handlebars'
], function(ajaxModel,infotime,GPSJP) {
    return (function(scope, $) {
        var mainhistoryXYarray;
     /*   var vectorLayerHistoryVertx;
           var vectorLayerHistoryVertxMainPt;*/
       var nextPoint;
        /**
         *    Geo Constants
         */
        // Point.EARTH_RADIUS = 3958.75;    // in miles
        var EARTH_RADIUS = 6370.856; // in km
        var DEG2RAD =  0.01745329252;  // factor to convert degrees to radians (PI/180)
        var RAD2DEG = 57.29577951308;

        var internal =50;// 50ms
        var speed=50;
        //var speed=0.0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001;
   //     var speed = 5210; // 50m/50ms, 1000m/s 标准

        var PointDyn=function(x, y) {
            this.x = parseFloat(x);
            this.y = parseFloat(y);
        };


        var geoBearingTo=function ( point1,point2 ) {
            var x = new Array(2);
            var y = new Array(2);
            var bearing;
            var adjust;

            if( true) {
                x[0] = point1.x * DEG2RAD;    y[0] = point1.y * DEG2RAD;
                x[1] = point2.x * DEG2RAD;    y[1] = point2.y * DEG2RAD;

                var a = Math.cos(y[1]) * Math.sin(x[1] - x[0]);
                var b = Math.cos(y[0]) * Math.sin(y[1]) - Math.sin(y[0])
                    * Math.cos(y[1]) * Math.cos(x[1] - x[0]);

                if((a == 0) && (b == 0)) {
                    bearing = 0;
                    return bearing;
                }

                if( b == 0) {
                    if( a < 0)
                        bearing = 270;
                    else
                        bearing = 90;
                    return bearing;
                }

                if( b < 0)
                    adjust = Math.PI;
                else {
                    if( a < 0)
                        adjust = 2 * Math.PI;
                    else
                        adjust = 0;
                }
                bearing = (Math.atan(a/b) + adjust) * RAD2DEG;
                return bearing;
            } else
                return null;
        };



          var geoWaypoint=function ( distance, bearing,point1 ) {
            var wp = new PointDyn( 0, 0 );

            // Math.* trig functions require angles to be in radians
            var x = point1.x * DEG2RAD;
            var y = point1.y * DEG2RAD;
            var radBearing = bearing * DEG2RAD;

            // Convert arc distance to radians
            var c = distance / EARTH_RADIUS;

            wp.y = Math.asin( Math.sin(y) * Math.cos(c) + Math.cos(y) * Math.sin(c) * Math.cos(radBearing)) * RAD2DEG;

            var a = Math.sin(c) * Math.sin(radBearing);
            var b = Math.cos(y) * Math.cos(c) - Math.sin(y) * Math.sin(c) * Math.cos(radBearing)

            if( b == 0 )
                wp.x = point1.x;
            else
                wp.x = point1.x + Math.atan(a/b) * RAD2DEG;

            return wp;
        };

       var getNextPoint = function(currentPoint, stopPoint) {

            var nextPoint = getPointOnLineByDistance(currentPoint, stopPoint, speed);

            var x_current_stop = Math.abs(stopPoint[0] - currentPoint[0]);
            var x_current_next = Math.abs(nextPoint[0] - currentPoint[0]);
            var y_current_stop = Math.abs(stopPoint[1] - currentPoint[1]);
            var y_current_next = Math.abs(nextPoint[1] - currentPoint[1]);

            if(x_current_next > x_current_stop || y_current_next > y_current_stop) {
                return stopPoint;
            }

            return nextPoint;
        },

         getPointOnLineByDistance =function(p1, p2, distance) {

            var ppp1 = new PointDyn(p1[0], p1[1]);
            var ppp2 = new PointDyn(p2[0], p2[1]);

            var bearing = geoBearingTo(ppp1,ppp2);
            var ppp3 = geoWaypoint(distance / 1000, bearing,ppp1);
             return [Number(ppp3.x),Number(ppp3.y)];
             //return new ol.geom.Point([Number(ppp3.x),Number(ppp3.y)]);
            //return new OpenLayers.Geometry.Point(ppp3.x, ppp3.y);
        };


        //加载模板信息
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
        var styles = {
            'dyn':new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: 4,
                    color: [255, 0, 250, 1]
                })
            }),
            'route': new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: 6, color: [0, 0, 250, 0.8]
                })
            }),
            'starticon': new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 0.9],
                    src: '/gps/v3.19.1/gps/images/map/startbd.png'
                })
            }),
            'endicon': new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 0.9],
                    src: '/gps/v3.19.1/gps/images/map/endbd.png'
                })
            }),
            'middleicon': new ol.style.Style({
                image: new ol.style.Icon({
                     anchor: [0.5, 0.9],
                    src: '/gps/v3.19.1/gps/images/map/waybd.png'
                })
            }),
            'geoMarker': new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    snapToPixel: false,
                    fill: new ol.style.Fill({color: 'white'}),
                    stroke: new ol.style.Stroke({
                        color: 'black', width: 4
                    })
                })
            })
        };

        function  stop() {
            map.un('postcompose', renderCustom);
        }
        var index=0;
        function renderCustom(event) {

        }
        var renderDyn=function (event) {
            //render

            var vectorContext = event.vectorContext;
            var frameState = event.frameState;

            nextPoint = getNextPoint(currentPoint, stopPoint);
            var vectorLayerHistoryVertxTemp=null;
            for (var i =  window.map.getLayers().getLength() - 1; i >= 0; i--) {
                var tlyr= mapLayers[i];
                // var layerVector = pmap.getLayers().item(1);//get target vector layer
                if(tlyr.get('name')=="dynamic1")
                {
                    vectorLayerHistoryVertxTemp=tlyr;
                    // return;
                }
                if(tlyr.get('name')=="dynamic2")
                {
                    // pmap.removeLayer(tlyr);

                    // return;
                }
            }
            var targetFeature=vectorLayerHistoryVertxTemp.getSource().getFeatures();
            /*
             var targetFeature=vectorLayerHistoryVertx.getSource().getFeatures();
             */
            targetFeature[0].getGeometry().appendCoordinate(nextPoint);
            //t.geometry.addPoint(nextPoint);
            //vectorLayer.drawFeature(t);
            //vectorContext.drawFeature(targetFeature[0], styles.dyn);
            currentPoint = nextPoint;

            //if(currentPoint.equals(stopPoint)) {
            if(currentPoint[0]==stopPoint[0]&&currentPoint[1]==stopPoint[1]) {
                // is end point
                /*if(stopPoint.equals(mainhistoryXYarray[mainhistoryXYarray.length - 1])) {
                 return;
                 }*/
                var last=mainhistoryXYarray[mainhistoryXYarray.length - 1];
                if(stopPoint[0]==last[0]&&stopPoint[1]==last[1]){
                    debugger
                    window.map.un('postcompose', renderDyn);
                    for (var i =   window.map.getLayers().getLength() - 1; i >= 0; i--) {
                        var tlyr= mapLayers[i];
                        // var layerVector = pmap.getLayers().item(1);//get target vector layer
                       if(tlyr.get('name')=="dynamic2qz"){

                         tlyr.getSource().addFeature(multiptFeaturesz);
                           window.map.removeOverlay(window.map.getOverlayById("endtime"));
                           infotime.historypathtime(window.map, "endtime", last,_endtime);
                        }
                    }
                    return;
                }
                //绘制中间拐点
                //
                var vectorLayerHistoryVertxMainPtTemp=null;
                for (var i =  window.map.getLayers().getLength() - 1; i >= 0; i--) {
                    var tlyr= mapLayers[i];
                    // var layerVector = pmap.getLayers().item(1);//get target vector layer
                    if(tlyr.get('name')=="dynamic1")
                    {
                        //vectorLayerHistoryVertxTemp=tlyr;
                        // return;
                    }
                    if(tlyr.get('name')=="dynamic2")
                    {
                        //  pmap.removeLayer(tlyr);
                        vectorLayerHistoryVertxMainPtTemp=tlyr;
                        // return;
                    }
                }

/*
                var middlePt=new ol.geom.Point(stopPoint);
                var targetFeature2=vectorLayerHistoryVertxMainPtTemp.getSource().getFeatures();
                if(targetFeature2.length==0)
                {
                    var multiptFeatures2=new ol.Feature({
                        geometry:new ol.geom.MultiPoint(
                            [stopPoint])
                    });
                    var vectorVertxMainPt2=new ol.source.Vector({features:[multiptFeatures2]});
                    vectorLayerHistoryVertxMainPtTemp.setSource(vectorVertxMainPt2);

                }
                else{
                    targetFeature2[0].getGeometry().appendPoint(middlePt);
                }
*/

                /*
                 var targetFeature2=vectorLayerHistoryVertxMainPt.getSource().getFeatures();
                 */
                //t.geometry.addPoint(nextPoint);
                //vectorLayer.drawFeature(t);
                //vectorContext.drawFeature(targetFeature2[0], styles.middleicon);
                //绘制中间拐点
                startPoint = stopPoint;
                startPointIndex++;
                stopPoint = mainhistoryXYarray[startPointIndex + 1];
            }
            //pmap.render();

            //se
        };
        var _begintime="";
        var _endtime="";
        //添加历史路线
        scope.addHistoryRouteOfGPSPoint=function (pmap,polylinegeom,original84XY,begintime,endtime) {
            _begintime=begintime;
            _endtime=endtime;
            window.mode="historypath";
            window._original84XY=original84XY;
             mapLayers=pmap.getLayers().getArray();
            for (var i =  pmap.getLayers().getLength() - 1; i >= 0; i--) {
                var tlyr= mapLayers[i];
                // var layerVector = pmap.getLayers().item(1);//get target vector layer
                if(tlyr.get('name')=="dynamic1")
                {
                        pmap.removeLayer(tlyr);
                       // return;
                }
                if(tlyr.get('name')=="dynamic2")
                {
                      pmap.removeLayer(tlyr);

                     // return;
                }
                if(tlyr.get('name')=="dynamic2qz"){
                    pmap.removeLayer(tlyr);
                }
            }

            mainhistoryXYarray=polylinegeom;
            var feature = new ol.Feature({
                geometry:new ol.geom.LineString(
                    [mainhistoryXYarray[0],mainhistoryXYarray[0]])
            });
            var multiptFeatures=new ol.Feature({
                geometry:new ol.geom.MultiPoint(
                    [mainhistoryXYarray[0],mainhistoryXYarray[mainhistoryXYarray.length-1]])
            });

              var vertxstyle= new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 9,
                    snapToPixel: false,
                    fill: new ol.style.Fill({color: 'white'}),
                    stroke: new ol.style.Stroke({
                        color: 'black', width: 4
                    })
                })
            });
            //multiptFeatures.setStyle(vertxstyle);
/*
            var vectorVertxMainPt=new ol.source.Vector({features:[multiptFeatures]});
*/
            var vectorVertxMainPt=new ol.source.Vector({features:[]});
            var vectorLayerHistoryVertxMainPt = new ol.layer.Vector({
                source: vectorVertxMainPt,
                name:"dynamic2"
            });

            //起终点
             var  multiptFeaturesq=new ol.Feature({
                geometry:new ol.geom.Point(
                    mainhistoryXYarray[0])
            });
             multiptFeaturesz=new ol.Feature({
                geometry:new ol.geom.Point(
                    mainhistoryXYarray[mainhistoryXYarray.length-1])
            });
            multiptFeaturesq.setStyle(styles.starticon);
            multiptFeaturesz.setStyle(styles.endicon);

           // var vectorVertxMainPtqz=new ol.source.Vector({features:[multiptFeaturesq,multiptFeaturesz]});
            var vectorVertxMainPtqz=new ol.source.Vector({features:[multiptFeaturesq]});
            var vectorLayerHistoryVertxMainPtqz = new ol.layer.Vector({
                source: vectorVertxMainPtqz,
                name:"dynamic2qz"
            });
            //起终点
            /*feature.setStyle(new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: 3,
                    color: [255, 0, 0, 1]
                })
            }));*/
            var vectorVertx=new ol.source.Vector({features:[]});
            var vectorLayerHistoryVertx = new ol.layer.Vector({
                source: vectorVertx,
                name:"dynamic1"
            });
           vectorLayerHistoryVertx.setStyle(styles.dyn);
            pmap.addLayer(vectorLayerHistoryVertx);
           // vectorLayerHistoryVertxMainPt.setStyle(styles.middleicon);
            //pmap.addLayer(vectorLayerHistoryVertxMainPt);

            vectorLayerHistoryVertx.getSource().addFeature(feature);
            pmap.addLayer(vectorLayerHistoryVertxMainPtqz);
            window.map.removeOverlay(window.map.getOverlayById("begintime"));
            infotime.historypathtime(window.map, "begintime", mainhistoryXYarray[0],_begintime);

            window.mode="historypath";

/*
            var startPointIndex = 0;
            var startPoint = mainhistoryXYarray[startPointIndex];
            var stopPoint = mainhistoryXYarray[startPointIndex + 1];
            var currentPoint = mainhistoryXYarray[startPointIndex];
            var nextPoint;
*/
             startPointIndex = 0;
             startPoint = mainhistoryXYarray[startPointIndex];
             stopPoint = mainhistoryXYarray[startPointIndex + 1];
             currentPoint = mainhistoryXYarray[startPointIndex];


            var feature_tofit = new ol.Feature({
                geometry:new ol.geom.LineString(polylinegeom)
            });

            //适配最佳显示区域
       /*     pmap.getView().fit(feature_tofit.getGeometry().getExtent(),map.getSize(),{
                padding:[0, 0, 0, 0],
                nearest:true
            });*/
            var pan = ol.animation.pan({
                duration: 700,
                source:( pmap.getView().getCenter())
            });
            pmap.beforeRender(pan);
            pmap.getView().setCenter( feature_tofit.getGeometry().getCoordinateAt(0));

            // change mouse cursor when over marker
            pmap.on('pointermove', function(e) {
                var pixel = map.getEventPixel(e.originalEvent);
                var hit = map.hasFeatureAtPixel(pixel);
                map.getTarget().style.cursor = hit ? 'pointer' : '';
            });
            pmap.on('postcompose', renderDyn);

        };

        return scope;
    }({}, jQuery));
});

