// Garden Gnome Software - Skin
// Object2VR 2.0.2/2405
// Filename: controller_object_popup.ggsk
// Generated Mon Jul 29 18:12:09 2013

function object2vrSkin(player,base) {
  var me=this;
  var flag=false;
  var nodeMarker=new Array();
  var activeNodeMarker=new Array();
  this.player=player;
  this.player.skinObj=this;
  this.divSkin=player.divSkin;

  var objectContainer = $(this.player.container).parent();

  var basePath="";
  // auto detect base path
  if (base=='?') {
    var scripts = document.getElementsByTagName('script');
    for(var i=0;i<scripts.length;i++) {
      var src=scripts[i].src;
      if (src.indexOf('skin.js')>=0) {
        var p=src.lastIndexOf('/');
        if (p>=0) {
          basePath=src.substr(0,p+1);
        }
      }
    }
  } else
  if (base) {
    basePath = base;
  }
  this.elementMouseDown=new Array();
  this.elementMouseOver=new Array();
  var cssPrefix='';
  var domTransition='transition';
  var domTransform='transform';
  var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
  var i;
  for(i=0;i<prefixes.length;i++) {
    if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
      cssPrefix='-' + prefixes[i].toLowerCase() + '-';
      domTransition=prefixes[i] + 'Transition';
      domTransform=prefixes[i] + 'Transform';
    }
  }

  this.player.setMargins(0,0,0,0);

  this.updateSize = function(startElement) {
    var stack=new Array();
    stack.push(startElement);
    while(stack.length>0) {
      e=stack.pop();
      if (e.ggUpdatePosition) {
        e.ggUpdatePosition();
      }
      if (e.hasChildNodes()) {
        for(i=0;i<e.childNodes.length;i++) {
          stack.push(e.childNodes[i]);
        }
      }
    }
  };

  parameterToTransform=function(p) {
    //return 'translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
    return 'translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + 1 + ',' + 1 + ')';
  }

  this.findElements=function(id,regex) {
    var r=new Array();
    var stack=new Array();
    var pat=new RegExp(id,'');
    stack.push(me.divSkin);
    while(stack.length>0) {
      e=stack.pop();
      if (regex) {
        if (pat.test(e.ggId)) r.push(e);
      } else {
        if (e.ggId==id) r.push(e);
      }
      if (e.hasChildNodes()) {
        for(i=0;i<e.childNodes.length;i++) {
          stack.push(e.childNodes[i]);
        }
      }
    }
    return r;
  }

  this.preloadImages=function() {
    var preLoadImg=new Image();
    preLoadImg.src=basePath + 'images/obj2vr/left__o.png';
    preLoadImg.src=basePath + 'images/obj2vr/right__o.png';
    preLoadImg.src=basePath + 'images/obj2vr/up__o.png';
    preLoadImg.src=basePath + 'images/obj2vr/down__o.png';
    preLoadImg.src=basePath + 'images/obj2vr/fullscreen__o.png';
  };

  this.addSkin=function() {
    this._loading_image=document.createElement('div');
    this._loading_image.ggId='loading image';
    this._loading_image.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._loading_image.ggVisible=true;
    this._loading_image.ggUpdatePosition=function() {
      this.style[domTransition]='none';
      if (this.parentNode) {
        w=this.parentNode.offsetWidth;
        this.style.left=(-112 + w/2) + 'px';
        h=this.parentNode.offsetHeight;
        this.style.top=(-32 + h/2) + 'px';
      }
    };
    hs ='position:absolute;';
    hs+='left: 50%;';
    hs+='margin-left: -112px;;';
    hs+='top:  290px;';
    hs+='width: 224px;';
    hs+='height: 64px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='z-index: 10001;';
    this._loading_image.setAttribute('style',hs);
    this._loading_image__img=document.createElement('img');
    this._loading_image__img.setAttribute('src',basePath + 'images/obj2vr/loading_image.png');
    this._loading_image__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
    me.player.checkLoaded.push(this._loading_image__img);
    this._loading_image.appendChild(this._loading_image__img);
    this._loading_text=document.createElement('div');
    this._loading_text.ggId='loading text'
    this._loading_text.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._loading_text.ggVisible=true;
    hs ='position:absolute;';
    hs+='left: 12px;';
    hs+='top:  14px;';
    hs+='width: 198px;';
    hs+='height: 20px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='border: 0px solid #000000;';
    hs+='color: #000000;';
    hs+='text-align: left;';
    hs+='white-space: nowrap;';
    hs+='padding: 0px 1px 0px 1px;'
    hs+='overflow: hidden;';
    this._loading_text.setAttribute('style',hs);
    $('.overlay', objectContainer).show();
    this._loading_text.ggUpdateText=function() {
      var percent = (me.player.getPercentLoaded()*100.0).toFixed(0);
      this.innerHTML="<b>Loading... "+ percent +"%<\/b>";
      if(percent >= 100){
        $('.overlay .continue.btn', objectContainer).show();
        $(this._loading_text).hide();
      }
    };
    this._loading_text.ggUpdateText();
    this._loading_image.appendChild(this._loading_text);
    this._loading_bar=document.createElement('div');
    this._loading_bar.ggId='loading bar'
    this._loading_bar.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._loading_bar.ggVisible=true;
    hs ='position:absolute;';
    hs+='left: 11px;';
    hs+='top:  39px;';
    hs+='width: 198px;';
    hs+='height: 10px;';
    hs+=cssPrefix + 'transform-origin: 0% 50%;';
    hs+='visibility: inherit;';
    hs+='border: 2px solid #000000;';
    hs+='background-color: #4f4f4f;';
    this._loading_bar.setAttribute('style',hs);
    this._loading_image.appendChild(this._loading_bar);
    this._loading_close=document.createElement('div');
    this._loading_close.ggId='loading close'
    this._loading_close.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._loading_close.ggVisible=true;
    hs ='position:absolute;';
    hs+='right: 50%;';
    hs+='margin-right: -105px;';
    hs+='top:  5px;';
    hs+='width: 24px;';
    hs+='height: 24px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    this._loading_close.setAttribute('style',hs);
    this._loading_close__img=document.createElement('img');
    this._loading_close__img.setAttribute('src',basePath + 'images/obj2vr/loading_close.png');
    me.player.checkLoaded.push(this._loading_close__img);
    this._loading_close.appendChild(this._loading_close__img);
    this._loading_close.onclick=function () {
      me._loading_image.style[domTransition]='none';
      me._loading_image.style.visibility='hidden';
      me._loading_image.ggVisible=false;
    }
    this._loading_image.appendChild(this._loading_close);
    objectContainer[0].appendChild(this._loading_image);

    this._left=document.createElement('div');
    this._left.ggId='left';
    this._left.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._left.ggVisible=true;
    hs ='position:absolute;';
    hs+='left: 20px;';
    hs+='top:  50%;';
    hs+='margin-top:  -16px;';
    hs+='width: 32px;';
    hs+='height: 32px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='cursor: pointer;';
    this._left.setAttribute('style',hs);
    this._left__img=document.createElement('img');
    this._left__img.setAttribute('src',basePath + 'images/obj2vr/left.png');
    this._left__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
    this._left.className = 'control';
    me.player.checkLoaded.push(this._left__img);
    this._left.appendChild(this._left__img);
    this._left.onclick=function () {
      me.player.changePan(1,true);
    }
    this._left.onmouseover=function () {
      me._left__img.src=basePath + 'images/obj2vr/left__o.png';
    }
    this._left.onmouseout=function () {
      me._left__img.src=basePath + 'images/obj2vr/left.png';
    }
    this.divSkin.appendChild(this._left);
    this._right=document.createElement('div');
    this._right.ggId='right'
    this._right.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._right.ggVisible=true;
    hs ='position:absolute;';
    hs+='right: 20px;';
    hs+='top:  50%;';
    hs+='margin-top:  -16px;';
    hs+='width: 32px;';
    hs+='height: 32px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='cursor: pointer;';
    this._right.setAttribute('style',hs);
    this._right__img=document.createElement('img');
    this._right__img.setAttribute('src',basePath + 'images/obj2vr/right.png');
    this._right__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
    this._right.className = 'control';
    me.player.checkLoaded.push(this._right__img);
    this._right.appendChild(this._right__img);
    this._right.onclick=function () {
      me.player.changePan(-1,true);
    }
    this._right.onmouseover=function () {
      me._right__img.src=basePath + 'images/obj2vr/right__o.png';
    }
    this._right.onmouseout=function () {
      me._right__img.src=basePath + 'images/obj2vr/right.png';
    }
    this.divSkin.appendChild(this._right);
    this._up=document.createElement('div');
    this._up.ggId='up'
    this._up.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._up.ggVisible=true;
    hs ='position:absolute;';
    hs+='left:  50%;';
    hs+='margin-left:  -16px;';
    hs+='top:  20px;';
    hs+='width: 32px;';
    hs+='height: 32px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='cursor: pointer;';
    this._up.setAttribute('style',hs);
    this._up__img=document.createElement('img');
    this._up__img.setAttribute('src',basePath + 'images/obj2vr/up.png');
    this._up__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
    this._up.className = 'control';
    me.player.checkLoaded.push(this._up__img);
    this._up.appendChild(this._up__img);
    this._up.onclick=function () {
      me.player.changeTilt(1,true);
    }
    this._up.onmouseover=function () {
      me._up__img.src=basePath + 'images/obj2vr/up__o.png';
    }
    this._up.onmouseout=function () {
      me._up__img.src=basePath + 'images/obj2vr/up.png';
    }
    this.divSkin.appendChild(this._up);

    this._down=document.createElement('div');
    this._down.ggId='down'
    this._down.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._down.ggVisible=true;
    hs ='position:absolute;';
    hs+='left:  50%;';
    hs+='margin-left:  -16px;';
    hs+='bottom:  20px;';
    hs+='width: 32px;';
    hs+='height: 32px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: inherit;';
    hs+='cursor: pointer;';
    this._down.setAttribute('style',hs);
    this._down__img=document.createElement('img');
    this._down__img.setAttribute('src',basePath + 'images/obj2vr/down.png');
    this._down__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
    this._down.className = 'control';
    me.player.checkLoaded.push(this._down__img);
    this._down.appendChild(this._down__img);
    this._down.onclick=function () {
      me.player.changeTilt(-1,true);
    }
    this._down.onmouseover=function () {
      me._down__img.src=basePath + 'images/obj2vr/down__o.png';
    }
    this._down.onmouseout=function () {
      me._down__img.src=basePath + 'images/obj2vr/down.png';
    }
    this.divSkin.appendChild(this._down);

    this._fullscreen=document.createElement('div');
    this._fullscreen.ggId='fullscreen'
    this._fullscreen.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
    this._fullscreen.ggVisible=true;
    hs ='position:absolute;';
    hs+='right: 20px;';
    hs+='bottom: 20px;';
    hs+='width: 32px;';
    hs+='height: 32px;';
    hs+=cssPrefix + 'transform-origin: 50% 50%;';
    hs+='visibility: visible;';
    hs+='cursor: pointer;';
    this._fullscreen.setAttribute('style',hs);
    this._fullscreen__img=document.createElement('img');
    this._fullscreen__img.setAttribute('src',basePath + 'images/obj2vr/fullscreen.png');
    this._fullscreen__img.setAttribute('style','position: absolute;top: 0px;left: 0px;');
    this._fullscreen.className = 'control';
    me.player.checkLoaded.push(this._fullscreen__img);
    this._fullscreen.appendChild(this._fullscreen__img);
    this._fullscreen.onclick=function () {
      me.player.toggleFullscreen();
    }
    this._fullscreen.onmouseover=function () {
      me._fullscreen__img.src=basePath + 'images/obj2vr/fullscreen__o.png';
    }
    this._fullscreen.onmouseout=function () {
      me._fullscreen__img.src=basePath + 'images/obj2vr/fullscreen.png';
    }
    this.divSkin.appendChild(this._fullscreen);

    this.preloadImages();
    this.divSkin.ggUpdateSize=function(w,h) {
      me.updateSize(me.divSkin);
    }
    this.divSkin.ggViewerInit=function() {
    }
    this.divSkin.ggLoaded=function() {
      me._loading_image.style[domTransition]='none';
      me._loading_image.style.visibility='hidden';
      me._loading_image.ggVisible=false;
    }
    this.divSkin.ggReLoaded=function() {
    }
    this.divSkin.ggEnterFullscreen=function() {
      objectContainer.addClass('full-screen');
      $('.container').addClass('full-screen');
      $(document).keyup(function(e){
        if(e.which == 27){
          me.player.toggleFullscreen();
        }
      });
    };
    this.divSkin.ggExitFullscreen=function() {
      objectContainer.removeClass('full-screen');
      $('.container').removeClass('full-screen');
      $(document).unbind('keyup').trigger('resize');
    };
    this.skinTimerEvent();
  };
  this.hotspotProxyClick=function(id) {
  }
  this.hotspotProxyOver=function(id) {
  }
  this.hotspotProxyOut=function(id) {
  }
  this.changeActiveNode=function(id) {
    var newMarker=new Array();
    var i,j;
    var tags=me.player.userdata.tags;
    for (i=0;i<nodeMarker.length;i++) {
      var match=false;
      if (nodeMarker[i].ggMarkerNodeId==id) match=true;
      for(j=0;j<tags.length;j++) {
        if (nodeMarker[i].ggMarkerNodeId==tags[j]) match=true;
      }
      if (match) {
        newMarker.push(nodeMarker[i]);
      }
    }
    for(i=0;i<activeNodeMarker.length;i++) {
      if (newMarker.indexOf(activeNodeMarker[i])<0) {
        if (activeNodeMarker[i].ggMarkerNormal) {
          activeNodeMarker[i].ggMarkerNormal.style.visibility='inherit';
        }
        if (activeNodeMarker[i].ggMarkerActive) {
          activeNodeMarker[i].ggMarkerActive.style.visibility='hidden';
        }
        if (activeNodeMarker[i].ggDeactivate) {
          activeNodeMarker[i].ggDeactivate();
        }
      }
    }
    for(i=0;i<newMarker.length;i++) {
      if (activeNodeMarker.indexOf(newMarker[i])<0) {
        if (newMarker[i].ggMarkerNormal) {
          newMarker[i].ggMarkerNormal.style.visibility='hidden';
        }
        if (newMarker[i].ggMarkerActive) {
          newMarker[i].ggMarkerActive.style.visibility='inherit';
        }
        if (newMarker[i].ggActivate) {
          newMarker[i].ggActivate();
        }
      }
    }
    activeNodeMarker=newMarker;
  }
  this.skinTimerEvent=function() {
    setTimeout(function() { me.skinTimerEvent(); }, 10);
    this._loading_text.ggUpdateText();
    var hs='';
    if (me._loading_bar.ggParameter) {
      hs+=parameterToTransform(me._loading_bar.ggParameter) + ' ';
    }
    hs+='scale(' + (1 * me.player.getPercentLoaded() + 0) + ',1.0) ';
    me._loading_bar.style[domTransform]=hs;
  };
  this.addSkin();
};