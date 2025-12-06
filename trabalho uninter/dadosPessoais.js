// Continuação do arquivo dados-pessoais.js

// Modal de confirmação
function mostrarModalConfirmacao() {
    document.getElementById('modalConfirmacao').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modalConfirmacao').style.display = 'none';
}

function confirmarSalvar() {
    salvarDados();
    fecharModal();
}

// Salvar dados
function salvarDados() {
    // Coletar dados do formulário
    const form = document.getElementById('formDadosPessoais');
    const formData = new FormData(form);
    
    // Atualizar objeto de dados
    dadosPaciente.nomeCompleto = formData.get('nomeCompleto');
    dadosPaciente.dataNascimento = formData.get('dataNascimento');
    dadosPaciente.cpf = formData.get('cpf');
    dadosPaciente.rg = formData.get('rg');
    dadosPaciente.sexo = formData.get('sexo');
    dadosPaciente.estadoCivil = formData.get('estadoCivil');
    dadosPaciente.email = formData.get('email');
    dadosPaciente.telefone = formData.get('telefone');
    dadosPaciente.telefoneAlternativo = formData.get('telefoneAlternativo');
    dadosPaciente.cep = formData.get('cep');
    dadosPaciente.logradouro = formData.get('logradouro');
    dadosPaciente.numero = formData.get('numero');
    dadosPaciente.complemento = formData.get('complemento');
    dadosPaciente.bairro = formData.get('bairro');
    dadosPaciente.cidade = formData.get('cidade');
    dadosPaciente.estado = formData.get('estado');
    
    // Salvar dados originais para possível cancelamento
    dadosOriginais = JSON.parse(JSON.stringify(dadosPaciente));
    
    // Mostrar mensagem de sucesso
    mostrarMensagemSucesso('Dados atualizados com sucesso!');
    
    // Em um sistema real, aqui você enviaria os dados para o servidor
    console.log('Dados salvos:', dadosPaciente);
    
    // Opcional: Atualizar nome no cabeçalho se houver
    atualizarNomeNoCabecalho();
}

// Função para mostrar mensagem de sucesso
function mostrarMensagemSucesso(mensagem) {
    const mensagemElement = document.getElementById('mensagemSucesso');
    
    if (mensagemElement) {
        mensagemElement.textContent = mensagem;
        mensagemElement.style.display = 'flex';
        
        // Esconder a mensagem após 5 segundos
        setTimeout(() => {
            mensagemElement.style.display = 'none';
        }, 5000);
    }
}

// Atualizar nome no cabeçalho
function atualizarNomeNoCabecalho() {
    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const nomeDisplay = document.querySelector('.nome-usuario');
    
    if (nomeDisplay) {
        // Extrair primeiro nome
        const primeiroNome = nomeCompleto.split(' ')[0];
        nomeDisplay.textContent = primeiroNome;
    }
}

// Cancelar alterações
function cancelarAlteracoes() {
    if (confirmarCancelamento()) {
        restaurarDadosOriginais();
        limparTodosErros();
        mostrarMensagemSucesso('Alterações canceladas. Dados restaurados.');
    }
}

function confirmarCancelamento() {
    const alteracoes = verificarAlteracoes();
    
    if (!alteracoes) {
        return true; // Não há alterações para cancelar
    }
    
    return confirm('Você tem alterações não salvas. Deseja realmente cancelar?');
}

function verificarAlteracoes() {
    const form = document.getElementById('formDadosPessoais');
    const formData = new FormData(form);
    
    for (let [key, value] of formData.entries()) {
        if (dadosOriginais[key] !== value) {
            return true;
        }
    }
    
    return false;
}

function restaurarDadosOriginais() {
    // Restaurar dados originais nos campos do formulário
    document.getElementById('nomeCompleto').value = dadosOriginais.nomeCompleto;
    document.getElementById('dataNascimento').value = dadosOriginais.dataNascimento;
    document.getElementById('cpf').value = dadosOriginais.cpf;
    document.getElementById('rg').value = dadosOriginais.rg;
    
    // Restaurar sexo
    const sexoRadios = document.querySelectorAll('input[name="sexo"]');
    sexoRadios.forEach(radio => {
        radio.checked = (radio.value === dadosOriginais.sexo);
    });
    
    // Restaurar estado civil
    document.getElementById('estadoCivil').value = dadosOriginais.estadoCivil;
    
    // Restaurar contato
    document.getElementById('email').value = dadosOriginais.email;
    document.getElementById('telefone').value = dadosOriginais.telefone;
    document.getElementById('telefoneAlternativo').value = dadosOriginais.telefoneAlternativo;
    
    // Restaurar endereço
    document.getElementById('cep').value = dadosOriginais.cep;
    document.getElementById('logradouro').value = dadosOriginais.logradouro;
    document.getElementById('numero').value = dadosOriginais.numero;
    document.getElementById('complemento').value = dadosOriginais.complemento;
    document.getElementById('bairro').value = dadosOriginais.bairro;
    document.getElementById('cidade').value = dadosOriginais.cidade;
    document.getElementById('estado').value = dadosOriginais.estado;
    
    // Atualizar objeto atual com os dados originais
    dadosPaciente = JSON.parse(JSON.stringify(dadosOriginais));
}

function limparTodosErros() {
    const erros = document.querySelectorAll('.mensagem-erro');
    erros.forEach(erro => erro.remove());
    
    const camposInvalidos = document.querySelectorAll('.campo-invalido');
    camposInvalidos.forEach(campo => campo.classList.remove('campo-invalido'));
    
    const camposValidos = document.querySelectorAll('.campo-valido');
    camposValidos.forEach(campo => campo.classList.remove('campo-valido'));
}

// Validar formulário onBlur (validação em tempo real)
function configurarValidacaoTempoReal() {
    const campos = document.querySelectorAll('#formDadosPessoais input, #formDadosPessoais select');
    
    campos.forEach(campo => {
        campo.addEventListener('blur', function() {
            if (this.hasAttribute('required') && this.value.trim()) {
                if (this.id === 'email' && !validarEmail(this.value)) {
                    mostrarErro(this, 'E-mail inválido');
                } else if (this.id === 'cpf' && !validarCPF(this.value)) {
                    mostrarErro(this, 'CPF inválido');
                } else if (this.id === 'telefone' && !validarTelefone(this.value)) {
                    mostrarErro(this, 'Telefone inválido');
                } else {
                    limparErro(this);
                    this.classList.add('campo-valido');
                }
            }
        });
    });
}

// Funções auxiliares para formatação
function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarTelefone(telefone) {
    const numero = telefone.replace(/\D/g, '');
    
    if (numero.length === 11) {
        return numero.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numero.length === 10) {
        return numero.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return telefone;
}

// Inicializar quando a página carregar (completo)
document.addEventListener('DOMContentLoaded', function() {
    aplicarMascaras();
    configurarEventos();
    configurarNavegacaoAtiva();
    configurarValidacaoTempoReal();
    
    // Inicializar dados originais com os valores atuais do formulário
    setTimeout(() => {
        const form = document.getElementById('formDadosPessoais');
        if (form) {
            const formData = new FormData(form);
            for (let [key, value] of formData.entries()) {
                if (dadosPaciente.hasOwnProperty(key)) {
                    dadosOriginais[key] = value;
                }
            }
        }
    }, 100);
});