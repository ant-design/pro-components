"use strict";(self.webpackChunkpro_components=self.webpackChunkpro_components||[]).push([[5353],{47162:function(k,y,e){e.d(y,{Z:function(){return T}});var O=e(47622),h=e(50959),j={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"}}]},name:"menu",theme:"outlined"},M=j,K=e(2521),n=function(A,v){return h.createElement(K.Z,(0,O.Z)({},A,{ref:v,icon:M}))},T=h.forwardRef(n)},439:function(k,y,e){e.r(y);var O=e(54306),h=e.n(O),j=e(57213),M=e.n(j),K=e(25359),n=e.n(K),T=e(49811),I=e.n(T),A=e(47162),v=e(32993),B=e(86885),L=e(50959),m=e(11527),_=[{key:"key1",name:"John Brown",age:32,address:"New York No. 1 Lake Park",index:0},{key:"key2",name:"Jim Green",age:42,address:"London No. 1 Lake Park",index:1},{key:"key3",name:"Joe Black",age:32,address:"Sidney No. 1 Lake Park",index:2}],Z=function(){var S=I()(n()().mark(function l(){var C,i=arguments;return n()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return C=i.length>0&&i[0]!==void 0?i[0]:1e3,t.abrupt("return",new Promise(function(Y){return setTimeout(function(){return Y(void 0)},C)}));case 2:case"end":return t.stop()}},l)}));return function(){return S.apply(this,arguments)}}(),z=_.map(function(S){return M()(M()({},S),{},{name:"[remote data] ".concat(S.name)})}),q=function(){var S=I()(n()().mark(function l(){return n()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,Z(3e3);case 2:return i.abrupt("return",{data:z,total:z.length,success:!0});case 3:case"end":return i.stop()}},l)}));return function(){return S.apply(this,arguments)}}();y.default=function(){var S=[{title:"\u6392\u5E8F",dataIndex:"sort",render:function(g,x,se){return(0,m.jsx)("span",{className:"customRender",children:"\u81EA\u5B9A\u4E49Render[".concat(x.name,"-").concat(se,"]")})}},{title:"\u59D3\u540D",dataIndex:"name",className:"drag-visible"},{title:"\u5E74\u9F84",dataIndex:"age"},{title:"\u5730\u5740",dataIndex:"address"}],l=[{title:"\u6392\u5E8F",dataIndex:"sort"},{title:"\u59D3\u540D",dataIndex:"name",className:"drag-visible"},{title:"\u5E74\u9F84",dataIndex:"age"},{title:"\u5730\u5740",dataIndex:"address"}],C=(0,L.useRef)(),i=(0,L.useState)(_),$=h()(i,2),t=$[0],Y=$[1],ee=(0,L.useState)(_),w=h()(ee,2),ne=w[0],re=w[1],ae=function(g){console.log("\u6392\u5E8F\u540E\u7684\u6570\u636E",g),Y(g),B.ZP.success("\u4FEE\u6539\u5217\u8868\u6392\u5E8F\u6210\u529F")},te=function(g){console.log("\u6392\u5E8F\u540E\u7684\u6570\u636E",g),re(g),B.ZP.success("\u4FEE\u6539\u5217\u8868\u6392\u5E8F\u6210\u529F")},oe=function(g){var x;console.log("\u6392\u5E8F\u540E\u7684\u6570\u636E",g),z=g,(x=C.current)===null||x===void 0||x.reload(),B.ZP.success("\u4FEE\u6539\u5217\u8868\u6392\u5E8F\u6210\u529F")},de=function(g,x){return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(A.Z,{style:{cursor:"grab",color:"gold"}}),"\xA0",x+1," - ",g.name]})};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(v.Z,{headerTitle:"\u62D6\u62FD\u6392\u5E8F(\u9ED8\u8BA4\u628A\u624B)",columns:S,rowKey:"key",pagination:!1,dataSource:t,dragSortKey:"sort",onDragSortEnd:ae}),(0,m.jsx)(v.Z,{headerTitle:"\u62D6\u62FD\u6392\u5E8F(\u81EA\u5B9A\u4E49\u628A\u624B)",columns:l,rowKey:"index",search:!1,pagination:!1,dataSource:ne,dragSortKey:"sort",dragSortHandlerRender:de,onDragSortEnd:te}),(0,m.jsx)(v.Z,{actionRef:C,headerTitle:"\u4F7F\u7528 request \u83B7\u53D6\u6570\u636E\u6E90",columns:l,rowKey:"index",search:!1,pagination:!1,request:q,dragSortKey:"sort",onDragSortEnd:oe})]})}},60809:function(k,y,e){e.r(y);var O=e(54306),h=e.n(O),j=e(32993),M=e(86885),K=e(50959),n=e(11527),T=[{title:"\u6392\u5E8F",dataIndex:"sort",width:60,className:"drag-visible"},{title:"\u59D3\u540D",dataIndex:"name",className:"drag-visible"},{title:"\u5E74\u9F84",dataIndex:"age"},{title:"\u5730\u5740",dataIndex:"address"}],I=[{key:"1",name:"John Brown",age:32,address:"New York No. 1 Lake Park",index:0},{key:"2",name:"Jim Green",age:42,address:"London No. 1 Lake Park",index:1},{key:"3",name:"Joe Black",age:32,address:"Sidney No. 1 Lake Park",index:2}];y.default=function(){var A=(0,K.useState)(I),v=h()(A,2),B=v[0],L=v[1],m=function(Z){console.log("\u6392\u5E8F\u540E\u7684\u6570\u636E",Z),L(Z),M.ZP.success("\u4FEE\u6539\u5217\u8868\u6392\u5E8F\u6210\u529F")};return(0,n.jsx)(j.Z,{headerTitle:"\u62D6\u62FD\u6392\u5E8F(\u9ED8\u8BA4\u628A\u624B)",columns:T,rowKey:"key",pagination:!1,dataSource:B,dragSortKey:"sort",onDragSortEnd:m})}},32993:function(k,y,e){e.d(y,{Z:function(){return ve}});var O=e(25359),h=e.n(O),j=e(49811),M=e.n(j),K=e(57213),n=e.n(K),T=e(54306),I=e.n(T),A=e(12342),v=e.n(A),B=e(8512),L=e(75655),m=e(82526),_=e(50959),Z=e(29544),z=e(65854),q=e.n(z),S=e(45546),l=e(43089),C=e(20643),i=e(79897),$=e(84341),t=e(11527),Y=["DragHandle","dragSortKey"],ee=["dragSortKey"],w=(0,_.createContext)({handle:null}),ne=function(a){var d=(0,i.nB)({id:a.id}),f=d.attributes,E=d.listeners,U=d.setNodeRef,p=d.transform,H=d.transition,J=n()({transform:$.ux.Transform.toString(p),transition:H},a==null?void 0:a.style),W=a.DragHandle,R=a.dragSortKey,P=v()(a,Y);if(R){var b=[];return _.Children.forEach(P.children,function(o,D){if(o.key===R){var u,c;b.push((0,t.jsx)(w.Provider,{value:{handle:(0,t.jsx)(W,n()(n()({rowData:o==null||(u=o.props)===null||u===void 0?void 0:u.record,index:o==null||(c=o.props)===null||c===void 0?void 0:c.index},E),f))},children:o},o.key||D));return}b.push(o)}),(0,t.jsx)("tr",n()(n()({},P),{},{ref:U,style:J,children:b}))}return(0,t.jsx)("tr",n()(n()(n()({},P),{},{ref:U,style:J},f),E))},re=_.memo(function(r){var a=r.dragSortKey,d=v()(r,ee),f=(0,_.useContext)(w),E=f.handle;return E?(0,t.jsx)("td",n()(n()({},d),{},{children:(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[E," ",d.children]})})):(0,t.jsx)("td",n()({},d))}),ae=function(a){return(0,t.jsx)("tbody",n()({},a))};function te(r){var a=r.dataSource,d=a===void 0?[]:a,f=r.onDragSortEnd,E=r.DragHandle,U=r.dragSortKey,p=(0,l.Dy)((0,l.VT)(l.we),(0,l.VT)(l.MA)),H=(0,_.useCallback)(function(o){var D,u=o.active,c=o.over;if(c!=null&&(D=c.id)!==null&&D!==void 0&&D.toString()&&u.id!==(c==null?void 0:c.id)){var G=(0,i.Rp)(d||[],parseInt(u.id),parseInt(c.id));f==null||f(G||[])}},[d,f]),J=(0,S.J)(function(o){return(0,t.jsx)(i.Fo,{items:d.map(function(D,u){return u==null?void 0:u.toString()}),strategy:i.qw,children:(0,t.jsx)(ae,n()({},o))})}),W=(0,S.J)(function(o){var D,u=Object.assign({},(q()(o),o)),c=(D=d.findIndex(function(G){var X;return G[(X=r.rowKey)!==null&&X!==void 0?X:"index"]===u["data-row-key"]}))===null||D===void 0?void 0:D.toString();return(0,t.jsx)(ne,n()({id:c,dragSortKey:U,DragHandle:E},u),c)}),R=r.components||{};if(U){var P;R.body=n()(n()({},((P=r.components)===null||P===void 0?void 0:P.body)||{}),{},{wrapper:J,row:W,cell:re})}var b=(0,_.useMemo)(function(){return function(o){return(0,t.jsx)(l.LB,{modifiers:[C.DL],sensors:p,collisionDetection:l.pE,onDragEnd:H,children:o.children})}},[H,p]);return{DndContext:b,components:R}}var oe=e(52510),de=e.n(oe),F=e(46395),g=function(a){return de()({},a.componentCls,{"&-icon":{marginInlineEnd:8,color:a.colorTextSecondary,cursor:"grab !important",padding:4,fontSize:12,borderRadius:a.borderRadius,"&:hover":{color:a.colorText,backgroundColor:a.colorInfoBg}}})};function x(r){return(0,F.Xj)("DragSortTable",function(a){var d=n()(n()({},a),{},{componentCls:".".concat(r)});return[g(d)]})}var se=["rowKey","dragSortKey","dragSortHandlerRender","onDragSortEnd","onDataSourceChange","defaultData","dataSource","onLoad"],ie=["rowData","index","className"];function ce(r){var a,d=r.rowKey,f=r.dragSortKey,E=r.dragSortHandlerRender,U=r.onDragSortEnd,p=r.onDataSourceChange,H=r.defaultData,J=r.dataSource,W=r.onLoad,R=v()(r,se),P=(0,_.useContext)(L.ZP.ConfigContext),b=P.getPrefixCls,o=(0,m.default)(function(){return H||[]},{value:J,onChange:p}),D=I()(o,2),u=D[0],c=D[1],G=x(b("pro-table-drag")),X=G.wrapSSR,me=G.hashId,_e=(0,_.useMemo)(function(){return function(s){var Q=s.rowData,V=s.index,le=s.className,N=v()(s,ie),Se=(0,t.jsx)(B.Z,n()(n()({},N),{},{className:"".concat(b("pro-table-drag-icon")," ").concat(le||""," ").concat(me||"").trim()})),he=E?E(s==null?void 0:s.rowData,s==null?void 0:s.index):Se;return(0,t.jsx)("div",n()(n()({},N),{},{children:he}))}},[b]),ue=te({dataSource:u==null?void 0:u.slice(),dragSortKey:f,onDragSortEnd:U,components:r.components,rowKey:d,DragHandle:_e}),ge=ue.components,fe=ue.DndContext,De=function(){var s=M()(h()().mark(function Q(V){return h()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return c(V),N.abrupt("return",W==null?void 0:W(V));case 2:case"end":return N.stop()}},Q)}));return function(V){return s.apply(this,arguments)}}();return X((0,t.jsx)(Z.Z,n()(n()({},R),{},{columns:(a=R.columns)===null||a===void 0?void 0:a.map(function(s){return(s.dataIndex==f||s.key===f)&&(s.render||(s.render=function(){return null})),s}),onLoad:De,rowKey:d,tableViewRender:function(Q,V){return(0,t.jsx)(fe,{children:V})},dataSource:u,components:ge,onDataSourceChange:p})))}var ve=ce}}]);
