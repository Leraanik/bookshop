const catalogs = document.querySelectorAll(".catalog_catalog");
const dots = document.querySelectorAll(".slider__dots-item");

let currentIndex = 0;

function showSlide(index) {
    catalogs.forEach((catalog, i) => {
        catalog.classList.remove('catalog_active');
        dots[i].classList.remove('dots_active');
    });

    
    catalogs[index].classList.add('catalog_active');
    dots[index].classList.add('dots_active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % catalogs.length; 
    showSlide(currentIndex); 
}


setInterval(nextSlide, 5000);
showSlide(currentIndex);