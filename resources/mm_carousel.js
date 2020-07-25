function getRandomInt(max) {
    var randomInt = Math.floor(Math.random() * Math.floor(max));
    if (randomInt === 0) {
      var randomInt = document.getElementsByClassName("images").length;
      return randomInt;
    } else {
      return randomInt;
    }
}

var imageNumber = getRandomInt(document.getElementsByClassName("images").length);
showCarousel(imageNumber);

function changeImage(n) {
  showCarousel(imageNumber += n);
}

function currentImage(n) {
  showCarousel(imageNumber = n);
}

function showCarousel(n) {
  var i;
  var slides = document.getElementsByClassName("images");
  if (n > slides.length) {imageNumber = 1}
  if (n < 1) {imageNumber = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[imageNumber-1].style.display = "block";
}

var carouselTimerCount = 10

function carouselTimer() {
  window.carouselTimerCount = window.carouselTimerCount-1
  if (window.carouselTimerCount === 0) {
    changeImage(+1);
    window.carouselTimerCount = 10;
  };
};

function resetCarouselTimer() {
  window.carouselTimerCount = 10;
}

setInterval(function(){ carouselTimer(); }, 1000);
