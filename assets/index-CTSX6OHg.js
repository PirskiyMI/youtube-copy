function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-D5ETi6QL.js","assets/index-NkGzaZM3.js","assets/index-CoNCGRLo.css","assets/index-Qw6cOJdQ.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as a,_ as i,u as o,o as r,j as e,p as _}from"./index-NkGzaZM3.js";const p="_page_1sgip_1",n="_page__title_1sgip_9",t={page:p,page__title:n},c=a.lazy(async()=>{const{FavoriteVideoList:s}=await i(()=>import("./index-D5ETi6QL.js"),__vite__mapDeps([0,1,2,3]));return{default:s}}),g=()=>{const s=o(r);return e.jsx(a.Suspense,{children:s?e.jsx(c,{}):e.jsxs("div",{className:t.page,children:[e.jsx("h2",{className:t.page__title,children:"Войдите в аккаунт"}),e.jsx("p",{children:"Тогда в этом разделе появятся видео, которые вам понравились."}),e.jsx(_,{})]})})};export{g as FavoritesPage};
