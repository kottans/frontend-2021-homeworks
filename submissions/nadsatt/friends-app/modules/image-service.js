export class ImageService {
    constructor(){
        this.imagesLoadedCount = 0;
        this.totalImages = 400;
        const femaleNumber = 60;
        const maleNumber = 40;
        const usersNumber = 100;

        this.femaleImagePaths = [...Array(femaleNumber).keys()].map(i => `images/female-images/female${++i}.jpeg`);
        this.maleImagePaths = [...Array(maleNumber).keys()].map(i => `images/male-images/male${++i}.jpeg`);
        this.borderImagePaths = [...Array(usersNumber).keys()].map(() => 'images/user-card-images/user-card-border.png');
        this.backImagePaths = [...Array(usersNumber).keys()].map(() => 'images/user-card-images/user-card-back-background.jpg');
    }

    loadImages(){
        return new Promise((resolve) => {
            this.frontImages = this.femaleImagePaths.concat(this.maleImagePaths)
                .map(imagePath => this.createImage(imagePath, 'user-image',
                                               'user-card__front-background-image', 'background-image'));

            this.frontBorderImages = this.borderImagePaths
                .map(imagePath => this.createImage(imagePath, 'old-gold-border-image',
                                               'user-card__front-border-image', 'border-image'));

            this.backBorderImages = this.borderImagePaths
                .map(imagePath => this.createImage(imagePath, 'old-gold-border-image',
                                               'user-card__back-border-image', 'border-image'));

            this.backImages = this.backImagePaths
                .map(imagePath => this.createImage(imagePath, 'old-texture-image',
                                               'user-card__back-background-image', 'background-image'));

            [...this.frontImages, ...this.frontBorderImages, ...this.backBorderImages, ...this.backImages]
                .forEach(image => image.onload = () => {
                    this.imagesLoadedCount++;
                    if(this.imagesLoadedCount === this.totalImages) resolve();
                });
        });
    }

    createImage(imagePath, alt, ...classList){
        const image = document.createElement('img');
        image.setAttribute('src', imagePath);
        image.setAttribute('alt', alt);
        image.classList.add(...classList);

        return image;
    }
}
