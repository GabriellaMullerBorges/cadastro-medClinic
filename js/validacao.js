
const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input),
    cep:input => recuperarCEP(input)
    }



function valida(input) {

    const tipoDeInput = input.dataset.tipo /*acessa o input, depois os datas do input e os tipos "tipo" do data*/

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
}


const tiposDeErro = [
'valueMissing',
'typeMismatch',
'patternMismatch',
'customError'
]

const mensagensDeErro = {
nome: {
    valueMissing: 'O campo de nome não pode estar vazio.'
},
email: {
    valueMissing: 'O campo de email não pode estar vazio.',
    typeMismatch: 'O email digitado não é válido.'
},
senha: {
    valueMissing: 'O campo de senha não pode estar vazio.',
    patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.'
},
dataNascimento: {
    valueMissing: 'O campo de data de nascimento não pode estar vazio.',
    customError: 'Você deve ser maior que 18 anos para se cadastrar.'
},
cpf: {
    valueMissing: 'O campo de CPF não pode estar vazio.',
    customError: 'O CPF digitado não é válido.' 
},
cep: {
    valueMissing: 'O campo de CEP não pode estar vazio.',
    patternMismatch: 'O CEP digitado não é válido.',
    customError: 'Não foi possível buscar o CEP.'
},
logradouro: {
    valueMissing: 'O campo de logradouro não pode estar vazio.'
},
cidade: {
    valueMissing: 'O campo de cidade não pode estar vazio.'
},
estado: {
    valueMissing: 'O campo de estado não pode estar vazio.'
},
preco: {
    valueMissing: 'O campo de preço não pode estar vazio.'
}
}


function mostraMensagemDeErro(tipoDeInput, input) {
let mensagem = ''
tiposDeErro.forEach(erro => {
    if(input.validity[erro]) {
        mensagem = mensagensDeErro[tipoDeInput][erro]
    }
})

return mensagem
}

function validaDataNascimento(input) {
    const nascimento = new Date(input.value)/* data recebida vai dizer o ano do nascimento para compararmos na function maioridade*/
    let mensagem = ''

    if(!maioridade(nascimento)) { /* ou seja, se o retorno é False*/
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
    }

    input.setCustomValidity(mensagem)
}

function maioridade(dataDeNascimentoAReceber) {
    const dataAtual = new Date() /* vazia para pegar data = hoje*/
    /* pegar dataRecebida e somar no ano, 18 anos*/
    const maioridade = new Date(dataDeNascimentoAReceber.getUTCFullYear() + 18, dataDeNascimentoAReceber.getUTCMonth(), dataDeNascimentoAReceber.getUTCDate()) /* o parâmetro data será preenchido com dataRecebida*/

    return maioridade <= dataAtual /* retorna um boolean, V ou F*/
}

function validaCPF(input) {

    const cpfFormatado = input.value.replace(/\D/g, '') /* \D representa um caractere que não seja um dígito numérico. É equivalente a [^\d].*/
    let mensagem = ''

    if(!checaCPFRepetido(cpfFormatado)) {
        mensagem = 'O CPF digitado não é válido.'
    }

    input.setCustomValidity(mensagem)
}

function checaCPFRepetido(cpf) {

    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]
    let cpfValido = true

    valoresRepetidos.forEach(repeticao => {
        if(repeticao == cpf) {
            cpfValido = false
        }
})

return cpfValido
}


function recuperarCEP(input) {
const cep = input.value.replace(/\D/g, '')
const url = `https://viacep.com.br/ws/${cep}/json/`
const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'content-type': 'application/json;charset=utf-8'
    }
}

if(!input.validity.patternMismatch && !input.validity.valueMissing) {
    fetch(url,options).then(
        response => response.json()
    ).then(
        data => {
            if(data.erro) {
                input.setCustomValidity('Não foi possível buscar o CEP.')
                return
            }
            input.setCustomValidity('')
            preencheCamposComCEP(data)
            return
        }
    )
}
}

function preencheCamposComCEP(data) {
const logradouro = document.querySelector('[data-tipo="logradouro"]')
const cidade = document.querySelector('[data-tipo="cidade"]')
const estado = document.querySelector('[data-tipo="estado"]')

logradouro.value = data.logradouro
cidade.value = data.localidade
estado.value = data.uf
}
