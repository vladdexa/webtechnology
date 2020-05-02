import { loadFooter } from "../../Components/Generics/Footer/footer";


const initialize = async () => {
    const htmlFooterPath = '../../Components/Generics/Footer/footer.html';
    const idFooterContainer = '#footer-container';

    await loadFooter(idFooterContainer, htmlFooterPath);
};
document.getElementById('#body').addEventListener('load',initialize());
