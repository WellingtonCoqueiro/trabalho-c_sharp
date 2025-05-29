document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formCadastro');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const tipoSanguineo = document.getElementById('tipoSanguineo').value;
      const email = document.getElementById('email').value;
      const novoDoador = { nome, tipoSanguineo, email };
      try {
        const response = await fetch('https://localhost:5001/api/doadores', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novoDoador)
        });
        if (response.ok) {
          alert('Doador cadastrado com sucesso!');
          form.reset();
        } else {
          alert('Erro ao cadastrar.');
        }
      } catch (error) {
        console.error(error);
        alert('Erro na comunicação com a API.');
      }
    });
  }
  const btnCarregar = document.getElementById('carregarDoadores');
  if (btnCarregar) {
    btnCarregar.addEventListener('click', async () => {
      try {
        const response = await fetch('https://localhost:5001/api/doadores');
        const doadores = await response.json();
        const tbody = document.querySelector('#tabelaDoadores tbody');
        tbody.innerHTML = '';
        doadores.forEach(doador => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${doador.nome}</td>
            <td>${doador.tipoSanguineo}</td>
            <td>${doador.email}</td>
          `;
          tbody.appendChild(tr);
        });
      } catch (error) {
        console.error(error);
        alert('Erro ao carregar doadores.');
      }
    });
  }
});