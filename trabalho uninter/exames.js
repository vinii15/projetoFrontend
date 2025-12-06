// exames.js - Funcionalidades da página de exames

// Variável para armazenar o exame a ser cancelado
let exameParaCancelar = null;

// Dados dos exames (simulação)
const dadosExames = {
    hemograma: {
        id: 1,
        nome: "Hemograma Completo",
        tipo: "laboratorial",
        dataColeta: "15/04/2024",
        dataResultado: "16/04/2024",
        laboratorio: "LabVida Central",
        medico: "Dra. Maria Silva",
        status: "disponivel",
        resultados: [
            { nome: "Hemácias", valor: "4.8 milhões/mm³", referencia: "4.5 - 5.9 milhões/mm³", status: "normal" },
            { nome: "Hemoglobina", valor: "14.2 g/dL", referencia: "13.0 - 17.0 g/dL", status: "normal" },
            { nome: "Hematócrito", valor: "42%", referencia: "40% - 50%", status: "normal" },
            { nome: "Leucócitos", valor: "12.500/mm³", referencia: "4.000 - 11.000/mm³", status: "alerta" },
            { nome: "Plaquetas", valor: "250.000/mm³", referencia: "150.000 - 450.000/mm³", status: "normal" }
        ],
        interpretacao: "Hemograma dentro dos parâmetros normais, exceto por discreta leucocitose que pode estar relacionada a processo infeccioso ou inflamatório. Recomendado acompanhamento clínico."
    },
    ultrassom: {
        id: 2,
        nome: "Ultrassom Abdominal Total",
        tipo: "imagem",
        dataExame: "10/04/2024",
        dataLaudo: "11/04/2024",
        clinica: "Imagem Diagnóstica Avançada",
        medico: "Dr. Carlos Eduardo Santos",
        status: "disponivel",
        achados: [
            { nome: "Fígado", valor: "Normal", descricao: "Dimensões preservadas, ecotextura homogênea, contornos regulares. Não há evidências de lesões focais.", status: "normal" },
            { nome: "Vesícula Biliar", valor: "Normal", descricao: "Vesícula com paredes finas e regulares, sem evidências de litíase.", status: "normal" },
            { nome: "Rins", valor: "Cisto Simples", descricao: "Presença de cisto cortical simples no rim direito, medindo 1.8 cm, características benignas.", status: "alerta" },
            { nome: "Pâncreas", valor: "Normal", descricao: "Pâncreas com dimensões e ecotextura preservadas.", status: "normal" },
            { nome: "Baço", valor: "Normal", descricao: "Baço com dimensões normais e ecotextura homogênea.", status: "normal" }
        ],
        conclusao: "Ultrassom abdominal dentro da normalidade, exceto pela presença de cisto simples no rim direito, de características benignas, não necessitando de intervenção. Recomendado acompanhamento anual."
    },
    ecg: {
        id: 3,
        nome: "Eletrocardiograma (ECG)",
        tipo: "cardiológico",
        dataAgendada: "20/04/2024",
        horario: "14:30",
        local: "Clínica Cardiológica Vida+",
        endereco: "Av. Paulista, 1000 - São Paulo/SP",
        status: "agendado",
        instrucoes: [
            "Não utilizar cremes ou óleos no tórax no dia do exame",
            "Vestir roupas confortáveis e de fácil remoção",
            "Evitar exercícios físicos intensos 2 horas antes",
            "Trazer exames cardiológicos anteriores (se houver)"
        ]
    },
    glicemia: {
        id: 4,
        nome: "Glicemia em Jejum",
        tipo: "laboratorial",
        dataColeta: "05/04/2024",
        previsaoResultado: "18/04/2024",
        laboratorio: "LabVida Central",
        statusProcessamento: "Em análise bioquímica",
        status: "aguardando",
        etapas: [
            { numero: 1, nome: "Coleta Realizada", data: "05/04", status: "concluida" },
            { numero: 2, nome: "Em Processamento", data: "08/04", status: "concluida" },
            { numero: 3, nome: "Análise Bioquímica", data: "Em andamento", status: "atual" },
            { numero: 4, nome: "Laudo Médico", data: "Previsão: 18/04", status: "pendente" }
        ]
    }
};

