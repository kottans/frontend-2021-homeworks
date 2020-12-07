export default class {
    constructor() {
        console.log('Home Controller is ready');
    }

    get() {
        return `
            <h1 class='title title--underline'>Welcome to:</h1>
            
            <h2 class='title'>Task: JS DOM</h2>
            <div class='dialog'>
                <img class='dialog__img' src='images/pngfind.com-cocaine-bag-png-5072061.png' alt='man'>
                <div class='dialog__wraptext'>
                    <p class='dialog__text'>Этот сайт имеет навигацию, может сохрянять своё состояние в историю браузера, чтобы потом можно было вернуться на любую страницу снова. Также минимально реализованы роуты в адресной строке. Для страниц к которым нет доступа или вообще нету на сайте, реализована страница 404 ( или текст 404:)) )</p>
                </div>
            </div>
        `;
    }
}

