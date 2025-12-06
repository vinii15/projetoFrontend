// Dados das consultas do paciente (simulados)
const consultasPaciente = [
    {
        id: 1,
        medico: "Dra. Maria Silva",
        especialidade: "Cardiologia",
        data: "2024-04-15",
        horario: "14:30",
        tipo: "presencial",
        local: "Clínica Central",
        endereco: "Rua Principal, 123 - Centro, São Paulo/SP",
        status: "realizada",
        diagnostico: "Hipertensão arterial controlada",
        sintomas: "Paciente relata cefaleia ocasional e tontura leve",
        medicamentos: [
            {
                nome: "Losartana",
                dosagem: "50mg",
                posologia: "1 comprimido ao dia"
            },
            {
                nome: "Hidroclorotiazida",
                dosagem: "25mg",
                posologia: "1 comprimido ao dia"
            }
        ],
        exames: "Hemograma completo, Colesterol total e frações, Eletrocardiograma",
        observacoes: "Paciente está respondendo bem ao tratamento. Pressão arterial em 120x80 mmHg. Orientado sobre dieta hipossódica e prática regular de exercícios físicos.",
        proximosPassos: "Retorno em 30 dias para reavaliação. Realizar exames solicitados antes da próxima consulta."
    },
    {
        id: 2,
        medico: "Dr. João Santos",
        especialidade: "Ortopedia",
        data: "2024-04-10",
        horario: "10:00",
        tipo: "presencial",
        local: "Clínica Ortopédica",
        endereco: "Av. das Flores, 456 - Jardim, São Paulo/SP",
        status: "realizada",
        diagnostico: "Avaliação pós-fratura de rádio",
        sintomas: "Dor residual no punho direito, limitação de movimento",
        medicamentos: [
            {
                nome: "Dipirona",
                dosagem: "500mg",
                posologia: "1 comprimido de 6/6 horas se necessário"
            }
        ],
        exames: "Raio-X do punho direito - consolidação óssea adequada",
        observacoes: "Fratura consolidada adequadamente. Paciente em fase final de recuperação. Orientado sobre exercícios de fisioterapia.",
        proximosPassos: "Continuar exercícios de reabilitação. Retorno em 60 dias para alta."
    },
    {
        id: 3,
        medico: "Dra. Ana Oliveira",
        especialidade: "Clínico Geral",
        data: "2024-04-05",
        horario: "16:00",
        tipo: "teleconsulta",
        local: "Online",
        endereco: "Plataforma Vidaplus",
        status: "realizada",
        diagnostico: "Resfriado comum",
        sintomas: "Coriza, espirros, dor de garganta leve",
        medicamentos: [
            {
                nome: "Paracetamol",
                dosagem: "750mg",
                posologia: "1 comprimido de 6/6 horas se necessário"
            }
        ],
        exames: "Não solicitados",
        observacoes: "Quadro viral simples. Orientado sobre repouso, hidratação e cuidados gerais.",
        proximosPassos: "Retorno se sintomas persistirem por mais de 7 dias."
    },
    {
        id: 4,
        medico: "Dr. Pedro Costa",
        especialidade: "Dermatologia",
        data: "2024-04-22",
        horario: "09:00",
        tipo: "presencial",
        local: "Clínica Dermatológica",
        endereco: "Rua das Palmeiras, 789 - Centro, São Paulo/SP",
        status: "agendada",
        diagnostico: "Consulta de rotina - check-up dermatológico",
        sintomas: "",
        medicamentos: [],
        exames: "",
        observacoes: "Consulta agendada para avaliação de rotina da pele.",
        proximosPassos: "Comparecer 15 minutos antes do horário agendado."
    },
    {
        id: 5,
        medico: "Dra. Carla Fernandes",
        especialidade: "Oftalmologia",
        data: "2024-03-20",
        horario: "11:30",
        tipo: "presencial",
        local: "Clínica Oftalmológica",
        endereco: "Av. Paulista, 1000 - São Paulo/SP",
        status: "realizada",
        diagnostico: "Presbiopia (vista cansada)",
        sintomas: "Dificuldade para leitura de perto, cansaço visual",
        medicamentos: [],
        exames: "Teste de acuidade visual, Refração",
        observacoes: "Prescrição de óculos para leitura. Grau: OD +1.50, OE +1.50",
        proximosPassos: "Uso de óculos para atividades de perto. Retorno anual."
    },
    {
        id: 6,
        medico: "Dr. Roberto Almeida",
        especialidade: "Gastroenterologia",
        data: "2024-03-10",
        horario: "14:00",
        tipo: "presencial",
        local: "Clínica Gastro Saúde",
        endereco: "Rua Augusta, 500 - São Paulo/SP",
        status: "cancelada",
        diagnostico: "Consulta cancelada pelo paciente",
        sintomas: "",
        medicamentos: [],
        exames: "",
        observacoes: "Consulta cancelada com 24h de antecedência. Paciente realocará horário.",
        proximosPassos: "Entrar em contato para reagendamento."
    }
];

