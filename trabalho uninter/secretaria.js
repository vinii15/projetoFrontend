// secretaria.js - Painel Administrativo Vida Plus

// Dados de exemplo para demonstração
const dadosExemplo = {
    // Dashboard
    estatisticas: {
        consultasHoje: 18,
        solicitacoes: 12,
        exames: 7,
        aguardando: 5,
        medicosAtivos: 8,
        salasOcupadas: 6,
        salasTotal: 12,
        cancelamentosHoje: 2
    },
    
    // Solicitações
    solicitacoes: [
        {
            id: 1,
            tipo: "nova-consulta",
            titulo: "Solicitação de nova consulta",
            paciente: "Maria Silva",
            pacienteId: 101,
            data: "2024-12-16",
            horario: "14:30",
            motivo: "Dor abdominal persistente",
            urgencia: "media",
            status: "pendente",
            dataSolicitacao: "2024-12-15 09:15"
        },
        {
            id: 2,
            tipo: "remarcacao",
            titulo: "Pedido de remarcação",
            paciente: "João Santos",
            pacienteId: 102,
            consultaOriginal: "2024-12-18 10:00",
            motivo: "Compromisso de trabalho",
            urgencia: "baixa",
            status: "pendente",
            dataSolicitacao: "2024-12-15 14:22"
        },
        {
            id: 3,
            tipo: "cancelamento",
            titulo: "Solicitação de cancelamento",
            paciente: "Ana Oliveira",
            pacienteId: 103,
            consultaOriginal: "2024-12-16 16:00",
            motivo: "Problemas de saúde",
            urgencia: "alta",
            status: "pendente",
            dataSolicitacao: "2024-12-15 11:45"
        },
        {
            id: 4,
            tipo: "exame",
            titulo: "Solicitação de exame",
            paciente: "Carlos Mendes",
            pacienteId: 104,
            data: "2024-12-17",
            motivo: "Exame de sangue - jejum",
            urgencia: "media",
            status: "pendente",
            dataSolicitacao: "2024-12-15 10:30"
        }
    ],
    
    // Consultas
    consultas: [
        {
            id: 1,
            paciente: "Fernanda Costa",
            pacienteId: 105,
            medico: "Dr. Roberto Alves",
            medicoId: 201,
            data: "2024-12-15",
            horario: "09:00",
            tipo: "presencial",
            motivo: "Acompanhamento pós-operatório",
            status: "agendada",
            sala: "Sala 01",
            duracao: 30
        },
        {
            id: 2,
            paciente: "Ricardo Lima",
            pacienteId: 106,
            medico: "Dra. Mariana Santos",
            medicoId: 202,
            data: "2024-12-15",
            horario: "11:30",
            tipo: "remota",
            motivo: "Consulta de rotina",
            status: "confirmada",
            sala: "Virtual",
            duracao: 45
        },
        {
            id: 3,
            paciente: "Juliana Martins",
            pacienteId: 107,
            medico: "Dr. Paulo Ribeiro",
            medicoId: 203,
            data: "2024-12-15",
            horario: "14:00",
            tipo: "presencial",
            motivo: "Exames de rotina",
            status: "agendada",
            sala: "Sala 03",
            duracao: 30
        },
        {
            id: 4,
            paciente: "Pedro Henrique",
            pacienteId: 108,
            medico: "Dra. Carla Mendes",
            medicoId: 204,
            data: "2024-12-15",
            horario: "16:30",
            tipo: "presencial",
            motivo: "Dor nas costas",
            status: "cancelada",
            sala: "Sala 02",
            duracao: 45
        }
    ],
    
    // Pacientes
    pacientes: [
        {
            id: 101,
            prontuario: "VP001",
            nome: "Maria Silva",
            cpf: "123.456.789-00",
            telefone: "(11) 99999-9999",
            email: "maria@email.com",
            planoSaude: "Amil",
            ultimaConsulta: "2024-11-20",
            proximaConsulta: "2024-12-16",
            status: "ativo"
        },
        {
            id: 102,
            prontuario: "VP002",
            nome: "João Santos",
            cpf: "987.654.321-00",
            telefone: "(11) 98888-8888",
            email: "joao@email.com",
            planoSaude: "Unimed",
            ultimaConsulta: "2024-11-25",
            proximaConsulta: "2024-12-18",
            status: "ativo"
        },
        {
            id: 103,
            prontuario: "VP003",
            nome: "Ana Oliveira",
            cpf: "456.789.123-00",
            telefone: "(11) 97777-7777",
            email: "ana@email.com",
            planoSaude: "Bradesco Saúde",
            ultimaConsulta: "2024-11-15",
            proximaConsulta: null,
            status: "ativo"
        },
        {
            id: 104,
            prontuario: "VP004",
            nome: "Carlos Mendes",
            cpf: "789.123.456-00",
            telefone: "(11) 96666-6666",
            email: "carlos@email.com",
            planoSaude: "SulAmérica",
            ultimaConsulta: "2024-12-01",
            proximaConsulta: "2024-12-17",
            status: "ativo"
        }
    ],
    
    // Médicos
    medicos: [
        {
            id: 201,
            nome: "Dr. Roberto Alves",
            crm: "CRM-SP 123456",
            especialidade: "Cardiologia",
            telefone: "(11) 3333-4444",
            email: "roberto.alves@vidapius.com",
            ativo: true,
            disponibilidade: "disponivel"
        },
        {
            id: 202,
            nome: "Dra. Mariana Santos",
            crm: "CRM-SP 234567",
            especialidade: "Pediatria",
            telefone: "(11) 3333-5555",
            email: "mariana.santos@vidapius.com",
            ativo: true,
            disponibilidade: "disponivel"
        },
        {
            id: 203,
            nome: "Dr. Paulo Ribeiro",
            crm: "CRM-SP 345678",
            especialidade: "Ortopedia",
            telefone: "(11) 3333-6666",
            email: "paulo.ribeiro@vidapius.com",
            ativo: true,
            disponibilidade: "indisponivel"
        },
        {
            id: 204,
            nome: "Dra. Carla Mendes",
            crm: "CRM-SP 456789",
            especialidade: "Dermatologia",
            telefone: "(11) 3333-7777",
            email: "carla.mendes@vidapius.com",
            ativo: true,
            disponibilidade: "disponivel"
        }
    ],
    
    // Recursos
    recursos: {
        salas: [
            {
                id: 1,
                nome: "Sala 01",
                tipo: "consulta",
                equipamentos: ["Estetoscópio", "Otoscópio", "Computador"],
                status: "ocupada",
                proximaLimpeza: "2024-12-15 18:00"
            },
            {
                id: 2,
                nome: "Sala 02",
                tipo: "consulta",
                equipamentos: ["Estetoscópio", "Otoscópio", "Computador"],
                status: "disponivel",
                proximaLimpeza: "2024-12-15 17:00"
            },
            {
                id: 3,
                nome: "Sala 03",
                tipo: "consulta",
                equipamentos: ["Estetoscópio", "Otoscópio", "Computador"],
                status: "ocupada",
                proximaLimpeza: "2024-12-15 19:00"
            },
            {
                id: 4,
                nome: "Sala de Exames",
                tipo: "exame",
                equipamentos: ["Raio-X", "Ultrassom", "Eletrocardiograma"],
                status: "manutencao",
                proximaLimpeza: "2024-12-16 08:00"
            }
        ],
        
        equipamentos: [
            {
                id: 1,
                nome: "Raio-X Digital",
                tipo: "imagem",
                status: "disponivel",
                proximaManutencao: "2025-01-15"
            },
            {
                id: 2,
                nome: "Ultrassom",
                tipo: "imagem",
                status: "ocupado",
                proximaManutencao: "2025-02-10"
            },
            {
                id: 3,
                nome: "Eletrocardiograma",
                tipo: "cardiaco",
                status: "disponivel",
                proximaManutencao: "2025-01-30"
            },
            {
                id: 4,
                nome: "Aparelho de Pressão",
                tipo: "geral",
                status: "disponivel",
                proximaManutencao: "2025-03-15"
            }
        ]
    },
    
    // Exames
    exames: [
        {
            id: 1,
            codigo: "EX001",
            paciente: "Maria Silva",
            pacienteId: 101,
            tipo: "sangue",
            data: "2024-12-18",
            horario: "08:00",
            medico: "Dr. Roberto Alves",
            medicoId: 201,
            local: "Laboratório",
            equipamento: null,
            status: "pendente",
            observacoes: "Jejum de 12 horas"
        },
        {
            id: 2,
            codigo: "EX002",
            paciente: "João Santos",
            pacienteId: 102,
            tipo: "imagem",
            data: "2024-12-20",
            horario: "10:30",
            medico: "Dra. Mariana Santos",
            medicoId: 202,
            local: "Sala de Raio-X",
            equipamento: "Raio-X Digital",
            status: "agendado",
            observacoes: "Raio-X de tórax"
        },
        {
            id: 3,
            codigo: "EX003",
            paciente: "Ana Oliveira",
            pacienteId: 103,
            tipo: "eletrocardiograma",
            data: "2024-12-22",
            horario: "14:00",
            medico: "Dr. Paulo Ribeiro",
            medicoId: 203,
            local: "Sala de Exames",
            equipamento: "Eletrocardiograma",
            status: "realizado",
            observacoes: "Exame realizado, aguardando laudo"
        }
    ],
    
    // Fluxo de Atendimento
    fluxo: {
        recepcao: [
            { id: 1, paciente: "Fernanda Costa", horarioEntrada: "08:45", motivo: "Consulta" },
            { id: 2, paciente: "Ricardo Lima", horarioEntrada: "10:15", motivo: "Retorno" }
        ],
        consultorio: [
            { id: 3, paciente: "Juliana Martins", medico: "Dr. Paulo Ribeiro", horarioEntrada: "11:00" }
        ],
        exames: [
            { id: 4, paciente: "Carlos Mendes", exame: "Raio-X", horarioEntrada: "09:30" }
        ],
        concluido: [
            { id: 5, paciente: "Pedro Henrique", horarioSaida: "10:45", status: "Concluído" }
        ]
    },
    
    // Fila e Encaixes
    fila: {
        espera: [
            { id: 1, paciente: "Ana Silva", prioridade: "normal", tempoEspera: "15 min" },
            { id: 2, paciente: "João Costa", prioridade: "alta", tempoEspera: "5 min" }
        ],
        encaixes: [
            { id: 3, horario: "14:30", medico: "Dr. Roberto Alves", duracao: "30 min" },
            { id: 4, horario: "16:15", medico: "Dra. Carla Mendes", duracao: "45 min" }
        ],
        cancelamentos: [
            { id: 5, paciente: "Pedro Henrique", horario: "16:30", motivo: "Problemas de saúde" }
        ]
    },
    
    // Comunicação
    mensagens: [
        {
            id: 1,
            titulo: "Confirmação de horário",
            conteudo: "Paciente Maria Silva confirmou consulta para amanhã às 14:30",
            destinatario: "medicos",
            prioridade: "normal",
            data: "2024-12-15 09:00",
            lida: false
        },
        {
            id: 2,
            titulo: "Equipamento em manutenção",
            conteudo: "Raio-X Digital estará em manutenção até amanhã",
            destinatario: "todos-equipes",
            prioridade: "alta",
            data: "2024-12-15 08:30",
            lida: true
        },
        {
            id: 3,
            titulo: "Urgente: Médico indisponível",
            conteudo: "Dr. Paulo Ribeiro está indisponível hoje à tarde",
            destinatario: "recepcionistas",
            prioridade: "urgente",
            data: "2024-12-15 07:45",
            lida: false
        }
    ]
};

