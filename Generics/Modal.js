class Modal {
    constructor(type) {
        this.type = type;
        this.modal = document.createElement('div');
        this.modal.className = 'modal';
        this.modal.id = '#modal';
    }

    openModal() {
        const loginForm = document.getElementById('#loginForm');

        this.modal.style.display = 'block';
        loginForm.style.display = 'none';

    }

    async createModalContent() {
        const registerHtmlPath = 'RegisterComponents/registerForm.html';
        const forgotPasswordHtmlPath = 'ForgotPasswordComponent/forgotPasswordForm.html';

        const fetchPath = this.type === 'register' ? registerHtmlPath : forgotPasswordHtmlPath;

        try {
            await fetch(fetchPath)
                .then((response) => response.text())
                .then((html) => {
                    Promise.resolve(this.modal.innerHTML = html);
                })
                .catch((error) => {
                    console.warn(error);
                });
        } catch (e) {
            throw new Error(e);
        }

        document.body.append(this.modal);
    }

}