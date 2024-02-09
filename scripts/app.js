function validateCpf(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/g.test(cpf)) {
        return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let digito1 = 11 - (soma % 11);
    if (digito1 > 9) {
        digito1 = 0;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    let digito2 = 11 - (soma % 11);
    if (digito2 > 9) {
        digito2 = 0;
    }

    return parseInt(cpf.charAt(9)) === digito1 && parseInt(cpf.charAt(10)) === digito2;
}

function validateCnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/g.test(cnpj)) {
        return false;
    }

    const pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let soma = 0;
    for (let i = 0; i < 12; i++) {
        soma += parseInt(cnpj.charAt(i)) * pesos[i + 1];
    }

    const digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    soma = 0;
    for (let i = 0; i < 13; i++) {
        soma += parseInt(cnpj.charAt(i)) * pesos[i];
    }

    const digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return parseInt(cnpj.charAt(12)) === digito1 && parseInt(cnpj.charAt(13)) === digito2;
}

function handleChangeCpf(value) {
    if (!value) {
        return;
    }

    const isValid = value?.length == 18 ? this.validateCnpj(value) : this.validateCpf(value);

    const input = document.getElementById('cpf');
    const parentInputElement = input.parentElement;

    switch (isValid) {
        case true:
            input.style.setProperty('color', 'green');
            parentInputElement.style.setProperty('border', 'solid');
            parentInputElement.style.setProperty('border-color', 'green');
            break;

        default:
            input.style.setProperty('color', 'red');
            parentInputElement.style.setProperty('border', 'solid');
            parentInputElement.style.setProperty('border-color', 'red');
            break;
    }
}

function handleChangeCep(value) {
    const inputCep = document.getElementById('cep');
    const container = inputCep.parentNode?.parentNode?.parentNode?.parentNode?.parentNode;
    if (container) {
        const button = container.querySelector('button');
        button.click();
    }
}

function sugestSeller() {
    const inputSeller = document.getElementById('seller');

    for (const div of document.querySelectorAll("div")) {
        if (!(div.textContent.includes("Olá, ") && (div.querySelector('span')))) {
            continue;
        }

        const name = div.querySelector('span').textContent;
        if (!name) {
            continue;
        }

        const elements = document.getElementsByClassName('el-select-dropdown__item');
        for (const element of elements) {
            if (element.textContent !== name) {
                continue;
            }

            element.classList.add('selected');
            inputSeller.value = name;
        }
    }
}

function registerEvents() {
    const inputCpf = document.getElementById('cpf');
    inputCpf.addEventListener('change', (e) => {
        handleChangeCpf(e.target.value);
    });


    chrome.storage.local.get(["always_search_cep"]).then((result) => {
        const inputCep = document.getElementById('cep');
        if ((result?.always_search_cep ?? true)) {
            inputCep.addEventListener('change', (e) => {
                handleChangeCep(e.target.value);
            });
        }
    });

    chrome.storage.local.get(["always_sugest_seller"]).then((result) => {
        if ((result?.always_sugest_seller ?? true)) {
            sugestSeller();
        }
    });

}

async function start() {


    setTimeout(registerEvents, 2000);
}

start();