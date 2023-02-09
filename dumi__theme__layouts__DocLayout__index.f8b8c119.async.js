"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[367],{98602:function(br,gn,s){s.r(gn),s.d(gn,{default:function(){return sr}});var lt=s(94161),y=s(76693),st=s(3341),F=s.n(st),u=s(50959),ct=s(48116),dt=s(84611),ut=s(70658),yn=s(90528),bn=s(30901),an=(0,yn.Ue)()((0,bn.tJ)(function(){return{themeMode:"auto"}},{name:"ANTD_STYLE_DOC_STORE"})),pt=s(86378),B=s.n(pt),ht=s(63160),jr=null,D=["#001736","#002653","#003572","#004593","#0055b6","#0066dc","#1677ff","#257fff","#3187ff","#3c8fff","#4796ff"],vt=function(n,o){var t=ht.Z.darkAlgorithm(n,o);return B()(B()({},t),{},{colorBgLayout:"hsl(218,22%,7%)",colorBgContainer:"hsl(216,18%,11%)",colorBgElevated:"hsl(216,13%,15%)",colorPrimaryBg:D[1],colorPrimaryBgHover:D[2],colorPrimaryBorder:D[3],colorPrimaryBorderHover:D[4],colorPrimaryHover:D[5],colorPrimary:D[6],colorPrimaryActive:D[7],colorPrimaryTextHover:D[8],colorPrimaryText:D[9],colorPrimaryTextActive:D[10],colorLink:D[6],colorLinkHover:D[5],colorLinkActive:D[7]})},xt=function(n,o){var t=["#ffffff","#d9ebfb","#b4d6f7","#90c0f5","#6caaf5","#4792f8","#1677ff","#0568e0","#005ac0","#004ca1","#003e84"];return B()(B()({},o),{},{colorBgLayout:"hsl(220,23%,97%)",colorPrimaryBg:t[1],colorPrimaryBgHover:t[2],colorPrimaryBorder:t[3],colorPrimaryBorderHover:t[4],colorPrimaryHover:t[5],colorPrimary:t[6],colorPrimaryActive:t[7],colorPrimaryTextHover:t[8],colorPrimaryText:t[9],colorPrimaryTextActive:t[10]})},mt=function(n){var o={token:{colorTextBase:"#3d3e40"},algorithm:xt};return n==="dark"&&(o.token={colorTextBase:"#c7ddff"},o.algorithm=vt),o},ft=s(14661),c=s.n(ft),gt=s(48453),O=s.n(gt),jn,Sn,kn,wn,Cn,Tn,Bn,Hn,yt=function(n){var o=n.css,t=n.token,a=n.isDarkMode;return{clickableText:o(jn||(jn=c()([`
      cursor: pointer;
      color: `,`;

      &:hover {
        color: `,`;
      }
    `])),t.colorTextSecondary,t.colorText),resetLinkColor:o(Sn||(Sn=c()([`
      color: inherit;

      &:hover,
      &:active {
        color: inherit;
      }
    `]))),heroButtonGradient:o(kn||(kn=c()([`
      background: linear-gradient(90deg, `," 0%, ",` 100%);
    `])),t.gradientColor1,t.gradientColor2),heroGradient:o(wn||(wn=c()([`
      background-image: `,`;
      background-size: 300% 300%;
    `])),t.gradientHeroBgG),heroGradientFlow:o(Cn||(Cn=c()([`
      animation: flow 5s ease infinite;

      @keyframes flow {
        0% {
          background-position: 0 0;
        }

        50% {
          background-position: 100% 100%;
        }

        100% {
          background-position: 0 0;
        }
      }
    `]))),heroTextShadow:o(Tn||(Tn=c()([`
      text-shadow: 0 8px 20px `,`,
        0 8px 60px `,`,
        0 8px 80px
          `,`;
    `])),O()(t.gradientColor2).alpha(.2).hex(),O()(t.gradientColor3).alpha(.2).hex(),O()(t.cyan).alpha(a?.2:.4).hex()),heroBlurBall:o(Bn||(Bn=c()([`
      filter: blur(69px);
      background: linear-gradient(
        135deg,
        `,` 0%,
        `,` 30%,
        `,` 70%,
        `,` 100%
      );
      background-size: 200% 200%;
      animation: glow 10s ease infinite;

      @keyframes glow {
        0% {
          background-position: 0 -100%;
        }

        50% {
          background-position: 200% 50%;
        }

        100% {
          background-position: 0 -100%;
        }
      }
    `])),t.gradientColor3,t.gradientColor1,t.red,t.cyan),iconGradientDefault:o(Hn||(Hn=c()([`
      radial-gradient(
        100% 100% at 50% 0,
        `,` 0,
        `,` 100%
      )`])),O()(t.colorSolid).alpha(.2).hex(),O()(t.colorSolid).alpha(.1).hex())}},bt=function(n){var o=n.isDarkMode,t=n.token,a=t.blue,l=o?t.pink:t.cyan,i=t.purple,d=o?t.colorWhite:"#000";return{headerHeight:64,sidebarWidth:240,tocWidth:176,contentMaxWidth:1152,colorSolid:d,gradientColor1:a,gradientColor2:l,gradientColor3:i,gradientHeroBgG:"radial-gradient(at 80% 20%, ".concat(a," 0%, ").concat(l," 80%, ").concat(i," 130%)"),gradientIconDefault:`radial-gradient(
        100% 100% at 50% 0,
        `.concat(O()(d).alpha(.2).hex(),` 0,
        `).concat(O()(d).alpha(o?.1:.4).hex(),` 100%
      )`)}},e=s(11527),jt=function(r){var n=r.children,o=an(function(t){return t.themeMode});return(0,e.jsx)(dt.V,{prefix:"site",children:(0,e.jsx)(ut.f,{prefixCls:"site",themeMode:o,theme:mt,customStylish:yt,customToken:bt,children:(0,e.jsx)(ct.Z,{children:n})})})},St=s(28488),ln=s.n(St),sn=s(48612),kt={siteData:{setLoading:void 0,loading:!0,pkg:{},components:{},demos:{},locales:[],entryExports:{},themeConfig:{}},sidebar:[],navData:[],location:{pathname:"",state:"",search:"",hash:"",key:""},routeMeta:{toc:[],texts:[],tabs:void 0,frontmatter:{}}},j=(0,yn.Ue)()((0,bn.mW)(function(){return B()({},kt)},{name:"dumi-site-store"})),wt=function(n){return n.location.pathname.startsWith("/api")},Ct=function(n){return!!n.routeMeta.frontmatter.hero},Tt=function(n){return n.routeMeta.frontmatter.features},Bt=function(n){if(n.location.pathname==="/")return"/";var o=n.navData.filter(function(t){return t.link!=="/"}).find(function(t){return n.location.pathname.startsWith(t.activePath)});return(o==null?void 0:o.activePath)||""},Ht=["setLoading"],Dt=["setLoading"],Ot=(0,u.memo)(function(){var r=(0,y.WF)(),n=(0,y.tx)(),o=(0,y.eL)(),t=(0,y.OK)(),a=(0,sn.TH)();return(0,u.useEffect)(function(){var l=r.setLoading,i=ln()(r,Ht),d=j.getState(),p=d.siteData,v=p.setLoading,b=ln()(p,Dt);F()(i,b)||j.setState({siteData:r})},[r]),(0,u.useEffect)(function(){j.setState({sidebar:n})},[n]),(0,u.useEffect)(function(){j.setState({routeMeta:o})},[o]),(0,u.useEffect)(function(){j.setState({navData:t})},[t]),(0,u.useEffect)(function(){j.setState({location:a})},[a]),null}),g=s(95945),R=s(45668),w=s(98318),Dn,Pt=(0,w.k)(function(r){var n=r.token,o=r.responsive,t=r.isDarkMode,a=r.css;return{content:a(Dn||(Dn=c()([`
    min-height: 400px;
    flex: 1;
    width: 100%;
    box-sizing: border-box;

    padding: 24px 48px;
    border-radius: 10px;
    background-color: `,`;
    box-shadow: `,`;
    `,` {
      padding: 8px 16px;
      border-radius: 0;
    }

    .markdown {
      color: `,`;

      h1,
      h2,
      h3 {
        color: `,`;
      }
      p {
        line-height: 1.8;
      }

      // hyperlink
      a {
        color: `,`;

        &:hover {
          color: `,`;
        }

        &:active {
          color: `,`;
        }
      }

      img {
        max-width: 600px;
        width: 80%;
        opacity: `,`;
      }

      // inline code
      > :not(.source-code) code {
        padding: 2px 6px;

        color: `,`;
        background: `,`;
        border-radius: 4px;
      }

      // pre tag
      pre {
        font-size: 14px;
        padding-left: 24px;
        padding-right: 24px;
      }

      // table
      table {
        width: 100%;
        border-spacing: 1px;
      }

      th {
        background: `,`;
      }

      tr {
      }
      th,
      td {
        padding-block-start: 10px;
        padding-block-end: 10px;
        padding-inline-start: 16px;
        padding-inline-end: 16px;
        border-bottom: 1px solid `,`;
      }

      // blockquote
      blockquote {
        font-style: italic;

        margin: 16px 0;
        padding: 0 12px;
        color: `,`;
        border-left: 3px solid `,`;
      }

      // list
      ul li {
        line-height: 1.8;
      }

      // anchor of headings
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        > a[aria-hidden]:first-child {
          float: left;
          width: 20px;
          padding-inline-end: 4px;
          margin-inline-start: -24px;
          color: `,`;
          // hide phantom blank node
          font-size: 0;
          text-align: right;
          line-height: inherit;

          &:hover {
            border: 0;
          }

          > .icon-link::before {
            content: '#';
            color: `,`;
            font-size: 20px;
          }
        }

        &:not(:hover) > a[aria-hidden]:first-child > .icon-link {
          visibility: hidden;
        }
      }
    }
  `])),n.colorBgContainer,n.boxShadow,o.mobile,n.colorTextSecondary,n.colorText,n.colorLink,n.colorLinkHover,n.colorLinkActive,t?.8:1,n.colorPrimaryText,n.colorPrimaryBg,n.colorFillTertiary,n.colorBorderSecondary,n.colorTextDescription,n.colorBorder,n.colorText,n.colorTextTertiary)}}),zt=function(n){var o=n.children,t=(0,y.tx)(),a=Pt(),l=a.styles,i=a.cx;return(0,e.jsx)("div",{className:i("dumi-default-content",l.content),"data-no-sidebar":!t||void 0,children:o})},Mt=zt,A=s(56562),Q=s(20942),q=s(8253),On,Nt=(0,w.k)(function(r){var n=r.css,o=r.responsive,t=r.token;return n(On||(On=c()([`
    grid-area: footer;
    border-top: 1px solid `,`;
    color: `,`;
    font-size: 14px;
    line-height: 26px;
    text-align: center;
    padding: 24px 0;
    align-self: stretch;

    `,` {
      border: none;
      flex-direction: column;
    }
  `])),t.colorSplit,t.colorTextDescription,o.mobile)}),Lt=function(){var n=(0,y.WF)(),o=n.themeConfig,t=Nt(),a=t.styles,l=(0,q.F)(),i=l.mobile;return o.footer?i?(0,e.jsx)(R.Z,{horizontal:!0,className:a,children:(0,e.jsxs)(g.D,{align:"center",horizontal:!0,children:["Powered by",(0,e.jsx)(A.Z.Link,{href:"https://d.umijs.org/",style:{marginLeft:8},children:"Dumi"}),(0,e.jsx)(Q.Z,{type:"vertical",style:{margin:"0 8px"}}),(0,e.jsx)(A.Z.Link,{href:"https://ant.design/",children:"Ant Design"}),(0,e.jsx)(Q.Z,{type:"vertical",style:{margin:"0 8px"}}),(0,e.jsx)(A.Z.Link,{href:"https://kitchen.alipay.com/",children:"kitchen"})]})}):(0,e.jsxs)(R.Z,{horizontal:!0,className:a,children:["Powered by",(0,e.jsxs)(g.D,{align:"center",horizontal:!0,style:{marginLeft:8},children:[(0,e.jsx)(A.Z.Link,{href:"https://d.umijs.org/",children:"Dumi"}),(0,e.jsx)(Q.Z,{type:"vertical",style:{margin:"0 8px"}}),(0,e.jsx)(A.Z.Link,{href:"https://ant.design/",children:"Ant Design"}),(0,e.jsx)(Q.Z,{type:"vertical",style:{margin:"0 8px"}}),(0,e.jsx)(A.Z.Link,{href:"https://kitchen.alipay.com/",children:"kitchen"})]})]}):null},Pn=Lt,Zt=s(30577),H=s.n(Zt),Ft=s(91417),zn,At=(0,w.k)(function(r){var n=r.css,o=r.stylish,t=r.responsive,a=r.token;return n(zn||(zn=c()([`
    display: inline-flex;
    align-items: center;
    font-family: AliPuHui, `,`;
    color: `,`;
    font-size: 22px;
    line-height: 1;
    font-weight: 500;
    text-decoration: none;

    `,`;

    `,` {
      font-size: 18px;
    }

    img {
      margin-inline-end: 10px;
      height: 40px;

      `,` {
        height: 32px;
      }
    }
  `])),a.fontFamily,a.colorText,o.clickableText,t.mobile,t.mobile)}),It=function(){var n=(0,y.bU)(),o=j(function(i){return i.siteData.themeConfig},F()),t=At(),a=t.styles,l=t.cx;return o&&(0,e.jsxs)(y.rU,{className:l(a),to:"base"in n?n.base:"/",children:[(0,e.jsx)("img",{src:o.logo,alt:o.name}),o.name]})},Mn=(0,u.memo)(It),Rt=s(57954),Et=s(46143),Nn=s(23001),Ln,Zn,Wt=(0,w.k)(function(r){var n=r.css,o=r.responsive,t=r.token,a=r.stylish,l=r.prefixCls,i=".".concat(l,"-tabs"),d=16,p=6;return{tabs:n(Ln||(Ln=c()([`
      `,"-tab + ",`-tab {
        margin: `,`px 4px !important;
        padding: 0 12px !important;
      }

      `,`-tab {
        color: `,`;
        transition: background-color 100ms ease-out;

        &:first-child {
          margin: `,"px 4px ",`px 0;
          padding: `,`px 12px !important;
        }

        &:hover {
          color: `,` !important;
          background: `,`;
          border-radius: `,`px;
        }
      }

      `,`-nav {
        margin-bottom: 0;
      }

      `,` {
        display: none;
      }
    `])),i,i,d,i,t.colorTextSecondary,d,d,p,t.colorText,t.colorFillTertiary,t.borderRadius,i,o.mobile),link:n(Zn||(Zn=c()([`
      `,`
    `])),a.resetLinkColor)}}),Gt=function(){var n=Wt(),o=n.styles,t=j(function(i){return i.navData},Nn.X),a=(0,y.TH)(),l=a.pathname.replace("/en-US/","").replace("/","").split("/").shift();return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(Rt.Z,{onChange:function(d){var p;y.m8.push(((p=t.find(function(v){return v.link.replace("/en-US/","").replace("/","")===d}))===null||p===void 0?void 0:p.link)||"/"),setTimeout(function(){window.scrollTo(0,0)},10)},activeKey:l,className:o.tabs,items:t.map(function(i){return{label:i.title,link:i.link,key:i.link.replace("/en-US/","").replace("/","")}})}),(0,e.jsx)(Et.Z,{})]})},Ut=(0,u.memo)(Gt),Fn=s(28906),An=s(90462),In,Rn,En,Wn,Gn,Un=(0,w.k)(function(r){var n=r.token,o=r.responsive,t=r.css,a=r.cx;return{container:t(In||(In=c()([`
      position: relative;

      // TODO: support search for mobile devices
      `,` {
        display: none;
      }
    `])),o.mobile),shortcut:a("site-header-shortcut",t(Rn||(Rn=c()([`
        position: absolute;
        top: 50%;
        inset-inline-end: 11px;
        display: inline-block;
        padding: 4px 8px;
        color: `,`;
        font-size: 12px;
        line-height: 1;
        white-space: nowrap;
        background-color: `,`;
        border-radius: 11px;
        border: 1px solid `,`;
        transform: translateY(-50%);
        transition: all 0.3s;
        pointer-events: none;

        `,` {
          display: none;
        }
      `])),n.colorTextDescription,n.colorFillSecondary,n.colorBorderSecondary,o.mobile)),popover:t(En||(En=c()([`
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      display: flex;
      flex-direction: column;
      width: 540px;
      max-height: 460px;
      margin-top: 18px;
      background-color: `,`;
      border-radius: 8px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 20%);

      &::before {
        content: '';
        position: absolute;
        bottom: 100%;
        inset-inline-end: 100px;
        display: inline-block;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-bottom-color: #fff;
      }

      > section {
        flex: 1;
        min-height: 60px;
        overflow: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        border-radius: inherit;
      }
    `])),n.colorBgElevated),svg:a(t(Wn||(Wn=c()([`
        position: absolute;
        top: 50%;
        margin-top: 1px;
        inset-inline-start: 16px;
        width: 16px;
        color: `,`;
        transform: translateY(-50%);
      `])),n.colorTextPlaceholder)),input:t(Gn||(Gn=c()([`
      width: 280px;
      height: `,`px;
      padding: 0;
      padding-inline-start: 40px;
      padding-inline-end: 12px;
      color: `,`;
      font-size: 14px;
      border: 1px solid `,`;
      border-radius: 20px;
      box-sizing: border-box;
      outline: none;
      transition: all 0.3s;
      background-color: transparent;

      &:focus {
        border-color: `,`;
        background: `,`;

        ~ .site-header-shortcut {
          opacity: 0;
        }
      }

      &::-webkit-input-placeholder {
        color: `,`;
      }
    `])),n.controlHeightLG,n.colorTextSecondary,n.colorBorder,n.colorBorderSecondary,n.colorBgElevated,n.colorTextPlaceholder)}}),Kn=(0,u.forwardRef)(function(r,n){var o=Un(),t=o.styles,a=(0,y.YB)(),l=(0,u.useRef)(!1),i=(0,u.useRef)(null);return(0,u.useImperativeHandle)(n,function(){return i.current}),(0,e.jsx)("input",{className:r.className,onCompositionStart:function(){return l.current=!0},onCompositionEnd:function(p){l.current=!1,r.onChange(p.currentTarget.value)},onFocus:r.onFocus,onBlur:r.onBlur,onKeyDown:function(p){["ArrowDown","ArrowUp"].includes(p.key)&&p.preventDefault(),p.key==="Escape"&&!l.current&&p.currentTarget.blur()},onChange:function(p){setTimeout(function(){l.current||r.onChange(p.target.value)},1)},placeholder:a.formatMessage({id:"header.search.placeholder"}),ref:i})}),Vn,$n,Yn,Kt=(0,w.k)(function(r){var n=r.token,o=r.css;return{modal:o(Vn||(Vn=c()([`
      position: fixed;
      top: 0;
      inset-inline-start: 0;
      z-index: 1000;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
    `]))),mask:o($n||($n=c()([`
      background-color: `,`;
      width: 100%;
      height: 100%;
    `])),n.colorBgMask),content:o(Yn||(Yn=c()([`
      position: absolute;
      top: 60px;
      background-color: `,`;
      width: 500px;
      padding: 12px;
      box-sizing: border-box;
      box-shadow: inset 1px 1px 0 0 hsla(0deg, 0%, 100%, 50%), 0 3px 8px 0 #555a64;
      border-radius: 8px;
      max-height: calc(100% - 120px);
      display: flex;
      flex-direction: column;
    `])),n.colorBgElevated)}}),Vt=function(n){var o=Kt(),t=o.styles;return(0,u.useEffect)(function(){if(n.visible)document.body.style.overflow="hidden";else{var a;document.body.style.overflow="",(a=n.onClose)===null||a===void 0||a.call(n)}},[n.visible]),n.visible?(0,e.jsxs)("div",{className:t.modal,children:[(0,e.jsx)("div",{className:t.mask,onClick:n.onMaskClick}),(0,e.jsx)("div",{className:t.content,children:n.children})]}):null},cn,Xn=/(mac|iphone|ipod|ipad)/i.test(typeof navigator!="undefined"?(cn=navigator)===null||cn===void 0?void 0:cn.platform:""),$t=function(){var n=Un(),o=n.styles,t=(0,u.useState)(!1),a=H()(t,2),l=a[0],i=a[1],d=(0,u.useRef)(null),p=(0,u.useRef)(null),v=(0,u.useState)("\u2318"),b=H()(v,2),S=b[0],m=b[1],h=(0,y.OO)(),f=h.keywords,x=h.setKeywords,E=h.result,G=h.loading,nn=(0,u.useState)(!1),L=H()(nn,2),U=L[0],M=L[1];return(0,u.useEffect)(function(){Xn||m("Ctrl");var k=function(Z){if(((Xn?Z.metaKey:Z.ctrlKey)&&Z.key==="k"||Z.key==="/")&&(Z.preventDefault(),d.current)){var N=d.current.getBoundingClientRect(),Y=N.top,pn=N.bottom,en=N.left,X=N.right,tn=Y>=0&&en>=0&&pn<=window.innerHeight&&X<=window.innerWidth;tn?d.current.focus():(x(""),M(!0),setTimeout(function(){var J;(J=p.current)===null||J===void 0||J.focus()}))}Z.key==="Escape"&&(Z.preventDefault(),M(!1))};return document.addEventListener("keydown",k),function(){return document.removeEventListener("keydown",k)}},[]),(0,e.jsxs)("div",{className:o.container,children:[(0,e.jsx)(Fn.Z,{className:o.svg}),(0,e.jsx)(Kn,{onFocus:function(){return i(!0)},onBlur:function(){setTimeout(function(){i(!1)},1)},onChange:function(K){return x(K)},ref:d,className:o.input}),(0,e.jsxs)("span",{className:o.shortcut,children:[S," K"]}),f.trim()&&l&&(E.length||!G)&&!U&&(0,e.jsx)("div",{className:o.popover,children:(0,e.jsx)("section",{children:(0,e.jsx)(An.Z,{data:E,loading:G})})}),(0,e.jsxs)(Vt,{visible:U,onMaskClick:function(){M(!1)},onClose:function(){return x("")},children:[(0,e.jsxs)("div",{style:{position:"relative"},children:[(0,e.jsx)(Fn.Z,{className:o.svg}),(0,e.jsx)(Kn,{className:o.input,onFocus:function(){return i(!0)},onBlur:function(){setTimeout(function(){i(!1)},1)},onChange:function(K){return x(K)},ref:p})]}),(0,e.jsx)(An.Z,{data:E,loading:G,onItemSelect:function(){M(!1)}})]})]})},Yt=$t,Xt=s(22944),Jt=s(67728),Qt=s(32699),Jn,Qn,qn,_n,ne,ee,qt=(0,w.k)(function(r){var n=r.token,o=r.prefixCls,t=r.cx,a=r.css,l=r.stylish,i=6;return{icon:t("site-burger-icon",a(Jn||(Jn=c()([`
        position: relative;

        &,
        &::before,
        &::after {
          display: inline-block;
          height: 2px;
          background: `,`;

          width: 16px;

          transition: all 150ms ease;
        }

        &::before,
        &::after {
          position: absolute;
          left: 0;

          content: '';
        }

        &::before {
          top: `,`px;
        }

        &::after {
          top: -`,`px;
        }
      `])),n.colorTextSecondary,i,i)),active:a(Qn||(Qn=c()([`
      &::before,
      &::after {
        background: `,`;
      }
      & {
        background: transparent;
      }

      &::before {
        top: 0;
        transform: rotate(-135deg);
      }

      &::after {
        top: 0;
        transform: rotate(135deg);
      }
    `])),n.colorText),container:a(qn||(qn=c()([`
      width: `,`px;
      height: `,`px;
      border-radius: `,`px;
      cursor: pointer;
    `])),n.controlHeight,n.controlHeight,n.borderRadius),drawerRoot:a(_n||(_n=c()([`
      top: `,`px;

      :focus-visible {
        outline: none;
      }

      .`,`-drawer {
        &-mask {
          background: transparent;
          backdrop-filter: blur(7px);
          background: `,`;
        }

        &-content-wrapper {
          box-shadow: none;
        }
      }
    `])),n.headerHeight+1,o,O()(n.colorBgBase).alpha(.5).hex()),drawer:a(ne||(ne=c()([`
      &.`,`-drawer-content {
        background: transparent;
      }
    `])),o),menu:a(ee||(ee=c()([`
      background: transparent;
      border-inline-end: transparent !important;

      .`,"-menu-sub.",`-menu-inline {
        background: `,` !important;
      }
    `])),o,o,O()(n.colorBgLayout).alpha(.8).hex())}}),_t=function(){var n=(0,u.useState)(!1),o=H()(n,2),t=o[0],a=o[1],l=qt(),i=l.styles,d=l.cx,p=j(function(m){return m.navData},F()),v=j(function(m){return m.sidebar},F()),b=j(Bt),S=j(function(m){return m.location.pathname});return(0,e.jsxs)(R.Z,{className:i.container,onClick:function(){a(!t)},children:[(0,e.jsx)("div",{className:d(i.icon,t?i.active:"")}),(0,e.jsx)(Xt.Z,{open:t,placement:"left",closeIcon:null,rootClassName:i.drawerRoot,className:i.drawer,width:"100vw",headerStyle:{display:"none"},bodyStyle:{padding:"24px 0"},children:(0,e.jsx)(Jt.Z,{mode:"inline",selectedKeys:(0,Qt.uniq)([b,"s-".concat(S)]),openKeys:[b],className:i.menu,items:p.map(function(m){return{label:(0,e.jsx)(sn.rU,{to:m.link,children:m.title}),key:m.activePath,children:m.activePath===b&&(v==null?void 0:v.map(function(h){return!h.link&&{label:h.title,type:"group",children:h.children.map(function(f){return{label:(0,e.jsx)(sn.rU,{to:f.link,onClick:function(){a(!1)},children:f.title}),key:"s-".concat(f.link)}})}}))}})})})]})},no=_t,te=s(62442),oe=s(56685),dn=s(38367),eo=function(){var n=j(function(o){var t,a;return(t=o.siteData.themeConfig)===null||t===void 0||(a=t.socialLinks)===null||a===void 0?void 0:a.github});return n&&(0,e.jsx)(oe.Z,{showArrow:!1,title:"Github",children:(0,e.jsx)("a",{href:n,target:"_blank",children:(0,e.jsx)(dn.ZP,{icon:(0,e.jsx)(te.Z,{})})})})},to=eo,re=s(75884),P=s(27345),oo=s(83188),$=s(13238),ae=s(10422),ro=s(57901),ao=s(24047),ie=s.n(ao),le,se,ce,io=(0,w.k)(function(r,n){var o=r.css,t=r.cx,a=r.token;return{item:t("".concat(n,"-item"),o(le||(le=c()([`
      display: block;
      all: unset;
      width: 100%;
      padding: 12px 10px;
      border-radius: 5px;
      box-sizing: inherit;
      user-select: none;
      line-height: 1;
      scroll-margin: 50px;

      font-weight: normal;
      font-family: `,`;
      color: `,`;
      background: transparent;
      &:hover {
        background: `,`;
      }
    `])),a.fontFamily,a.colorText,a.colorFillTertiary)),selected:t("".concat(n,"-item-selected"),o(se||(se=c()([`
      color: `,`;
      background: `,`;
      font-weight: bold;
      &:hover {
        color: `,`;
        background: `,`;
      }
    `])),a.colorPrimaryText,a.colorPrimaryBg,a.colorPrimaryTextHover,a.colorPrimaryBgHover)),active:t("".concat(n,"-item-active"),o(ce||(ce=c()([`
      background: `,`;
    `])),a.colorFillTertiary))}}),lo=["value","label","prefixCls","isSelected","isActive","disabled"],so=(0,u.forwardRef)(function(r,n){var o,t=r.value,a=r.label,l=r.prefixCls,i=r.isSelected,d=r.isActive,p=r.disabled,v=ln()(r,lo),b=io({prefixCls:l,selected:i}),S=b.styles,m=b.cx;return(0,e.jsx)("button",B()(B()({disabled:p,"aria-selected":i,role:"option",tabIndex:-1,className:m(S.item,(o={},ie()(o,S.selected,i),ie()(o,S.active,d),o)),ref:n},v),{},{children:a}),t)}),co=so,de,ue,uo=(0,w.k)(function(r,n){var o=r.css,t=r.stylish,a=r.cx,l=r.token;return{container:a(n,o(de||(de=c()([`
      background: `,`;
      font-size: `,`;
      border: 1px solid `,`;
      box-shadow: `,`;
      border-radius: 8px;
      box-sizing: border-box;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: none;
      padding: 5px;
      outline: 0;
      user-select: none;
      width: 160px;

      &::-webkit-scrollbar {
        display: none;
      }
    `])),l.colorBgElevated,l.fontSize,l.colorBorder,l.boxShadowSecondary)),button:a("".concat(n,"-button"),o(ue||(ue=c()([`
      all: unset;
      font-size: `,`px;
      padding: 8px;
      line-height: 0;
      background: `,`;
      color: `,`;
      border-radius: `,`px;
      cursor: default;
      user-select: none;
      border: 1px solid `,`;
      -webkit-tap-highlight-color: transparent;

      `,`

      &:focus-visible {
        border-color: `,`;
        box-shadow: 0 0 0 2px `,`;
      }
    `])),l.fontSize,l.colorBgContainer,l.colorTextSecondary,l.borderRadius,l.colorBorder,t.buttonDefaultHover,l.colorPrimary,l.colorPrimaryBg))}}),po=function(n){var o=n.options,t=o===void 0?[]:o,a=n.value,l=n.prefixCls,i=n.onChange,d=n.renderValue,p=n.renderItem,v=l!=null?l:"native-select",b=(0,ro.Z)(0,{value:a,onChange:i}),S=H()(b,2),m=S[0],h=S[1],f=uo(v),x=f.styles,E=(0,u.useRef)([]),G=(0,u.useRef)([]),nn=(0,u.useRef)(null),L=(0,u.useRef)(!1),U=(0,u.useRef)(!0),M=(0,u.useRef)(),k=(0,u.useRef)(null),K=(0,u.useState)(!1),Z=H()(K,2),N=Z[0],Y=Z[1],pn=(0,u.useState)(null),en=H()(pn,2),X=en[0],tn=en[1],J=(0,u.useState)(!1),Je=H()(J,2),on=Je[0],Qe=Je[1],cr=(0,u.useState)(0),qe=H()(cr,2),_e=qe[0],hn=qe[1],dr=(0,u.useState)(!1),nt=H()(dr,2),rn=nt[0],et=nt[1],ur=(0,u.useState)(0),tt=H()(ur,2),Sr=tt[0],ot=tt[1],pr=(0,u.useState)(!1),rt=H()(pr,2),at=rt[0],vn=rt[1];N||(_e!==0&&hn(0),on&&Qe(!1),at&&vn(!1));var V=(0,P.YF)({placement:"bottom-start",open:N,onOpenChange:Y,whileElementsMounted:oo.Me,middleware:on?[(0,$.cv)(5),rn?(0,$.uY)({crossAxis:!0,padding:10}):(0,$.RR)({padding:10}),(0,$.dp)({apply:function(C){var T,I,yr=C.availableHeight;Object.assign((T=(I=k.current)===null||I===void 0?void 0:I.style)!==null&&T!==void 0?T:{},{maxHeight:"".concat(yr,"px")})},padding:10})]:[(0,P.aN)({listRef:E,overflowRef:nn,scrollRef:k,index:m,offset:_e,onFallbackChange:Qe,padding:10,minItemsVisible:rn?8:4,referenceOverflowThreshold:20}),(0,$.cv)({crossAxis:-4})]}),xn=V.x,mn=V.y,hr=V.strategy,it=V.refs,W=V.context,kr=V.isPositioned,fn=(0,P.NI)([(0,P.eS)(W,{event:"mousedown"}),(0,P.bQ)(W),(0,P.qs)(W,{role:"listbox"}),(0,P.Rz)(W,{enabled:!on,onChange:hn,overflowRef:nn,scrollRef:k}),(0,P.c0)(W,{listRef:E,activeIndex:X,selectedIndex:m,onNavigate:tn}),(0,P.ox)(W,{listRef:G,activeIndex:X,onMatch:N?tn:h})]),vr=fn.getReferenceProps,xr=fn.getFloatingProps,mr=fn.getItemProps;(0,u.useEffect)(function(){return N?(M.current=setTimeout(function(){L.current=!0},300),function(){clearTimeout(M.current)}):(L.current=!1,U.current=!0,function(){return[]})},[N]);var wr=function(C){on?k.current&&(k.current.scrollTop-=C,(0,ae.flushSync)(function(){var T,I;return ot((T=(I=k.current)===null||I===void 0?void 0:I.scrollTop)!==null&&T!==void 0?T:0)})):(0,ae.flushSync)(function(){return hn(function(T){return T-C})})},Cr=function(){rn&&(clearTimeout(M.current),vn(!0),M.current=setTimeout(function(){vn(!1)},400))},fr=t[m]||{},gr=fr.label;return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("button",B()(B()({ref:it.setReference,className:x.button},vr({onTouchStart:function(){et(!0)},onPointerMove:function(C){var T=C.pointerType;T==="mouse"&&et(!1)}})),{},{children:d?d(m):gr})),(0,e.jsx)(P.ll,{children:N&&(0,e.jsx)(P.y0,{lockScroll:!rn,style:{zIndex:3e3},children:(0,e.jsx)(P.wD,{context:W,modal:!1,initialFocus:-1,children:(0,e.jsx)("div",{ref:it.setFloating,style:{position:hr,top:mn!=null?mn:0,left:xn!=null?xn:0},children:(0,e.jsx)("div",B()(B()({className:x.container,style:{overflowY:"auto"},ref:k},xr({onScroll:function(C){var T=C.currentTarget;ot(T.scrollTop)},onContextMenu:function(C){C.preventDefault()}})),{},{children:t.map(function(z,C){return(0,e.jsx)(co,B()({value:z.value,label:p?p(z,C):z.label,disabled:at,isSelected:C===m,isActive:C===X,ref:function(I){E.current[C]=I,G.current[C]=z.label}},mr({onTouchStart:function(){L.current=!0,U.current=!1},onKeyDown:function(){L.current=!0},onClick:function(){L.current&&(h(C),Y(!1))},onMouseUp:function(){U.current&&(L.current&&(h(C),Y(!1)),clearTimeout(M.current),M.current=setTimeout(function(){L.current=!0}))}})),z.value)})}))})})})})]})},ho=po,pe,vo=function(){return(0,e.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,e.jsx)("path",{d:"M8.218 1.455c3.527.109 6.327 3.018 6.327 6.545 0 3.6-2.945 6.545-6.545 6.545a6.562 6.562 0 0 1-6.036-4h.218c3.6 0 6.545-2.945 6.545-6.545 0-.91-.182-1.745-.509-2.545m0-1.455c-.473 0-.909.218-1.2.618-.29.4-.327.946-.145 1.382.254.655.4 1.31.4 2 0 2.8-2.291 5.09-5.091 5.09h-.218c-.473 0-.91.22-1.2.62-.291.4-.328.945-.146 1.38C1.891 14.074 4.764 16 8 16c4.4 0 8-3.6 8-8a7.972 7.972 0 0 0-7.745-8h-.037Z"})})},xo=function(){return(0,e.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,e.jsx)("path",{d:"M8 13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM8 3a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm7 4a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM3 8a1 1 0 0 1-1 1H1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm9.95 3.536.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-9.9-7.072-.707-.707a1 1 0 0 1 1.414-1.414l.707.707A1 1 0 0 1 3.05 4.464Zm9.9 0a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707Zm-9.9 7.072a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707ZM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"})})},mo=function(){return(0,e.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,e.jsx)("path",{d:"M14.595 8a6.595 6.595 0 1 1-13.19 0 6.595 6.595 0 0 1 13.19 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 2.014v11.972A5.986 5.986 0 0 0 8 2.014Z"})})},fo=re.zo.span(pe||(pe=c()([`
  width: 12px;
