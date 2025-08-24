// Contact form submission handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const accessKey = 'your-web3forms-access-key-here'; // Replace 'your-web3forms-access-key-here' with your actual Web3Forms access key from https://web3forms.com/
            formData.append('access_key', accessKey);
            const hcaptchaResponse = hcaptcha.getResponse(); // Gets the hCaptcha response token
            formData.append('h-captcha-response', hcaptchaResponse);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                const messageDiv = document.getElementById('form-message');
                if (data.success) {
                    messageDiv.textContent = 'Message sent successfully!';
                    messageDiv.style.color = 'green';
                    form.reset();
                    hcaptcha.reset();
                } else {
                    messageDiv.textContent = 'Error: ' + data.message;
                    messageDiv.style.color = 'red';
                }
            } catch (error) {
                document.getElementById('form-message').textContent = 'An error occurred. Please try again.';
                document.getElementById('form-message').style.color = 'red';
            }
        });
    }
});