// Função para cancelar exame
function cancelarExame(botao) {
    exameParaCancelar = botao.closest('.cartao-exame');
    document.getElementById('modalCancelar').style.display = 'flex';
}

// Função para fechar modal
function fecharModal() {
    document.getElementById('modalCancelar').style.display = 'none';
    exameParaCancelar = null;
}

// Função para confirmar cancelamento
function confirmarCancelamento() {
    if (exameParaCancelar) {
        const elementoStatus = exameParaCancelar.querySelector('.status-exame');
        elementoStatus.textContent = 'Cancelado';
        elementoStatus.className = 'status-exame cancelado';
        
        const elementoAcoes = exameParaCancelar.querySelector('.acoes-exame');
        elementoAcoes.innerHTML = '<button class="botao-secundario" onclick="agendarNovamente(this)">Agendar Novamente</button>';
        
        const elementoInfo = exameParaCancelar.querySelector('.informacao-exame');
        const elementoMotivo = document.createElement('p');
        elementoMotivo.innerHTML = '<strong>Motivo:</strong> Cancelado pelo paciente';
        elementoMotivo.style.color = '#ef4444';
        elementoMotivo.style.fontWeight = '500';
        elementoInfo.appendChild(elementoMotivo);
        
        // Atualizar dados no objeto
        const tituloExame = exameParaCancelar.querySelector('h3').textContent;
        atualizarStatusNoObjeto(tituloExame, 'cancelado');
        
        mostrarNotificacao('Exame cancelado com sucesso!', 'sucesso');
    }
    fecharModal();
}

// Função para agendar novamente
function agendarNovamente(botao) {
    const cartaoExame = botao.closest('.cartao-exame');
    const tituloExame = cartaoExame.querySelector('h3').textContent;
    
    if (confirm(`Deseja agendar novamente o exame "${tituloExame}"?`)) {
        const elementoStatus = cartaoExame.querySelector('.status-exame');
        elementoStatus.textContent = 'Agendado';
        elementoStatus.className = 'status-exame agendado';
        
        const elementoAcoes = cartaoExame.querySelector('.acoes-exame');
        elementoAcoes.innerHTML = `
            <button class="botao-secundario">Reagendar Exame</button>
            <button class="botao-cancelar" onclick="cancelarExame(this)">Cancelar Exame</button>
        `;
        
        // Remover motivo do cancelamento
        const motivoElemento = cartaoExame.querySelector('p[style*="color: #ef4444"]');
        if (motivoElemento) {
            motivoElemento.remove();
        }
        
        atualizarStatusNoObjeto(tituloExame, 'agendado');
        mostrarNotificacao('Exame agendado novamente!', 'sucesso');
    }
}

// Função para atualizar status no objeto de dados
function atualizarStatusNoObjeto(titulo, novoStatus) {
    for (const key in dadosExames) {
        if (dadosExames[key].nome === titulo) {
            dadosExames[key].status = novoStatus;
            console.log(`Status atualizado: ${titulo} -> ${novoStatus}`);
            break;
        }
    }
}

// Função para ver resultado completo
function verResultadoCompleto(tipoExame) {
    const exame = dadosExames[tipoExame];
    if (!exame) {
        mostrarNotificacao('Exame não encontrado!', 'erro');
        return;
    }
    
    // Simular abertura de nova janela com detalhes
    const largura = 800;
    const altura = 600;
    const esquerda = (screen.width - largura) / 2;
    const topo = (screen.height - altura) / 2;
    
    const detalhesExame = `
        <html>
        <head>
            <title>${exame.nome} - Laudo Completo</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #2563eb; }
                .info { background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
                .resultado { margin-bottom: 15px; padding: 10px; border-left: 4px solid; }
                .normal { border-color: #10b981; }
                .alerta { border-color: #f59e0b; }
            </style>
        </head>
        <body>
            <h1>${exame.nome}</h1>
            <div class="info">
                <p><strong>Data:</strong> ${exame.dataResultado || exame.dataExame || exame.dataColeta}</p>
                <p><strong>Local:</strong> ${exame.laboratorio || exame.clinica || exame.local}</p>
                <p><strong>Médico:</strong> ${exame.medico || 'Não especificado'}</p>
            </div>
            ${exame.interpretacao ? `<h2>Interpretação Médica</h2><p>${exame.interpretacao}</p>` : ''}
            ${exame.conclusao ? `<h2>Conclusão</h2><p>${exame.conclusao}</p>` : ''}
        </body>
        </html>
    `;
    
    // Em um ambiente real, aqui você abriria um PDF ou página real
    const janela = window.open('', `laudo_${tipoExame}`, `width=${largura},height=${altura},left=${esquerda},top=${topo}`);
    if (janela) {
        janela.document.write(detalhesExame);
        janela.document.close();
    } else {
        mostrarNotificacao('Permita pop-ups para visualizar o laudo completo.', 'alerta');
    }
}

