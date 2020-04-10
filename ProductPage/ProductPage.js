
import { loadFooter } from "../Generics/Footer/footer.js";


const initialize = async () => {
    const htmlFooterPath = '../Generics/Footer/footer.html';
    const idFooterContainer = '#footer-container';

    await loadFooter(idFooterContainer, htmlFooterPath);
};
document.getElementById('#body').addEventListener('load',initialize());

