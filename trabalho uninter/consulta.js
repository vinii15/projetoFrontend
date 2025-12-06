// Dados dos médicos por especialidade
const medicosPorEspecialidade = {
    'cardiologia': [
        { id: 'dra-silva', nome: 'Dra. Maria Silva - Cardiologia' }
    ],
    'ortopedia': [
        { id: 'dr-santos', nome: 'Dr. João Santos - Ortopedia' }
    ],
    'pediatria': [
        { id: 'dra-oliveira', nome: 'Dra. Ana Oliveira - Pediatria' }
    ],
    'clinico-geral': [
        { id: 'dr-costa', nome: 'Dr. Pedro Costa - Clínico Geral' }
    ],
    'dermatologia': [
        { id: 'dr-almeida', nome: 'Dr. Roberto Almeida - Dermatologia' }
    ],
    'ginecologia': [
        { id: 'dra-fernandes', nome: 'Dra. Carla Fernandes - Ginecologia' }
    ],
    'neurologia': [
        { id: 'dr-rodrigues', nome: 'Dr. Paulo Rodrigues - Neurologia' }
    ],
    'psiquiatria': [
        { id: 'dra-martins', nome: 'Dra. Juliana Martins - Psiquiatria' }
    ]
};

// Horários disponíveis por tipo de consulta
const horariosDisponiveis = {
    'presencial': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
    'teleconsulta': ['08:30', '09:30', '10:30', '11:30', '14:30', '15:30', '16:30', '17:30']
};

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de agendamento carregada');
    inicializarPagina();
});

function inicializarPagina() {
    configurarEventListeners();
    configurarValidacoes();
    configurarDataMinima();
    atualizarResumo();
}

// Configurar event listeners
function configurarEventListeners() {
    const form = document.getElementById('appointmentForm');
    const consultTypeRadios = document.querySelectorAll('input[name="consult-type"]');
    const especialidadeSelect = document.getElementById('especialidade');
    const medicoSelect = document.getElementById('medico');
    const dataInput = document.getElementById('data');
    const horarioSelect = document.getElementById('horario');

    // Tipo de consulta
    consultTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            atualizarHorariosDisponiveis();
            atualizarResumo();
        });
    });

    // Especialidade
    especialidadeSelect.addEventListener('change', function() {
        atualizarMedicosDisponiveis();
        atualizarResumo();
    });

    // Médico
    medicoSelect.addEventListener('change', atualizarResumo);

    // Data
    dataInput.addEventListener('change', function() {
        validarDataSelecionada();
        atualizarResumo();
    });

    // Horário
    horarioSelect.addEventListener('change', atualizarResumo);

    // Submit do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        processarAgendamento();
    });

    // Máscaras para CPF e telefone
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');

    cpfInput.addEventListener('input', function(e) {
        aplicarMascaraCPF(e.target);
    });

    telefoneInput.addEventListener('input', function(e) {
        aplicarMascaraTelefone(e.target);
    });
}

// Configurar validações
function configurarValidacoes() {
    const emailInput = document.getElementById('email');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');

    emailInput.addEventListener('blur', validarEmail);
    cpfInput.addEventListener('blur', validarCPF);
    telefoneInput.addEventListener('blur', validarTelefone);
}

// Configurar data mínima (hoje)
function configurarDataMinima() {
    const dataInput = document.getElementById('data');
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.min = hoje;
}

// Atualizar médicos disponíveis baseado na especialidade
function atualizarMedicosDisponiveis() {
    const especialidadeSelect = document.getElementById('especialidade');
    const medicoSelect = document.getElementById('medico');
    const especialidade = especialidadeSelect.value;

    // Limpar opções atuais
    medicoSelect.innerHTML = '<option value="">Qualquer médico disponível</option>';

    if (especialidade && medicosPorEspecialidade[especialidade]) {
        medicosPorEspecialidade[especialidade].forEach(medico => {
            const option = document.createElement('option');
            option.value = medico.id;
            option.textContent = medico.nome;
            medicoSelect.appendChild(option);
        });
    }

    // Adicionar opção de qualquer médico para outras especialidades
    const outrasEspecialidades = Object.keys(medicosPorEspecialidade)
        .filter(esp => esp !== especialidade)
        .flatMap(esp => medicosPorEspecialidade[esp]);

    outrasEspecialidades.forEach(medico => {
        const option = document.createElement('option');
        option.value = medico.id;
        option.textContent = medico.nome;
        medicoSelect.appendChild(option);
    });
}

// Atualizar horários disponíveis baseado no tipo de consulta
function atualizarHorariosDisponiveis() {
    const consultType = document.querySelector('input[name="consult-type"]:checked').value;
    const horarioSelect = document.getElementById('horario');
    
    // Limpar opções atuais
    horarioSelect.innerHTML = '<option value="">Selecione um horário</option>';

    if (horariosDisponiveis[consultType]) {
        horariosDisponiveis[consultType].forEach(horario => {
            const option = document.createElement('option');
            option.value = horario;
            option.textContent = horario;
            horarioSelect.appendChild(option);
        });
    }
}

