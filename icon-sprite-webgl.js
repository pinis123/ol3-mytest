require(['/gps/v3.19.1/gps/gpspg/GPSJP.js'],function (trans) {
var iconInfo = [{
  offset: [0, 0],
  opacity: 1.0,
  rotateWithView: true,
  rotation: 0.0,
  scale: 1.0,
  //size: [1, 1]
}/*
, {
  offset: [110, 86],
  opacity: 0.75,
  rotateWithView: false,
  rotation: Math.PI / 2.0,
  scale: 1.25,
  size: [55, 55]
}, {
  offset: [55, 0],
  opacity: 0.5,
  rotateWithView: true,
  rotation: Math.PI / 3.0,
  scale: 1.5,
  size: [55, 86]
}, {
  offset: [212, 0],
  opacity: 1.0,
  rotateWithView: true,
  rotation: 0.0,
  scale: 1.0,
  size: [44, 44]
}*/
];

var i;

var iconCount = iconInfo.length;
var icons = new Array(iconCount);
for (i = 0; i < iconCount; ++i) {
  var info = iconInfo[i];
  icons[i] = new ol.style.Icon({
    //offset: info.offset,
    //opacity: info.opacity,
    //rotateWithView: info.rotateWithView,
    //rotation: info.rotation,
   // scale: info.scale,
   // size: info.size,
    src: 'data/yl.png'
  });
}

var featureCount = 1;
var features = new Array(featureCount);
var feature, geometry;
var e = 25000000;
var toedit=[34.338492,109.020426];
debugger
/*for (i = 0; i < gs.features.length; ++i) {

    var gcj = trans.gcj_encrypt(toedit[0], toedit[1]);
    var tc = ol.proj.fromLonLat([Number(gcj.lon), Number(gcj.lat)], "EPSG:3857");
    //geometry=new ol.geom.Point([Number(gcj.lon), Number(gcj.lat)]);
   geometry=new ol.geom.Point([Number(tc[0]), Number(tc[1])]);
  /!*geometry = new ol.geom.Point(
      [2 * e * Math.random() - e, 2 * e * Math.random() - e]);*!/

  feature = new ol.Feature(geometry);
  feature.setStyle(
      new ol.style.Style({
       /!* image: icons[i % (iconCount - 1)]*!/
          image: icons[0]
      })
  );
  features[i] = feature;

}*/
var vectorSource = new ol.source.Vector({
  features: []
});
    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            src: '/gps/v3.19.1/examples/data/yl2.png',
            snapToPixel:false,
            scale:1
        }))
    });
    var iconStylehigh = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            src: '/gps/v3.19.1/examples/data/mark_bs.png',
            //snapToPixel:false,
            scale:1,
            offset:[0,0]
        }))
    });
    var poly1=new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.6)'
        }),
        stroke: new ol.style.Stroke({
            color: '#319FD3',
            width: 1
        })
    });
    var poly2=new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(0, 255, 0, 0.6)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffffff',
            width: 3
        })
    });
    var poly3=new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 0.6)'
        }),
        stroke: new ol.style.Stroke({
            color: '#0000FF',
            width: 1
        })
    });
    var poly4=new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffffff',
            width: 4
        })
    });
    var styleFunction = function(feature) {
        var type=feature.get('fclass');
        if(type=="school") {
            return [poly4];
        }
        else if(type=="park"){
            return [poly3];
        }
        else if(type=="pitch"){
            return [poly2];
        }
        else {
            return [poly1];
        }
    };

    var styleFunction3 = function(feature) {
        return [iconStylehigh];
    };
    var styleFunction2 = function(feature) {
        return [iconStyle];
    };
    var vector = new ol.layer.Vector({
    source: vectorSource,
    style: styleFunction
});

    var styles = {
        'Point': new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                src: '/gps/v3.19.1/examples/data/mark_bs.png',
                //snapToPixel:false,
                scale:1,
                offset:[0,0]
            }))
            // image: image
        }),
        'LineString': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'green',
                width: 1
            })
        }),
        'MultiLineString': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'green',
                width: 1
            })
        }),
        'MultiPoint': new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                src: '/gps/v3.19.1/examples/data/mark_bs.png',
                //snapToPixel:false,
                scale:1,
                offset:[0,0]
            }))
            // image: image
        }),
        'MultiPolygon': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'black',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 0, 0.8)'
            })
        }),
        'Polygon': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'black',
                //lineDash: [4],
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.8)'
            })
        }),
        'GeometryCollection': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'magenta',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'magenta'
            }),
            image: new ol.style.Circle({
                radius: 10,
                fill: null,
                stroke: new ol.style.Stroke({
                    color: 'magenta'
                })
            })
        }),
        'Circle': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255,0,0,0.2)'
            })
        })
    };

    var styleFunctionpolygon = function(feature) {
        var type=feature.getGeometry().getType();
        console.log(type);
        return styles[type];
    };
    var vectorSourcecustom = new ol.source.Vector({
        features: []
    });
