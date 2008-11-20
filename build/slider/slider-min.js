YUI.add("slider",function(A){var i="slider",X="rail",n="thumb",m="value",S="min",p="max",P="thumbImage",o="railSize",b="contentBox",O="slideStart",Z="slideEnd",V="thumbDrag",e="sync",l="valueSet",j="rendered",d="disabled",K="disabledChange",U=".",r="px",D="width",f="height",Q="complete",I=A.Lang,W=I.isArray,g=I.isBoolean,N=I.isString,q=I.isNumber,G=A.ClassNameManager.getClassName,J="image",B=G(i,X),C=G(i,n),R=G(i,n,J),E=G(i,J,"error"),H=Math,T=H.max,k=H.round,F=H.floor,a=H.ceil,c=H.abs;function h(){h.superclass.constructor.apply(this,arguments);}A.mix(h,{NAME:i,AXIS_KEYS:{x:{offsetEdge:"left",dim:D,offAxisDim:f,eventPageAxis:"pageX",ddStick:"stickX",xyIndex:0},y:{offsetEdge:"top",dim:f,offAxisDim:D,eventPageAxis:"pageY",ddStick:"stickY",xyIndex:1}},HTML_PARSER:{rail:U+B,thumb:U+C,thumbImage:U+R},ATTRS:{axis:{value:"x",writeOnce:true,validator:function(L){return this._validateNewAxis(L);},set:function(L){return this._setAxisFn(L);}},min:{value:0,validator:function(L){return this._validateNewMin(L);}},max:{value:100,validator:function(L){return this._validateNewMax(L);}},value:{value:null,validator:function(L){return this._validateNewValue(L);},set:function(L){return this._setValueFn(L);}},rail:{value:null,validator:function(L){return this._validateNewRail(L);},set:function(L){return this._setRailFn(L);}},thumb:{value:null,validator:function(L){return this._validateNewThumb(L);},set:function(L){return this._setThumbFn(L);}},thumbImage:{value:null,validator:function(L){return this._validateNewThumbImage(L);},set:function(L){return this._setThumbImageFn(L);}},railSize:{value:"0",validator:function(L){return this._validateNewRailSize(L);}},railEnabled:{value:true,validator:g}}});A.extend(h,A.Widget,{_key:null,_factor:1,_railSize:null,_thumbSize:null,_thumbOffset:0,_stall:false,_disabled:false,initializer:function(){this._key=h.AXIS_KEYS[this.get("axis")];this.after("minChange",this._afterMinChange);this.after("maxChange",this._afterMaxChange);this.after("railSizeChange",this._afterRailSizeChange);this.publish(O);this.publish(Z);this.publish(e,{defaultFn:this._defSyncUI});this.publish(l,{defaultFn:this._defSetThumbPosition});},renderUI:function(){this._initRail();this._initThumb();},_initRail:function(){var L=this.get(b),M=this.get(X);if(!M){M=L.appendChild(A.Node.create('<div class="'+B+'"></div>'));this.set(X,M);}else{if(!L.contains(M)){L.appendChild(M);}}M.addClass(B);M.addClass(this.getClassName(X,this.get("axis")));},_initThumb:function(){var M=this.get(X),L=this.get(n);if(L&&!this.get(P)&&L.get("nodeName").toLowerCase()==="img"){this.set(P,L);this.set(n,null);L=null;}if(!L){L=A.Node.create('<div class="'+C+'"></div>');this.set(n,L);}L.addClass(C);if(!M.contains(L)){M.appendChild(L);}if(this.get(P)){this._initThumbImage();}},_initThumbImage:function(){var M=this.get(n),L=this.get(P);if(L){L.replaceClass(C,R);if(!M.contains(L)){M.appendChild(L);}}},bindUI:function(){this.publish(V,{defaultFn:this._defUpdateValueFromDD});this._bindThumbDD();this.after("valueChange",this._afterValueChange);this.after("thumbImageChange",this._afterThumbImageChange);this.after(K,this._afterDisabledChange);},_bindThumbDD:function(){var M={node:this.get(n),constrain2node:this.get(X)},L;M[this._key.ddStick]=true;this._dd=L=new A.DD.Drag(M);L.on("drag:start",A.bind(this._onDDStartDrag,this));L.on("drag:drag",A.bind(this._onDDDrag,this));L.on("drag:end",A.bind(this._onDDEndDrag,this));this._initRailDD();},_initRailDD:function(){this.get(X).on("mousedown",A.bind(this._handleRailMouseDown,this));},_handleRailMouseDown:function(Y){if(this.get("railEnabled")&&!this.get(d)){var L=this._dd,s=this._key.xyIndex,M;if(L.get("primaryButtonOnly")&&Y.button>1){return false;}L._dragThreshMet=true;L._fixIEMouseDown();Y.halt();A.DD.DDM.activeDrag=L;M=L.get("dragNode").getXY();M[s]+=this._thumbOffset;L._setStartPosition(M);L.start();L._moveNode([Y.pageX,Y.pageY]);}},syncUI:function(){var L=this.get(P);if(this._isImageLoading(L)){this._scheduleSync();}else{this._ready(L);}},_scheduleSync:function(){var L,M;if(!this._stall){this._disabled=this.get(d);this.set(d,true);this._stall=this.on(K,this._stallDisabledChange);L=this.get(P);M=A.bind(this._imageLoaded,this,L);L.on("load",M);L.on("error",M);}},_stallDisabledChange:function(L){this._disabled=L.newVal;L.preventDefault();},_imageLoaded:function(M,L){if(this._stall){this._stall.detach();}this._stall=false;this._ready(L);this.set(d,this._disabled);},_ready:function(L){var M=L&&this._isImageLoaded(L)?"removeClass":"addClass";this.get(b)[M](E);this.fire(e);},_defSyncUI:function(L){this._uiSetThumbSize();this._setThumbOffset();this._uiSetRailSize();this._setRailOffsetXY();this._setDDGutter();this._setFactor();this.set(m,this.get(m));},_uiSetThumbSize:function(){var M=this.get(n),s=this._key.dim,L=this.get(P),Y;Y=parseInt(M.getComputedStyle(s),10);if(L&&this._isImageLoaded(L)){Y=T(L.get(s),Y);}this._thumbSize=Y;},_setThumbOffset:function(){this._thumbOffset=F(this._thumbSize/2);},_uiSetRailSize:function(){var u=this.get(X),M=this.get(n),L=this.get(P),t=this._key.dim,Y=this.get(o),s=false;if(parseInt(Y,10)){u.setStyle(t,Y);Y=parseInt(u.getComputedStyle(t),10);}else{Y=this.get(t);if(parseInt(Y,10)){s=true;u.setStyle(t,Y);Y=parseInt(u.getComputedStyle(t),10);}Y=T(Y|0,parseInt(M.getComputedStyle(t),10),parseInt(u.getComputedStyle(t),10));if(L&&this._isImageLoaded(L)){Y=T(L.get(t),Y);}}u.setStyle(t,Y+r);this._railSize=Y;if(s){t=this._key.offAxisDim;Y=this.get(t);if(Y){u.set(t,Y);}}},_setRailOffsetXY:function(){this._offsetXY=this.get(X).getXY()[this._key.xyIndex]-this._thumbOffset;},_setDDGutter:function(){var s=[0,0,0,0],M=this._key.xyIndex,Y=this._thumbOffset,t=-Y,L=-1*(this._thumbSize-Y);if(M){s[0]=t;s[2]=L;}else{s[3]=t;s[1]=L;}this._dd.set("gutter",s.join(" "));},_setFactor:function(){this._factor=this._railSize?(this.get(p)-this.get(S))/this._railSize:1;},getValue:function(){return this.get(m);},setValue:function(L){this.set(m,L);},_validateNewAxis:function(L){return N(L)&&L.length===1&&"xy".indexOf(L.toLowerCase())>-1;
},_validateNewMin:function(L){return q(L);},_validateNewMax:function(L){return q(L);},_validateNewValue:function(M){var Y=this.get(S),L=this.get(p);return !this.get(d)&&q(M)&&(Y<L?(M>=Y&&M<=L):(M>=L&&M<=Y));},_validateNewRail:function(L){return !this.get(j)||L;},_validateNewThumb:function(L){return !this.get(j)||L;},_validateNewThumbImage:function(L){return !this.get(j)||L;},_validateNewRailSize:function(L){return N(L)&&(L==="0"||/^\d+(?:p[xtc]|%|e[mx]|in|[mc]m)$/.test(L));},_setAxisFn:function(L){return L.toLowerCase();},_setValueFn:function(L){if(!q(L)){L=this.get(S);}return k(L);},_setRailFn:function(L){return L?A.get(L):null;},_setThumbFn:function(L){return L?A.get(L):null;},_setThumbImageFn:function(L){return L?A.get(L)||A.Node.create('<img src="'+L+'" alt="Slider thumb">'):null;},_onDDStartDrag:function(L){this._setRailOffsetXY();this.fire(O,{ddEvent:L});},_onDDDrag:function(L){this.fire(V,{ddEvent:L});},_defUpdateValueFromDD:function(M){var L=this.get(m),Y=M.ddEvent[this._key.eventPageAxis]-this._offsetXY;Y=k(this.get(S)+(Y*this._factor));if(L!==Y){this.set(m,Y,{ddEvent:M.ddEvent});}},_onDDEndDrag:function(L){this.fire(Z,{ddEvent:L});},_defSetThumbPosition:function(s){var Y=this.get(S),L=this.get(p),M=s.changeEv.newVal;M=k(((M-Y)/(L-Y))*this._railSize);this._uiPositionThumb(M);},_uiPositionThumb:function(M){var L=this._dd;M+=this._offsetXY;L._setStartPosition(L.get("dragNode").getXY());L._moveNode([M,M]);},_afterValueChange:function(L){if(!L.ddEvent){this.fire(l,{changeEv:L});}},_afterThumbChange:function(M){var L;if(this.get(j)){if(M.prevValue){M.prevValue.get("parentNode").removeChild(M.prevValue);}this._initThumb();L=this.get(n);this._dd.set("node",L);this._dd.set("dragNode",L);this.syncUI();}},_afterThumbImageChange:function(L){if(this.get(j)){if(L.prevValue){L.prevValue.get("parentNode").removeChild(L.prevValue);}this._initThumbImage();this.syncUI();}},_afterMinChange:function(L){this._refresh(L);},_afterMaxChange:function(L){this._refresh(L);},_afterRailSizeChange:function(L){this._refresh(L);},_afterDisabledChange:function(L){if(this._dd){this._dd.set("lock",L.newVal);}},_refresh:function(L){if(L.newVal!==L.prevVal&&this.get(j)){this.syncUI();}},_isImageLoading:function(L){return L&&!L.get(Q);},_isImageLoaded:function(M){if(M){var L=M.get("naturalWidth");return M.get(Q)&&(L===undefined?M.get(D):L);}return true;}});A.Slider=h;},"@VERSION@",{requires:["widget","dd-constrain"]});