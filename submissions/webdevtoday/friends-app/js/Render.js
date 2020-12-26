export class Render {
    constructor(main) {
        this.main = main;
    }

    render(content) {
        // this.main.innerHTML = content;
        // this.main.insertAdjacentHTML('beforeend', content);
        // При предыдущих способах слетали обработчики событий
        if (typeof content === 'string') {
            this.main.innerHTML = content;
        } else {
            this.main.innerHTML = '';
            this.main.append(content);
        }
    }
}