var vectorcustom=new ol.layer.Vector({
    source: vectorSourcecustom,
    style: styleFunctionpolygon
});
var imagevector=new ol.layer.Image({
    source:new ol.source.ImageVector({
        source:vectorSource,
        style: styleFunction
    })
})
var layer = new ol.layer.Tile({
    source: new ol.source.OSM()
});
var projection = ol.proj.get("EPSG:3857");

var resolutions= [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677, 0.14929107084870338, 0.07464553542435169, 0.037322767712175846, 0.018661383856087923, 0.009330691928043961, 0.004665345964021981, 0.0023326729820109904, 0.0011663364910054952, 5.831682455027476E-4, 2.915841227513738E-4, 1.457920613756869E-4];
var tilegrid = new ol.tilegrid.TileGrid({
    origin: [-20037508.34,20037508.34],
    resolutions: resolutions
});
//m@177000000
//s@110
var google_image_source = new ol.source.TileImage({
    crossOrigin: 'anonymous',
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
/*
        var hu="http://mt1.google.cn/maps/vt?lyrs=s@110&hl=zh-CN&gl=CN&z="+z+"&x="+x+"&y="+y;
*/
        var hu="http://mt2.google.cn/maps/vt?lyrs=s&hl=zh-CN&gl=CN&z="+z+"&x="+x+"&y="+y;

        var jj="http://mt2.google.cn/vt/imgtp=png32&lyrs=h@205000000&hl=zh-CN&gl=CN&z="+z+"&x="+x+"&y="+y;
        return hu;

        //   return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20151021&scaler=1&p=1";
    }
});

