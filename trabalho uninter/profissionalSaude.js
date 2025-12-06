// Dados de exemplo para consultas
const consultasHoje = [
    {
        id: 1,
        hora: "09:00",
        paciente: "Carlos Oliveira",
        tipo: "presencial",
        especialidade: "Clínico Geral",
        convenio: "Unimed"
    },
    {
        id: 2,
        hora: "10:30",
        paciente: "Ana Santos",
        tipo: "teleconsulta",
        especialidade: "Clínico Geral",
        convenio: "Amil"
    },
    {
        id: 3,
        hora: "14:00",
        paciente: "Roberto Lima",
        tipo: "presencial",
        especialidade: "Clínico Geral",
        convenio: "Bradesco"
    },
    {
        id: 4,
        hora: "16:15",
        paciente: "Mariana Costa",
        tipo: "presencial",
        especialidade: "Clínico Geral",
        convenio: "SulAmérica"
    }
];

// Dados de exemplo para pacientes
const pacientesRecentes = [
    {
        id: 1,
        nome: "Carlos Oliveira",
        ultimaVisita: "10/11/2023",
        diagnostico: "Hipertensão"
    },
    {
        id: 2,
        nome: "Ana Santos",
        ultimaVisita: "05/11/2023",
        diagnostico: "Diabetes"
    },
    {
        id: 3,
        nome: "Roberto Lima",
        ultimaVisita: "01/11/2023",
        diagnostico: "Asma"
    },
    {
        id: 4,
        nome: "Mariana Costa",
        ultimaVisita: "28/10/2023",
        diagnostico: "Enxaqueca"
    }
];

// Função para carregar a agenda
function carregarAgenda() {
    const agendaContainer = document.getElementById('agendaHoje');
    const totalConsultas = document.getElementById('totalConsultas');
    
    if (consultasHoje.length === 0) {
        agendaContainer.innerHTML = '<p class="sem-consulta">Nenhuma consulta agendada para hoje</p>';
        totalConsultas.textContent = "0 consultas";
        return;
    }
    
    totalConsultas.textContent = `${consultasHoje.length} consultas`;
    agendaContainer.innerHTML = '';
    
    consultasHoje.forEach(consulta => {
        const item = document.createElement('div');
        item.className = 'item-consulta';
        item.onclick = () => mostrarDetalhesConsulta(consulta);
        
        item.innerHTML = `
            <div class="info-consulta">
                <div class="hora-consulta">${consulta.hora}</div>
                <div class="paciente-consulta">${consulta.paciente}</div>
            </div>
            <span class="tipo-consulta">${consulta.tipo}</span>
        `;
        
        agendaContainer.appendChild(item);
    });
}

// Função para carregar pacientes recentes
function carregarPacientesRecentes() {
    const listaContainer = document.getElementById('listaPacientes');
    const totalPacientes = document.getElementById('totalPacientes');
    
    totalPacientes.textContent = `${pacientesRecentes.length} pacientes`;
    listaContainer.innerHTML = '';
    
    pacientesRecentes.forEach(paciente => {
        const item = document.createElement('div');
        item.className = 'item-paciente';
        item.onclick = () => buscarPacienteCompleto();
        
        item.innerHTML = `
            <span class="nome-paciente">${paciente.nome}</span>
            <span class="ultima-visita">Última: ${paciente.ultimaVisita}</span>
        `;
        
        listaContainer.appendChild(item);
    });
}

// Função para filtrar pacientes na busca
function filtrarPacientes() {
    const termo = document.getElementById('buscarPaciente').value.toLowerCase();
    const listaContainer = document.getElementById('listaPacientes');
    
    if (!termo) {
        carregarPacientesRecentes();
        return;
    }
    
    const pacientesFiltrados = pacientesRecentes.filter(paciente =>
        paciente.nome.toLowerCase().includes(termo) ||
        paciente.diagnostico.toLowerCase().includes(termo)
    );
    
    listaContainer.innerHTML = '';
    
    if (pacientesFiltrados.length === 0) {
        listaContainer.innerHTML = '<p class="sem-resultado">Nenhum paciente encontrado</p>';
        return;
    }
    
    pacientesFiltrados.forEach(paciente => {
        const item = document.createElement('div');
        item.className = 'item-paciente';
        
        item.innerHTML = `
            <span class="nome-paciente">${paciente.nome}</span>
            <span class="ultima-visita">${paciente.diagnostico}</span>
        `;
        
        listaContainer.appendChild(item);
    });
}

// Função para buscar paciente
function buscarPaciente() {
    const termo = document.getElementById('buscarPaciente').value.trim();
    
    if (!termo) {
        alert('Por favor, digite um nome para buscar');
        return;
    }
    
    alert(`Buscando paciente: ${termo}`);
    // Em uma implementação real, aqui seria uma requisição ao servidor
}

// Função para gerenciar prontuários
function gerenciarProntuarios() {
    window.location.href = 'historicoMedPacientes.html';
}

// Função para emitir receita
function emitirReceita() {
    window.location.href = 'receita.html';
}

// Função para emitir encaminhamento
function emitirEncaminhamento() {
    window.location.href = 'encaminhamento.html';
}

// Função para buscar paciente completo
function buscarPacienteCompleto() {
    window.location.href = 'historicoMedPacientes.html';
}

// Função para mostrar detalhes da consulta
function mostrarDetalhesConsulta(consulta) {
    const modal = document.getElementById('modalDetalhesConsulta');
    const detalhes = document.getElementById('detalhesConsulta');
    
    detalhes.innerHTML = `
        <div class="detalhe-consulta">
            <strong>Paciente:</strong>
            <span>${consulta.paciente}</span>
        </div>
        <div class="detalhe-consulta">
            <strong>Horário:</strong>
            <span>${consulta.hora}</span>
        </div>
        <div class="detalhe-consulta">
            <strong>Tipo:</strong>
            <span>${consulta.tipo === 'presencial' ? 'Presencial' : 'Teleconsulta'}</span>
        </div>
        <div class="detalhe-consulta">
            <strong>Especialidade:</strong>
            <span>${consulta.especialidade}</span>
        </div>
        <div class="detalhe-consulta">
            <strong>Convênio:</strong>
            <span>${consulta.convenio}</span>
        </div>
    `;
    
    modal.style.display = 'flex';
}

// Função para fechar modal de detalhes
function fecharModalDetalhes() {
    document.getElementById('modalDetalhesConsulta').style.display = 'none';
}

// Função para iniciar consulta
function iniciarConsulta() {
    alert('Iniciando consulta...');
    fecharModalDetalhes();
    // Em uma implementação real, aqui redirecionaria para a página de consulta
}

// Função para mostrar modal de sair
function mostrarModalSair() {
    document.getElementById('modalSair').style.display = 'flex';
}

// Função para fechar modal de sair
function fecharModalSair() {
    document.getElementById('modalSair').style.display = 'none';
}

// Função para confirmar saída
function confirmarSaida() {
    alert('Saindo do sistema...');
    window.location.href = 'index.html';
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    carregarAgenda();
    carregarPacientesRecentes();
    
    // Fechar modais ao clicar fora
    window.onclick = function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    };
});