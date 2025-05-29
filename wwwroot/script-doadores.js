// Estado global da aplicação
let doadores = [
  {
    id: 1,
    nome: "Maria Silva",
    tipoSanguineo: "O+",
    dataUltimaDoacao: "2025-03-15",
  },
  {
    id: 2,
    nome: "João Santos",
    tipoSanguineo: "A-",
    dataUltimaDoacao: "2025-02-20",
  },
  {
    id: 3,
    nome: "Ana Oliveira",
    tipoSanguineo: "AB+",
    dataUltimaDoacao: "2025-04-10",
  },
]

let editingId = null
let deleteId = null

// Função para toggle do menu mobile
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  if (mobileNav) {
    mobileNav.classList.toggle("active")
  }
}

// Funções de utilidade
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR")
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast")
  const toastMessage = document.getElementById("toastMessage")

  if (toast && toastMessage) {
    toastMessage.textContent = message
    toast.className = `toast show ${type}`

    setTimeout(() => {
      toast.className = "toast"
    }, 3000)
  }
}

// Funções para gerenciamento de doadores
function carregarDoadores() {
  const tabela = document.getElementById("tabelaDoadores")
  if (!tabela) return

  tabela.innerHTML = ""

  if (doadores.length === 0) {
    tabela.innerHTML = '<tr><td colspan="5" class="empty-state">Nenhum doador cadastrado</td></tr>'
    return
  }

  doadores.forEach((doador) => {
    const linha = document.createElement("tr")
    linha.innerHTML = `
      <td>${doador.id}</td>
      <td>
        ${
          editingId === doador.id
            ? `<input type="text" value="${doador.nome}" id="edit-nome-${doador.id}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-red-200); border-radius: 0.25rem;">`
            : doador.nome
        }
      </td>
      <td>
        ${
          editingId === doador.id
            ? `<input type="text" value="${doador.tipoSanguineo}" id="edit-tipo-${doador.id}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-red-200); border-radius: 0.25rem;">`
            : `<span class="blood-type">${doador.tipoSanguineo}</span>`
        }
      </td>
      <td>
        ${
          editingId === doador.id
            ? `<input type="date" value="${doador.dataUltimaDoacao}" id="edit-data-${doador.id}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-red-200); border-radius: 0.25rem;">`
            : formatDate(doador.dataUltimaDoacao)
        }
      </td>
      <td>
        <div class="action-buttons">
          ${
            editingId === doador.id
              ? `
              <button class="btn-icon btn-save" onclick="salvarEdicao(${doador.id})" title="Salvar">💾</button>
              <button class="btn-icon btn-cancel" onclick="cancelarEdicao()" title="Cancelar">❌</button>
            `
              : `
              <button class="btn-icon btn-edit" onclick="iniciarEdicao(${doador.id})" title="Editar">✏️</button>
              <button class="btn-icon btn-delete" onclick="abrirModalExclusao(${doador.id})" title="Excluir">🗑️</button>
            `
          }
        </div>
      </td>
    `
    tabela.appendChild(linha)
  })
}

function cadastrarDoador(event) {
  event.preventDefault()

  const nome = document.getElementById("nome").value
  const tipoSanguineo = document.getElementById("tipoSanguineo").value
  const dataUltimaDoacao = document.getElementById("dataUltimaDoacao").value

  if (!nome || !tipoSanguineo || !dataUltimaDoacao) {
    showToast("Por favor, preencha todos os campos", "error")
    return
  }

  // Validar tipo sanguíneo
  if (!validarTipoSanguineo(tipoSanguineo)) {
    showToast("Tipo sanguíneo inválido. Use: A+, A-, B+, B-, AB+, AB-, O+, O-", "error")
    return
  }

  const novoDoador = {
    id: doadores.length > 0 ? Math.max(...doadores.map((d) => d.id)) + 1 : 1,
    nome,
    tipoSanguineo: tipoSanguineo.toUpperCase(),
    dataUltimaDoacao,
  }

  doadores.push(novoDoador)

  // Limpar formulário
  document.getElementById("nome").value = ""
  document.getElementById("tipoSanguineo").value = ""
  document.getElementById("dataUltimaDoacao").value = ""

  carregarDoadores()
  showToast("Doador cadastrado com sucesso!")
}

function iniciarEdicao(id) {
  editingId = id
  carregarDoadores()
}

function cancelarEdicao() {
  editingId = null
  carregarDoadores()
}

function salvarEdicao(id) {
  const nome = document.getElementById(`edit-nome-${id}`).value
  const tipoSanguineo = document.getElementById(`edit-tipo-${id}`).value
  const dataUltimaDoacao = document.getElementById(`edit-data-${id}`).value

  if (!nome || !tipoSanguineo || !dataUltimaDoacao) {
    showToast("Por favor, preencha todos os campos", "error")
    return
  }

  if (!validarTipoSanguineo(tipoSanguineo)) {
    showToast("Tipo sanguíneo inválido. Use: A+, A-, B+, B-, AB+, AB-, O+, O-", "error")
    return
  }

  const doadorIndex = doadores.findIndex((d) => d.id === id)
  if (doadorIndex !== -1) {
    doadores[doadorIndex] = {
      ...doadores[doadorIndex],
      nome,
      tipoSanguineo: tipoSanguineo.toUpperCase(),
      dataUltimaDoacao,
    }

    editingId = null
    carregarDoadores()
    showToast("Doador atualizado com sucesso!")
  }
}

function abrirModalExclusao(id) {
  deleteId = id
  const modal = document.getElementById("confirmModal")
  if (modal) {
    modal.classList.add("active")
  }
}

function closeModal() {
  deleteId = null
  const modal = document.getElementById("confirmModal")
  if (modal) {
    modal.classList.remove("active")
  }
}

function confirmDelete() {
  if (deleteId) {
    doadores = doadores.filter((d) => d.id !== deleteId)
    carregarDoadores()
    showToast("Doador excluído com sucesso!")
    closeModal()
  }
}

// Função para validar tipo sanguíneo
function validarTipoSanguineo(tipo) {
  const tiposValidos = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  return tiposValidos.includes(tipo.toUpperCase())
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Carregar doadores
  carregarDoadores()

  // Formulário de cadastro de doadores
  const doadorForm = document.getElementById("doadorForm")
  if (doadorForm) {
    doadorForm.addEventListener("submit", cadastrarDoador)
  }

  // Fechar modal ao clicar fora dele
  const modal = document.getElementById("confirmModal")
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal()
      }
    })
  }

  // Fechar menu mobile ao clicar em um link
  const mobileNavLinks = document.querySelectorAll(".mobile-nav a")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const mobileNav = document.getElementById("mobileNav")
      if (mobileNav) {
        mobileNav.classList.remove("active")
      }
    })
  })

  // Validação em tempo real para tipo sanguíneo
  const tipoSanguineoInput = document.getElementById("tipoSanguineo")
  if (tipoSanguineoInput) {
    tipoSanguineoInput.addEventListener("blur", function () {
      const valor = this.value.trim()
      if (valor && !validarTipoSanguineo(valor)) {
        showToast("Tipo sanguíneo inválido. Use: A+, A-, B+, B-, AB+, AB-, O+, O-", "error")
        this.focus()
      }
    })
  }
})

// Fechar toast ao clicar nele
document.addEventListener("click", (event) => {
  if (event.target.closest(".toast")) {
    const toast = document.getElementById("toast")
    if (toast) {
      toast.classList.remove("show")
    }
  }
})