var google_image_layer = new ol.layer.Tile({
    source: google_image_source,
    //preload:18
});
var gaodeMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        crossOrigin: 'anonymous',
        //  url:'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
        url:'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
    }),
    visible:true,
    name:"amap"
});
    var rasterLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            crossOrigin: 'anonymous',
          url:'http://mt1.google.cn/vt/lyrs=s@110&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'})
    });
    var rasterLayer_font = new ol.layer.Tile({
        source: new ol.source.XYZ({
            crossOrigin: 'anonymous',
          url:'http://mt1.google.cn/vt/imgtp=png32&lyrs=h@205000000&hl=zh-CN&gl=CN&z={z}&x={x}&y={y}'})
    });
    var tilemillpng="http://localhost:20008/tile/formalhexgonal/{z}/{x}/{y}.png";
    var tilemill_nongye="http://localhost:20008/tile/nongye/{z}/{x}/{y}.png";
    var tilemill_nongye_one="http://localhost:20008/tile/ny_lantian_one/{z}/{x}/{y}.png";
    var tilemill_nongye_two="http://localhost:20008/tile/ny_lantian_two/{z}/{x}/{y}.png";
    var tilemill_nongye_three="http://localhost:20008/tile/ny_lantian_three/{z}/{x}/{y}.png";
    var tilemill_nongye_four="http://localhost:20008/tile/ny_lantian_four/{z}/{x}/{y}.png";
    var tilemill_nongye_five="http://localhost:20008/tile/ny_lantian_five/{z}/{x}/{y}.png";
    var tilemill_nongye_six="http://localhost:20008/tile/ny_lantian_six/{z}/{x}/{y}.png";
    var tilemill_nongye_seven="http://localhost:20008/tile/ny_lantian_seven/{z}/{x}/{y}.png";
    var tilemill_nongye_eight="http://localhost:20008/tile/ny_lantian_eight/{z}/{x}/{y}.png";
    var tilemill_nongye_nine="http://localhost:20008/tile/ny_lantian_nine/{z}/{x}/{y}.png";
    var temptilemill="http://192.168.23.102:20008/tile/testny/{z}/{x}/{y}.png"
    var pro = new ol.layer.Tile({
        source: new ol.source.XYZ({
            crossOrigin: 'anonymous',
            //url: 'http://localhost:20008/tile/allols/{z}/{x}/{y}.png',
            tileUrlFunction: function (tileCoord) {
                var zRegEx = /\{z\}/g;
                var xRegEx = /\{x\}/g;
                var yRegEx = /\{y\}/g;
                var dashYRegEx = /\{-y\}/g;

                if (!tileCoord) {
                    return undefined;
                } else {
                    var req=tilemillpng.replace(zRegEx, tileCoord[0].toString())
                        .replace(xRegEx, tileCoord[1].toString())
                        .replace(yRegEx, function() {
                            var y = -tileCoord[2] - 1;
                            return y.toString();
                        })
                        .replace(dashYRegEx, function() {
                            var z = tileCoord[0];
                            var range = tileGrid.getFullTileRange(z);
                            ol.asserts.assert(range, 55); // The {-y} placeholder requires a tile grid with extent
                            var y = range.getHeight() + tileCoord[2];
                            return y.toString();
                        });
                    return req+"?t="+(new Date()).valueOf()+"$"+Math.floor(Math.random()*999999999999+1000).toString();
                 //   return req+"?_t="+ (new Date()).valueOf();
                }
             }
        })
    });
    //往下utfgrid

    var tilemillutfgrid="http://localhost:20008/tile/allols/{z}/{x}/{y}.grid.json";
    var tileJSON ={};
    tileJSON.attribution="";
    //tileJSON.bounds=[- 20037508.3427892,- 20037508.3427892, 20037508.3427892, 20037508.3427892];
    // tileJSON.bounds=[92.0961074829102,18.0601139068604,134.511642456055,52.6001663208008];
    tileJSON.bounds=[-180,-85.05112877980659,180,85.05112877980659];//testdynamic
    //tileJSON.bounds=[81.8787002563477,3.58839797973633,135.360427856445,53.8122596740723];//district_cn
    //tileJSON.grids=["http://localhost:8080/geoserver/edcution/wms?service=WMS&version=1.1.0&request=GetMap&layers=edcution:education_webmu&styles=&bbox={utfbox}&width=256&height=256&srs=EPSG:3857&format=application%2Fjson%3Btype%3Dutfgrid"];
    /*tileJSON.grids=[ '/geoserver/gwc/service/tms/1.0.0/' + layer +
     '@EPSG%3A'+projection_epsg_no+'@utfgrid/{z}/{x}/{-y}.utfgrid'];*/
    // tileJSON.grids=["http://localhost:20008/tile/testdynamic/{z}/{x}/{y}.grid.json"];
    // tileJSON.grids=["http://localhost:20008/tile/formalhexgonal/{z}/{x}/{y}.grid.json"];
    tileJSON.grids=["http://192.168.23.102:20008/tile/testny/{z}/{x}/{y}.grid.json"];
    tileJSON.maxzoom=18;
    tileJSON.minzoom=2;
    tileJSON.scheme="xyz";

    var gridSourceutf = new ol.source.TileUTFGrid({
        //url: 'https://api.tiles.mapbox.com/v4/mapbox.geography-class.json?secure&access_token=',
    /*   tileUrlFunction: function (tileCoord, pixelRatio, proj) {
            var zRegEx = /\{z\}/g;
           var xRegEx = /\{x\}/g;
           var yRegEx = /\{y\}/g;
           var dashYRegEx = /\{-y\}/g;
          console.log("utf");
           if (!tileCoord) {
               return undefined;
           } else {
               var req=tilemillutfgrid.replace(zRegEx, tileCoord[0].toString())
                   .replace(xRegEx, tileCoord[1].toString())
                   .replace(yRegEx, function() {
                       var y = -tileCoord[2] - 1;
                       return y.toString();
                   })
                   .replace(dashYRegEx, function() {
                       var z = tileCoord[0];
                       var range = tileGrid.getFullTileRange(z);
                       ol.asserts.assert(range, 55); // The {-y} placeholder requires a tile grid with extent
                       var y = range.getHeight() + tileCoord[2];
                       return y.toString();
                   });
               return req+"?_t="+ (new Date()).valueOf();
           }}*/
       // url:'http://localhost/template/{z}/{x}/{y}.grid.json'
        tileJSON:tileJSON
    });

    var gridLayerutf = new ol.layer.Tile({source: gridSourceutf});

     var urls="http://localhost:8080/geoserver/pinis/wms?service=WMS&TRANSPARENT=true&version=1.1.0&request=GetMap&layers=pinis:schools&styles=&bbox={bbox}&width=256&height=256&srs=EPSG:4326&format=image%2Fpng";
    var arcgistif="http://localhost:8080/geoserver/sf/wms?service=WMS&TRANSPARENT=false&version=1.1.0&request=GetMap&layers=sf:arcgistif&styles=&bbox={bbox}&width=256&height=256&srs=EPSG:4326&format=image%2Fjpeg";
      var gridSource = new ol.source.TileImage({
        //url: 'https://api.tiles.mapbox.com/v4/mapbox.geography-class.json?secure&access_token=' + key
        crossOrigin: 'anonymous',
        tileUrlFunction: function (tileCoord) {

            //var origin = this.getOrigin(tileCoord[0]);
            //var resolution = this.getResolution(tileCoord[0]);
            //var tileSize = ol.size.toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
            //var resolution=map.getView().getResolution()

            var resolution = map.getView().getResolution();


          //  var cornerCoordinate = 20037508.3427892;
            // var minX = -cornerCoordinate + tileCoord[1] * 256 * resolution;
           //  var minY = cornerCoordinate + tileCoord[2] * 256 * resolution;
           //  var maxX = minX + 256 * resolution;
           //  var maxY = minY +256 * resolution;


            //China
            var minX = -180 + tileCoord[1] * 256 * resolution;
            var minY = 90 + tileCoord[2] * 256 * resolution;
            var maxX = minX + 256 * resolution;
            var maxY = minY + 256 * resolution;
            //ChinaOnlineCommunity
            //var boxbox2 = xmin.toString() + "%2C" + ymin.toString() + "%2C" + xmax.toString() + "%2C" + ymax.toString();
            var boxbox = minX.toString() + "%2C" + minY.toString() + "%2C" + maxX.toString() + "%2C" + maxY.toString();

            var purl = arcgistif.replace('{bbox}', boxbox);
            return purl;
            //return urlTemplate.replace('{z}', (tileCoord[0] - 1).toString())
            //                  .replace('{x}', tileCoord[1].toString())
            //                  .replace('{y}', (-tileCoord[2] - 1).toString());
        }
    });
    //注释
    var gridLayer = new ol.layer.Tile({source: gridSource});

    //往上utfgrid
    var hightlight=new ol.layer.Vector({
        source:new ol.source.Vector({
            features:[],
            style:styleFunction3

        })
    });
   var layer = 'cite:district_cn';
