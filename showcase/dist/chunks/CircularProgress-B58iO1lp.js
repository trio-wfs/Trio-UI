import{a as e,n as t,t as n}from"./jsx-runtime-CvBdq97w.js";import{A as r,_ as i,a,i as o,k as s,n as c,p as l,t as u,v as d,y as f}from"./DefaultPropsProvider-BqNyV8RX.js";import{t as p}from"./createSimplePaletteValueFilter-enz0QPlv.js";var m=e(t(),1);function h(e){return d(`MuiCircularProgress`,e)}i(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`track`,`circle`,`circleDisableShrink`]);var g=n(),_=44,v=r`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,y=r`
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
`,b=typeof v==`string`?null:s`
        animation: ${v} 1.4s linear infinite;
      `,x=typeof y==`string`?null:s`
        animation: ${y} 1.4s ease-in-out infinite;
      `,S=e=>{let{classes:t,variant:n,color:r,disableShrink:i}=e;return l({root:[`root`,n,`color${o(r)}`],svg:[`svg`],track:[`track`],circle:[`circle`,i&&`circleDisableShrink`]},h,t)},C=a(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`color${o(n.color)}`]]}})(c(({theme:e})=>({display:`inline-block`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`transform`)}},{props:{variant:`indeterminate`},style:b||{animation:`${v} 1.4s linear infinite`}},...Object.entries(e.palette).filter(p()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),w=a(`svg`,{name:`MuiCircularProgress`,slot:`Svg`})({display:`block`}),T=a(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.circle,n.disableShrink&&t.circleDisableShrink]}})(c(({theme:e})=>({stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:x||{animation:`${y} 1.4s ease-in-out infinite`}}]}))),E=a(`circle`,{name:`MuiCircularProgress`,slot:`Track`})(c(({theme:e})=>({stroke:`currentColor`,opacity:(e.vars||e).palette.action.activatedOpacity}))),D=m.forwardRef(function(e,t){let n=u({props:e,name:`MuiCircularProgress`}),{className:r,color:i=`primary`,disableShrink:a=!1,enableTrackSlot:o=!1,size:s=40,style:c,thickness:l=3.6,value:d=0,variant:p=`indeterminate`,...m}=n,h={...n,color:i,disableShrink:a,size:s,thickness:l,value:d,variant:p,enableTrackSlot:o},v=S(h),y={},b={},x={};if(p===`determinate`){let e=2*Math.PI*((_-l)/2);y.strokeDasharray=e.toFixed(3),x[`aria-valuenow`]=Math.round(d),y.strokeDashoffset=`${((100-d)/100*e).toFixed(3)}px`,b.transform=`rotate(-90deg)`}return(0,g.jsx)(C,{className:f(v.root,r),style:{width:s,height:s,...b,...c},ownerState:h,ref:t,role:`progressbar`,...x,...m,children:(0,g.jsxs)(w,{className:v.svg,ownerState:h,viewBox:`${_/2} ${_/2} ${_} ${_}`,children:[o?(0,g.jsx)(E,{className:v.track,ownerState:h,cx:_,cy:_,r:(_-l)/2,fill:`none`,strokeWidth:l,"aria-hidden":`true`}):null,(0,g.jsx)(T,{className:v.circle,style:y,ownerState:h,cx:_,cy:_,r:(_-l)/2,fill:`none`,strokeWidth:l})]})})});export{D as t};