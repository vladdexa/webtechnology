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
        if (this.type === 'register') {
            try {
                await fetch('RegisterComponents/registerForm.html')
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
        }
        document.body.append(this.modal);
    }

}
