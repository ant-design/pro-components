"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[367],{9617:function(Ur,fn,s){s.r(fn),s.d(fn,{default:function(){return Fr}});var vt=s(94161),j=s(24344),gt=s(3341),I=s.n(gt),p=s(50959),ft=s(93536),yt=s(99663),bt=s(79106),yn=s(69327),bn=s(6593),rn=(0,yn.Ue)()((0,bn.tJ)(function(){return{themeMode:"auto"}},{name:"ANTD_STYLE_DOC_STORE"})),jt=s(86378),B=s.n(jt),St=s(28481),Kr=null,D=["#001736","#002653","#003572","#004593","#0055b6","#0066dc","#1677ff","#257fff","#3187ff","#3c8fff","#4796ff"],kt=function(t,e){var o=St.Z.darkAlgorithm(t,e);return B()(B()({},o),{},{colorBgLayout:"hsl(218,22%,7%)",colorBgContainer:"hsl(216,18%,11%)",colorBgElevated:"hsl(216,13%,15%)",colorPrimaryBg:D[1],colorPrimaryBgHover:D[2],colorPrimaryBorder:D[3],colorPrimaryBorderHover:D[4],colorPrimaryHover:D[5],colorPrimary:D[6],colorPrimaryActive:D[7],colorPrimaryTextHover:D[8],colorPrimaryText:D[9],colorPrimaryTextActive:D[10],colorLink:D[6],colorLinkHover:D[5],colorLinkActive:D[7]})},wt=function(t,e){var o=["#ffffff","#d9ebfb","#b4d6f7","#90c0f5","#6caaf5","#4792f8","#1677ff","#0568e0","#005ac0","#004ca1","#003e84"];return B()(B()({},e),{},{colorBgLayout:"hsl(220,23%,97%)",colorPrimaryBg:o[1],colorPrimaryBgHover:o[2],colorPrimaryBorder:o[3],colorPrimaryBorderHover:o[4],colorPrimaryHover:o[5],colorPrimary:o[6],colorPrimaryActive:o[7],colorPrimaryTextHover:o[8],colorPrimaryText:o[9],colorPrimaryTextActive:o[10]})},Ct=function(t){var e={token:{colorTextBase:"#3d3e40"},algorithm:wt};return t==="dark"&&(e.token={colorTextBase:"#c7ddff"},e.algorithm=kt),e},Tt=s(14661),c=s.n(Tt),Bt=s(48453),N=s.n(Bt),jn,Sn,kn,wn,Cn,Tn,Bn,On,Ot=function(t){var e=t.css,o=t.token,a=t.isDarkMode;return{clickableText:e(jn||(jn=c()([`
      cursor: pointer;
      color: `,`;

      &:hover {
        color: `,`;
      }
    `])),o.colorTextSecondary,o.colorText),resetLinkColor:e(Sn||(Sn=c()([`
      color: inherit;

      &:hover,
      &:active {
        color: inherit;
      }
    `]))),heroButtonGradient:e(kn||(kn=c()([`
      background: linear-gradient(90deg, `," 0%, ",` 100%);
    `])),o.gradientColor1,o.gradientColor2),heroGradient:e(wn||(wn=c()([`
      background-image: `,`;
      background-size: 300% 300%;
    `])),o.gradientHeroBgG),heroGradientFlow:e(Cn||(Cn=c()([`
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
    `]))),heroTextShadow:e(Tn||(Tn=c()([`
      text-shadow: 0 8px 20px `,`,
        0 8px 60px `,`,
        0 8px 80px
          `,`;
    `])),N()(o.gradientColor2).alpha(.2).hex(),N()(o.gradientColor3).alpha(.2).hex(),N()(o.cyan).alpha(a?.2:.4).hex()),heroBlurBall:e(Bn||(Bn=c()([`
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
    `])),o.gradientColor3,o.gradientColor1,o.red,o.cyan),iconGradientDefault:e(On||(On=c()([`
      radial-gradient(
        100% 100% at 50% 0,
        `,` 0,
        `,` 100%
      )`])),N()(o.colorSolid).alpha(.2).hex(),N()(o.colorSolid).alpha(.1).hex())}},Ht=function(t){var e=t.isDarkMode,o=t.token,a=o.blue,l=e?o.pink:o.cyan,i=o.purple,d=e?o.colorWhite:"#000";return{headerHeight:64,sidebarWidth:240,tocWidth:176,contentMaxWidth:1152,colorSolid:d,gradientColor1:a,gradientColor2:l,gradientColor3:i,gradientHeroBgG:"radial-gradient(at 80% 20%, ".concat(a," 0%, ").concat(l," 80%, ").concat(i," 130%)"),gradientIconDefault:`radial-gradient(
        100% 100% at 50% 0,
        `.concat(N()(d).alpha(.2).hex(),` 0,
        `).concat(N()(d).alpha(e?.1:.4).hex(),` 100%
      )`)}},n=s(11527),Dt=function(r){var t=r.children,e=rn(function(o){return o.themeMode});return(0,n.jsx)(yt.V,{prefix:"site",children:(0,n.jsx)(bt.f,{prefixCls:"site",themeMode:e,theme:Ct,customStylish:Ot,customToken:Ht,children:(0,n.jsx)(ft.Z,{children:t})})})},zt=s(28488),an=s.n(zt),ln=s(57323),Ft={siteData:{setLoading:void 0,loading:!0,pkg:{},components:{},demos:{},locales:[],entryExports:{},themeConfig:{}},sidebar:[],navData:[],location:{pathname:"",state:"",search:"",hash:"",key:""},routeMeta:{toc:[],texts:[],tabs:void 0,frontmatter:{}}},y=(0,yn.Ue)()((0,bn.mW)(function(){return B()({},Ft)},{name:"dumi-site-store"})),Mt=function(t){return t.location.pathname.startsWith("/api")},Pt=function(t){return!!t.routeMeta.frontmatter.hero},Nt=function(t){return t.routeMeta.frontmatter.features},Zt=function(t){if(t.location.pathname==="/")return"/";var e=t.navData.filter(function(o){return o.link!=="/"}).find(function(o){return t.location.pathname.startsWith(o.activePath)});return(e==null?void 0:e.activePath)||""},At=["setLoading"],It=["setLoading"],Lt=(0,p.memo)(function(){var r=(0,j.WF)(),t=(0,j.tx)(),e=(0,j.eL)(),o=(0,j.OK)(),a=(0,ln.TH)();return(0,p.useEffect)(function(){var l=r.setLoading,i=an()(r,At),d=y.getState(),u=d.siteData,h=u.setLoading,f=an()(u,It);I()(i,f)||y.setState({siteData:r})},[r]),(0,p.useEffect)(function(){y.setState({sidebar:t})},[t]),(0,p.useEffect)(function(){y.setState({routeMeta:e})},[e]),(0,p.useEffect)(function(){y.setState({navData:o})},[o]),(0,p.useEffect)(function(){y.setState({location:a})},[a]),null}),b=s(80427),E=s(40871),k=s(69683),Hn,Et=(0,k.k)(function(r){var t=r.token,e=r.responsive,o=r.isDarkMode,a=r.css;return{content:a(Hn||(Hn=c()([`
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
  `])),t.colorBgContainer,t.boxShadow,e.mobile,t.colorTextSecondary,t.colorText,t.colorLink,t.colorLinkHover,t.colorLinkActive,o?.8:1,t.colorPrimaryText,t.colorPrimaryBg,t.colorFillTertiary,t.colorBorderSecondary,t.colorTextDescription,t.colorBorder,t.colorText,t.colorTextTertiary)}}),Rt=function(t){var e=t.children,o=(0,j.tx)(),a=Et(),l=a.styles,i=a.cx;return(0,n.jsx)("div",{className:i("dumi-default-content",l.content),"data-no-sidebar":!o||void 0,children:e})},Wt=Rt,Gt=s(50767),Ut=s(34484),Dn=s(77543),Kt=s(49724),Vt=s(1227),Xt=s(30119),$t=s(89634),q=s(96084),Yt=s(20854),zn,Fn,Jt=(0,k.k)(function(r){var t=r.css,e=r.responsive,o=r.token,a="rc-footer";return{container:t(zn||(zn=c()([`
      grid-area: footer;
      border-top: 1px solid `,`;
      color: `,`;
      text-align: center;
      align-self: stretch;
      `,` {
        border: none;
        flex-direction: column;
      }
    `])),o.colorSplit,o.colorTextDescription,e.mobile),footer:t(Fn||(Fn=c()([`
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
    `])),o.colorTextSecondary,o.colorBgLayout,a,o.colorTextTertiary,o.colorLinkHover,a,o.contentMaxWidth,o.colorText,o.colorBorderSecondary,e.mobile,a)}}),Qt=function(t){var e=t.columns,o=t.bottom,a=t.theme,l=Jt(),i=l.styles;return(0,n.jsx)("div",{className:i.container,children:(0,n.jsx)(Yt.Z,{theme:a,className:i.footer,columns:e,bottom:o})})},qt=Qt,Mn,Pn,_t=(0,k.k)(function(r){var t=r.css,e=r.responsive,o=r.token,a="rc-footer";return{container:t(Mn||(Mn=c()([`
      grid-area: footer;
      border-top: 1px solid `,`;
      color: `,`;
      text-align: center;
      align-self: stretch;
      `,` {
        border: none;
        flex-direction: column;
      }
    `])),o.colorSplit,o.colorTextDescription,e.mobile),footer:t(Pn||(Pn=c()([`
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
    `])),o.colorTextSecondary,o.colorBgLayout,a,o.colorTextTertiary,o.colorLinkHover,a,o.contentMaxWidth,o.colorText,o.colorBorderSecondary,e.mobile,a)}}),no=function(){var t=y(function(u){return u.siteData}),e=t.themeConfig,o=_t(),a=o.styles,l=o.theme,i=(0,q.F)(),d=i.mobile;return e.footer?(0,n.jsx)(qt,{theme:l.appearance,columns:[{title:"\u76F8\u5173\u8D44\u6E90",items:[{title:"Ant Design Pro",url:"https://pro.ant.design",openExternal:!0},{title:"Ant Design Pro Components",url:"https://procomponents.ant.design",openExternal:!0},{title:"Umi",description:"React \u5E94\u7528\u5F00\u53D1\u6846\u67B6",url:"https://umijs.org",openExternal:!0},{title:"Dumi",description:"\u7EC4\u4EF6/\u6587\u6863\u7814\u53D1\u5DE5\u5177",url:"https://d.umijs.org",openExternal:!0},{title:"qiankun",description:"\u5FAE\u524D\u7AEF\u6846\u67B6",url:"https://qiankun.umijs.org",openExternal:!0}]},{title:"\u793E\u533A",items:[{icon:(0,n.jsx)(Gt.Z,{}),title:"Medium",url:"http://medium.com/ant-design/",openExternal:!0},{icon:(0,n.jsx)(Ut.Z,{style:{color:"#1DA1F2"}}),title:"Twitter",url:"http://twitter.com/antdesignui",openExternal:!0},{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",alt:"yuque"}),title:"Ant Design \u8BED\u96C0\u4E13\u680F",url:"https://yuque.com/ant-design/ant-design",openExternal:!0},{icon:(0,n.jsx)(Dn.Z,{style:{color:"#056de8"}}),title:"Ant Design \u77E5\u4E4E\u4E13\u680F",url:"https://www.zhihu.com/column/c_1564262000561106944",openExternal:!0},{icon:(0,n.jsx)(Dn.Z,{style:{color:"#056de8"}}),title:"\u4F53\u9A8C\u79D1\u6280\u4E13\u680F",url:"http://zhuanlan.zhihu.com/xtech",openExternal:!0},{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png",alt:"seeconf"}),title:"SEE Conf",description:"SEE Conf-\u8682\u8681\u4F53\u9A8C\u79D1\u6280\u5927\u4F1A",url:"https://seeconf.antfin.com/",openExternal:!0}]},{title:"\u5E2E\u52A9",items:[{icon:(0,n.jsx)(Kt.Z,{}),title:"GitHub",url:"https://github.com/ant-design/antd-style",openExternal:!0},{icon:(0,n.jsx)(Vt.Z,{}),title:"\u66F4\u65B0\u65E5\u5FD7",url:"/changelog"},{icon:(0,n.jsx)(Xt.Z,{}),title:"\u8BA8\u8BBA",url:"https://github.com/ant-design/antd-style/issues",openExternal:!0}]},{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",alt:"more products"}),title:"\u66F4\u591A\u4EA7\u54C1",items:[{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",alt:"yuque"}),title:"\u8BED\u96C0",url:"https://yuque.com",description:"\u77E5\u8BC6\u521B\u4F5C\u4E0E\u5206\u4EAB\u5DE5\u5177",openExternal:!0},{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png",alt:"AntV"}),title:"AntV",url:"https://antv.vision",description:"\u6570\u636E\u53EF\u89C6\u5316\u89E3\u51B3\u65B9\u6848",openExternal:!0},{icon:(0,n.jsx)("img",{src:"https://www.eggjs.org/logo.svg",alt:"Egg"}),title:"Egg",url:"https://eggjs.org",description:"\u4F01\u4E1A\u7EA7 Node.js \u6846\u67B6",openExternal:!0},{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico",alt:"kitchen"}),title:"Kitchen",description:"Sketch \u5DE5\u5177\u96C6",url:"https://kitchen.alipay.com",openExternal:!0},{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",alt:"xtech"}),title:"\u8682\u8681\u4F53\u9A8C\u79D1\u6280",url:"https://xtech.antfin.com/",openExternal:!0}]}],bottom:d?(0,n.jsxs)(E.Z,{className:a.container,children:["Copyright \xA9 2022-",new Date().getFullYear(),(0,n.jsx)(b.D,{align:"center",horizontal:!0,children:"Made with \u2764\uFE0F by \u8682\u8681\u96C6\u56E2 - AFX & \u6570\u5B57\u79D1\u6280"})]}):(0,n.jsxs)(E.Z,{horizontal:!0,children:["Copyright \xA9 2022-",new Date().getFullYear()," ",(0,n.jsx)($t.Z,{type:"vertical"}),"Made with \u2764\uFE0F by \u8682\u8681\u96C6\u56E2 - AFX & \u6570\u5B57\u79D1\u6280"]})}):null},Nn=no,eo=s(30577),O=s.n(eo),to=s(95520),Zn,oo=(0,k.k)(function(r){var t=r.css,e=r.stylish,o=r.responsive,a=r.token;return t(Zn||(Zn=c()([`
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
  `])),a.fontFamily,a.colorText,e.clickableText,o.mobile,o.mobile)}),ro=function(){var t=(0,j.bU)(),e=y(function(i){return i.siteData.themeConfig},I()),o=oo(),a=o.styles,l=o.cx;return e&&(0,n.jsxs)(j.rU,{className:l(a),to:"base"in t?t.base:"/",children:[(0,n.jsx)("img",{src:e.logo,alt:e.name}),e.name]})},An=(0,p.memo)(ro),ao=s(19238),io=s(45478),In=s(26209),Ln,En,lo=(0,k.k)(function(r){var t=r.css,e=r.responsive,o=r.token,a=r.stylish,l=r.prefixCls,i=".".concat(l,"-tabs"),d=16,u=6;return{tabs:t(Ln||(Ln=c()([`
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
    `])),i,i,d,i,o.colorTextSecondary,d,d,u,o.colorText,o.colorFillTertiary,o.borderRadius,i,e.mobile),link:t(En||(En=c()([`
      `,`
    `])),a.resetLinkColor)}}),so=function(){var t=lo(),e=t.styles,o=y(function(i){return i.navData},In.X),a=(0,j.TH)(),l=a.pathname.replace("/en-US/","").replace("/","").split("/").shift();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(ao.Z,{onChange:function(d){var u;j.m8.push(((u=o.find(function(h){return h.link.replace("/en-US/","").replace("/","")===d}))===null||u===void 0?void 0:u.link)||"/"),setTimeout(function(){window.scrollTo(0,0)},10)},activeKey:l,className:e.tabs,items:o.map(function(i){return{label:i.title,link:i.link,key:i.link.replace("/en-US/","").replace("/","")}})}),(0,n.jsx)(io.Z,{})]})},co=(0,p.memo)(so),Rn=s(28906),Wn=s(79858),Gn,Un,Kn,Vn,Xn,$n=(0,k.k)(function(r){var t=r.token,e=r.responsive,o=r.css,a=r.cx;return{container:o(Gn||(Gn=c()([`
      position: relative;

      // TODO: support search for mobile devices
      `,` {
        display: none;
      }
    `])),e.mobile),shortcut:a("site-header-shortcut",o(Un||(Un=c()([`
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
      `])),t.colorTextDescription,t.colorFillSecondary,t.colorBorderSecondary,e.mobile)),popover:o(Kn||(Kn=c()([`
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
    `])),t.colorBgElevated),svg:a(o(Vn||(Vn=c()([`
        position: absolute;
        top: 50%;
        margin-top: 1px;
        inset-inline-start: 16px;
        width: 16px;
        color: `,`;
        transform: translateY(-50%);
      `])),t.colorTextPlaceholder)),input:o(Xn||(Xn=c()([`
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
    `])),t.controlHeightLG,t.colorTextSecondary,t.colorBorder,t.colorBorderSecondary,t.colorBgElevated,t.colorTextPlaceholder)}}),Yn=(0,p.forwardRef)(function(r,t){var e=$n(),o=e.styles,a=(0,j.YB)(),l=(0,p.useRef)(!1),i=(0,p.useRef)(null);return(0,p.useImperativeHandle)(t,function(){return i.current}),(0,n.jsx)("input",{className:r.className,onCompositionStart:function(){return l.current=!0},onCompositionEnd:function(u){l.current=!1,r.onChange(u.currentTarget.value)},onFocus:r.onFocus,onBlur:r.onBlur,onKeyDown:function(u){["ArrowDown","ArrowUp"].includes(u.key)&&u.preventDefault(),u.key==="Escape"&&!l.current&&u.currentTarget.blur()},onChange:function(u){setTimeout(function(){l.current||r.onChange(u.target.value)},1)},placeholder:a.formatMessage({id:"header.search.placeholder"}),ref:i})}),Jn,Qn,qn,uo=(0,k.k)(function(r){var t=r.token,e=r.css;return{modal:e(Jn||(Jn=c()([`
      position: fixed;
      top: 0;
      inset-inline-start: 0;
      z-index: 1000;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
    `]))),mask:e(Qn||(Qn=c()([`
      background-color: `,`;
      width: 100%;
      height: 100%;
    `])),t.colorBgMask),content:e(qn||(qn=c()([`
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
    `])),t.colorBgElevated)}}),po=function(t){var e=uo(),o=e.styles;return(0,p.useEffect)(function(){if(t.visible)document.body.style.overflow="hidden";else{var a;document.body.style.overflow="",(a=t.onClose)===null||a===void 0||a.call(t)}},[t.visible]),t.visible?(0,n.jsxs)("div",{className:o.modal,children:[(0,n.jsx)("div",{className:o.mask,onClick:t.onMaskClick}),(0,n.jsx)("div",{className:o.content,children:t.children})]}):null},sn,_n=/(mac|iphone|ipod|ipad)/i.test(typeof navigator!="undefined"?(sn=navigator)===null||sn===void 0?void 0:sn.platform:""),ho=function(){var t=$n(),e=t.styles,o=(0,p.useState)(!1),a=O()(o,2),l=a[0],i=a[1],d=(0,p.useRef)(null),u=(0,p.useRef)(null),h=(0,p.useState)("\u2318"),f=O()(h,2),S=f[0],x=f[1],m=(0,j.OO)(),g=m.keywords,v=m.setKeywords,H=m.result,R=m.loading,W=(0,p.useState)(!1),Z=O()(W,2),U=Z[0],M=Z[1];return(0,p.useEffect)(function(){_n||x("Ctrl");var w=function(A){if(((_n?A.metaKey:A.ctrlKey)&&A.key==="k"||A.key==="/")&&(A.preventDefault(),d.current)){var P=d.current.getBoundingClientRect(),Y=P.top,pn=P.bottom,nn=P.left,J=P.right,en=Y>=0&&nn>=0&&pn<=window.innerHeight&&J<=window.innerWidth;en?d.current.focus():(v(""),M(!0),setTimeout(function(){var Q;(Q=u.current)===null||Q===void 0||Q.focus()}))}A.key==="Escape"&&(A.preventDefault(),M(!1))};return document.addEventListener("keydown",w),function(){return document.removeEventListener("keydown",w)}},[]),(0,n.jsxs)("div",{className:e.container,children:[(0,n.jsx)(Rn.Z,{className:e.svg}),(0,n.jsx)(Yn,{onFocus:function(){return i(!0)},onBlur:function(){setTimeout(function(){i(!1)},1)},onChange:function(K){return v(K)},ref:d,className:e.input}),(0,n.jsxs)("span",{className:e.shortcut,children:[S," K"]}),g.trim()&&l&&(H.length||!R)&&!U&&(0,n.jsx)("div",{className:e.popover,children:(0,n.jsx)("section",{children:(0,n.jsx)(Wn.Z,{data:H,loading:R})})}),(0,n.jsxs)(po,{visible:U,onMaskClick:function(){M(!1)},onClose:function(){return v("")},children:[(0,n.jsxs)("div",{style:{position:"relative"},children:[(0,n.jsx)(Rn.Z,{className:e.svg}),(0,n.jsx)(Yn,{className:e.input,onFocus:function(){return i(!0)},onBlur:function(){setTimeout(function(){i(!1)},1)},onChange:function(K){return v(K)},ref:u})]}),(0,n.jsx)(Wn.Z,{data:H,loading:R,onItemSelect:function(){M(!1)}})]})]})},mo=ho,xo=s(9555),vo=s(59398),go=s(32699),ne,ee,te,oe,re,ae,fo=(0,k.k)(function(r){var t=r.token,e=r.prefixCls,o=r.cx,a=r.css,l=r.stylish,i=6;return{icon:o("site-burger-icon",a(ne||(ne=c()([`
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
      `])),t.colorTextSecondary,i,i)),active:a(ee||(ee=c()([`
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
    `])),t.colorText),container:a(te||(te=c()([`
      width: `,`px;
      height: `,`px;
      border-radius: `,`px;
      cursor: pointer;
    `])),t.controlHeight,t.controlHeight,t.borderRadius),drawerRoot:a(oe||(oe=c()([`
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
    `])),t.headerHeight+1,e,N()(t.colorBgBase).alpha(.5).hex()),drawer:a(re||(re=c()([`
      &.`,`-drawer-content {
        background: transparent;
      }
    `])),e),menu:a(ae||(ae=c()([`
      background: transparent;
      border-inline-end: transparent !important;

      .`,"-menu-sub.",`-menu-inline {
        background: `,` !important;
      }
    `])),e,e,N()(t.colorBgLayout).alpha(.8).hex())}}),yo=function(){var t=(0,p.useState)(!1),e=O()(t,2),o=e[0],a=e[1],l=fo(),i=l.styles,d=l.cx,u=y(function(x){return x.navData},I()),h=y(function(x){return x.sidebar},I()),f=y(Zt),S=y(function(x){return x.location.pathname});return(0,n.jsxs)(E.Z,{className:i.container,onClick:function(){a(!o)},children:[(0,n.jsx)("div",{className:d(i.icon,o?i.active:"")}),(0,n.jsx)(xo.Z,{open:o,placement:"left",closeIcon:null,rootClassName:i.drawerRoot,className:i.drawer,width:"100vw",headerStyle:{display:"none"},bodyStyle:{padding:"24px 0"},children:(0,n.jsx)(vo.Z,{mode:"inline",selectedKeys:(0,go.uniq)([f,"s-".concat(S)]),openKeys:[f],className:i.menu,items:u.map(function(x){return{label:(0,n.jsx)(ln.rU,{to:x.link,children:x.title}),key:x.activePath,children:x.activePath===f&&(h==null?void 0:h.map(function(m){return!m.link&&{label:m.title,type:"group",children:m.children.map(function(g){return{label:(0,n.jsx)(ln.rU,{to:g.link,onClick:function(){a(!1)},children:g.title}),key:"s-".concat(g.link)}})}}))}})})})]})},bo=yo,ie=s(62442),le=s(24491),cn=s(93464),jo=function(){var t=y(function(e){var o,a;return(o=e.siteData.themeConfig)===null||o===void 0||(a=o.socialLinks)===null||a===void 0?void 0:a.github});return t?(0,n.jsx)(le.Z,{showArrow:!1,title:"Github",children:(0,n.jsx)("a",{href:t,target:"_blank",children:(0,n.jsx)(cn.ZP,{icon:(0,n.jsx)(ie.Z,{})})})}):null},So=jo,se=s(48424),z=s(62253),ko=s(71711),X=s(99330),ce=s(10422),wo=s(57901),Co=s(24047),de=s.n(Co),ue,pe,he,To=(0,k.k)(function(r,t){var e=r.css,o=r.cx,a=r.token;return{item:o("".concat(t,"-item"),e(ue||(ue=c()([`
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
    `])),a.fontFamily,a.colorText,a.colorFillTertiary)),selected:o("".concat(t,"-item-selected"),e(pe||(pe=c()([`
      color: `,`;
      background: `,`;
      font-weight: bold;
      &:hover {
        color: `,`;
        background: `,`;
      }
    `])),a.colorPrimaryText,a.colorPrimaryBg,a.colorPrimaryTextHover,a.colorPrimaryBgHover)),active:o("".concat(t,"-item-active"),e(he||(he=c()([`
      background: `,`;
    `])),a.colorFillTertiary))}}),Bo=["value","label","prefixCls","isSelected","isActive","disabled"],Oo=(0,p.forwardRef)(function(r,t){var e,o=r.value,a=r.label,l=r.prefixCls,i=r.isSelected,d=r.isActive,u=r.disabled,h=an()(r,Bo),f=To({prefixCls:l,selected:i}),S=f.styles,x=f.cx;return(0,n.jsx)("button",B()(B()({disabled:u,"aria-selected":i,role:"option",tabIndex:-1,className:x(S.item,(e={},de()(e,S.selected,i),de()(e,S.active,d),e)),ref:t},h),{},{children:a}),o)}),Ho=Oo,me,xe,Do=(0,k.k)(function(r,t){var e=r.css,o=r.stylish,a=r.cx,l=r.token;return{container:a(t,e(me||(me=c()([`
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
    `])),l.colorBgElevated,l.fontSize,l.colorBorder,l.boxShadowSecondary)),button:a("".concat(t,"-button"),e(xe||(xe=c()([`
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
    `])),l.fontSize,l.colorBgContainer,l.colorTextSecondary,l.borderRadius,l.colorBorder,o.buttonDefaultHover,l.colorPrimary,l.colorPrimaryBg))}}),zo=function(t){var e=t.options,o=e===void 0?[]:e,a=t.value,l=t.prefixCls,i=t.onChange,d=t.renderValue,u=t.renderItem,h=l!=null?l:"native-select",f=(0,wo.Z)(0,{value:a,onChange:i}),S=O()(f,2),x=S[0],m=S[1],g=Do(h),v=g.styles,H=(0,p.useRef)([]),R=(0,p.useRef)([]),W=(0,p.useRef)(null),Z=(0,p.useRef)(!1),U=(0,p.useRef)(!0),M=(0,p.useRef)(),w=(0,p.useRef)(null),K=(0,p.useState)(!1),A=O()(K,2),P=A[0],Y=A[1],pn=(0,p.useState)(null),nn=O()(pn,2),J=nn[0],en=nn[1],Q=(0,p.useState)(!1),at=O()(Q,2),tn=at[0],it=at[1],Mr=(0,p.useState)(0),lt=O()(Mr,2),st=lt[0],hn=lt[1],Pr=(0,p.useState)(!1),ct=O()(Pr,2),on=ct[0],dt=ct[1],Nr=(0,p.useState)(0),ut=O()(Nr,2),Vr=ut[0],pt=ut[1],Zr=(0,p.useState)(!1),ht=O()(Zr,2),mt=ht[0],mn=ht[1];P||(st!==0&&hn(0),tn&&it(!1),mt&&mn(!1));var V=(0,z.YF)({placement:"bottom-start",open:P,onOpenChange:Y,whileElementsMounted:ko.Me,middleware:tn?[(0,X.cv)(5),on?(0,X.uY)({crossAxis:!0,padding:10}):(0,X.RR)({padding:10}),(0,X.dp)({apply:function(C){var T,L,Gr=C.availableHeight;Object.assign((T=(L=w.current)===null||L===void 0?void 0:L.style)!==null&&T!==void 0?T:{},{maxHeight:"".concat(Gr,"px")})},padding:10})]:[(0,z.aN)({listRef:H,overflowRef:W,scrollRef:w,index:x,offset:st,onFallbackChange:it,padding:10,minItemsVisible:on?8:4,referenceOverflowThreshold:20}),(0,X.cv)({crossAxis:-4})]}),xn=V.x,vn=V.y,Ar=V.strategy,xt=V.refs,G=V.context,Xr=V.isPositioned,gn=(0,z.NI)([(0,z.eS)(G,{event:"mousedown"}),(0,z.bQ)(G),(0,z.qs)(G,{role:"listbox"}),(0,z.Rz)(G,{enabled:!tn,onChange:hn,overflowRef:W,scrollRef:w}),(0,z.c0)(G,{listRef:H,activeIndex:J,selectedIndex:x,onNavigate:en}),(0,z.ox)(G,{listRef:R,activeIndex:J,onMatch:P?en:m})]),Ir=gn.getReferenceProps,Lr=gn.getFloatingProps,Er=gn.getItemProps;(0,p.useEffect)(function(){return P?(M.current=setTimeout(function(){Z.current=!0},300),function(){clearTimeout(M.current)}):(Z.current=!1,U.current=!0,function(){return[]})},[P]);var $r=function(C){tn?w.current&&(w.current.scrollTop-=C,(0,ce.flushSync)(function(){var T,L;return pt((T=(L=w.current)===null||L===void 0?void 0:L.scrollTop)!==null&&T!==void 0?T:0)})):(0,ce.flushSync)(function(){return hn(function(T){return T-C})})},Yr=function(){on&&(clearTimeout(M.current),mn(!0),M.current=setTimeout(function(){mn(!1)},400))},Rr=o[x]||{},Wr=Rr.label;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("button",B()(B()({ref:xt.setReference,className:v.button},Ir({onTouchStart:function(){dt(!0)},onPointerMove:function(C){var T=C.pointerType;T==="mouse"&&dt(!1)}})),{},{children:d?d(x):Wr})),(0,n.jsx)(z.ll,{children:P&&(0,n.jsx)(z.y0,{lockScroll:!on,style:{zIndex:3e3},children:(0,n.jsx)(z.wD,{context:G,modal:!1,initialFocus:-1,children:(0,n.jsx)("div",{ref:xt.setFloating,style:{position:Ar,top:vn!=null?vn:0,left:xn!=null?xn:0},children:(0,n.jsx)("div",B()(B()({className:v.container,style:{overflowY:"auto"},ref:w},Lr({onScroll:function(C){var T=C.currentTarget;pt(T.scrollTop)},onContextMenu:function(C){C.preventDefault()}})),{},{children:o.map(function(F,C){return(0,n.jsx)(Ho,B()({value:F.value,label:u?u(F,C):F.label,disabled:mt,isSelected:C===x,isActive:C===J,ref:function(L){H.current[C]=L,R.current[C]=F.label}},Er({onTouchStart:function(){Z.current=!0,U.current=!1},onKeyDown:function(){Z.current=!0},onClick:function(){Z.current&&(m(C),Y(!1))},onMouseUp:function(){U.current&&(Z.current&&(m(C),Y(!1)),clearTimeout(M.current),M.current=setTimeout(function(){Z.current=!0}))}})),F.value)})}))})})})})]})},Fo=zo,ve,Mo=function(){return(0,n.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,n.jsx)("path",{d:"M8.218 1.455c3.527.109 6.327 3.018 6.327 6.545 0 3.6-2.945 6.545-6.545 6.545a6.562 6.562 0 0 1-6.036-4h.218c3.6 0 6.545-2.945 6.545-6.545 0-.91-.182-1.745-.509-2.545m0-1.455c-.473 0-.909.218-1.2.618-.29.4-.327.946-.145 1.382.254.655.4 1.31.4 2 0 2.8-2.291 5.09-5.091 5.09h-.218c-.473 0-.91.22-1.2.62-.291.4-.328.945-.146 1.38C1.891 14.074 4.764 16 8 16c4.4 0 8-3.6 8-8a7.972 7.972 0 0 0-7.745-8h-.037Z"})})},Po=function(){return(0,n.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,n.jsx)("path",{d:"M8 13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM8 3a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm7 4a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM3 8a1 1 0 0 1-1 1H1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm9.95 3.536.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-9.9-7.072-.707-.707a1 1 0 0 1 1.414-1.414l.707.707A1 1 0 0 1 3.05 4.464Zm9.9 0a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707Zm-9.9 7.072a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707ZM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"})})},No=function(){return(0,n.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,n.jsx)("path",{d:"M14.595 8a6.595 6.595 0 1 1-13.19 0 6.595 6.595 0 0 1 13.19 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 2.014v11.972A5.986 5.986 0 0 0 8 2.014Z"})})},Zo=se.zo.span(ve||(ve=c()([`
  width: 12px;
