// Dados de exemplo das consultas
const consultas = [
    {
        id: 1,
        data: "15/04/2024",
        hora: "09:00",
        medico: "Dra. Maria Silva",
        especialidade: "Clínica Geral",
        status: "agendada",
        motivo: "Acompanhamento de hipertensão",
        local: "Vidaplus Clínica - Sala 201",
        endereco: "Av. Paulista, 1000 - São Paulo/SP",
        telefone: "(11) 3456-7890",
        observacoes: "Trazer exames recentes",
        urgente: false
    },
    {
        id: 2,
        data: "10/04/2024",
        hora: "14:30",
        medico: "Dr. Carlos Mendes",
        especialidade: "Cardiologia",
        status: "realizada",
        motivo: "Check-up cardiológico",
        local: "Hospital Santa Catarina",
        endereco: "Rua das Flores, 500 - São Paulo/SP",
        telefone: "(11) 2345-6789",
        observacoes: "Consulta realizada com sucesso",
        urgente: false
    },
    {
        id: 3,
        data: "20/04/2024",
        hora: "11:00",
        medico: "Dra. Ana Costa",
        especialidade: "Ortopedia",
        status: "agendada",
        motivo: "Dor no joelho",
        local: "Clínica Ortopédica Vidaplus",
        endereco: "Alameda Santos, 700 - São Paulo/SP",
        telefone: "(11) 4567-8901",
        observacoes: "Trazer exames de imagem",
        urgente: true
    },
    {
        id: 4,
        data: "05/04/2024",
        hora: "08:30",
        medico: "Dr. Roberto Almeida",
        especialidade: "Dermatologia",
        status: "cancelada",
        motivo: "Consulta de rotina",
        local: "Clínica Vidaplus Dermatologia",
        endereco: "Rua Augusta, 300 - São Paulo/SP",
        telefone: "(11) 5678-9012",
        observacoes: "Consulta cancelada pelo paciente",
        urgente: false
    },
    {
        id: 5,
        data: "18/04/2024",
        hora: "16:00",
        medico: "Dra. Fernanda Lima",
        especialidade: "Ginecologia",
        status: "agendada",
        motivo: "Exame anual",
        local: "Clínica Vidaplus Saúde da Mulher",
        endereco: "Av. Brigadeiro Faria Lima, 2000 - São Paulo/SP",
        telefone: "(11) 6789-0123",
        observacoes: "Trazer últimos exames",
        urgente: false
    }
];

// Variáveis globais
let consultaParaCancelar = null;

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    console.log("Minhas Consultas - Inicializando...");
    
    // Configurar eventos
    configurarEventos();
    
    // Carregar consultas
    carregarConsultas(consultas);
    
    console.log("Página inicializada com sucesso!");
});

// Configurar eventos
function configurarEventos() {
    // Evento do filtro de status
    const filtroStatus = document.getElementById('filtro-status');
    if (filtroStatus) {
        filtroStatus.addEventListener('change', filtrarConsultas);
    }
    
    // Evento do botão de busca
    const btnBusca = document.querySelector('.btn-busca');
    if (btnBusca) {
        btnBusca.addEventListener('click', filtrarConsultas);
    }
    
    // Evento de busca com Enter
    const inputBusca = document.getElementById('buscar-consultas');
    if (inputBusca) {
        inputBusca.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filtrarConsultas();
            }
        });
    }
    
    // Eventos dos modais
    const btnFecharCancelamento = document.querySelector('#modal-cancelamento .btn-secundario');
    if (btnFecharCancelamento) {
        btnFecharCancelamento.addEventListener('click', fecharModalCancelamento);
    }
    
    const btnConfirmarCancelamento = document.querySelector('#modal-cancelamento .btn-confirmar-cancelamento');
    if (btnConfirmarCancelamento) {
        btnConfirmarCancelamento.addEventListener('click', confirmarCancelamento);
    }
    
    const btnFecharDetalhes = document.querySelector('#modal-detalhes .btn-primario');
    if (btnFecharDetalhes) {
        btnFecharDetalhes.addEventListener('click', fecharModalDetalhes);
    }
    
    // Fechar modais ao clicar fora
    window.addEventListener('click', function(event) {
        const modalCancelamento = document.getElementById('modal-cancelamento');
        const modalDetalhes = document.getElementById('modal-detalhes');
        
        if (event.target === modalCancelamento) {
            fecharModalCancelamento();
        }
        
        if (event.target === modalDetalhes) {
            fecharModalDetalhes();
        }
    });
}

