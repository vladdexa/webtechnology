const type = 'register';

async function createRegisterModal() {
    const modal = new Modal(type);
    await modal.createModalContent();
    modal.openModal();
}

function closeRegisterModal() {
    const modal = document.getElementById('#modal');
    const loginForm = document.getElementById('#loginForm');

    try {
        modal.style.display = 'none';
        loginForm.style.display = 'flex';
        modal.parentNode.removeChild(modal);


    } catch (e) {
        throw new Error(e);
    }
}
