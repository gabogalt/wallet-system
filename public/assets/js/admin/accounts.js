 import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
      
        const App = createApp({
          el:'Accounts',
          data() {
            return {
              accounts: false,
              currentYear: new Date().getFullYear(),
              nameAccount: null,
              typeMoney: 'Selecciona Uno'
            }
          },
          methods:{
            async addNewAccount(){
                if(this.nameAccount == null || this.typeMoney == 'Selecciona Uno'){
                    alert('Faltan campos requeridos')
                    return
                }

                const data = {
                    nameAccount : this.nameAccount,
                    typeMoney : this.typeMoney
                }

                await fetch('/api/register-account', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                });

            },
            closeNewAccount(){
                this.nameAccount = null,
                this.typeMoney = 'Selecciona Uno';
            }
          },
          mounted(){
            document.getElementById("sidenav-main").style.zIndex = 10
            
          }
        })

        App.mount('#app')