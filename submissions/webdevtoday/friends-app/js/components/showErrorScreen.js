export function showErrorScreen() {
    const div = document.createElement('div');
    div.className = 'error-message';
    div.innerHTML = `
        <div class="error-message__text">Oops! Try to reload page, please!</div>
    `;
    return div;
}
