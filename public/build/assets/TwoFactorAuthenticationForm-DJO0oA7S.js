import{r as s,K as I,m as _,j as e,a as u,S as F}from"./app-nUqQ7yHU.js";import{A as L}from"./ActionSection-Ly8BKCvG.js";import{C as r}from"./ConfirmsPassword-BcQAYFj7.js";import{I as Q}from"./InputError-Dxbi3bhu.js";import{B as i}from"./button-CZNwMcjW.js";import{I as B}from"./input-BpRyKDf7.js";import{L as D}from"./label-DnNgpJC0.js";import{s as a}from"./index-DYrn6zHh.js";import"./dialog-z35dOSef.js";import"./index-jkSOGXlp.js";import"./index-Ck7UmjVM.js";import"./utils-DdhcCPaC.js";import"./index-BidZMABv.js";import"./index-CYRNUmCa.js";import"./index-DGrkKgMT.js";import"./index-Q3TAqLyU.js";import"./index-C86NnV09.js";import"./createLucideIcon-BITYyA_o.js";const se=s.memo(({requiresConfirmation:T})=>{const{props:{auth:{user:h}}}=I(),[c,f]=s.useState(!1),[o,p]=s.useState(!1),[d,y]=s.useState(!1),[j,w]=s.useState(null),[g,v]=s.useState(null),[m,A]=s.useState([]),l=_({code:""}),{reset:b,clearErrors:C}=l,n=!c&&(h==null?void 0:h.two_factor_enabled);s.useEffect(()=>{n||(b(),C())},[n,b,C]);const E=()=>u.get(a("two-factor.qr-code")).then(t=>{w(t.data.svg)}),R=()=>u.get(a("two-factor.secret-key")).then(t=>{v(t.data.secretKey)}),x=()=>u.get(a("two-factor.recovery-codes")).then(t=>{A(t.data)}),k=()=>{f(!0),F.post(a("two-factor.enable"),{},{preserveScroll:!0,onSuccess:()=>Promise.all([E(),R(),x()]),onFinish:()=>{f(!1),p(T)}})},S=()=>{l.post(a("two-factor.confirm"),{errorBag:"confirmTwoFactorAuthentication",preserveScroll:!0,preserveState:!0,onSuccess:()=>{p(!1),w(null),v(null)}})},K=()=>{u.post(a("two-factor.recovery-codes")).then(()=>x())},N=()=>{y(!0),F.delete(a("two-factor.disable"),{preserveScroll:!0,onSuccess:()=>{y(!1),p(!1)}})};return e.jsx(L,{title:"Two Factor Authentication",description:"Add additional security to your account using two factor authentication.",content:e.jsxs(e.Fragment,{children:[e.jsx("h3",{className:"text-lg font-medium",children:n&&!o?"You have enabled two factor authentication.":n&&o?"Finish enabling two factor authentication.":"You have not enabled two factor authentication."}),e.jsx("div",{className:"mt-3 max-w-xl text-sm",children:e.jsx("p",{children:"When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application."})}),n&&e.jsxs(e.Fragment,{children:[j&&e.jsxs("div",{children:[e.jsx("div",{className:"mt-4 max-w-xl text-sm",children:e.jsx("p",{className:"font-semibold",children:o?"To finish enabling two factor authentication, scan the following QR code using your phone's authenticator application or enter the setup key and provide the generated OTP code.":"Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator application or enter the setup key."})}),e.jsx("div",{className:"mt-4 max-w-xl text-sm text-gray-600",children:e.jsx("span",{dangerouslySetInnerHTML:{__html:j}})}),g&&e.jsx("div",{className:"mt-4 max-w-xl text-sm",children:e.jsxs("p",{className:"font-semibold",children:["Setup Key:"," ",e.jsx("span",{dangerouslySetInnerHTML:{__html:g}})]})}),o&&e.jsxs("div",{className:"mt-4",children:[e.jsx(D,{htmlFor:"code",children:"Code"}),e.jsx(B,{id:"code",type:"text",value:l.data.code,onChange:t=>l.setData("code",t.target.value),className:"block mt-1 w-1/2",inputMode:"numeric",autoFocus:!0,autoComplete:"one-time-code",onKeyUp:t=>t.key==="Enter"&&S()}),e.jsx(Q,{message:l.errors.code,className:"mt-2"})]})]}),m.length>0&&!o&&e.jsx("div",{children:e.jsx("div",{className:"mt-4 max-w-xl text-sm text-gray-600",children:m.map(t=>e.jsx("div",{children:t},t))})})]}),e.jsx("div",{className:"mt-5",children:n?e.jsxs("div",{className:"space-x-3",children:[o&&e.jsx(r,{onConfirmed:S,children:e.jsx(i,{type:"button",disabled:c,className:c?"opacity-25":"",children:"Confirm"})}),m.length>0&&!o&&e.jsx(r,{onConfirmed:K,children:e.jsx(i,{variant:"secondary",children:"Regenerate Recovery Codes"})}),m.length===0&&!o&&e.jsx(r,{onConfirmed:x,children:e.jsx(i,{variant:"secondary",children:"Show Recovery Codes"})}),o?e.jsx(r,{onConfirmed:N,children:e.jsx(i,{variant:"secondary",disabled:d,className:d?"opacity-25":"",children:"Cancel"})}):e.jsx(r,{onConfirmed:N,children:e.jsx(i,{variant:"destructive",disabled:d,className:d?"opacity-25":"",children:"Disable"})})]}):e.jsx(r,{onConfirmed:k,children:e.jsx(i,{type:"button",disabled:c,className:c?"opacity-25":"",children:"Enable"})})})]})})});export{se as default};
