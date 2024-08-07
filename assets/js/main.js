// js/main.js
import { initNavigation } from './navigation.js';
import { goBack } from './helpers.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();

    // Associa o evento de clique ao botão "Voltar"
    const backButton = document.querySelector('#back-button');
    if (backButton) {
        backButton.addEventListener('click', goBack);
    }
});
