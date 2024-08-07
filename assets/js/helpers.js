// js/helpers.js
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        console.warn('Não há página anterior no histórico.');
    }
}

// Exportar a função goBack
export { goBack };
