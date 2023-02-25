(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const C={};function pt(e){C.context=e}const xt=(e,t)=>e===t,ue=Symbol("solid-proxy"),St=Symbol("solid-track"),de={equals:xt};let Ze=it;const B=1,he=2,et={owned:null,cleanups:null,context:null,owner:null};var $=null;let F=null,p=null,k=null,j=null,Ne=0;function ve(e,t){const n=p,r=$,i=e.length===0,s=i?et:{owned:null,cleanups:null,context:null,owner:t===void 0?r:t},o=i?e:()=>e(()=>H(()=>be(s)));$=s,p=null;try{return ne(o,!0)}finally{p=n,$=r}}function tt(e,t){t=t?Object.assign({},de,t):de;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=i=>(typeof i=="function"&&(i=i(n.value)),rt(n,i));return[nt.bind(n),r]}function z(e,t,n){const r=Te(e,t,!1,B);te(r)}function At(e,t,n){Ze=$t;const r=Te(e,t,!1,B);r.user=!0,j?j.push(r):te(r)}function J(e,t,n){n=n?Object.assign({},de,n):de;const r=Te(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,te(r),nt.bind(r)}function H(e){if(p===null)return e();const t=p;p=null;try{return e()}finally{p=t}}function Ct(e){return $===null||($.cleanups===null?$.cleanups=[e]:$.cleanups.push(e)),e}function nt(){const e=F;if(this.sources&&(this.state||e))if(this.state===B||e)te(this);else{const t=k;k=null,ne(()=>me(this),!1),k=t}if(p){const t=this.observers?this.observers.length:0;p.sources?(p.sources.push(this),p.sourceSlots.push(t)):(p.sources=[this],p.sourceSlots=[t]),this.observers?(this.observers.push(p),this.observerSlots.push(p.sources.length-1)):(this.observers=[p],this.observerSlots=[p.sources.length-1])}return this.value}function rt(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&ne(()=>{for(let i=0;i<e.observers.length;i+=1){const s=e.observers[i],o=F&&F.running;o&&F.disposed.has(s),(o&&!s.tState||!o&&!s.state)&&(s.pure?k.push(s):j.push(s),s.observers&&st(s)),o||(s.state=B)}if(k.length>1e6)throw k=[],new Error},!1)),t}function te(e){if(!e.fn)return;be(e);const t=$,n=p,r=Ne;p=$=e,Et(e,e.value,r),p=n,$=t}function Et(e,t,n){let r;try{r=e.fn(t)}catch(i){e.pure&&(e.state=B,e.owned&&e.owned.forEach(be),e.owned=null),ot(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?rt(e,r):e.value=r,e.updatedAt=n)}function Te(e,t,n,r=B,i){const s={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:$,context:null,pure:n};return $===null||$!==et&&($.owned?$.owned.push(s):$.owned=[s]),s}function ge(e){const t=F;if(e.state===0||t)return;if(e.state===he||t)return me(e);if(e.suspense&&H(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Ne);)(e.state||t)&&n.push(e);for(let r=n.length-1;r>=0;r--)if(e=n[r],e.state===B||t)te(e);else if(e.state===he||t){const i=k;k=null,ne(()=>me(e,n[0]),!1),k=i}}function ne(e,t){if(k)return e();let n=!1;t||(k=[]),j?n=!0:j=[],Ne++;try{const r=e();return vt(n),r}catch(r){n||(j=null),k=null,ot(r)}}function vt(e){if(k&&(it(k),k=null),e)return;const t=j;j=null,t.length&&ne(()=>Ze(t),!1)}function it(e){for(let t=0;t<e.length;t++)ge(e[t])}function $t(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:ge(r)}for(C.context&&pt(),t=0;t<n;t++)ge(e[t])}function me(e,t){const n=F;e.state=0;for(let r=0;r<e.sources.length;r+=1){const i=e.sources[r];i.sources&&(i.state===B||n?i!==t&&ge(i):(i.state===he||n)&&me(i,t))}}function st(e){const t=F;for(let n=0;n<e.observers.length;n+=1){const r=e.observers[n];(!r.state||t)&&(r.state=he,r.pure?k.push(r):j.push(r),r.observers&&st(r))}}function be(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const s=i.pop(),o=n.observerSlots.pop();r<i.length&&(s.sourceSlots[o]=r,i[r]=s,n.observerSlots[r]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)be(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function kt(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function ot(e){throw e=kt(e),e}const je=Symbol("fallback");function ze(e){for(let t=0;t<e.length;t++)e[t]()}function Ot(e,t,n={}){let r=[],i=[],s=[],o=[],c=0,f;return Ct(()=>ze(s)),()=>{const a=e()||[];return a[St],H(()=>{if(a.length===0)return c!==0&&(ze(s),s=[],r=[],i=[],c=0,o=[]),n.fallback&&(r=[je],i[0]=ve(l=>(s[0]=l,n.fallback())),c=1),i;for(r[0]===je&&(s[0](),s=[],r=[],i=[],c=0),f=0;f<a.length;f++)f<r.length&&r[f]!==a[f]?o[f](()=>a[f]):f>=r.length&&(i[f]=ve(u));for(;f<r.length;f++)s[f]();return c=o.length=s.length=a.length,r=a.slice(0),i=i.slice(0,c)});function u(l){s[f]=l;const[d,h]=tt(a[f]);return o[f]=h,t(d,f)}}}function I(e,t){return H(()=>e(t||{}))}function oe(){return!0}const $e={get(e,t,n){return t===ue?n:e.get(t)},has(e,t){return t===ue?!0:e.has(t)},set:oe,deleteProperty:oe,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:oe,deleteProperty:oe}},ownKeys(e){return e.keys()}};function Ae(e){return(e=typeof e=="function"?e():e)?e:{}}function Pt(...e){let t=!1;for(let r=0;r<e.length;r++){const i=e[r];t=t||!!i&&ue in i,e[r]=typeof i=="function"?(t=!0,J(i)):i}if(t)return new Proxy({get(r){for(let i=e.length-1;i>=0;i--){const s=Ae(e[i])[r];if(s!==void 0)return s}},has(r){for(let i=e.length-1;i>=0;i--)if(r in Ae(e[i]))return!0;return!1},keys(){const r=[];for(let i=0;i<e.length;i++)r.push(...Object.keys(Ae(e[i])));return[...new Set(r)]}},$e);const n={};for(let r=e.length-1;r>=0;r--)if(e[r]){const i=Object.getOwnPropertyDescriptors(e[r]);for(const s in i)s in n||Object.defineProperty(n,s,{enumerable:!0,get(){for(let o=e.length-1;o>=0;o--){const c=(e[o]||{})[s];if(c!==void 0)return c}}})}return n}function Dt(e,...t){const n=new Set(t.flat());if(ue in e){const i=t.map(s=>new Proxy({get(o){return s.includes(o)?e[o]:void 0},has(o){return s.includes(o)&&o in e},keys(){return s.filter(o=>o in e)}},$e));return i.push(new Proxy({get(s){return n.has(s)?void 0:e[s]},has(s){return n.has(s)?!1:s in e},keys(){return Object.keys(e).filter(s=>!n.has(s))}},$e)),i}const r=Object.getOwnPropertyDescriptors(e);return t.push(Object.keys(r).filter(i=>!n.has(i))),t.map(i=>{const s={};for(let o=0;o<i.length;o++){const c=i[o];c in e&&Object.defineProperty(s,c,r[c]?r[c]:{get(){return e[c]},set(){return!0},enumerable:!0})}return s})}function Nt(e){const t="fallback"in e&&{fallback:()=>e.fallback};return J(Ot(()=>e.each,e.children,t||void 0))}const Tt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Lt=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Tt]),Rt=new Set(["innerHTML","textContent","innerText","children"]),Mt=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Be=Object.assign(Object.create(null),{class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"}),It=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),jt=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),zt={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Bt(e,t,n){let r=n.length,i=t.length,s=r,o=0,c=0,f=t[i-1].nextSibling,a=null;for(;o<i||c<s;){if(t[o]===n[c]){o++,c++;continue}for(;t[i-1]===n[s-1];)i--,s--;if(i===o){const u=s<r?c?n[c-1].nextSibling:n[s-c]:f;for(;c<s;)e.insertBefore(n[c++],u)}else if(s===c)for(;o<i;)(!a||!a.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[s-1]&&n[c]===t[i-1]){const u=t[--i].nextSibling;e.insertBefore(n[c++],t[o++].nextSibling),e.insertBefore(n[--s],u),t[i]=n[s]}else{if(!a){a=new Map;let l=c;for(;l<s;)a.set(n[l],l++)}const u=a.get(t[o]);if(u!=null)if(c<u&&u<s){let l=o,d=1,h;for(;++l<i&&l<s&&!((h=a.get(t[l]))==null||h!==u+d);)d++;if(d>u-c){const b=t[o];for(;c<u;)e.insertBefore(n[c++],b)}else e.replaceChild(n[c++],t[o++])}else o++;else t[o++].remove()}}}const Ge="_$DX_DELEGATE";function Gt(e,t,n,r={}){let i;return ve(s=>{i=s,t===document?e():re(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{i(),t.textContent=""}}function we(e,t,n){const r=document.createElement("template");r.innerHTML=e;let i=r.content.firstChild;return n&&(i=i.firstChild),i}function Ft(e,t=window.document){const n=t[Ge]||(t[Ge]=new Set);for(let r=0,i=e.length;r<i;r++){const s=e[r];n.has(s)||(n.add(s),t.addEventListener(s,qt))}}function ct(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function _t(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function U(e,t){t==null?e.removeAttribute("class"):e.className=t}function Wt(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=s=>i.call(e,n[1],s))}else e.addEventListener(t,n)}function Kt(e,t,n={}){const r=Object.keys(t||{}),i=Object.keys(n);let s,o;for(s=0,o=i.length;s<o;s++){const c=i[s];!c||c==="undefined"||t[c]||(Fe(e,c,!1),delete n[c])}for(s=0,o=r.length;s<o;s++){const c=r[s],f=!!t[c];!c||c==="undefined"||n[c]===f||!f||(Fe(e,c,!0),n[c]=f)}return n}function Ut(e,t,n){if(!t)return n?ct(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),t||(t={});let i,s;for(s in n)t[s]==null&&r.removeProperty(s),delete n[s];for(s in t)i=t[s],i!==n[s]&&(r.setProperty(s,i),n[s]=i);return n}function Vt(e,t={},n,r){const i={};return r||z(()=>i.children=V(e,t.children,i.children)),z(()=>t.ref&&t.ref(e)),z(()=>Xt(e,t,n,!0,i,!0)),i}function Le(e,t,n){return H(()=>e(t,n))}function re(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return V(e,t,r,n);z(i=>V(e,t(),i,n),r)}function Xt(e,t,n,r,i={},s=!1){t||(t={});for(const o in i)if(!(o in t)){if(o==="children")continue;i[o]=_e(e,o,null,i[o],n,s)}for(const o in t){if(o==="children"){r||V(e,t.children);continue}const c=t[o];i[o]=_e(e,o,c,i[o],n,s)}}function Ht(e){let t,n;return!C.context||!(t=C.registry.get(n=Jt()))?e.cloneNode(!0):(C.completed&&C.completed.add(t),C.registry.delete(n),t)}function Yt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Fe(e,t,n){const r=t.trim().split(/\s+/);for(let i=0,s=r.length;i<s;i++)e.classList.toggle(r[i],n)}function _e(e,t,n,r,i,s){let o,c,f;if(t==="style")return Ut(e,n,r);if(t==="classList")return Kt(e,n,r);if(n===r)return r;if(t==="ref")s||n(e);else if(t.slice(0,3)==="on:"){const a=t.slice(3);r&&e.removeEventListener(a,r),n&&e.addEventListener(a,n)}else if(t.slice(0,10)==="oncapture:"){const a=t.slice(10);r&&e.removeEventListener(a,r,!0),n&&e.addEventListener(a,n,!0)}else if(t.slice(0,2)==="on"){const a=t.slice(2).toLowerCase(),u=It.has(a);if(!u&&r){const l=Array.isArray(r)?r[0]:r;e.removeEventListener(a,l)}(u||n)&&(Wt(e,a,n,u),u&&Ft([a]))}else if((f=Rt.has(t))||!i&&(Be[t]||(c=Lt.has(t)))||(o=e.nodeName.includes("-")))t==="class"||t==="className"?U(e,n):o&&!c&&!f?e[Yt(t)]=n:e[Be[t]||t]=n;else{const a=i&&t.indexOf(":")>-1&&zt[t.split(":")[0]];a?_t(e,a,t,n):ct(e,Mt[t]||t,n)}return n}function qt(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),C.registry&&!C.done&&(C.done=!0,document.querySelectorAll("[id^=pl-]").forEach(r=>{for(;r&&r.nodeType!==8&&r.nodeValue!=="pl-"+e;){let i=r.nextSibling;r.remove(),r=i}r&&r.remove()}));n;){const r=n[t];if(r&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?r.call(n,i,e):r.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function V(e,t,n,r,i){for(C.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const s=typeof t,o=r!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,s==="string"||s==="number"){if(C.context)return n;if(s==="number"&&(t=t.toString()),o){let c=n[0];c&&c.nodeType===3?c.data=t:c=document.createTextNode(t),n=W(e,n,r,c)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||s==="boolean"){if(C.context)return n;n=W(e,n,r)}else{if(s==="function")return z(()=>{let c=t();for(;typeof c=="function";)c=c();n=V(e,c,n,r)}),()=>n;if(Array.isArray(t)){const c=[],f=n&&Array.isArray(n);if(ke(c,t,n,i))return z(()=>n=V(e,c,n,r,!0)),()=>n;if(C.context){if(!c.length)return n;for(let a=0;a<c.length;a++)if(c[a].parentNode)return n=c}if(c.length===0){if(n=W(e,n,r),o)return n}else f?n.length===0?We(e,c,r):Bt(e,n,c):(n&&W(e),We(e,c));n=c}else if(t instanceof Node){if(C.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=W(e,n,r,t);W(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function ke(e,t,n,r){let i=!1;for(let s=0,o=t.length;s<o;s++){let c=t[s],f=n&&n[s];if(c instanceof Node)e.push(c);else if(!(c==null||c===!0||c===!1))if(Array.isArray(c))i=ke(e,c,f)||i;else if(typeof c=="function")if(r){for(;typeof c=="function";)c=c();i=ke(e,Array.isArray(c)?c:[c],Array.isArray(f)?f:[f])||i}else e.push(c),i=!0;else{const a=String(c);f&&f.nodeType===3&&f.data===a?e.push(f):e.push(document.createTextNode(a))}}return i}function We(e,t,n=null){for(let r=0,i=t.length;r<i;r++)e.insertBefore(t[r],n)}function W(e,t,n,r){if(n===void 0)return e.textContent="";const i=r||document.createTextNode("");if(t.length){let s=!1;for(let o=t.length-1;o>=0;o--){const c=t[o];if(i!==c){const f=c.parentNode===e;!s&&!o?f?e.replaceChild(i,c):e.insertBefore(i,n):f&&c.remove()}else s=!0}}else e.insertBefore(i,n);return[i]}function Jt(){const e=C.context;return`${e.id}${e.count++}`}const Qt="http://www.w3.org/2000/svg";function Zt(e,t=!1){return t?document.createElementNS(Qt,e):document.createElement(e)}function en(e){const[t,n]=Dt(e,["component"]),r=J(()=>t.component);return J(()=>{const i=r();switch(typeof i){case"function":return H(()=>i(n));case"string":const s=jt.has(i),o=C.context?Ht():Zt(i,s);return Vt(o,n,s),o}})}function tn(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function nn(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var rn=function(){function e(n){var r=this;this._insertTag=function(i){var s;r.tags.length===0?r.insertionPoint?s=r.insertionPoint.nextSibling:r.prepend?s=r.container.firstChild:s=r.before:s=r.tags[r.tags.length-1].nextSibling,r.container.insertBefore(i,s),r.tags.push(i)},this.isSpeedy=n.speedy===void 0?!0:n.speedy,this.tags=[],this.ctr=0,this.nonce=n.nonce,this.key=n.key,this.container=n.container,this.prepend=n.prepend,this.insertionPoint=n.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(r){r.forEach(this._insertTag)},t.insert=function(r){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(nn(this));var i=this.tags[this.tags.length-1];if(this.isSpeedy){var s=tn(i);try{s.insertRule(r,s.cssRules.length)}catch{}}else i.appendChild(document.createTextNode(r));this.ctr++},t.flush=function(){this.tags.forEach(function(r){return r.parentNode&&r.parentNode.removeChild(r)}),this.tags=[],this.ctr=0},e}(),v="-ms-",ye="-moz-",g="-webkit-",at="comm",Re="rule",Me="decl",sn="@import",ft="@keyframes",on=Math.abs,pe=String.fromCharCode,cn=Object.assign;function an(e,t){return A(e,0)^45?(((t<<2^A(e,0))<<2^A(e,1))<<2^A(e,2))<<2^A(e,3):0}function lt(e){return e.trim()}function fn(e,t){return(e=t.exec(e))?e[0]:e}function m(e,t,n){return e.replace(t,n)}function Oe(e,t){return e.indexOf(t)}function A(e,t){return e.charCodeAt(t)|0}function Q(e,t,n){return e.slice(t,n)}function L(e){return e.length}function Ie(e){return e.length}function ce(e,t){return t.push(e),e}function ln(e,t){return e.map(t).join("")}var xe=1,X=1,ut=0,P=0,x=0,Y="";function Se(e,t,n,r,i,s,o){return{value:e,root:t,parent:n,type:r,props:i,children:s,line:xe,column:X,length:o,return:""}}function q(e,t){return cn(Se("",null,null,"",null,null,0),e,{length:-e.length},t)}function un(){return x}function dn(){return x=P>0?A(Y,--P):0,X--,x===10&&(X=1,xe--),x}function D(){return x=P<ut?A(Y,P++):0,X++,x===10&&(X=1,xe++),x}function M(){return A(Y,P)}function ae(){return P}function ie(e,t){return Q(Y,e,t)}function Z(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function dt(e){return xe=X=1,ut=L(Y=e),P=0,[]}function ht(e){return Y="",e}function fe(e){return lt(ie(P-1,Pe(e===91?e+2:e===40?e+1:e)))}function hn(e){for(;(x=M())&&x<33;)D();return Z(e)>2||Z(x)>3?"":" "}function gn(e,t){for(;--t&&D()&&!(x<48||x>102||x>57&&x<65||x>70&&x<97););return ie(e,ae()+(t<6&&M()==32&&D()==32))}function Pe(e){for(;D();)switch(x){case e:return P;case 34:case 39:e!==34&&e!==39&&Pe(x);break;case 40:e===41&&Pe(e);break;case 92:D();break}return P}function mn(e,t){for(;D()&&e+x!==47+10;)if(e+x===42+42&&M()===47)break;return"/*"+ie(t,P-1)+"*"+pe(e===47?e:D())}function yn(e){for(;!Z(M());)D();return ie(e,P)}function bn(e){return ht(le("",null,null,null,[""],e=dt(e),0,[0],e))}function le(e,t,n,r,i,s,o,c,f){for(var a=0,u=0,l=o,d=0,h=0,b=0,y=1,O=1,S=1,E=0,N="",se=i,G=s,T=r,w=N;O;)switch(b=E,E=D()){case 40:if(b!=108&&A(w,l-1)==58){Oe(w+=m(fe(E),"&","&\f"),"&\f")!=-1&&(S=-1);break}case 34:case 39:case 91:w+=fe(E);break;case 9:case 10:case 13:case 32:w+=hn(b);break;case 92:w+=gn(ae()-1,7);continue;case 47:switch(M()){case 42:case 47:ce(wn(mn(D(),ae()),t,n),f);break;default:w+="/"}break;case 123*y:c[a++]=L(w)*S;case 125*y:case 59:case 0:switch(E){case 0:case 125:O=0;case 59+u:h>0&&L(w)-l&&ce(h>32?Ue(w+";",r,n,l-1):Ue(m(w," ","")+";",r,n,l-2),f);break;case 59:w+=";";default:if(ce(T=Ke(w,t,n,a,u,i,c,N,se=[],G=[],l),s),E===123)if(u===0)le(w,t,T,T,se,s,l,c,G);else switch(d===99&&A(w,3)===110?100:d){case 100:case 109:case 115:le(e,T,T,r&&ce(Ke(e,T,T,0,0,i,c,N,i,se=[],l),G),i,G,l,c,r?se:G);break;default:le(w,T,T,T,[""],G,0,c,G)}}a=u=h=0,y=S=1,N=w="",l=o;break;case 58:l=1+L(w),h=b;default:if(y<1){if(E==123)--y;else if(E==125&&y++==0&&dn()==125)continue}switch(w+=pe(E),E*y){case 38:S=u>0?1:(w+="\f",-1);break;case 44:c[a++]=(L(w)-1)*S,S=1;break;case 64:M()===45&&(w+=fe(D())),d=M(),u=l=L(N=w+=yn(ae())),E++;break;case 45:b===45&&L(w)==2&&(y=0)}}return s}function Ke(e,t,n,r,i,s,o,c,f,a,u){for(var l=i-1,d=i===0?s:[""],h=Ie(d),b=0,y=0,O=0;b<r;++b)for(var S=0,E=Q(e,l+1,l=on(y=o[b])),N=e;S<h;++S)(N=lt(y>0?d[S]+" "+E:m(E,/&\f/g,d[S])))&&(f[O++]=N);return Se(e,t,n,i===0?Re:c,f,a,u)}function wn(e,t,n){return Se(e,t,n,at,pe(un()),Q(e,2,-2),0)}function Ue(e,t,n,r){return Se(e,t,n,Me,Q(e,0,r),Q(e,r+1,-1),r)}function K(e,t){for(var n="",r=Ie(e),i=0;i<r;i++)n+=t(e[i],i,e,t)||"";return n}function pn(e,t,n,r){switch(e.type){case sn:case Me:return e.return=e.return||e.value;case at:return"";case ft:return e.return=e.value+"{"+K(e.children,r)+"}";case Re:e.value=e.props.join(",")}return L(n=K(e.children,r))?e.return=e.value+"{"+n+"}":""}function xn(e){var t=Ie(e);return function(n,r,i,s){for(var o="",c=0;c<t;c++)o+=e[c](n,r,i,s)||"";return o}}function Sn(e){return function(t){t.root||(t=t.return)&&e(t)}}function An(e){var t=Object.create(null);return function(n){return t[n]===void 0&&(t[n]=e(n)),t[n]}}var Cn=function(t,n,r){for(var i=0,s=0;i=s,s=M(),i===38&&s===12&&(n[r]=1),!Z(s);)D();return ie(t,P)},En=function(t,n){var r=-1,i=44;do switch(Z(i)){case 0:i===38&&M()===12&&(n[r]=1),t[r]+=Cn(P-1,n,r);break;case 2:t[r]+=fe(i);break;case 4:if(i===44){t[++r]=M()===58?"&\f":"",n[r]=t[r].length;break}default:t[r]+=pe(i)}while(i=D());return t},vn=function(t,n){return ht(En(dt(t),n))},Ve=new WeakMap,$n=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var n=t.value,r=t.parent,i=t.column===r.column&&t.line===r.line;r.type!=="rule";)if(r=r.parent,!r)return;if(!(t.props.length===1&&n.charCodeAt(0)!==58&&!Ve.get(r))&&!i){Ve.set(t,!0);for(var s=[],o=vn(n,s),c=r.props,f=0,a=0;f<o.length;f++)for(var u=0;u<c.length;u++,a++)t.props[a]=s[f]?o[f].replace(/&\f/g,c[u]):c[u]+" "+o[f]}}},kn=function(t){if(t.type==="decl"){var n=t.value;n.charCodeAt(0)===108&&n.charCodeAt(2)===98&&(t.return="",t.value="")}};function gt(e,t){switch(an(e,t)){case 5103:return g+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return g+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return g+e+ye+e+v+e+e;case 6828:case 4268:return g+e+v+e+e;case 6165:return g+e+v+"flex-"+e+e;case 5187:return g+e+m(e,/(\w+).+(:[^]+)/,g+"box-$1$2"+v+"flex-$1$2")+e;case 5443:return g+e+v+"flex-item-"+m(e,/flex-|-self/,"")+e;case 4675:return g+e+v+"flex-line-pack"+m(e,/align-content|flex-|-self/,"")+e;case 5548:return g+e+v+m(e,"shrink","negative")+e;case 5292:return g+e+v+m(e,"basis","preferred-size")+e;case 6060:return g+"box-"+m(e,"-grow","")+g+e+v+m(e,"grow","positive")+e;case 4554:return g+m(e,/([^-])(transform)/g,"$1"+g+"$2")+e;case 6187:return m(m(m(e,/(zoom-|grab)/,g+"$1"),/(image-set)/,g+"$1"),e,"")+e;case 5495:case 3959:return m(e,/(image-set\([^]*)/,g+"$1$`$1");case 4968:return m(m(e,/(.+:)(flex-)?(.*)/,g+"box-pack:$3"+v+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+g+e+e;case 4095:case 3583:case 4068:case 2532:return m(e,/(.+)-inline(.+)/,g+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(L(e)-1-t>6)switch(A(e,t+1)){case 109:if(A(e,t+4)!==45)break;case 102:return m(e,/(.+:)(.+)-([^]+)/,"$1"+g+"$2-$3$1"+ye+(A(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Oe(e,"stretch")?gt(m(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(A(e,t+1)!==115)break;case 6444:switch(A(e,L(e)-3-(~Oe(e,"!important")&&10))){case 107:return m(e,":",":"+g)+e;case 101:return m(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+g+(A(e,14)===45?"inline-":"")+"box$3$1"+g+"$2$3$1"+v+"$2box$3")+e}break;case 5936:switch(A(e,t+11)){case 114:return g+e+v+m(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return g+e+v+m(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return g+e+v+m(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return g+e+v+e+e}return e}var On=function(t,n,r,i){if(t.length>-1&&!t.return)switch(t.type){case Me:t.return=gt(t.value,t.length);break;case ft:return K([q(t,{value:m(t.value,"@","@"+g)})],i);case Re:if(t.length)return ln(t.props,function(s){switch(fn(s,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return K([q(t,{props:[m(s,/:(read-\w+)/,":"+ye+"$1")]})],i);case"::placeholder":return K([q(t,{props:[m(s,/:(plac\w+)/,":"+g+"input-$1")]}),q(t,{props:[m(s,/:(plac\w+)/,":"+ye+"$1")]}),q(t,{props:[m(s,/:(plac\w+)/,v+"input-$1")]})],i)}return""})}},Pn=[On],Dn=function(t){var n=t.key;if(n==="css"){var r=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(r,function(y){var O=y.getAttribute("data-emotion");O.indexOf(" ")!==-1&&(document.head.appendChild(y),y.setAttribute("data-s",""))})}var i=t.stylisPlugins||Pn,s={},o,c=[];o=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+n+' "]'),function(y){for(var O=y.getAttribute("data-emotion").split(" "),S=1;S<O.length;S++)s[O[S]]=!0;c.push(y)});var f,a=[$n,kn];{var u,l=[pn,Sn(function(y){u.insert(y)})],d=xn(a.concat(i,l)),h=function(O){return K(bn(O),d)};f=function(O,S,E,N){u=E,h(O?O+"{"+S.styles+"}":S.styles),N&&(b.inserted[S.name]=!0)}}var b={key:n,sheet:new rn({key:n,container:o,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:f};return b.sheet.hydrate(c),b};function Nn(e){for(var t=0,n,r=0,i=e.length;i>=4;++r,i-=4)n=e.charCodeAt(r)&255|(e.charCodeAt(++r)&255)<<8|(e.charCodeAt(++r)&255)<<16|(e.charCodeAt(++r)&255)<<24,n=(n&65535)*1540483477+((n>>>16)*59797<<16),n^=n>>>24,t=(n&65535)*1540483477+((n>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(i){case 3:t^=(e.charCodeAt(r+2)&255)<<16;case 2:t^=(e.charCodeAt(r+1)&255)<<8;case 1:t^=e.charCodeAt(r)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var Tn={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Ln=/[A-Z]|^ms/g,Rn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,mt=function(t){return t.charCodeAt(1)===45},Xe=function(t){return t!=null&&typeof t!="boolean"},Ce=An(function(e){return mt(e)?e:e.replace(Ln,"-$&").toLowerCase()}),He=function(t,n){switch(t){case"animation":case"animationName":if(typeof n=="string")return n.replace(Rn,function(r,i,s){return R={name:i,styles:s,next:R},i})}return Tn[t]!==1&&!mt(t)&&typeof n=="number"&&n!==0?n+"px":n};function ee(e,t,n){if(n==null)return"";if(n.__emotion_styles!==void 0)return n;switch(typeof n){case"boolean":return"";case"object":{if(n.anim===1)return R={name:n.name,styles:n.styles,next:R},n.name;if(n.styles!==void 0){var r=n.next;if(r!==void 0)for(;r!==void 0;)R={name:r.name,styles:r.styles,next:R},r=r.next;var i=n.styles+";";return i}return Mn(e,t,n)}case"function":{if(e!==void 0){var s=R,o=n(e);return R=s,ee(e,t,o)}break}}if(t==null)return n;var c=t[n];return c!==void 0?c:n}function Mn(e,t,n){var r="";if(Array.isArray(n))for(var i=0;i<n.length;i++)r+=ee(e,t,n[i])+";";else for(var s in n){var o=n[s];if(typeof o!="object")t!=null&&t[o]!==void 0?r+=s+"{"+t[o]+"}":Xe(o)&&(r+=Ce(s)+":"+He(s,o)+";");else if(Array.isArray(o)&&typeof o[0]=="string"&&(t==null||t[o[0]]===void 0))for(var c=0;c<o.length;c++)Xe(o[c])&&(r+=Ce(s)+":"+He(s,o[c])+";");else{var f=ee(e,t,o);switch(s){case"animation":case"animationName":{r+=Ce(s)+":"+f+";";break}default:r+=s+"{"+f+"}"}}}return r}var Ye=/label:\s*([^\s;\n{]+)\s*(;|$)/g,R,Ee=function(t,n,r){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var i=!0,s="";R=void 0;var o=t[0];o==null||o.raw===void 0?(i=!1,s+=ee(r,n,o)):s+=o[0];for(var c=1;c<t.length;c++)s+=ee(r,n,t[c]),i&&(s+=o[c]);Ye.lastIndex=0;for(var f="",a;(a=Ye.exec(s))!==null;)f+="-"+a[1];var u=Nn(s)+f;return{name:u,styles:s,next:R}},In=!0;function yt(e,t,n){var r="";return n.split(" ").forEach(function(i){e[i]!==void 0?t.push(e[i]+";"):r+=i+" "}),r}var jn=function(t,n,r){var i=t.key+"-"+n.name;(r===!1||In===!1)&&t.registered[i]===void 0&&(t.registered[i]=n.styles)},zn=function(t,n,r){jn(t,n,r);var i=t.key+"-"+n.name;if(t.inserted[n.name]===void 0){var s=n;do t.insert(n===s?"."+i:"",s,t.sheet,!0),s=s.next;while(s!==void 0)}};function qe(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function Je(e,t,n){var r=[],i=yt(e,r,n);return r.length<2?n:i+t(r)}var Bn=function(t){var n=Dn(t);n.sheet.speedy=function(c){this.isSpeedy=c},n.compat=!0;var r=function(){for(var f=arguments.length,a=new Array(f),u=0;u<f;u++)a[u]=arguments[u];var l=Ee(a,n.registered,void 0);return zn(n,l,!1),n.key+"-"+l.name},i=function(){for(var f=arguments.length,a=new Array(f),u=0;u<f;u++)a[u]=arguments[u];var l=Ee(a,n.registered),d="animation-"+l.name;return qe(n,{name:l.name,styles:"@keyframes "+d+"{"+l.styles+"}"}),d},s=function(){for(var f=arguments.length,a=new Array(f),u=0;u<f;u++)a[u]=arguments[u];var l=Ee(a,n.registered);qe(n,l)},o=function(){for(var f=arguments.length,a=new Array(f),u=0;u<f;u++)a[u]=arguments[u];return Je(n.registered,r,Gn(a))};return{css:r,cx:o,injectGlobal:s,keyframes:i,hydrate:function(f){f.forEach(function(a){n.inserted[a]=!0})},flush:function(){n.registered={},n.inserted={},n.sheet.flush()},sheet:n.sheet,cache:n,getRegisteredStyles:yt.bind(null,n.registered),merge:Je.bind(null,n.registered,r)}},Gn=function e(t){for(var n="",r=0;r<t.length;r++){var i=t[r];if(i!=null){var s=void 0;switch(typeof i){case"boolean":break;case"object":{if(Array.isArray(i))s=e(i);else{s="";for(var o in i)i[o]&&o&&(s&&(s+=" "),s+=o)}break}default:s=i}s&&(n&&(n+=" "),n+=s)}}return n},Fn=Bn({key:"css"}),_=Fn.css;class _n{constructor(t){this.key=t}read(){const t=localStorage.getItem(this.key);return t?JSON.parse(t):null}write(t){if(!t){this.clear();return}const n=JSON.stringify(t);localStorage.setItem(this.key,n)}clear(){localStorage.removeItem(this.key)}}function Wn(e){return e!=null&&typeof e=="object"&&"content"in e&&typeof e.content=="number"}function De(e){return e&&`${e}px`}function Kn(e){return typeof e=="function"}function bt(e){let t=0,n=0,r=[0,0],i=!1;return I(en,{get component(){return e.as??"div"},get class(){return e.class},onDragStart:f,onDragEnd:c,onDrag:o,draggable:!0,get children(){return e.children}});function s(l,d){r=[l,d],console.log(r),e.onDrag(r)}function o(l){l.stopPropagation(),a(l)}function c(l){l.stopPropagation(),a(l),e.onDragEnd&&e.onDragEnd()}function f(l){l.stopPropagation(),t=l.clientX,n=l.clientY,e.onDragStart&&e.onDragStart(),e.hideDrawImage?Un(l):e.drawElement&&Vn(l,e.drawElement()),s(0,0)}function a(l){const d=l.clientX-t,h=l.clientY-n;if(!(d===r[0]&&h===r[1])){if(!i&&u(d,h)){console.log("Skip",[d,h]),i=!0;return}i=!1,s(d,h)}}function u(l,d){const h=Math.abs(l-r[0]),b=Math.abs(d-r[1]);return h>100&&b>100}}function Un(e){const t=new Image;t.src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",e.dataTransfer?.setDragImage(t,0,0),console.log("set image")}function Vn(e,t){const n=t.getBoundingClientRect(),r=e.clientX-n.x,i=e.clientY-n.y;e.dataTransfer?.setDragImage(t,r,i)}const Xn=we("<div><div>This is the content</div></div>"),Hn=_`
  flex: 1;
  display: flex;
  flex-direction: column;

  header {
    background: rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid gray;
    padding: 0.05em 0.4em;
  }
`,Yn=_`
  padding: 0.5em 1em;
`;function qn(e){let t;debugger;return(()=>{const i=Xn.cloneNode(!0),s=i.firstChild;return Le(o=>{Kn(e.ref)?e.ref(o):e.ref=o,t=o},i),U(i,Hn),re(i,I(bt,{as:"header",onDrag:n,onDragEnd:r,drawElement:()=>t,get children(){return e.content}}),s),U(s,Yn),z(()=>i.style.setProperty("flex-basis",De(e.size))),i})();function n(){console.log("Draggin panel")}function r(){console.log("Drag ended")}}const Jn=we("<div></div>"),Qn=_`
  content: '';
  display: block;
  position: absolute;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.2);
  opacity: 0;
  transition: opacity 0.1s ease, top 0.1s ease, left 0.1s ease, right 0.1s ease,
    bottom 0.1s ease;
`,Zn=_`
  flex-basis: 2px;
  background: black;
  position: relative;
  --offset-row: 0;
  --offset-column: 0;

  &.row {
    max-width: 2px;
  }

  &.column {
    max-height: 2px;
  }

  :hover,
  &.is-dragging {
    div {
      opacity: 1;
      top: var(--offset-column, 0);
      bottom: var(--offset-column, 0);
      left: var(--offset-row, 0);
      right: var(--offset-row, 0);
    }
  }

  &.is-dragging div {
    background: white;
  }
`;function er(e){const t=J(()=>_`
      :hover {
        --offset-${e.direction}: -3px;
      }
      div {
        cursor: ${e.direction==="row"?"col-resize":"row-resize"};
      }
    `);let n;return(()=>{const r=Jn.cloneNode(!0),i=n;return typeof i=="function"?Le(i,r):n=r,re(r,I(bt,{class:Qn,hideDrawImage:!0,onDragStart:()=>{n.classList.add("is-dragging"),e.onResizeStart()},onDragEnd:()=>{n.classList.remove("is-dragging"),e.onResizeEnd()},onDrag:([s,o])=>{e.onResize(e.direction==="row"?s:o)}})),z(()=>U(r,`Divider ${Zn} ${e.direction} ${t()}`)),r})()}const tr=we("<div></div>"),nr=_`
  flex: 1;
  display: flex;
  justify-items: stretch;
`;function wt(e){if(Wn(e.content))return I(qn,Pt({ref(a){const u=e.ref;typeof u=="function"?u(a):e.ref=a}},()=>e.content));const t=e.direction==="row"?"column":"row",n=[],r=()=>e.content;let i=null;function s(a){const u=e.direction==="row"?"offsetWidth":"offsetHeight",l=n.map(d=>d[u]);i={a:a-1,b:a,sizes:l},e.onPanelsChange({...r(),children:l.map((d,h)=>f(h,d))})}function o(){i=null}function c(a){if(!i)throw new Error("Resize operation not started");const{a:u,b:l,sizes:d}=i,h=d[u]+a,b=d[l]-a,y=[...r().children];y[u]=f(u,h),y[l]=f(l,b),e.onPanelsChange({...r(),children:y})}function f(a,u){return n[a].style.flexBasis=De(u),{...r().children[a],size:u}}return(()=>{const a=tr.cloneNode(!0),u=e.ref;return typeof u=="function"?Le(u,a):e.ref=a,U(a,nr),re(a,I(Nt,{get each(){return e.content.children},children:(l,d)=>[d===0?null:I(er,{get direction(){return e.direction},onResizeStart:()=>s(d),onResizeEnd:o,onResize:c}),I(wt,{ref(h){const b=n[d];typeof b=="function"?b(h):n[d]=h},direction:t,get content(){return l()},onPanelsChange:h=>{const b=[...r().children];b[d]=h,e.onPanelsChange({...r(),children:b})}})]})),z(l=>{const d=e.direction,h=De(e.content.size);return d!==l._v$&&a.style.setProperty("flex-direction",l._v$=d),h!==l._v$2&&a.style.setProperty("flex-basis",l._v$2=h),l},{_v$:void 0,_v$2:void 0}),a})()}const rr=we("<div></div>"),Qe=new _n("panel-distribution"),ir=[{content:1},{children:[{content:2},{content:3},{content:4}]}],sr=_`
  height: 100svh;
  width: 100%;

  > :only-child {
    height: 100%;
  }
`;function or(){const e="row",[t,n]=tt(Qe.read());return At(()=>Qe.write(t())),(()=>{const r=rr.cloneNode(!0);return U(r,sr),re(r,I(wt,{direction:e,get content(){return{children:t()??ir}},onPanelsChange:i=>n(i.children)})),r})()}Gt(()=>I(or,{}),document.getElementById("root"));