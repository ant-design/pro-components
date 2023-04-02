"use strict";(self.webpackChunkpro_components=self.webpackChunkpro_components||[]).push([[367],{47354:function(Rr,fn,c){c.r(fn),c.d(fn,{default:function(){return Hr}});var vt=c(94161),y=c(59543),gt=c(3341),I=c.n(gt),u=c(50959),ft=c(67191),b=c(73810),yn=c(80451),bn=c(7453),rn=(0,yn.Ue)()((0,bn.tJ)(function(){return{themeMode:"auto"}},{name:"ANTD_STYLE_DOC_STORE"})),yt=c(57213),O=c.n(yt),bt=c(84700),Wr=null,D=["#001736","#002653","#003572","#004593","#0055b6","#0066dc","#1677ff","#257fff","#3187ff","#3c8fff","#4796ff"],jt=function(t,n){var o=bt.Z.darkAlgorithm(t,n);return O()(O()({},o),{},{colorBgLayout:"hsl(218,22%,7%)",colorBgContainer:"hsl(216,18%,11%)",colorBgElevated:"hsl(216,13%,15%)",colorPrimaryBg:D[1],colorPrimaryBgHover:D[2],colorPrimaryBorder:D[3],colorPrimaryBorderHover:D[4],colorPrimaryHover:D[5],colorPrimary:D[6],colorPrimaryActive:D[7],colorPrimaryTextHover:D[8],colorPrimaryText:D[9],colorPrimaryTextActive:D[10],colorLink:D[6],colorLinkHover:D[5],colorLinkActive:D[7]})},St=function(t,n){var o=["#ffffff","#d9ebfb","#b4d6f7","#90c0f5","#6caaf5","#4792f8","#1677ff","#0568e0","#005ac0","#004ca1","#003e84"];return O()(O()({},n),{},{colorBgLayout:"hsl(220,23%,97%)",colorPrimaryBg:o[1],colorPrimaryBgHover:o[2],colorPrimaryBorder:o[3],colorPrimaryBorderHover:o[4],colorPrimaryHover:o[5],colorPrimary:o[6],colorPrimaryActive:o[7],colorPrimaryTextHover:o[8],colorPrimaryText:o[9],colorPrimaryTextActive:o[10]})},kt=function(t){var n={token:{colorTextBase:"#3d3e40"},algorithm:St};return t==="dark"&&(n.token={colorTextBase:"#c7ddff"},n.algorithm=jt),n},wt=c(92935),s=c.n(wt),Ct=c(48453),N=c.n(Ct),jn,Sn,kn,wn,Cn,Tn,Bn,On,Tt=function(t){var n=t.css,o=t.token,i=t.isDarkMode;return{clickableText:n(jn||(jn=s()([`
      cursor: pointer;
      color: `,`;

      &:hover {
        color: `,`;
      }
    `])),o.colorTextSecondary,o.colorText),resetLinkColor:n(Sn||(Sn=s()([`
      color: inherit;

      &:hover,
      &:active {
        color: inherit;
      }
    `]))),heroButtonGradient:n(kn||(kn=s()([`
      background: linear-gradient(90deg, `," 0%, ",` 100%);
    `])),o.gradientColor1,o.gradientColor2),heroGradient:n(wn||(wn=s()([`
      background-image: `,`;
      background-size: 300% 300%;
    `])),o.gradientHeroBgG),heroGradientFlow:n(Cn||(Cn=s()([`
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
    `]))),heroTextShadow:n(Tn||(Tn=s()([`
      text-shadow: 0 8px 20px `,`,
        0 8px 60px `,`,
        0 8px 80px
          `,`;
    `])),N()(o.gradientColor2).alpha(.2).hex(),N()(o.gradientColor3).alpha(.2).hex(),N()(o.cyan).alpha(i?.2:.4).hex()),heroBlurBall:n(Bn||(Bn=s()([`
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
    `])),o.gradientColor3,o.gradientColor1,o.red,o.cyan),iconGradientDefault:n(On||(On=s()([`
      radial-gradient(
        100% 100% at 50% 0,
        `,` 0,
        `,` 100%
      )`])),N()(o.colorSolid).alpha(.2).hex(),N()(o.colorSolid).alpha(.1).hex())}},Bt=function(t){var n=t.isDarkMode,o=t.token,i=o.blue,a=n?o.pink:o.cyan,l=o.purple,d=n?o.colorWhite:"#000";return{headerHeight:64,sidebarWidth:240,tocWidth:176,contentMaxWidth:1152,colorSolid:d,gradientColor1:i,gradientColor2:a,gradientColor3:l,gradientHeroBgG:"radial-gradient(at 80% 20%, ".concat(i," 0%, ").concat(a," 80%, ").concat(l," 130%)"),gradientIconDefault:`radial-gradient(
        100% 100% at 50% 0,
        `.concat(N()(d).alpha(.2).hex(),` 0,
        `).concat(N()(d).alpha(n?.1:.4).hex(),` 100%
      )`)}},e=c(11527),Ot=function(r){var t=r.children,n=rn(function(o){return o.themeMode});return(0,u.useEffect)(function(){if(n==="dark"&&document.body.style.setProperty("--main-bg-color","hsl(218,22%,7%)"),n==="light"&&document.body.style.setProperty("--main-bg-color","hsl(220,23%,97%)"),n==="auto"){var o=window.matchMedia("(prefers-color-scheme: light)");o.matches?document.body.style.setProperty("--main-bg-color","hsl(220,23%,97%)"):document.body.style.setProperty("--main-bg-color","hsl(218,22%,7%)")}},[n]),(0,e.jsx)(b.V9,{prefix:"site",children:(0,e.jsx)(b.f6,{prefixCls:"site",themeMode:n,theme:kt,customStylish:Tt,customToken:Bt,children:(0,e.jsx)(ft.Z,{children:t})})})},Ht=c(12342),an=c.n(Ht),ln=c(15779),Dt={siteData:{setLoading:void 0,loading:!0,pkg:{},components:{},demos:{},locales:[],entryExports:{},themeConfig:{}},sidebar:[],navData:[],location:{pathname:"",state:"",search:"",hash:"",key:""},routeMeta:{toc:[],texts:[],tabs:void 0,frontmatter:{}}},j=(0,yn.Ue)()((0,bn.mW)(function(){return O()({},Dt)},{name:"dumi-site-store"})),zt=function(t){return t.location.pathname.startsWith("/api")},Mt=function(t){return!!t.routeMeta.frontmatter.hero},Ft=function(t){return t.routeMeta.frontmatter.features},Pt=function(t){if(t.location.pathname==="/")return"/";var n=t.navData.filter(function(o){return o.link!=="/"}).find(function(o){return t.location.pathname.startsWith(o.activePath)});return(n==null?void 0:n.activePath)||""},Nt=["setLoading"],Zt=["setLoading"],At=(0,u.memo)(function(){var r=(0,y.WF)(),t=(0,y.tx)(),n=(0,y.eL)(),o=(0,y.zh)(),i=(0,y.OK)(),a=(0,ln.TH)();return(0,u.useEffect)(function(){var l=r.setLoading,d=an()(r,Nt),p=j.getState(),h=p.siteData,f=h.setLoading,k=an()(h,Zt);I()(d,k)||j.setState({siteData:r})},[r]),(0,u.useEffect)(function(){j.setState({sidebar:t})},[t]),(0,u.useEffect)(function(){j.setState({routeMeta:o||n})},[n,n]),(0,u.useEffect)(function(){j.setState({navData:i})},[i]),(0,u.useEffect)(function(){j.setState({location:a})},[a]),null}),S=c(99143),E=c(66376),Hn,It=(0,b.kc)(function(r){var t=r.token,n=r.responsive,o=r.isDarkMode,i=r.css;return{content:i(Hn||(Hn=s()([`
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
  `])),t.colorBgContainer,t.boxShadow,n.mobile,t.colorTextSecondary,t.colorText,t.colorLink,t.colorLinkHover,t.colorLinkActive,o?.8:1,t.colorPrimaryText,t.colorPrimaryBg,t.colorFillTertiary,t.colorBorderSecondary,t.colorTextDescription,t.colorBorder,t.colorText,t.colorTextTertiary)}}),Lt=function(t){var n=t.children,o=(0,y.tx)(),i=It(),a=i.styles,l=i.cx;return(0,e.jsx)("div",{className:l("dumi-default-content",a.content),"data-no-sidebar":!o||void 0,children:n})},Et=Lt,Rt=c(67887),Wt=c(81765),Dn=c(74268),Gt=c(27439),Ut=c(63332),Kt=c(40253),Vt=c(24053),q=c(12731),Xt=c(75207),zn,Mn,$t=(0,b.kc)(function(r){var t=r.css,n=r.responsive,o=r.token,i="rc-footer";return{container:t(zn||(zn=s()([`
      grid-area: footer;
      border-top: 1px solid `,`;
      color: `,`;
      text-align: center;
      align-self: stretch;
      `,` {
        border: none;
        flex-direction: column;
      }
    `])),o.colorSplit,o.colorTextDescription,n.mobile),footer:t(Mn||(Mn=s()([`
      color: `,`;
      font-size: 14px;
      line-height: 1.5;
      background-color: `,`;
      &.`,` {
        a {
          color: `,`;
          text-decoration: none;
          transition: all 0.3s;
          &:hover {
            color: `,`;
          }
        }
      }
      .`,` {
        &-container {
          width: 100%;
          max-width: `,`px;
          margin: auto;
          padding: 60px 0 20px;
        }
        &-columns {
          display: flex;
          justify-content: space-around;
        }
        &-column {
          //margin-bottom: 60px;
          h2 {
            position: relative;
            margin: 0 auto;
            color: `,`;
            font-weight: 500;
            font-size: 16px;
          }
          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 22px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.5em;
            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }
        }
        &-item {
          margin: 12px 0;
          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 16px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.4em;
            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }
          &-separator {
            margin: 0 0.3em;
          }
        }
        &-bottom {
          &-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px 0;
            font-size: 16px;
            line-height: 32px;
            text-align: center;
            border-top: 1px solid `,`;
          }
        }
        &-light {
          color: rgba(0, 0, 0, 0.85);
          background-color: transparent;
          h2,
          a {
            color: rgba(0, 0, 0, 0.85);
          }
        }
        &-light &-bottom-container {
          border-top-color: #e8e8e8;
        }
        &-light &-item-separator,
        &-light &-item-description {
          color: rgba(0, 0, 0, 0.45);
        }
      }
      `,` {
        .`,` {
          text-align: center;
          &-container {
            padding: 40px 0;
          }
          &-columns {
            display: block;
          }
          &-column {
            display: block;
            margin-bottom: 40px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    `])),o.colorTextSecondary,o.colorBgLayout,i,o.colorTextTertiary,o.colorLinkHover,i,o.contentMaxWidth,o.colorText,o.colorBorderSecondary,n.mobile,i)}}),Yt=function(t){var n=t.columns,o=t.bottom,i=t.theme,a=$t(),l=a.styles;return(0,e.jsx)("div",{className:l.container,children:(0,e.jsx)(Xt.Z,{theme:i,className:l.footer,columns:n,bottom:o})})},Jt=Yt,Fn,Pn,Qt=(0,b.kc)(function(r){var t=r.css,n=r.responsive,o=r.token,i="rc-footer";return{container:t(Fn||(Fn=s()([`
      grid-area: footer;
      border-top: 1px solid `,`;
      color: `,`;
      text-align: center;
      align-self: stretch;
      `,` {
        border: none;
        flex-direction: column;
      }
    `])),o.colorSplit,o.colorTextDescription,n.mobile),footer:t(Pn||(Pn=s()([`
      color: `,`;
      font-size: 14px;
      line-height: 1.5;
      background-color: `,`;
      &.`,` {
        a {
          color: `,`;
          text-decoration: none;
          transition: all 0.3s;
          &:hover {
            color: `,`;
          }
        }
      }
      .`,` {
        &-container {
          width: 100%;
          max-width: `,`px;
          margin: auto;
          padding: 60px 0 20px;
        }
        &-columns {
          display: flex;
          justify-content: space-around;
        }
        &-column {
          //margin-bottom: 60px;
          h2 {
            position: relative;
            margin: 0 auto;
            color: `,`;
            font-weight: 500;
            font-size: 16px;
          }
          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 22px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.5em;
            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }
        }
        &-item {
          margin: 12px 0;
          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 16px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.4em;
            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }
          &-separator {
            margin: 0 0.3em;
          }
        }
        &-bottom {
          &-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px 0;
            font-size: 16px;
            line-height: 32px;
            text-align: center;
            border-top: 1px solid `,`;
          }
        }
        &-light {
          color: rgba(0, 0, 0, 0.85);
          background-color: transparent;
          h2,
          a {
            color: rgba(0, 0, 0, 0.85);
          }
        }
        &-light &-bottom-container {
          border-top-color: #e8e8e8;
        }
        &-light &-item-separator,
        &-light &-item-description {
          color: rgba(0, 0, 0, 0.45);
        }
      }
      `,` {
        .`,` {
          text-align: center;
          &-container {
            padding: 40px 0;
          }
          &-columns {
            display: block;
          }
          &-column {
            display: block;
            margin-bottom: 40px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    `])),o.colorTextSecondary,o.colorBgLayout,i,o.colorTextTertiary,o.colorLinkHover,i,o.contentMaxWidth,o.colorText,o.colorBorderSecondary,n.mobile,i)}}),qt=function(){var t=j(function(p){return p.siteData}),n=t.themeConfig,o=Qt(),i=o.styles,a=o.theme,l=(0,q.F)(),d=l.mobile;return n.footer?(0,e.jsx)(Jt,{theme:a.appearance,columns:[{title:"\u76F8\u5173\u8D44\u6E90",items:[{title:"Ant Design Pro",url:"https://pro.ant.design",openExternal:!0},{title:"Ant Design Pro Components",url:"https://procomponents.ant.design",openExternal:!0},{title:"Umi",description:"React \u5E94\u7528\u5F00\u53D1\u6846\u67B6",url:"https://umijs.org",openExternal:!0},{title:"Dumi",description:"\u7EC4\u4EF6/\u6587\u6863\u7814\u53D1\u5DE5\u5177",url:"https://d.umijs.org",openExternal:!0},{title:"qiankun",description:"\u5FAE\u524D\u7AEF\u6846\u67B6",url:"https://qiankun.umijs.org",openExternal:!0}]},{title:"\u793E\u533A",items:[{icon:(0,e.jsx)(Rt.Z,{}),title:"Medium",url:"http://medium.com/ant-design/",openExternal:!0},{icon:(0,e.jsx)(Wt.Z,{style:{color:"#1DA1F2"}}),title:"Twitter",url:"http://twitter.com/antdesignui",openExternal:!0},{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",alt:"yuque"}),title:"Ant Design \u8BED\u96C0\u4E13\u680F",url:"https://yuque.com/ant-design/ant-design",openExternal:!0},{icon:(0,e.jsx)(Dn.Z,{style:{color:"#056de8"}}),title:"Ant Design \u77E5\u4E4E\u4E13\u680F",url:"https://www.zhihu.com/column/c_1564262000561106944",openExternal:!0},{icon:(0,e.jsx)(Dn.Z,{style:{color:"#056de8"}}),title:"\u4F53\u9A8C\u79D1\u6280\u4E13\u680F",url:"http://zhuanlan.zhihu.com/xtech",openExternal:!0},{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png",alt:"seeconf"}),title:"SEE Conf",description:"SEE Conf-\u8682\u8681\u4F53\u9A8C\u79D1\u6280\u5927\u4F1A",url:"https://seeconf.antfin.com/",openExternal:!0}]},{title:"\u5E2E\u52A9",items:[{icon:(0,e.jsx)(Gt.Z,{}),title:"GitHub",url:"https://github.com/ant-design/antd-style",openExternal:!0},{icon:(0,e.jsx)(Ut.Z,{}),title:"\u66F4\u65B0\u65E5\u5FD7",url:"/changelog"},{icon:(0,e.jsx)(Kt.Z,{}),title:"\u8BA8\u8BBA",url:"https://github.com/ant-design/antd-style/issues",openExternal:!0}]},{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",alt:"more products"}),title:"\u66F4\u591A\u4EA7\u54C1",items:[{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",alt:"yuque"}),title:"\u8BED\u96C0",url:"https://yuque.com",description:"\u77E5\u8BC6\u521B\u4F5C\u4E0E\u5206\u4EAB\u5DE5\u5177",openExternal:!0},{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png",alt:"AntV"}),title:"AntV",url:"https://antv.vision",description:"\u6570\u636E\u53EF\u89C6\u5316\u89E3\u51B3\u65B9\u6848",openExternal:!0},{icon:(0,e.jsx)("img",{src:"https://www.eggjs.org/logo.svg",alt:"Egg"}),title:"Egg",url:"https://eggjs.org",description:"\u4F01\u4E1A\u7EA7 Node.js \u6846\u67B6",openExternal:!0},{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico",alt:"kitchen"}),title:"Kitchen",description:"Sketch \u5DE5\u5177\u96C6",url:"https://kitchen.alipay.com",openExternal:!0},{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",alt:"xtech"}),title:"\u8682\u8681\u4F53\u9A8C\u79D1\u6280",url:"https://xtech.antfin.com/",openExternal:!0}]}],bottom:d?(0,e.jsxs)(E.Z,{className:i.container,children:["Copyright \xA9 2022-",new Date().getFullYear(),(0,e.jsx)(S.D,{align:"center",horizontal:!0,children:"Made with \u2764\uFE0F by \u8682\u8681\u96C6\u56E2 - AFX & \u6570\u5B57\u79D1\u6280"})]}):(0,e.jsxs)(E.Z,{horizontal:!0,children:["Copyright \xA9 2022-",new Date().getFullYear()," ",(0,e.jsx)(Vt.Z,{type:"vertical"}),"Made with \u2764\uFE0F by \u8682\u8681\u96C6\u56E2 - AFX & \u6570\u5B57\u79D1\u6280"]})}):null},Nn=qt,_t=c(54306),H=c.n(_t),no=c(49688),Zn,eo=(0,b.kc)(function(r){var t=r.css,n=r.stylish,o=r.responsive,i=r.token;return t(Zn||(Zn=s()([`
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
  `])),i.fontFamily,i.colorText,n.clickableText,o.mobile,o.mobile)}),to=function(){var t=(0,y.bU)(),n=j(function(l){return l.siteData.themeConfig},I()),o=eo(),i=o.styles,a=o.cx;return n&&(0,e.jsxs)(y.rU,{className:a(i),to:"base"in t?t.base:"/",children:[(0,e.jsx)("img",{src:n.logo,alt:n.name}),n.name]})},An=(0,u.memo)(to),oo=c(79649),ro=c(69612),In=c(3732),Ln,En,io=(0,b.kc)(function(r){var t=r.css,n=r.responsive,o=r.token,i=r.stylish,a=r.prefixCls,l=".".concat(a,"-tabs"),d=16,p=6;return{tabs:t(Ln||(Ln=s()([`
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
    `])),l,l,d,l,o.colorTextSecondary,d,d,p,o.colorText,o.colorFillTertiary,o.borderRadius,l,n.mobile),link:t(En||(En=s()([`
      `,`
    `])),i.resetLinkColor)}}),ao=function(){var t=io(),n=t.styles,o=j(function(l){return l.navData},In.X),i=(0,y.TH)(),a=i.pathname.replace("/en-US/","").replace("/","").split("/").shift();return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(oo.Z,{onChange:function(d){var p;y.m8.push(((p=o.find(function(h){return h.link.replace("/en-US/","").replace("/","")===d}))===null||p===void 0?void 0:p.link)||"/"),setTimeout(function(){window.scrollTo(0,0)},10)},activeKey:a,className:n.tabs,items:o.map(function(l){return{label:l.title,link:l.link,key:l.link.replace("/en-US/","").replace("/","")}})}),(0,e.jsx)(ro.Z,{})]})},lo=(0,u.memo)(ao),Rn=c(15055),Wn=c(80337),Gn,Un,Kn,Vn,Xn,$n=(0,b.kc)(function(r){var t=r.token,n=r.responsive,o=r.css,i=r.cx;return{container:o(Gn||(Gn=s()([`
      position: relative;

      // TODO: support search for mobile devices
      `,` {
        display: none;
      }
    `])),n.mobile),shortcut:i("site-header-shortcut",o(Un||(Un=s()([`
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
      `])),t.colorTextDescription,t.colorFillSecondary,t.colorBorderSecondary,n.mobile)),popover:o(Kn||(Kn=s()([`
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
    `])),t.colorBgElevated),svg:i(o(Vn||(Vn=s()([`
        position: absolute;
        top: 50%;
        margin-top: 1px;
        inset-inline-start: 16px;
        width: 16px;
        color: `,`;
        transform: translateY(-50%);
      `])),t.colorTextPlaceholder)),input:o(Xn||(Xn=s()([`
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
    `])),t.controlHeightLG,t.colorTextSecondary,t.colorBorder,t.colorBorderSecondary,t.colorBgElevated,t.colorTextPlaceholder)}}),Yn=(0,u.forwardRef)(function(r,t){var n=$n(),o=n.styles,i=(0,y.YB)(),a=(0,u.useRef)(!1),l=(0,u.useRef)(null);return(0,u.useImperativeHandle)(t,function(){return l.current}),(0,e.jsx)("input",{className:r.className,onCompositionStart:function(){return a.current=!0},onCompositionEnd:function(p){a.current=!1,r.onChange(p.currentTarget.value)},onFocus:r.onFocus,onBlur:r.onBlur,onKeyDown:function(p){["ArrowDown","ArrowUp"].includes(p.key)&&p.preventDefault(),p.key==="Escape"&&!a.current&&p.currentTarget.blur()},onChange:function(p){setTimeout(function(){a.current||r.onChange(p.target.value)},1)},placeholder:i.formatMessage({id:"header.search.placeholder"}),ref:l})}),Jn,Qn,qn,so=(0,b.kc)(function(r){var t=r.token,n=r.css;return{modal:n(Jn||(Jn=s()([`
      position: fixed;
      top: 0;
      inset-inline-start: 0;
      z-index: 1000;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
    `]))),mask:n(Qn||(Qn=s()([`
      background-color: `,`;
      width: 100%;
      height: 100%;
    `])),t.colorBgMask),content:n(qn||(qn=s()([`
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
    `])),t.colorBgElevated)}}),co=function(t){var n=so(),o=n.styles;return(0,u.useEffect)(function(){if(t.visible)document.body.style.overflow="hidden";else{var i;document.body.style.overflow="",(i=t.onClose)===null||i===void 0||i.call(t)}},[t.visible]),t.visible?(0,e.jsxs)("div",{className:o.modal,children:[(0,e.jsx)("div",{className:o.mask,onClick:t.onMaskClick}),(0,e.jsx)("div",{className:o.content,children:t.children})]}):null},sn,_n=/(mac|iphone|ipod|ipad)/i.test(typeof navigator!="undefined"?(sn=navigator)===null||sn===void 0?void 0:sn.platform:""),uo=function(){var t=$n(),n=t.styles,o=(0,u.useState)(!1),i=H()(o,2),a=i[0],l=i[1],d=(0,u.useRef)(null),p=(0,u.useRef)(null),h=(0,u.useState)("\u2318"),f=H()(h,2),k=f[0],m=f[1],w=(0,y.OO)(),v=w.keywords,g=w.setKeywords,x=w.result,R=w.loading,W=(0,u.useState)(!1),Z=H()(W,2),U=Z[0],F=Z[1];return(0,u.useEffect)(function(){_n||m("Ctrl");var C=function(A){if(((_n?A.metaKey:A.ctrlKey)&&A.key==="k"||A.key==="/")&&(A.preventDefault(),d.current)){var P=d.current.getBoundingClientRect(),Y=P.top,pn=P.bottom,nn=P.left,J=P.right,en=Y>=0&&nn>=0&&pn<=window.innerHeight&&J<=window.innerWidth;en?d.current.focus():(g(""),F(!0),setTimeout(function(){var Q;(Q=p.current)===null||Q===void 0||Q.focus()}))}A.key==="Escape"&&(A.preventDefault(),F(!1))};return document.addEventListener("keydown",C),function(){return document.removeEventListener("keydown",C)}},[]),(0,e.jsxs)("div",{className:n.container,children:[(0,e.jsx)(Rn.Z,{className:n.svg}),(0,e.jsx)(Yn,{onFocus:function(){return l(!0)},onBlur:function(){setTimeout(function(){l(!1)},1)},onChange:function(K){return g(K)},ref:d,className:n.input}),(0,e.jsxs)("span",{className:n.shortcut,children:[k," K"]}),v.trim()&&a&&(x.length||!R)&&!U&&(0,e.jsx)("div",{className:n.popover,children:(0,e.jsx)("section",{children:(0,e.jsx)(Wn.Z,{data:x,loading:R})})}),(0,e.jsxs)(co,{visible:U,onMaskClick:function(){F(!1)},onClose:function(){return g("")},children:[(0,e.jsxs)("div",{style:{position:"relative"},children:[(0,e.jsx)(Rn.Z,{className:n.svg}),(0,e.jsx)(Yn,{className:n.input,onFocus:function(){return l(!0)},onBlur:function(){setTimeout(function(){l(!1)},1)},onChange:function(K){return g(K)},ref:p})]}),(0,e.jsx)(Wn.Z,{data:x,loading:R,onItemSelect:function(){F(!1)}})]})]})},po=uo,ho=c(4990),mo=c(17395),xo=c(32699),ne,ee,te,oe,re,ie,vo=(0,b.kc)(function(r){var t=r.token,n=r.prefixCls,o=r.cx,i=r.css,a=r.stylish,l=6;return{icon:o("site-burger-icon",i(ne||(ne=s()([`
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
      `])),t.colorTextSecondary,l,l)),active:i(ee||(ee=s()([`
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
    `])),t.colorText),container:i(te||(te=s()([`
      width: `,`px;
      height: `,`px;
      border-radius: `,`px;
      cursor: pointer;
    `])),t.controlHeight,t.controlHeight,t.borderRadius),drawerRoot:i(oe||(oe=s()([`
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
    `])),t.headerHeight+1,n,N()(t.colorBgBase).alpha(.5).hex()),drawer:i(re||(re=s()([`
      &.`,`-drawer-content {
        background: transparent;
      }
    `])),n),menu:i(ie||(ie=s()([`
      background: transparent;
      border-inline-end: transparent !important;

      .`,"-menu-sub.",`-menu-inline {
        background: `,` !important;
      }
    `])),n,n,N()(t.colorBgLayout).alpha(.8).hex())}}),go=function(){var t=(0,u.useState)(!1),n=H()(t,2),o=n[0],i=n[1],a=vo(),l=a.styles,d=a.cx,p=j(function(m){return m.navData},I()),h=j(function(m){return m.sidebar},I()),f=j(Pt),k=j(function(m){return m.location.pathname});return(0,e.jsxs)(E.Z,{className:l.container,onClick:function(){i(!o)},children:[(0,e.jsx)("div",{className:d(l.icon,o?l.active:"")}),(0,e.jsx)(ho.Z,{open:o,placement:"left",closeIcon:null,rootClassName:l.drawerRoot,className:l.drawer,width:"100vw",headerStyle:{display:"none"},bodyStyle:{padding:"24px 0"},children:(0,e.jsx)(mo.Z,{mode:"inline",selectedKeys:(0,xo.uniq)([f,"s-".concat(k)]),openKeys:[f],className:l.menu,items:p.map(function(m){return{label:(0,e.jsx)(ln.rU,{to:m.link,children:m.title}),key:m.activePath,children:m.activePath===f&&(h==null?void 0:h.map(function(w){return!w.link&&{label:w.title,type:"group",children:w.children.map(function(v){return{label:(0,e.jsx)(ln.rU,{to:v.link,onClick:function(){i(!1)},children:v.title}),key:"s-".concat(v.link)}})}}))}})})})]})},fo=go,ae=c(72320),le=c(88810),cn=c(10751),yo=function(){var t=j(function(n){var o,i;return(o=n.siteData.themeConfig)===null||o===void 0||(i=o.socialLinks)===null||i===void 0?void 0:i.github});return t?(0,e.jsx)(le.Z,{showArrow:!1,title:"Github",children:(0,e.jsx)("a",{href:t,target:"_blank",children:(0,e.jsx)(cn.ZP,{icon:(0,e.jsx)(ae.Z,{})})})}):null},bo=yo,se=c(53119),z=c(56163),jo=c(72576),X=c(91128),ce=c(10422),So=c(93251),ko=c(52510),de=c.n(ko),ue,pe,he,wo=(0,b.kc)(function(r,t){var n=r.css,o=r.cx,i=r.token;return{item:o("".concat(t,"-item"),n(ue||(ue=s()([`
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
    `])),i.fontFamily,i.colorText,i.colorFillTertiary)),selected:o("".concat(t,"-item-selected"),n(pe||(pe=s()([`
      color: `,`;
      background: `,`;
      font-weight: bold;
      &:hover {
        color: `,`;
        background: `,`;
      }
    `])),i.colorPrimaryText,i.colorPrimaryBg,i.colorPrimaryTextHover,i.colorPrimaryBgHover)),active:o("".concat(t,"-item-active"),n(he||(he=s()([`
      background: `,`;
    `])),i.colorFillTertiary))}}),Co=["value","label","prefixCls","isSelected","isActive","disabled"],To=(0,u.forwardRef)(function(r,t){var n,o=r.value,i=r.label,a=r.prefixCls,l=r.isSelected,d=r.isActive,p=r.disabled,h=an()(r,Co),f=wo({prefixCls:a,selected:l}),k=f.styles,m=f.cx;return(0,e.jsx)("button",O()(O()({disabled:p,"aria-selected":l,role:"option",tabIndex:-1,className:m(k.item,(n={},de()(n,k.selected,l),de()(n,k.active,d),n)),ref:t},h),{},{children:i}),o)}),Bo=To,me,xe,Oo=(0,b.kc)(function(r,t){var n=r.css,o=r.stylish,i=r.cx,a=r.token;return{container:i(t,n(me||(me=s()([`
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
    `])),a.colorBgElevated,a.fontSize,a.colorBorder,a.boxShadowSecondary)),button:i("".concat(t,"-button"),n(xe||(xe=s()([`
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
    `])),a.fontSize,a.colorBgContainer,a.colorTextSecondary,a.borderRadius,a.colorBorder,o.buttonDefaultHover,a.colorPrimary,a.colorPrimaryBg))}}),Ho=function(t){var n=t.options,o=n===void 0?[]:n,i=t.value,a=t.prefixCls,l=t.onChange,d=t.renderValue,p=t.renderItem,h=a!=null?a:"native-select",f=(0,So.Z)(0,{value:i,onChange:l}),k=H()(f,2),m=k[0],w=k[1],v=Oo(h),g=v.styles,x=(0,u.useRef)([]),R=(0,u.useRef)([]),W=(0,u.useRef)(null),Z=(0,u.useRef)(!1),U=(0,u.useRef)(!0),F=(0,u.useRef)(),C=(0,u.useRef)(null),K=(0,u.useState)(!1),A=H()(K,2),P=A[0],Y=A[1],pn=(0,u.useState)(null),nn=H()(pn,2),J=nn[0],en=nn[1],Q=(0,u.useState)(!1),it=H()(Q,2),tn=it[0],at=it[1],Dr=(0,u.useState)(0),lt=H()(Dr,2),st=lt[0],hn=lt[1],zr=(0,u.useState)(!1),ct=H()(zr,2),on=ct[0],dt=ct[1],Mr=(0,u.useState)(0),ut=H()(Mr,2),Gr=ut[0],pt=ut[1],Fr=(0,u.useState)(!1),ht=H()(Fr,2),mt=ht[0],mn=ht[1];P||(st!==0&&hn(0),tn&&at(!1),mt&&mn(!1));var V=(0,z.YF)({placement:"bottom-start",open:P,onOpenChange:Y,whileElementsMounted:jo.Me,middleware:tn?[(0,X.cv)(5),on?(0,X.uY)({crossAxis:!0,padding:10}):(0,X.RR)({padding:10}),(0,X.dp)({apply:function(T){var B,L,Er=T.availableHeight;Object.assign((B=(L=C.current)===null||L===void 0?void 0:L.style)!==null&&B!==void 0?B:{},{maxHeight:"".concat(Er,"px")})},padding:10})]:[(0,z.aN)({listRef:x,overflowRef:W,scrollRef:C,index:m,offset:st,onFallbackChange:at,padding:10,minItemsVisible:on?8:4,referenceOverflowThreshold:20}),(0,X.cv)({crossAxis:-4})]}),xn=V.x,vn=V.y,Pr=V.strategy,xt=V.refs,G=V.context,Ur=V.isPositioned,gn=(0,z.NI)([(0,z.eS)(G,{event:"mousedown"}),(0,z.bQ)(G),(0,z.qs)(G,{role:"listbox"}),(0,z.Rz)(G,{enabled:!tn,onChange:hn,overflowRef:W,scrollRef:C}),(0,z.c0)(G,{listRef:x,activeIndex:J,selectedIndex:m,onNavigate:en}),(0,z.ox)(G,{listRef:R,activeIndex:J,onMatch:P?en:w})]),Nr=gn.getReferenceProps,Zr=gn.getFloatingProps,Ar=gn.getItemProps;(0,u.useEffect)(function(){return P?(F.current=setTimeout(function(){Z.current=!0},300),function(){clearTimeout(F.current)}):(Z.current=!1,U.current=!0,function(){return[]})},[P]);var Kr=function(T){tn?C.current&&(C.current.scrollTop-=T,(0,ce.flushSync)(function(){var B,L;return pt((B=(L=C.current)===null||L===void 0?void 0:L.scrollTop)!==null&&B!==void 0?B:0)})):(0,ce.flushSync)(function(){return hn(function(B){return B-T})})},Vr=function(){on&&(clearTimeout(F.current),mn(!0),F.current=setTimeout(function(){mn(!1)},400))},Ir=o[m]||{},Lr=Ir.label;return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("button",O()(O()({ref:xt.setReference,className:g.button},Nr({onTouchStart:function(){dt(!0)},onPointerMove:function(T){var B=T.pointerType;B==="mouse"&&dt(!1)}})),{},{children:d?d(m):Lr})),(0,e.jsx)(z.ll,{children:P&&(0,e.jsx)(z.y0,{lockScroll:!on,style:{zIndex:3e3},children:(0,e.jsx)(z.wD,{context:G,modal:!1,initialFocus:-1,children:(0,e.jsx)("div",{ref:xt.setFloating,style:{position:Pr,top:vn!=null?vn:0,left:xn!=null?xn:0},children:(0,e.jsx)("div",O()(O()({className:g.container,style:{overflowY:"auto"},ref:C},Zr({onScroll:function(T){var B=T.currentTarget;pt(B.scrollTop)},onContextMenu:function(T){T.preventDefault()}})),{},{children:o.map(function(M,T){return(0,e.jsx)(Bo,O()({value:M.value,label:p?p(M,T):M.label,disabled:mt,isSelected:T===m,isActive:T===J,ref:function(L){x.current[T]=L,R.current[T]=M.label}},Ar({onTouchStart:function(){Z.current=!0,U.current=!1},onKeyDown:function(){Z.current=!0},onClick:function(){Z.current&&(w(T),Y(!1))},onMouseUp:function(){U.current&&(Z.current&&(w(T),Y(!1)),clearTimeout(F.current),F.current=setTimeout(function(){Z.current=!0}))}})),M.value)})}))})})})})]})},Do=Ho,ve,zo=function(){return(0,e.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,e.jsx)("path",{d:"M8.218 1.455c3.527.109 6.327 3.018 6.327 6.545 0 3.6-2.945 6.545-6.545 6.545a6.562 6.562 0 0 1-6.036-4h.218c3.6 0 6.545-2.945 6.545-6.545 0-.91-.182-1.745-.509-2.545m0-1.455c-.473 0-.909.218-1.2.618-.29.4-.327.946-.145 1.382.254.655.4 1.31.4 2 0 2.8-2.291 5.09-5.091 5.09h-.218c-.473 0-.91.22-1.2.62-.291.4-.328.945-.146 1.38C1.891 14.074 4.764 16 8 16c4.4 0 8-3.6 8-8a7.972 7.972 0 0 0-7.745-8h-.037Z"})})},Mo=function(){return(0,e.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,e.jsx)("path",{d:"M8 13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM8 3a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm7 4a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM3 8a1 1 0 0 1-1 1H1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm9.95 3.536.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-9.9-7.072-.707-.707a1 1 0 0 1 1.414-1.414l.707.707A1 1 0 0 1 3.05 4.464Zm9.9 0a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707Zm-9.9 7.072a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707ZM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"})})},Fo=function(){return(0,e.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,e.jsx)("path",{d:"M14.595 8a6.595 6.595 0 1 1-13.19 0 6.595 6.595 0 0 1 13.19 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 2.014v11.972A5.986 5.986 0 0 0 8 2.014Z"})})},Po=se.Z.span(ve||(ve=s()([`
  width: 12px;
`]))),No=function(t){var n=t.icon,o=t.label;return(0,e.jsxs)(S.D,{horizontal:!0,gap:12,align:"center",children:[(0,e.jsxs)(Po,{children:[n," "]}),o]})},_=[{label:"\u8DDF\u968F\u7CFB\u7EDF",icon:(0,e.jsx)(Fo,{}),value:"auto"},{label:"\u4EAE\u8272\u6A21\u5F0F",icon:(0,e.jsx)(Mo,{}),value:"light"},{label:"\u6697\u8272\u6A21\u5F0F",icon:(0,e.jsx)(zo,{}),value:"dark"}],Zo=function(){var t=rn(function(n){return n.themeMode});return(0,e.jsx)("span",{children:(0,e.jsx)(Do,{options:_,value:_.findIndex(function(n){return n.value===t}),onChange:function(o){var i=_[o].value;rn.setState({themeMode:i})},renderValue:function(o){return _[o].icon},renderItem:function(o){return(0,e.jsx)(No,{label:o.label,icon:o.icon})}})})},ge=(0,u.memo)(Zo),fe,ye,be,je,Ao=(0,b.kc)(function(r){var t=r.css,n=r.responsive,o=r.token;return{header:t(fe||(fe=s()([`
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
  `])),o.zIndexPopupBase-50,o.colorSplit,n.mobile,o.colorBgContainer),content:t(ye||(ye=s()([`
    padding: 0 24px;
    height: 64px;

    `,` {
      padding: 0 16px;
    }
  `])),n.mobile),left:t(be||(be=s()([""]))),right:t(je||(je=s()([`
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
  `])),n.mobile,o.colorBorder)}}),Io=function(){var t=(0,u.useState)(!1),n=H()(t,2),o=n[0],i=n[1],a=j(function(f){return f.routeMeta.frontmatter},I()),l=(0,q.F)(),d=l.mobile,p=Ao(),h=p.styles;return a&&(0,e.jsx)("div",{className:h.header,"data-static":Boolean(a.hero)||void 0,"data-mobile-active":o||void 0,onClick:function(){return i(!1)},children:(0,e.jsx)(S.D,{horizontal:!0,distribution:"space-between",align:"center",width:"auto",className:h.content,children:d?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(S.D,{children:(0,e.jsx)(fo,{})}),(0,e.jsx)(S.D,{horizontal:!0,className:h.left,children:(0,e.jsx)(An,{})}),(0,e.jsx)(S.D,{children:(0,e.jsx)(ge,{})})]}):(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(S.D,{horizontal:!0,className:h.left,children:(0,e.jsx)(An,{})}),(0,e.jsx)(S.D,{style:{marginLeft:48,alignSelf:"end"},children:(0,e.jsx)(lo,{})}),(0,e.jsxs)("section",{className:h.right,children:[(0,e.jsx)("div",{}),(0,e.jsxs)(S.D,{gap:16,horizontal:!0,align:"center",className:"dumi-default-header-right-aside",children:[(0,e.jsx)(po,{}),(0,e.jsx)(no.Z,{}),(0,e.jsx)(bo,{}),(0,e.jsx)(ge,{})]})]})]})})})},Se=Io,ke,Lo=(0,b.kc)(function(r){var t=r.css,n=r.token;return{sidebar:t(ke||(ke=s()([`
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
  `])),n.headerHeight,n.headerHeight,n.colorSplit,n.colorText,n.fontSize,n.lineHeight,n.colorTextSecondary,n.colorText,n.colorFillTertiary,n.colorPrimaryText,n.colorPrimaryBg,n.colorPrimaryTextHover,n.colorPrimaryBgHover,n.colorBorder)}}),Eo=function(){var t=j(function(a){return a.sidebar},I()),n=Lo(),o=n.styles,i=(0,y.TH)();return i.pathname.includes("changelog")?null:t&&(0,e.jsx)("div",{className:o.sidebar,children:t.map(function(a,l){return(0,e.jsxs)("dl",{children:[a.title&&(0,e.jsx)("dt",{children:a.title}),a.children.map(function(d){return(0,e.jsx)("dd",{children:(0,e.jsx)(y.OL,{to:d.link,title:d.title,end:!0,children:d.title})},d.link)})]},String(l))})})},Ro=(0,u.memo)(Eo),Wo=c(11474),Go=c(96913),dn=c(91396),we=c(42881),Ce=c(71606),Te,Be,Oe,Uo=(0,b.kc)(function(r){var t=r.token,n=r.prefixCls,o=r.responsive,i=r.css,a=36;return{container:i(Te||(Te=s()([`
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
    `])),t.tocWidth,o.mobile,t.headerHeight+1,t.colorTextDescription),mobileCtn:i(Be||(Be=s()([`
      position: sticky;
      top: `,`px;

      height: `,`px;
      width: 100%;
      z-index: 200;
      background: transparent;
      background: `,`;
    `])),t.headerHeight+1,a,N()(t.colorBgContainer).alpha(.8).css()),expand:i(Oe||(Oe=s()([`
      backdrop-filter: blur(6px);
      border-radius: 0;
      border-bottom: 1px solid `,`;

      box-shadow: `,`;
      width: 100%;
      z-index: 201;

      .`,`-collapse-header {
        padding: 8px 16px !important;
      }
    `])),t.colorSplit,t.boxShadowSecondary,n)}}),Ko=function(){var t=(0,y.TH)(),n=(0,u.useState)(),o=H()(n,2),i=o[0],a=o[1],l=(0,y.eL)(),d=(0,y.zh)(),p=Uo(),h=p.styles,f=(0,q.F)(),k=f.mobile,m=(0,u.useMemo)(function(){return((d==null?void 0:d.toc)||l.toc).reduce(function(v,g){if(g.depth===2)v.push(O()({},g));else if(g.depth===3){var x=v[v.length-1];x&&(x.children=x.children||[],x.children.push(O()({},g)))}return v},[])},[l.toc||(d==null?void 0:d.toc)]),w=l.toc.find(function(v){return v.id===i});return((m==null?void 0:m.length)===0?null:k?(0,e.jsx)(dn.ZP,{theme:{token:{fontSize:12,sizeStep:3}},children:(0,e.jsx)("div",{className:h.mobileCtn,children:(0,e.jsx)(we.Z,{bordered:!1,ghost:!0,expandIconPosition:"end",expandIcon:function(g){var x=g.isActive;return x?(0,e.jsx)(Wo.Z,{}):(0,e.jsx)(Go.Z,{})},className:h.expand,children:(0,e.jsx)(we.Z.Panel,{forceRender:!0,header:w?w.title:"\u76EE\u5F55",children:(0,e.jsx)(dn.ZP,{theme:{token:{fontSize:14,sizeStep:4}},children:(0,e.jsx)(Ce.Z,{onChange:function(g){a(g.replace("#",""))},items:m.map(function(v){var g;return{href:"#".concat(v.id),title:t.pathname.includes("changelog")?v.title.replace("@ant-design/pro-components",""):v.title,key:v.id,children:(g=v.children)===null||g===void 0?void 0:g.map(function(x){return{href:"#".concat(x.id),title:x==null?void 0:x.title,key:x.id}})}})})})},"toc")})})}):(0,e.jsxs)("div",{className:h.container,children:[(0,e.jsx)("h4",{children:"\u76EE\u5F55"}),(0,e.jsx)(Ce.Z,{items:m.map(function(v){var g;return{href:"#".concat(v.id),title:t.pathname.includes("changelog")?v.title.replace("@ant-design/pro-components@","v"):v.title,key:v.id,children:(g=v.children)===null||g===void 0?void 0:g.map(function(x){return{href:"#".concat(x.id),title:x==null?void 0:x.title,key:x.id}})}})})]}))||null},Vo=Ko,Xo=c(96807),un=c(70541),$o=c(41283),Yo=c(874),Jo=c.n(Yo),Qo=c(30481),qo=c(61107),He,_o=(0,b.kc)(function(r){var t=r.css,n=r.token;return t(He||(He=s()([`
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
    `])),n.colorFillSecondary)}),nr=function(t){var n=t.children,o=_o(),i=o.styles,a=o.theme,l=(0,qo.M)(),d=l.copied,p=l.setCopied;return(0,e.jsx)(le.Z,{placement:"right",title:d?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)($o.Z,{style:{color:a.colorSuccess}})," \u590D\u5236\u6210\u529F"]}):"\u590D\u5236",children:(0,e.jsx)("div",{className:i,onClick:function(){Jo()(n),p()},children:(0,e.jsx)(Qo.ZP,{language:"javaScript",children:n})})})},er=nr,tr=function(){return(0,e.jsx)("svg",{width:"14px",height:"14px",viewBox:"0 0 14 14",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",children:(0,e.jsx)("path",{d:"M13,0 C13.5522847,-1.01453063e-16 14,0.44771525 14,1 L14,13 C14,13.5522847 13.5522847,14 13,14 L1,14 C0.44771525,14 -4.87476137e-16,13.5522847 0,13 L0,1 C-6.76353751e-17,0.44771525 0.44771525,-4.5365845e-16 1,0 L13,0 Z M11.375,2.625 L2.625,2.625 L2.625,11.375 L7,11.375 L7,4.375 L9.625,4.375 L9.625,11.375 L11.375,11.375 L11.375,2.625 Z",fill:"#C12127"})})},De,ze,Me,or=(0,b.kc)(function(r){var t=r.css,n=r.token,o=r.stylish;return{title:t(De||(De=s()([`
    font-family: monospace;
  `]))),desc:t(ze||(ze=s()([`
    font-size: `,`px;
    line-height: `,`px;
  `])),n.fontSizeLG,n.lineHeightLG),text:t(Me||(Me=s()([`
    `,`
  `])),o.clickableText)}}),Fe,rr=(0,se.Z)(un.Z.Text)(Fe||(Fe=s()([`
  width: 100px;
`]))),Pe="https://github.com/arvinxx/antd-style",ir=(0,u.memo)(function(r){var t=r.title,n=r.description,o=or(),i=o.styles,a=o.theme,l=[{label:"\u5F15\u5165\u65B9\u6CD5",import:!0,children:"import { ".concat(t,' } from "antd-style";')},{label:"\u6E90\u7801",icon:(0,e.jsx)(ae.Z,{}),children:"\u67E5\u770B\u6E90\u7801",url:"".concat(Pe,"/tree/master/src/").concat(t)},{label:"\u6587\u6863",icon:(0,e.jsx)(Xo.Z,{}),children:"\u7F16\u8F91\u6587\u6863",url:"".concat(Pe,"/tree/master/docs/api/").concat(t)},{label:"\u4EA7\u7269",icon:(0,e.jsx)(tr,{}),children:"antd-style",url:"https://www.npmjs.com/package/antd-style?activeTab=explore"}];return(0,e.jsxs)(S.D,{children:[(0,e.jsx)(un.Z.Title,{className:i.title,children:t}),n&&(0,e.jsx)("div",{children:(0,e.jsx)(un.Z.Text,{type:"secondary",className:i.desc,children:n})}),(0,e.jsx)(S.D,{style:{marginTop:24},gap:12,children:l.map(function(d){return(0,e.jsxs)(S.D,{horizontal:!0,children:[(0,e.jsx)(rr,{type:"secondary",children:d.label}),d.import?(0,e.jsx)(er,{children:d.children}):(0,e.jsx)("a",{href:d.url,target:"_blank",children:(0,e.jsxs)(S.D,{horizontal:!0,align:"center",gap:8,className:i.text,children:[(0,e.jsx)(e.Fragment,{children:d.icon}),(0,e.jsx)(e.Fragment,{children:d.children})]})})]},d.label)})})]})}),Ne,Ze,Ae,ar=(0,b.kc)(function(r){var t=r.css,n=r.responsive,o=r.token;return{layout:t(Ne||(Ne=s()([`
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
  `])),o.colorBgLayout,o.colorBgContainer,o.sidebarWidth,o.tocWidth,o.headerHeight,n.mobile),toc:t(Ze||(Ze=s()([`
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
  `])),o.tocWidth,n.mobile,o.headerHeight+1,o.colorTextDescription),content:t(Ae||(Ae=s()([`
    max-width: `,`px;
    width: 100%;
    margin: 0 24px;


    `,` {
      margin: 0;
    }
  }
  `])),o.contentMaxWidth,n.mobile)}}),lr=(0,u.memo)(function(){var r=(0,y.pC)(),t=(0,q.F)(),n=t.mobile,o=j(function(h){return h.routeMeta.frontmatter},I()),i=j(zt),a=ar(),l=a.styles,d=a.theme,p=(0,y.TH)();return(0,u.useEffect)(function(){requestAnimationFrame(function(){window.scrollTo(0,0)})},[p.pathname]),(0,e.jsxs)("div",{className:l.layout,style:p.pathname.includes("changelog")?{gridTemplateColumns:"0 1fr 300px"}:{},children:[(0,e.jsx)(Se,{}),(0,e.jsx)(Vo,{}),n?null:(0,e.jsx)(Ro,{}),i?(0,e.jsx)(S.D,{style:{gridArea:"title"},children:(0,e.jsx)(E.Z,{children:(0,e.jsx)(S.D,{style:{maxWidth:d.contentMaxWidth,width:"100%"},children:(0,e.jsx)(S.D,{padding:"0 48px",children:(0,e.jsx)(ir,{title:o.title,description:o.description})})})})}):null,(0,e.jsx)(S.D,{style:{zIndex:10,gridArea:"main",minWidth:0,margin:n?0:24,marginBottom:n?0:48},children:(0,e.jsx)(E.Z,{width:"100%",children:(0,e.jsx)(S.D,{className:l.content,children:(0,e.jsx)(S.D,{horizontal:!0,children:(0,e.jsx)(Et,{children:r})})})})}),(0,e.jsx)(Nn,{})]})}),sr=lr,cr=c(57325),dr=c(57912),$=c(87356),Ie,Le,Ee,Re,We,Ge,Ue,Ke,Ve,Xe,ur=(0,b.kc)(function(r,t){var n=r.token,o=r.prefixCls,i=r.responsive,a=r.css,l=r.stylish,d=r.isDarkMode,p=r.cx,h="".concat(o,"-features"),f="".concat(h,"-cover"),k="".concat(h,"-description"),m="".concat(h,"-title"),w="".concat(h,"-img"),v=20,g=function(W){return a(Ie||(Ie=s()([`
      width: `,`px;
      height: `,`px;
    `])),W,W)},x=a(Le||(Le=s()([`
      transition: all `," ",`;
    `])),n.motionDurationSlow,n.motionEaseInOutCirc);return{cell:a(Ee||(Ee=s()([`
        overflow: hidden;
      `]))),container:a(Re||(Re=s()([`
        `,`;

        z-index: 1;
        padding: 24px;
        border-radius: 24px;

        background: linear-gradient(
          135deg,
          `,`,
          `,`
        );

        position: relative;

        &:hover {
          scale: 1.03;

          background: linear-gradient(
            135deg,
            `,`,
            `,`
          );

          box-shadow: inset 0 0 0 1px `,", ",`;

          .`,` {
            height: `,`px;
            width: 100%;
            padding: 0;
          }

          .`,` {
            `,`;
          }

          .`,` {
            position: absolute;
            visibility: hidden;
            opacity: 0;
          }

          .`,` {
            font-size: 14px;
          }
        }
      `])),x,n.colorFillContent,n.colorFillQuaternary,(0,$.$n)(.5,n.colorFillContent),(0,$.$n)(.5,n.colorFillQuaternary),n.colorBorder,n.boxShadowSecondary,f,v*t,w,g(100),k,m),title:p(m,x,a(We||(We=s()([`
          font-size: 20px;
          line-height: `,`;
          margin: 16px 0;
          color: `,`;
        `])),n.lineHeightHeading3,n.colorText)),desc:p(k,x,a(Ge||(Ge=s()([`
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
        `])),n.colorTextSecondary,n.colorTextDescription,d?n.colorPrimary:n.colorPrimaryBgHover)),imgContainer:p(f,x,a(Ue||(Ue=s()([`
          background: `,`;
          border-radius: 8px;
          opacity: 0.8;

          `,`;
          padding: 4px;

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
        `])),n.colorFillContent,g(24),n.gradientColor1,n.gradientColor2,n.colorBgContainer,(0,$.m4)(n.gradientColor2,.3),(0,$.m4)(n.gradientColor2,.3),(0,$.m4)(n.gradientColor1,.3))),img:p(w,x,a(Ke||(Ke=s()([`
          width: 20px;
          height: 20px;
          color: `,`;
        `])),n.colorWhite)),link:a(Ve||(Ve=s()([`
        `,`;

        margin-top: 24px;

        a {
          `,`;

          color: `,`;
          &:hover {
            color: `,`;
          }
        }
      `])),x,l.resetLinkColor,n.colorTextDescription,n.colorPrimaryHover),blur:a(Xe||(Xe=s()([`
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        `,`;
        scale: 2;
        opacity: `,`;
        `,` {
          display: none;
        }
      `])),l.heroBlurBall,d?.05:.08,i.mobile)}}),pr=function(t){var n=t.imageStyle,o=t.row,i=t.column,a=t.center,l=t.description,d=t.avatar,p=t.title,h=t.link,f=o||7,k=ur(f),m=k.styles,w=k.theme;return(0,e.jsxs)("div",{className:m.container,style:{gridRow:"span ".concat(f),gridColumn:"span ".concat(i||1),cursor:h?"pointer":"default"},onClick:function(){h&&window.open(h)},children:[(0,e.jsxs)("div",{className:m.cell,children:[d&&(0,e.jsx)(E.Z,{"image-style":n,className:m.imgContainer,children:(0,e.jsx)("img",{className:m.img,src:d,alt:p})}),p&&(0,e.jsxs)(S.D,{as:"h3",horizontal:!0,gap:8,align:"center",className:m.title,children:[p,n==="soon"?(0,e.jsx)(dr.Z,{color:w.isDarkMode?"pink-inverse":"cyan-inverse",children:"SOON"}):null]}),l&&(0,e.jsx)("p",{dangerouslySetInnerHTML:{__html:l},className:m.desc}),h&&(0,e.jsx)("div",{className:m.link,children:(0,e.jsxs)(y.rU,{to:h,children:["\u7ACB\u5373\u4E86\u89E3 ",(0,e.jsx)(cr.Z,{})]})})]}),a&&(0,e.jsx)("div",{className:m.blur})]})},hr=pr,$e,Ye,mr=(0,b.kc)(function(r){var t=r.token,n=r.prefixCls,o=r.responsive,i=r.css,a=r.cx,l="".concat(n,"-features");return{container:a(l,i($e||($e=s()([`
        max-width: `,`px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: row dense;
        grid-auto-rows: 24px;
        gap: 16px;

        `,`
      `])),t.contentMaxWidth,o({mobile:i(Ye||(Ye=s()([`
            flex-direction: column;
            display: flex;
          `]))),laptop:{gridTemplateColumns:"repeat(2, 1fr)"}})))}}),xr=function(t){var n=t.items,o=t.style,i=mr(),a=i.styles;return Boolean(n==null?void 0:n.length)?(0,e.jsx)("div",{className:a.container,style:o,children:n.map(function(l){return(0,e.jsx)(hr,O()({},l),l.title)})}):null},vr=xr,gr=function(){var t=j(Ft,In.X);return Boolean(t==null?void 0:t.length)?(0,e.jsx)(vr,{items:t||[]}):null},fr=gr,Je,yr=(0,b.kc)(function(r){var t=r.css,n=r.stylish,o=r.isDarkMode;return{button:t(Je||(Je=s()([`
      border: none;

      `,`
      `,`

      background-size: 200% 100%;

      &:hover {
        animation: none;
      }
    `])),n.heroButtonGradient,n.heroGradientFlow)}}),br=function(t){var n=t.children,o=yr(),i=o.styles;return(0,e.jsx)(cn.ZP,{size:"large",shape:"round",type:"primary",className:i.button,children:n})},jr=br,Qe,qe,_e,nt,et,tt,ot,Sr=(0,b.kc)(function(r){var t=r.css,n=r.responsive,o=r.token,i=r.stylish,a=r.isDarkMode;return{container:t(Qe||(Qe=s()([`
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
  `])),o.colorTextSecondary,n({mobile:{fontSize:16}})),titleContainer:t(qe||(qe=s()([`
    position: relative;
  `]))),title:t(_e||(_e=s()([`
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
  `])),o.fontFamily,n({mobile:{fontSize:40}}),i.heroGradient,i.heroGradientFlow),titleShadow:t(nt||(nt=s()([`
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
  `])),a?o.colorWhite:o.colorTextBase,o.fontFamily,n({mobile:{fontSize:40}}),i.heroTextShadow),desc:t(et||(et=s()([`
    font-size: `,`px;
    color: `,`;

    `,` {
      font-size: `,`px;
      margin: 24px 16px;
    }
  `])),o.fontSizeHeading3,o.colorTextSecondary,n.mobile,o.fontSizeHeading5),actions:t(tt||(tt=s()([`
    margin-top: 48px;
    display: flex;
    justify-content: center;

    `,`
  `])),n({mobile:{marginTop:24}})),canvas:t(ot||(ot=s()([`
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
  `])),i.heroBlurBall,n.mobile)}}),kr=function(){var t,n=j(function(d){return d.routeMeta.frontmatter},I()),o=Sr(),i=o.styles,a=o.cx;if(!("hero"in n))return null;var l=n.hero;return(0,e.jsxs)(S.D,{horizontal:!0,distribution:"center",className:i.container,children:[(0,e.jsx)("div",{className:i.canvas}),(0,e.jsxs)(E.Z,{children:[n.hero.title&&(0,e.jsxs)("div",{className:i.titleContainer,children:[(0,e.jsx)("h1",{className:i.title,dangerouslySetInnerHTML:{__html:l.title}}),(0,e.jsx)("div",{className:a(i.titleShadow),dangerouslySetInnerHTML:{__html:l.title}})]}),l.description&&(0,e.jsx)("p",{className:i.desc,dangerouslySetInnerHTML:{__html:l.description}}),Boolean((t=n.hero.actions)===null||t===void 0?void 0:t.length)&&(0,e.jsx)(dn.ZP,{theme:{token:{fontSize:16,controlHeight:40}},children:(0,e.jsx)(S.D,{horizontal:!0,gap:24,className:i.actions,children:n.hero.actions.map(function(d,p){var h=d.text,f=d.link;return(0,e.jsx)(y.rU,{to:f,children:p===0?(0,e.jsx)(jr,{children:h}):(0,e.jsx)(cn.ZP,{size:"large",shape:"round",type:"default",children:h})},h)})})})]})]})},wr=kr,Cr=(0,u.memo)(function(){return(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)(S.D,{align:"center",gap:80,children:[(0,e.jsx)(Se,{}),(0,e.jsx)(wr,{}),(0,e.jsx)(fr,{}),(0,e.jsx)(Nn,{})]})})}),Tr=Cr,rt,Br=(0,b.vJ)(rt||(rt=s()([`
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
`])),function(r){return r.theme.colorBgLayout}),Or=(0,u.memo)(function(){var r=(0,y.YB)(),t=(0,y.TH)(),n=t.hash,o=j(function(l){return l.routeMeta.frontmatter},I()),i=j(Mt),a=j(function(l){return l.siteData.loading});return(0,u.useEffect)(function(){var l=n.replace("#","");l&&setTimeout(function(){var d=document.getElementById(decodeURIComponent(l));d&&(0,vt.Z)(d.offsetTop-80,{maxDuration:300})},1)},[a,n]),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(y.ql,{children:[(0,e.jsx)("html",{lang:r.locale.replace(/-.+$/,"")}),(0,e.jsx)("title",{children:o.title?"".concat(o.title," - Pro Components"):"Pro Components"}),o.title&&(0,e.jsx)("meta",{property:"og:title",content:o.title}),o.description&&(0,e.jsx)("meta",{name:"description",content:o.description}),o.description&&(0,e.jsx)("meta",{property:"og:description",content:o.description}),o.keywords&&(0,e.jsx)("meta",{name:"keywords",content:o.keywords.join(",")}),o.keywords&&(0,e.jsx)("meta",{property:"og:keywords",content:o.keywords.join(",")})]}),i?(0,e.jsx)(Tr,{}):(0,e.jsx)(sr,{})]})}),Hr=function(){return(0,e.jsx)(u.StrictMode,{children:(0,e.jsxs)(Ot,{children:[(0,e.jsx)(At,{}),(0,e.jsx)(Br,{}),(0,e.jsx)(Or,{})]})})}}}]);
