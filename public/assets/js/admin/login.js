import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
      
const App = createApp({
  el:'Accounts',
  data() {
    return {
      email:null,
      password:null
    }
  },
  methods:{
    async Login(event){
        event.preventDefault()
        if(this.email == null || this.password == null){
            alert('Faltan campos requeridos')
            return
        }

        const data = {
            email : this.email,
            password : this.password
        }

        await fetch('/api/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("jwt", `Bearer ${data.signed}`);
                // window.location = '/'
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
  },
  mounted(){
    console.log('vue corriendo')
  }
})

App.mount('#app')