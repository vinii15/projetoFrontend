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

// Dados da receita atual
let receitaAtual = {
    paciente: null,
    medicamentos: [],
    validade: '',
    observacoes: '',
    dataEmissao: new Date()
};

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de receita digital carregada');
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
    
    // Definir validade padrão para 30 dias
    const dataPadrao = new Date();
    dataPadrao.setDate(dataPadrao.getDate() + 30);
    document.getElementById('validity').value = dataPadrao.toISOString().split('T')[0];
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

    // Atualizar receita quando campos mudarem
    document.getElementById('validity').addEventListener('change', function() {
        receitaAtual.validade = this.value;
    });

    document.getElementById('observations').addEventListener('input', function() {
        receitaAtual.observacoes = this.value;
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
        receitaAtual.paciente = paciente;
        
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

// Adicionar medicamento à receita
function adicionarMedicamento() {
    const medicamento = document.getElementById('medication').value.trim();
    const dosagem = document.getElementById('dosage').value.trim();
    const frequencia = document.getElementById('frequency').value.trim();
    const administracao = document.getElementById('administration').value;
    const duracao = document.getElementById('duration').value.trim();
    const instrucoes = document.getElementById('instructions').value.trim();

    // Validação básica
    if (!medicamento || !dosagem || !frequencia || !administracao || !duracao) {
        mostrarNotificacao('Por favor, preencha todos os campos obrigatórios do medicamento.', 'warning');
        return;
    }

    const novoMedicamento = {
        id: Date.now(),
        nome: medicamento,
        dosagem: dosagem,
        frequencia: frequencia,
        administracao: administracao,
        duracao: duracao,
        instrucoes: instrucoes
    };

    receitaAtual.medicamentos.push(novoMedicamento);
    atualizarListaMedicamentos();
    limparFormularioMedicamento();
    
    mostrarNotificacao('Medicamento adicionado com sucesso!', 'success');
}

// Atualizar lista de medicamentos na interface
function atualizarListaMedicamentos() {
    const container = document.getElementById('medicamentos-list');
    
    if (receitaAtual.medicamentos.length === 0) {
        container.innerHTML = '<p style="color: #7f8c8d; text-align: center;">Nenhum medicamento adicionado</p>';
        return;
    }

    container.innerHTML = receitaAtual.medicamentos.map(med => `
        <div class="medication-item">
            <div class="medication-info">
                <div class="medication-name">${med.nome} ${med.dosagem}</div>
                <div class="medication-details">
                    ${med.frequencia} • ${getAdministracaoText(med.administracao)} • ${med.duracao}
                    ${med.instrucoes ? `<br>Instruções: ${med.instrucoes}` : ''}
                </div>
            </div>
            <div class="medication-actions">
                <button class="btn-remove" onclick="removerMedicamento(${med.id})">Remover</button>
            </div>
        </div>
    `).join('');
}

// Remover medicamento da receita
function removerMedicamento(medicamentoId) {
    receitaAtual.medicamentos = receitaAtual.medicamentos.filter(med => med.id !== medicamentoId);
    atualizarListaMedicamentos();
    mostrarNotificacao('Medicamento removido da receita.', 'info');
}

// Limpar formulário de medicamento
function limparFormularioMedicamento() {
    document.getElementById('medication').value = '';
    document.getElementById('dosage').value = '';
    document.getElementById('frequency').value = '';
    document.getElementById('administration').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('instructions').value = '';
}

// Salvar rascunho da receita
function salvarRascunho() {
    if (!validarReceita()) {
        return;
    }

    const rascunho = {
        ...receitaAtual,
        dataSalvamento: new Date().toISOString()
    };

    localStorage.setItem('receitaRascunho', JSON.stringify(rascunho));
    mostrarNotificacao('Rascunho salvo com sucesso!', 'success');
}

// Carregar rascunho salvo
function carregarRascunho() {
    const rascunhoSalvo = localStorage.getItem('receitaRascunho');
    
    if (!rascunhoSalvo) {
        mostrarNotificacao('Nenhum rascunho encontrado.', 'info');
        return;
    }

    const rascunho = JSON.parse(rascunhoSalvo);
    
    // Carregar paciente
    if (rascunho.paciente) {
        receitaAtual.paciente = rascunho.paciente;
        selecionarPaciente(rascunho.paciente.id);
    }
    
    // Carregar medicamentos
    receitaAtual.medicamentos = rascunho.medicamentos || [];
    atualizarListaMedicamentos();
    
    // Carregar outros dados
    if (rascunho.validade) {
        document.getElementById('validity').value = rascunho.validade;
    }
    if (rascunho.observacoes) {
        document.getElementById('observations').value = rascunho.observacoes;
    }

    mostrarNotificacao('Rascunho carregado com sucesso!', 'success');
}

// Emitir receita
function emitirReceita() {
    if (!validarReceita()) {
        return;
    }

    // Simular processamento
    mostrarNotificacao('Emitindo receita digital...', 'info');
    
    setTimeout(() => {
        // Gerar número da receita
        const numeroReceita = 'RX' + Date.now();
        
        // Salvar receita emitida
        const receitaEmitida = {
            ...receitaAtual,
            numero: numeroReceita,
            dataEmissao: new Date().toISOString(),
            medico: {
                nome: "Dra. Maria Silva",
                crm: "12345/SP",
                especialidade: "Clínica Geral"
            }
        };

        // Salvar no histórico (simulado)
        salvarNoHistorico(receitaEmitida);
        
        // Limpar rascunho
        localStorage.removeItem('receitaRascunho');
        
        // Mostrar confirmação
        document.getElementById('modalMessage').textContent = 
            `Receita ${numeroReceita} emitida com sucesso para ${receitaAtual.paciente.nome}.`;
        document.getElementById('confirmModal').style.display = 'flex';
        
        mostrarNotificacao('Receita emitida com sucesso!', 'success');
    }, 2000);
}

// Validar receita antes de emitir
function validarReceita() {
    if (!receitaAtual.paciente) {
        mostrarNotificacao('Selecione um paciente antes de emitir a receita.', 'warning');
        document.getElementById('patient-search').focus();
        return false;
    }

    if (receitaAtual.medicamentos.length === 0) {
        mostrarNotificacao('Adicione pelo menos um medicamento à receita.', 'warning');
        return false;
    }

    if (!document.getElementById('validity').value) {
        mostrarNotificacao('Defina a validade da receita.', 'warning');
        return false;
    }

    return true;
}

// Salvar no histórico (simulado)
function salvarNoHistorico(receita) {
    const historico = JSON.parse(localStorage.getItem('historicoReceitas') || '[]');
    historico.push(receita);
    localStorage.setItem('historicoReceitas', JSON.stringify(historico));
}

// Imprimir receita
function imprimirReceita() {
    if (!validarReceita()) {
        return;
    }

    // Em uma aplicação real, geraria um PDF
    mostrarNotificacao('Gerando versão para impressão...', 'info');
    
    setTimeout(() => {
        const conteudoImpressao = gerarConteudoImpressao();
        const janelaImpressao = window.open('', '_blank');
        janelaImpressao.document.write(conteudoImpressao);
        janelaImpressao.document.close();
        janelaImpressao.print();
        
        mostrarNotificacao('Receita enviada para impressão.', 'success');
    }, 1000);
}

// Gerar conteúdo para impressão
// ... código anterior mantido ...

// Gerar conteúdo para impressão
function gerarConteudoImpressao() {
    const dataEmissao = new Date().toLocaleDateString('pt-BR');
    const dataValidade = new Date(receitaAtual.validade).toLocaleDateString('pt-BR');
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Receita Digital - ${receitaAtual.paciente.nome}</title>
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
                .patient-info, .medicamentos, .doctor-info { 
                    margin-bottom: 30px;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                .patient-info h2, .medicamentos h2, .doctor-info h2 {
                    color: #2c3e50;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                    margin-bottom: 15px;
                }
                .medicamento { 
                    margin-bottom: 15px; 
                    padding: 15px; 
                    border: 1px solid #e1e5eb;
                    border-left: 4px solid #3498db;
                    background: #f8fafc;
                }
                .medicamento strong {
                    color: #2c3e50;
                }
                .signature { 
                    margin-top: 60px; 
                    text-align: center;
                    border-top: 1px solid #ccc;
                    padding-top: 20px;
                }
                .receita-info {
                    background: #f0f7ff;
                    padding: 15px;
                    border-radius: 6px;
                    margin-bottom: 20px;
                    text-align: center;
                }
                .warning {
                    background: #fff3e0;
                    padding: 15px;
                    border-radius: 6px;
                    margin: 20px 0;
                    border-left: 4px solid #f39c12;
                }
                @media print {
                    body { margin: 20px; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>RECEITA MÉDICA DIGITAL</h1>
                <div class="receita-info">
                    <strong>Número:</strong> RX${Date.now()} | 
                    <strong>Data de Emissão:</strong> ${dataEmissao} | 
                    <strong>Validade:</strong> ${dataValidade}
                </div>
            </div>

            <div class="patient-info">
                <h2>Dados do Paciente</h2>
                <p><strong>Nome:</strong> ${receitaAtual.paciente.nome}</p>
                <p><strong>CPF:</strong> ${receitaAtual.paciente.cpf}</p>
                <p><strong>Data de Nascimento:</strong> ${receitaAtual.paciente.nascimento}</p>
                <p><strong>Telefone:</strong> ${receitaAtual.paciente.telefone}</p>
                <p><strong>Endereço:</strong> ${receitaAtual.paciente.endereco}</p>
            </div>

            <div class="medicamentos">
                <h2>Medicamentos Prescritos</h2>
                ${receitaAtual.medicamentos.map(med => `
                    <div class="medicamento">
                        <p><strong>${med.nome} ${med.dosagem}</strong></p>
                        <p><strong>Posologia:</strong> ${med.frequencia} • ${getAdministracaoText(med.administracao)} • ${med.duracao}</p>
                        ${med.instrucoes ? `<p><strong>Instruções:</strong> ${med.instrucoes}</p>` : ''}
                    </div>
                `).join('')}
            </div>

            ${receitaAtual.observacoes ? `
            <div class="warning">
                <h3>Observações Médicas</h3>
                <p>${receitaAtual.observacoes}</p>
            </div>
            ` : ''}

            <div class="doctor-info">
                <h2>Dados do Médico</h2>
                <p><strong>Nome:</strong> Dra. Maria Silva</p>
                <p><strong>CRM:</strong> 12345/SP</p>
                <p><strong>Especialidade:</strong> Clínica Geral</p>
                <p><strong>Telefone:</strong> (11) 3456-7890</p>
            </div>

            <div class="signature">
                <p>_________________________________________</p>
                <p><strong>Dra. Maria Silva</strong></p>
                <p>CRM 12345/SP</p>
                <p>Assinatura Digital</p>
            </div>

            <div class="warning no-print">
                <p><strong>⚠️ ATENÇÃO:</strong> Esta é uma receita digital. Apresente este documento na farmácia para retirada dos medicamentos.</p>
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

// ... resto das funções mantido ...

// Utilitários
function getAdministracaoText(administracao) {
    const administracoes = {
        'oral': 'Via Oral',
        'topica': 'Via Tópica',
        'inalatoria': 'Via Inalatória',
        'intramuscular': 'Via Intramuscular',
        'intravenosa': 'Via Intravenosa',
        'subcutanea': 'Via Subcutânea',
        'retal': 'Via Retal',
        'vaginal': 'Via Vaginal'
    };
    return administracoes[administracao] || administracao;
}

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
    receitaAtual = {
        paciente: null,
        medicamentos: [],
        validade: '',
        observacoes: '',
        dataEmissao: new Date()
    };
    
    document.getElementById('patient-details').innerHTML = '<p class="no-patient">Selecione um paciente para preencher automaticamente os dados</p>';
    atualizarListaMedicamentos();
    limparFormularioMedicamento();
    document.getElementById('observations').value = '';
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
    if (receitaAtual.paciente || receitaAtual.medicamentos.length > 0) {
        salvarRascunho();
    }
    
    window.location.href = 'index.html';
}

// Carregar rascunho salvo ao iniciar
function carregarRascunhoSalvo() {
    const rascunhoSalvo = localStorage.getItem('receitaRascunho');
    if (rascunhoSalvo) {
        console.log('Rascunho encontrado. Use o botão "Carregar Rascunho" para restaurar.');
    }
}

// Exportar funções para uso global
window.buscarPacientes = buscarPacientes;
window.selecionarPaciente = selecionarPaciente;
window.adicionarMedicamento = adicionarMedicamento;
window.removerMedicamento = removerMedicamento;
window.salvarRascunho = salvarRascunho;
window.carregarRascunho = carregarRascunho;
window.emitirReceita = emitirReceita;
window.imprimirReceita = imprimirReceita;
window.fecharModal = fecharModal;
window.mostrarModalSair = mostrarModalSair;
window.fecharLogoutModal = fecharLogoutModal;
window.confirmarSaida = confirmarSaida;