// Variáveis globais
let consultasFiltradas = [];
let consultaSelecionada = null;

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Histórico de Consultas - Inicializando...');
    
    // Configurar eventos
    configurarEventos();
    
    // Carregar consultas
    carregarConsultas();
    
    console.log('Página inicializada com sucesso!');
});

// Configurar eventos
function configurarEventos() {
    // Evento do campo de busca
    const inputBusca = document.getElementById('buscar-input');
    if (inputBusca) {
        inputBusca.addEventListener('input', filtrarConsultas);
        inputBusca.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filtrarConsultas();
            }
        });
    }
    
    // Evento do botão de busca
    const btnBusca = document.querySelector('.btn-busca');
    if (btnBusca) {
        btnBusca.addEventListener('click', filtrarConsultas);
    }
    
    // Eventos dos filtros
    const filtros = ['filtro-periodo', 'filtro-status', 'filtro-tipo'];
    filtros.forEach(filtroId => {
        const elemento = document.getElementById(filtroId);
        if (elemento) {
            elemento.addEventListener('change', filtrarConsultas);
        }
    });
    
    // Fechar modais ao clicar fora
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                if (modal.id === 'modal-detalhes') {
                    fecharModal();
                } else if (modal.id === 'modal-exportacao') {
                    fecharExportModal();
                }
            }
        });
    });
    
    // Fechar modais com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            fecharModal();
            fecharExportModal();
        }
    });
}

// Carregar consultas
function carregarConsultas() {
    consultasFiltradas = [...consultasPaciente];
    renderizarConsultas();
    atualizarEstatisticas();
    atualizarContador();
}

