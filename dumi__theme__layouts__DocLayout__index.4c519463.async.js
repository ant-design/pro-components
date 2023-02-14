"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[367],{43365:function(Pr,gn,s){s.r(gn),s.d(gn,{default:function(){return jr}});var dt=s(94161),j=s(24344),ut=s(3341),A=s.n(ut),u=s(50959),pt=s(93536),ht=s(99663),mt=s(79106),fn=s(69327),yn=s(6593),on=(0,fn.Ue)()((0,yn.tJ)(function(){return{themeMode:"auto"}},{name:"ANTD_STYLE_DOC_STORE"})),xt=s(86378),B=s.n(xt),vt=s(28481),Fr=null,O=["#001736","#002653","#003572","#004593","#0055b6","#0066dc","#1677ff","#257fff","#3187ff","#3c8fff","#4796ff"],gt=function(n,o){var t=vt.Z.darkAlgorithm(n,o);return B()(B()({},t),{},{colorBgLayout:"hsl(218,22%,7%)",colorBgContainer:"hsl(216,18%,11%)",colorBgElevated:"hsl(216,13%,15%)",colorPrimaryBg:O[1],colorPrimaryBgHover:O[2],colorPrimaryBorder:O[3],colorPrimaryBorderHover:O[4],colorPrimaryHover:O[5],colorPrimary:O[6],colorPrimaryActive:O[7],colorPrimaryTextHover:O[8],colorPrimaryText:O[9],colorPrimaryTextActive:O[10],colorLink:O[6],colorLinkHover:O[5],colorLinkActive:O[7]})},ft=function(n,o){var t=["#ffffff","#d9ebfb","#b4d6f7","#90c0f5","#6caaf5","#4792f8","#1677ff","#0568e0","#005ac0","#004ca1","#003e84"];return B()(B()({},o),{},{colorBgLayout:"hsl(220,23%,97%)",colorPrimaryBg:t[1],colorPrimaryBgHover:t[2],colorPrimaryBorder:t[3],colorPrimaryBorderHover:t[4],colorPrimaryHover:t[5],colorPrimary:t[6],colorPrimaryActive:t[7],colorPrimaryTextHover:t[8],colorPrimaryText:t[9],colorPrimaryTextActive:t[10]})},yt=function(n){var o={token:{colorTextBase:"#3d3e40"},algorithm:ft};return n==="dark"&&(o.token={colorTextBase:"#c7ddff"},o.algorithm=gt),o},bt=s(14661),c=s.n(bt),jt=s(48453),D=s.n(jt),bn,jn,Sn,kn,wn,Cn,Tn,Bn,St=function(n){var o=n.css,t=n.token,a=n.isDarkMode;return{clickableText:o(bn||(bn=c()([`
      cursor: pointer;
      color: `,`;

      &:hover {
        color: `,`;
      }
    `])),t.colorTextSecondary,t.colorText),resetLinkColor:o(jn||(jn=c()([`
      color: inherit;

      &:hover,
      &:active {
        color: inherit;
      }
    `]))),heroButtonGradient:o(Sn||(Sn=c()([`
      background: linear-gradient(90deg, `," 0%, ",` 100%);
    `])),t.gradientColor1,t.gradientColor2),heroGradient:o(kn||(kn=c()([`
      background-image: `,`;
      background-size: 300% 300%;
    `])),t.gradientHeroBgG),heroGradientFlow:o(wn||(wn=c()([`
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
    `]))),heroTextShadow:o(Cn||(Cn=c()([`
      text-shadow: 0 8px 20px `,`,
        0 8px 60px `,`,
        0 8px 80px
          `,`;
    `])),D()(t.gradientColor2).alpha(.2).hex(),D()(t.gradientColor3).alpha(.2).hex(),D()(t.cyan).alpha(a?.2:.4).hex()),heroBlurBall:o(Tn||(Tn=c()([`
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
    `])),t.gradientColor3,t.gradientColor1,t.red,t.cyan),iconGradientDefault:o(Bn||(Bn=c()([`
      radial-gradient(
        100% 100% at 50% 0,
        `,` 0,
        `,` 100%
      )`])),D()(t.colorSolid).alpha(.2).hex(),D()(t.colorSolid).alpha(.1).hex())}},kt=function(n){var o=n.isDarkMode,t=n.token,a=t.blue,l=o?t.pink:t.cyan,i=t.purple,d=o?t.colorWhite:"#000";return{headerHeight:64,sidebarWidth:240,tocWidth:176,contentMaxWidth:1152,colorSolid:d,gradientColor1:a,gradientColor2:l,gradientColor3:i,gradientHeroBgG:"radial-gradient(at 80% 20%, ".concat(a," 0%, ").concat(l," 80%, ").concat(i," 130%)"),gradientIconDefault:`radial-gradient(
        100% 100% at 50% 0,
        `.concat(D()(d).alpha(.2).hex(),` 0,
        `).concat(D()(d).alpha(o?.1:.4).hex(),` 100%
      )`)}},e=s(11527),wt=function(r){var n=r.children,o=on(function(t){return t.themeMode});return(0,e.jsx)(ht.V,{prefix:"site",children:(0,e.jsx)(mt.f,{prefixCls:"site",themeMode:o,theme:yt,customStylish:St,customToken:kt,children:(0,e.jsx)(pt.Z,{children:n})})})},Ct=s(28488),rn=s.n(Ct),an=s(57323),Tt={siteData:{setLoading:void 0,loading:!0,pkg:{},components:{},demos:{},locales:[],entryExports:{},themeConfig:{}},sidebar:[],navData:[],location:{pathname:"",state:"",search:"",hash:"",key:""},routeMeta:{toc:[],texts:[],tabs:void 0,frontmatter:{}}},f=(0,fn.Ue)()((0,yn.mW)(function(){return B()({},Tt)},{name:"dumi-site-store"})),Bt=function(n){return n.location.pathname.startsWith("/api")},Ht=function(n){return!!n.routeMeta.frontmatter.hero},Ot=function(n){return n.routeMeta.frontmatter.features},Dt=function(n){if(n.location.pathname==="/")return"/";var o=n.navData.filter(function(t){return t.link!=="/"}).find(function(t){return n.location.pathname.startsWith(t.activePath)});return(o==null?void 0:o.activePath)||""},zt=["setLoading"],Mt=["setLoading"],Pt=(0,u.memo)(function(){var r=(0,j.WF)(),n=(0,j.tx)(),o=(0,j.eL)(),t=(0,j.OK)(),a=(0,an.TH)();return(0,u.useEffect)(function(){var l=r.setLoading,i=rn()(r,zt),d=f.getState(),p=d.siteData,m=p.setLoading,b=rn()(p,Mt);A()(i,b)||f.setState({siteData:r})},[r]),(0,u.useEffect)(function(){f.setState({sidebar:n})},[n]),(0,u.useEffect)(function(){f.setState({routeMeta:o})},[o]),(0,u.useEffect)(function(){f.setState({navData:t})},[t]),(0,u.useEffect)(function(){f.setState({location:a})},[a]),null}),y=s(80427),E=s(40871),S=s(69683),Hn,Ft=(0,S.k)(function(r){var n=r.token,o=r.responsive,t=r.isDarkMode,a=r.css;return{content:a(Hn||(Hn=c()([`
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
  `])),n.colorBgContainer,n.boxShadow,o.mobile,n.colorTextSecondary,n.colorText,n.colorLink,n.colorLinkHover,n.colorLinkActive,t?.8:1,n.colorPrimaryText,n.colorPrimaryBg,n.colorFillTertiary,n.colorBorderSecondary,n.colorTextDescription,n.colorBorder,n.colorText,n.colorTextTertiary)}}),Nt=function(n){var o=n.children,t=(0,j.tx)(),a=Ft(),l=a.styles,i=a.cx;return(0,e.jsx)("div",{className:i("dumi-default-content",l.content),"data-no-sidebar":!t||void 0,children:o})},Zt=Nt,At=s(50767),Lt=s(34484),On=s(77543),Et=s(49724),It=s(1227),Rt=s(30119),Wt=s(89634),J=s(96084),Gt=s(20854),Dn,zn,Ut=(0,S.k)(function(r){var n=r.css,o=r.responsive,t=r.token,a="rc-footer";return{container:n(Dn||(Dn=c()([`
      grid-area: footer;
      border-top: 1px solid `,`;
      color: `,`;
      text-align: center;
      align-self: stretch;
      `,` {
        border: none;
        flex-direction: column;
      }
    `])),t.colorSplit,t.colorTextDescription,o.mobile),footer:n(zn||(zn=c()([`
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
    `])),t.colorTextSecondary,t.colorBgLayout,a,t.colorTextTertiary,t.colorLinkHover,a,t.contentMaxWidth,t.colorText,t.colorBorderSecondary,o.mobile,a)}}),Kt=function(n){var o=n.columns,t=n.bottom,a=n.theme,l=Ut(),i=l.styles;return(0,e.jsx)("div",{className:i.container,children:(0,e.jsx)(Gt.Z,{theme:a,className:i.footer,columns:o,bottom:t})})},Vt=Kt,Mn,Pn,Xt=(0,S.k)(function(r){var n=r.css,o=r.responsive,t=r.token,a="rc-footer";return{container:n(Mn||(Mn=c()([`
      grid-area: footer;
      border-top: 1px solid `,`;
      color: `,`;
      text-align: center;
      align-self: stretch;
      `,` {
        border: none;
        flex-direction: column;
      }
    `])),t.colorSplit,t.colorTextDescription,o.mobile),footer:n(Pn||(Pn=c()([`
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
    `])),t.colorTextSecondary,t.colorBgLayout,a,t.colorTextTertiary,t.colorLinkHover,a,t.contentMaxWidth,t.colorText,t.colorBorderSecondary,o.mobile,a)}}),Yt=function(){var n=f(function(p){return p.siteData}),o=n.themeConfig,t=Xt(),a=t.styles,l=t.theme,i=(0,J.F)(),d=i.mobile;return o.footer?(0,e.jsx)(Vt,{theme:l.appearance,columns:[{title:"\u76F8\u5173\u8D44\u6E90",items:[{title:"Ant Design Pro",url:"https://pro.ant.design",openExternal:!0},{title:"Ant Design Pro Components",url:"https://procomponents.ant.design",openExternal:!0},{title:"Umi",description:"React \u5E94\u7528\u5F00\u53D1\u6846\u67B6",url:"https://umijs.org",openExternal:!0},{title:"Dumi",description:"\u7EC4\u4EF6/\u6587\u6863\u7814\u53D1\u5DE5\u5177",url:"https://d.umijs.org",openExternal:!0},{title:"qiankun",description:"\u5FAE\u524D\u7AEF\u6846\u67B6",url:"https://qiankun.umijs.org",openExternal:!0}]},{title:"\u793E\u533A",items:[{icon:(0,e.jsx)(At.Z,{}),title:"Medium",url:"http://medium.com/ant-design/",openExternal:!0},{icon:(0,e.jsx)(Lt.Z,{style:{color:"#1DA1F2"}}),title:"Twitter",url:"http://twitter.com/antdesignui",openExternal:!0},{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",alt:"yuque"}),title:"Ant Design \u8BED\u96C0\u4E13\u680F",url:"https://yuque.com/ant-design/ant-design",openExternal:!0},{icon:(0,e.jsx)(On.Z,{style:{color:"#056de8"}}),title:"Ant Design \u77E5\u4E4E\u4E13\u680F",url:"https://www.zhihu.com/column/c_1564262000561106944",openExternal:!0},{icon:(0,e.jsx)(On.Z,{style:{color:"#056de8"}}),title:"\u4F53\u9A8C\u79D1\u6280\u4E13\u680F",url:"http://zhuanlan.zhihu.com/xtech",openExternal:!0},{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png",alt:"seeconf"}),title:"SEE Conf",description:"SEE Conf-\u8682\u8681\u4F53\u9A8C\u79D1\u6280\u5927\u4F1A",url:"https://seeconf.antfin.com/",openExternal:!0}]},{title:"\u5E2E\u52A9",items:[{icon:(0,e.jsx)(Et.Z,{}),title:"GitHub",url:"https://github.com/ant-design/antd-style",openExternal:!0},{icon:(0,e.jsx)(It.Z,{}),title:"\u66F4\u65B0\u65E5\u5FD7",url:"/changelog"},{icon:(0,e.jsx)(Rt.Z,{}),title:"\u8BA8\u8BBA",url:"https://github.com/ant-design/antd-style/issues",openExternal:!0}]},{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",alt:"more products"}),title:"\u66F4\u591A\u4EA7\u54C1",items:[{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",alt:"yuque"}),title:"\u8BED\u96C0",url:"https://yuque.com",description:"\u77E5\u8BC6\u521B\u4F5C\u4E0E\u5206\u4EAB\u5DE5\u5177",openExternal:!0},{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png",alt:"AntV"}),title:"AntV",url:"https://antv.vision",description:"\u6570\u636E\u53EF\u89C6\u5316\u89E3\u51B3\u65B9\u6848",openExternal:!0},{icon:(0,e.jsx)("img",{src:"https://www.eggjs.org/logo.svg",alt:"Egg"}),title:"Egg",url:"https://eggjs.org",description:"\u4F01\u4E1A\u7EA7 Node.js \u6846\u67B6",openExternal:!0},{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico",alt:"kitchen"}),title:"Kitchen",description:"Sketch \u5DE5\u5177\u96C6",url:"https://kitchen.alipay.com",openExternal:!0},{icon:(0,e.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",alt:"xtech"}),title:"\u8682\u8681\u4F53\u9A8C\u79D1\u6280",url:"https://xtech.antfin.com/",openExternal:!0}]}],bottom:d?(0,e.jsxs)(E.Z,{className:a.container,children:["Copyright \xA9 2022-",new Date().getFullYear(),(0,e.jsx)(y.D,{align:"center",horizontal:!0,children:"Made with \u2764\uFE0F by \u8682\u8681\u96C6\u56E2 - AFX & \u6570\u5B57\u79D1\u6280"})]}):(0,e.jsxs)(E.Z,{horizontal:!0,children:["Copyright \xA9 2022-",new Date().getFullYear()," ",(0,e.jsx)(Wt.Z,{type:"vertical"}),"Made with \u2764\uFE0F by \u8682\u8681\u96C6\u56E2 - AFX & \u6570\u5B57\u79D1\u6280"]})}):null},Fn=Yt,$t=s(30577),H=s.n($t),Jt=s(95520),Nn,Qt=(0,S.k)(function(r){var n=r.css,o=r.stylish,t=r.responsive,a=r.token;return n(Nn||(Nn=c()([`
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
  `])),a.fontFamily,a.colorText,o.clickableText,t.mobile,t.mobile)}),qt=function(){var n=(0,j.bU)(),o=f(function(i){return i.siteData.themeConfig},A()),t=Qt(),a=t.styles,l=t.cx;return o&&(0,e.jsxs)(j.rU,{className:l(a),to:"base"in n?n.base:"/",children:[(0,e.jsx)("img",{src:o.logo,alt:o.name}),o.name]})},Zn=(0,u.memo)(qt),_t=s(19238),no=s(45478),An=s(26209),Ln,En,eo=(0,S.k)(function(r){var n=r.css,o=r.responsive,t=r.token,a=r.stylish,l=r.prefixCls,i=".".concat(l,"-tabs"),d=16,p=6;return{tabs:n(Ln||(Ln=c()([`
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
    `])),i,i,d,i,t.colorTextSecondary,d,d,p,t.colorText,t.colorFillTertiary,t.borderRadius,i,o.mobile),link:n(En||(En=c()([`
      `,`
    `])),a.resetLinkColor)}}),to=function(){var n=eo(),o=n.styles,t=f(function(i){return i.navData},An.X),a=(0,j.TH)(),l=a.pathname.replace("/en-US/","").replace("/","").split("/").shift();return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(_t.Z,{onChange:function(d){var p;j.m8.push(((p=t.find(function(m){return m.link.replace("/en-US/","").replace("/","")===d}))===null||p===void 0?void 0:p.link)||"/"),setTimeout(function(){window.scrollTo(0,0)},10)},activeKey:l,className:o.tabs,items:t.map(function(i){return{label:i.title,link:i.link,key:i.link.replace("/en-US/","").replace("/","")}})}),(0,e.jsx)(no.Z,{})]})},oo=(0,u.memo)(to),In=s(28906),Rn=s(79858),Wn,Gn,Un,Kn,Vn,Xn=(0,S.k)(function(r){var n=r.token,o=r.responsive,t=r.css,a=r.cx;return{container:t(Wn||(Wn=c()([`
      position: relative;

      // TODO: support search for mobile devices
      `,` {
        display: none;
      }
    `])),o.mobile),shortcut:a("site-header-shortcut",t(Gn||(Gn=c()([`
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
      `])),n.colorTextDescription,n.colorFillSecondary,n.colorBorderSecondary,o.mobile)),popover:t(Un||(Un=c()([`
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
    `])),n.colorBgElevated),svg:a(t(Kn||(Kn=c()([`
        position: absolute;
        top: 50%;
        margin-top: 1px;
        inset-inline-start: 16px;
        width: 16px;
        color: `,`;
        transform: translateY(-50%);
      `])),n.colorTextPlaceholder)),input:t(Vn||(Vn=c()([`
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
    `])),n.controlHeightLG,n.colorTextSecondary,n.colorBorder,n.colorBorderSecondary,n.colorBgElevated,n.colorTextPlaceholder)}}),Yn=(0,u.forwardRef)(function(r,n){var o=Xn(),t=o.styles,a=(0,j.YB)(),l=(0,u.useRef)(!1),i=(0,u.useRef)(null);return(0,u.useImperativeHandle)(n,function(){return i.current}),(0,e.jsx)("input",{className:r.className,onCompositionStart:function(){return l.current=!0},onCompositionEnd:function(p){l.current=!1,r.onChange(p.currentTarget.value)},onFocus:r.onFocus,onBlur:r.onBlur,onKeyDown:function(p){["ArrowDown","ArrowUp"].includes(p.key)&&p.preventDefault(),p.key==="Escape"&&!l.current&&p.currentTarget.blur()},onChange:function(p){setTimeout(function(){l.current||r.onChange(p.target.value)},1)},placeholder:a.formatMessage({id:"header.search.placeholder"}),ref:i})}),$n,Jn,Qn,ro=(0,S.k)(function(r){var n=r.token,o=r.css;return{modal:o($n||($n=c()([`
      position: fixed;
      top: 0;
      inset-inline-start: 0;
      z-index: 1000;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
    `]))),mask:o(Jn||(Jn=c()([`
      background-color: `,`;
      width: 100%;
      height: 100%;
    `])),n.colorBgMask),content:o(Qn||(Qn=c()([`
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
    `])),n.colorBgElevated)}}),ao=function(n){var o=ro(),t=o.styles;return(0,u.useEffect)(function(){if(n.visible)document.body.style.overflow="hidden";else{var a;document.body.style.overflow="",(a=n.onClose)===null||a===void 0||a.call(n)}},[n.visible]),n.visible?(0,e.jsxs)("div",{className:t.modal,children:[(0,e.jsx)("div",{className:t.mask,onClick:n.onMaskClick}),(0,e.jsx)("div",{className:t.content,children:n.children})]}):null},ln,qn=/(mac|iphone|ipod|ipad)/i.test(typeof navigator!="undefined"?(ln=navigator)===null||ln===void 0?void 0:ln.platform:""),io=function(){var n=Xn(),o=n.styles,t=(0,u.useState)(!1),a=H()(t,2),l=a[0],i=a[1],d=(0,u.useRef)(null),p=(0,u.useRef)(null),m=(0,u.useState)("\u2318"),b=H()(m,2),k=b[0],v=b[1],h=(0,j.OO)(),g=h.keywords,x=h.setKeywords,I=h.result,W=h.loading,q=(0,u.useState)(!1),N=H()(q,2),G=N[0],P=N[1];return(0,u.useEffect)(function(){qn||v("Ctrl");var w=function(Z){if(((qn?Z.metaKey:Z.ctrlKey)&&Z.key==="k"||Z.key==="/")&&(Z.preventDefault(),d.current)){var F=d.current.getBoundingClientRect(),X=F.top,un=F.bottom,_=F.left,Y=F.right,nn=X>=0&&_>=0&&un<=window.innerHeight&&Y<=window.innerWidth;nn?d.current.focus():(x(""),P(!0),setTimeout(function(){var $;($=p.current)===null||$===void 0||$.focus()}))}Z.key==="Escape"&&(Z.preventDefault(),P(!1))};return document.addEventListener("keydown",w),function(){return document.removeEventListener("keydown",w)}},[]),(0,e.jsxs)("div",{className:o.container,children:[(0,e.jsx)(In.Z,{className:o.svg}),(0,e.jsx)(Yn,{onFocus:function(){return i(!0)},onBlur:function(){setTimeout(function(){i(!1)},1)},onChange:function(U){return x(U)},ref:d,className:o.input}),(0,e.jsxs)("span",{className:o.shortcut,children:[k," K"]}),g.trim()&&l&&(I.length||!W)&&!G&&(0,e.jsx)("div",{className:o.popover,children:(0,e.jsx)("section",{children:(0,e.jsx)(Rn.Z,{data:I,loading:W})})}),(0,e.jsxs)(ao,{visible:G,onMaskClick:function(){P(!1)},onClose:function(){return x("")},children:[(0,e.jsxs)("div",{style:{position:"relative"},children:[(0,e.jsx)(In.Z,{className:o.svg}),(0,e.jsx)(Yn,{className:o.input,onFocus:function(){return i(!0)},onBlur:function(){setTimeout(function(){i(!1)},1)},onChange:function(U){return x(U)},ref:p})]}),(0,e.jsx)(Rn.Z,{data:I,loading:W,onItemSelect:function(){P(!1)}})]})]})},lo=io,so=s(9555),co=s(59398),uo=s(32699),_n,ne,ee,te,oe,re,po=(0,S.k)(function(r){var n=r.token,o=r.prefixCls,t=r.cx,a=r.css,l=r.stylish,i=6;return{icon:t("site-burger-icon",a(_n||(_n=c()([`
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
      `])),n.colorTextSecondary,i,i)),active:a(ne||(ne=c()([`
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
    `])),n.colorText),container:a(ee||(ee=c()([`
      width: `,`px;
      height: `,`px;
      border-radius: `,`px;
      cursor: pointer;
    `])),n.controlHeight,n.controlHeight,n.borderRadius),drawerRoot:a(te||(te=c()([`
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
    `])),n.headerHeight+1,o,D()(n.colorBgBase).alpha(.5).hex()),drawer:a(oe||(oe=c()([`
      &.`,`-drawer-content {
        background: transparent;
      }
    `])),o),menu:a(re||(re=c()([`
      background: transparent;
      border-inline-end: transparent !important;

      .`,"-menu-sub.",`-menu-inline {
        background: `,` !important;
      }
    `])),o,o,D()(n.colorBgLayout).alpha(.8).hex())}}),ho=function(){var n=(0,u.useState)(!1),o=H()(n,2),t=o[0],a=o[1],l=po(),i=l.styles,d=l.cx,p=f(function(v){return v.navData},A()),m=f(function(v){return v.sidebar},A()),b=f(Dt),k=f(function(v){return v.location.pathname});return(0,e.jsxs)(E.Z,{className:i.container,onClick:function(){a(!t)},children:[(0,e.jsx)("div",{className:d(i.icon,t?i.active:"")}),(0,e.jsx)(so.Z,{open:t,placement:"left",closeIcon:null,rootClassName:i.drawerRoot,className:i.drawer,width:"100vw",headerStyle:{display:"none"},bodyStyle:{padding:"24px 0"},children:(0,e.jsx)(co.Z,{mode:"inline",selectedKeys:(0,uo.uniq)([b,"s-".concat(k)]),openKeys:[b],className:i.menu,items:p.map(function(v){return{label:(0,e.jsx)(an.rU,{to:v.link,children:v.title}),key:v.activePath,children:v.activePath===b&&(m==null?void 0:m.map(function(h){return!h.link&&{label:h.title,type:"group",children:h.children.map(function(g){return{label:(0,e.jsx)(an.rU,{to:g.link,onClick:function(){a(!1)},children:g.title}),key:"s-".concat(g.link)}})}}))}})})})]})},mo=ho,ae=s(62442),ie=s(24491),sn=s(93464),xo=function(){var n=f(function(o){var t,a;return(t=o.siteData.themeConfig)===null||t===void 0||(a=t.socialLinks)===null||a===void 0?void 0:a.github});return n&&(0,e.jsx)(ie.Z,{showArrow:!1,title:"Github",children:(0,e.jsx)("a",{href:n,target:"_blank",children:(0,e.jsx)(sn.ZP,{icon:(0,e.jsx)(ae.Z,{})})})})},vo=xo,le=s(48424),z=s(62253),go=s(71711),V=s(99330),se=s(10422),fo=s(57901),yo=s(24047),ce=s.n(yo),de,ue,pe,bo=(0,S.k)(function(r,n){var o=r.css,t=r.cx,a=r.token;return{item:t("".concat(n,"-item"),o(de||(de=c()([`
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
    `])),a.fontFamily,a.colorText,a.colorFillTertiary)),selected:t("".concat(n,"-item-selected"),o(ue||(ue=c()([`
      color: `,`;
      background: `,`;
      font-weight: bold;
      &:hover {
        color: `,`;
        background: `,`;
      }
    `])),a.colorPrimaryText,a.colorPrimaryBg,a.colorPrimaryTextHover,a.colorPrimaryBgHover)),active:t("".concat(n,"-item-active"),o(pe||(pe=c()([`
      background: `,`;
    `])),a.colorFillTertiary))}}),jo=["value","label","prefixCls","isSelected","isActive","disabled"],So=(0,u.forwardRef)(function(r,n){var o,t=r.value,a=r.label,l=r.prefixCls,i=r.isSelected,d=r.isActive,p=r.disabled,m=rn()(r,jo),b=bo({prefixCls:l,selected:i}),k=b.styles,v=b.cx;return(0,e.jsx)("button",B()(B()({disabled:p,"aria-selected":i,role:"option",tabIndex:-1,className:v(k.item,(o={},ce()(o,k.selected,i),ce()(o,k.active,d),o)),ref:n},m),{},{children:a}),t)}),ko=So,he,me,wo=(0,S.k)(function(r,n){var o=r.css,t=r.stylish,a=r.cx,l=r.token;return{container:a(n,o(he||(he=c()([`
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
    `])),l.colorBgElevated,l.fontSize,l.colorBorder,l.boxShadowSecondary)),button:a("".concat(n,"-button"),o(me||(me=c()([`
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
    `])),l.fontSize,l.colorBgContainer,l.colorTextSecondary,l.borderRadius,l.colorBorder,t.buttonDefaultHover,l.colorPrimary,l.colorPrimaryBg))}}),Co=function(n){var o=n.options,t=o===void 0?[]:o,a=n.value,l=n.prefixCls,i=n.onChange,d=n.renderValue,p=n.renderItem,m=l!=null?l:"native-select",b=(0,fo.Z)(0,{value:a,onChange:i}),k=H()(b,2),v=k[0],h=k[1],g=wo(m),x=g.styles,I=(0,u.useRef)([]),W=(0,u.useRef)([]),q=(0,u.useRef)(null),N=(0,u.useRef)(!1),G=(0,u.useRef)(!0),P=(0,u.useRef)(),w=(0,u.useRef)(null),U=(0,u.useState)(!1),Z=H()(U,2),F=Z[0],X=Z[1],un=(0,u.useState)(null),_=H()(un,2),Y=_[0],nn=_[1],$=(0,u.useState)(!1),_e=H()($,2),en=_e[0],nt=_e[1],Sr=(0,u.useState)(0),et=H()(Sr,2),tt=et[0],pn=et[1],kr=(0,u.useState)(!1),ot=H()(kr,2),tn=ot[0],rt=ot[1],wr=(0,u.useState)(0),at=H()(wr,2),Nr=at[0],it=at[1],Cr=(0,u.useState)(!1),lt=H()(Cr,2),st=lt[0],hn=lt[1];F||(tt!==0&&pn(0),en&&nt(!1),st&&hn(!1));var K=(0,z.YF)({placement:"bottom-start",open:F,onOpenChange:X,whileElementsMounted:go.Me,middleware:en?[(0,V.cv)(5),tn?(0,V.uY)({crossAxis:!0,padding:10}):(0,V.RR)({padding:10}),(0,V.dp)({apply:function(C){var T,L,Mr=C.availableHeight;Object.assign((T=(L=w.current)===null||L===void 0?void 0:L.style)!==null&&T!==void 0?T:{},{maxHeight:"".concat(Mr,"px")})},padding:10})]:[(0,z.aN)({listRef:I,overflowRef:q,scrollRef:w,index:v,offset:tt,onFallbackChange:nt,padding:10,minItemsVisible:tn?8:4,referenceOverflowThreshold:20}),(0,V.cv)({crossAxis:-4})]}),mn=K.x,xn=K.y,Tr=K.strategy,ct=K.refs,R=K.context,Zr=K.isPositioned,vn=(0,z.NI)([(0,z.eS)(R,{event:"mousedown"}),(0,z.bQ)(R),(0,z.qs)(R,{role:"listbox"}),(0,z.Rz)(R,{enabled:!en,onChange:pn,overflowRef:q,scrollRef:w}),(0,z.c0)(R,{listRef:I,activeIndex:Y,selectedIndex:v,onNavigate:nn}),(0,z.ox)(R,{listRef:W,activeIndex:Y,onMatch:F?nn:h})]),Br=vn.getReferenceProps,Hr=vn.getFloatingProps,Or=vn.getItemProps;(0,u.useEffect)(function(){return F?(P.current=setTimeout(function(){N.current=!0},300),function(){clearTimeout(P.current)}):(N.current=!1,G.current=!0,function(){return[]})},[F]);var Ar=function(C){en?w.current&&(w.current.scrollTop-=C,(0,se.flushSync)(function(){var T,L;return it((T=(L=w.current)===null||L===void 0?void 0:L.scrollTop)!==null&&T!==void 0?T:0)})):(0,se.flushSync)(function(){return pn(function(T){return T-C})})},Lr=function(){tn&&(clearTimeout(P.current),hn(!0),P.current=setTimeout(function(){hn(!1)},400))},Dr=t[v]||{},zr=Dr.label;return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("button",B()(B()({ref:ct.setReference,className:x.button},Br({onTouchStart:function(){rt(!0)},onPointerMove:function(C){var T=C.pointerType;T==="mouse"&&rt(!1)}})),{},{children:d?d(v):zr})),(0,e.jsx)(z.ll,{children:F&&(0,e.jsx)(z.y0,{lockScroll:!tn,style:{zIndex:3e3},children:(0,e.jsx)(z.wD,{context:R,modal:!1,initialFocus:-1,children:(0,e.jsx)("div",{ref:ct.setFloating,style:{position:Tr,top:xn!=null?xn:0,left:mn!=null?mn:0},children:(0,e.jsx)("div",B()(B()({className:x.container,style:{overflowY:"auto"},ref:w},Hr({onScroll:function(C){var T=C.currentTarget;it(T.scrollTop)},onContextMenu:function(C){C.preventDefault()}})),{},{children:t.map(function(M,C){return(0,e.jsx)(ko,B()({value:M.value,label:p?p(M,C):M.label,disabled:st,isSelected:C===v,isActive:C===Y,ref:function(L){I.current[C]=L,W.current[C]=M.label}},Or({onTouchStart:function(){N.current=!0,G.current=!1},onKeyDown:function(){N.current=!0},onClick:function(){N.current&&(h(C),X(!1))},onMouseUp:function(){G.current&&(N.current&&(h(C),X(!1)),clearTimeout(P.current),P.current=setTimeout(function(){N.current=!0}))}})),M.value)})}))})})})})]})},To=Co,xe,Bo=function(){return(0,e.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,e.jsx)("path",{d:"M8.218 1.455c3.527.109 6.327 3.018 6.327 6.545 0 3.6-2.945 6.545-6.545 6.545a6.562 6.562 0 0 1-6.036-4h.218c3.6 0 6.545-2.945 6.545-6.545 0-.91-.182-1.745-.509-2.545m0-1.455c-.473 0-.909.218-1.2.618-.29.4-.327.946-.145 1.382.254.655.4 1.31.4 2 0 2.8-2.291 5.09-5.091 5.09h-.218c-.473 0-.91.22-1.2.62-.291.4-.328.945-.146 1.38C1.891 14.074 4.764 16 8 16c4.4 0 8-3.6 8-8a7.972 7.972 0 0 0-7.745-8h-.037Z"})})},Ho=function(){return(0,e.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,e.jsx)("path",{d:"M8 13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM8 3a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm7 4a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM3 8a1 1 0 0 1-1 1H1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm9.95 3.536.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-9.9-7.072-.707-.707a1 1 0 0 1 1.414-1.414l.707.707A1 1 0 0 1 3.05 4.464Zm9.9 0a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707Zm-9.9 7.072a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707ZM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"})})},Oo=function(){return(0,e.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,e.jsx)("path",{d:"M14.595 8a6.595 6.595 0 1 1-13.19 0 6.595 6.595 0 0 1 13.19 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 2.014v11.972A5.986 5.986 0 0 0 8 2.014Z"})})},Do=le.zo.span(xe||(xe=c()([`
  width: 12px;
