var N,d,O,S,R,M,E={},$=[],Q=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function k(_,e){for(var t in e)_[t]=e[t];return _}function B(_){var e=_.parentNode;e&&e.removeChild(_)}function X(_,e,t){var r,l,o,c={};for(o in e)o=="key"?r=e[o]:o=="ref"?l=e[o]:c[o]=e[o];if(arguments.length>2&&(c.children=arguments.length>3?N.call(arguments,2):t),typeof _=="function"&&_.defaultProps!=null)for(o in _.defaultProps)c[o]===void 0&&(c[o]=_.defaultProps[o]);return C(_,c,r,l,null)}function C(_,e,t,r,l){var o={type:_,props:e,key:t,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:l==null?++O:l};return l==null&&d.vnode!=null&&d.vnode(o),o}function _e(){return{current:null}}function U(_){return _.children}function D(_,e){this.props=_,this.context=e}function x(_,e){if(e==null)return _.__?x(_.__,_.__.__k.indexOf(_)+1):null;for(var t;e<_.__k.length;e++)if((t=_.__k[e])!=null&&t.__e!=null)return t.__e;return typeof _.type=="function"?x(_):null}function j(_){var e,t;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,e=0;e<_.__k.length;e++)if((t=_.__k[e])!=null&&t.__e!=null){_.__e=_.__c.base=t.__e;break}return j(_)}}function W(_){(!_.__d&&(_.__d=!0)&&S.push(_)&&!T.__r++||M!==d.debounceRendering)&&((M=d.debounceRendering)||R)(T)}function T(){for(var _;T.__r=S.length;)_=S.sort(function(e,t){return e.__v.__b-t.__v.__b}),S=[],_.some(function(e){var t,r,l,o,c,u;e.__d&&(c=(o=(t=e).__v).__e,(u=t.__P)&&(r=[],(l=k({},o)).__v=o.__v+1,L(u,o,l,t.__n,u.ownerSVGElement!==void 0,o.__h!=null?[c]:null,r,c==null?x(o):c,o.__h),q(r,o),o.__e!=c&&j(o)))})}function z(_,e,t,r,l,o,c,u,p,a){var n,h,s,i,f,b,v,y=r&&r.__k||$,m=y.length;for(t.__k=[],n=0;n<e.length;n++)if((i=t.__k[n]=(i=e[n])==null||typeof i=="boolean"?null:typeof i=="string"||typeof i=="number"||typeof i=="bigint"?C(null,i,null,null,i):Array.isArray(i)?C(U,{children:i},null,null,null):i.__b>0?C(i.type,i.props,i.key,null,i.__v):i)!=null){if(i.__=t,i.__b=t.__b+1,(s=y[n])===null||s&&i.key==s.key&&i.type===s.type)y[n]=void 0;else for(h=0;h<m;h++){if((s=y[h])&&i.key==s.key&&i.type===s.type){y[h]=void 0;break}s=null}L(_,i,s=s||E,l,o,c,u,p,a),f=i.__e,(h=i.ref)&&s.ref!=h&&(v||(v=[]),s.ref&&v.push(s.ref,null,i),v.push(h,i.__c||f,i)),f!=null?(b==null&&(b=f),typeof i.type=="function"&&i.__k===s.__k?i.__d=p=G(i,p,_):p=V(_,i,s,y,f,p),typeof t.type=="function"&&(t.__d=p)):p&&s.__e==p&&p.parentNode!=_&&(p=x(s))}for(t.__e=b,n=m;n--;)y[n]!=null&&(typeof t.type=="function"&&y[n].__e!=null&&y[n].__e==t.__d&&(t.__d=x(r,n+1)),K(y[n],y[n]));if(v)for(n=0;n<v.length;n++)J(v[n],v[++n],v[++n])}function G(_,e,t){for(var r,l=_.__k,o=0;l&&o<l.length;o++)(r=l[o])&&(r.__=_,e=typeof r.type=="function"?G(r,e,t):V(t,r,r,l,r.__e,e));return e}function V(_,e,t,r,l,o){var c,u,p;if(e.__d!==void 0)c=e.__d,e.__d=void 0;else if(t==null||l!=o||l.parentNode==null)e:if(o==null||o.parentNode!==_)_.appendChild(l),c=null;else{for(u=o,p=0;(u=u.nextSibling)&&p<r.length;p+=2)if(u==l)break e;_.insertBefore(l,o),c=o}return c!==void 0?c:l.nextSibling}function Y(_,e,t,r,l){var o;for(o in t)o==="children"||o==="key"||o in e||A(_,o,null,t[o],r);for(o in e)l&&typeof e[o]!="function"||o==="children"||o==="key"||o==="value"||o==="checked"||t[o]===e[o]||A(_,o,e[o],t[o],r)}function H(_,e,t){e[0]==="-"?_.setProperty(e,t):_[e]=t==null?"":typeof t!="number"||Q.test(e)?t:t+"px"}function A(_,e,t,r,l){var o;e:if(e==="style")if(typeof t=="string")_.style.cssText=t;else{if(typeof r=="string"&&(_.style.cssText=r=""),r)for(e in r)t&&e in t||H(_.style,e,"");if(t)for(e in t)r&&t[e]===r[e]||H(_.style,e,t[e])}else if(e[0]==="o"&&e[1]==="n")o=e!==(e=e.replace(/Capture$/,"")),e=e.toLowerCase()in _?e.toLowerCase().slice(2):e.slice(2),_.l||(_.l={}),_.l[e+o]=t,t?r||_.addEventListener(e,o?I:F,o):_.removeEventListener(e,o?I:F,o);else if(e!=="dangerouslySetInnerHTML"){if(l)e=e.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if(e!=="href"&&e!=="list"&&e!=="form"&&e!=="tabIndex"&&e!=="download"&&e in _)try{_[e]=t==null?"":t;break e}catch{}typeof t=="function"||(t!=null&&(t!==!1||e[0]==="a"&&e[1]==="r")?_.setAttribute(e,t):_.removeAttribute(e))}}function F(_){this.l[_.type+!1](d.event?d.event(_):_)}function I(_){this.l[_.type+!0](d.event?d.event(_):_)}function L(_,e,t,r,l,o,c,u,p){var a,n,h,s,i,f,b,v,y,m,P,g=e.type;if(e.constructor!==void 0)return null;t.__h!=null&&(p=t.__h,u=e.__e=t.__e,e.__h=null,o=[u]),(a=d.__b)&&a(e);try{e:if(typeof g=="function"){if(v=e.props,y=(a=g.contextType)&&r[a.__c],m=a?y?y.props.value:a.__:r,t.__c?b=(n=e.__c=t.__c).__=n.__E:("prototype"in g&&g.prototype.render?e.__c=n=new g(v,m):(e.__c=n=new D(v,m),n.constructor=g,n.render=ee),y&&y.sub(n),n.props=v,n.state||(n.state={}),n.context=m,n.__n=r,h=n.__d=!0,n.__h=[]),n.__s==null&&(n.__s=n.state),g.getDerivedStateFromProps!=null&&(n.__s==n.state&&(n.__s=k({},n.__s)),k(n.__s,g.getDerivedStateFromProps(v,n.__s))),s=n.props,i=n.state,h)g.getDerivedStateFromProps==null&&n.componentWillMount!=null&&n.componentWillMount(),n.componentDidMount!=null&&n.__h.push(n.componentDidMount);else{if(g.getDerivedStateFromProps==null&&v!==s&&n.componentWillReceiveProps!=null&&n.componentWillReceiveProps(v,m),!n.__e&&n.shouldComponentUpdate!=null&&n.shouldComponentUpdate(v,n.__s,m)===!1||e.__v===t.__v){n.props=v,n.state=n.__s,e.__v!==t.__v&&(n.__d=!1),n.__v=e,e.__e=t.__e,e.__k=t.__k,e.__k.forEach(function(w){w&&(w.__=e)}),n.__h.length&&c.push(n);break e}n.componentWillUpdate!=null&&n.componentWillUpdate(v,n.__s,m),n.componentDidUpdate!=null&&n.__h.push(function(){n.componentDidUpdate(s,i,f)})}n.context=m,n.props=v,n.state=n.__s,(a=d.__r)&&a(e),n.__d=!1,n.__v=e,n.__P=_,a=n.render(n.props,n.state,n.context),n.state=n.__s,n.getChildContext!=null&&(r=k(k({},r),n.getChildContext())),h||n.getSnapshotBeforeUpdate==null||(f=n.getSnapshotBeforeUpdate(s,i)),P=a!=null&&a.type===U&&a.key==null?a.props.children:a,z(_,Array.isArray(P)?P:[P],e,t,r,l,o,c,u,p),n.base=e.__e,e.__h=null,n.__h.length&&c.push(n),b&&(n.__E=n.__=null),n.__e=!1}else o==null&&e.__v===t.__v?(e.__k=t.__k,e.__e=t.__e):e.__e=Z(t.__e,e,t,r,l,o,c,p);(a=d.diffed)&&a(e)}catch(w){e.__v=null,(p||o!=null)&&(e.__e=u,e.__h=!!p,o[o.indexOf(u)]=null),d.__e(w,e,t)}}function q(_,e){d.__c&&d.__c(e,_),_.some(function(t){try{_=t.__h,t.__h=[],_.some(function(r){r.call(t)})}catch(r){d.__e(r,t.__v)}})}function Z(_,e,t,r,l,o,c,u){var p,a,n,h=t.props,s=e.props,i=e.type,f=0;if(i==="svg"&&(l=!0),o!=null){for(;f<o.length;f++)if((p=o[f])&&"setAttribute"in p==!!i&&(i?p.localName===i:p.nodeType===3)){_=p,o[f]=null;break}}if(_==null){if(i===null)return document.createTextNode(s);_=l?document.createElementNS("http://www.w3.org/2000/svg",i):document.createElement(i,s.is&&s),o=null,u=!1}if(i===null)h===s||u&&_.data===s||(_.data=s);else{if(o=o&&N.call(_.childNodes),a=(h=t.props||E).dangerouslySetInnerHTML,n=s.dangerouslySetInnerHTML,!u){if(o!=null)for(h={},f=0;f<_.attributes.length;f++)h[_.attributes[f].name]=_.attributes[f].value;(n||a)&&(n&&(a&&n.__html==a.__html||n.__html===_.innerHTML)||(_.innerHTML=n&&n.__html||""))}if(Y(_,s,h,l,u),n)e.__k=[];else if(f=e.props.children,z(_,Array.isArray(f)?f:[f],e,t,r,l&&i!=="foreignObject",o,c,o?o[0]:t.__k&&x(t,0),u),o!=null)for(f=o.length;f--;)o[f]!=null&&B(o[f]);u||("value"in s&&(f=s.value)!==void 0&&(f!==_.value||i==="progress"&&!f||i==="option"&&f!==h.value)&&A(_,"value",f,h.value,!1),"checked"in s&&(f=s.checked)!==void 0&&f!==_.checked&&A(_,"checked",f,h.checked,!1))}return _}function J(_,e,t){try{typeof _=="function"?_(e):_.current=e}catch(r){d.__e(r,t)}}function K(_,e,t){var r,l;if(d.unmount&&d.unmount(_),(r=_.ref)&&(r.current&&r.current!==_.__e||J(r,null,e)),(r=_.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(o){d.__e(o,e)}r.base=r.__P=null}if(r=_.__k)for(l=0;l<r.length;l++)r[l]&&K(r[l],e,typeof _.type!="function");t||_.__e==null||B(_.__e),_.__e=_.__d=void 0}function ee(_,e,t){return this.constructor(_,t)}function te(_,e,t){var r,l,o;d.__&&d.__(_,e),l=(r=typeof t=="function")?null:t&&t.__k||e.__k,o=[],L(e,_=(!r&&t||e).__k=X(U,null,[_]),l||E,E,e.ownerSVGElement!==void 0,!r&&t?[t]:l?null:e.firstChild?N.call(e.childNodes):null,o,!r&&t?t:l?l.__e:e.firstChild,r),q(o,_)}N=$.slice,d={__e:function(_,e){for(var t,r,l;e=e.__;)if((t=e.__c)&&!t.__)try{if((r=t.constructor)&&r.getDerivedStateFromError!=null&&(t.setState(r.getDerivedStateFromError(_)),l=t.__d),t.componentDidCatch!=null&&(t.componentDidCatch(_),l=t.__d),l)return t.__E=t}catch(o){_=o}throw _}},O=0,D.prototype.setState=function(_,e){var t;t=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=k({},this.state),typeof _=="function"&&(_=_(k({},t),this.props)),_&&k(t,_),_!=null&&this.__v&&(e&&this.__h.push(e),W(this))},D.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),W(this))},D.prototype.render=U,S=[],R=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,T.__r=0;export{te as S,U as d,_e as p,X as v};