// Renderizar consultas
function renderizarConsultas() {
    const container = document.getElementById('lista-consultas');
    const estadoVazio = document.getElementById('estado-vazio');
    
    if (!container) return;
    
    // Ordenar consultas por data (mais recente primeiro)
    consultasFiltradas.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    if (consultasFiltradas.length === 0) {
        container.innerHTML = '';
        if (estadoVazio) estadoVazio.style.display = 'block';
        return;
    }
    
    if (estadoVazio) estadoVazio.style.display = 'none';
    
    // Gerar HTML das consultas
    const consultasHTML = consultasFiltradas.map(consulta => {
        const statusClass = `status-${consulta.status}`;
        const statusText = consulta.status === 'realizada' ? 'Realizada' :
                          consulta.status === 'agendada' ? 'Agendada' : 'Cancelada';
        
        const tipoIcon = consulta.tipo === 'presencial' ? 'fas fa-user-md' : 'fas fa-video';
        const tipoText = consulta.tipo === 'presencial' ? 'Presencial' : 'Teleconsulta';
        
        return `
            <div class="cartao-consulta" data-consulta-id="${consulta.id}">
                <div class="cabecalho-consulta">
                    <div class="info-consulta">
                        <h4>
                            <span class="medico-consulta">${consulta.medico}</span>
                        </h4>
                        <div class="especialidade-consulta">${consulta.especialidade}</div>
                        <div class="meta-consulta">
                            <div class="item-meta">
                                <i class="fas fa-calendar"></i>
                                <span>${formatarData(consulta.data)} - ${consulta.horario}</span>
                            </div>
                            <div class="item-meta">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${consulta.local}</span>
                            </div>
                            <div class="item-meta">
                                <i class="${tipoIcon}"></i>
                                <span>${tipoText}</span>
                            </div>
                        </div>
                    </div>
                    <div class="status-consulta">
                        <span class="selo-status ${statusClass}">
                            ${statusText}
                        </span>
                        <div class="data-consulta">
                            ${formatarDataCompleta(consulta.data)}
                        </div>
                    </div>
                </div>
                
                ${consulta.status === 'realizada' ? `
                    <div class="detalhes-consulta">
                        ${consulta.diagnostico ? `
                            <div class="secao-detalhe">
                                <h5><i class="fas fa-stethoscope"></i> Diagnóstico</h5>
                                <div class="conteudo-detalhe">
                                    <p>${consulta.diagnostico}</p>
                                </div>
                            </div>
                        ` : ''}
                        
                        ${consulta.sintomas ? `
                            <div class="secao-detalhe">
                                <h5><i class="fas fa-thermometer-half"></i> Sintomas Relatados</h5>
                                <div class="conteudo-detalhe">
                                    <p>${consulta.sintomas}</p>
                                </div>
                            </div>
                        ` : ''}
                        
                        ${consulta.medicamentos.length > 0 ? `
                            <div class="secao-detalhe">
                                <h5><i class="fas fa-pills"></i> Medicamentos Prescritos</h5>
                                <div class="conteudo-detalhe">
                                    <ul class="lista-medicamentos">
                                        ${consulta.medicamentos.map(med => `
                                            <li>
                                                <div class="info-medicamento">
                                                    <div class="nome-medicamento">${med.nome}</div>
                                                    <div class="dosagem-medicamento">${med.dosagem}</div>
                                                </div>
                                                <div class="posologia-medicamento">${med.posologia}</div>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        ` : ''}
                        
                        ${consulta.exames ? `
                            <div class="secao-detalhe">
                                <h5><i class="fas fa-microscope"></i> Exames</h5>
                                <div class="conteudo-detalhe">
                                    <p>${consulta.exames}</p>
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="secao-detalhe">
                            <h5><i class="fas fa-clipboard-check"></i> Observações</h5>
                            <div class="conteudo-detalhe">
                                <p>${consulta.observacoes}</p>
                            </div>
                        </div>
                        
                        ${consulta.proximosPassos ? `
                            <div class="secao-detalhe">
                                <h5><i class="fas fa-forward"></i> Próximos Passos</h5>
                                <div class="conteudo-detalhe">
                                    <p>${consulta.proximosPassos}</p>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="acoes-consulta">
                        <button class="btn-outline" onclick="verDetalhesCompletos(${consulta.id})">
                            <i class="fas fa-search"></i> Ver Detalhes
                        </button>
                        ${consulta.medicamentos.length > 0 ? `
                            <button class="btn-outline" onclick="imprimirReceita(${consulta.id})">
                                <i class="fas fa-prescription"></i> Receita
                            </button>
                        ` : ''}
                        ${consulta.tipo === 'presencial' ? `
                            <button class="btn-outline" onclick="verLocalizacao('${consulta.endereco}')">
                                <i class="fas fa-map-marked-alt"></i> Localização
                            </button>
                        ` : ''}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
    
    container.innerHTML = consultasHTML;
}

// Atualizar estatísticas
function atualizarEstatisticas() {
    const totalConsultas = consultasPaciente.filter(c => c.status === 'realizada').length;
    
    const consultasEsteMes = consultasPaciente.filter(c => {
        const dataConsulta = new Date(c.data);
        const dataAtual = new Date();
        return dataConsulta.getMonth() === dataAtual.getMonth() && 
               dataConsulta.getFullYear() === dataAtual.getFullYear() && 
               c.status === 'realizada';
    }).length;
    
    const proximasConsultas = consultasPaciente.filter(c => c.status === 'agendada').length;
    
    // Atualizar elementos
    const totalElement = document.getElementById('total-consultas');
    const mesElement = document.getElementById('consultas-mes');
    const proximaElement = document.getElementById('proxima-consulta');
    
    if (totalElement) totalElement.textContent = totalConsultas;
    if (mesElement) mesElement.textContent = consultasEsteMes;
    if (proximaElement) proximaElement.textContent = proximasConsultas;
}

// Atualizar contador
function atualizarContador() {
    const contadorElement = document.getElementById('contador-consultas');
    if (contadorElement) {
        const total = consultasFiltradas.length;
        contadorElement.textContent = `${total} consulta${total !== 1 ? 's' : ''}`;
    }
}

// Filtrar consultas
function filtrarConsultas() {
    const termoBusca = document.getElementById('buscar-input').value.toLowerCase();
    const periodoFiltro = document.getElementById('filtro-periodo').value;
    const statusFiltro = document.getElementById('filtro-status').value;
    const tipoFiltro = document.getElementById('filtro-tipo').value;
    
    consultasFiltradas = consultasPaciente.filter(consulta => {
        // Filtro por busca
        const matchBusca = !termoBusca || 
            consulta.medico.toLowerCase().includes(termoBusca) ||
            consulta.especialidade.toLowerCase().includes(termoBusca) ||
            consulta.diagnostico.toLowerCase().includes(termoBusca) ||
            consulta.local.toLowerCase().includes(termoBusca);
        
        // Filtro por período
        let matchPeriodo = true;
        if (periodoFiltro !== 'todos') {
            const dias = parseInt(periodoFiltro);
            const dataLimite = new Date();
            dataLimite.setDate(dataLimite.getDate() - dias);
            const dataConsulta = new Date(consulta.data);
            matchPeriodo = dataConsulta >= dataLimite;
        }
        
        // Filtro por status
        const matchStatus = statusFiltro === 'todas' || consulta.status === statusFiltro;
        
        // Filtro por tipo
        const matchTipo = tipoFiltro === 'todos' || consulta.tipo === tipoFiltro;
        
        return matchBusca && matchPeriodo && matchStatus && matchTipo;
    });
    
    renderizarConsultas();
    atualizarContador();
}

// Limpar filtros
function limparFiltros() {
    document.getElementById('buscar-input').value = '';
    document.getElementById('filtro-periodo').value = 'todos';
    document.getElementById('filtro-status').value = 'todas';
    document.getElementById('filtro-tipo').value = 'todos';
    
    carregarConsultas();
}

// Ver detalhes completos
function verDetalhesCompletos(id) {
    const consulta = consultasPaciente.find(c => c.id === id);
    if (!consulta) return;
    
    consultaSelecionada = consulta;
    
    const modal = document.getElementById('modal-detalhes');
    const detalhes = document.getElementById('detalhes-consulta');
    
    if (!modal || !detalhes) return;
    
    const statusText = consulta.status === 'realizada' ? 'Realizada' :
                      consulta.status === 'agendada' ? 'Agendada' : 'Cancelada';
    
    const tipoText = consulta.tipo === 'presencial' ? 'Consulta Presencial' : 'Teleconsulta';
    
    detalhes.innerHTML = `
        <div class="secao-detalhe">
            <h5><i class="fas fa-info-circle"></i> Informações da Consulta</h5>
            <div class="conteudo-detalhe">
                <p><strong>Médico:</strong> ${consulta.medico}</p>
                <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
                <p><strong>Data e Horário:</strong> ${formatarData(consulta.data)} - ${consulta.horario}</p>
                <p><strong>Local:</strong> ${consulta.local}</p>
                <p><strong>Endereço:</strong> ${consulta.endereco}</p>
                <p><strong>Tipo:</strong> ${tipoText}</p>
                <p><strong>Status:</strong> ${statusText}</p>
            </div>
        </div>
        
        ${consulta.diagnostico ? `
            <div class="secao-detalhe">
                <h5><i class="fas fa-stethoscope"></i> Diagnóstico</h5>
                <div class="conteudo-detalhe">
                    <p>${consulta.diagnostico}</p>
                </div>
            </div>
        ` : ''}
        
        ${consulta.sintomas ? `
            <div class="secao-detalhe">
                <h5><i class="fas fa-thermometer-half"></i> Sintomas Relatados</h5>
                <div class="conteudo-detalhe">
                    <p>${consulta.sintomas}</p>
                </div>
            </div>
        ` : ''}
        
        ${consulta.medicamentos.length > 0 ? `
            <div class="secao-detalhe">
                <h5><i class="fas fa-pills"></i> Medicamentos Prescritos</h5>
                <div class="conteudo-detalhe">
                    <ul class="lista-medicamentos">
                        ${consulta.medicamentos.map(med => `
                            <li>
                                <div class="info-medicamento">
                                    <div class="nome-medicamento">${med.nome}</div>
                                    <div class="dosagem-medicamento">${med.dosagem}</div>
                                </div>
                                <div class="posologia-medicamento">${med.posologia}</div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        ` : ''}
        
        ${consulta.exames ? `
            <div class="secao-detalhe">
                <h5><i class="fas fa-microscope"></i> Exames</h5>
                <div class="conteudo-detalhe">
                    <p>${consulta.exames}</p>
                </div>
            </div>
        ` : ''}
        
        <div class="secao-detalhe">
            <h5><i class="fas fa-clipboard-check"></i> Observações do Médico</h5>
            <div class="conteudo-detalhe">
                <p>${consulta.observacoes}</p>
            </div>
        </div>
        
        ${consulta.proximosPassos ? `
            <div class="secao-detalhe">
                <h5><i class="fas fa-forward"></i> Próximos Passos</h5>
                <div class="conteudo-detalhe">
                    <p>${consulta.proximosPassos}</p>
                </div>
            </div>
        ` : ''}
    `;
    
    modal.style.display = 'flex';
}

// Fechar modal
function fecharModal() {
    const modal = document.getElementById('modal-detalhes');
    if (modal) {
        modal.style.display = 'none';
        consultaSelecionada = null;
    }
}

// Exportar histórico
function exportarHistorico() {
    const modal = document.getElementById('modal-exportacao');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Fechar modal de exportação
function fecharExportModal() {
    const modal = document.getElementById('modal-exportacao');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Funções de exportação
function exportarPDF() {
    mostrarNotificacao('Gerando relatório em PDF...', 'info');
    // Simular geração de PDF
    setTimeout(() => {
        mostrarNotificacao('PDF gerado com sucesso!', 'success');
        fecharExportModal();
    }, 2000);
}

function exportarCSV() {
    mostrarNotificacao('Gerando planilha CSV...', 'info');
    // Simular geração de CSV
    setTimeout(() => {
        mostrarNotificacao('CSV gerado com sucesso!', 'success');
        fecharExportModal();
    }, 1500);
}

function exportarReceitas() {
    mostrarNotificacao('Gerando lista de receitas...', 'info');
    // Simular geração de receitas
    setTimeout(() => {
        mostrarNotificacao('Lista de receitas gerada com sucesso!', 'success');
        fecharExportModal();
    }, 1000);
}

// Funções de ação
function imprimirReceita(id) {
    const consulta = consultasPaciente.find(c => c.id === id);
    if (consulta && consulta.medicamentos.length > 0) {
        mostrarNotificacao('Imprimindo receita médica...', 'info');
        // Simular impressão
        setTimeout(() => {
            mostrarNotificacao('Receita impressa com sucesso!', 'success');
        }, 1000);
    } else {
        mostrarNotificacao('Não há receitas para esta consulta.', 'warning');
    }
}

function imprimirConsulta() {
    if (!consultaSelecionada) return;
    
    mostrarNotificacao('Imprimindo detalhes da consulta...', 'info');
    // Simular impressão
    setTimeout(() => {
        mostrarNotificacao('Consulta impressa com sucesso!', 'success');
        fecharModal();
    }, 1000);
}

function verLocalizacao(endereco) {
    mostrarNotificacao(`Abrindo localização...`, 'info');
    // Em uma aplicação real, abriria o Google Maps
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`, '_blank');
}

// Utilitários
function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
}

function formatarDataCompleta(dataString) {
    const data = new Date(dataString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return data.toLocaleDateString('pt-BR', options);
}

function mostrarNotificacao(mensagem, tipo = 'info') {
    const cores = {
        'info': '#3498db',
        'success': '#27ae60',
        'warning': '#f39c12',
        'error': '#e74c3c'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${cores[tipo] || '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        font-weight: 500;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = mensagem;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    // Adicionar animações CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Exportar funções para uso global
window.verDetalhesCompletos = verDetalhesCompletos;
window.fecharModal = fecharModal;
window.exportarHistorico = exportarHistorico;
window.fecharExportModal = fecharExportModal;
window.exportarPDF = exportarPDF;
window.exportarCSV = exportarCSV;
window.exportarReceitas = exportarReceitas;
window.imprimirReceita = imprimirReceita;
window.imprimirConsulta = imprimirConsulta;
window.verLocalizacao = verLocalizacao;
window.limparFiltros = limparFiltros;
window.filtrarConsultas = filtrarConsultas;