export class ImageService {
    constructor(){
        this.totalImages = 0;
        this.imagesLoaded = 0;
        this.uniqueFemaleImages = 60;
        this.uniqueMaleImages = 50;
        this.images = [];
        this.borderImagePath = 'images/user-card-images/user-card-border.png';
        this.backImagePath = 'images/user-card-images/user-card-back-background.jpg';
        this.imageAlts = {
            front: 'user-image',
            border: 'old-gold-border-image',
            back: 'old-texture-image'
        };
        this.imageClasses = {
            border: 'border-image',
            front: 'background-image',
            back: 'background-image'
        };
    }

    loadImages(users){
        return new Promise((resolve, reject) => {
            users = users.map(user => {
                user.frontImage = this.createImage(
                    this.getFrontImagePath(user.gender),
                    this.imageAlts.front,
                    this.imageClasses.front
                );

                user.frontBorderImage = this.createImage(
                    this.borderImagePath,
                    this.imageAlts.border,
                    this.imageClasses.border
                );

                user.backBorderImage = this.createImage(
                    this.borderImagePath,
                    this.imageAlts.border,
                    this.imageClasses.border
                );

                user.backImage = this.createImage(
                    this.backImagePath,
                    this.imageAlts.back,
                    this.imageClasses.back
                );

                this.images.push(
                    user.frontImage, user.frontBorderImage,
                    user.backBorderImage, user.backImage
                );

                return user;
            });

            this.images.forEach(image => {
                image.onload = () => {
                    this.imagesLoaded++;
                    if(this.imagesLoaded === this.totalImages){
                        resolve(users);
                    }
                };

                image.onloadError = reject;
            });
        });
    }

    getFrontImagePath(gender){
        if(gender === 'female'){
            const imageNumber = this.defineImageNumber(this.uniqueFemaleImages);
            return `images/female-images/female${imageNumber}.jpeg`;
        }
        else {
            const imageNumber = this.defineImageNumber(this.uniqueMaleImages);
            return `images/male-images/male${imageNumber}.jpeg`;
        }
    }

    defineImageNumber(max, min = 1){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createImage(imagePath, alt, className){
        const image = document.createElement('img');
        image.setAttribute('src', imagePath);
        image.setAttribute('alt', alt);
        image.classList.add(className);

        this.totalImages++;
        return image;
    }
}
