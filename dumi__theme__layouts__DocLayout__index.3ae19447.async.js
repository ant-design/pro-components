"use strict";(self.webpackChunkpro_components=self.webpackChunkpro_components||[]).push([[367],{21922:function(Rr,fn,c){c.r(fn),c.d(fn,{default:function(){return Hr}});var vt=c(94161),y=c(16866),gt=c(3341),I=c.n(gt),u=c(50959),ft=c(7905),b=c(18604),yn=c(80451),bn=c(7453),rn=(0,yn.Ue)()((0,bn.tJ)(function(){return{themeMode:"auto"}},{name:"ANTD_STYLE_DOC_STORE"})),yt=c(57213),O=c.n(yt),bt=c(48163),Wr=null,D=["#001736","#002653","#003572","#004593","#0055b6","#0066dc","#1677ff","#257fff","#3187ff","#3c8fff","#4796ff"],jt=function(t,e){var o=bt.Z.darkAlgorithm(t,e);return O()(O()({},o),{},{colorBgLayout:"hsl(218,22%,7%)",colorBgContainer:"hsl(216,18%,11%)",colorBgElevated:"hsl(216,13%,15%)",colorPrimaryBg:D[1],colorPrimaryBgHover:D[2],colorPrimaryBorder:D[3],colorPrimaryBorderHover:D[4],colorPrimaryHover:D[5],colorPrimary:D[6],colorPrimaryActive:D[7],colorPrimaryTextHover:D[8],colorPrimaryText:D[9],colorPrimaryTextActive:D[10],colorLink:D[6],colorLinkHover:D[5],colorLinkActive:D[7]})},St=function(t,e){var o=["#ffffff","#d9ebfb","#b4d6f7","#90c0f5","#6caaf5","#4792f8","#1677ff","#0568e0","#005ac0","#004ca1","#003e84"];return O()(O()({},e),{},{colorBgLayout:"hsl(220,23%,97%)",colorPrimaryBg:o[1],colorPrimaryBgHover:o[2],colorPrimaryBorder:o[3],colorPrimaryBorderHover:o[4],colorPrimaryHover:o[5],colorPrimary:o[6],colorPrimaryActive:o[7],colorPrimaryTextHover:o[8],colorPrimaryText:o[9],colorPrimaryTextActive:o[10]})},kt=function(t){var e={token:{colorTextBase:"#3d3e40"},algorithm:St};return t==="dark"&&(e.token={colorTextBase:"#c7ddff"},e.algorithm=jt),e},wt=c(92935),s=c.n(wt),Ct=c(48453),N=c.n(Ct),jn,Sn,kn,wn,Cn,Tn,Bn,On,Tt=function(t){var e=t.css,o=t.token,a=t.isDarkMode;return{clickableText:e(jn||(jn=s()([`
      cursor: pointer;
      color: `,`;

      &:hover {
        color: `,`;
      }
    `])),o.colorTextSecondary,o.colorText),resetLinkColor:e(Sn||(Sn=s()([`
      color: inherit;

      &:hover,
      &:active {
        color: inherit;
      }
    `]))),heroButtonGradient:e(kn||(kn=s()([`
      background: linear-gradient(90deg, `," 0%, ",` 100%);
    `])),o.gradientColor1,o.gradientColor2),heroGradient:e(wn||(wn=s()([`
      background-image: `,`;
      background-size: 300% 300%;
    `])),o.gradientHeroBgG),heroGradientFlow:e(Cn||(Cn=s()([`
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
    `]))),heroTextShadow:e(Tn||(Tn=s()([`
      text-shadow: 0 8px 20px `,`,
        0 8px 60px `,`,
        0 8px 80px
          `,`;
    `])),N()(o.gradientColor2).alpha(.2).hex(),N()(o.gradientColor3).alpha(.2).hex(),N()(o.cyan).alpha(a?.2:.4).hex()),heroBlurBall:e(Bn||(Bn=s()([`
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
    `])),o.gradientColor3,o.gradientColor1,o.red,o.cyan),iconGradientDefault:e(On||(On=s()([`
      radial-gradient(
        100% 100% at 50% 0,
        `,` 0,
        `,` 100%
      )`])),N()(o.colorSolid).alpha(.2).hex(),N()(o.colorSolid).alpha(.1).hex())}},Bt=function(t){var e=t.isDarkMode,o=t.token,a=o.blue,i=e?o.pink:o.cyan,l=o.purple,d=e?o.colorWhite:"#000";return{headerHeight:64,sidebarWidth:240,tocWidth:176,contentMaxWidth:1152,colorSolid:d,gradientColor1:a,gradientColor2:i,gradientColor3:l,gradientHeroBgG:"radial-gradient(at 80% 20%, ".concat(a," 0%, ").concat(i," 80%, ").concat(l," 130%)"),gradientIconDefault:`radial-gradient(
        100% 100% at 50% 0,
        `.concat(N()(d).alpha(.2).hex(),` 0,
        `).concat(N()(d).alpha(e?.1:.4).hex(),` 100%
      )`)}},n=c(11527),Ot=function(r){var t=r.children,e=rn(function(o){return o.themeMode});return(0,n.jsx)(b.V9,{prefix:"site",children:(0,n.jsx)(b.f6,{prefixCls:"site",themeMode:e,theme:kt,customStylish:Tt,customToken:Bt,children:(0,n.jsx)(ft.Z,{children:t})})})},Ht=c(12342),an=c.n(Ht),ln=c(30723),Dt={siteData:{setLoading:void 0,loading:!0,pkg:{},components:{},demos:{},locales:[],entryExports:{},themeConfig:{}},sidebar:[],navData:[],location:{pathname:"",state:"",search:"",hash:"",key:""},routeMeta:{toc:[],texts:[],tabs:void 0,frontmatter:{}}},j=(0,yn.Ue)()((0,bn.mW)(function(){return O()({},Dt)},{name:"dumi-site-store"})),zt=function(t){return t.location.pathname.startsWith("/api")},Ft=function(t){return!!t.routeMeta.frontmatter.hero},Mt=function(t){return t.routeMeta.frontmatter.features},Pt=function(t){if(t.location.pathname==="/")return"/";var e=t.navData.filter(function(o){return o.link!=="/"}).find(function(o){return t.location.pathname.startsWith(o.activePath)});return(e==null?void 0:e.activePath)||""},Nt=["setLoading"],Zt=["setLoading"],At=(0,u.memo)(function(){var r=(0,y.WF)(),t=(0,y.tx)(),e=(0,y.eL)(),o=(0,y.zh)(),a=(0,y.OK)(),i=(0,ln.TH)();return(0,u.useEffect)(function(){var l=r.setLoading,d=an()(r,Nt),p=j.getState(),h=p.siteData,f=h.setLoading,k=an()(h,Zt);I()(d,k)||j.setState({siteData:r})},[r]),(0,u.useEffect)(function(){j.setState({sidebar:t})},[t]),(0,u.useEffect)(function(){j.setState({routeMeta:o||e})},[e,e]),(0,u.useEffect)(function(){j.setState({navData:a})},[a]),(0,u.useEffect)(function(){j.setState({location:i})},[i]),null}),S=c(8299),E=c(50149),Hn,It=(0,b.kc)(function(r){var t=r.token,e=r.responsive,o=r.isDarkMode,a=r.css;return{content:a(Hn||(Hn=s()([`
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
  `])),t.colorBgContainer,t.boxShadow,e.mobile,t.colorTextSecondary,t.colorText,t.colorLink,t.colorLinkHover,t.colorLinkActive,o?.8:1,t.colorPrimaryText,t.colorPrimaryBg,t.colorFillTertiary,t.colorBorderSecondary,t.colorTextDescription,t.colorBorder,t.colorText,t.colorTextTertiary)}}),Lt=function(t){var e=t.children,o=(0,y.tx)(),a=It(),i=a.styles,l=a.cx;return(0,n.jsx)("div",{className:l("dumi-default-content",i.content),"data-no-sidebar":!o||void 0,children:e})},Et=Lt,Rt=c(50767),Wt=c(34484),Dn=c(77543),Gt=c(49724),Ut=c(1227),Kt=c(30119),Vt=c(66040),q=c(17652),Xt=c(20854),zn,Fn,$t=(0,b.kc)(function(r){var t=r.css,e=r.responsive,o=r.token,a="rc-footer";return{container:t(zn||(zn=s()([`
      grid-area: footer;
      border-top: 1px solid `,`;
      color: `,`;
      text-align: center;
      align-self: stretch;
      `,` {
        border: none;
        flex-direction: column;
      }
    `])),o.colorSplit,o.colorTextDescription,e.mobile),footer:t(Fn||(Fn=s()([`
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
    `])),o.colorTextSecondary,o.colorBgLayout,a,o.colorTextTertiary,o.colorLinkHover,a,o.contentMaxWidth,o.colorText,o.colorBorderSecondary,e.mobile,a)}}),Yt=function(t){var e=t.columns,o=t.bottom,a=t.theme,i=$t(),l=i.styles;return(0,n.jsx)("div",{className:l.container,children:(0,n.jsx)(Xt.Z,{theme:a,className:l.footer,columns:e,bottom:o})})},Jt=Yt,Mn,Pn,Qt=(0,b.kc)(function(r){var t=r.css,e=r.responsive,o=r.token,a="rc-footer";return{container:t(Mn||(Mn=s()([`
      grid-area: footer;
      border-top: 1px solid `,`;
      color: `,`;
      text-align: center;
      align-self: stretch;
      `,` {
        border: none;
        flex-direction: column;
      }
    `])),o.colorSplit,o.colorTextDescription,e.mobile),footer:t(Pn||(Pn=s()([`
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
    `])),o.colorTextSecondary,o.colorBgLayout,a,o.colorTextTertiary,o.colorLinkHover,a,o.contentMaxWidth,o.colorText,o.colorBorderSecondary,e.mobile,a)}}),qt=function(){var t=j(function(p){return p.siteData}),e=t.themeConfig,o=Qt(),a=o.styles,i=o.theme,l=(0,q.F)(),d=l.mobile;return e.footer?(0,n.jsx)(Jt,{theme:i.appearance,columns:[{title:"\u76F8\u5173\u8D44\u6E90",items:[{title:"Ant Design Pro",url:"https://pro.ant.design",openExternal:!0},{title:"Ant Design Pro Components",url:"https://procomponents.ant.design",openExternal:!0},{title:"Umi",description:"React \u5E94\u7528\u5F00\u53D1\u6846\u67B6",url:"https://umijs.org",openExternal:!0},{title:"Dumi",description:"\u7EC4\u4EF6/\u6587\u6863\u7814\u53D1\u5DE5\u5177",url:"https://d.umijs.org",openExternal:!0},{title:"qiankun",description:"\u5FAE\u524D\u7AEF\u6846\u67B6",url:"https://qiankun.umijs.org",openExternal:!0}]},{title:"\u793E\u533A",items:[{icon:(0,n.jsx)(Rt.Z,{}),title:"Medium",url:"http://medium.com/ant-design/",openExternal:!0},{icon:(0,n.jsx)(Wt.Z,{style:{color:"#1DA1F2"}}),title:"Twitter",url:"http://twitter.com/antdesignui",openExternal:!0},{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",alt:"yuque"}),title:"Ant Design \u8BED\u96C0\u4E13\u680F",url:"https://yuque.com/ant-design/ant-design",openExternal:!0},{icon:(0,n.jsx)(Dn.Z,{style:{color:"#056de8"}}),title:"Ant Design \u77E5\u4E4E\u4E13\u680F",url:"https://www.zhihu.com/column/c_1564262000561106944",openExternal:!0},{icon:(0,n.jsx)(Dn.Z,{style:{color:"#056de8"}}),title:"\u4F53\u9A8C\u79D1\u6280\u4E13\u680F",url:"http://zhuanlan.zhihu.com/xtech",openExternal:!0},{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png",alt:"seeconf"}),title:"SEE Conf",description:"SEE Conf-\u8682\u8681\u4F53\u9A8C\u79D1\u6280\u5927\u4F1A",url:"https://seeconf.antfin.com/",openExternal:!0}]},{title:"\u5E2E\u52A9",items:[{icon:(0,n.jsx)(Gt.Z,{}),title:"GitHub",url:"https://github.com/ant-design/antd-style",openExternal:!0},{icon:(0,n.jsx)(Ut.Z,{}),title:"\u66F4\u65B0\u65E5\u5FD7",url:"/changelog"},{icon:(0,n.jsx)(Kt.Z,{}),title:"\u8BA8\u8BBA",url:"https://github.com/ant-design/antd-style/issues",openExternal:!0}]},{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",alt:"more products"}),title:"\u66F4\u591A\u4EA7\u54C1",items:[{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",alt:"yuque"}),title:"\u8BED\u96C0",url:"https://yuque.com",description:"\u77E5\u8BC6\u521B\u4F5C\u4E0E\u5206\u4EAB\u5DE5\u5177",openExternal:!0},{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png",alt:"AntV"}),title:"AntV",url:"https://antv.vision",description:"\u6570\u636E\u53EF\u89C6\u5316\u89E3\u51B3\u65B9\u6848",openExternal:!0},{icon:(0,n.jsx)("img",{src:"https://www.eggjs.org/logo.svg",alt:"Egg"}),title:"Egg",url:"https://eggjs.org",description:"\u4F01\u4E1A\u7EA7 Node.js \u6846\u67B6",openExternal:!0},{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico",alt:"kitchen"}),title:"Kitchen",description:"Sketch \u5DE5\u5177\u96C6",url:"https://kitchen.alipay.com",openExternal:!0},{icon:(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",alt:"xtech"}),title:"\u8682\u8681\u4F53\u9A8C\u79D1\u6280",url:"https://xtech.antfin.com/",openExternal:!0}]}],bottom:d?(0,n.jsxs)(E.Z,{className:a.container,children:["Copyright \xA9 2022-",new Date().getFullYear(),(0,n.jsx)(S.D,{align:"center",horizontal:!0,children:"Made with \u2764\uFE0F by \u8682\u8681\u96C6\u56E2 - AFX & \u6570\u5B57\u79D1\u6280"})]}):(0,n.jsxs)(E.Z,{horizontal:!0,children:["Copyright \xA9 2022-",new Date().getFullYear()," ",(0,n.jsx)(Vt.Z,{type:"vertical"}),"Made with \u2764\uFE0F by \u8682\u8681\u96C6\u56E2 - AFX & \u6570\u5B57\u79D1\u6280"]})}):null},Nn=qt,_t=c(54306),H=c.n(_t),no=c(56252),Zn,eo=(0,b.kc)(function(r){var t=r.css,e=r.stylish,o=r.responsive,a=r.token;return t(Zn||(Zn=s()([`
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
  `])),a.fontFamily,a.colorText,e.clickableText,o.mobile,o.mobile)}),to=function(){var t=(0,y.bU)(),e=j(function(l){return l.siteData.themeConfig},I()),o=eo(),a=o.styles,i=o.cx;return e&&(0,n.jsxs)(y.rU,{className:i(a),to:"base"in t?t.base:"/",children:[(0,n.jsx)("img",{src:e.logo,alt:e.name}),e.name]})},An=(0,u.memo)(to),oo=c(31750),ro=c(62442),In=c(3732),Ln,En,ao=(0,b.kc)(function(r){var t=r.css,e=r.responsive,o=r.token,a=r.stylish,i=r.prefixCls,l=".".concat(i,"-tabs"),d=16,p=6;return{tabs:t(Ln||(Ln=s()([`
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
    `])),l,l,d,l,o.colorTextSecondary,d,d,p,o.colorText,o.colorFillTertiary,o.borderRadius,l,e.mobile),link:t(En||(En=s()([`
      `,`
    `])),a.resetLinkColor)}}),io=function(){var t=ao(),e=t.styles,o=j(function(l){return l.navData},In.X),a=(0,y.TH)(),i=a.pathname.replace("/en-US/","").replace("/","").split("/").shift();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(oo.Z,{onChange:function(d){var p;y.m8.push(((p=o.find(function(h){return h.link.replace("/en-US/","").replace("/","")===d}))===null||p===void 0?void 0:p.link)||"/"),setTimeout(function(){window.scrollTo(0,0)},10)},activeKey:i,className:e.tabs,items:o.map(function(l){return{label:l.title,link:l.link,key:l.link.replace("/en-US/","").replace("/","")}})}),(0,n.jsx)(ro.Z,{})]})},lo=(0,u.memo)(io),Rn=c(28906),Wn=c(97421),Gn,Un,Kn,Vn,Xn,$n=(0,b.kc)(function(r){var t=r.token,e=r.responsive,o=r.css,a=r.cx;return{container:o(Gn||(Gn=s()([`
      position: relative;

      // TODO: support search for mobile devices
      `,` {
        display: none;
      }
    `])),e.mobile),shortcut:a("site-header-shortcut",o(Un||(Un=s()([`
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
      `])),t.colorTextDescription,t.colorFillSecondary,t.colorBorderSecondary,e.mobile)),popover:o(Kn||(Kn=s()([`
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
    `])),t.colorBgElevated),svg:a(o(Vn||(Vn=s()([`
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
    `])),t.controlHeightLG,t.colorTextSecondary,t.colorBorder,t.colorBorderSecondary,t.colorBgElevated,t.colorTextPlaceholder)}}),Yn=(0,u.forwardRef)(function(r,t){var e=$n(),o=e.styles,a=(0,y.YB)(),i=(0,u.useRef)(!1),l=(0,u.useRef)(null);return(0,u.useImperativeHandle)(t,function(){return l.current}),(0,n.jsx)("input",{className:r.className,onCompositionStart:function(){return i.current=!0},onCompositionEnd:function(p){i.current=!1,r.onChange(p.currentTarget.value)},onFocus:r.onFocus,onBlur:r.onBlur,onKeyDown:function(p){["ArrowDown","ArrowUp"].includes(p.key)&&p.preventDefault(),p.key==="Escape"&&!i.current&&p.currentTarget.blur()},onChange:function(p){setTimeout(function(){i.current||r.onChange(p.target.value)},1)},placeholder:a.formatMessage({id:"header.search.placeholder"}),ref:l})}),Jn,Qn,qn,so=(0,b.kc)(function(r){var t=r.token,e=r.css;return{modal:e(Jn||(Jn=s()([`
      position: fixed;
      top: 0;
      inset-inline-start: 0;
      z-index: 1000;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
    `]))),mask:e(Qn||(Qn=s()([`
      background-color: `,`;
      width: 100%;
      height: 100%;
    `])),t.colorBgMask),content:e(qn||(qn=s()([`
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
    `])),t.colorBgElevated)}}),co=function(t){var e=so(),o=e.styles;return(0,u.useEffect)(function(){if(t.visible)document.body.style.overflow="hidden";else{var a;document.body.style.overflow="",(a=t.onClose)===null||a===void 0||a.call(t)}},[t.visible]),t.visible?(0,n.jsxs)("div",{className:o.modal,children:[(0,n.jsx)("div",{className:o.mask,onClick:t.onMaskClick}),(0,n.jsx)("div",{className:o.content,children:t.children})]}):null},sn,_n=/(mac|iphone|ipod|ipad)/i.test(typeof navigator!="undefined"?(sn=navigator)===null||sn===void 0?void 0:sn.platform:""),uo=function(){var t=$n(),e=t.styles,o=(0,u.useState)(!1),a=H()(o,2),i=a[0],l=a[1],d=(0,u.useRef)(null),p=(0,u.useRef)(null),h=(0,u.useState)("\u2318"),f=H()(h,2),k=f[0],m=f[1],w=(0,y.OO)(),v=w.keywords,g=w.setKeywords,x=w.result,R=w.loading,W=(0,u.useState)(!1),Z=H()(W,2),U=Z[0],M=Z[1];return(0,u.useEffect)(function(){_n||m("Ctrl");var C=function(A){if(((_n?A.metaKey:A.ctrlKey)&&A.key==="k"||A.key==="/")&&(A.preventDefault(),d.current)){var P=d.current.getBoundingClientRect(),Y=P.top,pn=P.bottom,nn=P.left,J=P.right,en=Y>=0&&nn>=0&&pn<=window.innerHeight&&J<=window.innerWidth;en?d.current.focus():(g(""),M(!0),setTimeout(function(){var Q;(Q=p.current)===null||Q===void 0||Q.focus()}))}A.key==="Escape"&&(A.preventDefault(),M(!1))};return document.addEventListener("keydown",C),function(){return document.removeEventListener("keydown",C)}},[]),(0,n.jsxs)("div",{className:e.container,children:[(0,n.jsx)(Rn.Z,{className:e.svg}),(0,n.jsx)(Yn,{onFocus:function(){return l(!0)},onBlur:function(){setTimeout(function(){l(!1)},1)},onChange:function(K){return g(K)},ref:d,className:e.input}),(0,n.jsxs)("span",{className:e.shortcut,children:[k," K"]}),v.trim()&&i&&(x.length||!R)&&!U&&(0,n.jsx)("div",{className:e.popover,children:(0,n.jsx)("section",{children:(0,n.jsx)(Wn.Z,{data:x,loading:R})})}),(0,n.jsxs)(co,{visible:U,onMaskClick:function(){M(!1)},onClose:function(){return g("")},children:[(0,n.jsxs)("div",{style:{position:"relative"},children:[(0,n.jsx)(Rn.Z,{className:e.svg}),(0,n.jsx)(Yn,{className:e.input,onFocus:function(){return l(!0)},onBlur:function(){setTimeout(function(){l(!1)},1)},onChange:function(K){return g(K)},ref:p})]}),(0,n.jsx)(Wn.Z,{data:x,loading:R,onItemSelect:function(){M(!1)}})]})]})},po=uo,ho=c(24867),mo=c(96666),xo=c(32699),ne,ee,te,oe,re,ae,vo=(0,b.kc)(function(r){var t=r.token,e=r.prefixCls,o=r.cx,a=r.css,i=r.stylish,l=6;return{icon:o("site-burger-icon",a(ne||(ne=s()([`
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
      `])),t.colorTextSecondary,l,l)),active:a(ee||(ee=s()([`
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
    `])),t.colorText),container:a(te||(te=s()([`
      width: `,`px;
      height: `,`px;
      border-radius: `,`px;
      cursor: pointer;
    `])),t.controlHeight,t.controlHeight,t.borderRadius),drawerRoot:a(oe||(oe=s()([`
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
    `])),t.headerHeight+1,e,N()(t.colorBgBase).alpha(.5).hex()),drawer:a(re||(re=s()([`
      &.`,`-drawer-content {
        background: transparent;
      }
    `])),e),menu:a(ae||(ae=s()([`
      background: transparent;
      border-inline-end: transparent !important;

      .`,"-menu-sub.",`-menu-inline {
        background: `,` !important;
      }
    `])),e,e,N()(t.colorBgLayout).alpha(.8).hex())}}),go=function(){var t=(0,u.useState)(!1),e=H()(t,2),o=e[0],a=e[1],i=vo(),l=i.styles,d=i.cx,p=j(function(m){return m.navData},I()),h=j(function(m){return m.sidebar},I()),f=j(Pt),k=j(function(m){return m.location.pathname});return(0,n.jsxs)(E.Z,{className:l.container,onClick:function(){a(!o)},children:[(0,n.jsx)("div",{className:d(l.icon,o?l.active:"")}),(0,n.jsx)(ho.Z,{open:o,placement:"left",closeIcon:null,rootClassName:l.drawerRoot,className:l.drawer,width:"100vw",headerStyle:{display:"none"},bodyStyle:{padding:"24px 0"},children:(0,n.jsx)(mo.Z,{mode:"inline",selectedKeys:(0,xo.uniq)([f,"s-".concat(k)]),openKeys:[f],className:l.menu,items:p.map(function(m){return{label:(0,n.jsx)(ln.rU,{to:m.link,children:m.title}),key:m.activePath,children:m.activePath===f&&(h==null?void 0:h.map(function(w){return!w.link&&{label:w.title,type:"group",children:w.children.map(function(v){return{label:(0,n.jsx)(ln.rU,{to:v.link,onClick:function(){a(!1)},children:v.title}),key:"s-".concat(v.link)}})}}))}})})})]})},fo=go,ie=c(31393),le=c(55859),cn=c(91272),yo=function(){var t=j(function(e){var o,a;return(o=e.siteData.themeConfig)===null||o===void 0||(a=o.socialLinks)===null||a===void 0?void 0:a.github});return t?(0,n.jsx)(le.Z,{showArrow:!1,title:"Github",children:(0,n.jsx)("a",{href:t,target:"_blank",children:(0,n.jsx)(cn.ZP,{icon:(0,n.jsx)(ie.Z,{})})})}):null},bo=yo,se=c(3067),z=c(19008),jo=c(46541),X=c(81880),ce=c(10422),So=c(16838),ko=c(52510),de=c.n(ko),ue,pe,he,wo=(0,b.kc)(function(r,t){var e=r.css,o=r.cx,a=r.token;return{item:o("".concat(t,"-item"),e(ue||(ue=s()([`
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
    `])),a.fontFamily,a.colorText,a.colorFillTertiary)),selected:o("".concat(t,"-item-selected"),e(pe||(pe=s()([`
      color: `,`;
      background: `,`;
      font-weight: bold;
      &:hover {
        color: `,`;
        background: `,`;
      }
    `])),a.colorPrimaryText,a.colorPrimaryBg,a.colorPrimaryTextHover,a.colorPrimaryBgHover)),active:o("".concat(t,"-item-active"),e(he||(he=s()([`
      background: `,`;
    `])),a.colorFillTertiary))}}),Co=["value","label","prefixCls","isSelected","isActive","disabled"],To=(0,u.forwardRef)(function(r,t){var e,o=r.value,a=r.label,i=r.prefixCls,l=r.isSelected,d=r.isActive,p=r.disabled,h=an()(r,Co),f=wo({prefixCls:i,selected:l}),k=f.styles,m=f.cx;return(0,n.jsx)("button",O()(O()({disabled:p,"aria-selected":l,role:"option",tabIndex:-1,className:m(k.item,(e={},de()(e,k.selected,l),de()(e,k.active,d),e)),ref:t},h),{},{children:a}),o)}),Bo=To,me,xe,Oo=(0,b.kc)(function(r,t){var e=r.css,o=r.stylish,a=r.cx,i=r.token;return{container:a(t,e(me||(me=s()([`
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
    `])),i.colorBgElevated,i.fontSize,i.colorBorder,i.boxShadowSecondary)),button:a("".concat(t,"-button"),e(xe||(xe=s()([`
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
    `])),i.fontSize,i.colorBgContainer,i.colorTextSecondary,i.borderRadius,i.colorBorder,o.buttonDefaultHover,i.colorPrimary,i.colorPrimaryBg))}}),Ho=function(t){var e=t.options,o=e===void 0?[]:e,a=t.value,i=t.prefixCls,l=t.onChange,d=t.renderValue,p=t.renderItem,h=i!=null?i:"native-select",f=(0,So.Z)(0,{value:a,onChange:l}),k=H()(f,2),m=k[0],w=k[1],v=Oo(h),g=v.styles,x=(0,u.useRef)([]),R=(0,u.useRef)([]),W=(0,u.useRef)(null),Z=(0,u.useRef)(!1),U=(0,u.useRef)(!0),M=(0,u.useRef)(),C=(0,u.useRef)(null),K=(0,u.useState)(!1),A=H()(K,2),P=A[0],Y=A[1],pn=(0,u.useState)(null),nn=H()(pn,2),J=nn[0],en=nn[1],Q=(0,u.useState)(!1),at=H()(Q,2),tn=at[0],it=at[1],Dr=(0,u.useState)(0),lt=H()(Dr,2),st=lt[0],hn=lt[1],zr=(0,u.useState)(!1),ct=H()(zr,2),on=ct[0],dt=ct[1],Fr=(0,u.useState)(0),ut=H()(Fr,2),Gr=ut[0],pt=ut[1],Mr=(0,u.useState)(!1),ht=H()(Mr,2),mt=ht[0],mn=ht[1];P||(st!==0&&hn(0),tn&&it(!1),mt&&mn(!1));var V=(0,z.YF)({placement:"bottom-start",open:P,onOpenChange:Y,whileElementsMounted:jo.Me,middleware:tn?[(0,X.cv)(5),on?(0,X.uY)({crossAxis:!0,padding:10}):(0,X.RR)({padding:10}),(0,X.dp)({apply:function(T){var B,L,Er=T.availableHeight;Object.assign((B=(L=C.current)===null||L===void 0?void 0:L.style)!==null&&B!==void 0?B:{},{maxHeight:"".concat(Er,"px")})},padding:10})]:[(0,z.aN)({listRef:x,overflowRef:W,scrollRef:C,index:m,offset:st,onFallbackChange:it,padding:10,minItemsVisible:on?8:4,referenceOverflowThreshold:20}),(0,X.cv)({crossAxis:-4})]}),xn=V.x,vn=V.y,Pr=V.strategy,xt=V.refs,G=V.context,Ur=V.isPositioned,gn=(0,z.NI)([(0,z.eS)(G,{event:"mousedown"}),(0,z.bQ)(G),(0,z.qs)(G,{role:"listbox"}),(0,z.Rz)(G,{enabled:!tn,onChange:hn,overflowRef:W,scrollRef:C}),(0,z.c0)(G,{listRef:x,activeIndex:J,selectedIndex:m,onNavigate:en}),(0,z.ox)(G,{listRef:R,activeIndex:J,onMatch:P?en:w})]),Nr=gn.getReferenceProps,Zr=gn.getFloatingProps,Ar=gn.getItemProps;(0,u.useEffect)(function(){return P?(M.current=setTimeout(function(){Z.current=!0},300),function(){clearTimeout(M.current)}):(Z.current=!1,U.current=!0,function(){return[]})},[P]);var Kr=function(T){tn?C.current&&(C.current.scrollTop-=T,(0,ce.flushSync)(function(){var B,L;return pt((B=(L=C.current)===null||L===void 0?void 0:L.scrollTop)!==null&&B!==void 0?B:0)})):(0,ce.flushSync)(function(){return hn(function(B){return B-T})})},Vr=function(){on&&(clearTimeout(M.current),mn(!0),M.current=setTimeout(function(){mn(!1)},400))},Ir=o[m]||{},Lr=Ir.label;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("button",O()(O()({ref:xt.setReference,className:g.button},Nr({onTouchStart:function(){dt(!0)},onPointerMove:function(T){var B=T.pointerType;B==="mouse"&&dt(!1)}})),{},{children:d?d(m):Lr})),(0,n.jsx)(z.ll,{children:P&&(0,n.jsx)(z.y0,{lockScroll:!on,style:{zIndex:3e3},children:(0,n.jsx)(z.wD,{context:G,modal:!1,initialFocus:-1,children:(0,n.jsx)("div",{ref:xt.setFloating,style:{position:Pr,top:vn!=null?vn:0,left:xn!=null?xn:0},children:(0,n.jsx)("div",O()(O()({className:g.container,style:{overflowY:"auto"},ref:C},Zr({onScroll:function(T){var B=T.currentTarget;pt(B.scrollTop)},onContextMenu:function(T){T.preventDefault()}})),{},{children:o.map(function(F,T){return(0,n.jsx)(Bo,O()({value:F.value,label:p?p(F,T):F.label,disabled:mt,isSelected:T===m,isActive:T===J,ref:function(L){x.current[T]=L,R.current[T]=F.label}},Ar({onTouchStart:function(){Z.current=!0,U.current=!1},onKeyDown:function(){Z.current=!0},onClick:function(){Z.current&&(w(T),Y(!1))},onMouseUp:function(){U.current&&(Z.current&&(w(T),Y(!1)),clearTimeout(M.current),M.current=setTimeout(function(){Z.current=!0}))}})),F.value)})}))})})})})]})},Do=Ho,ve,zo=function(){return(0,n.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,n.jsx)("path",{d:"M8.218 1.455c3.527.109 6.327 3.018 6.327 6.545 0 3.6-2.945 6.545-6.545 6.545a6.562 6.562 0 0 1-6.036-4h.218c3.6 0 6.545-2.945 6.545-6.545 0-.91-.182-1.745-.509-2.545m0-1.455c-.473 0-.909.218-1.2.618-.29.4-.327.946-.145 1.382.254.655.4 1.31.4 2 0 2.8-2.291 5.09-5.091 5.09h-.218c-.473 0-.91.22-1.2.62-.291.4-.328.945-.146 1.38C1.891 14.074 4.764 16 8 16c4.4 0 8-3.6 8-8a7.972 7.972 0 0 0-7.745-8h-.037Z"})})},Fo=function(){return(0,n.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,n.jsx)("path",{d:"M8 13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM8 3a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm7 4a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM3 8a1 1 0 0 1-1 1H1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm9.95 3.536.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-9.9-7.072-.707-.707a1 1 0 0 1 1.414-1.414l.707.707A1 1 0 0 1 3.05 4.464Zm9.9 0a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707Zm-9.9 7.072a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707ZM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"})})},Mo=function(){return(0,n.jsx)("svg",{viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",children:(0,n.jsx)("path",{d:"M14.595 8a6.595 6.595 0 1 1-13.19 0 6.595 6.595 0 0 1 13.19 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 2.014v11.972A5.986 5.986 0 0 0 8 2.014Z"})})},Po=se.Z.span(ve||(ve=s()([`
  width: 12px;
`]))),No=function(t){var e=t.icon,o=t.label;return(0,n.jsxs)(S.D,{horizontal:!0,gap:12,align:"center",children:[(0,n.jsxs)(Po,{children:[e," "]}),o]})},_=[{label:"\u8DDF\u968F\u7CFB\u7EDF",icon:(0,n.jsx)(Mo,{}),value:"auto"},{label:"\u4EAE\u8272\u6A21\u5F0F",icon:(0,n.jsx)(Fo,{}),value:"light"},{label:"\u6697\u8272\u6A21\u5F0F",icon:(0,n.jsx)(zo,{}),value:"dark"}],Zo=function(){var t=rn(function(e){return e.themeMode});return(0,n.jsx)("span",{children:(0,n.jsx)(Do,{options:_,value:_.findIndex(function(e){return e.value===t}),onChange:function(o){var a=_[o].value;rn.setState({themeMode:a})},renderValue:function(o){return _[o].icon},renderItem:function(o){return(0,n.jsx)(No,{label:o.label,icon:o.icon})}})})},ge=(0,u.memo)(Zo),fe,ye,be,je,Ao=(0,b.kc)(function(r){var t=r.css,e=r.responsive,o=r.token;return{header:t(fe||(fe=s()([`
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
  `])),o.zIndexPopupBase-50,o.colorSplit,e.mobile,o.colorBgContainer),content:t(ye||(ye=s()([`
    padding: 0 24px;
    height: 64px;

    `,` {
      padding: 0 16px;
    }
  `])),e.mobile),left:t(be||(be=s()([""]))),right:t(je||(je=s()([`
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
  `])),e.mobile,o.colorBorder)}}),Io=function(){var t=(0,u.useState)(!1),e=H()(t,2),o=e[0],a=e[1],i=j(function(f){return f.routeMeta.frontmatter},I()),l=(0,q.F)(),d=l.mobile,p=Ao(),h=p.styles;return i&&(0,n.jsx)("div",{className:h.header,"data-static":Boolean(i.hero)||void 0,"data-mobile-active":o||void 0,onClick:function(){return a(!1)},children:(0,n.jsx)(S.D,{horizontal:!0,distribution:"space-between",align:"center",width:"auto",className:h.content,children:d?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(S.D,{children:(0,n.jsx)(fo,{})}),(0,n.jsx)(S.D,{horizontal:!0,className:h.left,children:(0,n.jsx)(An,{})}),(0,n.jsx)(S.D,{children:(0,n.jsx)(ge,{})})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(S.D,{horizontal:!0,className:h.left,children:(0,n.jsx)(An,{})}),(0,n.jsx)(S.D,{style:{marginLeft:48,alignSelf:"end"},children:(0,n.jsx)(lo,{})}),(0,n.jsxs)("section",{className:h.right,children:[(0,n.jsx)("div",{}),(0,n.jsxs)(S.D,{gap:16,horizontal:!0,align:"center",className:"dumi-default-header-right-aside",children:[(0,n.jsx)(po,{}),(0,n.jsx)(no.Z,{}),(0,n.jsx)(bo,{}),(0,n.jsx)(ge,{})]})]})]})})})},Se=Io,ke,Lo=(0,b.kc)(function(r){var t=r.css,e=r.token;return{sidebar:t(ke||(ke=s()([`
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
  `])),e.headerHeight,e.headerHeight,e.colorSplit,e.colorText,e.fontSize,e.lineHeight,e.colorTextSecondary,e.colorText,e.colorFillTertiary,e.colorPrimaryText,e.colorPrimaryBg,e.colorPrimaryTextHover,e.colorPrimaryBgHover,e.colorBorder)}}),Eo=function(){var t=j(function(i){return i.sidebar},I()),e=Lo(),o=e.styles,a=(0,y.TH)();return a.pathname.includes("changelog")?null:t&&(0,n.jsx)("div",{className:o.sidebar,children:t.map(function(i,l){return(0,n.jsxs)("dl",{children:[i.title&&(0,n.jsx)("dt",{children:i.title}),i.children.map(function(d){return(0,n.jsx)("dd",{children:(0,n.jsx)(y.OL,{to:d.link,title:d.title,end:!0,children:d.title})},d.link)})]},String(l))})})},Ro=(0,u.memo)(Eo),Wo=c(7913),Go=c(88427),dn=c(89694),we=c(86021),Ce=c(98641),Te,Be,Oe,Uo=(0,b.kc)(function(r){var t=r.token,e=r.prefixCls,o=r.responsive,a=r.css,i=36;return{container:a(Te||(Te=s()([`
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
    `])),t.tocWidth,o.mobile,t.headerHeight+1,t.colorTextDescription),mobileCtn:a(Be||(Be=s()([`
      position: sticky;
      top: `,`px;

      height: `,`px;
      width: 100%;
      z-index: 200;
      background: transparent;
      background: `,`;
    `])),t.headerHeight+1,i,N()(t.colorBgContainer).alpha(.8).css()),expand:a(Oe||(Oe=s()([`
      backdrop-filter: blur(6px);
      border-radius: 0;
      border-bottom: 1px solid `,`;

      box-shadow: `,`;
      width: 100%;
      z-index: 201;

      .`,`-collapse-header {
        padding: 8px 16px !important;
      }
    `])),t.colorSplit,t.boxShadowSecondary,e)}}),Ko=function(){var t=(0,y.TH)(),e=(0,u.useState)(),o=H()(e,2),a=o[0],i=o[1],l=(0,y.eL)(),d=(0,y.zh)(),p=Uo(),h=p.styles,f=(0,q.F)(),k=f.mobile,m=(0,u.useMemo)(function(){return((d==null?void 0:d.toc)||l.toc).reduce(function(v,g){if(g.depth===2)v.push(O()({},g));else if(g.depth===3){var x=v[v.length-1];x&&(x.children=x.children||[],x.children.push(O()({},g)))}return v},[])},[l.toc||(d==null?void 0:d.toc)]),w=l.toc.find(function(v){return v.id===a});return((m==null?void 0:m.length)===0?null:k?(0,n.jsx)(dn.ZP,{theme:{token:{fontSize:12,sizeStep:3}},children:(0,n.jsx)("div",{className:h.mobileCtn,children:(0,n.jsx)(we.Z,{bordered:!1,ghost:!0,expandIconPosition:"end",expandIcon:function(g){var x=g.isActive;return x?(0,n.jsx)(Wo.Z,{}):(0,n.jsx)(Go.Z,{})},className:h.expand,children:(0,n.jsx)(we.Z.Panel,{forceRender:!0,header:w?w.title:"\u76EE\u5F55",children:(0,n.jsx)(dn.ZP,{theme:{token:{fontSize:14,sizeStep:4}},children:(0,n.jsx)(Ce.Z,{onChange:function(g){i(g.replace("#",""))},items:m.map(function(v){var g;return{href:"#".concat(v.id),title:t.pathname.includes("changelog")?v.title.replace("@ant-design/pro-components",""):v.title,key:v.id,children:(g=v.children)===null||g===void 0?void 0:g.map(function(x){return{href:"#".concat(x.id),title:x==null?void 0:x.title,key:x.id}})}})})})},"toc")})})}):(0,n.jsxs)("div",{className:h.container,children:[(0,n.jsx)("h4",{children:"\u76EE\u5F55"}),(0,n.jsx)(Ce.Z,{items:m.map(function(v){var g;return{href:"#".concat(v.id),title:t.pathname.includes("changelog")?v.title.replace("@ant-design/pro-components@","v"):v.title,key:v.id,children:(g=v.children)===null||g===void 0?void 0:g.map(function(x){return{href:"#".concat(x.id),title:x==null?void 0:x.title,key:x.id}})}})})]}))||null},Vo=Ko,Xo=c(79908),un=c(90402),$o=c(73875),Yo=c(874),Jo=c.n(Yo),Qo=c(40813),qo=c(77827),He,_o=(0,b.kc)(function(r){var t=r.css,e=r.token;return t(He||(He=s()([`
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
    `])),e.colorFillSecondary)}),nr=function(t){var e=t.children,o=_o(),a=o.styles,i=o.theme,l=(0,qo.M)(),d=l.copied,p=l.setCopied;return(0,n.jsx)(le.Z,{placement:"right",title:d?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)($o.Z,{style:{color:i.colorSuccess}})," \u590D\u5236\u6210\u529F"]}):"\u590D\u5236",children:(0,n.jsx)("div",{className:a,onClick:function(){Jo()(e),p()},children:(0,n.jsx)(Qo.ZP,{language:"javaScript",children:e})})})},er=nr,tr=function(){return(0,n.jsx)("svg",{width:"14px",height:"14px",viewBox:"0 0 14 14",version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",children:(0,n.jsx)("path",{d:"M13,0 C13.5522847,-1.01453063e-16 14,0.44771525 14,1 L14,13 C14,13.5522847 13.5522847,14 13,14 L1,14 C0.44771525,14 -4.87476137e-16,13.5522847 0,13 L0,1 C-6.76353751e-17,0.44771525 0.44771525,-4.5365845e-16 1,0 L13,0 Z M11.375,2.625 L2.625,2.625 L2.625,11.375 L7,11.375 L7,4.375 L9.625,4.375 L9.625,11.375 L11.375,11.375 L11.375,2.625 Z",fill:"#C12127"})})},De,ze,Fe,or=(0,b.kc)(function(r){var t=r.css,e=r.token,o=r.stylish;return{title:t(De||(De=s()([`
    font-family: monospace;
  `]))),desc:t(ze||(ze=s()([`
    font-size: `,`px;
    line-height: `,`px;
  `])),e.fontSizeLG,e.lineHeightLG),text:t(Fe||(Fe=s()([`
    `,`
  `])),o.clickableText)}}),Me,rr=(0,se.Z)(un.Z.Text)(Me||(Me=s()([`
  width: 100px;
`]))),Pe="https://github.com/arvinxx/antd-style",ar=(0,u.memo)(function(r){var t=r.title,e=r.description,o=or(),a=o.styles,i=o.theme,l=[{label:"\u5F15\u5165\u65B9\u6CD5",import:!0,children:"import { ".concat(t,' } from "antd-style";')},{label:"\u6E90\u7801",icon:(0,n.jsx)(ie.Z,{}),children:"\u67E5\u770B\u6E90\u7801",url:"".concat(Pe,"/tree/master/src/").concat(t)},{label:"\u6587\u6863",icon:(0,n.jsx)(Xo.Z,{}),children:"\u7F16\u8F91\u6587\u6863",url:"".concat(Pe,"/tree/master/docs/api/").concat(t)},{label:"\u4EA7\u7269",icon:(0,n.jsx)(tr,{}),children:"antd-style",url:"https://www.npmjs.com/package/antd-style?activeTab=explore"}];return(0,n.jsxs)(S.D,{children:[(0,n.jsx)(un.Z.Title,{className:a.title,children:t}),e&&(0,n.jsx)("div",{children:(0,n.jsx)(un.Z.Text,{type:"secondary",className:a.desc,children:e})}),(0,n.jsx)(S.D,{style:{marginTop:24},gap:12,children:l.map(function(d){return(0,n.jsxs)(S.D,{horizontal:!0,children:[(0,n.jsx)(rr,{type:"secondary",children:d.label}),d.import?(0,n.jsx)(er,{children:d.children}):(0,n.jsx)("a",{href:d.url,target:"_blank",children:(0,n.jsxs)(S.D,{horizontal:!0,align:"center",gap:8,className:a.text,children:[(0,n.jsx)(n.Fragment,{children:d.icon}),(0,n.jsx)(n.Fragment,{children:d.children})]})})]},d.label)})})]})}),Ne,Ze,Ae,ir=(0,b.kc)(function(r){var t=r.css,e=r.responsive,o=r.token;return{layout:t(Ne||(Ne=s()([`
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
  `])),o.colorBgLayout,o.colorBgContainer,o.sidebarWidth,o.tocWidth,o.headerHeight,e.mobile),toc:t(Ze||(Ze=s()([`
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
  `])),o.tocWidth,e.mobile,o.headerHeight+1,o.colorTextDescription),content:t(Ae||(Ae=s()([`
    max-width: `,`px;
    width: 100%;
    margin: 0 24px;


    `,` {
      margin: 0;
    }
  }
  `])),o.contentMaxWidth,e.mobile)}}),lr=(0,u.memo)(function(){var r=(0,y.pC)(),t=(0,q.F)(),e=t.mobile,o=j(function(h){return h.routeMeta.frontmatter},I()),a=j(zt),i=ir(),l=i.styles,d=i.theme,p=(0,y.TH)();return(0,u.useEffect)(function(){requestAnimationFrame(function(){window.scrollTo(0,0)})},[p.pathname]),(0,n.jsxs)("div",{className:l.layout,style:p.pathname.includes("changelog")?{gridTemplateColumns:"0 1fr 300px"}:{},children:[(0,n.jsx)(Se,{}),(0,n.jsx)(Vo,{}),e?null:(0,n.jsx)(Ro,{}),a?(0,n.jsx)(S.D,{style:{gridArea:"title"},children:(0,n.jsx)(E.Z,{children:(0,n.jsx)(S.D,{style:{maxWidth:d.contentMaxWidth,width:"100%"},children:(0,n.jsx)(S.D,{padding:"0 48px",children:(0,n.jsx)(ar,{title:o.title,description:o.description})})})})}):null,(0,n.jsx)(S.D,{style:{zIndex:10,gridArea:"main",minWidth:0,margin:e?0:24,marginBottom:e?0:48},children:(0,n.jsx)(E.Z,{width:"100%",children:(0,n.jsx)(S.D,{className:l.content,children:(0,n.jsx)(S.D,{horizontal:!0,children:(0,n.jsx)(Et,{children:r})})})})}),(0,n.jsx)(Nn,{})]})}),sr=lr,cr=c(77172),dr=c(39317),$=c(87356),Ie,Le,Ee,Re,We,Ge,Ue,Ke,Ve,Xe,ur=(0,b.kc)(function(r,t){var e=r.token,o=r.prefixCls,a=r.responsive,i=r.css,l=r.stylish,d=r.isDarkMode,p=r.cx,h="".concat(o,"-features"),f="".concat(h,"-cover"),k="".concat(h,"-description"),m="".concat(h,"-title"),w="".concat(h,"-img"),v=20,g=function(W){return i(Ie||(Ie=s()([`
      width: `,`px;
      height: `,`px;
    `])),W,W)},x=i(Le||(Le=s()([`
      transition: all `," ",`;
    `])),e.motionDurationSlow,e.motionEaseInOutCirc);return{cell:i(Ee||(Ee=s()([`
        overflow: hidden;
      `]))),container:i(Re||(Re=s()([`
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
      `])),x,e.colorFillContent,e.colorFillQuaternary,(0,$.$n)(.5,e.colorFillContent),(0,$.$n)(.5,e.colorFillQuaternary),e.colorBorder,e.boxShadowSecondary,f,v*t,w,g(100),k,m),title:p(m,x,i(We||(We=s()([`
          font-size: 20px;
          line-height: `,`;
          margin: 16px 0;
          color: `,`;
        `])),e.lineHeightHeading3,e.colorText)),desc:p(k,x,i(Ge||(Ge=s()([`
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
        `])),e.colorTextSecondary,e.colorTextDescription,d?e.colorPrimary:e.colorPrimaryBgHover)),imgContainer:p(f,x,i(Ue||(Ue=s()([`
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
        `])),e.colorFillContent,g(24),e.gradientColor1,e.gradientColor2,e.colorBgContainer,(0,$.m4)(e.gradientColor2,.3),(0,$.m4)(e.gradientColor2,.3),(0,$.m4)(e.gradientColor1,.3))),img:p(w,x,i(Ke||(Ke=s()([`
          width: 20px;
          height: 20px;
          color: `,`;
        `])),e.colorWhite)),link:i(Ve||(Ve=s()([`
        `,`;

        margin-top: 24px;

        a {
          `,`;

          color: `,`;
          &:hover {
            color: `,`;
          }
        }
      `])),x,l.resetLinkColor,e.colorTextDescription,e.colorPrimaryHover),blur:i(Xe||(Xe=s()([`
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
      `])),l.heroBlurBall,d?.05:.08,a.mobile)}}),pr=function(t){var e=t.imageStyle,o=t.row,a=t.column,i=t.center,l=t.description,d=t.avatar,p=t.title,h=t.link,f=o||7,k=ur(f),m=k.styles,w=k.theme;return(0,n.jsxs)("div",{className:m.container,style:{gridRow:"span ".concat(f),gridColumn:"span ".concat(a||1),cursor:h?"pointer":"default"},onClick:function(){h&&window.open(h)},children:[(0,n.jsxs)("div",{className:m.cell,children:[d&&(0,n.jsx)(E.Z,{"image-style":e,className:m.imgContainer,children:(0,n.jsx)("img",{className:m.img,src:d,alt:p})}),p&&(0,n.jsxs)(S.D,{as:"h3",horizontal:!0,gap:8,align:"center",className:m.title,children:[p,e==="soon"?(0,n.jsx)(dr.Z,{color:w.isDarkMode?"pink-inverse":"cyan-inverse",children:"SOON"}):null]}),l&&(0,n.jsx)("p",{dangerouslySetInnerHTML:{__html:l},className:m.desc}),h&&(0,n.jsx)("div",{className:m.link,children:(0,n.jsxs)(y.rU,{to:h,children:["\u7ACB\u5373\u4E86\u89E3 ",(0,n.jsx)(cr.Z,{})]})})]}),i&&(0,n.jsx)("div",{className:m.blur})]})},hr=pr,$e,Ye,mr=(0,b.kc)(function(r){var t=r.token,e=r.prefixCls,o=r.responsive,a=r.css,i=r.cx,l="".concat(e,"-features");return{container:i(l,a($e||($e=s()([`
        max-width: `,`px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: row dense;
        grid-auto-rows: 24px;
        gap: 16px;

        `,`
      `])),t.contentMaxWidth,o({mobile:a(Ye||(Ye=s()([`
            flex-direction: column;
            display: flex;
          `]))),laptop:{gridTemplateColumns:"repeat(2, 1fr)"}})))}}),xr=function(t){var e=t.items,o=t.style,a=mr(),i=a.styles;return Boolean(e==null?void 0:e.length)?(0,n.jsx)("div",{className:i.container,style:o,children:e.map(function(l){return(0,n.jsx)(hr,O()({},l),l.title)})}):null},vr=xr,gr=function(){var t=j(Mt,In.X);return Boolean(t==null?void 0:t.length)?(0,n.jsx)(vr,{items:t||[]}):null},fr=gr,Je,yr=(0,b.kc)(function(r){var t=r.css,e=r.stylish,o=r.isDarkMode;return{button:t(Je||(Je=s()([`
      border: none;

      `,`
      `,`

      background-size: 200% 100%;

      &:hover {
        animation: none;
      }
    `])),e.heroButtonGradient,e.heroGradientFlow)}}),br=function(t){var e=t.children,o=yr(),a=o.styles;return(0,n.jsx)(cn.ZP,{size:"large",shape:"round",type:"primary",className:a.button,children:e})},jr=br,Qe,qe,_e,nt,et,tt,ot,Sr=(0,b.kc)(function(r){var t=r.css,e=r.responsive,o=r.token,a=r.stylish,i=r.isDarkMode;return{container:t(Qe||(Qe=s()([`
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
  `])),o.colorTextSecondary,e({mobile:{fontSize:16}})),titleContainer:t(qe||(qe=s()([`
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
  `])),o.fontFamily,e({mobile:{fontSize:40}}),a.heroGradient,a.heroGradientFlow),titleShadow:t(nt||(nt=s()([`
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
  `])),i?o.colorWhite:o.colorTextBase,o.fontFamily,e({mobile:{fontSize:40}}),a.heroTextShadow),desc:t(et||(et=s()([`
    font-size: `,`px;
    color: `,`;

    `,` {
      font-size: `,`px;
      margin: 24px 16px;
    }
  `])),o.fontSizeHeading3,o.colorTextSecondary,e.mobile,o.fontSizeHeading5),actions:t(tt||(tt=s()([`
    margin-top: 48px;
    display: flex;
    justify-content: center;

    `,`
  `])),e({mobile:{marginTop:24}})),canvas:t(ot||(ot=s()([`
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
  `])),a.heroBlurBall,e.mobile)}}),kr=function(){var t,e=j(function(d){return d.routeMeta.frontmatter},I()),o=Sr(),a=o.styles,i=o.cx;if(!("hero"in e))return null;var l=e.hero;return(0,n.jsxs)(S.D,{horizontal:!0,distribution:"center",className:a.container,children:[(0,n.jsx)("div",{className:a.canvas}),(0,n.jsxs)(E.Z,{children:[e.hero.title&&(0,n.jsxs)("div",{className:a.titleContainer,children:[(0,n.jsx)("h1",{className:a.title,dangerouslySetInnerHTML:{__html:l.title}}),(0,n.jsx)("div",{className:i(a.titleShadow),dangerouslySetInnerHTML:{__html:l.title}})]}),l.description&&(0,n.jsx)("p",{className:a.desc,dangerouslySetInnerHTML:{__html:l.description}}),Boolean((t=e.hero.actions)===null||t===void 0?void 0:t.length)&&(0,n.jsx)(dn.ZP,{theme:{token:{fontSize:16,controlHeight:40}},children:(0,n.jsx)(S.D,{horizontal:!0,gap:24,className:a.actions,children:e.hero.actions.map(function(d,p){var h=d.text,f=d.link;return(0,n.jsx)(y.rU,{to:f,children:p===0?(0,n.jsx)(jr,{children:h}):(0,n.jsx)(cn.ZP,{size:"large",shape:"round",type:"default",children:h})},h)})})})]})]})},wr=kr,Cr=(0,u.memo)(function(){return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(S.D,{align:"center",gap:80,children:[(0,n.jsx)(Se,{}),(0,n.jsx)(wr,{}),(0,n.jsx)(fr,{}),(0,n.jsx)(Nn,{})]})})}),Tr=Cr,rt,Br=(0,b.vJ)(rt||(rt=s()([`
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
`])),function(r){return r.theme.colorBgLayout}),Or=(0,u.memo)(function(){var r=(0,y.YB)(),t=(0,y.TH)(),e=t.hash,o=j(function(l){return l.routeMeta.frontmatter},I()),a=j(Ft),i=j(function(l){return l.siteData.loading});return(0,u.useEffect)(function(){var l=e.replace("#","");l&&setTimeout(function(){var d=document.getElementById(decodeURIComponent(l));d&&(0,vt.Z)(d.offsetTop-80,{maxDuration:300})},1)},[i,e]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(y.ql,{children:[(0,n.jsx)("html",{lang:r.locale.replace(/-.+$/,"")}),(0,n.jsx)("title",{children:o.title?"".concat(o.title," - Pro Components"):"Pro Components"}),o.title&&(0,n.jsx)("meta",{property:"og:title",content:o.title}),o.description&&(0,n.jsx)("meta",{name:"description",content:o.description}),o.description&&(0,n.jsx)("meta",{property:"og:description",content:o.description}),o.keywords&&(0,n.jsx)("meta",{name:"keywords",content:o.keywords.join(",")}),o.keywords&&(0,n.jsx)("meta",{property:"og:keywords",content:o.keywords.join(",")})]}),a?(0,n.jsx)(Tr,{}):(0,n.jsx)(sr,{})]})}),Hr=function(){return(0,n.jsx)(u.StrictMode,{children:(0,n.jsxs)(Ot,{children:[(0,n.jsx)(At,{}),(0,n.jsx)(Br,{}),(0,n.jsx)(Or,{})]})})}}}]);