`]))),zo=function(n){var o=n.icon,t=n.label;return(0,e.jsxs)(y.D,{horizontal:!0,gap:12,align:"center",children:[(0,e.jsxs)(Do,{children:[o," "]}),t]})},Q=[{label:"\u8DDF\u968F\u7CFB\u7EDF",icon:(0,e.jsx)(Oo,{}),value:"auto"},{label:"\u4EAE\u8272\u6A21\u5F0F",icon:(0,e.jsx)(Ho,{}),value:"light"},{label:"\u6697\u8272\u6A21\u5F0F",icon:(0,e.jsx)(Bo,{}),value:"dark"}],Mo=function(){var n=on(function(o){return o.themeMode});return(0,e.jsx)("span",{children:(0,e.jsx)(To,{options:Q,value:Q.findIndex(function(o){return o.value===n}),onChange:function(t){var a=Q[t].value;on.setState({themeMode:a})},renderValue:function(t){return Q[t].icon},renderItem:function(t){return(0,e.jsx)(zo,{label:t.label,icon:t.icon})}})})},ve=(0,u.memo)(Mo),ge,fe,ye,be,Po=(0,S.k)(function(r){var n=r.css,o=r.responsive,t=r.token;return{header:n(ge||(ge=c()([`
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
  `])),t.zIndexPopupBase-50,t.colorSplit,o.mobile,t.colorBgContainer),content:n(fe||(fe=c()([`
    padding: 0 24px;
    height: 64px;

    `,` {
      padding: 0 16px;
    }
  `])),o.mobile),left:n(ye||(ye=c()([""]))),right:n(be||(be=c()([`
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
  `])),o.mobile,t.colorBorder)}}),Fo=function(){var n=(0,u.useState)(!1),o=H()(n,2),t=o[0],a=o[1],l=f(function(b){return b.routeMeta.frontmatter},A()),i=(0,J.F)(),d=i.mobile,p=Po(),m=p.styles;return l&&(0,e.jsx)("div",{className:m.header,"data-static":Boolean(l.hero)||void 0,"data-mobile-active":t||void 0,onClick:function(){return a(!1)},children:(0,e.jsx)(y.D,{horizontal:!0,distribution:"space-between",align:"center",width:"auto",className:m.content,children:d?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(y.D,{children:(0,e.jsx)(mo,{})}),(0,e.jsx)(y.D,{horizontal:!0,className:m.left,children:(0,e.jsx)(Zn,{})}),(0,e.jsx)(y.D,{children:(0,e.jsx)(ve,{})})]}):(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(y.D,{horizontal:!0,className:m.left,children:(0,e.jsx)(Zn,{})}),(0,e.jsx)(y.D,{style:{marginLeft:48,alignSelf:"end"},children:(0,e.jsx)(oo,{})}),(0,e.jsxs)("section",{className:m.right,children:[(0,e.jsx)("div",{}),(0,e.jsxs)(y.D,{gap:16,horizontal:!0,align:"center",className:"dumi-default-header-right-aside",children:[(0,e.jsx)(lo,{}),(0,e.jsx)(Jt.Z,{}),(0,e.jsx)(vo,{}),(0,e.jsx)(ve,{})]})]})]})})})},je=Fo,Se,No=(0,S.k)(function(r){var n=r.css,o=r.token;return{sidebar:n(Se||(Se=c()([`
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
  `])),o.headerHeight,o.headerHeight,o.colorSplit,o.colorText,o.fontSize,o.lineHeight,o.colorTextSecondary,o.colorText,o.colorFillTertiary,o.colorPrimaryText,o.colorPrimaryBg,o.colorPrimaryTextHover,o.colorPrimaryBgHover,o.colorBorder)}}),Zo=function(){var n=f(function(l){return l.sidebar},A()),o=No(),t=o.styles,a=(0,j.TH)();return a.pathname.includes("changelog")?null:n&&(0,e.jsx)("div",{className:t.sidebar,children:n.map(function(l,i){return(0,e.jsxs)("dl",{children:[l.title&&(0,e.jsx)("dt",{children:l.title}),l.children.map(function(d){return(0,e.jsx)("dd",{children:(0,e.jsx)(j.OL,{to:d.link,title:d.title,end:!0,children:d.title})},d.link)})]},String(i))})})},Ao=(0,u.memo)(Zo),Lo=s(7913),Eo=s(88427),cn=s(12278),ke=s(23315),we=s(67922),Ce,Te,Be,Io=(0,S.k)(function(r){var n=r.token,o=r.prefixCls,t=r.responsive,a=r.css,l=36;return{container:a(Ce||(Ce=c()([`
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
    `])),n.tocWidth,t.mobile,n.headerHeight+1,n.colorTextDescription),mobileCtn:a(Te||(Te=c()([`
      position: sticky;
      top: `,`px;

      height: `,`px;
      width: 100%;
      z-index: 200;
      background: transparent;
      background: `,`;
    `])),n.headerHeight+1,l,D()(n.colorBgContainer).alpha(.8).css()),expand:a(Be||(Be=c()([`
      backdrop-filter: blur(6px);
      border-radius: 0;
      border-bottom: 1px solid `,`;

      box-shadow: `,`;
      width: 100%;
      z-index: 201;

      .`,`-collapse-header {
        padding: 8px 16px !important;
      }
    `])),n.colorSplit,n.boxShadowSecondary,o)}}),Ro=function(){var n=(0,j.TH)(),o=(0,u.useState)(),t=H()(o,2),a=t[0],l=t[1],i=(0,j.eL)(),d=Io(),p=d.styles,m=(0,J.F)(),b=m.mobile,k=(0,u.useMemo)(function(){return i.toc.reduce(function(h,g){if(g.depth===2)h.push(B()({},g));else if(g.depth===3){var x=h[h.length-1];x&&(x.children=x.children||[],x.children.push(B()({},g)))}return h},[])},[i.toc]),v=i.toc.find(function(h){return h.id===a});return((k==null?void 0:k.length)===0?null:b?(0,e.jsx)(cn.ZP,{theme:{token:{fontSize:12,sizeStep:3}},children:(0,e.jsx)("div",{className:p.mobileCtn,children:(0,e.jsx)(ke.Z,{bordered:!1,ghost:!0,expandIconPosition:"end",expandIcon:function(g){var x=g.isActive;return x?(0,e.jsx)(Lo.Z,{}):(0,e.jsx)(Eo.Z,{})},className:p.expand,children:(0,e.jsx)(ke.Z.Panel,{forceRender:!0,header:v?v.title:"\u76EE\u5F55",children:(0,e.jsx)(cn.ZP,{theme:{token:{fontSize:14,sizeStep:4}},children:(0,e.jsx)(we.Z,{onChange:function(g){l(g.replace("#",""))},items:k.map(function(h){var g;return{href:"#".concat(h.id),title:n.pathname.includes("changelog")?h.title.replace("@ant-design/pro-components",""):h.title,key:h.id,children:(g=h.children)===null||g===void 0?void 0:g.map(function(x){return{href:"#".concat(x.id),title:x==null?void 0:x.title,key:x.id}})}})})})},"toc")})})}):(0,e.jsxs)("div",{className:p.container,children:[(0,e.jsx)("h4",{children:"\u76EE\u5F55"}),(0,e.jsx)(we.Z,{items:k.map(function(h){var g;return{href:"#".concat(h.id),title:n.pathname.includes("changelog")?h.title.replace("@ant-design/pro-components@","v"):h.title,key:h.id,children:(g=h.children)===null||g===void 0?void 0:g.map(function(x){return{href:"#".concat(x.id),title:x==null?void 0:x.title,key:x.id}})}})})]}))||null},Wo=Ro,Go=s(79908),dn=s(72874),Uo=s(73875),Ko=s(874),Vo=s.n(Ko),Xo=s(1857),Yo=s(72752),He,$o=(0,S.k)(function(r){var n=r.css,o=r.token;return n(He||(He=c()([`
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
    `])),o.colorFillSecondary)}),Jo=function(n){var o=n.children,t=$o(),a=t.styles,l=t.theme,i=(0,Yo.M)(),d=i.copied,p=i.setCopied;return(0,e.jsx)(ie.Z,{placement:"right",title:d?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(Uo.Z,{style:{color:l.colorSuccess}})," \u590D\u5236\u6210\u529F"]}):"\u590D\u5236",children:(0,e.jsx)("div",{className:a,onClick:function(){Vo()(o),p()},children:(0,e.jsx)(Xo.ZP,{language:"javaScript",children:o})})})},Qo=Jo,qo=function(){return(0,e.jsx)("svg",{width:"14px",height:"14px",viewBox:"0 0 14 14",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",children:(0,e.jsx)("path",{d:"M13,0 C13.5522847,-1.01453063e-16 14,0.44771525 14,1 L14,13 C14,13.5522847 13.5522847,14 13,14 L1,14 C0.44771525,14 -4.87476137e-16,13.5522847 0,13 L0,1 C-6.76353751e-17,0.44771525 0.44771525,-4.5365845e-16 1,0 L13,0 Z M11.375,2.625 L2.625,2.625 L2.625,11.375 L7,11.375 L7,4.375 L9.625,4.375 L9.625,11.375 L11.375,11.375 L11.375,2.625 Z",fill:"#C12127"})})},Oe,De,ze,_o=(0,S.k)(function(r){var n=r.css,o=r.token,t=r.stylish;return{title:n(Oe||(Oe=c()([`
    font-family: monospace;
  `]))),desc:n(De||(De=c()([`
    font-size: `,`px;
    line-height: `,`px;
  `])),o.fontSizeLG,o.lineHeightLG),text:n(ze||(ze=c()([`
    `,`
  `])),t.clickableText)}}),Me,nr=(0,le.zo)(dn.Z.Text)(Me||(Me=c()([`
  width: 100px;
