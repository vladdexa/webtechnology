const forgotType = 'forgotPassword';

async function createForgotPasswordModal() {
    const modal = new Modal(forgotType);
    await modal.createModalContent();
    modal.openModal();
}


function closeForgotPasswordModal() {
    const loginForm = document.getElementById('#loginForm');
    const modal = document.getElementById('#modal');

    try {

        modal.style.display = 'none';
        loginForm.style.display = 'flex';
        modal.parentNode.removeChild(modal);

    } catch (e) {
        throw new Error(e);
    }
}