document.addEventListener('DOMContentLoaded', (event)=>{
  
  const container = document.querySelector(".container");
  
  const images = [
    'image1.webp',
    'image2.webp',
    'image3.webp',
    'image4.webp',
    'image5.webp',
    'image6.webp',
    'image7.webp',
    'image8.webp',
    'image1.webp',
    'image2.webp',
    'image3.webp',
    'image4.webp',
    'image5.webp',
    'image6.webp',
    'image7.webp',
    'image8.webp',
  ];

  images.sort(function() { return 0.5 - Math.random() });

  images.forEach((name,i)=>{
    if (i>0) {
      //clone last card with new image
      const card = container.querySelector('.flip-container').cloneNode(true);
      const cardImages = card.querySelectorAll('.card');
      cardImages[1].src = `img/${name}`;
      container.appendChild(card);
    }
  });

  container.addEventListener('click',(e)=>{ 
    e.target.parentNode.parentNode.parentNode.classList.toggle('opened');
  });
});
