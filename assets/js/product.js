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
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json' // Importante para receber a resposta como JSON
    },
    body: new URLSearchParams({
      produto_id: produto_id,
      quantidade: quantidade
    })
  })
  .then(response => {
    if (response.status === 401) {
      // Lida com o status de não autorizado
      return response.json().then(data => {
        alert(data.message);
        window.location.href = data.redirectUrl; // Redireciona para a página de login
        throw new Error('Redirecionando para login'); // Interrompe a execução
      });
    } else if (!response.ok) {
      throw new Error('Erro ao adicionar produto ao carrinho.');
    }
    return response.text(); // Apenas continua se a resposta for bem-sucedida
  })
  .then(result => {
    alert('Produto adicionado ao carrinho!');
    window.location.reload(); // Atualiza a página para refletir a mudança
  })
  .catch(error => {
    if (error.message !== 'Redirecionando para login') {
      console.error('Erro:', error);
      alert('Produto não adicionado! Não há estoque!');
    }
  });
}