const storage = chrome?.storage.local ?? storage.local;
const inputSearchCep = document.getElementById('search-cep');

async function handleChangeSearchCep(value) {
    await storage.set({ always_search_cep: value });
}

function registerEvents() {
    inputSearchCep.addEventListener('change', (e) => {
        handleChangeSearchCep(e.target.checked);
    });
}

function loadData() {
    storage.get('always_search_cep', function (items) {
        if (items.always_search_cep) {
            inputSearchCep.setAttribute('checked', 'checked');
        }
    });
}

function start() {
    loadData();
    registerEvents();
}

start();