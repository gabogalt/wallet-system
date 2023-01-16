// import axios from "axios";
window.onload = function(){
    
    document.querySelector('#registerButton').addEventListener('click', async function(event){
        event.preventDefault()
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
		});
		registerForm.reset();
    })
}