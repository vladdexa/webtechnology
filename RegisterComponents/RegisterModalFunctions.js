const type = 'register';

async function createRegisterModal() {
    const modal = new Modal(type);
    await modal.createModalContent();
    await modal.openModal();
}

function closeRegisterModal() {
    const closeButton = document.getElementById('#closeModalButton');
    const modal = document.getElementById('#modal');
    const loginForm = document.getElementById('#loginForm');

    try {
        closeButton.onclick = () => {
            modal.style.display = 'none';
            loginForm.style.display = 'flex';
        }

    } catch (e) {
        throw new Error(e);
    }
}