// Variáveis globais
let abaAtual = 'dashboard';
let solicitacaoSelecionada = null;
let consultaSelecionada = null;
let pacienteSelecionado = null;
let medicoSelecionado = null;
let exameSelecionado = null;
let acaoConfirmacao = null;
let dadosConfirmacao = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    inicializarSistema();
    carregarDashboard();
});

// Função principal de inicialização
function inicializarSistema() {
    atualizarDataAtual();
    configurarEventListeners();
    atualizarContadores();
    carregarDadosSelects();
}

// Atualizar data atual
function atualizarDataAtual() {
    const data = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    document.getElementById('dataAtual').textContent = data.toLocaleDateString('pt-BR', options);
}

// Configurar event listeners
function configurarEventListeners() {
    // Busca de pacientes
    document.getElementById('buscaPaciente').addEventListener('input', function() {
        filtrarPacientes();
    });
    
    // Busca de médicos
    document.getElementById('buscaMedico').addEventListener('input', function() {
        filtrarMedicos();
    });
}

// Atualizar contadores
function atualizarContadores() {
    document.getElementById('contadorConsultasHoje').textContent = dadosExemplo.estatisticas.consultasHoje;
    document.getElementById('contadorSolicitacoes').textContent = dadosExemplo.estatisticas.solicitacoes;
    document.getElementById('contadorExames').textContent = dadosExemplo.estatisticas.exames;
    document.getElementById('contadorAguardando').textContent = dadosExemplo.estatisticas.aguardando;
    
    // Atualizar contadores do dashboard
    document.querySelectorAll('.numero-dashboard')[0].textContent = dadosExemplo.estatisticas.medicosAtivos;
    document.querySelectorAll('.numero-dashboard')[1].textContent = `${dadosExemplo.estatisticas.salasOcupadas}/${dadosExemplo.estatisticas.salasTotal}`;
    document.querySelectorAll('.numero-dashboard')[2].textContent = dadosExemplo.estatisticas.aguardando;
    document.querySelectorAll('.numero-dashboard')[3].textContent = dadosExemplo.estatisticas.cancelamentosHoje;
}

