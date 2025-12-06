// Dados de exemplo dos pacientes
const pacientes = [
    {
        id: 1,
        nome: "João Santos",
        idade: 39,
        cpf: "123.456.789-00",
        convenio: "Unimed",
        status: "ativo",
        ultimaConsulta: "15/04/2024",
        diagnosticoPrincipal: "Hipertensão arterial",
        alergias: "Penicilina",
        medicacoes: ["Losartana 50mg"],
        consultasRealizadas: 12,
        avatarLetra: "J",
        telefone: "(11) 99999-9999",
        email: "joao.santos@email.com",
        endereco: "Rua das Flores, 123 - Centro, São Paulo/SP"
    },
    {
        id: 2,
        nome: "Maria Oliveira",
        idade: 45,
        cpf: "987.654.321-00",
        convenio: "Amil",
        status: "ativo",
        ultimaConsulta: "10/04/2024",
        diagnosticoPrincipal: "Diabetes tipo 2",
        alergias: "Nenhuma",
        medicacoes: ["Metformina 850mg", "Glibenclamida 5mg"],
        consultasRealizadas: 8,
        avatarLetra: "M",
        telefone: "(11) 98888-8888",
        email: "maria.oliveira@email.com",
        endereco: "Av. Paulista, 1000 - Bela Vista, São Paulo/SP"
    },
    {
        id: 3,
        nome: "Carlos Mendes",
        idade: 28,
        cpf: "456.789.123-00",
        convenio: "Bradesco",
        status: "inativo",
        ultimaConsulta: "20/03/2024",
        diagnosticoPrincipal: "Asma",
        alergias: "Ácaros, Pólen",
        medicacoes: ["Budesonida"],
        consultasRealizadas: 5,
        avatarLetra: "C",
        telefone: "(11) 97777-7777",
        email: "carlos.mendes@email.com",
        endereco: "Rua Augusta, 500 - Consolação, São Paulo/SP"
    },
    {
        id: 4,
        nome: "Ana Costa",
        idade: 52,
        cpf: "789.123.456-00",
        convenio: "SulAmérica",
        status: "alta",
        ultimaConsulta: "05/04/2024",
        diagnosticoPrincipal: "Artrose",
        alergias: "Dipirona",
        medicacoes: ["Condroitina", "Glucosamina"],
        consultasRealizadas: 6,
        avatarLetra: "A",
        telefone: "(11) 96666-6666",
        email: "ana.costa@email.com",
        endereco: "Rua da Consolação, 200 - Centro, São Paulo/SP"
    },
    {
        id: 5,
        nome: "Roberto Almeida",
        idade: 61,
        cpf: "321.654.987-00",
        convenio: "Unimed",
        status: "ativo",
        ultimaConsulta: "18/04/2024",
        diagnosticoPrincipal: "Hipertensão + Diabetes",
        alergias: "Sulfa",
        medicacoes: ["Losartana 100mg", "Metformina 1000mg", "Aspirina 100mg"],
        consultasRealizadas: 15,
        avatarLetra: "R",
        telefone: "(11) 95555-5555",
        email: "roberto.almeida@email.com",
        endereco: "Alameda Santos, 700 - Jardins, São Paulo/SP"
    },
    {
        id: 6,
        nome: "Fernanda Lima",
        idade: 34,
        cpf: "654.987.321-00",
        convenio: "Amil",
        status: "ativo",
        ultimaConsulta: "12/04/2024",
        diagnosticoPrincipal: "Enxaqueca",
        alergias: "Nenhuma",
        medicacoes: ["Topiramato 50mg", "Sumatriptano"],
        consultasRealizadas: 7,
        avatarLetra: "F",
        telefone: "(11) 94444-4444",
        email: "fernanda.lima@email.com",
        endereco: "Rua Oscar Freire, 800 - Jardins, São Paulo/SP"
    }
];

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    console.log("Histórico de Pacientes - Inicializando...");
    
    // Configurar eventos dos filtros
    configurarEventosFiltros();
    
    // Carregar lista inicial de pacientes
    carregarPacientes(pacientes);
    
    // Configurar evento do botão de busca
    const btnBusca = document.querySelector('.btn-busca');
    if (btnBusca) {
        btnBusca.addEventListener('click', filtrarPacientes);
    }
    
    // Configurar evento de busca ao pressionar Enter
    const inputBusca = document.getElementById('search-input');
    if (inputBusca) {
        inputBusca.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filtrarPacientes();
            }
        });
    }
    
    console.log("Página inicializada com sucesso!");
});

// Configurar eventos dos filtros
function configurarEventosFiltros() {
    const filtros = ['filter-period', 'filter-status', 'filter-convenio'];
    
    filtros.forEach(filtroId => {
        const elemento = document.getElementById(filtroId);
        if (elemento) {
            elemento.addEventListener('change', filtrarPacientes);
        }
    });
}

