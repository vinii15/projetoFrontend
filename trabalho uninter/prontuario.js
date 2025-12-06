// prontuario.js - CÓDIGO CORRIGIDO

// Dados do paciente (mantenha este objeto)

// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado. Inicializando prontuário...");
    
    // Inicializar as funcionalidades
    inicializarProntuario();
});

function inicializarProntuario() {
    console.log("Inicializando prontuário...");
    
    // 1. Configurar funcionalidade das abas
    configurarAbas();
    
    // 2. Configurar botões de ação
    configurarBotoesAcao();
    
    // 3. Configurar botões de visualizar em cada aba
    configurarBotoesVisualizacao();
    
    console.log("Prontuário inicializado com sucesso!");
}

function configurarAbas() {
    console.log("Configurando abas de navegação...");
    
    const botoesAbas = document.querySelectorAll('.btn-aba');
    console.log(`Encontrados ${botoesAbas.length} botões de aba`);
    
    botoesAbas.forEach(botao => {
        botao.addEventListener('click', function() {
            console.log(`Clicou na aba: ${this.textContent}`);
            
            // Remover classe 'ativo' de todos os botões
            botoesAbas.forEach(b => b.classList.remove('ativo'));
            
            // Adicionar classe 'ativo' ao botão clicado
            this.classList.add('ativo');
            
            // Obter o ID da aba alvo
            const abaAlvo = this.getAttribute('data-aba');
            console.log(`Aba alvo: ${abaAlvo}`);
            
            // Esconder todos os painéis
            document.querySelectorAll('.painel-aba').forEach(painel => {
                painel.classList.remove('ativo');
            });
            
            // Mostrar o painel correspondente
            const painelAlvo = document.getElementById(abaAlvo);
            if (painelAlvo) {
                painelAlvo.classList.add('ativo');
                console.log(`Painel ${abaAlvo} ativado`);
                
                // Se necessário, carregar dados dinâmicos
                if (abaAlvo === 'consultas') {
                    carregarConsultas();
                } else if (abaAlvo === 'exames') {
                    carregarExames();
                } else if (abaAlvo === 'receitas') {
                    carregarReceitas();
                }
            } else {
                console.error(`Painel ${abaAlvo} não encontrado!`);
            }
        });
    });
    
    console.log("Abas configuradas com sucesso");
}

function configurarBotoesAcao() {
    console.log("Configurando botões de ação...");
    
    // Botão "Nova Consulta"
    const btnNovaConsulta = document.querySelector('.btn-primario');
    if (btnNovaConsulta) {
        btnNovaConsulta.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Botão 'Nova Consulta' clicado");
            alert('Abrindo formulário para nova consulta...');
            // Implementar funcionalidade de nova consulta
        });
    }
    
    // Botão "Editar Dados"
    const btnEditarDados = document.querySelector('.btn-secundario');
    if (btnEditarDados) {
        btnEditarDados.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Botão 'Editar Dados' clicado");
            alert('Abrindo formulário para editar dados...');
            // Implementar funcionalidade de edição
        });
    }
}

function configurarBotoesVisualizacao() {
    console.log("Configurando botões de visualização...");
    
    // Usar delegação de eventos para lidar com botões dinâmicos
    document.addEventListener('click', function(e) {
        // Verificar se o clique foi em um botão "Ver Detalhes"
        if (e.target.classList.contains('btn-visualizar')) {
            e.preventDefault();
            
            // Verificar em qual aba estamos
            const abaAtiva = document.querySelector('.btn-aba.ativo');
            if (abaAtiva) {
                const abaId = abaAtiva.getAttribute('data-aba');
                
                switch(abaId) {
                    case 'consultas':
                        const consultaId = e.target.getAttribute('data-consulta-id');
                        if (consultaId) {
                            verDetalhesConsulta(parseInt(consultaId));
                        }
                        break;
                        
                    case 'exames':
                        const exameId = e.target.getAttribute('data-exame-id');
                        if (exameId) {
                            verDetalhesExame(parseInt(exameId));
                        }
                        break;
                        
                    case 'receitas':
                        const receitaId = e.target.getAttribute('data-receita-id');
                        if (receitaId) {
                            verDetalhesReceita(parseInt(receitaId));
                        }
                        break;
                        
                    default:
                        // Para abas com dados estáticos, mostrar alerta genérico
                        alert(`Visualizando detalhes...`);
                }
            }
        }
    });
}

// Funções de carregamento de dados (mantenha as que você já tem)