// Carregar dados nos selects
function carregarDadosSelects() {
    // Carregar pacientes
    const selectPacientes = document.querySelectorAll('#pacienteAgendamento, #pacienteExame');
    selectPacientes.forEach(select => {
        select.innerHTML = '<option value="">Selecione um paciente</option>';
        dadosExemplo.pacientes.forEach(paciente => {
            const option = document.createElement('option');
            option.value = paciente.id;
            option.textContent = `${paciente.nome} (${paciente.cpf})`;
            select.appendChild(option);
        });
    });
    
    // Carregar médicos
    const selectMedicos = document.querySelectorAll('#medicoAgendamento, #medicoExame, #filtroMedico');
    selectMedicos.forEach(select => {
        select.innerHTML = '<option value="todos">Todos os médicos</option>';
        dadosExemplo.medicos.forEach(medico => {
            const option = document.createElement('option');
            option.value = medico.id;
            option.textContent = medico.nome;
            select.appendChild(option);
        });
    });
    
    // Carregar salas
    const selectSalas = document.getElementById('salaAgendamento');
    selectSalas.innerHTML = '<option value="">Selecione uma sala</option>';
    dadosExemplo.recursos.salas.forEach(sala => {
        const option = document.createElement('option');
        option.value = sala.id;
        option.textContent = `${sala.nome} (${sala.status === 'disponivel' ? 'Disponível' : 'Ocupada'})`;
        select.appendChild(option);
    });
    
    // Carregar especialidades
    const selectEspecialidades = document.getElementById('filtroEspecialidade');
    const especialidades = [...new Set(dadosExemplo.medicos.map(m => m.especialidade))];
    especialidades.forEach(especialidade => {
        const option = document.createElement('option');
        option.value = especialidade.toLowerCase();
        option.textContent = especialidade;
        selectEspecialidades.appendChild(option);
    });
}

// Funções de navegação
function mudarAba(abaId) {
    // Remover classe ativa de todos os botões
    document.querySelectorAll('.botao-nav').forEach(botao => {
        botao.classList.remove('ativo');
    });
    
    // Remover classe ativa de todas as abas
    document.querySelectorAll('.aba-conteudo').forEach(aba => {
        aba.classList.remove('ativo');
    });
    
    // Adicionar classe ativa ao botão clicado
    document.querySelectorAll('.botao-nav').forEach(botao => {
        if (botao.textContent.includes(getTituloAba(abaId))) {
            botao.classList.add('ativo');
        }
    });
    
    // Mostrar a aba selecionada
    const abaSelecionada = document.getElementById(`aba-${abaId}`);
    if (abaSelecionada) {
        abaSelecionada.classList.add('ativo');
        abaAtual = abaId;
        
        // Carrega os dados da aba
        switch(abaId) {
            case 'dashboard':
                carregarDashboard();
                break;
            case 'agenda':
                carregarAgenda();
                break;
            case 'solicitacoes':
                carregarSolicitacoes();
                break;
            case 'pacientes':
                carregarPacientes();
                break;
            case 'medicos':
                carregarMedicos();
                break;
            case 'recursos':
                carregarRecursos();
                break;
            case 'exames':
                carregarExames();
                break;
            case 'fluxo':
                carregarFluxo();
                break;
            case 'comunicacao':
                carregarComunicacao();
                break;
        }
    }
}

function getTituloAba(abaId) {
    const titulos = {
        'dashboard': 'Dashboard',
        'agenda': 'Agenda Central',
        'solicitacoes': 'Solicitações',
        'pacientes': 'Pacientes',
        'medicos': 'Médicos',
        'recursos': 'Recursos',
        'exames': 'Exames',
        'fluxo': 'Fluxo',
        'comunicacao': 'Comunicação'
    };
    return titulos[abaId] || abaId;
}

// Funções para carregar dados específicos de cada aba
function carregarDashboard() {
    carregarPróximasConsultas();
    carregarAlertas();
}

function carregarPróximasConsultas() {
    const container = document.getElementById('listaConsultasRapida');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Filtrar consultas das próximas 2 horas
    const agora = new Date();
    const duasHorasDepois = new Date(agora.getTime() + 2 * 60 * 60 * 1000);
    
    const consultasProximas = dadosExemplo.consultas.filter(consulta => {
        const dataConsulta = new Date(`${consulta.data}T${consulta.horario}`);
        return dataConsulta > agora && dataConsulta <= duasHorasDepois && consulta.status !== 'cancelada';
    });
    
    if (consultasProximas.length === 0) {
        container.innerHTML = '<div class="sem-registros">Nenhuma consulta nas próximas 2 horas</div>';
        return;
    }
    
    consultasProximas.forEach(consulta => {
        const item = document.createElement('div');
        item.className = 'item-consulta-rapida';
        item.innerHTML = `
            <div class="info-consulta-rapida">
                <strong>${consulta.paciente}</strong>
                <small>${consulta.medico} - ${consulta.sala}</small>
                <span class="horario-consulta-rapida">${consulta.horario}</span>
            </div>
            <button class="botao-item" onclick="verDetalhesConsulta(${consulta.id})">
                <i class="fas fa-eye"></i>
            </button>
        `;
        container.appendChild(item);
    });
}

function carregarAlertas() {
    const container = document.getElementById('listaAlertas');
    if (!container) return;
    
    container.innerHTML = '';
    
    const alertas = [
        { tipo: 'alerta', mensagem: '2 consultas sem confirmação', acao: 'confirmar' },
        { tipo: 'alerta', mensagem: 'Sala 04 em manutenção', acao: 'ver' },
        { tipo: 'info', mensagem: '5 pacientes aguardando na recepção', acao: 'atender' },
        { tipo: 'urgente', mensagem: 'Exame pendente de laudo', acao: 'priorizar' }
    ];
    
    alertas.forEach(alerta => {
        const item = document.createElement('div');
        item.className = `item-alerta ${alerta.tipo}`;
        item.innerHTML = `
            <div class="conteudo-alerta">
                <i class="fas fa-exclamation-circle"></i>
                <span>${alerta.mensagem}</span>
            </div>
            <button class="botao-item pequeno" onclick="resolverAlerta('${alerta.acao}')">
                ${alerta.acao === 'confirmar' ? 'Confirmar' : 
                  alerta.acao === 'ver' ? 'Ver' : 
                  alerta.acao === 'atender' ? 'Atender' : 'Priorizar'}
            </button>
        `;
        container.appendChild(item);
    });
}

function carregarAgenda() {
    atualizarAgenda();
    carregarRecursosDisponiveis();
}