// Atualizar resumo em tempo real
function atualizarResumo() {
    const consultType = document.querySelector('input[name="consult-type"]:checked');
    const especialidadeSelect = document.getElementById('especialidade');
    const medicoSelect = document.getElementById('medico');
    const dataInput = document.getElementById('data');
    const horarioSelect = document.getElementById('horario');

    document.getElementById('summary-type').textContent = 
        consultType && consultType.value === 'presencial' ? 'Presencial' : 'Teleconsulta';

    document.getElementById('summary-specialty').textContent = 
        especialidadeSelect.value ? especialidadeSelect.options[especialidadeSelect.selectedIndex].text : '-';

    document.getElementById('summary-doctor').textContent = 
        medicoSelect.value ? medicoSelect.options[medicoSelect.selectedIndex].text : 'Qualquer disponível';

    if (dataInput.value) {
        const date = new Date(dataInput.value);
        document.getElementById('summary-date').textContent = date.toLocaleDateString('pt-BR');
    } else {
        document.getElementById('summary-date').textContent = '-';
    }

    document.getElementById('summary-time').textContent = horarioSelect.value ? horarioSelect.value : '-';
}

// Processar agendamento
function processarAgendamento() {
    if (!validarFormulario()) {
        mostrarErro('Por favor, preencha todos os campos obrigatórios corretamente.');
        return;
    }

    const dadosAgendamento = coletarDadosAgendamento();
    
    // Simular envio para API
    console.log('Dados do agendamento:', dadosAgendamento);
    
    // Mostrar modal de confirmação
    mostrarConfirmacao(dadosAgendamento);
}

// Coletar dados do formulário
function coletarDadosAgendamento() {
    return {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        nascimento: document.getElementById('nascimento').value,
        tipo: document.querySelector('input[name="consult-type"]:checked').value,
        especialidade: document.getElementById('especialidade').value,
        medico: document.getElementById('medico').value,
        data: document.getElementById('data').value,
        horario: document.getElementById('horario').value,
        observacoes: document.getElementById('observacoes').value,
        dataAgendamento: new Date().toISOString()
    };
}

// Validar formulário completo
function validarFormulario() {
    const camposObrigatorios = [
        'nome', 'cpf', 'telefone', 'email', 'nascimento', 
        'especialidade', 'data', 'horario'
    ];

    for (const campoId of camposObrigatorios) {
        const campo = document.getElementById(campoId);
        if (!campo.value.trim()) {
            campo.focus();
            return false;
        }
    }

    return validarEmail() && validarCPF() && validarTelefone() && validarDataSelecionada();
}

// Validações individuais
function validarEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        emailInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    emailInput.style.borderColor = '#27ae60';
    return true;
}

function validarCPF() {
    const cpfInput = document.getElementById('cpf');
    // Implementação básica - em produção usar validação real de CPF
    const cpf = cpfInput.value.replace(/\D/g, '');
    
    if (cpf && cpf.length !== 11) {
        cpfInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    cpfInput.style.borderColor = '#27ae60';
    return true;
}

function validarTelefone() {
    const telefoneInput = document.getElementById('telefone');
    const telefone = telefoneInput.value.replace(/\D/g, '');
    
    if (telefone && telefone.length < 10) {
        telefoneInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    telefoneInput.style.borderColor = '#27ae60';
    return true;
}

function validarDataSelecionada() {
    const dataInput = document.getElementById('data');
    const dataSelecionada = new Date(dataInput.value);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataSelecionada < hoje) {
        dataInput.style.borderColor = '#e74c3c';
        mostrarErro('Não é possível agendar para datas passadas.');
        return false;
    }

    dataInput.style.borderColor = '#27ae60';
    return true;
}

// Máscaras
function aplicarMascaraCPF(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    
    input.value = value;
}

function aplicarMascaraTelefone(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 11) value = value.substring(0, 11);
    
    if (value.length <= 11) {
        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
    }
    
    input.value = value;
}

// Modal de confirmação
function mostrarConfirmacao(dados) {
    const modal = document.getElementById('modalConfirmacao');
    const detalhesContainer = document.getElementById('detalhesConfirmacao');

    const dataConsulta = new Date(dados.data);
    const dataFormatada = dataConsulta.toLocaleDateString('pt-BR');
    
    detalhesContainer.innerHTML = `
        <p><strong>Paciente:</strong> ${dados.nome}</p>
        <p><strong>Tipo:</strong> ${dados.tipo === 'presencial' ? 'Consulta Presencial' : 'Teleconsulta'}</p>
        <p><strong>Especialidade:</strong> ${document.getElementById('especialidade').options[document.getElementById('especialidade').selectedIndex].text}</p>
        <p><strong>Médico:</strong> ${dados.medico ? document.getElementById('medico').options[document.getElementById('medico').selectedIndex].text : 'A definir'}</p>
        <p><strong>Data:</strong> ${dataFormatada}</p>
        <p><strong>Horário:</strong> ${dados.horario}</p>
        ${dados.observacoes ? `<p><strong>Observações:</strong> ${dados.observacoes}</p>` : ''}
    `;

    modal.style.display = 'flex';
    
    // Limpar formulário após confirmação
    document.getElementById('appointmentForm').reset();
    atualizarResumo();
}

function fecharModal() {
    const modal = document.getElementById('modalConfirmacao');
    modal.style.display = 'none';
}

function irParaConsultas() {
    window.location.href = 'resultadoConsulta.html';
}

// Função de cancelamento
function cancelarAgendamento() {
    if (confirm('Tem certeza que deseja cancelar o agendamento? Todos os dados preenchidos serão perdidos.')) {
        document.getElementById('appointmentForm').reset();
        atualizarResumo();
    }
}

// Mostrar mensagens de erro
function mostrarErro(mensagem) {
    alert(`Erro: ${mensagem}`);
}

// ... código anterior mantido ...

// Fechar modal clicando fora
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modalConfirmacao');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

