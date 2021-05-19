!function(e,t,r){"use strict";var s={render:()=>e.createVNode(e.resolveComponent("router-view"),null,null)},o={props:["content"],render:({content:t})=>e.createVNode("button",{type:"submit"},[t,e.createVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 50.96 37"},[e.createVNode("path",{d:"M50.96 18.5L32.45 37h-9.9l14.99-15H0v-7h37.54L22.55 0h9.9l18.51 18.5z"},null)])])},a={data:()=>({isLoggedIn:!1,err:null,username:"",password:""}),render(){return e.createVNode("div",{class:"container"},[e.createVNode("form",{onSubmit:e=>{e.preventDefault(),this.login()}},[e.withDirectives(e.createVNode("input",{"onUpdate:modelValue":e=>this.username=e,type:"text",placeholder:"Identifiant / Email"},null),[[e.vModelText,this.username]]),e.withDirectives(e.createVNode("input",{"onUpdate:modelValue":e=>this.password=e,type:"password",placeholder:"Mot de passe"},null),[[e.vModelText,this.password]]),this.err&&e.createVNode("p",{class:"error"},[this.err]),e.createVNode(o,{content:"Se connecter"},null)]),e.createVNode(e.resolveComponent("router-link"),{to:"/register"},{default:()=>[e.createTextVNode("Se créer un compte")]})])},methods:{getErrorFromHttpStatus:e=>401===e?"Identifiants invalides":"Il y'a eu un problème. Veuillez réessayer plus tard",login(){const{username:e,password:t}=this;if(!(e&&t))return this.err="Veuillez remplir tous les champs";r.post("/api/v1/login",{username:e,password:t}).then((()=>this.isLoggedIn=!0)).catch((e=>this.err=this.getErrorFromHttpStatus(e.response.status)))}}},i={data:()=>({isLoggedIn:!1,err:null,email:"",username:"",password:""}),render(){return e.createVNode("div",{class:"container"},[e.createVNode("form",{onSubmit:e=>{e.preventDefault(),this.register()}},[e.withDirectives(e.createVNode("input",{"onUpdate:modelValue":e=>this.email=e,type:"text",placeholder:"Adresse email"},null),[[e.vModelText,this.email]]),e.withDirectives(e.createVNode("input",{"onUpdate:modelValue":e=>this.username=e,type:"text",placeholder:"Identifiant"},null),[[e.vModelText,this.username]]),e.withDirectives(e.createVNode("input",{"onUpdate:modelValue":e=>this.password=e,type:"password",placeholder:"Mot de passe"},null),[[e.vModelText,this.password]]),this.err&&e.createVNode("p",{class:"error"},[this.err]),e.createVNode(o,{content:"S'inscrire"},null)]),e.createVNode(e.resolveComponent("router-link"),{to:"/login"},{default:()=>[e.createTextVNode("Se connecter")]})])},methods:{getErrorFromHttpStatus:e=>403===e?"Cette adresse email n'est pas whitelistée":"Il y'a eu un problème. Veuillez réessayer plus tard",register(){const{email:e,username:t,password:s}=this;if(!(e&&t&&s))return this.err="Veuillez remplir tous les champs";r.post("/api/v1/register",{email:e,username:t,password:s}).then((()=>this.isLoggedIn=!0)).catch((e=>this.err=this.getErrorFromHttpStatus(e.response.status)))}}};const n=t.createRouter({history:t.createWebHistory(),routes:[{path:"/",redirect:"/login"},{path:"/login",component:a},{path:"/register",component:i},{path:"/:pathMatch(.*)*",redirect:"/login"}]}),l=e.createApp(s).use(n);n.isReady().then((()=>{l.mount("body")}))}(Vue,VueRouter,axios);