function atualizarAgenda() {
    const container = document.getElementById('gradeAgenda');
    if (!container) return;
    
    const filtroMedico = document.getElementById('filtroMedico').value;
    const filtroSala = document.getElementById('filtroSala').value;
    const filtroTipo = document.getElementById('filtroTipo').value;
    
    let consultasFiltradas = dadosExemplo.consultas;
    
    // Aplicar filtros
    if (filtroMedico !== 'todos') {
        consultasFiltradas = consultasFiltradas.filter(c => c.medicoId == filtroMedico);
    }
    
    if (filtroTipo !== 'todos') {
        consultasFiltradas = consultasFiltradas.filter(c => c.tipo === filtroTipo);
    }
    
    container.innerHTML = '';
    
    if (consultasFiltradas.length === 0) {
        container.innerHTML = '<div class="sem-registros">Nenhuma consulta encontrada</div>';
        return;
    }
    
    consultasFiltradas.forEach(consulta => {
        const item = document.createElement('div');
        item.className = 'item-agenda';
        item.innerHTML = `
            <div class="cabecalho-agenda">
                <span class="horario-agenda">${consulta.horario}</span>
                <span class="status-agenda ${consulta.status}">${consulta.status}</span>
            </div>
            <div class="info-agenda">
                <p><strong>Paciente:</strong> ${consulta.paciente}</p>
                <p><strong>Médico:</strong> ${consulta.medico}</p>
                <p><strong>Sala:</strong> ${consulta.sala}</p>
                <p><strong>Tipo:</strong> ${consulta.tipo === 'presencial' ? 'Presencial' : 'Remota'}</p>
            </div>
            <div class="acoes-agenda">
                <button class="botao-item" onclick="editarConsulta(${consulta.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="botao-item perigo" onclick="cancelarConsulta(${consulta.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

function carregarRecursosDisponiveis() {
    const container = document.getElementById('gradeRecursos');
    if (!container) return;
    
    container.innerHTML = '';
    
    dadosExemplo.recursos.salas.forEach(sala => {
        const item = document.createElement('div');
        item.className = `recurso-item ${sala.status}`;
        item.innerHTML = `
            <div class="icone-recurso">
                <i class="fas fa-door-open"></i>
            </div>
            <div class="info-recurso">
                <h4>${sala.nome}</h4>
                <p>${sala.tipo === 'consulta' ? 'Sala de Consulta' : 'Sala de Exames'}</p>
                <p class="status-recurso">${sala.status === 'disponivel' ? 'Disponível' : 
                                           sala.status === 'ocupada' ? 'Ocupada' : 'Manutenção'}</p>
            </div>
        `;
        container.appendChild(item);
    });
}

function carregarSolicitacoes() {
    filtrarSolicitacoes();
}

function filtrarSolicitacoes() {
    const container = document.getElementById('listaSolicitacoes');
    if (!container) return;
    
    const filtroTipo = document.getElementById('filtroTipoSolicitacao').value;
    const filtroUrgencia = document.getElementById('filtroUrgencia').value;
    const filtroStatus = document.getElementById('filtroStatusSolicitacao').value;
    
    let solicitacoesFiltradas = dadosExemplo.solicitacoes;
    
    // Aplicar filtros
    if (filtroTipo !== 'todos') {
        solicitacoesFiltradas = solicitacoesFiltradas.filter(s => s.tipo === filtroTipo);
    }
    
    if (filtroUrgencia !== 'todos') {
        solicitacoesFiltradas = solicitacoesFiltradas.filter(s => s.urgencia === filtroUrgencia);
    }
    
    if (filtroStatus !== 'todos') {
        solicitacoesFiltradas = solicitacoesFiltradas.filter(s => s.status === filtroStatus);
    }
    
    // Atualizar contador
    document.getElementById('totalSolicitacoes').textContent = `${solicitacoesFiltradas.length} solicitações`;
    
    container.innerHTML = '';
    
    if (solicitacoesFiltradas.length === 0) {
        container.innerHTML = '<div class="sem-registros">Nenhuma solicitação encontrada</div>';
        return;
    }
    
    solicitacoesFiltradas.forEach(solicitacao => {
        const item = document.createElement('div');
        item.className = `solicitacao-item ${solicitacao.tipo}`;
        item.onclick = () => mostrarDetalhesSolicitacao(solicitacao.id);
        
        let tipoTexto = '';
        let icone = '';
        switch(solicitacao.tipo) {
            case 'nova-consulta':
                tipoTexto = 'Nova Consulta';
                icone = 'fa-calendar-plus';
                break;
            case 'remarcacao':
                tipoTexto = 'Remarcação';
                icone = 'fa-calendar-alt';
                break;
            case 'cancelamento':
                tipoTexto = 'Cancelamento';
                icone = 'fa-calendar-times';
                break;
            case 'exame':
                tipoTexto = 'Exame';
                icone = 'fa-file-medical';
                break;
            default:
                tipoTexto = 'Dúvida';
                icone = 'fa-question-circle';
        }
        
        item.innerHTML = `
            <div class="cabecalho-solicitacao">
                <div class="titulo-solicitacao">
                    <i class="fas ${icone}"></i>
                    ${tipoTexto}
                </div>
                <span class="data-solicitacao">${formatarDataHora(solicitacao.dataSolicitacao)}</span>
            </div>
            <div class="detalhes-solicitacao">
                <p><strong>Paciente:</strong> ${solicitacao.paciente}</p>
                ${solicitacao.data ? `<p><strong>Data desejada:</strong> ${formatarData(solicitacao.data)} às ${solicitacao.horario}</p>` : ''}
                ${solicitacao.consultaOriginal ? `<p><strong>Consulta original:</strong> ${formatarDataHora(solicitacao.consultaOriginal)}</p>` : ''}
                <p><strong>Motivo:</strong> ${solicitacao.motivo}</p>
                <p><strong>Urgência:</strong> <span class="urgencia-solicitacao ${solicitacao.urgencia}">${solicitacao.urgencia}</span></p>
            </div>
        `;
        container.appendChild(item);
    });
}

function carregarPacientes() {
    filtrarPacientes();
}

function filtrarPacientes() {
    const container = document.getElementById('corpoTabelaPacientes');
    if (!container) return;
    
    const busca = document.getElementById('buscaPaciente').value.toLowerCase();
    const filtroPlano = document.getElementById('filtroPlano').value;
    const filtroStatus = document.getElementById('filtroStatusPaciente').value;
    
    let pacientesFiltrados = dadosExemplo.pacientes;
    
    // Aplicar filtros
    if (busca) {
        pacientesFiltrados = pacientesFiltrados.filter(p => 
            p.nome.toLowerCase().includes(busca) || 
            p.cpf.includes(busca) ||
            p.prontuario.toLowerCase().includes(busca)
        );
    }
    
    if (filtroPlano !== 'todos') {
        pacientesFiltrados = pacientesFiltrados.filter(p => 
            p.planoSaude.toLowerCase().includes(filtroPlano.toLowerCase())
        );
    }
    
    if (filtroStatus !== 'todos') {
        pacientesFiltrados = pacientesFiltrados.filter(p => p.status === filtroStatus);
    }
    
    container.innerHTML = '';
    
    if (pacientesFiltrados.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="7" class="texto-centralizado">
                    <div class="sem-registros">
                        <i class="fas fa-user-injured"></i>
                        <h3>Nenhum paciente encontrado</h3>
                        <p>Tente ajustar os termos da busca.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    pacientesFiltrados.forEach(paciente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${paciente.prontuario}</td>
            <td><strong>${paciente.nome}</strong></td>
            <td>${paciente.cpf}</td>
            <td>${paciente.planoSaude || 'Particular'}</td>
            <td>${paciente.ultimaConsulta ? formatarData(paciente.ultimaConsulta) : 'Nunca'}</td>
            <td>${paciente.proximaConsulta ? formatarData(paciente.proximaConsulta) : 'Não agendada'}</td>
            <td>
                <button class="botao-tabela primario" onclick="editarPaciente(${paciente.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="botao-tabela" onclick="verHistoricoPaciente(${paciente.id})">
                    <i class="fas fa-history"></i>
                </button>
                <button class="botao-tabela perigo" onclick="excluirPaciente(${paciente.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        container.appendChild(row);
    });
}

function carregarMedicos() {
    filtrarMedicos();
    carregarHorariosDisponibilidade();
}


function filtrarMedicos() {
    const container = document.getElementById('gradeMedicos');
    if (!container) return;
    
    const busca = document.getElementById('buscaMedico')?.value.toLowerCase() || '';
    const filtroEspecialidade = document.getElementById('filtroEspecialidade')?.value || 'todos';
    const filtroDisponibilidade = document.getElementById('filtroDisponibilidade')?.value || 'todos';
    
    let medicosFiltrados = dadosExemplo.medicos.filter(m => m.ativo);
    
    // Aplicar filtros
    if (busca) {
        medicosFiltrados = medicosFiltrados.filter(m => 
            m.nome.toLowerCase().includes(busca) || 
            m.especialidade.toLowerCase().includes(busca) ||
            m.crm.toLowerCase().includes(busca)
        );
    }
    
    if (filtroEspecialidade !== 'todos') {
        medicosFiltrados = medicosFiltrados.filter(m => 
            m.especialidade.toLowerCase().includes(filtroEspecialidade)
        );
    }
    
    if (filtroDisponibilidade !== 'todos') {
        medicosFiltrados = medicosFiltrados.filter(m => 
            filtroDisponibilidade === 'disponivel' ? m.disponibilidade === 'disponivel' :
            filtroDisponibilidade === 'indisponivel' ? m.disponibilidade === 'indisponivel' : true
        );
    }
    
    container.innerHTML = '';
    
    if (medicosFiltrados.length === 0) {
        container.innerHTML = `
            <div class="sem-registros">
                <i class="fas fa-user-md"></i>
                <h3>Nenhum médico encontrado</h3>
                <p>Tente ajustar os termos da busca.</p>
            </div>
        `;
        return;
    }
    
    medicosFiltrados.forEach(medico => {
        const item = document.createElement('div');
        item.className = 'medico-item';
        
        // Gerar iniciais para o avatar
        const iniciais = medico.nome.match(/\b(\w)/g)?.join('').substring(0, 2) || 'MD';
        
        item.innerHTML = `
            <div class="avatar-medico">${iniciais}</div>
            <div class="nome-medico">${medico.nome}</div>
            <div class="especialidade-medico">${medico.especialidade}</div>
            <div class="info-medico">
                <i class="fas fa-id-card"></i> ${medico.crm}
            </div>
            <div class="info-medico">
                <i class="fas fa-phone"></i> ${medico.telefone}
            </div>
            <div class="info-medico">
                <i class="fas fa-envelope"></i> ${medico.email}
            </div>
            <div class="status-medico ${medico.disponibilidade}">
                ${medico.disponibilidade === 'disponivel' ? 'Disponível' : 'Indisponível'}
            </div>
            <div style="margin-top: 15px;">
                <button class="botao-item" onclick="editarMedico(${medico.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="botao-item ${medico.disponibilidade === 'disponivel' ? 'perigo' : 'primario'}" 
                        onclick="${medico.disponibilidade === 'disponivel' ? `desativarMedico(${medico.id})` : `ativarMedico(${medico.id})`}">
                    <i class="fas ${medico.disponibilidade === 'disponivel' ? 'fa-user-slash' : 'fa-user-check'}"></i>
                    ${medico.disponibilidade === 'disponivel' ? 'Desativar' : 'Ativar'}
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

function carregarHorariosDisponibilidade() {
    const container = document.getElementById('gradeHorarios');
    if (!container) return;
    
    // Gerar horários de exemplo
    const horarios = [
        { periodo: 'Manhã', disponivel: 6, total: 8 },
        { periodo: 'Tarde', disponivel: 4, total: 8 },
        { periodo: 'Noite', disponivel: 2, total: 4 }
    ];
    
    container.innerHTML = '';
    
    horarios.forEach(horario => {
        const item = document.createElement('div');
        item.className = 'item-horario';
        
        const porcentagem = (horario.disponivel / horario.total) * 100;
        
        item.innerHTML = `
            <div class="info-horario">
                <h4>${horario.periodo}</h4>
                <p>${horario.disponivel}/${horario.total} horários disponíveis</p>
            </div>
            <div class="barra-disponibilidade">
                <div class="progresso-disponibilidade" style="width: ${porcentagem}%"></div>
            </div>
        `;
        container.appendChild(item);
    });
}

function carregarRecursos() {
    carregarSalas();
    carregarEquipamentos();
    carregarStatusRecursos();
}

function carregarSalas() {
    const container = document.getElementById('gradeSalas');
    if (!container) return;
    
    container.innerHTML = '';
    
    dadosExemplo.recursos.salas.forEach(sala => {
        const item = document.createElement('div');
        item.className = `recurso-item ${sala.status}`;
        item.innerHTML = `
            <div class="icone-recurso">
                <i class="fas fa-door-open"></i>
            </div>
            <div class="info-recurso">
                <h4>${sala.nome}</h4>
                <p>${sala.tipo === 'consulta' ? 'Sala de Consulta' : 'Sala de Exames'}</p>
                <p class="status-recurso">${sala.status === 'disponivel' ? 'Disponível' : 
                                           sala.status === 'ocupada' ? 'Ocupada' : 'Em Manutenção'}</p>
                <p><small>Equipamentos: ${sala.equipamentos.join(', ')}</small></p>
            </div>
            <div class="acoes-recurso">
                <button class="botao-item" onclick="editarSala(${sala.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="botao-item ${sala.status === 'disponivel' ? 'perigo' : 'primario'}" 
                        onclick="${sala.status === 'disponivel' ? `ocuparSala(${sala.id})` : `liberarSala(${sala.id})`}">
                    <i class="fas ${sala.status === 'disponivel' ? 'fa-lock' : 'fa-unlock'}"></i>
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

function carregarEquipamentos() {
    const container = document.getElementById('gradeEquipamentos');
    if (!container) return;
    
    container.innerHTML = '';
    
    dadosExemplo.recursos.equipamentos.forEach(equipamento => {
        const item = document.createElement('div');
        item.className = `recurso-item ${equipamento.status}`;
        item.innerHTML = `
            <div class="icone-recurso">
                <i class="fas fa-x-ray"></i>
            </div>
            <div class="info-recurso">
                <h4>${equipamento.nome}</h4>
                <p>${equipamento.tipo === 'imagem' ? 'Equipamento de Imagem' : 
                     equipamento.tipo === 'cardiaco' ? 'Cardiológico' : 'Geral'}</p>
                <p class="status-recurso">${equipamento.status === 'disponivel' ? 'Disponível' : 'Ocupado'}</p>
                <p><small>Próxima manutenção: ${formatarData(equipamento.proximaManutencao)}</small></p>
            </div>
        `;
        container.appendChild(item);
    });
}

function carregarStatusRecursos() {
    const container = document.getElementById('gradeStatusRecursos');
    if (!container) return;
    
    // Calcular estatísticas
    const totalSalas = dadosExemplo.recursos.salas.length;
    const salasDisponiveis = dadosExemplo.recursos.salas.filter(s => s.status === 'disponivel').length;
    const salasOcupadas = dadosExemplo.recursos.salas.filter(s => s.status === 'ocupada').length;
    const salasManutencao = dadosExemplo.recursos.salas.filter(s => s.status === 'manutencao').length;
    
    const totalEquipamentos = dadosExemplo.recursos.equipamentos.length;
    const equipamentosDisponiveis = dadosExemplo.recursos.equipamentos.filter(e => e.status === 'disponivel').length;
    
    container.innerHTML = `
        <div class="status-item">
            <h4>Salas</h4>
            <div class="status-detalhes">
                <span class="status-disponivel">${salasDisponiveis} Disponível</span>
                <span class="status-ocupado">${salasOcupadas} Ocupada</span>
                <span class="status-manutencao">${salasManutencao} Manutenção</span>
            </div>
        </div>
        <div class="status-item">
            <h4>Equipamentos</h4>
            <div class="status-detalhes">
                <span class="status-disponivel">${equipamentosDisponiveis} Disponível</span>
                <span class="status-ocupado">${totalEquipamentos - equipamentosDisponiveis} Ocupado</span>
            </div>
        </div>
    `;
}

function carregarExames() {
    filtrarExames();
    carregarResultadosPendentes();
}

function filtrarExames() {
    const container = document.getElementById('corpoTabelaExames');
    if (!container) return;
    
    const filtroTipo = document.getElementById('filtroTipoExame')?.value || 'todos';
    const filtroStatus = document.getElementById('filtroStatusExame')?.value || 'todos';
    const filtroData = document.getElementById('filtroDataExame')?.value || 'todos';
    
    let examesFiltrados = dadosExemplo.exames;
    
    // Aplicar filtros
    if (filtroTipo !== 'todos') {
        examesFiltrados = examesFiltrados.filter(e => e.tipo === filtroTipo);
    }
    
    if (filtroStatus !== 'todos') {
        examesFiltrados = examesFiltrados.filter(e => e.status === filtroStatus);
    }
    
    if (filtroData !== 'todos') {
        const hoje = new Date();
        let dataFiltro;
        
        switch(filtroData) {
            case 'hoje':
                dataFiltro = hoje.toISOString().split('T')[0];
                examesFiltrados = examesFiltrados.filter(e => e.data === dataFiltro);
                break;
            case 'amanha':
                const amanha = new Date(hoje);
                amanha.setDate(amanha.getDate() + 1);
                dataFiltro = amanha.toISOString().split('T')[0];
                examesFiltrados = examesFiltrados.filter(e => e.data === dataFiltro);
                break;
            case 'semana':
                const semanaFim = new Date(hoje);
                semanaFim.setDate(semanaFim.getDate() + 7);
                examesFiltrados = examesFiltrados.filter(e => {
                    const dataExame = new Date(e.data);
                    return dataExame >= hoje && dataExame <= semanaFim;
                });
                break;
        }
    }
    
    container.innerHTML = '';
    
    if (examesFiltrados.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="8" class="texto-centralizado">
                    <div class="sem-registros">
                        <i class="fas fa-file-medical"></i>
                        <h3>Nenhum exame encontrado</h3>
                        <p>Tente ajustar os filtros.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    examesFiltrados.forEach(exame => {
        const row = document.createElement('tr');
        
        let tipoExameTexto = '';
        switch(exame.tipo) {
            case 'sangue': tipoExameTexto = 'Exame de Sangue'; break;
            case 'imagem': tipoExameTexto = 'Exame de Imagem'; break;
            case 'urina': tipoExameTexto = 'Exame de Urina'; break;
            case 'eletrocardiograma': tipoExameTexto = 'Eletrocardiograma'; break;
            default: tipoExameTexto = exame.tipo;
        }
        
        let statusTexto = '';
        let statusClasse = '';
        switch(exame.status) {
            case 'pendente': 
                statusTexto = 'Pendente'; 
                statusClasse = 'pendente';
                break;
            case 'agendado': 
                statusTexto = 'Agendado'; 
                statusClasse = 'agendado';
                break;
            case 'realizado': 
                statusTexto = 'Realizado'; 
                statusClasse = 'realizado';
                break;
            case 'cancelado': 
                statusTexto = 'Cancelado'; 
                statusClasse = 'cancelado';
                break;
        }
        
        row.innerHTML = `
            <td>${exame.codigo}</td>
            <td><strong>${exame.paciente}</strong></td>
            <td>${tipoExameTexto}</td>
            <td>${formatarData(exame.data)} às ${exame.horario}</td>
            <td>${exame.medico}</td>
            <td>${exame.local}${exame.equipamento ? ` (${exame.equipamento})` : ''}</td>
            <td><span class="status-exame ${statusClasse}">${statusTexto}</span></td>
            <td>
                <button class="botao-tabela" onclick="editarExame(${exame.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="botao-tabela primario" onclick="alterarStatusExame(${exame.id})">
                    <i class="fas fa-sync-alt"></i>
                </button>
                <button class="botao-tabela perigo" onclick="cancelarExame(${exame.id})">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        `;
        container.appendChild(row);
    });
}

function carregarResultadosPendentes() {
    const container = document.getElementById('listaResultados');
    if (!container) return;
    
    // Filtrar exames com laudo pendente
    const examesPendentes = dadosExemplo.exames.filter(e => 
        e.status === 'realizado' || e.status === 'pendente'
    );
    
    container.innerHTML = '';
    
    if (examesPendentes.length === 0) {
        container.innerHTML = '<div class="sem-registros">Nenhum resultado pendente</div>';
        return;
    }
    
    examesPendentes.forEach(exame => {
        const item = document.createElement('div');
        item.className = 'item-resultado';
        item.innerHTML = `
            <div class="info-resultado">
                <strong>${exame.paciente}</strong>
                <small>${exame.tipo} - ${formatarData(exame.data)}</small>
            </div>
            <div class="status-resultado">
                ${exame.status === 'realizado' ? 'Aguardando laudo' : 'Aguardando realização'}
            </div>
            <button class="botao-item" onclick="registrarResultado(${exame.id})">
                <i class="fas fa-check"></i> Registrar
            </button>
        `;
        container.appendChild(item);
    });
}

function carregarFluxo() {
    carregarFluxoAtendimento();
    carregarFilaEspera();
}

function carregarFluxoAtendimento() {
    // Carregar recepção
    const recepcaoContainer = document.getElementById('listaRecepcao');
    if (recepcaoContainer) {
        recepcaoContainer.innerHTML = '';
        dadosExemplo.fluxo.recepcao.forEach(paciente => {
            const item = document.createElement('div');
            item.className = 'item-etapa';
            item.innerHTML = `
                <strong>${paciente.paciente}</strong>
                <small>${paciente.motivo} - Entrada: ${paciente.horarioEntrada}</small>
                <button class="botao-item pequeno" onclick="encaminharParaConsulta(${paciente.id})">
                    Encaminhar
                </button>
            `;
            recepcaoContainer.appendChild(item);
        });
    }
    
    // Carregar consultório
    const consultorioContainer = document.getElementById('listaConsultorio');
    if (consultorioContainer) {
        consultorioContainer.innerHTML = '';
        dadosExemplo.fluxo.consultorio.forEach(paciente => {
            const item = document.createElement('div');
            item.className = 'item-etapa';
            item.innerHTML = `
                <strong>${paciente.paciente}</strong>
                <small>${paciente.medico} - Desde: ${paciente.horarioEntrada}</small>
                <button class="botao-item pequeno" onclick="finalizarConsulta(${paciente.id})">
                    Finalizar
                </button>
            `;
            consultorioContainer.appendChild(item);
        });
    }
    
    // Carregar exames
    const examesContainer = document.getElementById('listaExamesFluxo');
    if (examesContainer) {
        examesContainer.innerHTML = '';
        dadosExemplo.fluxo.exames.forEach(paciente => {
            const item = document.createElement('div');
            item.className = 'item-etapa';
            item.innerHTML = `
                <strong>${paciente.paciente}</strong>
                <small>${paciente.exame} - Desde: ${paciente.horarioEntrada}</small>
                <button class="botao-item pequeno" onclick="finalizarExame(${paciente.id})">
                    Concluir
                </button>
            `;
            examesContainer.appendChild(item);
        });
    }
    
    // Carregar concluído
    const concluidoContainer = document.getElementById('listaConcluido');
    if (concluidoContainer) {
        concluidoContainer.innerHTML = '';
        dadosExemplo.fluxo.concluido.forEach(paciente => {
            const item = document.createElement('div');
            item.className = 'item-etapa';
            item.innerHTML = `
                <strong>${paciente.paciente}</strong>
                <small>Saída: ${paciente.horarioSaida} - ${paciente.status}</small>
            `;
            concluidoContainer.appendChild(item);
        });
    }
}

function carregarFilaEspera() {
    // Fila de espera
    const filaEsperaContainer = document.getElementById('listaFilaEspera');
    if (filaEsperaContainer) {
        filaEsperaContainer.innerHTML = '';
        dadosExemplo.fila.espera.forEach(paciente => {
            const item = document.createElement('div');
            item.className = 'item-fila-espera';
            item.innerHTML = `
                <strong>${paciente.paciente}</strong>
                <small>${paciente.prioridade === 'alta' ? '🟥 Alta prioridade' : '🟨 Normal'}</small>
                <span class="tempo-espera">${paciente.tempoEspera}</span>
            `;
            filaEsperaContainer.appendChild(item);
        });
    }
    
    // Encaixes possíveis
    const encaixesContainer = document.getElementById('listaEncaixes');
    if (encaixesContainer) {
        encaixesContainer.innerHTML = '';
        dadosExemplo.fila.encaixes.forEach(encaixe => {
            const item = document.createElement('div');
            item.className = 'item-encaixe';
            item.innerHTML = `
                <strong>${encaixe.horario}</strong>
                <small>${encaixe.medico} - ${encaixe.duracao}</small>
                <button class="botao-item pequeno" onclick="usarEncaixe(${encaixe.id})">
                    Usar
                </button>
            `;
            encaixesContainer.appendChild(item);
        });
    }
    
    // Cancelamentos recentes
    const cancelamentosContainer = document.getElementById('listaCancelamentos');
    if (cancelamentosContainer) {
        cancelamentosContainer.innerHTML = '';
        dadosExemplo.fila.cancelamentos.forEach(cancelamento => {
            const item = document.createElement('div');
            item.className = 'item-cancelamento';
            item.innerHTML = `
                <strong>${cancelamento.paciente}</strong>
                <small>${cancelamento.horario} - ${cancelamento.motivo}</small>
                <button class="botao-item pequeno" onclick="reagendarCancelado(${cancelamento.id})">
                    Reagendar
                </button>
            `;
            cancelamentosContainer.appendChild(item);
        });
    }
}

function carregarComunicacao() {
    filtrarMensagens();
}

function filtrarMensagens() {
    const container = document.getElementById('listaMensagens');
    if (!container) return;
    
    const filtroDestinatario = document.getElementById('filtroDestinatario')?.value || 'todos';
    const filtroPrioridade = document.getElementById('filtroPrioridade')?.value || 'todos';
    
    let mensagensFiltradas = dadosExemplo.mensagens;
    
    // Aplicar filtros
    if (filtroDestinatario !== 'todos') {
        mensagensFiltradas = mensagensFiltradas.filter(m => m.destinatario === filtroDestinatario);
    }
    
    if (filtroPrioridade !== 'todos') {
        mensagensFiltradas = mensagensFiltradas.filter(m => m.prioridade === filtroPrioridade);
    }
    
    container.innerHTML = '';
    
    if (mensagensFiltradas.length === 0) {
        container.innerHTML = '<div class="sem-registros">Nenhuma mensagem encontrada</div>';
        return;
    }
    
    mensagensFiltradas.forEach(mensagem => {
        const item = document.createElement('div');
        item.className = `mensagem-item ${mensagem.prioridade} ${mensagem.lida ? '' : 'nao-lida'}`;
        item.innerHTML = `
            <div class="cabecalho-mensagem">
                <div class="titulo-mensagem">
                    ${mensagem.lida ? '' : '<span class="nao-lida-indicador">●</span>'}
                    ${mensagem.titulo}
                </div>
                <span class="data-mensagem">${formatarDataHora(mensagem.data)}</span>
            </div>
            <div class="conteudo-mensagem">
                ${mensagem.conteudo}
            </div>
            <div class="destinatario-mensagem">
                Para: ${mensagem.destinatario.replace('-', ' ')}
            </div>
            <div class="acoes-mensagem">
                <button class="botao-item" onclick="marcarComoLida(${mensagem.id})">
                    <i class="fas fa-check"></i> Lida
                </button>
                <button class="botao-item" onclick="responderMensagem(${mensagem.id})">
                    <i class="fas fa-reply"></i> Responder
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

// Funções auxiliares de formatação
function formatarData(dataString) {
    if (!dataString) return 'Data não informada';
    
    const data = new Date(dataString + 'T00:00:00');
    return data.toLocaleDateString('pt-BR');
}

function formatarDataHora(dataHoraString) {
    if (!dataHoraString) return 'Data não informada';
    
    const partes = dataHoraString.split(' ');
    if (partes.length === 2) {
        const data = new Date(partes[0] + 'T' + partes[1]);
        return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } else {
        const data = new Date(dataHoraString + 'T00:00:00');
        return data.toLocaleDateString('pt-BR');
    }
}

// Funções de ação para os botões
function mostrarModalSair() {
    document.getElementById('modalSair').style.display = 'flex';
}

function fecharModalSair() {
    document.getElementById('modalSair').style.display = 'none';
}

function confirmarSaida() {
    alert('Saindo do sistema...');
    // Em uma implementação real, redirecionaria para a página de login
    // window.location.href = 'login.html';
}

function mostrarModalConfirmacao(titulo, mensagem, acao, dados) {
    document.getElementById('tituloConfirmacao').textContent = titulo;
    document.getElementById('mensagemConfirmacao').textContent = mensagem;
    acaoConfirmacao = acao;
    dadosConfirmacao = dados;
    document.getElementById('modalConfirmacao').style.display = 'flex';
}

function fecharModalConfirmacao() {
    document.getElementById('modalConfirmacao').style.display = 'none';
    acaoConfirmacao = null;
    dadosConfirmacao = null;
}

function executarAcaoConfirmada() {
    if (acaoConfirmacao && typeof window[acaoConfirmacao] === 'function') {
        window[acaoConfirmacao](dadosConfirmacao);
    }
    fecharModalConfirmacao();
}

// Funções específicas para ações
function editarPaciente(id) {
    const paciente = dadosExemplo.pacientes.find(p => p.id === id);
    if (!paciente) return;
    
    alert(`Editar paciente: ${paciente.nome}\nFuncionalidade em desenvolvimento`);
}

function verHistoricoPaciente(id) {
    const paciente = dadosExemplo.pacientes.find(p => p.id === id);
    if (!paciente) return;
    
    mostrarModalConfirmacao(
        'Histórico do Paciente',
        `Histórico completo de ${paciente.nome}\n\nProntuário: ${paciente.prontuario}\nÚltima consulta: ${paciente.ultimaConsulta ? formatarData(paciente.ultimaConsulta) : 'Nunca'}\nPróxima consulta: ${paciente.proximaConsulta ? formatarData(paciente.proximaConsulta) : 'Não agendada'}`,
        null,
        null
    );
}

function excluirPaciente(id) {
    mostrarModalConfirmacao(
        'Excluir Paciente',
        'Tem certeza que deseja excluir este paciente? Esta ação não pode ser desfeita.',
        'confirmarExclusaoPaciente',
        id
    );
}

function confirmarExclusaoPaciente(id) {
    const index = dadosExemplo.pacientes.findIndex(p => p.id === id);
    if (index !== -1) {
        dadosExemplo.pacientes.splice(index, 1);
        alert('Paciente excluído com sucesso!');
        carregarPacientes();
    }
}

function editarMedico(id) {
    const medico = dadosExemplo.medicos.find(m => m.id === id);
    if (!medico) return;
    
    alert(`Editar médico: ${medico.nome}\nFuncionalidade em desenvolvimento`);
}

function desativarMedico(id) {
    mostrarModalConfirmacao(
        'Desativar Médico',
        'Tem certeza que deseja desativar este médico? Ele não poderá mais receber novas consultas.',
        'confirmarDesativacaoMedico',
        id
    );
}

function confirmarDesativacaoMedico(id) {
    const medico = dadosExemplo.medicos.find(m => m.id === id);
    if (medico) {
        medico.disponibilidade = 'indisponivel';
        alert('Médico desativado com sucesso!');
        carregarMedicos();
    }
}

function ativarMedico(id) {
    const medico = dadosExemplo.medicos.find(m => m.id === id);
    if (medico) {
        medico.disponibilidade = 'disponivel';
        alert('Médico ativado com sucesso!');
        carregarMedicos();
    }
}

function mostrarModalAgendamentoRapido() {
    document.getElementById('modalNovoAgendamento').style.display = 'flex';
    
    // Definir data mínima como hoje
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('dataAgendamento').min = hoje;
}

function fecharModalNovoAgendamento() {
    document.getElementById('modalNovoAgendamento').style.display = 'none';
}

function cancelarConsulta(id) {
    mostrarModalConfirmacao(
        'Cancelar Consulta',
        'Tem certeza que deseja cancelar esta consulta? O paciente será notificado.',
        'confirmarCancelamentoConsulta',
        id
    );
}

function confirmarCancelamentoConsulta(id) {
    const consulta = dadosExemplo.consultas.find(c => c.id === id);
    if (consulta) {
        consulta.status = 'cancelada';
        alert('Consulta cancelada com sucesso!');
        atualizarAgenda();
        atualizarContadores();
    }
}

function editarExame(id) {
    const exame = dadosExemplo.exames.find(e => e.id === id);
    if (!exame) return;
    
    alert(`Editar exame: ${exame.codigo}\nFuncionalidade em desenvolvimento`);
}

function alterarStatusExame(id) {
    const exame = dadosExemplo.exames.find(e => e.id === id);
    if (!exame) return;
    
    const novosStatus = {
        'pendente': 'agendado',
        'agendado': 'realizado',
        'realizado': 'pendente',
        'cancelado': 'pendente'
    };
    
    exame.status = novosStatus[exame.status] || 'pendente';
    
    alert(`Status do exame alterado para: ${exame.status}`);
    carregarExames();
}

function cancelarExame(id) {
    const exame = dadosExemplo.exames.find(e => e.id === id);
    if (!exame) return;
    
    if (exame.status === 'cancelado') {
        alert('Este exame já está cancelado');
        return;
    }
    
    mostrarModalConfirmacao(
        'Cancelar Exame',
        `Tem certeza que deseja cancelar o exame ${exame.codigo} de ${exame.paciente}?`,
        'confirmarCancelamentoExame',
        id
    );
}

function confirmarCancelamentoExame(id) {
    const exame = dadosExemplo.exames.find(e => e.id === id);
    if (exame) {
        exame.status = 'cancelado';
        alert('Exame cancelado com sucesso');
        carregarExames();
    }
}

function mostrarModalNovoPaciente() {
    alert('Funcionalidade de cadastro de paciente em desenvolvimento');
}

function mostrarModalNovoMedico() {
    alert('Funcionalidade de cadastro de médico em desenvolvimento');
}

function mostrarModalNovoExame() {
    alert('Funcionalidade de solicitação de exame em desenvolvimento');
}

function mostrarModalNovaMensagem() {
    alert('Funcionalidade de nova mensagem em desenvolvimento');
}

// Funções para o fluxo de atendimento
function encaminharParaConsulta(id) {
    alert(`Paciente ${id} encaminhado para consulta`);
    // Implementar lógica real aqui
}

function finalizarConsulta(id) {
    alert(`Consulta ${id} finalizada`);
    // Implementar lógica real aqui
}

function finalizarExame(id) {
    alert(`Exame ${id} finalizado`);
    // Implementar lógica real aqui
}

function usarEncaixe(id) {
    alert(`Usando encaixe ${id}`);
    // Implementar lógica real aqui
}

function reagendarCancelado(id) {
    alert(`Reagendando cancelamento ${id}`);
    // Implementar lógica real aqui
}

function marcarComoLida(id) {
    const mensagem = dadosExemplo.mensagens.find(m => m.id === id);
    if (mensagem) {
        mensagem.lida = true;
        carregarComunicacao();
    }
}

function responderMensagem(id) {
    alert(`Respondendo mensagem ${id}`);
    // Implementar lógica real aqui
}

// Função para resolver alertas
function resolverAlerta(acao) {
    switch(acao) {
        case 'confirmar':
            alert('Consultas confirmadas');
            break;
        case 'ver':
            alert('Abrindo detalhes da manutenção');
            break;
        case 'atender':
            alert('Iniciando atendimento');
            break;
        case 'priorizar':
            alert('Laudo priorizado');
            break;
    }
}

// Exportação de dados
function exportarDadosPacientes() {
    const pacientesCSV = dadosExemplo.pacientes.map(p => 
        `${p.prontuario},${p.nome},${p.cpf},${p.planoSaude},${p.ultimaConsulta || ''},${p.proximaConsulta || ''}`
    ).join('\n');
    
    const cabecalho = 'Prontuário,Nome,CPF,Plano de Saúde,Última Consulta,Próxima Consulta\n';
    const csv = cabecalho + pacientesCSV;
    
    // Criar blob para download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pacientes_vidaplus.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Dados dos pacientes exportados com sucesso!');
}

// Inicializar data atual
function atualizarDataAtual() {
    const data = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    document.getElementById('dataAtual').textContent = data.toLocaleDateString('pt-BR', options);
}

// Atualizar periodicamente o dashboard
setInterval(() => {
    if (abaAtual === 'dashboard') {
        carregarPróximasConsultas();
    }
    if (abaAtual === 'fluxo') {
        carregarFluxoAtendimento();
    }
}, 30000); // Atualiza a cada 30 segundos