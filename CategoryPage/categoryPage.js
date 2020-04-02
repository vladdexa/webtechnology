 const loadCards = async(numberOfCards) => {
     const cardsContainer = document.getElementById('#cards-container');
     const cardPath = '../Generics/card.html';

     try {
         await fetch(cardPath)
             .then(response => response.text())
             .then(html => {
                 new Promise(() => {
                     for (let i = 1; i <= numberOfCards; i++) {
                         let genericDiv = document.createElement('div');
                         genericDiv.innerHTML = html;
                         cardsContainer.appendChild(genericDiv);
                     }
                 })
             })
             .catch(error => {
                 console.log(error);
             })

     } catch (e) {
         throw new Error(e);
     }
 }

 const loadFooter = async() => {
     const footerContainer = document.getElementById('#footer-container');
     const footerPath = '../Generics/footer.html';

     try {
         await fetch(footerPath)
             .then(response => response.text())
             .then(html => {
                 footerContainer.innerHTML = html;

             })
             .catch(error => {
                 console.log(error);
             })

     } catch (e) {
         throw new Error(e);
     }
 }

 function load() {
     loadCards(9);
     loadFooter();
 }