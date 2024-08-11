// js/product.js
export function confirmDelete(productId) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      var form = document.createElement('form');
      form.method = 'POST';
      form.action = '/vendedor/excluirProduto/' + productId;

      document.body.appendChild(form);
      form.submit();
    }
}

export function confirmEdit(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Exibe o alerta de confirmação
    const confirmed = confirm('Tem certeza de que deseja salvar as alterações?');

    if (confirmed) {
        // Se confirmado, submete o formulário
        event.target.submit();
    } else {
      // Se não confirmado, recarrega a página
      location.reload();
    }
}