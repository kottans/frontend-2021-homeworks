export class Render {
    constructor(main) {
        this.main = main;
    }

    render(content) {
        this.main.innerHTML = content;
    }
}