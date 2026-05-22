import{a as e,n as t,t as n}from"./jsx-runtime-CvBdq97w.js";import{A as r,c as i,j as a,l as o,s}from"./createTheme-DQh_8_S2.js";import{a as c,i as l,n as u,t as d,u as f}from"./DefaultPropsProvider-DmZbzYOE.js";import{t as p}from"./createSimplePaletteValueFilter-Dwu8kXuK.js";var m=e(t(),1);function h(e){return i(`MuiCircularProgress`,e)}s(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`track`,`circle`,`circleDisableShrink`]);var g=n(),_=44,v=a`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,y=a`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,b=typeof v==`string`?null:r`
        animation: ${v} 1.4s linear infinite;
      `,x=typeof y==`string`?null:r`
        animation: ${y} 1.4s ease-in-out infinite;
      `,S=e=>{let{classes:t,variant:n,color:r,disableShrink:i}=e;return f({root:[`root`,n,`color${l(r)}`],svg:[`svg`],track:[`track`],circle:[`circle`,i&&`circleDisableShrink`]},h,t)},C=c(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`color${l(n.color)}`]]}})(u(({theme:e})=>({display:`inline-block`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`transform`)}},{props:{variant:`indeterminate`},style:b||{animation:`${v} 1.4s linear infinite`}},...Object.entries(e.palette).filter(p()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),w=c(`svg`,{name:`MuiCircularProgress`,slot:`Svg`})({display:`block`}),T=c(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.circle,n.disableShrink&&t.circleDisableShrink]}})(u(({theme:e})=>({stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:x||{animation:`${y} 1.4s ease-in-out infinite`}}]}))),E=c(`circle`,{name:`MuiCircularProgress`,slot:`Track`})(u(({theme:e})=>({stroke:`currentColor`,opacity:(e.vars||e).palette.action.activatedOpacity}))),D=m.forwardRef(function(e,t){let n=d({props:e,name:`MuiCircularProgress`}),{className:r,color:i=`primary`,disableShrink:a=!1,enableTrackSlot:s=!1,size:c=40,style:l,thickness:u=3.6,value:f=0,variant:p=`indeterminate`,...m}=n,h={...n,color:i,disableShrink:a,size:c,thickness:u,value:f,variant:p,enableTrackSlot:s},v=S(h),y={},b={},x={};if(p===`determinate`){let e=2*Math.PI*((_-u)/2);y.strokeDasharray=e.toFixed(3),x[`aria-valuenow`]=Math.round(f),y.strokeDashoffset=`${((100-f)/100*e).toFixed(3)}px`,b.transform=`rotate(-90deg)`}return(0,g.jsx)(C,{className:o(v.root,r),style:{width:c,height:c,...b,...l},ownerState:h,ref:t,role:`progressbar`,...x,...m,children:(0,g.jsxs)(w,{className:v.svg,ownerState:h,viewBox:`${_/2} ${_/2} ${_} ${_}`,children:[s?(0,g.jsx)(E,{className:v.track,ownerState:h,cx:_,cy:_,r:(_-u)/2,fill:`none`,strokeWidth:u,"aria-hidden":`true`}):null,(0,g.jsx)(T,{className:v.circle,style:y,ownerState:h,cx:_,cy:_,r:(_-u)/2,fill:`none`,strokeWidth:u})]})})});export{D as t};