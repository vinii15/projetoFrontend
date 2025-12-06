// Dados dos pacientes (simulados)
const pacientes = [
    {
        id: 1,
        nome: "João Santos",
        cpf: "123.456.789-00",
        telefone: "(11) 99999-9999",
        nascimento: "15/03/1979",
        endereco: "Rua das Flores, 123 - São Paulo/SP",
        plano: "Amil Saúde • Nº: 123456"
    },
    {
        id: 2,
        nome: "Ana Costa",
        cpf: "987.654.321-00",
        telefone: "(11) 98888-8888",
        nascimento: "20/08/1991",
        endereco: "Av. Paulista, 1000 - São Paulo/SP",
        plano: "Bradesco Saúde • Nº: 654321"
    },
    {
        id: 3,
        nome: "Carlos Mendes",
        cpf: "456.789.123-00",
        telefone: "(11) 97777-7777",
        nascimento: "12/11/1965",
        endereco: "Rua Augusta, 500 - São Paulo/SP",
        plano: "SulAmérica • Nº: 789123"
    }
];

// Dados do encaminhamento atual
let encaminhamentoAtual = {
    paciente: null,
    especialidade: '',
    urgencia: 'rotina',
    motivo: '',
    diagnostico: '',
    exames: '',
    informacoesAdicionais: '',
    validade: '',
    prioridadeSUS: '',
    recomendacoes: '',
    dataEmissao: new Date()
};

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de encaminhamento médico carregada');
    inicializarPagina();
});

function inicializarPagina() {
    configurarDataValidade();
    configurarEventListeners();
    carregarRascunhoSalvo();
}

// Configurar data de validade mínima (hoje)
function configurarDataValidade() {
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('validity').min = hoje;
    
    // Definir validade padrão para 90 dias
    const dataPadrao = new Date();
    dataPadrao.setDate(dataPadrao.getDate() + 90);
    document.getElementById('validity').value = dataPadrao.toISOString().split('T')[0];
    encaminhamentoAtual.validade = dataPadrao.toISOString().split('T')[0];
}

// Configurar event listeners
function configurarEventListeners() {
    // Fechar modais clicando fora
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Tecla ESC para fechar modais
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            fecharTodosModais();
        }
    });

    // Enter para buscar pacientes
    document.getElementById('patient-search').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            buscarPacientes();
        }
    });

    // Mostrar campo de especialidade customizada
    document.getElementById('specialty').addEventListener('change', function() {
        const customGroup = document.getElementById('custom-specialty-group');
        if (this.value === 'outra') {
            customGroup.style.display = 'block';
        } else {
            customGroup.style.display = 'none';
            document.getElementById('custom-specialty').value = '';
        }
    });
}

// Buscar pacientes
function buscarPacientes() {
    const termo = document.getElementById('patient-search').value.toLowerCase();
    const resultadosContainer = document.getElementById('patient-results');
    
    if (termo.length < 2) {
        resultadosContainer.style.display = 'none';
        return;
    }

    const pacientesFiltrados = pacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(termo) ||
        paciente.cpf.includes(termo)
    );

    if (pacientesFiltrados.length === 0) {
        resultadosContainer.innerHTML = '<div class="patient-result-item">Nenhum paciente encontrado</div>';
    } else {
        resultadosContainer.innerHTML = pacientesFiltrados.map(paciente => `
            <div class="patient-result-item" onclick="selecionarPaciente(${paciente.id})">
                <strong>${paciente.nome}</strong><br>
                <small>CPF: ${paciente.cpf} • Tel: ${paciente.telefone}</small>
            </div>
        `).join('');
    }
    
    resultadosContainer.style.display = 'block';
}

// Selecionar paciente
function selecionarPaciente(pacienteId) {
    const paciente = pacientes.find(p => p.id === pacienteId);
    if (paciente) {
        encaminhamentoAtual.paciente = paciente;
        
        document.getElementById('patient-details').innerHTML = `
            <div class="patient-selected">
                <p><strong>${paciente.nome}</strong></p>
                <p>CPF: ${paciente.cpf}</p>
                <p>Telefone: ${paciente.telefone}</p>
                <p>Data de Nascimento: ${paciente.nascimento}</p>
                <p>Endereço: ${paciente.endereco}</p>
                <p>Plano de Saúde: ${paciente.plano}</p>
            </div>
        `;
        
        document.getElementById('patient-results').style.display = 'none';
        document.getElementById('patient-search').value = '';
    }
}