`]))),go=function(n){var o=n.icon,t=n.label;return(0,e.jsxs)(g.D,{horizontal:!0,gap:12,align:"center",children:[(0,e.jsxs)(fo,{children:[o," "]}),t]})},_=[{label:"\u8DDF\u968F\u7CFB\u7EDF",icon:(0,e.jsx)(mo,{}),value:"auto"},{label:"\u4EAE\u8272\u6A21\u5F0F",icon:(0,e.jsx)(xo,{}),value:"light"},{label:"\u6697\u8272\u6A21\u5F0F",icon:(0,e.jsx)(vo,{}),value:"dark"}],yo=function(){var n=an(function(o){return o.themeMode});return(0,e.jsx)("span",{children:(0,e.jsx)(ho,{options:_,value:_.findIndex(function(o){return o.value===n}),onChange:function(t){var a=_[t].value;an.setState({themeMode:a})},renderValue:function(t){return _[t].icon},renderItem:function(t){return(0,e.jsx)(go,{label:t.label,icon:t.icon})}})})},he=(0,u.memo)(yo),ve,xe,me,fe,bo=(0,w.k)(function(r){var n=r.css,o=r.responsive,t=r.token;return{header:n(ve||(ve=c()([`
    top: 0;
    max-width: 100vw;
    position: sticky;
    background-color: transparent;
    backdrop-filter: blur(6px);
    z-index: `,`;
    border-bottom: 1px solid `,`;

    grid-area: head;
    align-self: stretch;

    `,` {
      background: `,`;
    }
  `])),t.zIndexPopupBase-50,t.colorSplit,o.mobile,t.colorBgContainer),content:n(xe||(xe=c()([`
    padding: 0 24px;
    height: 64px;

    `,` {
      padding: 0 16px;
    }
  `])),o.mobile),left:n(me||(me=c()([""]))),right:n(fe||(fe=c()([`
    flex: 1;
    display: flex;
    justify-content: space-between;

    &-aside {
      display: flex;
      align-items: center;

      `,` {
        justify-content: center;
        margin: 8px 16px;
        padding-top: 24px;
        border-top: 1px solid `,`;
      }
    }
  `])),o.mobile,t.colorBorder)}}),jo=function(){var n=(0,u.useState)(!1),o=H()(n,2),t=o[0],a=o[1],l=j(function(b){return b.routeMeta.frontmatter},F()),i=(0,q.F)(),d=i.mobile,p=bo(),v=p.styles;return l&&(0,e.jsx)("div",{className:v.header,"data-static":Boolean(l.hero)||void 0,"data-mobile-active":t||void 0,onClick:function(){return a(!1)},children:(0,e.jsx)(g.D,{horizontal:!0,distribution:"space-between",align:"center",width:"auto",className:v.content,children:d?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(g.D,{children:(0,e.jsx)(no,{})}),(0,e.jsx)(g.D,{horizontal:!0,className:v.left,children:(0,e.jsx)(Mn,{})}),(0,e.jsx)(g.D,{children:(0,e.jsx)(he,{})})]}):(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(g.D,{horizontal:!0,className:v.left,children:(0,e.jsx)(Mn,{})}),(0,e.jsx)(g.D,{style:{marginLeft:48,alignSelf:"end"},children:(0,e.jsx)(Ut,{})}),(0,e.jsxs)("section",{className:v.right,children:[(0,e.jsx)("div",{}),(0,e.jsxs)(g.D,{gap:16,horizontal:!0,align:"center",className:"dumi-default-header-right-aside",children:[(0,e.jsx)(Yt,{}),(0,e.jsx)(Ft.Z,{}),(0,e.jsx)(to,{}),(0,e.jsx)(he,{})]})]})]})})})},ge=jo,ye,So=(0,w.k)(function(r){var n=r.css,o=r.token;return{sidebar:n(ye||(ye=c()([`
    grid-area: sidebar;
    overflow: auto;
    position: sticky;
    top: `,`px;
    max-height: calc(100vh - `,`px);
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 52px;
    padding-inline: 16px;
    border-right: 1px solid `,`;

    > dl {
      margin: 0;
      padding: 0;
      line-height: 1;

      > dt {
        margin: 8px 0;
        color: `,`;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: uppercase;
      }

      > dd {
        margin: 0;
        padding: 2px 0;

        > a {
          padding: 6px 12px;
          border-radius: 6px;
          display: block;
          font-size: `,`px;
          line-height: `,`;
          text-decoration: none;
          transition: all 0.1s;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          color: `,`;

          &:hover {
            color: `,`;
            background: `,`;
          }

          &.active {
            color: `,`;
            background: `,`;

            &:hover {
              color: `,`;
              background: `,`;
            }
          }
        }
      }

      // divider line & gap
      + dl {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px dashed `,`;
      }
    }
  `])),o.headerHeight,o.headerHeight,o.colorSplit,o.colorText,o.fontSize,o.lineHeight,o.colorTextSecondary,o.colorText,o.colorFillTertiary,o.colorPrimaryText,o.colorPrimaryBg,o.colorPrimaryTextHover,o.colorPrimaryBgHover,o.colorBorder)}}),ko=function(){var n=j(function(l){return l.sidebar},F()),o=So(),t=o.styles,a=(0,y.TH)();return a.pathname.includes("changelog")?null:n&&(0,e.jsx)("div",{className:t.sidebar,children:n.map(function(l,i){return(0,e.jsxs)("dl",{children:[l.title&&(0,e.jsx)("dt",{children:l.title}),l.children.map(function(d){return(0,e.jsx)("dd",{children:(0,e.jsx)(y.OL,{to:d.link,title:d.title,end:!0,children:d.title})},d.link)})]},String(i))})})},wo=(0,u.memo)(ko),Co=s(7913),To=s(88427),un=s(24779),be=s(14934),je=s(27648),Se,ke,we,Bo=(0,w.k)(function(r){var n=r.token,o=r.prefixCls,t=r.responsive,a=r.css,l=36;return{container:a(Se||(Se=c()([`
      grid-area: toc;
      position: sticky;
      top: 100px;
      width: `,`px;
      margin-inline-end: 24px;
      max-height: 80vh;
      overflow: auto;
      margin-top: 48px;

      `,` {
        z-index: 300;
        top: `,`px;
        margin-top: 0;
        width: 100%;
      }

      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;

      > h4 {
        margin: 0 0 8px;
        color: `,`;
        font-size: 12px;
        line-height: 1;
      }
    `])),n.tocWidth,t.mobile,n.headerHeight+1,n.colorTextDescription),mobileCtn:a(ke||(ke=c()([`
      position: sticky;
      top: `,`px;

      height: `,`px;
      width: 100%;
      z-index: 200;
      background: transparent;
      background: `,`;
    `])),n.headerHeight+1,l,O()(n.colorBgContainer).alpha(.8).css()),expand:a(we||(we=c()([`
      backdrop-filter: blur(6px);
      border-radius: 0;
      border-bottom: 1px solid `,`;

      box-shadow: `,`;
      width: 100%;
      z-index: 201;

      .`,`-collapse-header {
        padding: 8px 16px !important;
      }
    `])),n.colorSplit,n.boxShadowSecondary,o)}}),Ho=function(){var n=(0,y.TH)(),o=(0,u.useState)(),t=H()(o,2),a=t[0],l=t[1],i=(0,y.eL)(),d=Bo(),p=d.styles,v=(0,q.F)(),b=v.mobile,S=(0,u.useMemo)(function(){return i.toc.reduce(function(h,f){if(f.depth===2)h.push(B()({},f));else if(f.depth===3){var x=h[h.length-1];x&&(x.children=x.children||[],x.children.push(B()({},f)))}return h},[])},[i.toc]),m=i.toc.find(function(h){return h.id===a});return((S==null?void 0:S.length)===0?null:b?(0,e.jsx)(un.ZP,{theme:{token:{fontSize:12,sizeStep:3}},children:(0,e.jsx)("div",{className:p.mobileCtn,children:(0,e.jsx)(be.Z,{bordered:!1,ghost:!0,expandIconPosition:"end",expandIcon:function(f){var x=f.isActive;return x?(0,e.jsx)(Co.Z,{}):(0,e.jsx)(To.Z,{})},className:p.expand,children:(0,e.jsx)(be.Z.Panel,{forceRender:!0,header:m?m.title:"\u76EE\u5F55",children:(0,e.jsx)(un.ZP,{theme:{token:{fontSize:14,sizeStep:4}},children:(0,e.jsx)(je.Z,{onChange:function(f){l(f.replace("#",""))},items:S.map(function(h){var f;return{href:"#".concat(h.id),title:n.pathname.includes("changelog")?h.title.replace("@ant-design/pro-components",""):h.title,key:h.id,children:(f=h.children)===null||f===void 0?void 0:f.map(function(x){return{href:"#".concat(x.id),title:x==null?void 0:x.title,key:x.id}})}})})})},"toc")})})}):(0,e.jsxs)("div",{className:p.container,children:[(0,e.jsx)("h4",{children:"\u76EE\u5F55"}),(0,e.jsx)(je.Z,{items:S.map(function(h){var f;return{href:"#".concat(h.id),title:n.pathname.includes("changelog")?h.title.replace("@ant-design/pro-components@","v"):h.title,key:h.id,children:(f=h.children)===null||f===void 0?void 0:f.map(function(x){return{href:"#".concat(x.id),title:x==null?void 0:x.title,key:x.id}})}})})]}))||null},Do=Ho,Oo=s(79908),Po=s(73875),zo=s(874),Mo=s.n(zo),No=s(46616),Lo=s(27508),Ce,Zo=(0,w.k)(function(r){var n=r.css,o=r.token;return n(Ce||(Ce=c()([`
      cursor: pointer;
      &:hover {
        background: `,`;
        border-radius: 4px;
      }
      pre {
        background: none !important;
        padding: 0 !important;
        margin: 0;
      }
      code[class*='language-'] {
        background: none;
      }
    `])),o.colorFillSecondary)}),Fo=function(n){var o=n.children,t=Zo(),a=t.styles,l=t.theme,i=(0,Lo.M)(),d=i.copied,p=i.setCopied;return(0,e.jsx)(oe.Z,{placement:"right",title:d?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(Po.Z,{style:{color:l.colorSuccess}})," \u590D\u5236\u6210\u529F"]}):"\u590D\u5236",children:(0,e.jsx)("div",{className:a,onClick:function(){Mo()(o),p()},children:(0,e.jsx)(No.Z,{language:"javaScript",children:o})})})},Ao=Fo,Io=function(){return(0,e.jsx)("svg",{width:"14px",height:"14px",viewBox:"0 0 14 14",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",children:(0,e.jsx)("path",{d:"M13,0 C13.5522847,-1.01453063e-16 14,0.44771525 14,1 L14,13 C14,13.5522847 13.5522847,14 13,14 L1,14 C0.44771525,14 -4.87476137e-16,13.5522847 0,13 L0,1 C-6.76353751e-17,0.44771525 0.44771525,-4.5365845e-16 1,0 L13,0 Z M11.375,2.625 L2.625,2.625 L2.625,11.375 L7,11.375 L7,4.375 L9.625,4.375 L9.625,11.375 L11.375,11.375 L11.375,2.625 Z",fill:"#C12127"})})},Te,Be,He,Ro=(0,w.k)(function(r){var n=r.css,o=r.token,t=r.stylish;return{title:n(Te||(Te=c()([`
    font-family: monospace;
  `]))),desc:n(Be||(Be=c()([`
    font-size: `,`px;
    line-height: `,`px;
  `])),o.fontSizeLG,o.lineHeightLG),text:n(He||(He=c()([`
    `,`
  `])),t.clickableText)}}),De,Eo=(0,re.zo)(A.Z.Text)(De||(De=c()([`
  width: 100px;