// Função para simular download de PDF
function simularDownloadPDF() {
    mostrarNotificacao('Iniciando download do PDF...', 'info');
    
    // Simular tempo de processamento
    setTimeout(() => {
        mostrarNotificacao('Download concluído!', 'sucesso');
    }, 1500);
}

// Função para compartilhar exame
function compartilharExame() {
    if (navigator.share) {
        navigator.share({
            title: 'Meus Exames - Vidaplus',
            text: 'Confira meus resultados de exames',
            url: window.location.href
        })
        .then(() => mostrarNotificacao('Compartilhado com sucesso!', 'sucesso'))
        .catch(() => mostrarNotificacao('Compartilhamento cancelado', 'alerta'));
    } else {
        // Fallback para copiar link
        navigator.clipboard.writeText(window.location.href)
            .then(() => mostrarNotificacao('Link copiado para a área de transferência!', 'sucesso'))
            .catch(() => mostrarNotificacao('Não foi possível copiar o link', 'erro'));
    }
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo) {
    // Remover notificações anteriores
    const notificacoesAntigas = document.querySelectorAll('.notificacao');
    notificacoesAntigas.forEach(notif => notif.remove());
    
    // Criar nova notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.textContent = mensagem;
    
    // Estilos da notificação
    notificacao.style.position = 'fixed';
    notificacao.style.top = '20px';
    notificacao.style.right = '20px';
    notificacao.style.padding = '15px 20px';
    notificacao.style.borderRadius = '8px';
    notificacao.style.color = 'white';
    notificacao.style.fontWeight = '500';
    notificacao.style.zIndex = '2000';
    notificacao.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    notificacao.style.animation = 'slideIn 0.3s ease-out';
    
    // Cores por tipo
    if (tipo === 'sucesso') {
        notificacao.style.background = '#10b981';
    } else if (tipo === 'erro') {
        notificacao.style.background = '#ef4444';
    } else if (tipo === 'alerta') {
        notificacao.style.background = '#f59e0b';
    } else if (tipo === 'info') {
        notificacao.style.background = '#3b82f6';
    }
    
    document.body.appendChild(notificacao);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// Animação CSS para notificações
const estiloNotificacoes = document.createElement('style');
estiloNotificacoes.textContent = `
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
document.head.appendChild(estiloNotificacoes);

// Fechar modal ao clicar fora
window.onclick = function(evento) {
    const modal = document.getElementById('modalCancelar');
    if (evento.target === modal) {
        fecharModal();
    }
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de exames carregada');
    
    // Adicionar eventos aos botões de download
    const botoesDownload = document.querySelectorAll('.botao-download');
    botoesDownload.forEach(botao => {
        botao.addEventListener('click', simularDownloadPDF);
    });
    
    // Adicionar eventos aos botões de compartilhar
    const botoesCompartilhar = document.querySelectorAll('.botao-compartilhar');
    botoesCompartilhar.forEach(botao => {
        botao.addEventListener('click', compartilharExame);
    });
    
    // Adicionar evento aos botões de reagendar
    const botoesReagendar = document.querySelectorAll('.botao-secundario');
    botoesReagendar.forEach(botao => {
        if (botao.textContent.includes('Reagendar')) {
            botao.addEventListener('click', function() {
                mostrarNotificacao('Função de reagendamento em desenvolvimento', 'info');
            });
        }
    });
});