// Filtrar pacientes com base nos critérios
function filtrarPacientes() {
    console.log("Filtrando pacientes...");
    
    const busca = document.getElementById('search-input').value.toLowerCase();
    const periodo = document.getElementById('filter-period').value;
    const status = document.getElementById('filter-status').value;
    const convenio = document.getElementById('filter-convenio').value;
    
    let pacientesFiltrados = [...pacientes];
    
    // Filtro por busca
    if (busca) {
        pacientesFiltrados = pacientesFiltrados.filter(paciente => 
            paciente.nome.toLowerCase().includes(busca) ||
            paciente.cpf.includes(busca) ||
            paciente.diagnosticoPrincipal.toLowerCase().includes(busca) ||
            paciente.convenio.toLowerCase().includes(busca)
        );
    }
    
    // Filtro por status
    if (status !== 'all') {
        pacientesFiltrados = pacientesFiltrados.filter(paciente => 
            paciente.status === status
        );
    }
    
    // Filtro por convênio
    if (convenio !== 'all') {
        pacientesFiltrados = pacientesFiltrados.filter(paciente => 
            paciente.convenio === convenio
        );
    }
    
    // Filtro por período (simplificado)
    if (periodo !== 'all') {
        // Aqui você implementaria a lógica real de filtro por data
        // Por enquanto, apenas demonstração
        console.log(`Filtro por período: últimos ${periodo} dias`);
    }
    
    // Carregar pacientes filtrados
    carregarPacientes(pacientesFiltrados);
}

