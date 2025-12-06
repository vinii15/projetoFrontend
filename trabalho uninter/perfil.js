// paciente.js - Funcionalidades básicas

// Dados de exemplo
let consultasAgendadas = [
    { id: 1, medico: "Dra. Ana Souza", data: "15/12/2024", hora: "14:30", tipo: "Presencial" },
    { id: 2, medico: "Dr. Carlos Lima", data: "16/12/2024", hora: "10:00", tipo: "Teleconsulta" }
];

let lembretes = [
    { id: 1, texto: "Consulta com cardiologista", data: "15/12", hora: "14:30" },
    { id: 2, texto: "Retirar resultado de exame", data: "18/12", hora: "08:00" },
    { id: 3, texto: "Tomar medicamento", data: "Hoje", hora: "21:00" }
];

// Funções dos modais
function mostrarModalSair() {
    document.getElementById('modalSair').style.display = 'flex';
}

function fecharModalSair() {
    document.getElementById('modalSair').style.display = 'none';
}

function confirmarSaida() {
    // Redirecionar para a página index.html
    window.location.href = "index.html";
}

function cancelarConsulta(id) {
    const consulta = consultasAgendadas.find(c => c.id === id);
    if (consulta) {
        document.getElementById('infoCancelamento').innerHTML = `
            <p><strong>Médico:</strong> ${consulta.medico}</p>
            <p><strong>Data:</strong> ${consulta.data}</p>
            <p><strong>Hora:</strong> ${consulta.hora}</p>
            <p><strong>Tipo:</strong> ${consulta.tipo}</p>
        `;
        document.getElementById('modalCancelamento').style.display = 'flex';
        document.getElementById('modalCancelamento').dataset.consultaId = id;
    }
}

function fecharModalCancelamento() {
    document.getElementById('modalCancelamento').style.display = 'none';
}

function confirmarCancelamento() {
    const id = parseInt(document.getElementById('modalCancelamento').dataset.consultaId);
    const motivo = document.getElementById('motivoCancelamento').value;
    
    // Remover da lista (em um sistema real, enviaria para o servidor)
    consultasAgendadas = consultasAgendadas.filter(c => c.id !== id);
    alert(`Consulta cancelada${motivo ? '. Motivo: ' + motivo : ''}`);
    fecharModalCancelamento();
    atualizarListaConsultas();
}

// Funções de visualização
function visualizarDados() {
    alert("Abrindo página com dados pessoais");
    // window.location.href = "dados-pessoais.html";
}

function atualizarDados() {
    alert("Abrindo formulário de atualização de dados");
    // window.location.href = "atualizar-dados.html";
}

function verProximaConsulta() {
    if (consultasAgendadas.length > 0) {
        alert(`Próxima consulta: ${consultasAgendadas[0].data} às ${consultasAgendadas[0].hora}`);
    } else {
        alert("Não há consultas agendadas");
    }
}

function entrarTeleconsulta() {
    alert("Conectando à sala de teleconsulta...");
    // window.location.href = "teleconsulta.html";
}

function testarConexao() {
    alert("Testando sua conexão com a sala de vídeo...");
}

function configurarLembretes() {
    alert("Abrindo configurações de lembretes");
    // window.location.href = "configurar-lembretes.html";
}

// Funções de inicialização
function carregarConsultas() {
    const lista = document.getElementById('lista-consultas');
    if (!lista) return;
    
    if (consultasAgendadas.length === 0) {
        lista.innerHTML = '<div class="sem-consulta">Nenhuma consulta agendada</div>';
    } else {
        lista.innerHTML = consultasAgendadas.map(consulta => `
            <div class="item-consulta">
                <div>
                    <strong>${consulta.medico}</strong><br>
                    <small>${consulta.data} às ${consulta.hora} - ${consulta.tipo}</small>
                </div>
                <button class="botao-cancelar-consulta" onclick="cancelarConsulta(${consulta.id})">Cancelar</button>
            </div>
        `).join('');
    }
    
    document.getElementById('totalConsultas').textContent = `${consultasAgendadas.length} agendadas`;
}

function carregarLembretes() {
    const lista = document.getElementById('lista-lembretes');
    if (!lista) return;
    
    if (lembretes.length === 0) {
        lista.innerHTML = '<div class="sem-lembrete">Nenhum lembrete configurado</div>';
    } else {
        lista.innerHTML = lembretes.map(lembrete => `
            <div class="item-lembrete">
                <span class="icone-botao">⏰</span>
                <div>
                    <strong>${lembrete.texto}</strong><br>
                    <small>${lembrete.data} às ${lembrete.hora}</small>
                </div>
            </div>
        `).join('');
    }
    
    document.getElementById('totalLembretes').textContent = `${lembretes.length} lembretes`;
}

function atualizarListaConsultas() {
    carregarConsultas();
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarConsultas();
    carregarLembretes();
});

// Links já configurados diretamente no HTML:
// - Sair: index.html
// - Agendar Consulta (presencial/remota): consulta.html?tipo=presencial / consulta.html?tipo=remota
// - Ver Todas as Consultas: consulta.html
// - Histórico de Consultas: historicoPaciente.html
// - Prontuário Médico: prontuario.html
// - Resultados de Exames: resultadoConsulta.html