//    var layer = 'sf:testdynamic';

    function getStyle()
    {	var p = "hatch";
        debugger
        return [ new ol.style.Style(
            {	fill: new ol.style.FillPattern(
                {	pattern: (p!='Image (PNG)') ? p : undefined,
                    image: (p=='Image (PNG)') ? new ol.style.Icon({ src : 'data/pattern.png' }) : undefined,
                    ratio: 1,
                    icon: p=='Image (PNG)' ? new ol.style.Icon ({src:'data/target.png'}) : undefined,
                    color: "white",
                    offset:0,
                    scale: 0.5,
                    fill: new ol.style.Fill ({ color:"rgba(255,255,255,0)" }),
                    size: 3.5,
                    spacing: 14,
                    angle: -45
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffffff',
                    width: 2.8
                })
            })];
    }

    // Nouv
    var projection_epsg_no = '3857';
 var map = new ol.Map({
  //renderer: ('webgl'),
   layers: [
    /*new ol.layer.Tile({
  source: new ol.source.OSM()
  }),*/
      /* new ol.layer.Tile({
           source: new ol.source.XYZ({
               crossOrigin: 'anonymous',
             //url: '/geoserver/gwc/service/tms/1.0.0/' + 'sf%3Atestsmaller' +
             // '@EPSG%3A'+'3857'+'@png/{z}/{x}/{-y}.png'
                //url:tilemill_nongye+"?t="+(new Date()).valueOf()+"$"+Math.floor(Math.random()*999999999999+1000).toString()
               url:tilemill_nongye_seven
             //  url:'http://mt1.google.cn/vt/lyrs=s@110&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
           }),
       }),
       new ol.layer.Tile({
           source: new ol.source.XYZ({
               crossOrigin: 'anonymous',
               //url: '/geoserver/gwc/service/tms/1.0.0/' + 'sf%3Atestsmaller' +
               // '@EPSG%3A'+'3857'+'@png/{z}/{x}/{-y}.png'
               //url:tilemill_nongye+"?t="+(new Date()).valueOf()+"$"+Math.floor(Math.random()*999999999999+1000).toString()
               url:tilemill_nongye_five
               //  url:'http://mt1.google.cn/vt/lyrs=s@110&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
           }),
       }),*/
           new ol.layer.Tile({
           source: new ol.source.XYZ({
               crossOrigin: 'anonymous',
               //url: '/geoserver/gwc/service/tms/1.0.0/' + 'sf%3Atestsmaller' +
               // '@EPSG%3A'+'3857'+'@png/{z}/{x}/{-y}.png'
               //url:tilemill_nongye+"?t="+(new Date()).valueOf()+"$"+Math.floor(Math.random()*999999999999+1000).toString()
               url:temptilemill
               //  url:'http://mt1.google.cn/vt/lyrs=s@110&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
           }),
       })
      ,gridLayerutf
      ,hightlight

   ],
 // layers: [rasterLayer,rasterLayer_font,pro,gridLayerutf,hightlight],//utf grid测试用例
  target: document.getElementById('map'),
  view: new ol.View({
    //center: ol.proj.transform([107.59117,37.58200],"EPSG:4326","EPSG:3857"),
      center: [174572.927145,3734046.62898],

      //center:[107.59117,37.58200],
    zoom: 12,
    //projection:'EPSG:3857'
  })
});
    var createDiv=document.createElement("div");
    createDiv.title="div title.";
    createDiv.id="id";
    //createDiv.class="class";
    createDiv.style="       background-color: rgba(0, 0, 0, 0.5); color:white;border-style: solid;border-color:white;border-width: 1px;font-weight: bolder;border-radius: 4px;";
    //createDiv.innerHTML="div里面的内容!";
    var infoOverlay = new ol.Overlay({
        element: createDiv,
        offset: [14, -23],
        stopEvent: false
    });
    map.addOverlay(infoOverlay);

    var displayCountryInfo = function(coordinate) {
        var viewResolution = /** @type {number} */ (map.getView().getResolution());
        gridSourceutf.forDataAtCoordinateAndResolution(coordinate, viewResolution,
            function(data) {
                // If you want to use the template from the TileJSON,
                //  load the mustache.js library separately and call
                //  info.innerHTML = Mustache.render(gridSource.getTemplate(), data);
                map.getTarget().style.cursor= data ? 'pointer' : '';
                if (data) {
                   // flagElement.src = 'data:image/png;base64,' + data['flag_png'];
                    //createDiv.innerHTML = data['admin'];
/*
                    createDiv.innerHTML = data.province+data.city+data.name+"  类型:"+data.schooltype;
*/
                   // createDiv.innerHTML = data.province+data.city+data.district;
                    createDiv.innerHTML ="数据详情:" +"     数据唯一标识码: "+data.GID+"    数据归属："+data.QXMC+"    数据类别: "+data.TBLXMC;

                    /*  var hlightfeat= new ol.Feature({
                          geometry: new ol.geom.Point( ol.proj.transform([Number(data.x),Number(data.y)],"EPSG:4326","EPSG:3857")),
                          name: 'Mygl'
                      });//点
  */
                    var wfs_getfeaturegeom="http://localhost:8080/geoserver/sf/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sf:elcltb_bj_longxian_new_sec&maxFeatures=1&outputFormat=application%2Fjson&cql_filter=featureid=%27"+data.GID+"%27&PROPERTYNAME=xyz";
                    $.ajax({
                        type:"POST",
                        url : wfs_getfeaturegeom
                    }).done(function(response) {
                        //merge(response,bx);
                        debugger
                        var temphighgeom=response.features[0].properties.xyz;
                        var hlightfeatgeom= ( new ol.format.GeoJSON()).readGeometry(temphighgeom);
                        var hlightfeat= new ol.Feature({
                            geometry: hlightfeatgeom,
                            //  geometry: hlightfeatgeom.transform("EPSG:4326","EPSG:3857"),
                            name: 'Mygl'
                        });//面
                        hlightfeat.setStyle(getStyle());
                        hightlight.getSource().clear();
                        hightlight.getSource().addFeature(hlightfeat);
                    });

              /*   两类分类处理暂注释   var hlightfeatgeom= ( new ol.format.GeoJSON()).readGeometry(data.xyz);
                     var hlightfeat= new ol.Feature({
                         geometry: hlightfeatgeom,
                         //  geometry: hlightfeatgeom.transform("EPSG:4326","EPSG:3857"),
                     name: 'Mygl'
                     });//面
                    hlightfeat.setStyle(getStyle());
                    hightlight.getSource().clear();
                    hightlight.getSource().addFeature(hlightfeat);*/
                }
                else{
                    hightlight.getSource().clear();
                }
                infoOverlay.setPosition(data ? coordinate : undefined);
                // infoOverlay.setPosition(data ? ol.proj.transform([Number(data.x),Number(data.y)],"EPSG:4326","EPSG:3857") : undefined);
            });
    };

    map.on('pointermove', function(evt) {
        if (evt.dragging) {
            return;
        }
       var coordinate = map.getEventCoordinate(evt.originalEvent);
     // displayCountryInfo(coordinate);
    });

    map.on('click', function(evt) {
        debugger
        displayCountryInfo(evt.coordinate);
    });
