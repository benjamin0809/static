import{c as C,g as _}from"./async-validator.19c021d1.js";import{r as x}from"./codemirror.c8cb31a3.js";var y={exports:{}};(function(b,O){(function(v,f){b.exports=f(x())})(C,function(v){return function(f){function t(n){if(s[n])return s[n].exports;var a=s[n]={i:n,l:!1,exports:{}};return f[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var s={};return t.m=f,t.c=s,t.i=function(n){return n},t.d=function(n,a,l){t.o(n,a)||Object.defineProperty(n,a,{configurable:!1,enumerable:!0,get:l})},t.n=function(n){var a=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(a,"a",a),a},t.o=function(n,a){return Object.prototype.hasOwnProperty.call(n,a)},t.p="/",t(t.s=3)}([function(f,t){f.exports=v},function(f,t,s){Object.defineProperty(t,"__esModule",{value:!0});var n=s(0),a=function(e){return e&&e.__esModule?e:{default:e}}(n),l=window.CodeMirror||a.default;typeof Object.assign!="function"&&Object.defineProperty(Object,"assign",{value:function(e,r){if(e==null)throw new TypeError("Cannot convert undefined or null to object");for(var c=Object(e),i=1;i<arguments.length;i++){var d=arguments[i];if(d!=null)for(var o in d)Object.prototype.hasOwnProperty.call(d,o)&&(c[o]=d[o])}return c},writable:!0,configurable:!0}),t.default={name:"codemirror",data:function(){return{content:"",codemirror:null,cminstance:null}},props:{code:String,value:String,marker:Function,unseenLines:Array,name:{type:String,default:"codemirror"},placeholder:{type:String,default:""},merge:{type:Boolean,default:!1},options:{type:Object,default:function(){return{}}},events:{type:Array,default:function(){return[]}},globalOptions:{type:Object,default:function(){return{}}},globalEvents:{type:Array,default:function(){return[]}}},watch:{options:{deep:!0,handler:function(e){for(var r in e)this.cminstance.setOption(r,e[r])}},merge:function(){this.$nextTick(this.switchMerge)},code:function(e){this.handerCodeChange(e)},value:function(e){this.handerCodeChange(e)}},methods:{initialize:function(){var e=this,r=Object.assign({},this.globalOptions,this.options);this.merge?(this.codemirror=l.MergeView(this.$refs.mergeview,r),this.cminstance=this.codemirror.edit):(this.codemirror=l.fromTextArea(this.$refs.textarea,r),this.cminstance=this.codemirror,this.cminstance.setValue(this.code||this.value||this.content)),this.cminstance.on("change",function(i){e.content=i.getValue(),e.$emit&&e.$emit("input",e.content)});var c={};["scroll","changes","beforeChange","cursorActivity","keyHandled","inputRead","electricInput","beforeSelectionChange","viewportChange","swapDoc","gutterClick","gutterContextMenu","focus","blur","refresh","optionChange","scrollCursorIntoView","update"].concat(this.events).concat(this.globalEvents).filter(function(i){return!c[i]&&(c[i]=!0)}).forEach(function(i){e.cminstance.on(i,function(){for(var d=arguments.length,o=Array(d),u=0;u<d;u++)o[u]=arguments[u];e.$emit.apply(e,[i].concat(o));var p=i.replace(/([A-Z])/g,"-$1").toLowerCase();p!==i&&e.$emit.apply(e,[p].concat(o))})}),this.$emit("ready",this.codemirror),this.unseenLineMarkers(),this.refresh()},refresh:function(){var e=this;this.$nextTick(function(){e.cminstance.refresh()})},destroy:function(){var e=this.cminstance.doc.cm.getWrapperElement();e&&e.remove&&e.remove()},handerCodeChange:function(e){if(e!==this.cminstance.getValue()){var r=this.cminstance.getScrollInfo();this.cminstance.setValue(e),this.content=e,this.cminstance.scrollTo(r.left,r.top)}this.unseenLineMarkers()},unseenLineMarkers:function(){var e=this;this.unseenLines!==void 0&&this.marker!==void 0&&this.unseenLines.forEach(function(r){var c=e.cminstance.lineInfo(r);e.cminstance.setGutterMarker(r,"breakpoints",c.gutterMarkers?null:e.marker())})},switchMerge:function(){var e=this.cminstance.doc.history,r=this.cminstance.doc.cleanGeneration;this.options.value=this.cminstance.getValue(),this.destroy(),this.initialize(),this.cminstance.doc.history=e,this.cminstance.doc.cleanGeneration=r}},mounted:function(){this.initialize()},beforeDestroy:function(){this.destroy()}}},function(f,t,s){Object.defineProperty(t,"__esModule",{value:!0});var n=s(1),a=s.n(n);for(var l in n)["default","default"].indexOf(l)<0&&function(i){s.d(t,i,function(){return n[i]})}(l);var e=s(5),r=s(4),c=r(a.a,e.a,!1,null,null,null);t.default=c.exports},function(f,t,s){function n(o){return o&&o.__esModule?o:{default:o}}Object.defineProperty(t,"__esModule",{value:!0}),t.install=t.codemirror=t.CodeMirror=void 0;var a=s(0),l=n(a),e=s(2),r=n(e),c=window.CodeMirror||l.default,i=function(o,u){u&&(u.options&&(r.default.props.globalOptions.default=function(){return u.options}),u.events&&(r.default.props.globalEvents.default=function(){return u.events})),o.component(r.default.name,r.default)},d={CodeMirror:c,codemirror:r.default,install:i};t.default=d,t.CodeMirror=c,t.codemirror=r.default,t.install=i},function(f,t){f.exports=function(s,n,a,l,e,r){var c,i=s=s||{},d=typeof s.default;d!=="object"&&d!=="function"||(c=s,i=s.default);var o=typeof i=="function"?i.options:i;n&&(o.render=n.render,o.staticRenderFns=n.staticRenderFns,o._compiled=!0),a&&(o.functional=!0),e&&(o._scopeId=e);var u;if(r?(u=function(h){h=h||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,h||typeof __VUE_SSR_CONTEXT__>"u"||(h=__VUE_SSR_CONTEXT__),l&&l.call(this,h),h&&h._registeredComponents&&h._registeredComponents.add(r)},o._ssrRegister=u):l&&(u=l),u){var p=o.functional,m=p?o.render:o.beforeCreate;p?(o._injectStyles=u,o.render=function(h,g){return u.call(g),m(h,g)}):o.beforeCreate=m?[].concat(m,u):[u]}return{esModule:c,exports:i,options:o}}},function(f,t,s){var n=function(){var e=this,r=e.$createElement,c=e._self._c||r;return c("div",{staticClass:"vue-codemirror",class:{merge:e.merge}},[e.merge?c("div",{ref:"mergeview"}):c("textarea",{ref:"textarea",attrs:{name:e.name,placeholder:e.placeholder}})])},a=[],l={render:n,staticRenderFns:a};t.a=l}])})})(y);const j=_(y.exports);export{j as V};
