export class ImageService {
    constructor(){
        this.totalImagesCount = 0;
        this.imagesLoadedCount = 0;
        this.uniqueFemaleImagesCount = 60;
        this.uniqueMaleImagesCount = 50;
        this.images = [];

        this.borderImagePath = 'images/user-card-images/user-card-border.png';
        this.backImagePath = 'images/user-card-images/user-card-back-background.jpg';
    }

    get femaleImagePath(){
        const imageNumber = this.defineImageNumber(this.uniqueFemaleImagesCount);
        return `images/female-images/female${imageNumber}.jpeg`;
    }
    get maleImagePath(){
        const imageNumber = this.defineImageNumber(this.uniqueMaleImagesCount);
        return `images/male-images/male${imageNumber}.jpeg`;
    }

    defineImageNumber(max, min = 1){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    loadImages(users){
        return new Promise((resolve, reject) => {
            users = users.map(user => {
                user.frontImage = this.createImage(this[`${user.gender}ImagePath`],
                    'user-image', 'user-card__front-background-image', 'background-image');

                user.frontBorderImage = this.createImage(this.borderImagePath,
                    'old-gold-border-image', 'user-card__front-border-image', 'border-image');

                user.backBorderImage = this.createImage(this.borderImagePath,
                    'old-gold-border-image', 'user-card__back-border-image', 'border-image');

                user.backImage = this.createImage(this.backImagePath,
                    'old-texture-image', 'user-card__back-background-image', 'background-image');

                this.images.push(
                    user.frontImage, user.frontBorderImage,
                    user.backBorderImage, user.backImage
                );

                return user;
            });

            this.images.forEach(image => {
                image.onload = () => {
                    this.imagesLoadedCount++;
                    if(this.imagesLoadedCount === this.totalImagesCount) resolve(users)
                };

                image.onloadError = e => reject(e);
            });
        });
    }

    createImage(imagePath, alt, ...classList){
        const image = document.createElement('img');
        image.setAttribute('src', imagePath);
        image.setAttribute('alt', alt);
        image.classList.add(...classList);

        this.totalImagesCount++;
        return image;
    }
}