/*

var overlayFeatures = [];
for (i = 0; i < featureCount; i += 30) {
  var clone = features[i].clone();
  clone.setStyle(null);
  overlayFeatures.push(clone);
}
*/

/*new ol.layer.Vector({
  map: map,
  source: new ol.source.Vector({
    features: overlayFeatures
  }),
  style: new ol.style.Style({
    image: icons[iconCount - 1]
  })
});*/
   var buffer2=1;
   var     tiles= {};
   var geometryFeatureMap=[];
   var zoom;
   var loadtile=function (x,y,z,bx) {
       var _box=bx[0].toString()+"%2C"+bx[1].toString()+"%2C"+bx[2].toString()+"%2C"+bx[3].toString();
       var layer = 'cite:district_cn';
       var projection_epsg_no = '4326';
       var url='/geoserver/gwc/service/tms/1.0.0/' + layer +
       '@EPSG%3A'+projection_epsg_no+'@geojson/{z}/{x}/{-y}.geojson';
       var  pbfurl='http://localhost:8080/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=cite:district_cn&STYLE=&TILEMATRIX=EPSG:3857:'+z+'&TILEMATRIXSET=EPSG:3857&FORMAT=application/json;type=geojson&TILECOL='+x+'&TILEROW='+y+'';
       var wmszidai='http://localhost:8080/geoserver/cite/wms?service=WMS&version=1.1.0&request=GetMap&layers=cite:district_cn&styles=&bbox='+_box+'&width=256&height=256&srs=EPSG:4326&format=application%2Fjson%3Btype%3Dgeojson';
       var t="http://localhost:8080/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite:district_cn&bbox="+_box+"&maxFeatures=10000&outputFormat=application%2Fjson";
       $.ajax({
           type:"POST",
           url : wmszidai
       }).done(function(response) {
           if (z != zoom) return; //Zoom has changed while read was active //TODO: Cancel these reads!
           //merge(response,bx);
           var features = response.features;
           var fil=[];
           if(features && features.length > 0) {
               for(var i=0, len=features.length; i<len; ++i) {
                   var geom = features[i].geometry;
                   //features[i].usage_count = 1;

                   if (geom) {
                       if ( geometryFeatureMap.indexOf(features[i].id)!==-1) {
                         //  debugger
                           console.log("me already existed ");
                       } else {
                           var bbfeature2= (new ol.format.GeoJSON()).readFeatures(features[i]);
                           fil.push(bbfeature2[0]);
                           //vectorcustom.getSource().addFeatures(bbfeature2);
                           //geometryFeatureMap.push(bbfeature2[0].getId());
                       }
                   }
               }
               //debugger
               tiles[[x, y]] = true;
               vectorcustom.getSource().addFeatures(fil);
           }
           response = null;
       });
       /*loadTile(x, y, curZoom,
        new OpenLayers.Bounds(bl, bt-tilelat, bl+tilelon, bt));*/
   }
    map.on('moveend',function(e){
        console.log('moveend了');
        return;
       // var bounds = e.frameState.extent;
        var bounds=map.getView().calculateExtent(map.getSize());

        if (bounds == null) return;
        var resolution = map.getView().getResolution();
      //  var tileSize = map.getTileSize();
       // var extent=[73.1540145874023,16.2652645111084,135.024658203125,53.0361366271973];
       // var extent=[81.8787002563477,3.58839797973633,135.360427856445,53.8122596740723];//distinct
         var extent=[81.8787002563477,3.58839797973633,135.360427856445,53.8122596740723];//distinct
       // extent= ol.proj.transformExtent(extent, ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));

        var curZoom=map.getView().getZoom();
        var tilelon = resolution * 256;
        var tilelat = resolution * 256;


        //Get tile bounding box
        var left = Math.floor((bounds[0] - extent[0])/tilelon) - buffer2;
        var right = Math.ceil((bounds[2] - extent[0])/tilelon) + buffer2;
        var top = Math.floor((extent[3] - bounds[3])/tilelat) - buffer2;
        var bottom = Math.ceil((extent[3] - bounds[1])/tilelat) + buffer2;

        if (curZoom != zoom) {
            console.log("zoom changed");
            vectorcustom.getSource().clear();
            geometryFeatureMap = [];
            tiles = {};
//             this.loadedBounds = null;
            zoom = curZoom;

        }


        for (var x=left; x<right; x++) {
            for (var y=top; y<bottom; y++) {
                if (!([x, y] in tiles)) {

                    console.log("new bbox happened");
                    var bl = x * tilelon + extent[0];
                    var bt = extent[3] - y * tilelat;
                    var zlevel=curZoom;
                    var bx=[bl, bt-tilelat, bl+tilelon, bt];
                    loadtile(x,y,zlevel,bx);
                }
            }
        }
        //Get tile bounding box
       /* var left = Math.floor((bounds.left )/tilelon) - this.buffer;
        var right = Math.ceil((bounds.right )/tilelon) + this.buffer;
        var top = Math.floor((bounds.top)/tilelat) - this.buffer;
        var bottom = Math.ceil(( bounds.bottom)/tilelat) + this.buffer;

        for (var x=left; x<right; x++) {
            for (var y = top; y < bottom; y++) {
                console.log("1234");
            }
        }*/

    });
/*map.on('click', function(evt) {
  var info = document.getElementById('info');
  info.innerHTML =
      'Hold on a second, while I catch those butterflies for you ...';

  window.setTimeout(function() {
    var features = [];
    map.forEachFeatureAtPixel(evt.pixel, function(feature) {
      features.push(feature);
      return false;
    });

    if (features.length === 1) {
      info.innerHTML = 'Got one butterfly';
    } else if (features.length > 1) {
      info.innerHTML = 'Got ' + features.length + ' butterflies';
    } else {
      info.innerHTML = 'Couldn\'t catch a single butterfly';
    }
  }, 1);
});

map.on('pointermove', function(evt) {
  if (evt.dragging) {
    return;
  }
  var pixel = map.getEventPixel(evt.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});*/
})