`]))),Ao=function(t){var e=t.icon,o=t.label;return(0,n.jsxs)(b.D,{horizontal:!0,gap:12,align:"center",children:[(0,n.jsxs)(Zo,{children:[e," "]}),o]})},_=[{label:"\u8DDF\u968F\u7CFB\u7EDF",icon:(0,n.jsx)(No,{}),value:"auto"},{label:"\u4EAE\u8272\u6A21\u5F0F",icon:(0,n.jsx)(Po,{}),value:"light"},{label:"\u6697\u8272\u6A21\u5F0F",icon:(0,n.jsx)(Mo,{}),value:"dark"}],Io=function(){var t=rn(function(e){return e.themeMode});return(0,n.jsx)("span",{children:(0,n.jsx)(Fo,{options:_,value:_.findIndex(function(e){return e.value===t}),onChange:function(o){var a=_[o].value;rn.setState({themeMode:a})},renderValue:function(o){return _[o].icon},renderItem:function(o){return(0,n.jsx)(Ao,{label:o.label,icon:o.icon})}})})},ge=(0,p.memo)(Io),fe,ye,be,je,Lo=(0,k.k)(function(r){var t=r.css,e=r.responsive,o=r.token;return{header:t(fe||(fe=c()([`
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
  `])),o.zIndexPopupBase-50,o.colorSplit,e.mobile,o.colorBgContainer),content:t(ye||(ye=c()([`
    padding: 0 24px;
    height: 64px;

    `,` {
      padding: 0 16px;
    }
  `])),e.mobile),left:t(be||(be=c()([""]))),right:t(je||(je=c()([`
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
  `])),e.mobile,o.colorBorder)}}),Eo=function(){var t=(0,p.useState)(!1),e=O()(t,2),o=e[0],a=e[1],l=y(function(f){return f.routeMeta.frontmatter},I()),i=(0,q.F)(),d=i.mobile,u=Lo(),h=u.styles;return l&&(0,n.jsx)("div",{className:h.header,"data-static":Boolean(l.hero)||void 0,"data-mobile-active":o||void 0,onClick:function(){return a(!1)},children:(0,n.jsx)(b.D,{horizontal:!0,distribution:"space-between",align:"center",width:"auto",className:h.content,children:d?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(b.D,{children:(0,n.jsx)(bo,{})}),(0,n.jsx)(b.D,{horizontal:!0,className:h.left,children:(0,n.jsx)(An,{})}),(0,n.jsx)(b.D,{children:(0,n.jsx)(ge,{})})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(b.D,{horizontal:!0,className:h.left,children:(0,n.jsx)(An,{})}),(0,n.jsx)(b.D,{style:{marginLeft:48,alignSelf:"end"},children:(0,n.jsx)(co,{})}),(0,n.jsxs)("section",{className:h.right,children:[(0,n.jsx)("div",{}),(0,n.jsxs)(b.D,{gap:16,horizontal:!0,align:"center",className:"dumi-default-header-right-aside",children:[(0,n.jsx)(mo,{}),(0,n.jsx)(to.Z,{}),(0,n.jsx)(So,{}),(0,n.jsx)(ge,{})]})]})]})})})},Se=Eo,ke,Ro=(0,k.k)(function(r){var t=r.css,e=r.token;return{sidebar:t(ke||(ke=c()([`
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
  `])),e.headerHeight,e.headerHeight,e.colorSplit,e.colorText,e.fontSize,e.lineHeight,e.colorTextSecondary,e.colorText,e.colorFillTertiary,e.colorPrimaryText,e.colorPrimaryBg,e.colorPrimaryTextHover,e.colorPrimaryBgHover,e.colorBorder)}}),Wo=function(){var t=y(function(l){return l.sidebar},I()),e=Ro(),o=e.styles,a=(0,j.TH)();return a.pathname.includes("changelog")?null:t&&(0,n.jsx)("div",{className:o.sidebar,children:t.map(function(l,i){return(0,n.jsxs)("dl",{children:[l.title&&(0,n.jsx)("dt",{children:l.title}),l.children.map(function(d){return(0,n.jsx)("dd",{children:(0,n.jsx)(j.OL,{to:d.link,title:d.title,end:!0,children:d.title})},d.link)})]},String(i))})})},Go=(0,p.memo)(Wo),Uo=s(7913),Ko=s(88427),dn=s(12278),we=s(23315),Ce=s(67922),Te,Be,Oe,Vo=(0,k.k)(function(r){var t=r.token,e=r.prefixCls,o=r.responsive,a=r.css,l=36;return{container:a(Te||(Te=c()([`
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
    `])),t.tocWidth,o.mobile,t.headerHeight+1,t.colorTextDescription),mobileCtn:a(Be||(Be=c()([`
      position: sticky;
      top: `,`px;

      height: `,`px;
      width: 100%;
      z-index: 200;
      background: transparent;
      background: `,`;
    `])),t.headerHeight+1,l,N()(t.colorBgContainer).alpha(.8).css()),expand:a(Oe||(Oe=c()([`
      backdrop-filter: blur(6px);
      border-radius: 0;
      border-bottom: 1px solid `,`;

      box-shadow: `,`;
      width: 100%;
      z-index: 201;

      .`,`-collapse-header {
        padding: 8px 16px !important;
      }
    `])),t.colorSplit,t.boxShadowSecondary,e)}}),Xo=function(){var t=(0,j.TH)(),e=(0,p.useState)(),o=O()(e,2),a=o[0],l=o[1],i=(0,j.eL)(),d=Vo(),u=d.styles,h=(0,q.F)(),f=h.mobile,S=(0,p.useMemo)(function(){return i.toc.reduce(function(m,g){if(g.depth===2)m.push(B()({},g));else if(g.depth===3){var v=m[m.length-1];v&&(v.children=v.children||[],v.children.push(B()({},g)))}return m},[])},[i.toc]),x=i.toc.find(function(m){return m.id===a});return((S==null?void 0:S.length)===0?null:f?(0,n.jsx)(dn.ZP,{theme:{token:{fontSize:12,sizeStep:3}},children:(0,n.jsx)("div",{className:u.mobileCtn,children:(0,n.jsx)(we.Z,{bordered:!1,ghost:!0,expandIconPosition:"end",expandIcon:function(g){var v=g.isActive;return v?(0,n.jsx)(Uo.Z,{}):(0,n.jsx)(Ko.Z,{})},className:u.expand,children:(0,n.jsx)(we.Z.Panel,{forceRender:!0,header:x?x.title:"\u76EE\u5F55",children:(0,n.jsx)(dn.ZP,{theme:{token:{fontSize:14,sizeStep:4}},children:(0,n.jsx)(Ce.Z,{onChange:function(g){l(g.replace("#",""))},items:S.map(function(m){var g;return{href:"#".concat(m.id),title:t.pathname.includes("changelog")?m.title.replace("@ant-design/pro-components",""):m.title,key:m.id,children:(g=m.children)===null||g===void 0?void 0:g.map(function(v){return{href:"#".concat(v.id),title:v==null?void 0:v.title,key:v.id}})}})})})},"toc")})})}):(0,n.jsxs)("div",{className:u.container,children:[(0,n.jsx)("h4",{children:"\u76EE\u5F55"}),(0,n.jsx)(Ce.Z,{items:S.map(function(m){var g;return{href:"#".concat(m.id),title:t.pathname.includes("changelog")?m.title.replace("@ant-design/pro-components@","v"):m.title,key:m.id,children:(g=m.children)===null||g===void 0?void 0:g.map(function(v){return{href:"#".concat(v.id),title:v==null?void 0:v.title,key:v.id}})}})})]}))||null},$o=Xo,Yo=s(79908),un=s(72874),Jo=s(73875),Qo=s(874),qo=s.n(Qo),_o=s(1857),nr=s(72752),He,er=(0,k.k)(function(r){var t=r.css,e=r.token;return t(He||(He=c()([`
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
    `])),e.colorFillSecondary)}),tr=function(t){var e=t.children,o=er(),a=o.styles,l=o.theme,i=(0,nr.M)(),d=i.copied,u=i.setCopied;return(0,n.jsx)(le.Z,{placement:"right",title:d?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(Jo.Z,{style:{color:l.colorSuccess}})," \u590D\u5236\u6210\u529F"]}):"\u590D\u5236",children:(0,n.jsx)("div",{className:a,onClick:function(){qo()(e),u()},children:(0,n.jsx)(_o.ZP,{language:"javaScript",children:e})})})},or=tr,rr=function(){return(0,n.jsx)("svg",{width:"14px",height:"14px",viewBox:"0 0 14 14",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",children:(0,n.jsx)("path",{d:"M13,0 C13.5522847,-1.01453063e-16 14,0.44771525 14,1 L14,13 C14,13.5522847 13.5522847,14 13,14 L1,14 C0.44771525,14 -4.87476137e-16,13.5522847 0,13 L0,1 C-6.76353751e-17,0.44771525 0.44771525,-4.5365845e-16 1,0 L13,0 Z M11.375,2.625 L2.625,2.625 L2.625,11.375 L7,11.375 L7,4.375 L9.625,4.375 L9.625,11.375 L11.375,11.375 L11.375,2.625 Z",fill:"#C12127"})})},De,ze,Fe,ar=(0,k.k)(function(r){var t=r.css,e=r.token,o=r.stylish;return{title:t(De||(De=c()([`
    font-family: monospace;
  `]))),desc:t(ze||(ze=c()([`
    font-size: `,`px;
    line-height: `,`px;
  `])),e.fontSizeLG,e.lineHeightLG),text:t(Fe||(Fe=c()([`
    `,`
  `])),o.clickableText)}}),Me,ir=(0,se.zo)(un.Z.Text)(Me||(Me=c()([`
  width: 100px;
