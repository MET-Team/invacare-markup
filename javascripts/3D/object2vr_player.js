function object2vrPlayer(container) {
  var j = this;
  this.transitionsDisabled = false;
  var pan = {
    cur: 0,
    def: 0,
    min: 0,
    max: 1,
    d: 0
  };
  var tilt = {
    cur: 0,
    def: 0,
    min: -90,
    max: 1,
    d: 0
  };
  var fov = {
    cur: 90,
    def: 90,
    min: 1,
    max: 170,
    prev: 0,
    d: 0,
    mode: 0
  };
  var i1 = {
    width: 320,
    height: 480
  };
  var zoom = {
    cur: 1,
    def: 1,
    min: 1,
    max: 1,
    last: -1,
    d: 0,
    llI: 0,
    ll1: 0,
    ilI: 0,
    Iji: 0,
    viewport: 1,
    scalemode: 1
  };
  var lj = {
    l1l: {
      x: 0,
      y: 0
    },
    last: {
      x: 0,
      y: 0
    },
    l1i: {
      x: 0,
      y: 0
    },
    cur: {
      x: 0,
      y: 0
    },
    li: {
      x: 0,
      y: 0
    }
  };
  var Il = {
    ij: -1,
    l1l: {
      x: 0,
      y: 0
    },
    last: {
      x: 0,
      y: 0
    },
    l1i: {
      x: 0,
      y: 0
    },
    cur: {
      x: 0,
      y: 0
    },
    li: {
      x: 0,
      y: 0
    }
  };
  var I1 = {
    Ij: true,
    last: {
      x: 0,
      y: 0
    },
    li: {
      x: 0,
      y: 0
    },
    fov: {
      jl: false,
      iI1: 0
    }
  };
  var hotspots = {
    Ij: false,
    currentId: 0,
    lastId: 0,
    textbox: {
      Ij: true,
      width: 180,
      height: 20,
      textcolor: 0,
      background: true,
      backgroundcolor: 16777215,
      bordercolor: 0,
      borderradius: 1,
      borderwidth: 1,
      wordwrap: true
    }
  };
  hotspots.area = new Array;
  this.emptyHotspot = {
    pan: 0,
    tilt: 0,
    title: "",
    url: "",
    target: "",
    id: "",
    skinid: "",
    lj1: 100,
    lji: 20,
    wordwrap: false,
    obj: null
  };
  this.hotspot = this.emptyHotspot;
  this.mouse = {
    x: 0,
    y: 0
  };
  var lIl = 0;
  var divViewer = null;
  var divHotspots = null;
  var imgObject = null;
  var curImageObject = null;
  var imgObjectBack = null;
  var imgHotspot = null;
  var canvHotspot = null;
  var hotspotText = null;
  this.lII = null;
  this.checkLoaded = new Array;
  this.lil = false;
  this.divSkin = null;
  this.isLoaded = false;
  this.hasConfig = false;
  var percentLoaded = 0;
  var ili = false;
  var II = {
    Ij: false,
    timeout: 5,
    jl: false,
    Ii: 0.4,
    pingpong: false
  };
  var automove = {
    jl: false,
    Ii: 0.1,
    pan: 0,
    tilt: 0
  };
  var lastActivity;
  this.skinObj = null;
  this.userdata = {
    title: "",
    description: "",
    author: "",
    datetime: "",
    copyright: "",
    source: "",
    information: "",
    comment: ""
  };
  var soundArray = new Array;
  var globalVolume = 1;
  var overlay = {
    target: 0,
    current: 0,
    blendSpeed: 0.01,
    delay: 2,
    delayStart: 0,
    delayActive: false,
    auto: false
  };
  var margin = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  };
  var lI = {
    mode: 3,
    IIj: false,
    jj: false,
    ilj: false,
    j1l: true,
    i1j: true,
    l11: false,
    i1l: false,
    il1: 1,
    dblclickFullscreen: true,
    i1i: false,
    IjI: false,
    Ili: false,
    IIi: false,
    lI1: false,
    sensitivity: 10
  };
  var img = {
    x: 0,
    y: 0,
    il: 0,
    jI: 0,
    width: 100,
    height: 100,
    iI: 0,
    IiI: -1,
    Iil: -1,
    Ii1: -1,
    j1: 1,
    ji: 1,
    Il1: 1,
    ljl: 0,
    lij: 0,
    IlI: 0,
    incY: 0,
    cnt: 0,
    path: "images/",
    ext: "jpg"
  };
  var config = {
    background: true,
    backgroundcolor: 0
  };
  var lIi = "";
  var I1i = "transition";
  var Ill = "transform";
  var iIj = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYBgeACDAAADIAAE3iTbkAAAAAElFTkSuQmCC";
  var III = false;
  var basePath = "";
  var isIE = function () {
    return navigator.userAgent.indexOf("MSIE") >= 0;
  };
  var debugMsg = function (msg) {
    debug = document.getElementById("debug");
    if (debug) {
      debug.innerHTML = msg + "<br />";
    }
    if (window.console) {
      window.console.log(msg);
    }
  };
  var requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
      function (callback, element) {
        window.setTimeout(callback, 10);
      };
  })();
  this.iIi = function () {
    var lii = "Webkit,Moz,O,ms,Ms".split(",");
    var ii;
    lIi = "";
    I1i = "transition";
    Ill = "transform";
    for (ii = 0; ii < lii.length; ii++) {
      if (typeof document.documentElement.style[lii[ii] + "Transform"] !== "undefined") {
        lIi = "-" + lii[ii].toLowerCase() + "-";
        I1i = lii[ii] + "Transition";
        Ill = lii[ii] + "Transform";
      }
    }
  };
  this.setBasePath = function (I) {
    basePath = I;
  };
  var expandFilename = function (fn) {
    if (fn.charAt(0) == "/" || fn.indexOf("://") > 0) {
      return fn;
    } else {
      return basePath + fn;
    }
  };
  this.getPercentLoaded = function () {
    return percentLoaded;
  };
  this.setViewerSize = function (lj1, lji) {
    if (j.lil) {
      if (typeof window.innerWidth == "number") {
        lj1 = window.innerWidth;
        lji = window.innerHeight;
      } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        lj1 = document.documentElement.clientWidth;
        lji = document.documentElement.clientHeight;
      } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        lj1 = document.body.clientWidth;
        lji = document.body.clientHeight;
      }
    }
    var Iii = lj1 - margin.left - margin.right;
    var Iij = lji - margin.top - margin.bottom;
    i1.width = Iii;
    i1.height = Iij;
    divViewer.style.width = Iii + "px";
    divViewer.style.height = Iij + "px";
    divViewer.style.left = margin.left + "px";
    divViewer.style.top = margin.top + "px";
    updateImageSize();
    divHotspots.style.width = lj1 + "px";
    divHotspots.style.height = lji + "px";
    if (j.divSkin && j.divSkin.ggUpdateSize) {
      j.divSkin.ggUpdateSize(lj1, lji);
    }
  };
  var updateViewerSize = function () {
    j.setViewerSize(j.container.offsetWidth, j.container.offsetHeight);
  };
  var getViewerOffset = function () {
    var cur = {
      x: 0,
      y: 0
    };
    var obj = divViewer;
    if (obj.offsetParent) {
      do {
        cur.x += obj.offsetLeft;
        cur.y += obj.offsetTop;
      } while (obj = obj.offsetParent);
    }
    return cur;
  };
  var updateImageSize = function () {
    switch (zoom.scalemode) {
      case 1:
        zoom.viewport = Math.min(i1.width / img.width, i1.height / img.height);
        break;
      case 2:
        zoom.viewport = Math.max(i1.width / img.width, i1.height / img.height);
        break;
      case 3:
        zoom.viewport = i1.width / img.width;
        break;
      case 4:
        zoom.viewport = i1.height / img.height;
        break;
      default:
        zoom.viewport = 1;
    }
    imgObject.setAttribute("width", img.width);
    imgObject.setAttribute("height", img.height);
    imgObjectBack.setAttribute("width", img.width);
    imgObjectBack.setAttribute("height", img.height);
    var ll = "";
    imgObject.style.width = Math.round(img.width * zoom.viewport * zoom.cur) + "px";
    imgObject.style.height = Math.round(img.height * zoom.viewport * zoom.cur) + "px";
    imgObjectBack.style.width = Math.round(img.width * zoom.viewport * zoom.cur) + "px";
    imgObjectBack.style.height = Math.round(img.height * zoom.viewport * zoom.cur) + "px";
    var ofsx, ofsy;
    ofsx = zoom.viewport * zoom.cur * (zoom.llI - img.width / 2) + i1.width / 2;
    ofsy = zoom.viewport * zoom.cur * (zoom.ll1 - img.height / 2) + i1.height / 2;
    imgObject.style.left = Math.round(ofsx) + "px";
    imgObject.style.top = Math.round(ofsy) + "px";
    imgObjectBack.style.left = Math.round(ofsx) + "px";
    imgObjectBack.style.top = Math.round(ofsy) + "px";
  };
  var updateConfig = function () {
    if (config.background) {
      divViewer.style.backgroundColor = intToColor(config.backgroundcolor);
    } else {
      divViewer.style.backgroundColor = "transparent";
    }
  };
  this.setMargins = function (iIl, l1, iil, ii1) {
    margin.left = iIl;
    margin.top = l1;
    margin.right = iil;
    margin.bottom = ii1;
    updateViewerSize();
  };
  this.changeViewMode = function (I) {
    if (I == 0) {
      lI.l11 = false;
    }
    if (I == 1) {
      lI.l11 = true;
    }
    if (I == 2) {
      lI.l11 = lI.l11 ? false : true;
    }
  };
  this.getPan = function () {
    if (!lI.lI1) {
      return img.x;
    } else {
      return img.y;
    }
  };
  this.getPanN = function () {
    return this.getPan();
  };
  this.showObjectImage = function (x, y) {
    img.x = x;
    img.y = y;
    li1();
    j.dirty = true;
  };
  this.setPan = function (I) {
    resetActivity();
    if (!isNaN(I)) {
      if (!lI.lI1) {
        img.x = I;
      } else {
        img.y = I;
      }
    }
    j.dirty = true;
  };
  this.changePan = function (I, smooth) {
    resetActivity();
    if (!isNaN(I)) {
      MoveImageX(I);
    }
    j.dirty = true;
  };
  this.getTilt = function () {
    if (!lI.lI1) {
      return img.y;
    } else {
      return img.x;
    }
  };
  this.setTilt = function (I) {
    resetActivity();
    if (!isNaN(I)) {
      if (!lI.lI1) {
        img.y = I;
      } else {
        img.x = I;
      }
    }
    j.dirty = true;
  };
  this.changeTilt = function (I, smooth) {
    resetActivity();
    if (!isNaN(I)) {
      MoveImageY(I);
    }
    j.dirty = true;
  };
  this.getFov = function () {
    return zoom.cur * 100;
  };
  this.setZoom = function (ljj) {
    if (!isNaN(ljj)) {
      if (ljj < zoom.min) {
        zoom.cur = zoom.min;
      } else if (ljj > zoom.max) {
        zoom.cur = zoom.max;
      } else {
        zoom.cur = ljj;
      }
    }
    j.dirty = true;
  };
  this.setFov = function (I) {
    resetActivity();
    j.setZoom(I / 100);
  };
  this.changeFov = function (I, smooth) {
    this.setFov(this.getFov() - 10 * I);
  };
  this.changeFovLog = function (I, smooth) {
    this.setFov(this.getFov() * Math.exp(-I / 50));
  };
  this.setPanTilt = function (lll, l1) {
    resetActivity();
    if (!isNaN(lll)) {
      j.setPan(lll);
    }
    if (!isNaN(l1)) {
      j.setTilt(l1);
    }
    j.dirty = true;
  };
  this.setPanTiltFov = function (lll, l1, l1I) {
    resetActivity();
    if (!isNaN(lll)) {
      j.setPan(lll);
    }
    if (!isNaN(l1)) {
      j.setTilt(l1);
    }
    if (!isNaN(l1I) && l1I > 0 && l1I < 180) {
      j.setFov(l1I);
    }
    j.dirty = true;
  };
  this.setDefaultView = function () {
    img.x = img.j11;
    img.y = img.j1I;
    changeViewState(img.IlI);
    zoom.cur = zoom.def;
  };
  this.moveTo = function (lll, l1, l1I, Ii) {
    resetActivity();
    automove.jl = true;
    var ljI = lll.toString().split("/");
    if (ljI.length > 1) {
      lll = Number(ljI[0]);
      Ii = l1;
      l1 = Number(ljI[1]);
      if (ljI.length > 2) {
        l1I = Number(ljI[2]);
      }
    }
    if (!isNaN(lll)) {
      automove.pan = Number(lll);
    } else {
      automove.pan = img.x;
    }
    if (!isNaN(l1)) {
      automove.tilt = Number(l1);
    } else {
      automove.tilt = img.y;
    }
    if (!isNaN(l1I) && l1I > 0 && l1I < 180) {
      automove.fov = Number(l1I);
    } else {
      automove.fov = zoom.cur * 100;
    }
    if (!isNaN(Ii) && Ii > 0) {
      automove.Ii = Number(Ii);
    } else {
      automove.Ii = 1;
    }
  };
  this.moveToDefaultView = function (Ii) {
    this.moveTo(img.ljl, img.lij, zoom.def * 100, Ii);
  };
  var IIl = function (x, y) {
    lj.l1l.x = x;
    lj.l1l.y = y;
    lj.last.x = x;
    lj.last.y = y;
    I1.last.x = x;
    I1.last.y = y;
  };
  var II1 = function (x, y) {
    var vfov = j.getFov();
    if (lI.l11) {
      zoom.llI += x / zoom.cur;
      zoom.ll1 += y / zoom.cur;
    } else {
      MoveImageX(-x / 20);
      MoveImageY(-y / 20);
    }
    li1();
  };
  var Ilj = function (x, y) {
    lj.cur.x = x;
    lj.cur.y = y;
    lj.li.x = lj.cur.x - lj.last.x;
    lj.li.y = lj.cur.y - lj.last.y;
    lj.last.x = lj.cur.x;
    lj.last.y = lj.cur.y;
  };
  var resetActivity = function () {
    if (II.jl) {
      II.jl = false;
      img.il = 0;
      img.jI = 0;
    }
    if (automove.jl) {
      automove.jl = false;
      img.il = 0;
      img.jI = 0;
    }
    var d = new Date;
    lastActivity = d.getTime();
  };
  var Ijl = function (e) {
    if (!lI.jj) {
      e = e ? e : window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      if (!e.which || e.which == 0 || e.which == 1) {
        if (e.target == imgObject || e.target == imgObjectBack || e.target == j.lII) {
          IIl(e.pageX, e.pageY);
          Il.ij = 1;
          var d = new Date;
          var llj = d.getTime();
          Il.startTime = llj;
          resetActivity();
        }
      }
      lj.li.x = 0;
      lj.li.y = 0;
    }
  };
  var ijI = function (e) {
    if (!lI.jj) {
      e = e ? e : window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      IIl(e.screenX, e.screenY);
      Il.ij = 1;
      var d = new Date;
      var llj = d.getTime();
      Il.startTime = llj;
      resetActivity();
      lj.li.x = 0;
      lj.li.y = 0;
    }
  };
  var intToColor = function (d) {
    var hex = Number(d).toString(16);
    hex = "#000000".substr(0, 7 - hex.length) + hex;
    return hex;
  };
  var mouseMove = function (e) {
    var cur = getViewerOffset();
    j.mouse.x = e.pageX - cur.x + margin.left;
    j.mouse.y = e.pageY - cur.y + margin.top;

    if (!lI.jj) {
      e = e ? e : window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      if (Il.ij >= 0) {
        Ilj(e.pageX, e.pageY);
        resetActivity();
      }
      if (hotspots.Ij) {
        checkHotspot(e.pageX, e.pageY);
        if (hotspots.textbox.Ij) {
          if (hotspots.currentId > 0) {
            hotspotText.innerHTML = j.hotspot.title;
            hotspotText.style.color = intToColor(hotspots.textbox.textcolor);
            if (hotspots.textbox.background) {
              hotspotText.style.backgroundColor = intToColor(hotspots.textbox.backgroundcolor);
            } else {
              hotspotText.style.backgroundColor = "transparent";
            }
            hotspotText.style.border = "solid " + intToColor(hotspots.textbox.bordercolor) + " " + hotspots.textbox.borderwidth + "px";
            hotspotText.style.borderRadius = hotspots.textbox.borderradius + "px";
            hotspotText.style.textAlign = "center";
            if (hotspots.textbox.width > 0) {
              hotspotText.style.left = e.pageX - cur.x - hotspots.textbox.width / 2 + "px";
              hotspotText.style.width = hotspots.textbox.width + "px";
            } else {
              hotspotText.style.width = "auto";
              hotspotText.style.left = e.pageX - cur.x - hotspotText.offsetWidth / 2 + "px";
            }
            if (hotspots.textbox.height > 0) {
              hotspotText.style.height = hotspots.textbox.height + "px";
            } else {
              hotspotText.style.height = "auto";
            }
            hotspotText.style.top = e.pageY - cur.y + 25 + "px";
            hotspotText.style.visibility = "inherit";
            hotspotText.style.overflow = "hidden";
          } else {
            hotspotText.style.visibility = "hidden";
            hotspotText.innerHTML = "";
          }
        }
      }
    }
  };
  var iii = function (e) {
    if (!lI.jj) {
      e = e ? e : window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      if (Il.ij >= 0) {
        Ilj(e.screenX, e.screenY);
        resetActivity();
      }
    }
  };
  var Ij1 = function (e) {
    if (!lI.jj) {
      e = e ? e : window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      if (Il.ij >= 0) {
        Il.ij = -1;
        lj.li.x = 0;
        lj.li.y = 0;
        var d = new Date;
        var llj = d.getTime();
        var lli = -1;
        lli = Math.abs(lj.l1l.x - lj.last.x) + Math.abs(lj.l1l.y - lj.last.y);
        if (llj - Il.startTime < 400 && lli >= 0 && lli < 20) {
          lli = Math.abs(lj.l1i.x - lj.last.x) + Math.abs(lj.l1i.y - lj.last.y);
          if (llj - j.liI < 700 && lli >= 0 && lli < 20) {
            if (lI.dblclickFullscreen) {
              setTimeout(function () {
                j.toggleFullscreen();
              }, 10);
            }
            j.liI = 0;
          } else {
            j.liI = llj;
          }
          lj.l1i.x = lj.last.x;
          lj.l1i.y = lj.last.y;
          if (hotspots.Ij) {
            checkHotspot(e.pageX, e.pageY);
            hotspotClick();
          }
        }
        resetActivity();
      }
    }
  };
  var I11 = function (e) {
    if (!lI.ilj) {
      e = e ? e : window.event;
      var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40;
      if (lI.i1l) {
        wheelData = -wheelData;
      }
      var ijl = wheelData > 0 ? 1 : -1;
      j.changeFovLog(ijl * lI.il1, true);
      j.dirty = true;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      resetActivity();
    }
  };
  var touchStart = function (e) {
    if (!e) {
      var e = window.event;
    }
    var l1 = e.touches;
    var cur = getViewerOffset();
    j.mouse.x = l1[0].pageX - cur.x + margin.left;
    j.mouse.y = l1[0].pageY - cur.y + margin.top;
    if (!lI.jj) {
      e.preventDefault();
      if (l1.length == 1 && Il.ij < 0 && l1[0]) {
        var d = new Date;
        var llj = d.getTime();
        Il.startTime = llj;
        Il.l1l.x = l1[0].pageX;
        Il.l1l.y = l1[0].pageY;
        Il.last.x = l1[0].pageX;
        Il.last.y = l1[0].pageY;
        j.touchTarget = l1[0].target;
        if (l1[0].target == j.lII) {
          IIl(l1[0].pageX, l1[0].pageY);
          Il.ij = l1[0].identifier;
          resetActivity();
        }
        if (j.touchTarget) {
          e = j.touchTarget;
          flag = false;
          while (e && e != j.lII) {
            if (e.onmouseover) {
              e.onmouseover();
            }
            if (e.onmousedown && !flag) {
              e.onmousedown();
              flag = true;
            }
            e = e.parentNode;
          }
        }
        checkHotspot(l1[0].pageX, l1[0].pageY);
      }
      if (l1.length > 1) {
        Il.ij = -1;
      }
      if (!III) {
        if (l1.length == 2 && l1[0] && l1[1]) {
          zoom.iij = Math.sqrt((l1[0].pageX - l1[1].pageX) * (l1[0].pageX - l1[1].pageX) + (l1[0].pageY - l1[1].pageY) * (l1[0].pageY - l1[1].pageY));
          zoom.prev = zoom.cur;
        }
      }
      lj.li.x = 0;
      lj.li.y = 0;
    }
  };
  var ij1 = function (e) {
    if (!e) {
      var e = window.event;
    }
    var l1 = e.touches;
    var cur = getViewerOffset();
    j.mouse.x = l1[0].pageX - cur.x + margin.left;
    j.mouse.y = l1[0].pageY - cur.y + margin.top;
    if (!lI.jj) {
      e.preventDefault();
      if (l1.length == 1 && l1[0]) {
        Il.last.x = l1[0].pageX;
        Il.last.y = l1[0].pageY;
        if (Il.ij >= 0) {
          e.preventDefault();
          for (var ii = 0; ii < l1.length; ii++) {
            if (l1[ii].identifier == Il.ij) {
              Ilj(l1[ii].pageX, l1[ii].pageY);
              break;
            }
          }
          resetActivity();
        }
        checkHotspot(l1[0].pageX, l1[0].pageY);
      }
      if (l1.length == 2 && l1[0] && l1[1]) {
        Il.ij = -1;
        if (!III) {
          zoom.jli = Math.sqrt((l1[0].pageX - l1[1].pageX) * (l1[0].pageX - l1[1].pageX) + (l1[0].pageY - l1[1].pageY) * (l1[0].pageY - l1[1].pageY));
          j.setZoom(zoom.prev / zoom.iij * zoom.jli);
        }
      }
    }
  };
  var jll = function (e) {
    if (!lI.jj) {
      e.preventDefault();
      var l1 = e.touches;
      if (Il.ij >= 0) {
        resetActivity();
      }
      if (1) {
        var d = new Date;
        var llj = d.getTime();
        var lli = -1;
        lli = Math.abs(Il.l1l.x - Il.last.x) + Math.abs(Il.l1l.y - Il.last.y);
        if (lli >= 0 && lli < 20) {
          var flag = false;
          if (j.touchTarget) {
            e = j.touchTarget;
            while (e && e != j.lII) {
              if (e.onclick && !flag) {
                e.onclick();
                flag = true;
              }
              e = e.parentNode;
            }
          }
          if (hotspots.Ij && !flag) {
            hotspotClick();
          }
          lli = Math.abs(Il.l1i.x - Il.last.x) + Math.abs(Il.l1i.y - Il.last.y);
          if (llj - j.liI < 700 && lli >= 0 && lli < 20) {
            if (j.touchTarget == j.lII) {
              if (lI.dblclickFullscreen) {
                setTimeout(function () {
                  j.toggleFullscreen();
                }, 10);
              }
            }
            if (j.touchTarget) {
              e = j.touchTarget;
              flag = false;
              while (e && e != j.lII) {
                if (e.ondblclick && !flag) {
                  e.ondblclick();
                  flag = true;
                }
                e = e.parentNode;
              }
            }
            j.liI = 0;
          } else {
            j.liI = llj;
          }
          Il.l1i.x = Il.last.x;
          Il.l1i.y = Il.last.y;
        }
        if (j.touchTarget) {
          e = j.touchTarget;
          flag = false;
          while (e && e != j.lII) {
            if (e.onmouseout) {
              e.onmouseout();
            }
            if (e.onmouseup && !flag) {
              e.onmouseup();
              flag = true;
            }
            e = e.parentNode;
          }
        }
      }
      j.touchTarget = null;
      Il.ij = -1;
    }
  };
  var iji = function (e) {
    if (!lI.jj) {
      e.preventDefault();
      Il.ij = -1;
    }
  };
  var ijj = function (e) {
    III = true;
    if (!lI.jj) {
      e.preventDefault();
      zoom.prev = zoom.cur;
      resetActivity();
    }
  };
  var jlI = function (e) {
    if (!lI.jj) {
      e.preventDefault();
      j.setZoom(event.scale * zoom.prev);
      resetActivity();
    }
  };
  var iiI = function (e) {
    if (!lI.jj) {
      I1.fov.jl = false;
      e.preventDefault();
      resetActivity();
    }
  };
  var keyDown = function (e) {
    if (!lI.IIj) {
      e = e ? e : window.event;
      lIl = e.keyCode;
      if (lIl != 0) {
        switch (lIl) {
          case 37:
            if (lI.l11) {
              zoom.llI += 10 / zoom.cur;
            } else {
              j.changePan(1, true);
            }
            break;
          case 38:
            if (lI.l11) {
              zoom.ll1 += 10 / zoom.cur;
            } else {
              j.changeTilt(1, true);
            }
            break;
          case 39:
            if (lI.l11) {
              zoom.llI += -10 / zoom.cur;
            } else {
              j.changePan(-1, true);
            }
            break;
          case 40:
            if (lI.l11) {
              zoom.ll1 -= 10 / zoom.cur;
            } else {
              j.changeTilt(-1, true);
            }
            break;
            break;
          case 43:
          case 107:
          case 187:
            j.changeFovLog(-1, true);
            break;
          case 109:
          case 45:
          case 189:
            j.changeFovLog(1, true);
            break;
          default:
            ;
        }
        j.dirty = true;
      }
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      resetActivity();
    }
  };
  var keyUp = function (e) {
    lIl = 0;
    if (!lI.IIj) {
      resetActivity();
    }
  };
  var onBlur = function (e) {
    lIl = 0;
    if (!lI.IIj) {
      resetActivity();
    }
  };
  var MoveImageX = function (li) {
    if (lI.lI1) {
      i1I(li);
    } else {
      Ijj(li);
    }
  };
  var MoveImageY = function (li) {
    if (lI.lI1) {
      Ijj(li);
    } else {
      i1I(li);
    }
  };
  var li1 = function () {
    if (lI.i1i) {
      while (img.x < 0) {
        img.x += img.j1;
      }
      while (img.x >= img.j1) {
        img.x -= img.j1;
      }
    } else {
      if (img.x < 0) {
        img.x = 0;
      }
      if (img.x >= img.j1) {
        img.x = img.j1 - 1;
      }
    }
    if (lI.IjI) {
      while (img.y < 0) {
        img.y += img.ji;
      }
      while (img.y >= img.ji) {
        img.y -= img.ji;
      }
    } else {
      if (img.y < 0) {
        img.y = 0;
      }
      if (img.y >= img.ji) {
        img.y = img.ji - 1;
      }
    }
    if (img.iI >= img.Il1) {
      img.iI = img.Il1 - 1;
    }
    if (img.iI < 0) {
      img.iI = 0;
    }
    zoom.cur = Math.max(zoom.min, Math.min(zoom.max, zoom.cur));
    if (lI.i1j) {
      lI.l11 = zoom.cur > 1;
    }
    if (i1.width >= zoom.viewport * zoom.cur * img.width) {
      zoom.llI = 0;
    } else {
      var mw = (img.width * zoom.viewport * zoom.cur - i1.width) / (zoom.cur * zoom.viewport * 2);
      zoom.llI = Math.max(-mw, zoom.llI);
      zoom.llI = Math.min(+mw, zoom.llI);
    }
    if (i1.height >= zoom.viewport * zoom.cur * img.height) {
      zoom.ll1 = 0;
    } else {
      var mh = (img.height * zoom.viewport * zoom.cur - i1.height) / (zoom.cur * zoom.viewport * 2);
      zoom.ll1 = Math.max(-mh, zoom.ll1);
      zoom.ll1 = Math.min(+mh, zoom.ll1);
    }
  };
  var Ijj = function (li) {
    if (lI.Ili) {
      li = -li;
    }
    img.x += li;
    li1();
  };
  var i1I = function (li) {
    if (lI.IIi) {
      li = -li;
    }
    img.y += li;
    li1();
  };
  this.changeViewstate = function (newstate, Ii) {
    resetActivity();
    if (img.iI != newstate) {
      img.iI = newstate;
      if (Ii > 0) {
        imgObjectBack.style.visibility = "inherit";
        var delay = 1 / (20 * Ii);
        imgObject.style[I1i] = "opacity " + delay + "s linear";
        if (curImageObject == imgObject) {
          imgObject.style.opacity = "0.0";
          curImageObject = imgObjectBack;
        } else {
          imgObject.style.opacity = "1.0";
          curImageObject = imgObject;
        }
        this.I1j();
      }
      j.dirty = true;
    }
  };
  var I1l = function (x, y, iI) {
    var imageSrc = searchAmongObj(iI, y, x);
    if(imageSrc) {
      return expandFilename("http://white-m.ru" + imageSrc);
    }
  };
  var imageNameHotspot = function (x, y, iI) {
    return expandFilename(img.path + "/hs_" + iI + "_" + y + "_" + x + ".png");
  };

  var searchAmongObj = function(iI, y, x){
    var imageObj = config.images;

    for(var item in imageObj){
      if(imageObj.hasOwnProperty(item)){
        var imageOriginal = imageObj[item].original;
        if(imageOriginal){
          var lastSlashPos = imageOriginal.lastIndexOf('/'),
              lastDotPos = imageOriginal.lastIndexOf('.'),
              imageParams = imageOriginal.substr(lastSlashPos + 5, (lastDotPos - lastSlashPos) - 5);

          if(imageParams == iI+ "_" + y + "_" + x){
            return imageOriginal;
          }
        }
      }
    }
  };

  var fl = 0;

  var increment = function () {

  };

  this.I1j = function () {

    li1();
    var x = Math.floor(img.x);
    var y = Math.floor(img.y);
    var iI = img.iI;
    var flag = false;


    if (img.IiI != x || img.Iil != y || img.Ii1 != iI) {
      img.IiI = x;
      img.Iil = y;
      img.Ii1 = iI;

      if (y == 4 && fl == 0) {
        // img.cnt < 10 - моим потомкам - это скорость вращения по вертикали, чем больше тем медленнее. По горизонтали в двух местах скорости меняются в xml
        if (img.cnt < 10) {
          var inc = Math.abs(img.incY);
          img.cnt = img.cnt + 1;
          curImageObject.setAttribute("src", I1l(0, inc, 0));
        }
        else {
          img.cnt = 0;
          if (img.incY >= 0 && img.incY < img.ji) {
            img.incY = img.incY + 1;
          }
          if (img.incY == img.ji) {
            img.incY = -img.incY;
          }
          if(img.incY < 0) {
            img.incY = img.incY + 1;
          }
          var inc = Math.abs(img.incY);
          img.IiI = 0;
          img.Iil = inc;
          img.Ii1 = 0;
          x = 0;
          y = inc;
          iI = 0;
          curImageObject.setAttribute("src", I1l(0, inc, 0));
        }
        flag = true;
      }
      else {
        fl = 1;
        curImageObject.setAttribute("src", I1l(x, y, iI));
        flag = true;
      }
    }

    if (flag || zoom.cur != zoom.last || zoom.llI != zoom.ilI || zoom.ll1 != zoom.Iji) {
      updateImageSize();
      zoom.last = zoom.cur;
      zoom.ilI = zoom.llI;
      zoom.Iji = zoom.ll1;
    }

    if (flag && hotspots.Ij) {
      if (imgHotspot == null) {
        imgHotspot = new Image;
        canvHotspot = document.createElement("canvas");
        canvHotspot.width = img.width;
        canvHotspot.height = img.height;
        if (imgHotspot.addEventListener) {
          imgHotspot.addEventListener("load", function () {
            var context = canvHotspot.getContext("2d");
            context.drawImage(imgHotspot, 0, 0, img.width, img.height);
          }, false);
        }
      }
      var hx = x;
      var hy = y;
      var ll = iI;
      if (hotspots.reuse >= 8) {
        if (hotspots.reuse & 16) {
          hx = 0;
        }
        if (hotspots.reuse & 32) {
          hy = 0;
        }
        if (hotspots.reuse & 64) {
          ll = 0;
        }
      } else {
        if (hotspots.reuse > 0) {
          ll = 0;
        }
        if (hotspots.reuse > 1) {
          hx = 0;
        }
        if (hotspots.reuse > 2) {
          hy = 0;
        }
      }
      if (imgHotspot.src != imageNameHotspot(hx, hy, ll)) {
        imgHotspot.src = imageNameHotspot(hx, hy, ll);
      }
    }

  };

  this.preloadImages = function () {
    var x;
    var y;
    var iI;
    var lIj;

    if(config.images){

      for(image in config.images){
        if(config.images.hasOwnProperty(image)){
          lIj = new Image;
          lIj.src = "http://white-m.ru" + config.images[image].original;
          j.checkLoaded.push(lIj);
        }
      }

    }else{

      lIj = new Image;
      lIj.src = I1l(img.ljl, img.lij, img.IlI);
      for (iI = 0; iI < img.Il1; iI++) {
        for (y = 0; y < img.ji; y++) {
          for (x = 0; x < img.j1; x++) {
            lIj = new Image;
            lIj.src = I1l(x, y, iI);
            j.checkLoaded.push(lIj);
          }
        }
      }

    }
  };

  var checkHotspot = function (pagex, pagey) {
    if (hotspots.Ij && imgHotspot != null) {
      if (!canvHotspot || !canvHotspot.getContext) {
        return;
      }
      var cur = getViewerOffset();
      var x = pagex - cur.x - i1.width / 2;
      x = x / zoom.cur / zoom.viewport - zoom.llI + img.width / 2;
      var y = pagey - cur.y - i1.height / 2;
      y = y / zoom.cur / zoom.viewport - zoom.ll1 + img.height / 2;
      var context = canvHotspot.getContext("2d");
      d = context.getImageData(x, y, 1, 1);
      hotspots.currentId = d.data[2];
      if (hotspots.lastId != hotspots.currentId) {
        if (hotspots.lastId > 0) {
          if (j.skinObj) {
            if (j.skinObj.hotspotProxyOut) {
              j.skinObj.hotspotProxyOut(hotspots.lastId);
            }
          }
        }
        if (hotspots.currentId > 0 && hotspots.area[hotspots.currentId]) {
          j.hotspot = hotspots.area[hotspots.currentId];
        } else {
          j.hotspot = j.emptyHotspot;
        }
        if (hotspots.currentId > 0) {
          if (j.skinObj) {
            if (j.skinObj.hotspotProxyOver) {
              j.skinObj.hotspotProxyOver(hotspots.currentId);
            }
          }
        }
        hotspots.lastId = hotspots.currentId;
      }
    }
  };
  var hotspotClick = function () {
    if (hotspots.currentId > 0) {
      j.openUrl(j.hotspot.url, j.hotspot.target);
      if (j.skinObj) {
        j.skinObj.hotspotProxyClick(hotspots.currentId);
      }
    }
  };
  var i11 = function () {
    requestAnimationFrame(i11);
    if (Il.ij >= 0) {
      if (lI.mode == 2) {
        var il = lj.last.x - lj.l1l.x;
        var jI = lj.last.y - lj.l1l.y;
        II1(il / 30, jI / 30);
      } else if (lI.mode == 3) {
        var cur = getViewerOffset();
        var px, py;
        if (lI.lI1) {
          py = (lj.last.x - cur.x) / i1.width;
          px = (lj.last.y - cur.y) / i1.height;
        } else {
          px = (lj.last.x - cur.x) / i1.width;
          py = (lj.last.y - cur.y) / i1.height;
        }
        if (lI.Ili) {
          px = 1 - px;
        }
        if (lI.IIi) {
          py = 1 - py;
        }
        var imgX = Math.floor((1 - px) * img.j1);
        var imgY = Math.floor((1 - py) * img.ji);
        if (imgX < 0) {
          imgX = 0;
        }
        if (imgX >= img.j1) {
          imgX = img.j1 - 1;
        }
        if (imgY < 0) {
          imgY = 0;
        }
        if (imgY >= img.ji) {
          imgY = img.ji - 1;
        }
        j.showObjectImage(imgX, imgY);
      } else {
        I1.li.x = 0.4 * (lj.last.x - I1.last.x);
        I1.li.y = 0.4 * (lj.last.y - I1.last.y);
        I1.last.x += I1.li.x;
        I1.last.y += I1.li.y;
        II1(I1.li.x, I1.li.y);
        if (I1.fov.jl) {
          j.changeFov(0.4 * (I1.fov.iI1 - zoom.cur * 100));
        }
      }
      j.dirty = true;
    }
    if (lIl != 0) {
      switch (lIl) {
        case 16:
          j.changeFovLog(-1, true);
          j.dirty = true;
          break;
        case 17:
        case 18:
        case 91:
          j.changeFovLog(1, true);
          j.dirty = true;
          break;
        default:
          ;
      }
    }
    if (I1.Ij && (I1.li.x != 0 || I1.li.y != 0) && Il.ij < 0) {
      I1.li.x = 0.9 * I1.li.x;
      I1.li.y = 0.9 * I1.li.y;
      if (I1.li.x * I1.li.x + I1.li.y * I1.li.y < 0.1) {
        I1.li.x = 0;
        I1.li.y = 0;
      } else {
        II1(I1.li.x, I1.li.y);
        j.dirty = true;
      }
    }
    if (!j.isLoaded && j.hasConfig) {
      var ii, I1I = 0;
      for (ii = 0; ii < j.checkLoaded.length; ii++) {
        if (j.checkLoaded[ii].complete && j.checkLoaded[ii].src != iIj) {
          I1I++;
        }
      }
      if (ili) {
        ili = false;
      }
      if (I1I == j.checkLoaded.length) {
        percentLoaded = 1;
        j.isLoaded = true;
        if (j.divSkin && j.divSkin.ggLoaded) {
          j.divSkin.ggLoaded();
        }
      } else {
        percentLoaded = I1I / (j.checkLoaded.length * 1);
      }
    }
    if (automove.jl) {
      img.il = automove.pan - img.x;
      img.jI = automove.tilt - img.y;
      fov.d = (automove.fov - zoom.cur * 100) / 10;
      var l1j = Math.sqrt(img.il * img.il + img.jI * img.jI + fov.d * fov.d);
      if (l1j * 10 < automove.Ii) {
        automove.jl = false;
        img.il = 0;
        img.jI = 0;
        fov.d = 0;
        img.x = Number(automove.pan);
        img.y = Number(automove.tilt);
        zoom.cur = automove.fov / 100;
      } else {
        if (l1j > automove.Ii * 5) {
          l1j = automove.Ii / l1j;
        } else {
          l1j = 0.2;
        }
        img.il *= l1j;
        img.jI *= l1j;
        fov.d *= l1j;
      }
      img.x += 1 * img.il;
      img.y += 1 * img.jI;
      if (img.x >= img.j1) {
        img.x -= img.j1;
        automove.pan -= img.j1;
      }
      if (img.x < 0) {
        img.x += img.j1;
        automove.pan += img.j1;
      }
      if (img.y >= img.ji) {
        img.y -= img.ji;
        automove.tilt -= img.ji;
      }
      if (img.y < 0) {
        img.y += img.ji;
        automove.tilt += img.ji;
      }
      zoom.cur += fov.d / 10;
      var d = new Date;
      lastActivity = d.getTime();
      j.dirty = true;
    } else if (II.jl) {
      img.il = img.il * 0.95 + II.Ii * 0.05;
      img.x += img.il;
      if (II.pingpong) {
        if (img.x < 0 || img.x >= img.j1) {
          II.Ii = -II.Ii;
          img.il = -img.il;
          img.x += 2 * img.il;
        }
      }
      j.dirty = true;
    } else {
      if (II.Ij) {
        var d = new Date;
        if (Il.ij < 0 && II.timeout > 0 && d.getTime() - lastActivity > II.timeout * 1000) {
          II.jl = true;
          img.il = 0;
          img.jI = 0;
        }
      }
      if (I1.Ij && lIl == 0 && Il.ij < 0 && (img.il != 0 || img.jI != 0 || fov.d != 0)) {
        img.il *= 0.9;
        img.jI *= 0.9;
        fov.d *= 0.9;
        img.x += img.il;
        img.y += img.jI;
        j.changeFovLog(fov.d);
        if (img.il * img.il + img.jI * img.jI < 0.0001) {
          img.il = 0;
          img.jI = 0;
          fov.d = 0;
        }
        j.dirty = true;
      }
    }
    if (overlay.auto) {
      var d = new Date;
      if (overlay.delayActive) {
        if (d.getTime() - overlay.delayStart >= overlay.delay * 1000) {
          overlay.delayActive = false;
        }
      } else {
        overlay.current += overlay.blendSpeed;
        if (overlay.current < 0) {
          overlay.current = 0;
          overlay.blendSpeed = -overlay.blendSpeed;
          overlay.delayActive = true;
          overlay.delayStart = d.getTime();
        }
        if (overlay.current > 1) {
          overlay.current = 1;
          overlay.blendSpeed = -overlay.blendSpeed;
          overlay.delayActive = true;
          overlay.delayStart = d.getTime();
        }
        j.setOverlayOpacity(overlay.current);
      }
    }
    if (j.dirty) {
      j.dirty = false;
      j.I1j();
    }
  };
  var updateOrientation = function () {
    setTimeout(function () {
      j.setFullscreen(false);
    }, 10);
    setTimeout(function () {
      j.setFullscreen(false);
    }, 100);
  };
  this.jl1 = function () {
    var ctrl;
    ctrl = divHotspots;
    j.lII = ctrl;
    updateOrientation();
    setTimeout(function () {
      i11();
    }, 10);
    setTimeout(function () {
      updateViewerSize();
      j.I1j();
    }, 10);
    if (ctrl.addEventListener) {
      ctrl.addEventListener("touchstart", touchStart, false);
      ctrl.addEventListener("touchmove", ij1, false);
      ctrl.addEventListener("touchend", jll, false);
      ctrl.addEventListener("touchcancel", iji, false);
      ctrl.addEventListener("gesturestart", ijj, false);
      ctrl.addEventListener("gesturechange", jlI, false);
      ctrl.addEventListener("gestureend", iiI, false);
      ctrl.addEventListener("mousedown", Ijl, false);
      ctrl.addEventListener("mousemove", mouseMove, false);
      imgObject.addEventListener("mousedown", Ijl, false);
      imgObject.addEventListener("mousemove", mouseMove, false);
      document.addEventListener("mouseup", Ij1, false);
      if (isIE()) {
        imgObject.addEventListener("mousewheel", I11, false);
      } else {
        ctrl.addEventListener("mousewheel", I11, false);
        ctrl.addEventListener("DOMMouseScroll", I11, false);
      }
      document.addEventListener("keydown", keyDown, false);
      document.addEventListener("keyup", keyUp, false);
      window.addEventListener("orientationchange", updateOrientation, false);
      window.addEventListener("resize", updateViewerSize, false);
      window.addEventListener("blur", onBlur, false);
    } else if (ctrl.attachEvent) {
      imgObject.attachEvent("onmousedown", ijI);
      imgObject.attachEvent("onmousemove", iii);
      document.attachEvent("onmouseup", Ij1);
      ctrl.attachEvent("onmousedblclick", this.toggleFullscreen);
      ctrl.onmousewheel = document.onmousewheel = I11;
      document.attachEvent("onkeydown", keyDown);
      document.attachEvent("onkeyup", keyUp);
      window.attachEvent("onresize", updateViewerSize);
      window.attachEvent("onblur", onBlur);
    }
    ctrl.oncontextmenu = function (event) {
      if (event === undefined) {
        event = window.event;
      }
      if (!event.ctrlKey) {
        var ll = "<<L>>";
        if (ll.charAt(2) != "U") {
          iII();
          return false;
        }
      }
      return true;
    };
  };
  this.setFullscreen = function (I) {
    if (this.lil != I) {
      this.lil = I;
      this.dirty = true;
    }
    if (this.lil) {
      if (1) {
        divViewport.style.position = "absolute";
        var cur = getViewerOffset();
        var scrOfX = 0,
          scrOfY = 0;
        if (typeof window.pageYOffset == "number") {
          scrOfY = window.pageYOffset;
          scrOfX = window.pageXOffset;
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
          scrOfY = document.body.scrollTop;
          scrOfX = document.body.scrollLeft;
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
          scrOfY = document.documentElement.scrollTop;
          scrOfX = document.documentElement.scrollLeft;
        }
        divViewport.style.left = Math.round(scrOfX - cur.x + margin.left) + "px";
        divViewport.style.top = Math.round(scrOfY - cur.y + margin.top) + "px";
        document.body.style.overflow = "hidden";
      } else {
//        divViewer.style.position = "fixed";
      }
      if (j.divSkin && j.divSkin.ggEnterFullscreen) {
        j.divSkin.ggEnterFullscreen();
      }
    } else {
      divViewport.style.position = "relative";
      divViewport.style.left = "0px";
      divViewport.style.top = "0px";
      document.body.style.overflow = "";
      if (j.divSkin && j.divSkin.ggExitFullscreen) {
        j.divSkin.ggExitFullscreen();
      }
    }
    updateViewerSize();
  };
  this.toggleFullscreen = function () {
    this.setFullscreen(!this.lil);
  };
  this.exitFullscreen = function () {
    j.setFullscreen(false);
  };
  this.startAutorotate = function (Ii, delay, ill) {
    II.Ij = true;
    II.jl = true;
    if (Ii && Ii != 0) {
      II.Ii = Ii;
    }
    if (delay) {
      II.timeout = delay;
    }
    if (ill) {
      II.pingpong = ill == 1;
    }
  };
  this.stopAutorotate = function () {
    II.jl = false;
    II.Ij = false;
  };
  this.toggleAutorotate = function () {
    II.Ij = !II.jl;
    II.jl = II.Ij;
  };

  function db64(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var ii = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
      enc1 = keyStr.indexOf(input.charAt(ii++));
      enc2 = keyStr.indexOf(input.charAt(ii++));
      enc3 = keyStr.indexOf(input.charAt(ii++));
      enc4 = keyStr.indexOf(input.charAt(ii++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";
    } while (ii < input.length);
    return output;
  }

  var iII = function () {
//    var divAbout, ll;
//    divAbout = document.createElement("div");
//    ll = "PGRpdiBzdHlsZT0icG9zaXRpb246IHJlbGF0aXZlOyBsZWZ0OiAwcHg7IHJpZ2h0OiAwcHg7IHRvcDogNDAlOyBib3R0b206IDYwJTsgbWFyZ2luOiBhdXRvOyB3aWR0aDogMThlbTsgaGVpZ2h0OiA0ZW07IGJvcmRlcjogM3B4IHNvbGlkICM1NTU7IGJveC1zaGFkb3c6IDVweCA1cHggMTBweCAjMzMzOyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgZGlzcGxheTogdGFibGU7IGZvbnQtZmFtaWx5OiBWZXJkYW5hLCBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDEwcHQ7IG9wYWNpdHk6IDAuOTU7IGJvcmRlci1yYWRpdXM6IDE1cHg7Ij48cCBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyOyBkaXNwbGF5OiB0YWJsZS1jZWxsOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyAiPkNyZWF0ZWQgd2l0aCA8YSBocmVmPSJodHRwOi8vb2JqZWN0MnZyLmNvbS8iIHRhcmdldD0iX2JsYW5rIj5PYmplY3QyVlI8L2E+PC9wPjwvZGl2Pg==";
//    divAbout.innerHTML = db64(ll);
//    divAbout.setAttribute("id", "about");
//    ll = "top:  0px;";
//    ll += "left: 0px;";
//    ll += "width: 100px;";
//    ll += "height: 100px;";
//    ll += "overflow: hidden;";
//    ll += "position:relative;";
//    divAbout.setAttribute("style", ll);
//    divViewport.replaceChild(divAbout, divHotspots);
//    divAbout.style.width = 0 + margin.left + margin.right + i1.width + "px";
//    divAbout.style.height = 0 + margin.top + margin.bottom + i1.height + "px";
//    divAbout.onclick = function () {
//      divViewport.replaceChild(divHotspots, divAbout);
//    };
//    divAbout.oncontextmenu = function () {
//      divViewport.replaceChild(divHotspots, divAbout);
//    };
  };

  this.createLayers = function (container) {
    var ll;
    this.container = container;
    if (this.container) {
      this.container.innerHTML = "";
    } else {
      alert("container not found!");
      return;
    }
    divViewport = document.createElement("div");
    divViewport.setAttribute("id", "viewport");
    ll = "top:  0px;";
    ll += "left: 0px;";
    ll += "position:relative;";
    divViewport.setAttribute("style", ll);
    this.container.appendChild(divViewport);
    divViewer = document.createElement("div");
    divViewer.setAttribute("id", "viewer");
    ll = "top:  0px;";
    ll += "left: 0px;";
    ll += "overflow: hidden;";
    ll += "position:absolute;";
    ll += lIi + "user-select: none;";
    divViewer.setAttribute("style", ll);
    divViewport.appendChild(divViewer);
    imgObjectBack = document.createElement("img");
    imgObjectBack.setAttribute("id", "objectimage2");
    imgObjectBack.setAttribute("galleryimg", "false");
    ll = "top:  0px;";
    ll += "left: 0px;";
    ll += "position:absolute;";
    ll += "visibility: hidden;";
    ll += lIi + "user-select: none;";
    imgObjectBack.setAttribute("style", ll);
    divViewer.appendChild(imgObjectBack);
    imgObject = document.createElement("img");
    imgObject.setAttribute("id", "objectimage");
    imgObject.setAttribute("galleryimg", "false");
    ll = "top:  0px;";
    ll += "left: 0px;";
    ll += "position:absolute;";
    ll += lIi + "user-select: none;";
    imgObject.setAttribute("style", ll);
    divViewer.appendChild(imgObject);
    curImageObject = imgObject;
    hotspotText = document.createElement("div");
    hotspotText.setAttribute("id", "hotspottext");
    ll = "top:  0px;";
    ll += "left: 0px;";
    ll += "position:absolute;";
    ll += "padding: 3px;";
    ll += "visibility: hidden;";
    hotspotText.setAttribute("style", ll);
    hotspotText.innerHTML = " Hotspot text!";
    divViewer.appendChild(hotspotText);
    divHotspots = document.createElement("div");
    divHotspots.setAttribute("id", "hotspots");
    ll = "top:  0px;";
    ll += "left: 0px;";
    ll += "width:  100px;";
    ll += "height: 100px;";
    ll += "overflow: hidden;";
    ll += "position:absolute;";
    ll += "z-index: 1000;";
    ll += lIi + "user-select: none;";
    divHotspots.setAttribute("style", ll);
    divViewport.appendChild(divHotspots);
    this.divSkin = divHotspots;
  };

  this.readConfigString = function (str) {
    if (window.DOMParser) {
      parser = new DOMParser;
      xmlDoc = parser.parseFromString(str, "text/xml");
    } else {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = "false";
      xmlDoc.loadXML(str);
    }
    this.readConfigXml(xmlDoc);
  };

  this.readConfigUrl = function (url) {
    try {
      var xhttp;
      if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest;
      } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhttp.open("GET", url, false);
      xhttp.send(null);
      var xmlDoc = xhttp.responseXML;
      if (xmlDoc) {
        var lll = url.lastIndexOf("/");
        if (lll >= 0) {
          basePath = url.substr(0, lll + 1);
        }
        this.readConfigXml(xmlDoc);
      } else {
        alert("Error loading XML");
      }
    } catch (e) {
      alert("Error:" + e);
    }
  };

  var firstSetup = true;
  this.readConfigXml = function (xmlDoc) {
    var rootnode = xmlDoc.firstChild;
    var cnode = rootnode.firstChild;
    if (cnode == null) {
      cnode = rootnode.nextSibling.firstChild;
    }
    var ccnode, I, ii;
    var inputNode;
    var cscreensize = 1000000;
    while (cnode) {
      if (cnode.nodeName == "view") {
        ccnode = cnode.firstChild;
        while (ccnode) {
          if (ccnode.nodeName == "start") {
            I = ccnode.getAttributeNode("column");
            img.ljl = Number(I ? I.nodeValue : 0);
            img.x = img.ljl;
            I = ccnode.getAttributeNode("row");
            img.lij = Number(I ? I.nodeValue : 0);
            img.y = img.lij;
            I = ccnode.getAttributeNode("state");
            img.IlI = Number(I ? I.nodeValue : 0);
            img.iI = img.IlI;
          }
          if (ccnode.nodeName == "zoom") {
            I = ccnode.getAttributeNode("min");
            zoom.min = 1 * (I ? I.nodeValue : 1);
            I = ccnode.getAttributeNode("default");
            zoom.def = 1 * (I ? I.nodeValue : 1);
            zoom.cur = zoom.def;
            I = ccnode.getAttributeNode("max");
            zoom.max = 1 * (I ? I.nodeValue : 1);
            I = ccnode.getAttributeNode("centerx");
            zoom.llI = 1 * (I ? I.nodeValue : 0);
            I = ccnode.getAttributeNode("centery");
            zoom.ll1 = 1 * (I ? I.nodeValue : 0);
          }
          if (ccnode.nodeName == "viewer") {
            I = ccnode.getAttributeNode("background");
            if (I) {
              config.background = I.nodeValue == 1;
            }
            I = ccnode.getAttributeNode("backgroundcolor");
            if (I) {
              config.backgroundcolor = 1 * I.nodeValue;
            }
            I = ccnode.getAttributeNode("imagescaling");
            if (I) {
              zoom.scalemode = 1 * I.nodeValue;
            }
          }
          ccnode = ccnode.nextSibling;
        }
      }
      if (cnode.nodeName == "autorotate") {
        if (firstSetup) {
          II.Ij = false;
        }
        I = cnode.getAttributeNode("start");
        if (I) {
          II.Ij = I.nodeValue == 1;
        }
        I = cnode.getAttributeNode("pingpong");
        if (I) {
          II.pingpong = I.nodeValue == 1;
        }
        I = cnode.getAttributeNode("speed");
        if (I) {
          II.Ii = 1 * I.nodeValue;
        }
        I = cnode.getAttributeNode("delay");
        if (I) {
          II.timeout = 1 * I.nodeValue;
        }
        II.jl = II.Ij;
        I = cnode.getAttributeNode("onlyonce");
        if (I && I.nodeValue > 0) {
          var n = img.ljl;
          if (II.Ii > 0) {
            n += I.nodeValue * img.j1 + 0.5;
          } else {
            n -= I.nodeValue * img.j1 + 0.5;
          }
          j.moveTo(n, img.lij, 0, Math.abs(II.Ii));
        }
      }
      if (cnode.nodeName == "input") {
        I = cnode.getAttributeNode("columns");
        if (I) {
          img.j1 = 1 * I.nodeValue;
        }
        I = cnode.getAttributeNode("rows");
        if (I) {
          img.ji = 1 * I.nodeValue;
        }
        I = cnode.getAttributeNode("states");
        if (I) {
          img.Il1 = 1 * I.nodeValue;
        }
        I = cnode.getAttributeNode("width");
        if (I) {
          img.width = 1 * I.nodeValue;
        }
        I = cnode.getAttributeNode("height");
        if (I) {
          img.height = 1 * I.nodeValue;
        }
        I = cnode.getAttributeNode("fileextension");
        if (I) {
          img.ext = I.nodeValue;
        }
        I = cnode.getAttributeNode("imagepath");
        if (I) {
          img.path = I.nodeValue;
        }
      }
      if (cnode.nodeName == "control") {
        if (firstSetup) {
          I = cnode.getAttributeNode("simulatemass");
          if (I) {
            I1.Ij = I.nodeValue == 1;
          }
          I = cnode.getAttributeNode("locked");
          if (I) {
            lI.jj = I.nodeValue == 1;
          }
          if (I) {
            lI.IIj = I.nodeValue == 1;
          }
          I = cnode.getAttributeNode("lockedmouse");
          if (I) {
            lI.jj = I.nodeValue == 1;
          }
          I = cnode.getAttributeNode("lockedkeyboard");
          if (I) {
            lI.IIj = I.nodeValue == 1;
          }
          I = cnode.getAttributeNode("lockedwheel");
          if (I) {
            lI.ilj = I.nodeValue == 1;
          }
          I = cnode.getAttributeNode("invertwheel");
          if (I) {
            lI.i1l = I.nodeValue == 1;
          }
          I = cnode.getAttributeNode("speedwheel");
          if (I) {
            lI.il1 = 1 * I.nodeValue;
          }
          I = cnode.getAttributeNode("sensitifity");
          if (I) {
            lI.sensitivity = 1 * I.nodeValue;
          }
          I = cnode.getAttributeNode("sensitivity");
          if (I) {
            lI.sensitivity = 1 * I.nodeValue;
          }
          I = cnode.getAttributeNode("wrapx");
          if (I) {
            lI.i1i = I.nodeValue == 1;
          }
          I = cnode.getAttributeNode("wrapy");
          if (I) {
            lI.IjI = I.nodeValue == 1;
          }
          I = cnode.getAttributeNode("revx");
          if (I) {
            lI.Ili = I.nodeValue == 1;
          }
          I = cnode.getAttributeNode("revy");
          if (I) {
            lI.IIi = I.nodeValue == 1;
          }
          I = cnode.getAttributeNode("swapxy");
          if (I) {
            lI.lI1 = I.nodeValue == 1;
          }
          I = cnode.getAttributeNode("dblclickfullscreen");
          if (I) {
            lI.dblclickFullscreen = I.nodeValue == 1;
          }
          I = cnode.getAttributeNode("automovemode");
          if (I) {
            lI.i1j = I.nodeValue == 1;
          }
          I = cnode.getAttributeNode("controller");
          if (I) {
            lI.mode = I.nodeValue * 1;
          }
        }
      }
      if (cnode.nodeName == "qthotspots") {
        I = cnode.getAttributeNode("reuse");
        if (I) {
          hotspots.reuse = 1 * I.nodeValue;
        }
        hotspots.Ij = true;
        I = cnode.getAttributeNode("enabled");
        if (I) {
          hotspots.Ij = I.nodeValue == 1;
        }
        hotspots.area = new Array;
        var ll = new Object;
        ll.id = 0;
        ll.title = "";
        ll.url = "";
        ll.target = "";
        hotspots.area[ll.id] = ll;
        ccnode = cnode.firstChild;
        while (ccnode) {
          if (ccnode.nodeName == "label") {
            I = ccnode.getAttributeNode("enabled");
            if (I) {
              hotspots.textbox.Ij = I.nodeValue == 1;
            }
            I = ccnode.getAttributeNode("width");
            if (I) {
              hotspots.textbox.width = 1 * I.nodeValue;
            }
            I = ccnode.getAttributeNode("height");
            if (I) {
              hotspots.textbox.height = 1 * I.nodeValue;
            }
            I = ccnode.getAttributeNode("textcolor");
            if (I) {
              hotspots.textbox.textcolor = 1 * I.nodeValue;
            }
            I = ccnode.getAttributeNode("background");
            if (I) {
              hotspots.textbox.background = I.nodeValue == 1;
            }
            I = ccnode.getAttributeNode("backgroundcolor");
            if (I) {
              hotspots.textbox.backgroundcolor = 1 * I.nodeValue;
            }
            I = ccnode.getAttributeNode("border");
            if (I) {
              hotspots.textbox.borderwidth = 1 * I.nodeValue;
            }
            I = ccnode.getAttributeNode("bordercolor");
            if (I) {
              hotspots.textbox.bordercolor = 1 * I.nodeValue;
            }
            I = ccnode.getAttributeNode("borderradius");
            if (I) {
              hotspots.textbox.borderradius = 1 * I.nodeValue;
            }
            I = ccnode.getAttributeNode("wordwrap");
            if (I) {
              hotspots.textbox.wordwrap = I.nodeValue == 1;
            }
          }
          if (ccnode.nodeName == "hotspot") {
            var ll = new Object;
            I = ccnode.getAttributeNode("id");
            ll.id = 1 * (I ? I.nodeValue : 1);
            I = ccnode.getAttributeNode("title");
            ll.title = I ? I.nodeValue.toString() : "";
            I = ccnode.getAttributeNode("url");
            ll.url = I ? I.nodeValue.toString() : "";
            I = ccnode.getAttributeNode("target");
            ll.target = I ? I.nodeValue.toString() : "";
            hotspots.area[ll.id] = ll;
          }
          ccnode = ccnode.nextSibling;
        }
      }
      if (cnode.nodeName == "userdata") {
        I = cnode.getAttributeNode("title");
        j.userdata.title = I ? I.nodeValue.toString() : "";
        I = cnode.getAttributeNode("description");
        j.userdata.description = I ? I.nodeValue.toString() : "";
        I = cnode.getAttributeNode("author");
        j.userdata.author = I ? I.nodeValue.toString() : "";
        I = cnode.getAttributeNode("datetime");
        j.userdata.datetime = I ? I.nodeValue.toString() : "";
        I = cnode.getAttributeNode("copyright");
        j.userdata.copyright = I ? I.nodeValue.toString() : "";
        I = cnode.getAttributeNode("source");
        j.userdata.source = I ? I.nodeValue.toString() : "";
        I = cnode.getAttributeNode("info");
        j.userdata.information = I ? I.nodeValue.toString() : "";
        I = cnode.getAttributeNode("comment");
        j.userdata.comment = I ? I.nodeValue.toString() : "";
      }
      cnode = cnode.nextSibling;
    }
    this.dirty = true;
    if (firstSetup) {
      if (j.divSkin && j.divSkin.ggViewerInit) {
        j.divSkin.ggViewerInit();
      }
    }
    firstSetup = false;
    this.hasConfig = true;
    updateViewerSize();
    updateConfig();
    this.preloadImages();
  };

  this.readConfig = function (obj) {
    var cscreensize = 1000000;

    config.images = obj.input.images;

    //Для каждого элемента своя функция
    if(obj.view) {
      this.vrObject.prepareView(obj.view);
    }
    if(obj.autorotate) {
      this.vrObject.prepareAutorotate(obj.autorotate);
    }
    if(obj.input) {
      this.vrObject.prepareInput(obj.input);
    }
    if(obj.control) {
      this.vrObject.prepareControl(obj.control);
    }
    if(obj.qthotspots) {
      this.vrObject.prepareQthotspots(obj.qthotspots);
    }
    if(obj.userData) {
      this.vrObject.prepareUserData(obj.userData);
    }

    this.dirty = true;
    if (firstSetup) {
      if (j.divSkin && j.divSkin.ggViewerInit) {
        j.divSkin.ggViewerInit();
      }
    }
    firstSetup = false;
    this.hasConfig = true;
    updateViewerSize();
    updateConfig();
    this.preloadImages();
  };

  this.openUrl = function (url, target) {
    if (url.length > 0) {
      window.open(url, target);
    }
  };
  var startReLoad = function () {
    j.isLoaded = false;
    j.hasConfig = false;
    j.checkLoaded = new Array;
    if (j.divSkin && j.divSkin.ggReLoaded) {
      j.divSkin.ggReLoaded();
    }
    percentLoaded = 0;
  };
  this.iIi();
  this.createLayers(container);
  this.jl1();

  this.vrObject = {
    prepareView: function(view){
      if(view.start){
        img.ljl = Number(view.start.column ? view.start.column : 0);
        img.x = img.ljl;

        img.lij = Number(view.start.row ? view.start.row : 0);
        img.y = img.lij;

        img.IlI = Number(view.start.state ? view.start.state : 0);
        img.iI = img.IlI;
      }

      if(view.zoom){
        zoom.min = 1 * (view.zoom.min ? view.zoom.min : 1);

        zoom.def = 1 * (view.zoom.default ? view.zoom.default : 1);
        zoom.cur = zoom.def;

        zoom.max = 1 * (view.zoom.max ? view.zoom.max : 1);
        zoom.llI = 1 * (view.zoom.centerx ? view.zoom.centerx : 0);
        zoom.ll1 = 1 * (view.zoom.centery ? view.zoom.centery : 0);
      }

      if (view.viewer) {
        if (view.viewer.background) {
          config.background = view.viewer.background == 1;
        }

        if (view.viewer.backgroundcolor) {
          config.backgroundcolor = 1 * view.viewer.backgroundcolor;
        }

        if (view.viewer.imagescaling) {
          zoom.scalemode = 1 * view.viewer.imagescaling;
        }
      }
    },
    prepareAutorotate: function(autorotate){
      if(firstSetup){
        II.Ij = false;
      }
      if(autorotate.start){
        II.Ij = autorotate.start == 1;
      }
      if(autorotate.pingpong){
        II.pingpong = autorotate.pingpong == 1;
      }
      if(autorotate.speed){
        II.Ii = 1 * autorotate.speed;
      }

      if(autorotate.delay){
        II.timeout = 1 * autorotate.delay;
      }

      II.jl = II.Ij;
      if(autorotate.onlyonce > 0) {
        var n = img.ljl;
        if (II.Ii > 0) {
          n += autorotate.onlyonce * img.j1 + 0.5;
        } else {
          n -= autorotate.onlyonce * img.j1 + 0.5;
        }
        j.moveTo(n, img.lij, 0, Math.abs(II.Ii));
      }
    },
    prepareInput: function(input){
      if (input.columns) {
        img.j1 = 1 * input.columns;
      }
      if (input.rows) {
        img.ji = 1 * input.rows;
      }
      if (input.states) {
        img.Il1 = 1 * input.states;
      }
      if (input.width) {
        img.width = 1 * input.width;
      }
      if (input.height) {
        img.height = 1 * input.height;
      }
      if(input.imagepath){
        img.path = input.imagepath;
      }
    },
    prepareControl: function(control){
      if (firstSetup) {
        if (control.simulatemass) {
          I1.Ij = control.simulatemass == 1;
        }
        if (control.locked) {
          lI.jj = control.locked == 1;
          lI.IIj = control.locked == 1;
        }
        if (control.lockedmouse) {
          lI.jj = control.lockedmouse == 1;
        }
        if (control.lockedkeyboard) {
          lI.IIj = control.lockedkeyboard == 1;
        }
        if (control.lockedwheel) {
          lI.ilj = control.lockedwheel == 1;
        }
        if (control.invertwheel) {
          lI.i1l = control.invertwheel == 1;
        }
        if (control.speedwheel) {
          lI.il1 = 1 * control.speedwheel;
        }
        if (control.sensitifity) {
          lI.sensitivity = 1 * control.sensitifity;
        }
        if (control.sensitivity) {
          lI.sensitivity = 1 * control.sensitivity;
        }
        if (control.wrapx) {
          lI.i1i = control.wrapx == 1;
        }
        if (control.wrapy) {
          lI.IjI = control.wrapy == 1;
        }
        if (control.revx) {
          lI.Ili = control.revx == 1;
        }
        if (control.revy) {
          lI.IIi = control.revy == 1;
        }
        if (control.swapxy) {
          lI.lI1 = control.swapxy == 1;
        }
        if (control.dblclickfullscreen) {
          lI.dblclickFullscreen = control.dblclickfullscreen == 1;
        }
        if (control.automovemode) {
          lI.i1j = control.automovemode == 1;
        }
        if (control.controller) {
          lI.mode = control.controller * 1;
        }
      }
    },
    prepareQthotspots: function(qthotspots){
      if (qthotspots.reuse) {
        hotspots.reuse = 1 * qthotspots.reuse;
      }
      hotspots.Ij = true;

      if (qthotspots.enabled) {
        hotspots.Ij = qthotspots.enabled == 1;
      }

      hotspots.area = new Array;
      var ll = new Object;
      ll.id = 0;
      ll.title = "";
      ll.url = "";
      ll.target = "";
      hotspots.area[ll.id] = ll;

      if (ccnode.nodeName == "label") {
        I = ccnode.getAttributeNode("enabled");
        if (I) {
          hotspots.textbox.Ij = I.nodeValue == 1;
        }
        I = ccnode.getAttributeNode("width");
        if (I) {
          hotspots.textbox.width = 1 * I.nodeValue;
        }
        I = ccnode.getAttributeNode("height");
        if (I) {
          hotspots.textbox.height = 1 * I.nodeValue;
        }
        I = ccnode.getAttributeNode("textcolor");
        if (I) {
          hotspots.textbox.textcolor = 1 * I.nodeValue;
        }
        I = ccnode.getAttributeNode("background");
        if (I) {
          hotspots.textbox.background = I.nodeValue == 1;
        }
        I = ccnode.getAttributeNode("backgroundcolor");
        if (I) {
          hotspots.textbox.backgroundcolor = 1 * I.nodeValue;
        }
        I = ccnode.getAttributeNode("border");
        if (I) {
          hotspots.textbox.borderwidth = 1 * I.nodeValue;
        }
        I = ccnode.getAttributeNode("bordercolor");
        if (I) {
          hotspots.textbox.bordercolor = 1 * I.nodeValue;
        }
        I = ccnode.getAttributeNode("borderradius");
        if (I) {
          hotspots.textbox.borderradius = 1 * I.nodeValue;
        }
        I = ccnode.getAttributeNode("wordwrap");
        if (I) {
          hotspots.textbox.wordwrap = I.nodeValue == 1;
        }
      }
      if (ccnode.nodeName == "hotspot") {
        var ll = new Object;
        I = ccnode.getAttributeNode("id");
        ll.id = 1 * (I ? I.nodeValue : 1);
        I = ccnode.getAttributeNode("title");
        ll.title = I ? I.nodeValue.toString() : "";
        I = ccnode.getAttributeNode("url");
        ll.url = I ? I.nodeValue.toString() : "";
        I = ccnode.getAttributeNode("target");
        ll.target = I ? I.nodeValue.toString() : "";
        hotspots.area[ll.id] = ll;
      }
    },
    prepareUserData: function(userData){

    }
  };
}