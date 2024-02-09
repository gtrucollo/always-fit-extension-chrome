function handleChangeSugestSeller(value) {
    chrome.storage.local.set({ always_sugest_seller: value });
}

function handleChangeSearchCep(value) {
    chrome.storage.local.set({ always_search_cep: value });
}

function registerEvents() {
    const inputSugestSeller = document.getElementById('sugest-seller');
    inputSugestSeller.addEventListener('change', (e) => {
        handleChangeSugestSeller(e.target.checked);
    });

    const inputSearchCep = document.getElementById('search-cep');
    inputSearchCep.addEventListener('change', (e) => {
        handleChangeSearchCep(e.target.checked);
    });
}

function loadData() {
    const inputSugestSeller = document.getElementById('sugest-seller');
    const inputSearchCep = document.getElementById('search-cep');

    chrome.storage.local.get(["always_sugest_seller"]).then((result) => {
        inputSugestSeller.checked = result?.always_sugest_seller ?? true;
    });

    chrome.storage.local.get(["always_search_cep"]).then((result) => {
        inputSearchCep.checked = result?.always_search_cep ?? true;
    });
}

async function start() {
    loadData();
    setTimeout(registerEvents, 2000);
}

start();