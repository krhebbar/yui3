YUI.add("jsonp-base",function(C){var B=C.Lang.isFunction;function A(){this._init.apply(this,arguments);}A.prototype={_init:function(D,F){this.url=D;F=(B(F))?{on:{success:F}}:F||{};var E=F.on||{};if(!E.success){E.success=this._defaultCallback(D,F);}this._config=C.merge({context:this,args:[],format:this._format},F,{on:E});},_defaultCallback:function(){},send:function(){var F=C.guid(),E=this._config,D=E.format.call(this,this.url,"YUI.Env.JSONP."+F);if(!E.on.success){return this;}function G(H){return(B(H))?function(I){delete YUI.Env.JSONP[F];H.apply(E.context,[I].concat(E.args));}:null;}YUI.Env.JSONP[F]=G(E.on.success);C.Get.script(D,{onFailure:G(E.on.failure),onTimeout:G(E.on.timeout),timeout:E.timeout});return this;},_dispatch:function(E,D){},_format:function(D,E){return D.replace(/\{callback\}/,E);}};C.JSONPRequest=A;C.jsonp=function(D,E){return new C.JSONPRequest(D,E).send();};YUI.Env.JSONP={};},"@VERSION@",{requires:["get","oop"]});