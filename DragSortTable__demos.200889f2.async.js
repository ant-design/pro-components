"use strict";(self.webpackChunkpro_components=self.webpackChunkpro_components||[]).push([[5353],{67036:function(q,y,e){e.d(y,{Z:function(){return K}});var I=e(48063),h=e(50959),O={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"}}]},name:"menu",theme:"outlined"},M=O,j=e(38782),n=function(A,v){return h.createElement(j.Z,(0,I.Z)({},A,{ref:v,icon:M}))},K=h.forwardRef(n)},72337:function(q,y,e){e.r(y);var I=e(48305),h=e.n(I),O=e(26068),M=e.n(O),j=e(90228),n=e.n(j),K=e(87999),T=e.n(K),A=e(67036),v=e(30759),B=e(46854),L=e(50959),m=e(11527),_=[{key:"key1",name:"John Brown",age:32,address:"New York No. 1 Lake Park",index:0},{key:"key2",name:"Jim Green",age:42,address:"London No. 1 Lake Park",index:1},{key:"key3",name:"Joe Black",age:32,address:"Sidney No. 1 Lake Park",index:2}],Q=function(){var S=T()(n()().mark(function i(){var C,c=arguments;return n()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return C=c.length>0&&c[0]!==void 0?c[0]:1e3,t.abrupt("return",new Promise(function(Y){return setTimeout(function(){return Y(void 0)},C)}));case 2:case"end":return t.stop()}},i)}));return function(){return S.apply(this,arguments)}}(),Z=_.map(function(S){return M()(M()({},S),{},{name:"[remote data] ".concat(S.name)})}),F=function(){var S=T()(n()().mark(function i(){return n()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Q(3e3);case 2:return c.abrupt("return",{data:Z,total:Z.length,success:!0});case 3:case"end":return c.stop()}},i)}));return function(){return S.apply(this,arguments)}}();y.default=function(){var S=[{title:"\u6392\u5E8F",dataIndex:"sort",render:function(g,x,se){return(0,m.jsx)("span",{className:"customRender",children:"\u81EA\u5B9A\u4E49Render[".concat(x.name,"-").concat(se,"]")})}},{title:"\u59D3\u540D",dataIndex:"name",className:"drag-visible"},{title:"\u5E74\u9F84",dataIndex:"age"},{title:"\u5730\u5740",dataIndex:"address"}],i=[{title:"\u6392\u5E8F",dataIndex:"sort"},{title:"\u59D3\u540D",dataIndex:"name",className:"drag-visible"},{title:"\u5E74\u9F84",dataIndex:"age"},{title:"\u5730\u5740",dataIndex:"address"}],C=(0,L.useRef)(),c=(0,L.useState)(_),$=h()(c,2),t=$[0],Y=$[1],ee=(0,L.useState)(_),w=h()(ee,2),ne=w[0],re=w[1],ae=function(g){console.log("\u6392\u5E8F\u540E\u7684\u6570\u636E",g),Y(g),B.ZP.success("\u4FEE\u6539\u5217\u8868\u6392\u5E8F\u6210\u529F")},te=function(g){console.log("\u6392\u5E8F\u540E\u7684\u6570\u636E",g),re(g),B.ZP.success("\u4FEE\u6539\u5217\u8868\u6392\u5E8F\u6210\u529F")},oe=function(g){var x;console.log("\u6392\u5E8F\u540E\u7684\u6570\u636E",g),Z=g,(x=C.current)===null||x===void 0||x.reload(),B.ZP.success("\u4FEE\u6539\u5217\u8868\u6392\u5E8F\u6210\u529F")},de=function(g,x){return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(A.Z,{style:{cursor:"grab",color:"gold"}}),"\xA0",x+1," - ",g.name]})};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(v.Z,{headerTitle:"\u62D6\u62FD\u6392\u5E8F(\u9ED8\u8BA4\u628A\u624B)",columns:S,rowKey:"key",pagination:!1,dataSource:t,dragSortKey:"sort",onDragSortEnd:ae}),(0,m.jsx)(v.Z,{headerTitle:"\u62D6\u62FD\u6392\u5E8F(\u81EA\u5B9A\u4E49\u628A\u624B)",columns:i,rowKey:"index",search:!1,pagination:!1,dataSource:ne,dragSortKey:"sort",dragSortHandlerRender:de,onDragSortEnd:te}),(0,m.jsx)(v.Z,{actionRef:C,headerTitle:"\u4F7F\u7528 request \u83B7\u53D6\u6570\u636E\u6E90",columns:i,rowKey:"index",search:!1,pagination:!1,request:F,dragSortKey:"sort",onDragSortEnd:oe})]})}},59825:function(q,y,e){e.r(y);var I=e(48305),h=e.n(I),O=e(30759),M=e(46854),j=e(50959),n=e(11527),K=[{title:"\u6392\u5E8F",dataIndex:"sort",width:60,className:"drag-visible"},{title:"\u59D3\u540D",dataIndex:"name",className:"drag-visible"},{title:"\u5E74\u9F84",dataIndex:"age"},{title:"\u5730\u5740",dataIndex:"address"}],T=[{key:"1",name:"John Brown",age:32,address:"New York No. 1 Lake Park",index:0},{key:"2",name:"Jim Green",age:42,address:"London No. 1 Lake Park",index:1},{key:"3",name:"Joe Black",age:32,address:"Sidney No. 1 Lake Park",index:2}];y.default=function(){var A=(0,j.useState)(T),v=h()(A,2),B=v[0],L=v[1],m=function(Q,Z,F){console.log("\u6392\u5E8F\u540E\u7684\u6570\u636E",F),L(F),M.ZP.success("\u4FEE\u6539\u5217\u8868\u6392\u5E8F\u6210\u529F")};return(0,n.jsx)(O.Z,{headerTitle:"\u62D6\u62FD\u6392\u5E8F(\u9ED8\u8BA4\u628A\u624B)",columns:K,rowKey:"key",pagination:!1,dataSource:B,dragSortKey:"sort",onDragSortEnd:m})}},30759:function(q,y,e){e.d(y,{Z:function(){return ve}});var I=e(90228),h=e.n(I),O=e(87999),M=e.n(O),j=e(26068),n=e.n(j),K=e(48305),T=e.n(K),A=e(67825),v=e.n(A),B=e(81707),L=e(94918),m=e(31765),_=e(50959),Q=e(48016),Z=e(36075),F=e.n(Z),S=e(49152),i=e(85264),C=e(20058),c=e(87147),$=e(47581),t=e(11527),Y=["DragHandle","dragSortKey"],ee=["dragSortKey"],w=(0,_.createContext)({handle:null}),ne=function(a){var d=(0,c.nB)({id:a.id}),f=d.attributes,E=d.listeners,U=d.setNodeRef,p=d.transform,J=d.transition,G=n()({transform:$.ux.Transform.toString(p),transition:J},a==null?void 0:a.style),W=a.DragHandle,R=a.dragSortKey,b=v()(a,Y);if(R){var P=[];return _.Children.forEach(b.children,function(o,D){if(o.key===R){var s,l;P.push((0,t.jsx)(w.Provider,{value:{handle:(0,t.jsx)(W,n()(n()({rowData:o==null||(s=o.props)===null||s===void 0?void 0:s.record,index:o==null||(l=o.props)===null||l===void 0?void 0:l.index},E),f))},children:o},o.key||D));return}P.push(o)}),(0,t.jsx)("tr",n()(n()({},b),{},{ref:U,style:G,children:P}))}return(0,t.jsx)("tr",n()(n()(n()({},b),{},{ref:U,style:G},f),E))},re=_.memo(function(r){var a=r.dragSortKey,d=v()(r,ee),f=(0,_.useContext)(w),E=f.handle;return E?(0,t.jsx)("td",n()(n()({},d),{},{children:(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[E," ",d.children]})})):(0,t.jsx)("td",n()({},d))}),ae=function(a){return(0,t.jsx)("tbody",n()({},a))};function te(r){var a=r.dataSource,d=a===void 0?[]:a,f=r.onDragSortEnd,E=r.DragHandle,U=r.dragSortKey,p=(0,i.Dy)((0,i.VT)(i.we),(0,i.VT)(i.MA)),J=(0,_.useCallback)(function(o){var D,s=o.active,l=o.over;if(l!=null&&(D=l.id)!==null&&D!==void 0&&D.toString()&&s.id!==(l==null?void 0:l.id)){var V=(0,c.Rp)(d||[],parseInt(s.id),parseInt(l.id));f==null||f(parseInt(s.id),parseInt(l.id),V||[])}},[d,f]),G=(0,S.J)(function(o){return(0,t.jsx)(c.Fo,{items:d.map(function(D,s){return s==null?void 0:s.toString()}),strategy:c.qw,children:(0,t.jsx)(ae,n()({},o))})}),W=(0,S.J)(function(o){var D,s=Object.assign({},(F()(o),o)),l=(D=d.findIndex(function(V){var X;return V[(X=r.rowKey)!==null&&X!==void 0?X:"index"]===s["data-row-key"]}))===null||D===void 0?void 0:D.toString();return(0,t.jsx)(ne,n()({id:l,dragSortKey:U,DragHandle:E},s),l)}),R=r.components||{};if(U){var b;R.body=n()(n()({},((b=r.components)===null||b===void 0?void 0:b.body)||{}),{},{wrapper:G,row:W,cell:re})}var P=(0,_.useMemo)(function(){return function(o){return(0,t.jsx)(i.LB,{modifiers:[C.DL],sensors:p,collisionDetection:i.pE,onDragEnd:J,children:o.children})}},[J,p]);return{DndContext:P,components:R}}var oe=e(82092),de=e.n(oe),H=e(56212),g=function(a){return de()({},a.componentCls,{"&-icon":{marginInlineEnd:8,color:a.colorTextSecondary,cursor:"grab !important",padding:4,fontSize:12,borderRadius:a.borderRadius,"&:hover":{color:a.colorText,backgroundColor:a.colorInfoBg}}})};function x(r){return(0,H.Xj)("DragSortTable",function(a){var d=n()(n()({},a),{},{componentCls:".".concat(r)});return[g(d)]})}var se=["rowKey","dragSortKey","dragSortHandlerRender","onDragSortEnd","onDataSourceChange","defaultData","dataSource","onLoad"],ie=["rowData","index","className"];function ce(r){var a,d=r.rowKey,f=r.dragSortKey,E=r.dragSortHandlerRender,U=r.onDragSortEnd,p=r.onDataSourceChange,J=r.defaultData,G=r.dataSource,W=r.onLoad,R=v()(r,se),b=(0,_.useContext)(L.ZP.ConfigContext),P=b.getPrefixCls,o=(0,m.default)(function(){return J||[]},{value:G,onChange:p}),D=T()(o,2),s=D[0],l=D[1],V=x(P("pro-table-drag")),X=V.wrapSSR,me=V.hashId,_e=(0,_.useMemo)(function(){return function(u){var k=u.rowData,z=u.index,le=u.className,N=v()(u,ie),Se=(0,t.jsx)(B.Z,n()(n()({},N),{},{className:"".concat(P("pro-table-drag-icon")," ").concat(le||""," ").concat(me||"").trim()})),he=E?E(u==null?void 0:u.rowData,u==null?void 0:u.index):Se;return(0,t.jsx)("div",n()(n()({},N),{},{children:he}))}},[P]),ue=te({dataSource:s==null?void 0:s.slice(),dragSortKey:f,onDragSortEnd:U,components:r.components,rowKey:d,DragHandle:_e}),ge=ue.components,fe=ue.DndContext,De=function(){var u=M()(h()().mark(function k(z){return h()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return l(z),N.abrupt("return",W==null?void 0:W(z));case 2:case"end":return N.stop()}},k)}));return function(z){return u.apply(this,arguments)}}();return X((0,t.jsx)(Q.Z,n()(n()({},R),{},{columns:(a=R.columns)===null||a===void 0?void 0:a.map(function(u){return(u.dataIndex==f||u.key===f)&&(u.render||(u.render=function(){return null})),u}),onLoad:De,rowKey:d,tableViewRender:function(k,z){return(0,t.jsx)(fe,{children:z})},dataSource:s,components:ge,onDataSourceChange:p})))}var ve=ce}}]);
