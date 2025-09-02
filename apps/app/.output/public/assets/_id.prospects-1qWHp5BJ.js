import{r as s,k as v,j as e}from"./main-BNT9XLv-.js";/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var f={outline:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},filled:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"currentColor",stroke:"none"}};/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=(l,t,o,d)=>{const a=s.forwardRef(({color:c="currentColor",size:r=24,stroke:w=2,title:n,className:m,children:i,...x},h)=>s.createElement("svg",{ref:h,...f[l],width:r,height:r,className:["tabler-icon",`tabler-icon-${t}`,m].join(" "),fill:c,...x},[n&&s.createElement("title",{key:"svg-title"},n),...d.map(([u,g])=>s.createElement(u,g)),...Array.isArray(i)?i:[i]]));return a.displayName=`${o}`,a};/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z",key:"svg-0"}]],p=j("filled","circle-check-filled","CircleCheckFilled",N);function C(){const{project:l}=v.useLoaderData();return e.jsxs("div",{className:"px-10 flex flex-col",children:[e.jsxs("div",{className:"grid grid-cols-4 gap-4 p-3 -mx-3",children:[e.jsx("div",{className:"text-sm font-medium text-neutral-500",children:"Email"}),e.jsx("div",{className:"text-sm font-medium text-neutral-500",children:"Created At"}),e.jsx("div",{className:"text-sm font-medium text-neutral-500",children:"Last Messaged"}),e.jsx("div",{className:"text-sm font-medium text-neutral-500",children:"Verified"})]}),l.prospects.map(t=>e.jsxs("div",{className:"grid grid-cols-4 gap-4 p-3 -mx-3 rounded-lg",children:[e.jsx("div",{className:"text-sm",children:t.email}),e.jsx("div",{className:"text-sm",children:"5 minutes ago"},t.id),e.jsx("div",{className:"text-sm",children:"Never"},t.id),e.jsx("div",{className:"text-sm",children:e.jsx(p,{className:"size-5 text-green-600"})},t.id)]},t.id))]})}export{C as component};
