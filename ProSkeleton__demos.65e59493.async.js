(self.webpackChunkpro_components=self.webpackChunkpro_components||[]).push([[4673],{42227:function(E,u,t){"use strict";t.r(u);var v=t(68445),c=t(11527);u.default=function(){return(0,c.jsx)("div",{style:{background:"#fafafa",padding:24},children:(0,c.jsx)(v.ZP,{type:"descriptions"})})}},28737:function(E,u,t){"use strict";t.r(u);var v=t(68445),c=t(11527);u.default=function(){return(0,c.jsx)("div",{style:{background:"#fafafa",padding:24},children:(0,c.jsx)(v.ZP,{statistic:2,type:"list"})})}},52412:function(E,u,t){"use strict";t.r(u);var v=t(68445),c=t(11527);u.default=function(){return(0,c.jsx)("div",{style:{background:"#fafafa",padding:24},children:(0,c.jsx)(v.ZP,{type:"list"})})}},65941:function(E,u,t){"use strict";t.r(u);var v=t(68445),c=t(11527);u.default=function(){return(0,c.jsx)("div",{style:{background:"#fafafa",padding:24},children:(0,c.jsx)(v.ZP,{type:"result"})})}},68445:function(E,u,t){"use strict";t.d(u,{Yk:function(){return W},dX:function(){return M},cg:function(){return f},nq:function(){return y},TL:function(){return K},SM:function(){return x},uk:function(){return T},DJ:function(){return g},hM:function(){return R},ZP:function(){return F}});var v=t(57213),c=t.n(v),m=t(12342),d=t.n(m),P=t(50959),a=t(97728),p=t(6074),o=t(86713),B=t(48152),I=t(97143),e=t(11527),S=function(r){var n=r.padding;return(0,e.jsx)("div",{style:{padding:n||"0 24px"},children:(0,e.jsx)(B.Z,{style:{margin:0}})})},s={xs:2,sm:2,md:4,lg:4,xl:6,xxl:6},i=function(r){var n=r.size,l=r.active,h=(0,P.useMemo)(function(){return{lg:!0,md:!0,sm:!1,xl:!1,xs:!1,xxl:!1}},[]),O=p.ZP.useBreakpoint()||h,w=Object.keys(O).filter(function(Z){return O[Z]===!0})[0]||"md",z=n===void 0?s[w]||6:n,A=function(D){return D===0?0:z>2?42:16};return(0,e.jsx)(o.Z,{bordered:!1,style:{marginBlockEnd:16},children:(0,e.jsx)("div",{style:{width:"100%",justifyContent:"space-between",display:"flex"},children:new Array(z).fill(null).map(function(Z,D){return(0,e.jsxs)("div",{style:{borderInlineStart:z>2&&D===1?"1px solid rgba(0,0,0,0.06)":void 0,paddingInlineStart:A(D),flex:1,marginInlineEnd:D===0?16:0},children:[(0,e.jsx)(a.Z,{active:l,paragraph:!1,title:{width:100,style:{marginBlockStart:0}}}),(0,e.jsx)(a.Z.Button,{active:l,style:{height:48}})]},D)})})})},y=function(r){var n=r.active;return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(o.Z,{bordered:!1,style:{borderRadius:0},bodyStyle:{padding:24},children:(0,e.jsxs)("div",{style:{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,e.jsx)("div",{style:{maxWidth:"100%",flex:1},children:(0,e.jsx)(a.Z,{active:n,title:{width:100,style:{marginBlockStart:0}},paragraph:{rows:1,style:{margin:0}}})}),(0,e.jsx)(a.Z.Button,{active:n,size:"small",style:{width:165,marginBlockStart:12}})]})}),(0,e.jsx)(S,{})]})},f=function(r){var n=r.size,l=r.active,h=l===void 0?!0:l,O=r.actionButton;return(0,e.jsxs)(o.Z,{bordered:!1,bodyStyle:{padding:0},children:[new Array(n).fill(null).map(function(w,z){return(0,e.jsx)(y,{active:!!h},z)}),O!==!1&&(0,e.jsx)(o.Z,{bordered:!1,style:{borderStartEndRadius:0,borderTopLeftRadius:0},bodyStyle:{display:"flex",alignItems:"center",justifyContent:"center"},children:(0,e.jsx)(a.Z.Button,{style:{width:102},active:h,size:"small"})})]})},x=function(r){var n=r.active;return(0,e.jsxs)("div",{style:{marginBlockEnd:16},children:[(0,e.jsx)(a.Z,{paragraph:!1,title:{width:185}}),(0,e.jsx)(a.Z.Button,{active:n,size:"small"})]})},K=function(r){var n=r.active;return(0,e.jsx)(o.Z,{bordered:!1,style:{borderBottomRightRadius:0,borderBottomLeftRadius:0},bodyStyle:{paddingBlockEnd:8},children:(0,e.jsxs)(I.Z,{style:{width:"100%",justifyContent:"space-between"},children:[(0,e.jsx)(a.Z.Button,{active:n,style:{width:200},size:"small"}),(0,e.jsxs)(I.Z,{children:[(0,e.jsx)(a.Z.Button,{active:n,size:"small",style:{width:120}}),(0,e.jsx)(a.Z.Button,{active:n,size:"small",style:{width:80}})]})]})})},j=function(r){var n=r.active,l=n===void 0?!0:n,h=r.statistic,O=r.actionButton,w=r.toolbar,z=r.pageHeader,A=r.list,Z=A===void 0?5:A;return(0,e.jsxs)("div",{style:{width:"100%"},children:[z!==!1&&(0,e.jsx)(x,{active:l}),h!==!1&&(0,e.jsx)(i,{size:h,active:l}),(w!==!1||Z!==!1)&&(0,e.jsxs)(o.Z,{bordered:!1,bodyStyle:{padding:0},children:[w!==!1&&(0,e.jsx)(K,{active:l}),Z!==!1&&(0,e.jsx)(f,{size:Z,active:l,actionButton:O})]})]})},M=j,L={xs:1,sm:2,md:3,lg:3,xl:3,xxl:4},b=function(r){var n=r.active;return(0,e.jsxs)("div",{style:{marginBlockStart:32},children:[(0,e.jsx)(a.Z.Button,{active:n,size:"small",style:{width:100,marginBlockEnd:16}}),(0,e.jsxs)("div",{style:{width:"100%",justifyContent:"space-between",display:"flex"},children:[(0,e.jsxs)("div",{style:{flex:1,marginInlineEnd:24,maxWidth:300},children:[(0,e.jsx)(a.Z,{active:n,paragraph:!1,title:{style:{marginBlockStart:0}}}),(0,e.jsx)(a.Z,{active:n,paragraph:!1,title:{style:{marginBlockStart:8}}}),(0,e.jsx)(a.Z,{active:n,paragraph:!1,title:{style:{marginBlockStart:8}}})]}),(0,e.jsx)("div",{style:{flex:1,alignItems:"center",justifyContent:"center"},children:(0,e.jsxs)("div",{style:{maxWidth:300,margin:"auto"},children:[(0,e.jsx)(a.Z,{active:n,paragraph:!1,title:{style:{marginBlockStart:0}}}),(0,e.jsx)(a.Z,{active:n,paragraph:!1,title:{style:{marginBlockStart:8}}})]})})]})]})},k=function(r){var n=r.size,l=r.active,h=(0,P.useMemo)(function(){return{lg:!0,md:!0,sm:!1,xl:!1,xs:!1,xxl:!1}},[]),O=p.ZP.useBreakpoint()||h,w=Object.keys(O).filter(function(A){return O[A]===!0})[0]||"md",z=n===void 0?L[w]||3:n;return(0,e.jsx)("div",{style:{width:"100%",justifyContent:"space-between",display:"flex"},children:new Array(z).fill(null).map(function(A,Z){return(0,e.jsxs)("div",{style:{flex:1,paddingInlineStart:Z===0?0:24,paddingInlineEnd:Z===z-1?0:24},children:[(0,e.jsx)(a.Z,{active:l,paragraph:!1,title:{style:{marginBlockStart:0}}}),(0,e.jsx)(a.Z,{active:l,paragraph:!1,title:{style:{marginBlockStart:8}}}),(0,e.jsx)(a.Z,{active:l,paragraph:!1,title:{style:{marginBlockStart:8}}})]},Z)})})},g=function(r){var n=r.active,l=r.header,h=l===void 0?!1:l,O=(0,P.useMemo)(function(){return{lg:!0,md:!0,sm:!1,xl:!1,xs:!1,xxl:!1}},[]),w=p.ZP.useBreakpoint()||O,z=Object.keys(w).filter(function(Z){return w[Z]===!0})[0]||"md",A=L[z]||3;return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)("div",{style:{display:"flex",background:h?"rgba(0,0,0,0.02)":"none",padding:"24px 8px"},children:[new Array(A).fill(null).map(function(Z,D){return(0,e.jsx)("div",{style:{flex:1,paddingInlineStart:h&&D===0?0:20,paddingInlineEnd:32},children:(0,e.jsx)(a.Z,{active:n,paragraph:!1,title:{style:{margin:0,height:24,width:h?"75px":"100%"}}})},D)}),(0,e.jsx)("div",{style:{flex:3,paddingInlineStart:32},children:(0,e.jsx)(a.Z,{active:n,paragraph:!1,title:{style:{margin:0,height:24,width:h?"75px":"100%"}}})})]}),(0,e.jsx)(S,{padding:"0px 0px"})]})},R=function(r){var n=r.active,l=r.size,h=l===void 0?4:l;return(0,e.jsxs)(o.Z,{bordered:!1,children:[(0,e.jsx)(a.Z.Button,{active:n,size:"small",style:{width:100,marginBlockEnd:16}}),(0,e.jsx)(g,{header:!0,active:n}),new Array(h).fill(null).map(function(O,w){return(0,e.jsx)(g,{active:n},w)}),(0,e.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",paddingBlockStart:16},children:(0,e.jsx)(a.Z,{active:n,paragraph:!1,title:{style:{margin:0,height:32,float:"right",maxWidth:"630px"}}})})]})},W=function(r){var n=r.active;return(0,e.jsxs)(o.Z,{bordered:!1,style:{borderStartEndRadius:0,borderTopLeftRadius:0},children:[(0,e.jsx)(a.Z.Button,{active:n,size:"small",style:{width:100,marginBlockEnd:16}}),(0,e.jsx)(k,{active:n}),(0,e.jsx)(b,{active:n})]})},_=function(r){var n=r.active,l=n===void 0?!0:n,h=r.pageHeader,O=r.list;return(0,e.jsxs)("div",{style:{width:"100%"},children:[h!==!1&&(0,e.jsx)(x,{active:l}),(0,e.jsx)(W,{active:l}),O!==!1&&(0,e.jsx)(S,{}),O!==!1&&(0,e.jsx)(R,{active:l,size:O})]})},C=_,H=function(r){var n=r.active,l=n===void 0?!0:n,h=r.pageHeader;return(0,e.jsxs)("div",{style:{width:"100%"},children:[h!==!1&&(0,e.jsx)(x,{active:l}),(0,e.jsx)(o.Z,{children:(0,e.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:128},children:[(0,e.jsx)(a.Z.Avatar,{size:64,style:{marginBlockEnd:32}}),(0,e.jsx)(a.Z.Button,{active:l,style:{width:214,marginBlockEnd:8}}),(0,e.jsx)(a.Z.Button,{active:l,style:{width:328},size:"small"}),(0,e.jsxs)(I.Z,{style:{marginBlockStart:24},children:[(0,e.jsx)(a.Z.Button,{active:l,style:{width:116}}),(0,e.jsx)(a.Z.Button,{active:l,style:{width:116}})]})]})})]})},U=H,N=["type"],T=function(r){var n=r.type,l=n===void 0?"list":n,h=d()(r,N);return l==="result"?(0,e.jsx)(U,c()({},h)):l==="descriptions"?(0,e.jsx)(C,c()({},h)):(0,e.jsx)(M,c()({},h))},F=T},44594:function(E,u,t){"use strict";var v=t(50959),c=t(9262);u.Z=()=>{const[m,d]=v.useState(!1);return v.useEffect(()=>{d((0,c.fk)())},[]),m}},70180:function(E,u,t){"use strict";t.d(u,{Z:function(){return c}});var v=t(50959);function c(){const[,m]=v.useReducer(d=>d+1,0);return m}},57535:function(E,u,t){"use strict";t.d(u,{Z:function(){return a},c:function(){return m}});var v=t(50959),c=t(27295);const m=["xxl","xl","lg","md","sm","xs"],d=p=>({xs:`(max-width: ${p.screenXSMax}px)`,sm:`(min-width: ${p.screenSM}px)`,md:`(min-width: ${p.screenMD}px)`,lg:`(min-width: ${p.screenLG}px)`,xl:`(min-width: ${p.screenXL}px)`,xxl:`(min-width: ${p.screenXXL}px)`}),P=p=>{const o=p,B=[].concat(m).reverse();return B.forEach((I,e)=>{const S=I.toUpperCase(),s=`screen${S}Min`,i=`screen${S}`;if(!(o[s]<=o[i]))throw new Error(`${s}<=${i} fails : !(${o[s]}<=${o[i]})`);if(e<B.length-1){const y=`screen${S}Max`;if(!(o[i]<=o[y]))throw new Error(`${i}<=${y} fails : !(${o[i]}<=${o[y]})`);const x=`screen${B[e+1].toUpperCase()}Min`;if(!(o[y]<=o[x]))throw new Error(`${y}<=${x} fails : !(${o[y]}<=${o[x]})`)}}),p};function a(){const[,p]=(0,c.Z)(),o=d(P(p));return v.useMemo(()=>{const B=new Map;let I=-1,e={};return{matchHandlers:{},dispatch(S){return e=S,B.forEach(s=>s(e)),B.size>=1},subscribe(S){return B.size||this.register(),I+=1,B.set(I,S),S(e),I},unsubscribe(S){B.delete(S),B.size||this.unregister()},unregister(){Object.keys(o).forEach(S=>{const s=o[S],i=this.matchHandlers[s];i==null||i.mql.removeListener(i==null?void 0:i.listener)}),B.clear()},register(){Object.keys(o).forEach(S=>{const s=o[S],i=f=>{let{matches:x}=f;this.dispatch(Object.assign(Object.assign({},e),{[S]:x}))},y=window.matchMedia(s);y.addListener(i),this.matchHandlers[s]={mql:y,listener:i},i(y)})},responsiveMap:o}},[p])}},48152:function(E,u,t){"use strict";t.d(u,{Z:function(){return S}});var v=t(84875),c=t.n(v),m=t(50959),d=t(78958),P=t(12927),a=t(10551),p=t(2297);const o=s=>{const{componentCls:i,sizePaddingEdgeHorizontal:y,colorSplit:f,lineWidth:x}=s;return{[i]:Object.assign(Object.assign({},(0,P.Wf)(s)),{borderBlockStart:`${x}px solid ${f}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",margin:`0 ${s.dividerVerticalGutterMargin}px`,verticalAlign:"middle",borderTop:0,borderInlineStart:`${x}px solid ${f}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${s.dividerHorizontalGutterMargin}px 0`},[`&-horizontal${i}-with-text`]:{display:"flex",alignItems:"center",margin:`${s.dividerHorizontalWithTextGutterMargin}px 0`,color:s.colorTextHeading,fontWeight:500,fontSize:s.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${f}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${x}px solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${i}-with-text-left`]:{"&::before":{width:"5%"},"&::after":{width:"95%"}},[`&-horizontal${i}-with-text-right`]:{"&::before":{width:"95%"},"&::after":{width:"5%"}},[`${i}-inner-text`]:{display:"inline-block",padding:"0 1em"},"&-dashed":{background:"none",borderColor:f,borderStyle:"dashed",borderWidth:`${x}px 0 0`},[`&-horizontal${i}-with-text${i}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${i}-dashed`]:{borderInlineStartWidth:x,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${i}-with-text`]:{color:s.colorText,fontWeight:"normal",fontSize:s.fontSize},[`&-horizontal${i}-with-text-left${i}-no-default-orientation-margin-left`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${i}-inner-text`]:{paddingInlineStart:y}},[`&-horizontal${i}-with-text-right${i}-no-default-orientation-margin-right`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${i}-inner-text`]:{paddingInlineEnd:y}}})}};var B=(0,a.Z)("Divider",s=>{const i=(0,p.TS)(s,{dividerVerticalGutterMargin:s.marginXS,dividerHorizontalWithTextGutterMargin:s.margin,dividerHorizontalGutterMargin:s.marginLG});return[o(i)]},{sizePaddingEdgeHorizontal:0}),I=function(s,i){var y={};for(var f in s)Object.prototype.hasOwnProperty.call(s,f)&&i.indexOf(f)<0&&(y[f]=s[f]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var x=0,f=Object.getOwnPropertySymbols(s);x<f.length;x++)i.indexOf(f[x])<0&&Object.prototype.propertyIsEnumerable.call(s,f[x])&&(y[f[x]]=s[f[x]]);return y},S=s=>{const{getPrefixCls:i,direction:y,divider:f}=m.useContext(d.E_),{prefixCls:x,type:K="horizontal",orientation:j="center",orientationMargin:M,className:L,rootClassName:b,children:k,dashed:g,plain:R,style:W}=s,_=I(s,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","plain","style"]),C=i("divider",x),[H,U]=B(C),N=j.length>0?`-${j}`:j,T=!!k,F=j==="left"&&M!=null,$=j==="right"&&M!=null,r=c()(C,f==null?void 0:f.className,U,`${C}-${K}`,{[`${C}-with-text`]:T,[`${C}-with-text${N}`]:T,[`${C}-dashed`]:!!g,[`${C}-plain`]:!!R,[`${C}-rtl`]:y==="rtl",[`${C}-no-default-orientation-margin-left`]:F,[`${C}-no-default-orientation-margin-right`]:$},L,b),n=m.useMemo(()=>typeof M=="number"?M:/^\d+$/.test(M)?Number(M):M,[M]),l=Object.assign(Object.assign({},F&&{marginLeft:n}),$&&{marginRight:n});return H(m.createElement("div",Object.assign({className:r,style:Object.assign(Object.assign({},f==null?void 0:f.style),W)},_,{role:"separator"}),k&&K!=="vertical"&&m.createElement("span",{className:`${C}-inner-text`,style:l},k)))}},9455:function(E,u,t){"use strict";var v=t(50959),c=t(12334),m=t(70180),d=t(57535);function P(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;const p=(0,v.useRef)({}),o=(0,m.Z)(),B=(0,d.Z)();return(0,c.Z)(()=>{const I=B.subscribe(e=>{p.current=e,a&&o()});return()=>B.unsubscribe(I)},[]),p.current}u.Z=P},6074:function(E,u,t){"use strict";var v=t(9455);function c(){return(0,v.Z)()}u.ZP={useBreakpoint:c}},97143:function(E,u,t){"use strict";t.d(u,{Z:function(){return K}});var v=t(84875),c=t.n(v),m=t(51026),d=t(50959),P=t(44594),a=t(78958),p=t(62444);const o=d.createContext({latestIndex:0,horizontalSize:0,verticalSize:0,supportFlexGap:!1}),B=o.Provider;var e=j=>{let{className:M,direction:L,index:b,marginDirection:k,children:g,split:R,wrap:W,style:_}=j;const{horizontalSize:C,verticalSize:H,latestIndex:U,supportFlexGap:N}=d.useContext(o);let T={};return N||(L==="vertical"?b<U&&(T={marginBottom:C/(R?2:1)}):T=Object.assign(Object.assign({},b<U&&{[k]:C/(R?2:1)}),W&&{paddingBottom:H})),g==null?null:d.createElement(d.Fragment,null,d.createElement("div",{className:M,style:Object.assign(Object.assign({},T),_)},g),b<U&&R&&d.createElement("span",{className:`${M}-split`,style:T},R))},S=t(73004),s=function(j,M){var L={};for(var b in j)Object.prototype.hasOwnProperty.call(j,b)&&M.indexOf(b)<0&&(L[b]=j[b]);if(j!=null&&typeof Object.getOwnPropertySymbols=="function")for(var k=0,b=Object.getOwnPropertySymbols(j);k<b.length;k++)M.indexOf(b[k])<0&&Object.prototype.propertyIsEnumerable.call(j,b[k])&&(L[b[k]]=j[b[k]]);return L};const i={small:8,middle:16,large:24};function y(j){return typeof j=="string"?i[j]:j||0}const x=d.forwardRef((j,M)=>{var L,b;const{getPrefixCls:k,space:g,direction:R}=d.useContext(a.E_),{size:W=(g==null?void 0:g.size)||"small",align:_,className:C,rootClassName:H,children:U,direction:N="horizontal",prefixCls:T,split:F,style:$,wrap:r=!1,classNames:n,styles:l}=j,h=s(j,["size","align","className","rootClassName","children","direction","prefixCls","split","style","wrap","classNames","styles"]),O=(0,P.Z)(),[w,z]=d.useMemo(()=>(Array.isArray(W)?W:[W,W]).map(G=>y(G)),[W]),A=(0,m.Z)(U,{keepEmpty:!0}),Z=_===void 0&&N==="horizontal"?"center":_,D=k("space",T),[ee,te]=(0,S.Z)(D),ne=c()(D,g==null?void 0:g.className,te,`${D}-${N}`,{[`${D}-rtl`]:R==="rtl",[`${D}-align-${Z}`]:Z},C,H),q=c()(`${D}-item`,(L=n==null?void 0:n.item)!==null&&L!==void 0?L:(b=g==null?void 0:g.classNames)===null||b===void 0?void 0:b.item),re=R==="rtl"?"marginLeft":"marginRight";let Q=0;const ie=A.map((G,V)=>{var Y,J;G!=null&&(Q=V);const se=G&&G.key||`${q}-${V}`;return d.createElement(e,{className:q,key:se,direction:N,index:V,marginDirection:re,split:F,wrap:r,style:(Y=l==null?void 0:l.item)!==null&&Y!==void 0?Y:(J=g==null?void 0:g.styles)===null||J===void 0?void 0:J.item},G)}),ae=d.useMemo(()=>({horizontalSize:w,verticalSize:z,latestIndex:Q,supportFlexGap:O}),[w,z,Q,O]);if(A.length===0)return null;const X={};return r&&(X.flexWrap="wrap",O||(X.marginBottom=-z)),O&&(X.columnGap=w,X.rowGap=z),ee(d.createElement("div",Object.assign({ref:M,className:ne,style:Object.assign(Object.assign(Object.assign({},X),g==null?void 0:g.style),$)},h),d.createElement(B,{value:ae},ie)))});x.Compact=p.ZP;var K=x},12342:function(E,u,t){var v=t(20006);function c(m,d){if(m==null)return{};var P=v(m,d),a,p;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(m);for(p=0;p<o.length;p++)a=o[p],!(d.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(m,a)&&(P[a]=m[a])}return P}E.exports=c,E.exports.__esModule=!0,E.exports.default=E.exports},20006:function(E){function u(t,v){if(t==null)return{};var c={},m=Object.keys(t),d,P;for(P=0;P<m.length;P++)d=m[P],!(v.indexOf(d)>=0)&&(c[d]=t[d]);return c}E.exports=u,E.exports.__esModule=!0,E.exports.default=E.exports}}]);
