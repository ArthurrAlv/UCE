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

// função de confimação de edição de algo
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

// Função para adicionar produto ao carrinho
export function adicionarAoCarrinho(produto_id, quantidade) {
  fetch('/carrinho/adicionar', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
          produto_id: produto_id,
          quantidade: quantidade
      })
  })
  .then(response => response.text())
  .then(result => {
      alert('Produto adicionado ao carrinho!');
      window.location.reload(); // Atualiza a página para refletir a mudança
  })
  .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao adicionar produto ao carrinho.');
  });
}