// Atualizar dados do encaminhamento
function atualizarEncaminhamento() {
    const especialidadeSelect = document.getElementById('specialty');
    const especialidadeCustom = document.getElementById('custom-specialty');
    
    encaminhamentoAtual.especialidade = especialidadeSelect.value === 'outra' 
        ? especialidadeCustom.value 
        : especialidadeSelect.value;
    
    encaminhamentoAtual.urgencia = document.getElementById('urgency').value;
    encaminhamentoAtual.motivo = document.getElementById('reason').value;
    encaminhamentoAtual.diagnostico = document.getElementById('diagnosis').value;
    encaminhamentoAtual.exames = document.getElementById('exams').value;
    encaminhamentoAtual.informacoesAdicionais = document.getElementById('additional-info').value;
    encaminhamentoAtual.validade = document.getElementById('validity').value;
    encaminhamentoAtual.prioridadeSUS = document.getElementById('priority').value;
    encaminhamentoAtual.recomendacoes = document.getElementById('recommendations').value;
}

// Salvar rascunho do encaminhamento
function salvarRascunho() {
    if (!validarEncaminhamento()) {
        return;
    }

    atualizarEncaminhamento();

    const rascunho = {
        ...encaminhamentoAtual,
        dataSalvamento: new Date().toISOString()
    };

    localStorage.setItem('encaminhamentoRascunho', JSON.stringify(rascunho));
    mostrarNotificacao('Rascunho salvo com sucesso!', 'success');
}

// Carregar rascunho salvo
function carregarRascunho() {
    const rascunhoSalvo = localStorage.getItem('encaminhamentoRascunho');
    
    if (!rascunhoSalvo) {
        mostrarNotificacao('Nenhum rascunho encontrado.', 'info');
        return;
    }

    const rascunho = JSON.parse(rascunhoSalvo);
    
    // Carregar paciente
    if (rascunho.paciente) {
        encaminhamentoAtual.paciente = rascunho.paciente;
        selecionarPaciente(rascunho.paciente.id);
    }
    
    // Carregar dados do formulário
    if (rascunho.especialidade) {
        const especialidades = Array.from(document.getElementById('specialty').options).map(opt => opt.value);
        if (especialidades.includes(rascunho.especialidade)) {
            document.getElementById('specialty').value = rascunho.especialidade;
        } else {
            document.getElementById('specialty').value = 'outra';
            document.getElementById('custom-specialty-group').style.display = 'block';
            document.getElementById('custom-specialty').value = rascunho.especialidade;
        }
    }
    
    document.getElementById('urgency').value = rascunho.urgencia || 'rotina';
    document.getElementById('reason').value = rascunho.motivo || '';
    document.getElementById('diagnosis').value = rascunho.diagnostico || '';
    document.getElementById('exams').value = rascunho.exames || '';
    document.getElementById('additional-info').value = rascunho.informacoesAdicionais || '';
    document.getElementById('validity').value = rascunho.validade || '';
    document.getElementById('priority').value = rascunho.prioridadeSUS || '';
    document.getElementById('recommendations').value = rascunho.recomendacoes || '';

    // Atualizar objeto atual
    encaminhamentoAtual = { ...encaminhamentoAtual, ...rascunho };

    mostrarNotificacao('Rascunho carregado com sucesso!', 'success');
}