// Função para carregar consultas dinamicamente
function carregarConsultas() {
    console.log("Carregando consultas...");
    const container = document.querySelector('#consultas .lista-consultas');
    
    if (!container) {
        console.error("Container de consultas não encontrado!");
        return;
    }
    
    // Se já tiver conteúdo, não carregar novamente
    if (container.children.length === 0) {
        // Ordenar consultas por data (mais recente primeiro)
        const consultasOrdenadas = [...dadosPaciente.consultas].sort((a, b) => {
            const dataA = new Date(a.data.split('/').reverse().join('-'));
            const dataB = new Date(b.data.split('/').reverse().join('-'));
            return dataB - dataA;
        });
        
        container.innerHTML = consultasOrdenadas.map(consulta => `
            <div class="item-consulta" data-consulta-id="${consulta.id}">
                <div class="cabecalho-consulta">
                    <h4>${consulta.tipo}</h4>
                    <span class="data-consulta">${consulta.data} - ${consulta.hora}</span>
                </div>
                <div class="detalhes-consulta">
                    <div class="info-consulta">
                        <p><strong>Médico:</strong> ${consulta.medico}</p>
                        <p><strong>Motivo:</strong> ${consulta.motivo}</p>
                    </div>
                    <div class="anotacoes-consulta">
                        <p><strong>Anotações:</strong> ${consulta.anotacoes}</p>
                    </div>
                    <button class="btn-visualizar" data-consulta-id="${consulta.id}">
                        Ver Detalhes
                    </button>
                </div>
            </div>
        `).join('');
        
        console.log(`${consultasOrdenadas.length} consultas carregadas`);
    }
}

// Função para carregar exames dinamicamente
function carregarExames() {
    console.log("Carregando exames...");
    const container = document.querySelector('#exames .grid-exames');
    
    if (!container) {
        console.error("Container de exames não encontrado!");
        return;
    }
    
    // Se já tiver conteúdo, não carregar novamente
    if (container.children.length === 0) {
        container.innerHTML = dadosPaciente.exames.map(exame => {
            const statusClass = exame.status === 'realizado' ? 'status-realizado' : 'status-agendado';
            const statusText = exame.status === 'realizado' ? 'Realizado' : 'Agendado';
            
            return `
                <div class="cartao-exame" data-exame-id="${exame.id}">
                    <div class="cabecalho-exame">
                        <h4>${exame.nome}</h4>
                        <span class="data-exame">${exame.data}</span>
                    </div>
                    <div class="status-exame ${statusClass}">
                        ${statusText}
                    </div>
                    <div class="resultado-exame">
                        <p><strong>Resultado:</strong> ${exame.resultado}</p>
                    </div>
                    <button class="btn-visualizar" data-exame-id="${exame.id}">
                        ${exame.status === 'realizado' ? 'Ver Exame' : 'Ver Detalhes'}
                    </button>
                </div>
            `;
        }).join('');
        
        console.log(`${dadosPaciente.exames.length} exames carregados`);
    }
}

// Função para carregar receitas dinamicamente
function carregarReceitas() {
    console.log("Carregando receitas...");
    const container = document.querySelector('#receitas .lista-receitas');
    
    if (!container) {
        console.error("Container de receitas não encontrado!");
        return;
    }
    
    // Se já tiver conteúdo, não carregar novamente
    if (container.children.length === 0) {
        // Ordenar receitas por data (mais recente primeiro)
        const receitasOrdenadas = [...dadosPaciente.receitas].sort((a, b) => {
            const dataA = new Date(a.data.split('/').reverse().join('-'));
            const dataB = new Date(b.data.split('/').reverse().join('-'));
            return dataB - dataA;
        });
        
        container.innerHTML = receitasOrdenadas.map(receita => {
            const statusClass = receita.status === 'ativa' ? 'status-ativa' : 'status-finalizada';
            const statusText = receita.status === 'ativa' ? 'Ativa' : 'Finalizada';
            
            return `
                <div class="cartao-receita" data-receita-id="${receita.id}">
                    <div class="cabecalho-receita">
                        <h4>${receita.medicamento}</h4>
                        <span class="data-receita">${receita.data}</span>
                    </div>
                    <div class="detalhes-receita">
                        <p><strong>Posologia:</strong> ${receita.posologia}</p>
                        <p><strong>Duração:</strong> ${receita.duracao}</p>
                        <p><strong>Uso:</strong> ${receita.uso}</p>
                    </div>
                    <div class="status-receita ${statusClass}">
                        ${statusText}
                    </div>
                    <button class="btn-visualizar" data-receita-id="${receita.id}">
                        Ver Receita
                    </button>
                </div>
            `;
        }).join('');
        
        console.log(`${receitasOrdenadas.length} receitas carregadas`);
    }
}

