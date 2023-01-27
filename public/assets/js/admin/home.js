import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const App = createApp({
  el:'Home',
  data() {
    return {
      currentYear:new Date().getFullYear(),
      loading: true, 
      user:null
    }
  },
  methods:{
    async verifyToken(){
        const response = await fetch('/api/home', {
            method: 'GET', // or 'PUT'
            headers: {
                Authorization: localStorage.getItem("jwt"),
            },
            }).then(response => response.json())
            .then(data => {
              if(data.code == 1){
                console.log(data)
                this.user = data.user
                  this.loading = false 
              }else{
                window.location = 'http://localhost:3000/login'
                this.loading = false 
              }
            }).catch(error => {
              console.error('Error:', error)
              window.location = 'http://localhost:3000/login'
            })
    },
    
  },
  mounted(){
    console.log('vue corriendo')
    const jwt = localStorage.getItem("jwt");
        if(jwt == null || jwt == undefined){
            window.location = 'http://localhost:3000/login'
        }else{
          this.verifyToken();
        }
  }
})

App.component("preloader", {
  template: `<transition name="fade">
                          <div class="preloader-wrapper">
                              <div class="lds-ripple"><div></div><div></div></div>
                          </div>
                      </transition>`,
});
App.mount('#app')