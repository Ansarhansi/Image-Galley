

window.onload = function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        const img = new Image();
        img.src = thumbnail.src; 
    });
};document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');

    let currentIndex = 0;
    const animations = ['zoom-animation', 'rotate-animation', 'slide-right-animation', 'slide-left-animation'];
    let currentAnimation = 0;
    

    function updateMainImage(index) {
        mainImage.style.opacity = '0';
        mainImage.classList.remove(...animations);

        setTimeout(() => {
            mainImage.src = thumbnails[index].src;
            mainImage.style.opacity = '1';

            const animationClass = animations[currentAnimation];
            mainImage.classList.add(animationClass);
            currentAnimation = (currentAnimation + 1) % animations.length;
        }, 300);

        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
        currentIndex = index;
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => updateMainImage(index));
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateMainImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        updateMainImage(currentIndex);
    });

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
});