`]))),Pe="https://github.com/arvinxx/antd-style",er=(0,u.memo)(function(r){var n=r.title,o=r.description,t=_o(),a=t.styles,l=t.theme,i=[{label:"\u5F15\u5165\u65B9\u6CD5",import:!0,children:"import { ".concat(n,' } from "antd-style";')},{label:"\u6E90\u7801",icon:(0,e.jsx)(ae.Z,{}),children:"\u67E5\u770B\u6E90\u7801",url:"".concat(Pe,"/tree/master/src/").concat(n)},{label:"\u6587\u6863",icon:(0,e.jsx)(Go.Z,{}),children:"\u7F16\u8F91\u6587\u6863",url:"".concat(Pe,"/tree/master/docs/api/").concat(n)},{label:"\u4EA7\u7269",icon:(0,e.jsx)(qo,{}),children:"antd-style",url:"https://www.npmjs.com/package/antd-style?activeTab=explore"}];return(0,e.jsxs)(y.D,{children:[(0,e.jsx)(dn.Z.Title,{className:a.title,children:n}),o&&(0,e.jsx)("div",{children:(0,e.jsx)(dn.Z.Text,{type:"secondary",className:a.desc,children:o})}),(0,e.jsx)(y.D,{style:{marginTop:24},gap:12,children:i.map(function(d){return(0,e.jsxs)(y.D,{horizontal:!0,children:[(0,e.jsx)(nr,{type:"secondary",children:d.label}),d.import?(0,e.jsx)(Qo,{children:d.children}):(0,e.jsx)("a",{href:d.url,target:"_blank",children:(0,e.jsxs)(y.D,{horizontal:!0,align:"center",gap:8,className:a.text,children:[(0,e.jsx)(e.Fragment,{children:d.icon}),(0,e.jsx)(e.Fragment,{children:d.children})]})})]},d.label)})})]})}),Fe,Ne,Ze,tr=(0,S.k)(function(r){var n=r.css,o=r.responsive,t=r.token;return{layout:n(Fe||(Fe=c()([`
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
  `])),t.colorBgLayout,t.colorBgContainer,t.sidebarWidth,t.tocWidth,t.headerHeight,o.mobile),toc:n(Ne||(Ne=c()([`
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
  `])),t.tocWidth,o.mobile,t.headerHeight+1,t.colorTextDescription),content:n(Ze||(Ze=c()([`
    max-width: `,`px;
    width: 100%;
    margin: 0 24px;


    `,` {
      margin: 0;
    }
  }
  `])),t.contentMaxWidth,o.mobile)}}),or=(0,u.memo)(function(){var r=(0,j.pC)(),n=(0,J.F)(),o=n.mobile,t=f(function(m){return m.routeMeta.frontmatter},A()),a=f(Bt),l=tr(),i=l.styles,d=l.theme,p=(0,j.TH)();return(0,u.useEffect)(function(){requestAnimationFrame(function(){window.scrollTo(0,0)})},[p.pathname]),(0,e.jsxs)("div",{className:i.layout,style:p.pathname.includes("changelog")?{gridTemplateColumns:"0 1fr 300px"}:{},children:[(0,e.jsx)(je,{}),(0,e.jsx)(Wo,{}),o?null:(0,e.jsx)(Ao,{}),a?(0,e.jsx)(y.D,{style:{gridArea:"title"},children:(0,e.jsx)(E.Z,{children:(0,e.jsx)(y.D,{style:{maxWidth:d.contentMaxWidth,width:"100%"},children:(0,e.jsx)(y.D,{padding:"0 48px",children:(0,e.jsx)(er,{title:t.title,description:t.description})})})})}):null,(0,e.jsx)(y.D,{style:{zIndex:10,gridArea:"main",minWidth:0,margin:o?0:24,marginBottom:o?0:48},children:(0,e.jsx)(E.Z,{width:"100%",children:(0,e.jsx)(y.D,{className:i.content,children:(0,e.jsx)(y.D,{horizontal:!0,children:(0,e.jsx)(Zt,{children:r})})})})}),(0,e.jsx)(Fn,{})]})}),rr=or,ar=s(77172),ir=s(74631),Ae,Le,Ee,Ie,Re,We,Ge,lr=(0,S.k)(function(r){var n=r.token,o=r.responsive,t=r.css,a=r.stylish,l=r.isDarkMode;return{container:t(Ae||(Ae=c()([`
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
      `]))),laptop:{gridTemplateColumns:"repeat(2, 1fr)"}})),cell:t(Ee||(Ee=c()([`
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
  `])),n.colorFillContent,n.colorFillQuaternary,n.colorText,n.colorTextSecondary,n.colorTextDescription,l?n.colorPrimary:n.colorPrimaryBgHover),imgContainer:t(Ie||(Ie=c()([`
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
  `])),n.colorFillContent,n.gradientColor1,n.gradientColor2,n.colorBgContainer,D()(n.gradientColor2).alpha(.3).hex(),D()(n.gradientColor2).alpha(.3).hex(),D()(n.gradientColor1).alpha(.3).hex()),img:t(Re||(Re=c()([`
    width: 20px;
    height: 20px;
    color: `,`;
  `])),n.colorWhite),link:t(We||(We=c()([`
    margin-top: 24px;

    a {
      `,`;

      color: `,`;
      &:hover {
        color: `,`;
      }
    }
  `])),a.resetLinkColor,n.colorTextDescription,n.colorPrimaryHover),blur:t(Ge||(Ge=c()([`
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
  `])),a.heroBlurBall,o.mobile)}}),sr=function(){var n=f(Ot,An.X),o=lr(),t=o.styles,a=o.cx,l=o.theme;return Boolean(n==null?void 0:n.length)?(0,e.jsx)("div",{className:t.container,children:n.map(function(i){var d=i.title,p=i.description,m=i.avatar,b=i.link,k=i.imageStyle,v=i.row,h=i.column,g=i.center;return(0,e.jsxs)("div",{className:a(t.cell),style:{gridRow:"span ".concat(v||7),gridColumn:"span ".concat(h||1)},children:[m&&(0,e.jsx)(E.Z,{padding:4,width:24,height:24,"image-style":k,className:a(t.imgContainer),children:(0,e.jsx)("img",{className:t.img,src:m,alt:d})}),d&&(0,e.jsxs)(y.D,{as:"h3",horizontal:!0,gap:8,align:"center",children:[d,k==="soon"?(0,e.jsx)(ir.Z,{color:l.isDarkMode?"pink-inverse":"cyan-inverse",children:"SOON"}):null]}),p&&(0,e.jsx)("p",{dangerouslySetInnerHTML:{__html:p}})," ",b&&(0,e.jsx)("div",{className:t.link,children:(0,e.jsxs)(j.rU,{to:b,children:["\u7ACB\u5373\u4E86\u89E3 ",(0,e.jsx)(ar.Z,{})]})}),g&&(0,e.jsx)("div",{className:t.blur})]},d)})}):null},cr=sr,Ue,dr=(0,S.k)(function(r){var n=r.css,o=r.stylish,t=r.isDarkMode;return{button:n(Ue||(Ue=c()([`
      border: none;

      `,`
      `,`

      background-size: 200% 100%;

      &:hover {
        animation: none;
      }
    `])),o.heroButtonGradient,o.heroGradientFlow)}}),ur=function(n){var o=n.children,t=dr(),a=t.styles;return(0,e.jsx)(sn.ZP,{size:"large",shape:"round",type:"primary",className:a.button,children:o})},pr=ur,Ke,Ve,Xe,Ye,$e,Je,Qe,hr=(0,S.k)(function(r){var n=r.css,o=r.responsive,t=r.token,a=r.stylish,l=r.isDarkMode;return{container:n(Ke||(Ke=c()([`
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
  `])),t.colorTextSecondary,o({mobile:{fontSize:16}})),titleContainer:n(Ve||(Ve=c()([`
    position: relative;
  `]))),title:n(Xe||(Xe=c()([`
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
  `])),t.fontFamily,o({mobile:{fontSize:40}}),a.heroGradient,a.heroGradientFlow),titleShadow:n(Ye||(Ye=c()([`
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
  `])),l?t.colorWhite:t.colorTextBase,t.fontFamily,o({mobile:{fontSize:40}}),a.heroTextShadow),desc:n($e||($e=c()([`
    font-size: `,`px;
    color: `,`;

    `,` {
      font-size: `,`px;
      margin: 24px 16px;
    }
  `])),t.fontSizeHeading3,t.colorTextSecondary,o.mobile,t.fontSizeHeading5),actions:n(Je||(Je=c()([`
    margin-top: 48px;
    display: flex;
    justify-content: center;

    `,`
  `])),o({mobile:{marginTop:24}})),canvas:n(Qe||(Qe=c()([`
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
  `])),a.heroBlurBall,o.mobile)}}),mr=function(){var n,o=f(function(d){return d.routeMeta.frontmatter},A()),t=hr(),a=t.styles,l=t.cx;if(!("hero"in o))return null;var i=o.hero;return(0,e.jsxs)(y.D,{horizontal:!0,distribution:"center",className:a.container,children:[(0,e.jsx)("div",{className:a.canvas}),(0,e.jsxs)(E.Z,{children:[o.hero.title&&(0,e.jsxs)("div",{className:a.titleContainer,children:[(0,e.jsx)("h1",{className:a.title,dangerouslySetInnerHTML:{__html:i.title}}),(0,e.jsx)("div",{className:l(a.titleShadow),dangerouslySetInnerHTML:{__html:i.title}})]}),i.description&&(0,e.jsx)("p",{className:a.desc,dangerouslySetInnerHTML:{__html:i.description}}),Boolean((n=o.hero.actions)===null||n===void 0?void 0:n.length)&&(0,e.jsx)(cn.ZP,{theme:{token:{fontSize:16,controlHeight:40}},children:(0,e.jsx)(y.D,{horizontal:!0,gap:24,className:a.actions,children:o.hero.actions.map(function(d,p){var m=d.text,b=d.link;return(0,e.jsx)(j.rU,{to:b,children:p===0?(0,e.jsx)(pr,{children:m}):(0,e.jsx)(sn.ZP,{size:"large",shape:"round",type:"default",children:m})},m)})})})]})]})},xr=mr,vr=(0,u.memo)(function(){return(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)(y.D,{align:"center",gap:80,children:[(0,e.jsx)(je,{}),(0,e.jsx)(xr,{}),(0,e.jsx)(cr,{}),(0,e.jsx)(Fn,{})]})})}),gr=vr,fr=s(27939),qe,yr=(0,fr.v)(qe||(qe=c()([`
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
`])),function(r){return r.theme.colorBgLayout}),br=(0,u.memo)(function(){var r=(0,j.YB)(),n=(0,j.TH)(),o=n.hash,t=f(function(i){return i.routeMeta.frontmatter},A()),a=f(Ht),l=f(function(i){return i.siteData.loading});return(0,u.useEffect)(function(){var i=o.replace("#","");i&&setTimeout(function(){var d=document.getElementById(decodeURIComponent(i));d&&(0,dt.Z)(d.offsetTop-80,{maxDuration:300})},1)},[l,o]),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(j.ql,{children:[(0,e.jsx)("html",{lang:r.locale.replace(/-.+$/,"")}),(0,e.jsx)("title",{children:t.title?"".concat(t.title," - Pro Components"):"Pro Components"}),t.title&&(0,e.jsx)("meta",{property:"og:title",content:t.title}),t.description&&(0,e.jsx)("meta",{name:"description",content:t.description}),t.description&&(0,e.jsx)("meta",{property:"og:description",content:t.description}),t.keywords&&(0,e.jsx)("meta",{name:"keywords",content:t.keywords.join(",")}),t.keywords&&(0,e.jsx)("meta",{property:"og:keywords",content:t.keywords.join(",")})]}),a?(0,e.jsx)(gr,{}):(0,e.jsx)(rr,{})]})}),jr=function(){return(0,e.jsx)(u.StrictMode,{children:(0,e.jsxs)(wt,{children:[(0,e.jsx)(Pt,{}),(0,e.jsx)(yr,{}),(0,e.jsx)(br,{})]})})}}}]);