// Carregar lista de pacientes
function carregarPacientes(listaPacientes) {
    const container = document.getElementById('patients-list');
    const estadoVazio = document.getElementById('empty-state');
    
    if (!container) return;
    
    // Mostrar/ocultar estado vazio
    if (listaPacientes.length === 0) {
        container.innerHTML = '';
        if (estadoVazio) estadoVazio.style.display = 'block';
        return;
    }
    
    if (estadoVazio) estadoVazio.style.display = 'none';
    
    // Gerar HTML dos pacientes
    const pacientesHTML = listaPacientes.map(paciente => {
        const statusClass = `status-${paciente.status}`;
        const statusText = paciente.status === 'ativo' ? 'Ativo' : 
                          paciente.status === 'inativo' ? 'Inativo' : 'Com Alta';
        
        return `
            <div class="cartao-paciente" data-paciente-id="${paciente.id}" onclick="verDetalhesPaciente(${paciente.id})">
                <div class="cabecalho-paciente-cartao">
                    <div class="info-paciente">
                        <div class="nome-paciente">${paciente.nome}</div>
                        <div class="id-paciente">ID: ${paciente.id.toString().padStart(4, '0')} • CPF: ${paciente.cpf}</div>
                        <div class="meta-paciente-lista">
                            <div class="item-meta">
                                <span>👤 ${paciente.idade} anos</span>
                            </div>
                            <div class="item-meta">
                                <span>🏥 ${paciente.convenio}</span>
                            </div>
                            <div class="item-meta">
                                <span>💊 ${paciente.medicacoes.length} medicação(ões)</span>
                            </div>
                            <div class="item-meta">
                                <span>📅 ${paciente.consultasRealizadas} consultas</span>
                            </div>
                        </div>
                    </div>
                    <div class="status-consulta">
                        <div class="selo-status-paciente ${statusClass}">
                            ${statusText}
                        </div>
                        <div class="data-ultima-consulta">
                            Última consulta: ${paciente.ultimaConsulta}
                        </div>
                    </div>
                </div>
                <div class="detalhes-paciente-lista">
                    <div class="secao-detalhe-paciente">
                        <h4>Diagnóstico Principal</h4>
                        <div class="conteudo-detalhe-paciente">
                            <p>${paciente.diagnosticoPrincipal}</p>
                            ${paciente.alergias ? `<p><strong>Alergias:</strong> ${paciente.alergias}</p>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = pacientesHTML;
    
    // Atualizar contadores
    atualizarContadores(listaPacientes);
}

// Atualizar contadores na parte superior
function atualizarContadores(listaPacientes) {
    const totalPacientes = document.getElementById('total-pacientes');
    const consultasHoje = document.getElementById('consultas-hoje');
    const novosPacientes = document.getElementById('novos-pacientes');
    
    if (totalPacientes) {
        totalPacientes.textContent = listaPacientes.filter(p => p.status === 'ativo').length;
    }
    
    if (consultasHoje) {
        // Simulação - na prática, você buscaria essas informações do backend
        const hoje = Math.floor(Math.random() * 5) + 3;
        consultasHoje.textContent = hoje;
    }
    
    if (novosPacientes) {
        // Simulação - pacientes que fizeram a primeira consulta no mês atual
        const novosEsteMes = Math.floor(Math.random() * 5) + 8;
        novosPacientes.textContent = novosEsteMes;
    }
}

// Ver detalhes do paciente
function verDetalhesPaciente(id) {
    const paciente = pacientes.find(p => p.id === id);
    if (!paciente) return;
    
    const modal = document.getElementById('detailModal');
    const detalhes = document.getElementById('patientDetails');
    
    if (!modal || !detalhes) return;
    
    const statusText = paciente.status === 'ativo' ? 'Ativo' : 
                      paciente.status === 'inativo' ? 'Inativo' : 'Com Alta';
    
    // Criar lista de medicamentos formatada
    const medicamentosHTML = paciente.medicacoes.map(med => `<li>${med}</li>`).join('');
    
    detalhes.innerHTML = `
        <div class="info-paciente-modal">
            <div class="cabecalho-paciente-modal">
                <div class="avatar-paciente-modal" style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #3498db, #2980b9); color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">
                    ${paciente.avatarLetra}
                </div>
                <div>
                    <h4 style="color: #2c3e50; margin-bottom: 5px; font-size: 20px;">${paciente.nome}</h4>
                    <p style="color: #7f8c8d; font-size: 14px; margin-bottom: 10px;">ID: ${paciente.id.toString().padStart(4, '0')} • CPF: ${paciente.cpf}</p>
                    <span class="selo-status-paciente status-${paciente.status}" style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                        ${statusText}
                    </span>
                </div>
            </div>
            
            <div class="grid-info-paciente" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0;">
                <div class="coluna-info">
                    <p><strong>Idade:</strong> ${paciente.idade} anos</p>
                    <p><strong>Convênio:</strong> ${paciente.convenio}</p>
                    <p><strong>Consultas:</strong> ${paciente.consultasRealizadas}</p>
                </div>
                <div class="coluna-info">
                    <p><strong>Última consulta:</strong> ${paciente.ultimaConsulta}</p>
                    <p><strong>Telefone:</strong> ${paciente.telefone}</p>
                    <p><strong>E-mail:</strong> ${paciente.email}</p>
                </div>
            </div>
            
            <div class="secao-detalhes" style="margin-bottom: 20px;">
                <h5 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">📋 Diagnóstico Principal</h5>
                <div style="background: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 15px;">
                    <p style="color: #1e293b; font-weight: 500;">${paciente.diagnosticoPrincipal}</p>
                </div>
            </div>
            
            <div class="secao-detalhes" style="margin-bottom: 20px;">
                <h5 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">⚠️ Alergias</h5>
                <div style="background: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 15px;">
                    <p style="color: #1e293b;">${paciente.alergias || 'Nenhuma alergia registrada'}</p>
                </div>
            </div>
            
            <div class="secao-detalhes" style="margin-bottom: 20px;">
                <h5 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">💊 Medicações em Uso</h5>
                <div style="background: #f8fafc; padding: 12px; border-radius: 6px;">
                    ${paciente.medicacoes.length > 0 ? 
                        `<ul style="list-style: none; padding: 0; margin: 0;">${medicamentosHTML}</ul>` : 
                        `<p style="color: #7f8c8d;">Nenhuma medicação em uso</p>`
                    }
                </div>
            </div>
            
            <div class="secao-detalhes">
                <h5 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">📍 Endereço</h5>
                <div style="background: #f8fafc; padding: 12px; border-radius: 6px;">
                    <p style="color: #1e293b;">${paciente.endereco}</p>
                </div>
            </div>
        </div>
    `;
    
    // Mostrar modal
    modal.style.display = 'flex';
}

// Fechar modal
function fecharModal() {
    const modal = document.getElementById('detailModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fechar modal de exportação
function fecharExportModal() {
    const modal = document.getElementById('exportModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Nova consulta
function novaConsulta() {
    alert('Abrindo formulário para nova consulta...');
    fecharModal();
    // Aqui você redirecionaria para a página de nova consulta
    // window.location.href = 'nova-consulta.html';
}

// Editar prontuário
function editarProntuario() {
    alert('Abrindo formulário para editar prontuário...');
    fecharModal();
    // Aqui você redirecionaria para a página de edição do prontuário
}

// Exportar relatório
function exportarRelatorio() {
    const modal = document.getElementById('exportModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Funções de exportação
function exportarPDF() {
    alert('Gerando PDF com todos os pacientes...');
    // Aqui você implementaria a geração de PDF
    fecharExportModal();
}

function exportarCSV() {
    alert('Exportando dados para CSV...');
    // Aqui você implementaria a exportação para CSV
    fecharExportModal();
}

function exportarAtivos() {
    alert('Exportando lista de pacientes ativos...');
    // Aqui você implementaria a exportação específica
    fecharExportModal();
}

// Limpar filtros
function limparFiltros() {
    document.getElementById('search-input').value = '';
    document.getElementById('filter-period').value = 'all';
    document.getElementById('filter-status').value = 'all';
    document.getElementById('filter-convenio').value = 'all';
    
    carregarPacientes(pacientes);
}

// Fechar modais ao clicar fora
window.onclick = function(event) {
    const detailModal = document.getElementById('detailModal');
    const exportModal = document.getElementById('exportModal');
    
    if (event.target === detailModal) {
        fecharModal();
    }
    
    if (event.target === exportModal) {
        fecharExportModal();
    }
}

// Fechar modal com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharModal();
        fecharExportModal();
    }
});