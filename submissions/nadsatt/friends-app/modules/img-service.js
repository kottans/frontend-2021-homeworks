export class ImgService {
    constructor(){
        this.imgsLoadedCount = 0;
        this.totalImgs = 400;
        const femaleNumber = 60;
        const maleNumber = 40;
        const usersNumber = 100;

        this.femaleImgPaths = [...Array(femaleNumber).keys()].map(i => `images/female/female${++i}.jpeg`);
        this.maleImgPaths = [...Array(maleNumber).keys()].map(i => `images/male/male${++i}.jpeg`);
        this.borderImgPaths = [...Array(usersNumber).keys()].map(() => 'images/user-card-imgs/user-card-border.png');
        this.backImgPaths = [...Array(usersNumber).keys()].map(() => 'images/user-card-imgs/user-card-back-bg.jpg');
    }

    loadImgs(){
        return new Promise((resolve) => {
            this.userImgs = this.femaleImgPaths.concat(this.maleImgPaths)
                .map(imgPath => this.createImg(imgPath, 'user-picture',
                                               'user-card__front-bg-img', 'bg-img'));

            this.frontBorderImgs = this.borderImgPaths
                .map(imgPath => this.createImg(imgPath, 'card-border-picture',
                                               'user-card__front-border-img', 'border-img'));

            this.backBorderImgs = this.borderImgPaths
                .map(imgPath => this.createImg(imgPath, 'card-border-picture',
                                               'user-card__back-border-img', 'border-img'));

            this.backImgs = this.backImgPaths
                .map(imgPath => this.createImg(imgPath, 'user-picture',
                                               'user-card__back-bg-img', 'bg-img'));

            [...this.userImgs, ...this.frontBorderImgs, ...this.backBorderImgs, ...this.backImgs]
                .forEach(img => img.onload = () => {
                    this.imgsLoadedCount++;
                    if(this.imgsLoadedCount === this.totalImgs) resolve();
                });
        });
    }

    createImg(imgPath, alt, ...classList){
        const img = document.createElement('img');
        img.setAttribute('src', imgPath);
        img.setAttribute('alt', alt);
        img.classList.add(...classList);

        return img;
    }
}
