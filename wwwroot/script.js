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

// Navegação mobile
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  if (mobileNav) {
    mobileNav.classList.toggle("active")
  }
}

// Funções para gerenciamento de doadores
function carregarDoadores() {
  const tabela = document.getElementById("tabelaDoadores")
  if (!tabela) return

  tabela.innerHTML = ""

  if (doadores.length === 0) {
    tabela.innerHTML = '<tr><td colspan="4" class="empty-state">Nenhum doador cadastrado</td></tr>'
    return
  }

  doadores.forEach((doador) => {
    const linha = document.createElement("tr")
    linha.innerHTML = `
            <td>
                ${
                  editingId === doador.id
                    ? `<input type="text" class="form-input" value="${doador.nome}" id="edit-nome-${doador.id}">`
                    : doador.nome
                }
            </td>
            <td>
                ${
                  editingId === doador.id
                    ? `<input type="text" class="form-input" value="${doador.tipoSanguineo}" id="edit-tipo-${doador.id}">`
                    : `<span class="blood-type-badge">${doador.tipoSanguineo}</span>`
                }
            </td>
            <td>
                ${
                  editingId === doador.id
                    ? `<input type="date" class="form-input" value="${doador.dataUltimaDoacao}" id="edit-data-${doador.id}">`
                    : formatDate(doador.dataUltimaDoacao)
                }
            </td>
            <td>
                <div class="action-buttons">
                    ${
                      editingId === doador.id
                        ? `
                        <button class="btn btn-icon-only btn-save" onclick="salvarEdicao(${doador.id})" title="Salvar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                                <polyline points="17,10 12,15 9,12"/>
                            </svg>
                        </button>
                        <button class="btn btn-icon-only btn-cancel" onclick="cancelarEdicao()" title="Cancelar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    `
                        : `
                        <button class="btn btn-icon-only btn-edit" onclick="iniciarEdicao(${doador.id})" title="Editar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="btn btn-icon-only btn-delete" onclick="abrirModalExclusao(${doador.id})" title="Excluir">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3,6 5,6 21,6"/>
                                <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"/>
                                <line x1="10" y1="11" x2="10" y2="17"/>
                                <line x1="14" y1="11" x2="14" y2="17"/>
                            </svg>
                        </button>
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

  const novoDoador = {
    id: doadores.length > 0 ? Math.max(...doadores.map((d) => d.id)) + 1 : 1,
    nome,
    tipoSanguineo,
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

  const doadorIndex = doadores.findIndex((d) => d.id === id)
  if (doadorIndex !== -1) {
    doadores[doadorIndex] = {
      ...doadores[doadorIndex],
      nome,
      tipoSanguineo,
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

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Carregar doadores se estivermos na página de doadores
  if (document.getElementById("tabelaDoadores")) {
    carregarDoadores()
  }

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
  const mobileNavLinks = document.querySelectorAll(".nav-mobile .nav-link")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const mobileNav = document.getElementById("mobileNav")
      if (mobileNav) {
        mobileNav.classList.remove("active")
      }
    })
  })

  // Adicionar classe active ao link da página atual
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
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

// Função para validar tipo sanguíneo
function validarTipoSanguineo(tipo) {
  const tiposValidos = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  return tiposValidos.includes(tipo.toUpperCase())
}

// Adicionar validação em tempo real para tipo sanguíneo
document.addEventListener("DOMContentLoaded", () => {
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
