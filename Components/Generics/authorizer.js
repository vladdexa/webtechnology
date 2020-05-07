export const authorizer = ()=> {

    const userLocalStorage = window.localStorage.getItem('user');
    const decrypted = CryptoJS.AES.decrypt(userLocalStorage, "Secret Passphrase");
    return decrypted.toString(CryptoJS.enc.Utf8);
};
