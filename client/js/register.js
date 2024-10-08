const registerForm = document.querySelector("#register-form")

registerForm.addEventListener("submit", e => {
    e.preventDefault()

    const username = document.querySelector('#register-username').value
    const password = document.querySelector('#register-password').value
    fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    })
})