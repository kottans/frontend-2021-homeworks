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

  images.forEach((name)=>{
    const img = document.createElement("img");
    img.src = `img/${name}`;
    img.classList.add('card');
    container.appendChild(img);
  });

  container.addEventListener('click',(e)=>{ 
    e.target.classList.toggle('hide');
  });
});
