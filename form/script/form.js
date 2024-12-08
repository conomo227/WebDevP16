document.addEventListener('DOMContentLoaded', () => {
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
           
            const navLinks = document.getElementById('nav-links');
            data.header.navLinks.forEach(link => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = link.href;
                a.textContent = link.name;
                if (link.active) a.classList.add('active');
                li.appendChild(a);
                navLinks.appendChild(li);
            });

            const mainTitle = document.getElementById('main-title');
            const h1 = document.createElement('h1');
            h1.textContent = data.main.title;
            mainTitle.appendChild(h1);

            const formContainer = document.getElementById('form-container');
            const form = document.createElement('form');
            form.id = 'myForm';
            form.method = 'post';
            form.action = '/contact';
            data.main.formFields.forEach(field => {
                const label = document.createElement('label');
                label.setAttribute('for', field.id);
                label.textContent = field.label;
                const input = field.type === 'textarea' 
                    ? document.createElement('textarea') 
                    : document.createElement('input');
                input.id = field.id;
                input.name = field.name;
                input.type = field.type || '';
                if (field.required) input.required = true;
                if (field.placeholder) input.placeholder = field.placeholder;
                form.appendChild(label);
                form.appendChild(input);
            });
            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = data.main.submitButton;
            form.appendChild(submitButton);
            formContainer.appendChild(form);

            const footerLeft = document.getElementById('footer-left');
            footerLeft.textContent = data.footer.left;
            const footerRight = document.getElementById('footer-right');
            data.footer.right.forEach(item => {
                const li = document.createElement('li');
                if (item.href) {
                    const a = document.createElement('a');
                    a.href = item.href;
                    a.textContent = item.text;
                    li.appendChild(a);
                } else {
                    li.textContent = item.text;
                }
                footerRight.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading content:', error));

    // Form submission 
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
