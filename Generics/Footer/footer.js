const loadFooter = async(elementId,footerPath) => {
    const footerContainer = document.getElementById(elementId);
    const fPath = footerPath;

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

export {loadFooter};

