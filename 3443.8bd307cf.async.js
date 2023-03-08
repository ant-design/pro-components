(self.webpackChunkpro_components=self.webpackChunkpro_components||[]).push([[3443],{76146:function(W,N,m){"use strict";var j=m(60419),I=m(50959),g=m(17674);function S(a,e){return O(a)||A(a,e)||h(a,e)||P()}function P(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function h(a,e){if(a){if(typeof a=="string")return p(a,e);var t=Object.prototype.toString.call(a).slice(8,-1);if(t==="Object"&&a.constructor&&(t=a.constructor.name),t==="Map"||t==="Set")return Array.from(a);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return p(a,e)}}function p(a,e){(e==null||e>a.length)&&(e=a.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=a[t];return n}function A(a,e){var t=a==null?null:typeof Symbol!="undefined"&&a[Symbol.iterator]||a["@@iterator"];if(t!=null){var n=[],i=!0,o=!1,u,d;try{for(t=t.call(a);!(i=(u=t.next()).done)&&(n.push(u.value),!(e&&n.length===e));i=!0);}catch(s){o=!0,d=s}finally{try{!i&&t.return!=null&&t.return()}finally{if(o)throw d}}return n}}function O(a){if(Array.isArray(a))return a}var M={toString:function(e){return typeof e.type=="string"&&e.type in this?"enum"in e?this.enum(e):this[e.type](e):e.type?this.getValidClassName(e)||e.type:"const"in e?e.const:"oneOf"in e?this.oneOf(e):"unknown"},string:function(e){return e.type},number:function(e){return e.type},boolean:function(e){return e.type},any:function(e){return e.type},object:function(e){var t=this,n=[];return Object.entries(e.properties||{}).forEach(function(i){var o,u=S(i,2),d=u[0],s=u[1];n.push("".concat(d).concat((o=e.required)!==null&&o!==void 0&&o.includes(d)?"":"?",": ").concat(s.type==="object"?"object":t.toString(s)))}),n.length?"{ ".concat(n.join("; ")," }"):"{}"},array:function(e){if(e.items){var t=this.getValidClassName(e.items);return t?"".concat(t,"[]"):"".concat(this.toString(e.items),"[]")}return"any[]"},element:function(e){return"<".concat(e.componentName," />")},function:function(e){var t=this,n=e.signature;return"".concat(n.isAsync?"async ":"","(").concat(n.arguments.map(function(i){return"".concat(i.key,": ").concat(t.toString(i))}).join(", "),") => ").concat(this.toString(n.returnType))},dom:function(e){return e.className||"DOM"},enum:function(e){return e.enum.map(function(t){return JSON.stringify(t)}).join(" | ")},oneOf:function(e){var t=this;return e.oneOf.map(function(n){return t.getValidClassName(n)||t.toString(n)}).join(" | ")},getValidClassName:function(e){return"className"in e&&typeof e.className=="string"&&e.className!=="__type"?e.className:null}},C=function(e){var t=useState(function(){return M.toString(e)}),n=S(t,2),i=n[0],o=n[1];return useEffect(function(){o(M.toString(e))},[e]),React.createElement("code",null,i)},k=function(e){var t,n=useRouteMeta(),i=n.frontmatter,o=useAtomAssets(),u=o.components,d=e.id||i.atomId,s=useIntl();if(!d)throw new Error("`id` properties if required for API component!");var r=u==null?void 0:u[d];return React.createElement("div",{className:"markdown"},React.createElement(Table,null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,s.formatMessage({id:"api.component.name"})),React.createElement("th",null,s.formatMessage({id:"api.component.description"})),React.createElement("th",null,s.formatMessage({id:"api.component.type"})),React.createElement("th",null,s.formatMessage({id:"api.component.default"})))),React.createElement("tbody",null,r&&(t=r.propsConfig)!==null&&t!==void 0&&t.properties?Object.entries(r.propsConfig.properties).map(function(c){var l,y=S(c,2),v=y[0],_=y[1];return React.createElement("tr",{key:v},React.createElement("td",null,v),React.createElement("td",null,_.description||"--"),React.createElement("td",null,React.createElement(C,_)),React.createElement("td",null,React.createElement("code",null,(l=r.propsConfig.required)!==null&&l!==void 0&&l.includes(v)?s.formatMessage({id:"api.component.required"}):JSON.stringify(_.default)||"--")))}):React.createElement("tr",null,React.createElement("td",{colSpan:4},s.formatMessage({id:"api.component.".concat(u?"not.found":"unavailable")},{id:d}))))))},w=null},56904:function(W,N,m){"use strict";var j=m(50959),I=m(87929);function g(){return g=Object.assign?Object.assign.bind():function(h){for(var p=1;p<arguments.length;p++){var A=arguments[p];for(var O in A)Object.prototype.hasOwnProperty.call(A,O)&&(h[O]=A[O])}return h},g.apply(this,arguments)}var S=function(p){return React.createElement("span",g({className:"dumi-default-badge"},p))},P=null},17674:function(W,N,m){"use strict";var j=m(30826),I=m.n(j),g=m(50959),S=m(2399),P=["children"];function h(e,t){return C(e)||M(e,t)||A(e,t)||p()}function p(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function A(e,t){if(e){if(typeof e=="string")return O(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return O(e,t)}}function O(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function M(e,t){var n=e==null?null:typeof Symbol!="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var i=[],o=!0,u=!1,d,s;try{for(n=n.call(e);!(o=(d=n.next()).done)&&(i.push(d.value),!(t&&i.length===t));o=!0);}catch(r){u=!0,s=r}finally{try{!o&&n.return!=null&&n.return()}finally{if(u)throw s}}return i}}function C(e){if(Array.isArray(e))return e}function k(e,t){if(e==null)return{};var n=w(e,t),i,o;if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(o=0;o<u.length;o++)i=u[o],!(t.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}function w(e,t){if(e==null)return{};var n={},i=Object.keys(e),o,u;for(u=0;u<i.length;u++)o=i[u],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}var a=function(t){var n=t.children,i=k(t,P),o=(0,g.useRef)(null),u=(0,g.useState)(!1),d=h(u,2),s=d[0],r=d[1],c=(0,g.useState)(!1),l=h(c,2),y=l[0],v=l[1];return(0,g.useEffect)(function(){var _=o.current;if(_){var b=I()(function(){r(_.scrollLeft>0),v(_.scrollLeft<_.scrollWidth-_.offsetWidth)},100);return b(),_.addEventListener("scroll",b),window.addEventListener("resize",b),function(){_.removeEventListener("scroll",b),window.removeEventListener("resize",b)}}},[]),g.createElement("div",{className:"dumi-default-table"},g.createElement("div",{className:"dumi-default-table-content",ref:o,"data-left-folded":s||void 0,"data-right-folded":y||void 0},g.createElement("table",i,n)))};N.Z=a},30826:function(W,N,m){var j="Expected a function",I=NaN,g="[object Symbol]",S=/^\s+|\s+$/g,P=/^[-+]0x[0-9a-f]+$/i,h=/^0b[01]+$/i,p=/^0o[0-7]+$/i,A=parseInt,O=typeof m.g=="object"&&m.g&&m.g.Object===Object&&m.g,M=typeof self=="object"&&self&&self.Object===Object&&self,C=O||M||Function("return this")(),k=Object.prototype,w=k.toString,a=Math.max,e=Math.min,t=function(){return C.Date.now()};function n(r,c,l){var y,v,_,b,E,R,L=0,$=!1,D=!1,U=!0;if(typeof r!="function")throw new TypeError(j);c=s(c)||0,o(l)&&($=!!l.leading,D="maxWait"in l,_=D?a(s(l.maxWait)||0,c):_,U="trailing"in l?!!l.trailing:U);function K(f){var T=y,x=v;return y=v=void 0,L=f,b=r.apply(x,T),b}function z(f){return L=f,E=setTimeout(B,c),$?K(f):b}function J(f){var T=f-R,x=f-L,X=c-T;return D?e(X,_-x):X}function V(f){var T=f-R,x=f-L;return R===void 0||T>=c||T<0||D&&x>=_}function B(){var f=t();if(V(f))return H(f);E=setTimeout(B,J(f))}function H(f){return E=void 0,U&&y?K(f):(y=v=void 0,b)}function G(){E!==void 0&&clearTimeout(E),L=0,y=R=v=E=void 0}function Z(){return E===void 0?b:H(t())}function F(){var f=t(),T=V(f);if(y=arguments,v=this,R=f,T){if(E===void 0)return z(R);if(D)return E=setTimeout(B,c),K(R)}return E===void 0&&(E=setTimeout(B,c)),b}return F.cancel=G,F.flush=Z,F}function i(r,c,l){var y=!0,v=!0;if(typeof r!="function")throw new TypeError(j);return o(l)&&(y="leading"in l?!!l.leading:y,v="trailing"in l?!!l.trailing:v),n(r,c,{leading:y,maxWait:c,trailing:v})}function o(r){var c=typeof r;return!!r&&(c=="object"||c=="function")}function u(r){return!!r&&typeof r=="object"}function d(r){return typeof r=="symbol"||u(r)&&w.call(r)==g}function s(r){if(typeof r=="number")return r;if(d(r))return I;if(o(r)){var c=typeof r.valueOf=="function"?r.valueOf():r;r=o(c)?c+"":c}if(typeof r!="string")return r===0?r:+r;r=r.replace(S,"");var l=h.test(r);return l||p.test(r)?A(r.slice(2),l?2:8):P.test(r)?I:+r}W.exports=i}}]);