// Função para ver detalhes da consulta
function verDetalhesConsulta(id) {
    console.log(`Visualizando detalhes da consulta ${id}`);
    const consulta = dadosPaciente.consultas.find(c => c.id === id);
    
    if (consulta) {
        alert(`Detalhes da Consulta:\n\n` +
              `Tipo: ${consulta.tipo}\n` +
              `Data: ${consulta.data} às ${consulta.hora}\n` +
              `Médico: ${consulta.medico}\n` +
              `Motivo: ${consulta.motivo}\n` +
              `Anotações: ${consulta.anotacoes}\n` +
              `Diagnóstico: ${consulta.diagnostico}\n` +
              `Medicamentos: ${consulta.medicamentos.join(', ')}`);
    }
}

// Função para ver detalhes do exame
function verDetalhesExame(id) {
    console.log(`Visualizando detalhes do exame ${id}`);
    const exame = dadosPaciente.exames.find(e => e.id === id);
    
    if (exame) {
        if (exame.status === 'realizado') {
            alert(`Exame: ${exame.nome}\n` +
                  `Data: ${exame.data}\n` +
                  `Status: Realizado\n` +
                  `Resultado: ${exame.resultado}\n` +
                  `Detalhes: ${exame.detalhes}\n` +
                  `Arquivo: ${exame.arquivo || 'Não disponível'}`);
        } else {
            alert(`Exame: ${exame.nome}\n` +
                  `Data do agendamento: ${exame.data}\n` +
                  `Status: Agendado\n` +
                  `${exame.resultado}\n` +
                  `Detalhes: ${exame.detalhes}`);
        }
    }
}

// Função para ver detalhes da receita
function verDetalhesReceita(id) {
    console.log(`Visualizando detalhes da receita ${id}`);
    const receita = dadosPaciente.receitas.find(r => r.id === id);
    
    if (receita) {
        alert(`Receita Médica:\n\n` +
              `Medicamento: ${receita.medicamento}\n` +
              `Data: ${receita.data}\n` +
              `Posologia: ${receita.posologia}\n` +
              `Duração: ${receita.duracao}\n` +
              `Uso: ${receita.uso}\n` +
              `Status: ${receita.status}\n` +
              `Médico: ${receita.medico}\n` +
              `CRM: ${receita.crm}`);
    }
}

// Função para atualizar dados do paciente (exemplo)
function atualizarDadosPaciente() {
    console.log("Atualizando dados do paciente...");
    
    // Atualizar informações pessoais
    const avatar = document.querySelector('.avatar-paciente');
    const nome = document.querySelector('.detalhes-paciente h2');
    const idade = document.querySelector('.meta-paciente span:nth-child(1)');
    const dataNasc = document.querySelector('.meta-paciente span:nth-child(2)');
    const cpf = document.querySelector('.meta-paciente span:nth-child(3)');
    const convenio = document.querySelector('.meta-paciente span:nth-child(4)');
    
    if (avatar) avatar.textContent = dadosPaciente.nome.charAt(0);
    if (nome) nome.textContent = dadosPaciente.nome;
    if (idade) idade.innerHTML = `<strong>Idade:</strong> ${dadosPaciente.idade} anos`;
    if (dataNasc) dataNasc.innerHTML = `<strong>Nascimento:</strong> ${dadosPaciente.dataNascimento}`;
    if (cpf) cpf.innerHTML = `<strong>CPF:</strong> ${dadosPaciente.cpf}`;
    if (convenio) convenio.innerHTML = `<strong>Convênio:</strong> ${dadosPaciente.convenio}`;
}

// Adicione este CSS ao seu arquivo prontuario.css para garantir que as abas funcionem corretamente:
function adicionarCSSAbas() {
    const style = document.createElement('style');
    style.textContent = `
        /* Estilo para as abas */
        .painel-aba {
            display: none;
            animation: fadeIn 0.3s ease;
        }
        
        .painel-aba.ativo {
            display: block;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Estilo para os botões das abas */
        .btn-aba {
            background: none;
            border: none;
            padding: 12px 20px;
            font-size: 16px;
            color: #666;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
        }
        
        .btn-aba.ativo {
            color: #0066cc;
            border-bottom: 3px solid #0066cc;
            font-weight: 600;
        }
        
        .btn-aba:hover:not(.ativo) {
            color: #333;
            border-bottom: 3px solid #ddd;
        }
        
        /* Estilo para botões de visualizar */
        .btn-visualizar {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            color: #495057;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }
        
        .btn-visualizar:hover {
            background-color: #e9ecef;
            border-color: #adb5bd;
        }
    `;
    document.head.appendChild(style);
}

// Adicionar CSS quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    adicionarCSSAbas();
});