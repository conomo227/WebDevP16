document.addEventListener('DOMContentLoaded', () => {
    const burgerButton = document.querySelector('.burger');
    const navLinks = document.getElementById('nav-links');

    if (burgerButton) {
        burgerButton.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    const form = document.getElementById('myForm');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const commentsInput = document.getElementById('comments');
    const responseMessage = document.getElementById('response-message'); 

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();  

            const formData = {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                email: emailInput.value,
                comments: commentsInput.value
            };

            const headers = {
                "Content-Type": "application/json"
            };

            fetch('/contact', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                responseMessage.textContent = `Thank you, ${data.firstName}. We will contact you at ${data.email}.`;
                responseMessage.style.color = "green";  
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                responseMessage.textContent = "Something went wrong. Please try again.";
                responseMessage.style.color = "red";  
            });
        });
    }
});
