import{r as s,u as r,g as p,a as x,b as f,f as c,j as e,V,c as g,P as h}from"./index-R4FHraQG.js";const P=()=>{const[a,o]=s.useState(!1),t=r(p),l=r(x),i=f();s.useEffect(()=>{i(c({maxResults:16}))},[]),s.useEffect(()=>{a&&t.length<100&&i(c({maxResults:16})),o(!1)},[a]);const u=s.useCallback(n=>{o(n)},[]);return t.length?e.jsx(h,{videoList:t,loading:l,handleInView:u}):e.jsx(V,{children:[...new Array(16)].map((n,d)=>e.jsx("li",{children:e.jsx(g,{})},d))})},j="_container_ge8bq_1",m={container:j},L=()=>e.jsx("div",{className:m.container,children:e.jsx(P,{})});export{L as HomePage};