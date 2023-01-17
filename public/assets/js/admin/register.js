window.onload = async function(){
    document.querySelector('#registerButton').addEventListener('click', async function(event){
        event.preventDefault()
		const verify = verifyPassword()
		const email = document.getElementById("email").value;
		if(verify== true && email != ''){
			document.querySelector('.alert.alert-danger.email').classList.add('d-none')
			const registerForm = document.getElementById("registerForm")
			const formData = new FormData(registerForm);
			const data = Object.fromEntries(formData.entries());
			await fetch("/api/register-user", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					// Authorization: localStorage.getItem("jwt"),
				},
			}).then((response) => response.json())
			.then((data) =>{
				console.log(data.code)
				if(data.code == 1){
					document.querySelector('.alert.alert-success').classList.remove('d-none')
					document.querySelector('.alert.alert-warning').classList.add('d-none')
					setTimeout(function(){
						window.location = '/login'
					},1500)
				}else{
					document.querySelector('.alert.alert-warning').classList.remove('d-none')
					document.querySelector('.alert.alert-success').classList.add('d-none')
				}
			});
			registerForm.reset();
		}else{
			if(verify == false){
				document.querySelector('.alert.alert-danger').classList.remove('d-none')
			}
			document.querySelector('.alert.alert-danger.email').classList.remove('d-none')
		}
        
    })

	document.querySelector("#password").addEventListener('change', ()=> verifyPassword())

	document.querySelector("#repeatPassword").addEventListener('change', ()=>verifyPassword())
 

	const verifyPassword = ()=>{
		let verify = false
		const password = document.getElementById("password").value;
	   const repeatPassword = document.getElementById("repeatPassword").value;
	   if(repeatPassword != '' && password != ''){
			if(repeatPassword != password){
				document.querySelector('.alert.alert-danger').classList.remove('d-none')
			}else{
				document.querySelector('.alert.alert-danger').classList.add('d-none')
				verify = true;
			}
	   }

	   return verify
	}

	getGoogleIdClient()

	
	
}

// register with google
async function onSignUp(response) {
	
	console.log(response.credential)
	await fetch("/api/register-user-with-google", {
		method: "POST",
		body: JSON.stringify({jwtGoogle: response.credential}),
		headers: {
			"Content-Type": "application/json",
			// Authorization: localStorage.getItem("jwt"),
		},
	}).then((response) => response.json())
	.then((data) =>{
		console.log(data.code)
		if(data.code == 1){
			document.querySelector('.alert.alert-success').classList.remove('d-none')
			document.querySelector('.alert.alert-warning').classList.add('d-none')
			setTimeout(function(){
				window.location = '/login'
			},1500)
		}else{
			document.querySelector('.alert.alert-warning').classList.remove('d-none')
			document.querySelector('.alert.alert-success').classList.add('d-none')
		}
		
	});
}
