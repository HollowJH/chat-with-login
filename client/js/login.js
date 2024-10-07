const loginForm = document.querySelector('#login-form')

loginForm.addEventListener("submit", e => {
    e.preventDefault()

    const username = document.querySelector('#login-username').value
    const password = document.querySelector('#login-password').value
    fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    })
})