`]))),Pe="https://github.com/arvinxx/antd-style",lr=(0,p.memo)(function(r){var t=r.title,e=r.description,o=ar(),a=o.styles,l=o.theme,i=[{label:"\u5F15\u5165\u65B9\u6CD5",import:!0,children:"import { ".concat(t,' } from "antd-style";')},{label:"\u6E90\u7801",icon:(0,n.jsx)(ie.Z,{}),children:"\u67E5\u770B\u6E90\u7801",url:"".concat(Pe,"/tree/master/src/").concat(t)},{label:"\u6587\u6863",icon:(0,n.jsx)(Yo.Z,{}),children:"\u7F16\u8F91\u6587\u6863",url:"".concat(Pe,"/tree/master/docs/api/").concat(t)},{label:"\u4EA7\u7269",icon:(0,n.jsx)(rr,{}),children:"antd-style",url:"https://www.npmjs.com/package/antd-style?activeTab=explore"}];return(0,n.jsxs)(b.D,{children:[(0,n.jsx)(un.Z.Title,{className:a.title,children:t}),e&&(0,n.jsx)("div",{children:(0,n.jsx)(un.Z.Text,{type:"secondary",className:a.desc,children:e})}),(0,n.jsx)(b.D,{style:{marginTop:24},gap:12,children:i.map(function(d){return(0,n.jsxs)(b.D,{horizontal:!0,children:[(0,n.jsx)(ir,{type:"secondary",children:d.label}),d.import?(0,n.jsx)(or,{children:d.children}):(0,n.jsx)("a",{href:d.url,target:"_blank",children:(0,n.jsxs)(b.D,{horizontal:!0,align:"center",gap:8,className:a.text,children:[(0,n.jsx)(n.Fragment,{children:d.icon}),(0,n.jsx)(n.Fragment,{children:d.children})]})})]},d.label)})})]})}),Ne,Ze,Ae,sr=(0,k.k)(function(r){var t=r.css,e=r.responsive,o=r.token;return{layout:t(Ne||(Ne=c()([`
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
  `])),o.colorBgLayout,o.colorBgContainer,o.sidebarWidth,o.tocWidth,o.headerHeight,e.mobile),toc:t(Ze||(Ze=c()([`
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
  `])),o.tocWidth,e.mobile,o.headerHeight+1,o.colorTextDescription),content:t(Ae||(Ae=c()([`
    max-width: `,`px;
    width: 100%;
    margin: 0 24px;


    `,` {
      margin: 0;
    }
  }
  `])),o.contentMaxWidth,e.mobile)}}),cr=(0,p.memo)(function(){var r=(0,j.pC)(),t=(0,q.F)(),e=t.mobile,o=y(function(h){return h.routeMeta.frontmatter},I()),a=y(Mt),l=sr(),i=l.styles,d=l.theme,u=(0,j.TH)();return(0,p.useEffect)(function(){requestAnimationFrame(function(){window.scrollTo(0,0)})},[u.pathname]),(0,n.jsxs)("div",{className:i.layout,style:u.pathname.includes("changelog")?{gridTemplateColumns:"0 1fr 300px"}:{},children:[(0,n.jsx)(Se,{}),(0,n.jsx)($o,{}),e?null:(0,n.jsx)(Go,{}),a?(0,n.jsx)(b.D,{style:{gridArea:"title"},children:(0,n.jsx)(E.Z,{children:(0,n.jsx)(b.D,{style:{maxWidth:d.contentMaxWidth,width:"100%"},children:(0,n.jsx)(b.D,{padding:"0 48px",children:(0,n.jsx)(lr,{title:o.title,description:o.description})})})})}):null,(0,n.jsx)(b.D,{style:{zIndex:10,gridArea:"main",minWidth:0,margin:e?0:24,marginBottom:e?0:48},children:(0,n.jsx)(E.Z,{width:"100%",children:(0,n.jsx)(b.D,{className:i.content,children:(0,n.jsx)(b.D,{horizontal:!0,children:(0,n.jsx)(Wt,{children:r})})})})}),(0,n.jsx)(Nn,{})]})}),dr=cr,ur=s(77172),pr=s(74631),$=s(75281),Ie,Le,Ee,Re,We,Ge,Ue,Ke,Ve,Xe,hr=(0,k.k)(function(r,t){var e=r.token,o=r.prefixCls,a=r.responsive,l=r.css,i=r.stylish,d=r.isDarkMode,u=r.cx,h="".concat(o,"-features"),f="".concat(h,"-cover"),S="".concat(h,"-description"),x="".concat(h,"-title"),m="".concat(h,"-img"),g=20,v=function(W){return l(Ie||(Ie=c()([`
      width: `,`px;
      height: `,`px;
    `])),W,W)},H=l(Le||(Le=c()([`
      transition: all `," ",`;
    `])),e.motionDurationSlow,e.motionEaseInOutCirc);return{cell:l(Ee||(Ee=c()([`
        overflow: hidden;
      `]))),container:l(Re||(Re=c()([`
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
      `])),H,e.colorFillContent,e.colorFillQuaternary,(0,$.$n)(.5,e.colorFillContent),(0,$.$n)(.5,e.colorFillQuaternary),e.colorBorder,e.boxShadowSecondary,f,g*t,m,v(100),S,x),title:u(x,H,l(We||(We=c()([`
          font-size: 20px;
          line-height: `,`;
          margin: 16px 0;
          color: `,`;
        `])),e.lineHeightHeading3,e.colorText)),desc:u(S,H,l(Ge||(Ge=c()([`
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
        `])),e.colorTextSecondary,e.colorTextDescription,d?e.colorPrimary:e.colorPrimaryBgHover)),imgContainer:u(f,H,l(Ue||(Ue=c()([`
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
        `])),e.colorFillContent,v(24),e.gradientColor1,e.gradientColor2,e.colorBgContainer,(0,$.m4)(e.gradientColor2,.3),(0,$.m4)(e.gradientColor2,.3),(0,$.m4)(e.gradientColor1,.3))),img:u(m,H,l(Ke||(Ke=c()([`
          width: 20px;
          height: 20px;
          color: `,`;
        `])),e.colorWhite)),link:l(Ve||(Ve=c()([`
        `,`;

        margin-top: 24px;

        a {
          `,`;

          color: `,`;
          &:hover {
            color: `,`;
          }
        }
      `])),H,i.resetLinkColor,e.colorTextDescription,e.colorPrimaryHover),blur:l(Xe||(Xe=c()([`
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
      `])),i.heroBlurBall,d?.05:.08,a.mobile)}}),mr=function(t){var e=t.imageStyle,o=t.row,a=t.column,l=t.center,i=t.description,d=t.avatar,u=t.title,h=t.link,f=o||7,S=hr(f),x=S.styles,m=S.theme;return(0,n.jsxs)("div",{className:x.container,style:{gridRow:"span ".concat(f),gridColumn:"span ".concat(a||1),cursor:h?"pointer":"default"},onClick:function(){h&&window.open(h)},children:[(0,n.jsxs)("div",{className:x.cell,children:[d&&(0,n.jsx)(E.Z,{"image-style":e,className:x.imgContainer,children:(0,n.jsx)("img",{className:x.img,src:d,alt:u})}),u&&(0,n.jsxs)(b.D,{as:"h3",horizontal:!0,gap:8,align:"center",className:x.title,children:[u,e==="soon"?(0,n.jsx)(pr.Z,{color:m.isDarkMode?"pink-inverse":"cyan-inverse",children:"SOON"}):null]}),i&&(0,n.jsx)("p",{dangerouslySetInnerHTML:{__html:i},className:x.desc}),h&&(0,n.jsx)("div",{className:x.link,children:(0,n.jsxs)(j.rU,{to:h,children:["\u7ACB\u5373\u4E86\u89E3 ",(0,n.jsx)(ur.Z,{})]})})]}),l&&(0,n.jsx)("div",{className:x.blur})]})},xr=mr,$e,Ye,vr=(0,k.k)(function(r){var t=r.token,e=r.prefixCls,o=r.responsive,a=r.css,l=r.cx,i="".concat(e,"-features");return{container:l(i,a($e||($e=c()([`
        max-width: `,`px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: row dense;
        grid-auto-rows: 24px;
        gap: 16px;

        `,`
      `])),t.contentMaxWidth,o({mobile:a(Ye||(Ye=c()([`
            flex-direction: column;
            display: flex;
          `]))),laptop:{gridTemplateColumns:"repeat(2, 1fr)"}})))}}),gr=function(t){var e=t.items,o=t.style,a=vr(),l=a.styles;return Boolean(e==null?void 0:e.length)?(0,n.jsx)("div",{className:l.container,style:o,children:e.map(function(i){return(0,n.jsx)(xr,B()({},i),i.title)})}):null},fr=gr,yr=function(){var t=y(Nt,In.X);return Boolean(t==null?void 0:t.length)?(0,n.jsx)(fr,{items:t}):null},br=yr,Je,jr=(0,k.k)(function(r){var t=r.css,e=r.stylish,o=r.isDarkMode;return{button:t(Je||(Je=c()([`
      border: none;

      `,`
      `,`

      background-size: 200% 100%;

      &:hover {
        animation: none;
      }
    `])),e.heroButtonGradient,e.heroGradientFlow)}}),Sr=function(t){var e=t.children,o=jr(),a=o.styles;return(0,n.jsx)(cn.ZP,{size:"large",shape:"round",type:"primary",className:a.button,children:e})},kr=Sr,Qe,qe,_e,nt,et,tt,ot,wr=(0,k.k)(function(r){var t=r.css,e=r.responsive,o=r.token,a=r.stylish,l=r.isDarkMode;return{container:t(Qe||(Qe=c()([`
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
  `])),o.colorTextSecondary,e({mobile:{fontSize:16}})),titleContainer:t(qe||(qe=c()([`
    position: relative;
  `]))),title:t(_e||(_e=c()([`
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
  `])),o.fontFamily,e({mobile:{fontSize:40}}),a.heroGradient,a.heroGradientFlow),titleShadow:t(nt||(nt=c()([`
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
  `])),l?o.colorWhite:o.colorTextBase,o.fontFamily,e({mobile:{fontSize:40}}),a.heroTextShadow),desc:t(et||(et=c()([`
    font-size: `,`px;
    color: `,`;

    `,` {
      font-size: `,`px;
      margin: 24px 16px;
    }
  `])),o.fontSizeHeading3,o.colorTextSecondary,e.mobile,o.fontSizeHeading5),actions:t(tt||(tt=c()([`
    margin-top: 48px;
    display: flex;
    justify-content: center;

    `,`
  `])),e({mobile:{marginTop:24}})),canvas:t(ot||(ot=c()([`
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
  `])),a.heroBlurBall,e.mobile)}}),Cr=function(){var t,e=y(function(d){return d.routeMeta.frontmatter},I()),o=wr(),a=o.styles,l=o.cx;if(!("hero"in e))return null;var i=e.hero;return(0,n.jsxs)(b.D,{horizontal:!0,distribution:"center",className:a.container,children:[(0,n.jsx)("div",{className:a.canvas}),(0,n.jsxs)(E.Z,{children:[e.hero.title&&(0,n.jsxs)("div",{className:a.titleContainer,children:[(0,n.jsx)("h1",{className:a.title,dangerouslySetInnerHTML:{__html:i.title}}),(0,n.jsx)("div",{className:l(a.titleShadow),dangerouslySetInnerHTML:{__html:i.title}})]}),i.description&&(0,n.jsx)("p",{className:a.desc,dangerouslySetInnerHTML:{__html:i.description}}),Boolean((t=e.hero.actions)===null||t===void 0?void 0:t.length)&&(0,n.jsx)(dn.ZP,{theme:{token:{fontSize:16,controlHeight:40}},children:(0,n.jsx)(b.D,{horizontal:!0,gap:24,className:a.actions,children:e.hero.actions.map(function(d,u){var h=d.text,f=d.link;return(0,n.jsx)(j.rU,{to:f,children:u===0?(0,n.jsx)(kr,{children:h}):(0,n.jsx)(cn.ZP,{size:"large",shape:"round",type:"default",children:h})},h)})})})]})]})},Tr=Cr,Br=(0,p.memo)(function(){return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(b.D,{align:"center",gap:80,children:[(0,n.jsx)(Se,{}),(0,n.jsx)(Tr,{}),(0,n.jsx)(br,{}),(0,n.jsx)(Nn,{})]})})}),Or=Br,Hr=s(27939),rt,Dr=(0,Hr.v)(rt||(rt=c()([`
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
`])),function(r){return r.theme.colorBgLayout}),zr=(0,p.memo)(function(){var r=(0,j.YB)(),t=(0,j.TH)(),e=t.hash,o=y(function(i){return i.routeMeta.frontmatter},I()),a=y(Pt),l=y(function(i){return i.siteData.loading});return(0,p.useEffect)(function(){var i=e.replace("#","");i&&setTimeout(function(){var d=document.getElementById(decodeURIComponent(i));d&&(0,vt.Z)(d.offsetTop-80,{maxDuration:300})},1)},[l,e]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(j.ql,{children:[(0,n.jsx)("html",{lang:r.locale.replace(/-.+$/,"")}),(0,n.jsx)("title",{children:o.title?"".concat(o.title," - Pro Components"):"Pro Components"}),o.title&&(0,n.jsx)("meta",{property:"og:title",content:o.title}),o.description&&(0,n.jsx)("meta",{name:"description",content:o.description}),o.description&&(0,n.jsx)("meta",{property:"og:description",content:o.description}),o.keywords&&(0,n.jsx)("meta",{name:"keywords",content:o.keywords.join(",")}),o.keywords&&(0,n.jsx)("meta",{property:"og:keywords",content:o.keywords.join(",")})]}),a?(0,n.jsx)(Or,{}):(0,n.jsx)(dr,{})]})}),Fr=function(){return(0,n.jsx)(p.StrictMode,{children:(0,n.jsxs)(Dt,{children:[(0,n.jsx)(Lt,{}),(0,n.jsx)(Dr,{}),(0,n.jsx)(zr,{})]})})}}}]);