// Emitir encaminhamento
function emitirEncaminhamento() {
    if (!validarEncaminhamento()) {
        return;
    }

    atualizarEncaminhamento();

    // Simular processamento
    mostrarNotificacao('Emitindo encaminhamento médico...', 'info');
    
    setTimeout(() => {
        // Gerar número do encaminhamento
        const numeroEncaminhamento = 'ENC' + Date.now();
        
        // Salvar encaminhamento emitido
        const encaminhamentoEmitido = {
            ...encaminhamentoAtual,
            numero: numeroEncaminhamento,
            dataEmissao: new Date().toISOString(),
            medico: {
                nome: "Dra. Maria Silva",
                crm: "12345/SP",
                especialidade: "Clínica Geral",
                telefone: "(11) 3456-7890",
                email: "maria.silva@vidaplus.com"
            }
        };

        // Salvar no histórico (simulado)
        salvarNoHistorico(encaminhamentoEmitido);
        
        // Limpar rascunho
        localStorage.removeItem('encaminhamentoRascunho');
        
        // Mostrar confirmação
        document.getElementById('modalMessage').textContent = 
            `Encaminhamento ${numeroEncaminhamento} emitido com sucesso para ${encaminhamentoAtual.paciente.nome}.`;
        document.getElementById('confirmModal').style.display = 'flex';
        
        mostrarNotificacao('Encaminhamento emitido com sucesso!', 'success');
    }, 2000);
}

// Validar encaminhamento antes de emitir
function validarEncaminhamento() {
    if (!encaminhamentoAtual.paciente) {
        mostrarNotificacao('Selecione um paciente antes de emitir o encaminhamento.', 'warning');
        document.getElementById('patient-search').focus();
        return false;
    }

    const especialidade = document.getElementById('specialty').value;
    if (!especialidade) {
        mostrarNotificacao('Selecione uma especialidade para o encaminhamento.', 'warning');
        return false;
    }

    if (especialidade === 'outra') {
        const especialidadeCustom = document.getElementById('custom-specialty').value.trim();
        if (!especialidadeCustom) {
            mostrarNotificacao('Informe o nome da especialidade.', 'warning');
            document.getElementById('custom-specialty').focus();
            return false;
        }
    }

    const motivo = document.getElementById('reason').value.trim();
    if (!motivo) {
        mostrarNotificacao('Descreva o motivo do encaminhamento.', 'warning');
        document.getElementById('reason').focus();
        return false;
    }

    return true;
}

// Salvar no histórico (simulado)
function salvarNoHistorico(encaminhamento) {
    const historico = JSON.parse(localStorage.getItem('historicoEncaminhamentos') || '[]');
    historico.push(encaminhamento);
    localStorage.setItem('historicoEncaminhamentos', JSON.stringify(historico));
}

// Imprimir encaminhamento
// ... código anterior mantido ...

// Imprimir encaminhamento
function imprimirEncaminhamento() {
    if (!validarEncaminhamento()) {
        return;
    }

    atualizarEncaminhamento();

    // Em uma aplicação real, geraria um PDF
    mostrarNotificacao('Gerando versão para impressão...', 'info');
    
    setTimeout(() => {
        const conteudoImpressao = gerarConteudoImpressao();
        const janelaImpressao = window.open('', '_blank');
        janelaImpressao.document.write(conteudoImpressao);
        janelaImpressao.document.close();
        janelaImpressao.print();
        
        mostrarNotificacao('Encaminhamento enviado para impressão.', 'success');
    }, 1000);
}