// Carregar consultas
function carregarConsultas(listaConsultas) {
    const container = document.getElementById('lista-consultas');
    
    if (!container) return;
    
    // Ordenar consultas por data (mais recente primeiro)
    const consultasOrdenadas = [...listaConsultas].sort((a, b) => {
        const dataA = new Date(a.data.split('/').reverse().join('-'));
        const dataB = new Date(b.data.split('/').reverse().join('-'));
        return dataA - dataB;
    });
    
    if (consultasOrdenadas.length === 0) {
        container.innerHTML = `
            <div class="estado-vazio">
                <div class="icone-vazio">📅</div>
                <h3>Nenhuma consulta encontrada</h3>
                <p>Você não tem consultas agendadas no momento.</p>
            </div>
        `;
        return;
    }
    
    // Gerar HTML das consultas
    const consultasHTML = consultasOrdenadas.map(consulta => {
        const statusClass = `status-${consulta.status}`;
        const statusTexto = consulta.status === 'agendada' ? 'Agendada' :
                          consulta.status === 'realizada' ? 'Realizada' : 'Cancelada';
        
        return `
            <div class="cartao-consulta" data-consulta-id="${consulta.id}">
                ${consulta.urgente ? '<div class="indicador-urgencia"></div>' : ''}
                <div class="cabecalho-consulta">
                    <h3>Consulta - ${consulta.especialidade}</h3>
                    <div class="status-consulta ${statusClass}">
                        ${statusTexto}
                    </div>
                </div>
                <div class="info-consulta">
                    <p><strong>Data:</strong> ${consulta.data} às ${consulta.hora}</p>
                    <p><strong>Médico:</strong> ${consulta.medico}</p>
                    <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
                    <p><strong>Motivo:</strong> ${consulta.motivo}</p>
                    <p><strong>Local:</strong> ${consulta.local}</p>
                </div>
                <div class="acoes-consulta">
                    <button class="btn-primario" onclick="verDetalhesConsulta(${consulta.id})">
                        Ver Detalhes
                    </button>
                    ${consulta.status === 'agendada' ? `
                        <button class="btn-cancelar" onclick="solicitarCancelamento(${consulta.id})">
                            Cancelar Consulta
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = consultasHTML;
}

// Filtrar consultas
function filtrarConsultas() {
    const filtroStatus = document.getElementById('filtro-status').value;
    const termoBusca = document.getElementById('buscar-consultas').value.toLowerCase();
    
    let consultasFiltradas = [...consultas];
    
    // Filtro por status
    if (filtroStatus !== 'todas') {
        consultasFiltradas = consultasFiltradas.filter(consulta => 
            consulta.status === filtroStatus
        );
    }
    
    // Filtro por busca
    if (termoBusca.trim() !== '') {
        consultasFiltradas = consultasFiltradas.filter(consulta => 
            consulta.medico.toLowerCase().includes(termoBusca) ||
            consulta.especialidade.toLowerCase().includes(termoBusca) ||
            consulta.motivo.toLowerCase().includes(termoBusca)
        );
    }
    
    // Carregar consultas filtradas
    carregarConsultas(consultasFiltradas);
}

// Ver detalhes da consulta
function verDetalhesConsulta(id) {
    const consulta = consultas.find(c => c.id === id);
    if (!consulta) return;
    
    const modal = document.getElementById('modal-detalhes');
    const detalhes = document.getElementById('detalhes-consulta');
    
    if (!modal || !detalhes) return;
    
    const statusTexto = consulta.status === 'agendada' ? 'Agendada' :
                      consulta.status === 'realizada' ? 'Realizada' : 'Cancelada';
    
    detalhes.innerHTML = `
        <p><strong>Data e Hora:</strong> ${consulta.data} às ${consulta.hora}</p>
        <p><strong>Médico:</strong> ${consulta.medico}</p>
        <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
        <p><strong>Status:</strong> ${statusTexto}</p>
        <p><strong>Motivo:</strong> ${consulta.motivo}</p>
        <p><strong>Local:</strong> ${consulta.local}</p>
        <p><strong>Endereço:</strong> ${consulta.endereco}</p>
        <p><strong>Telefone:</strong> ${consulta.telefone}</p>
        <p><strong>Observações:</strong> ${consulta.observacoes}</p>
        ${consulta.urgente ? '<p><strong>⚠️ Esta consulta é urgente!</strong></p>' : ''}
    `;
    
    // Mostrar modal
    modal.style.display = 'flex';
}

// Solicitar cancelamento
function solicitarCancelamento(id) {
    const consulta = consultas.find(c => c.id === id);
    if (!consulta) return;
    
    consultaParaCancelar = id;
    
    const modal = document.getElementById('modal-cancelamento');
    const texto = document.getElementById('texto-modal-cancelamento');
    
    if (!modal || !texto) return;
    
    texto.innerHTML = `Tem certeza que deseja cancelar a consulta com <strong>${consulta.medico}</strong> no dia <strong>${consulta.data} às ${consulta.hora}</strong>?`;
    
    // Mostrar modal
    modal.style.display = 'flex';
}

// Confirmar cancelamento
function confirmarCancelamento() {
    if (!consultaParaCancelar) return;
    
    // Encontrar a consulta
    const consultaIndex = consultas.findIndex(c => c.id === consultaParaCancelar);
    if (consultaIndex === -1) return;
    
    // Atualizar status
    consultas[consultaIndex].status = 'cancelada';
    
    // Fechar modal
    fecharModalCancelamento();
    
    // Recarregar consultas
    filtrarConsultas();
    
    // Mostrar mensagem de sucesso
    alert('Consulta cancelada com sucesso!');
    
    // Limpar variável
    consultaParaCancelar = null;
}

// Fechar modal de cancelamento
function fecharModalCancelamento() {
    const modal = document.getElementById('modal-cancelamento');
    if (modal) {
        modal.style.display = 'none';
        consultaParaCancelar = null;
    }
}

// Fechar modal de detalhes
function fecharModalDetalhes() {
    const modal = document.getElementById('modal-detalhes');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Nova consulta
function novaConsulta() {
    alert('Redirecionando para agendamento de nova consulta...');
    // Aqui você redirecionaria para a página de agendamento
    // window.location.href = 'consulta.html';
}

// Fechar modais com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharModalCancelamento();
        fecharModalDetalhes();
    }
});