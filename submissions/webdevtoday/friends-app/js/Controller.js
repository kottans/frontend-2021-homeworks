import {Render} from './Render.js';

export class Controller {
    constructor(root, cacheInstance) {
        this.root = root;
        this.cacheInstance = cacheInstance;
        this.renderInstance = new Render( this.root );
    }

    get(controllerName, params = '') {
        if (!controllerName) {
            // this.renderInstance.render( `<h1>404 Page Not Found</h1>` );
            return false;
        }
        const firstUpperCaseLetter = controllerName[0].toUpperCase();
        const restLowerCaseLetters = controllerName.slice(1).toLowerCase();
        const firstPartControllerName = firstUpperCaseLetter + restLowerCaseLetters;
        import(`./controllers/${firstPartControllerName}Controller.js`)
            // из промиса получить все экспорты
            // так как у меня export default, то будет только один
            // вызвать метод .default(params)
            // params - это параметры запроса из адресной строки
            // создать обьект контроллера и вызвать его метод get()
            // .get() это ассинхронная функция которая возвращает результата в цепочку
            .then(controller => new controller.default(params, this.cacheInstance).get())
            // получить результат, который должен быть строкой с html
            // передать результат в функцию рендеринга
            .then(html => this.renderInstance.render(html))
            // отловить ошибки
            // ВАЖНО! разобраться с отловом ошибок, потому что происходит мигание
            // на секунду появляеться заголовок с ошибкой (<h1>404 Page Not Found</h1>)
            // а затем пропадает, похоже на то, что пока данные не загружены выполняеться .catch
            // ВАЖНО! также бывает, что происходит ошибка запроса fetch, нужно разобраться
            // возможно стоит ввести кол-во попыток подключиться, а только потом уже выбивать ошибку
            .catch(err => {
                console.error(err);
                this.renderInstance.render( `<h1>ERROR</h1>` );
            });
    }
}

