// js/main.js
import { initNavigation } from './navigation.js';
import { goBack } from './helpers.js';
import { confirmDelete, confirmEdit } from './product.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();

    // Associa o evento de clique ao botão "Voltar"
    const backButton = document.querySelector('#back-button');
    if (backButton) {
        backButton.addEventListener('click', goBack);
    }

    // Adiciona o evento de confirmação ao formulário de edição
    const editForm = document.querySelector('.edit-form');
    if (editForm) {
        editForm.addEventListener('submit', confirmEdit);
    }

    // Associa o evento de clique aos botões de excluir
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            confirmDelete(productId);
        });
    });
});