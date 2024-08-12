// js/main.js
import { initNavigation } from './navigation.js';
import { goBack } from './helpers.js';
import { confirmDelete, confirmEdit, adicionarAoCarrinho } from './product.js';

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

    // Associa o evento ao formulário de adicionar ao carrinho
    const addToCartForm = document.getElementById('add-to-cart-form');
    if (addToCartForm) {
        addToCartForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const produto_id = addToCartForm.querySelector('input[name="produto_id"]').value;
            const quantidade = addToCartForm.querySelector('input[name="quantidade"]').value;

            adicionarAoCarrinho(produto_id, quantidade);
        });
    }
});
