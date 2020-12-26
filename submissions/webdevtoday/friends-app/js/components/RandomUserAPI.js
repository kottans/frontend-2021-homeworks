export class RandomUserAPI {
    constructor(url_settings) {
        this.url_settings = url_settings;

        this.url = new URL(this.url_settings.main_url);
        this.url_settings.params.forEach(param => {
            this.url.searchParams.set(param.key, param.value);
        });
    }

    async getUsersPromise() {
        const res = await fetch(this.url);
        if (res.ok) { // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            return await res.json();
        } else {
            console.log(`Ошибка HTTP: ${res.status}`);
        }
    }
}