// Gerar conteúdo para impressão
function gerarConteudoImpressao() {
    const dataEmissao = new Date().toLocaleDateString('pt-BR');
    const dataValidade = encaminhamentoAtual.validade ? 
        new Date(encaminhamentoAtual.validade).toLocaleDateString('pt-BR') : 
        'Não especificada';
    
    const urgenciaText = {
        'rotina': 'Rotina',
        'prioritaria': 'Prioritária', 
        'urgente': 'Urgente'
    }[encaminhamentoAtual.urgencia] || 'Rotina';

    const especialidadeText = encaminhamentoAtual.especialidade === 'outra' ?
        document.getElementById('custom-specialty').value :
        document.getElementById('specialty').options[document.getElementById('specialty').selectedIndex].text;

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Encaminhamento Médico - ${encaminhamentoAtual.paciente.nome}</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 40px; 
                    line-height: 1.6;
                    color: #333;
                }
                .header { 
                    text-align: center; 
                    margin-bottom: 40px;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 20px;
                }
                .header h1 {
                    color: #2c3e50;
                    margin-bottom: 10px;
                }
                .patient-info, .referral-info, .doctor-info { 
                    margin-bottom: 30px;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                .patient-info h2, .referral-info h2, .doctor-info h2 {
                    color: #2c3e50;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                    margin-bottom: 15px;
                }
                .referral-details {
                    background: #f8fafc;
                    padding: 15px;
                    border-radius: 6px;
                    margin: 15px 0;
                }
                .signature { 
                    margin-top: 60px; 
                    text-align: center;
                    border-top: 1px solid #ccc;
                    padding-top: 20px;
                }
                .document-info {
                    background: #f0f7ff;
                    padding: 15px;
                    border-radius: 6px;
                    margin-bottom: 20px;
                    text-align: center;
                }
                .urgency-badge {
                    display: inline-block;
                    padding: 6px 12px;
                    border-radius: 15px;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-left: 10px;
                }
                .urgency-rotina { background: #e8f6f3; color: #27ae60; }
                .urgency-prioritaria { background: #fff3e0; color: #f39c12; }
                .urgency-urgente { background: #ffebee; color: #e74c3c; }
                .section-content {
                    margin: 15px 0;
                    line-height: 1.8;
                }
                @media print {
                    body { margin: 20px; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>ENCAMINHAMENTO MÉDICO</h1>
                <div class="document-info">
                    <strong>Número:</strong> ENC${Date.now()} | 
                    <strong>Data de Emissão:</strong> ${dataEmissao} | 
                    <strong>Validade:</strong> ${dataValidade}
                    <span class="urgency-badge urgency-${encaminhamentoAtual.urgencia}">
                        ${urgenciaText}
                    </span>
                </div>
            </div>

            <div class="patient-info">
                <h2>Dados do Paciente</h2>
                <div class="section-content">
                    <p><strong>Nome:</strong> ${encaminhamentoAtual.paciente.nome}</p>
                    <p><strong>CPF:</strong> ${encaminhamentoAtual.paciente.cpf}</p>
                    <p><strong>Data de Nascimento:</strong> ${encaminhamentoAtual.paciente.nascimento}</p>
                    <p><strong>Telefone:</strong> ${encaminhamentoAtual.paciente.telefone}</p>
                    <p><strong>Endereço:</strong> ${encaminhamentoAtual.paciente.endereco}</p>
                    <p><strong>Plano de Saúde:</strong> ${encaminhamentoAtual.paciente.plano}</p>
                </div>
            </div>

            <div class="referral-info">
                <h2>Dados do Encaminhamento</h2>
                <div class="section-content">
                    <div class="referral-details">
                        <p><strong>Especialidade Solicitada:</strong> ${especialidadeText}</p>
                        <p><strong>Grau de Urgência:</strong> ${urgenciaText}</p>
                        ${encaminhamentoAtual.prioridadeSUS ? `<p><strong>Prioridade SUS:</strong> ${encaminhamentoAtual.prioridadeSUS}</p>` : ''}
                    </div>

                    <p><strong>Motivo do Encaminhamento:</strong></p>
                    <p>${encaminhamentoAtual.motivo || 'Não informado'}</p>

                    ${encaminhamentoAtual.diagnostico ? `
                    <p><strong>Hipótese Diagnóstica:</strong></p>
                    <p>${encaminhamentoAtual.diagnostico}</p>
                    ` : ''}

                    ${encaminhamentoAtual.exames ? `
                    <p><strong>Exames Realizados e Resultados:</strong></p>
                    <p>${encaminhamentoAtual.exames}</p>
                    ` : ''}

                    ${encaminhamentoAtual.informacoesAdicionais ? `
                    <p><strong>Informações Adicionais:</strong></p>
                    <p>${encaminhamentoAtual.informacoesAdicionais}</p>
                    ` : ''}

                    ${encaminhamentoAtual.recomendacoes ? `
                    <p><strong>Recomendações ao Especialista:</strong></p>
                    <p>${encaminhamentoAtual.recomendacoes}</p>
                    ` : ''}
                </div>
            </div>

            <div class="doctor-info">
                <h2>Dados do Médico Solicitante</h2>
                <div class="section-content">
                    <p><strong>Nome:</strong> Dra. Maria Silva</p>
                    <p><strong>CRM:</strong> 12345/SP</p>
                    <p><strong>Especialidade:</strong> Clínica Geral</p>
                    <p><strong>Telefone:</strong> (11) 3456-7890</p>
                    <p><strong>E-mail:</strong> maria.silva@vidaplus.com</p>
                    <p><strong>Clínica:</strong> Vidaplus Clínica Médica</p>
                    <p><strong>Endereço:</strong> Rua das Flores, 123 - Centro, São Paulo/SP - CEP: 01234-567</p>
                    <p><strong>Telefone da Clínica:</strong> (11) 3333-3333</p>
                </div>
            </div>

            <div class="signature">
                <p>_________________________________________</p>
                <p><strong>Dra. Maria Silva</strong></p>
                <p>CRM 12345/SP</p>
                <p>Assinatura Digital</p>
            </div>

            <div class="no-print" style="margin-top: 40px; padding: 15px; background: #fff3e0; border-radius: 6px;">
                <p><strong>⚠️ ATENÇÃO:</strong> Este é um encaminhamento médico digital. Apresente este documento ao especialista na consulta agendada.</p>
            </div>

            <script>
                window.onload = function() {
                    window.print();
                }
            </script>
        </body>
        </html>
    `;
}

// Utilitários
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Em uma aplicação real, usaria uma biblioteca de notificações
    const cores = {
        'info': '#3498db',
        'success': '#27ae60',
        'warning': '#f39c12',
        'error': '#e74c3c'
    };
    
    // Criar notificação simples
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
    `;
    notification.textContent = mensagem;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Funções do modal
function fecharModal() {
    document.getElementById('confirmModal').style.display = 'none';
    // Limpar formulário após emissão
    encaminhamentoAtual = {
        paciente: null,
        especialidade: '',
        urgencia: 'rotina',
        motivo: '',
        diagnostico: '',
        exames: '',
        informacoesAdicionais: '',
        validade: '',
        prioridadeSUS: '',
        recomendacoes: '',
        dataEmissao: new Date()
    };
    
    document.getElementById('patient-details').innerHTML = '<p class="no-patient">Selecione um paciente para preencher automaticamente os dados</p>';
    document.getElementById('specialty').value = '';
    document.getElementById('custom-specialty-group').style.display = 'none';
    document.getElementById('urgency').value = 'rotina';
    document.getElementById('reason').value = '';
    document.getElementById('diagnosis').value = '';
    document.getElementById('exams').value = '';
    document.getElementById('additional-info').value = '';
    document.getElementById('recommendations').value = '';
    document.getElementById('priority').value = '';
    configurarDataValidade();
}

function fecharTodosModais() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Funções de logout
function mostrarModalSair() {
    document.getElementById('logoutModal').style.display = 'flex';
}

function fecharLogoutModal() {
    document.getElementById('logoutModal').style.display = 'none';
}

function confirmarSaida() {
    // Salvar rascunho antes de sair
    if (encaminhamentoAtual.paciente || document.getElementById('reason').value) {
        salvarRascunho();
    }
    
    window.location.href = 'index.html';
}

// Carregar rascunho salvo ao iniciar
function carregarRascunhoSalvo() {
    const rascunhoSalvo = localStorage.getItem('encaminhamentoRascunho');
    if (rascunhoSalvo) {
        console.log('Rascunho encontrado. Use o botão "Carregar Rascunho" para restaurar.');
    }
}

// Exportar funções para uso global
window.buscarPacientes = buscarPacientes;
window.selecionarPaciente = selecionarPaciente;
window.atualizarEncaminhamento = atualizarEncaminhamento;
window.salvarRascunho = salvarRascunho;
window.carregarRascunho = carregarRascunho;
window.emitirEncaminhamento = emitirEncaminhamento;
window.imprimirEncaminhamento = imprimirEncaminhamento;
window.fecharModal = fecharModal;
window.mostrarModalSair = mostrarModalSair;
window.fecharLogoutModal = fecharLogoutModal;
window.confirmarSaida = confirmarSaida;