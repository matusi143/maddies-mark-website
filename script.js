document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const accessKey = 'your-web3forms-access-key-here'; // Sign up at web3forms.com and replace
            formData.append('access_key', accessKey);
            const hcaptchaResponse = form.querySelector('.h-captcha').dataset.response || hcaptcha.getResponse(); // Ensure hCaptcha is validated
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
                    form.reset();
                    hcaptcha.reset();
                } else {
                    messageDiv.textContent = 'Error: ' + data.message;
                }
            } catch (error) {
                document.getElementById('form-message').textContent = 'An error occurred. Please try again.';
            }
        });
    }
});