document.addEventListener('DOMContentLoaded', () => {
    const createAccountForm = document.getElementById('create-account-form');
    const loginForm = document.getElementById('login-form');

    if (createAccountForm) {
        createAccountForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Save the account details to localStorage
            const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            const accountExists = accounts.some(account => account.email === email);

            if (accountExists) {
                alert('Account with this email already exists.');
            } else {
                accounts.push({ username, email, password });
                localStorage.setItem('accounts', JSON.stringify(accounts));
                alert('Account created successfully!');
                window.location.href = 'auth.html#login-section';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            // Validate login details
            const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            const account = accounts.find(account => account.username === username && account.password === password);

            if (account) {
                alert('Login successful!');
                // Redirect to a protected page or dashboard
                window.location.href = 'courses.html';
            } else {
                alert('Invalid username or password.');
            }
        });
    }
});