`]))),Oe="https://github.com/arvinxx/antd-style",Wo=(0,u.memo)(function(r){var n=r.title,o=r.description,t=Ro(),a=t.styles,l=t.theme,i=[{label:"\u5F15\u5165\u65B9\u6CD5",import:!0,children:"import { ".concat(n,' } from "antd-style";')},{label:"\u6E90\u7801",icon:(0,e.jsx)(te.Z,{}),children:"\u67E5\u770B\u6E90\u7801",url:"".concat(Oe,"/tree/master/src/").concat(n)},{label:"\u6587\u6863",icon:(0,e.jsx)(Oo.Z,{}),children:"\u7F16\u8F91\u6587\u6863",url:"".concat(Oe,"/tree/master/docs/api/").concat(n)},{label:"\u4EA7\u7269",icon:(0,e.jsx)(Io,{}),children:"antd-style",url:"https://www.npmjs.com/package/antd-style?activeTab=explore"}];return(0,e.jsxs)(g.D,{children:[(0,e.jsx)(A.Z.Title,{className:a.title,children:n}),o&&(0,e.jsx)("div",{children:(0,e.jsx)(A.Z.Text,{type:"secondary",className:a.desc,children:o})}),(0,e.jsx)(g.D,{style:{marginTop:24},gap:12,children:i.map(function(d){return(0,e.jsxs)(g.D,{horizontal:!0,children:[(0,e.jsx)(Eo,{type:"secondary",children:d.label}),d.import?(0,e.jsx)(Ao,{children:d.children}):(0,e.jsx)("a",{href:d.url,target:"_blank",children:(0,e.jsxs)(g.D,{horizontal:!0,align:"center",gap:8,className:a.text,children:[(0,e.jsx)(e.Fragment,{children:d.icon}),(0,e.jsx)(e.Fragment,{children:d.children})]})})]},d.label)})})]})}),Pe,ze,Me,Go=(0,w.k)(function(r){var n=r.css,o=r.responsive,t=r.token;return{layout:n(Pe||(Pe=c()([`
    background-color: `,`;
    background-image: linear-gradient(
      180deg,
      `,` 0%,
      rgba(255, 255, 255, 0) 10%
    );
    display: grid;
    grid-template-columns: `,"px 1fr ",`px;
    grid-template-rows: `,`px auto 1fr 80px;
    grid-template-areas:
      'head head head'
      'sidebar title .'
      'sidebar main toc'
      'sidebar footer footer';
    min-height: 100vh;

    `,` {
      display: flex;
      flex-direction: column;
    }
  `])),t.colorBgLayout,t.colorBgContainer,t.sidebarWidth,t.tocWidth,t.headerHeight,o.mobile),toc:n(ze||(ze=c()([`
    position: sticky;
    top: 100px;
    width: `,`px;
    margin-inline-end: 24px;
    max-height: 80vh;
    overflow: auto;
    margin-top: 48px;

    `,` {
      z-index: 300;
      top: `,`px;
      margin-top: 0;
      width: 100%;
    }

    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;

    > h4 {
      margin: 0 0 8px;
      color: `,`;
      font-size: 12px;
      line-height: 1;
    }
  `])),t.tocWidth,o.mobile,t.headerHeight+1,t.colorTextDescription),content:n(Me||(Me=c()([`
    max-width: `,`px;
    width: 100%;
    margin: 0 24px;


    `,` {
      margin: 0;
    }
  }
  `])),t.contentMaxWidth,o.mobile)}}),Uo=(0,u.memo)(function(){var r=(0,y.pC)(),n=(0,q.F)(),o=n.mobile,t=j(function(v){return v.routeMeta.frontmatter},F()),a=j(wt),l=Go(),i=l.styles,d=l.theme,p=(0,y.TH)();return(0,u.useEffect)(function(){requestAnimationFrame(function(){window.scrollTo(0,0)})},[p.pathname]),(0,e.jsxs)("div",{className:i.layout,style:p.pathname.includes("changelog")?{gridTemplateColumns:"0 1fr 300px"}:{},children:[(0,e.jsx)(ge,{}),(0,e.jsx)(Do,{}),o?null:(0,e.jsx)(wo,{}),a?(0,e.jsx)(g.D,{style:{gridArea:"title"},children:(0,e.jsx)(R.Z,{children:(0,e.jsx)(g.D,{style:{maxWidth:d.contentMaxWidth,width:"100%"},children:(0,e.jsx)(g.D,{padding:"0 48px",children:(0,e.jsx)(Wo,{title:t.title,description:t.description})})})})}):null,(0,e.jsx)(g.D,{style:{zIndex:10,gridArea:"main",minWidth:0,margin:o?0:24,marginBottom:o?0:48},children:(0,e.jsx)(R.Z,{width:"100%",children:(0,e.jsx)(g.D,{className:i.content,children:(0,e.jsx)(g.D,{horizontal:!0,children:(0,e.jsx)(Mt,{children:r})})})})}),(0,e.jsx)(Pn,{})]})}),Ko=Uo,Vo=s(77172),$o=s(42346),Ne,Le,Ze,Fe,Ae,Ie,Re,Yo=(0,w.k)(function(r){var n=r.token,o=r.responsive,t=r.css,a=r.stylish,l=r.isDarkMode;return{container:t(Ne||(Ne=c()([`
    max-width: `,`px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row dense;
    grid-auto-rows: 24px;
    gap: 16px;

    margin: 0 16px;

    `,`
  `])),n.contentMaxWidth,o({mobile:t(Le||(Le=c()([`
        flex-direction: column;
        display: flex;
      `]))),laptop:{gridTemplateColumns:"repeat(2, 1fr)"}})),cell:t(Ze||(Ze=c()([`
    z-index: 1;
    padding: 24px;
    border-radius: 24px;
    background: linear-gradient(135deg, `,", ",`);
    position: relative;

    h3 {
      font-size: 20px;
      color: `,`;
    }
    p {
      color: `,`;

      quotient {
        color: `,`;
        display: block;
        margin: 12px 0;
        padding-left: 12px;
        position: relative;
        &:before {
          position: absolute;
          content: '';
          left: 0;
          display: block;
          border-radius: 2px;
          width: 4px;
          height: 100%;
          background: `,`;
        }
      }
    }
  `])),n.colorFillContent,n.colorFillQuaternary,n.colorText,n.colorTextSecondary,n.colorTextDescription,l?n.colorPrimary:n.colorPrimaryBgHover),imgContainer:t(Fe||(Fe=c()([`
    background: `,`;
    border-radius: 8px;
    opacity: 0.8;

    &[image-style='primary'] {
      background: linear-gradient(135deg, `,", ",`);
    }

    &[image-style='light'] {
      background: `,`;
    }

    &[image-style='soon'] {
      opacity: 0.5;
      background: linear-gradient(
        135deg,
        `,`,
        `,` 50%,
        `,`
      );
    }
  `])),n.colorFillContent,n.gradientColor1,n.gradientColor2,n.colorBgContainer,O()(n.gradientColor2).alpha(.3).hex(),O()(n.gradientColor2).alpha(.3).hex(),O()(n.gradientColor1).alpha(.3).hex()),img:t(Ae||(Ae=c()([`
    width: 20px;
    height: 20px;
    color: `,`;
  `])),n.colorWhite),link:t(Ie||(Ie=c()([`
    margin-top: 24px;

    a {
      `,`;

      color: `,`;
      &:hover {
        color: `,`;
      }
    }
  `])),a.resetLinkColor,n.colorTextDescription,n.colorPrimaryHover),blur:t(Re||(Re=c()([`
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    `,`;
    scale: 2;
    opacity: 0.05;
    `,` {
      display: none;
    }
  `])),a.heroBlurBall,o.mobile)}}),Xo=function(){var n=j(Tt,Nn.X),o=Yo(),t=o.styles,a=o.cx,l=o.theme;return Boolean(n==null?void 0:n.length)?(0,e.jsx)("div",{className:t.container,children:n.map(function(i){var d=i.title,p=i.description,v=i.avatar,b=i.link,S=i.imageStyle,m=i.row,h=i.column,f=i.center;return(0,e.jsxs)("div",{className:a(t.cell),style:{gridRow:"span ".concat(m||7),gridColumn:"span ".concat(h||1)},children:[v&&(0,e.jsx)(R.Z,{padding:4,width:24,height:24,"image-style":S,className:a(t.imgContainer),children:(0,e.jsx)("img",{className:t.img,src:v,alt:d})}),d&&(0,e.jsxs)(g.D,{as:"h3",horizontal:!0,gap:8,align:"center",children:[d,S==="soon"?(0,e.jsx)($o.Z,{color:l.isDarkMode?"pink-inverse":"cyan-inverse",children:"SOON"}):null]}),p&&(0,e.jsx)("p",{dangerouslySetInnerHTML:{__html:p}})," ",b&&(0,e.jsx)("div",{className:t.link,children:(0,e.jsxs)(y.rU,{to:b,children:["\u7ACB\u5373\u4E86\u89E3 ",(0,e.jsx)(Vo.Z,{})]})}),f&&(0,e.jsx)("div",{className:t.blur})]},d)})}):null},Jo=Xo,Ee,Qo=(0,w.k)(function(r){var n=r.css,o=r.stylish,t=r.isDarkMode;return{button:n(Ee||(Ee=c()([`
      border: none;

      `,`
      `,`

      background-size: 200% 100%;

      &:hover {
        animation: none;
      }
    `])),o.heroButtonGradient,o.heroGradientFlow)}}),qo=function(n){var o=n.children,t=Qo(),a=t.styles;return(0,e.jsx)(dn.ZP,{size:"large",shape:"round",type:"primary",className:a.button,children:o})},_o=qo,We,Ge,Ue,Ke,Ve,$e,Ye,nr=(0,w.k)(function(r){var n=r.css,o=r.responsive,t=r.token,a=r.stylish,l=r.isDarkMode;return{container:n(We||(We=c()([`
    position: relative;
    text-align: center;
    box-sizing: border-box;

    + * {
      position: relative;
    }

    > p {
      margin: 32px;
      color: `,`;
      font-size: 20px;
      line-height: 1.6;

      `,`
    }
  `])),t.colorTextSecondary,o({mobile:{fontSize:16}})),titleContainer:n(Ge||(Ge=c()([`
    position: relative;
  `]))),title:n(Ue||(Ue=c()([`
    font-size: 68px;
    z-index: 10;
    color: transparent;
    margin: 0;
    font-family: AliPuHui, `,`;

    `,`

    b {
      position: relative;
      z-index: 5;
      `,`;
      `,`

      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `])),t.fontFamily,o({mobile:{fontSize:40}}),a.heroGradient,a.heroGradientFlow),titleShadow:n(Ke||(Ke=c()([`
    position: absolute;
    z-index: 0;
    color: `,`;

    top: 0;
    left: 0;
    font-size: 68px;
    font-family: AliPuHui, `,`;
    font-weight: bold;
    `,`

    `,`

    b {
      color: transparent;
    }
  `])),l?t.colorWhite:t.colorTextBase,t.fontFamily,o({mobile:{fontSize:40}}),a.heroTextShadow),desc:n(Ve||(Ve=c()([`
    font-size: `,`px;
    color: `,`;

    `,` {
      font-size: `,`px;
      margin: 24px 16px;
    }
  `])),t.fontSizeHeading3,t.colorTextSecondary,o.mobile,t.fontSizeHeading5),actions:n($e||($e=c()([`
    margin-top: 48px;
    display: flex;
    justify-content: center;

    `,`
  `])),o({mobile:{marginTop:24}})),canvas:n(Ye||(Ye=c()([`
    z-index: 10;
    pointer-events: none;
    position: absolute;
    top: -250px;
    left: 50%;
    transform: translateX(-50%) scale(1.5);
    width: 600px;
    height: 400px;
    opacity: 0.2;
    `,`

    `,` {
      width: 200px;
      height: 300px;
    }
  `])),a.heroBlurBall,o.mobile)}}),er=function(){var n,o=j(function(d){return d.routeMeta.frontmatter},F()),t=nr(),a=t.styles,l=t.cx;if(!("hero"in o))return null;var i=o.hero;return(0,e.jsxs)(g.D,{horizontal:!0,distribution:"center",className:a.container,children:[(0,e.jsx)("div",{className:a.canvas}),(0,e.jsxs)(R.Z,{children:[o.hero.title&&(0,e.jsxs)("div",{className:a.titleContainer,children:[(0,e.jsx)("h1",{className:a.title,dangerouslySetInnerHTML:{__html:i.title}}),(0,e.jsx)("div",{className:l(a.titleShadow),dangerouslySetInnerHTML:{__html:i.title}})]}),i.description&&(0,e.jsx)("p",{className:a.desc,dangerouslySetInnerHTML:{__html:i.description}}),Boolean((n=o.hero.actions)===null||n===void 0?void 0:n.length)&&(0,e.jsx)(un.ZP,{theme:{token:{fontSize:16,controlHeight:40}},children:(0,e.jsx)(g.D,{horizontal:!0,gap:24,className:a.actions,children:o.hero.actions.map(function(d,p){var v=d.text,b=d.link;return(0,e.jsx)(y.rU,{to:b,children:p===0?(0,e.jsx)(_o,{children:v}):(0,e.jsx)(dn.ZP,{size:"large",shape:"round",type:"default",children:v})},v)})})})]})]})},tr=er,or=(0,u.memo)(function(){return(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)(g.D,{align:"center",gap:80,children:[(0,e.jsx)(ge,{}),(0,e.jsx)(tr,{}),(0,e.jsx)(Jo,{}),(0,e.jsx)(Pn,{})]})})}),rr=or,ar=s(1413),Xe,ir=(0,ar.v)(Xe||(Xe=c()([`
  body {
    margin: 0;
    padding: 0;
    background-color: `,`;
  }

  @font-face {
    font-family: AliPuHui;
    font-weight: normal;
    src: url('//at.alicdn.com/t/webfont_exesdog9toj.woff2') format('woff2'),
    url('//at.alicdn.com/t/webfont_exesdog9toj.woff') format('woff'),
    url('//at.alicdn.com/t/webfont_exesdog9toj.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: AliPuHui;
    font-weight: bold;
    src: url('https://at.alicdn.com/wf/webfont/exMpJIukiCms/Gsw2PSKrftc1yNWMNlXgw.woff2') format('woff2'),
    url('https://at.alicdn.com/wf/webfont/exMpJIukiCms/vtu73by4O2gEBcvBuLgeu.woff') format('woff');
    font-display: swap;
  }
`])),function(r){return r.theme.colorBgLayout}),lr=(0,u.memo)(function(){var r=(0,y.YB)(),n=(0,y.TH)(),o=n.hash,t=j(function(i){return i.routeMeta.frontmatter},F()),a=j(Ct),l=j(function(i){return i.siteData.loading});return(0,u.useEffect)(function(){var i=o.replace("#","");i&&setTimeout(function(){var d=document.getElementById(decodeURIComponent(i));d&&(0,lt.Z)(d.offsetTop-80,{maxDuration:300})},1)},[l,o]),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(y.ql,{children:[(0,e.jsx)("html",{lang:r.locale.replace(/-.+$/,"")}),(0,e.jsx)("title",{children:t.title?"".concat(t.title," - Pro Components"):"Pro Components"}),t.title&&(0,e.jsx)("meta",{property:"og:title",content:t.title}),t.description&&(0,e.jsx)("meta",{name:"description",content:t.description}),t.description&&(0,e.jsx)("meta",{property:"og:description",content:t.description}),t.keywords&&(0,e.jsx)("meta",{name:"keywords",content:t.keywords.join(",")}),t.keywords&&(0,e.jsx)("meta",{property:"og:keywords",content:t.keywords.join(",")})]}),a?(0,e.jsx)(rr,{}):(0,e.jsx)(Ko,{})]})}),sr=function(){return(0,e.jsx)(u.StrictMode,{children:(0,e.jsxs)(jt,{children:[(0,e.jsx)(Ot,{}),(0,e.jsx)(ir,{}),(0,e.jsx)(lr,{})]})})}}}]);
