var mobileMenu = false;

function toggleMobileMenu() {
  if (window.mobileMenu === false) {
    document.getElementById("mobmenuitems").style.display = "flex";
    window.mobileMenu = true;
    document.getElementById("mobmenuicon").name = "close-sharp";
  } else {
    document.getElementById("mobmenuitems").style.display = "none";
    window.mobileMenu = false;
    document.getElementById("mobmenuicon").name = "menu-sharp";
  }
}

$(document).ready(function(){
  $(window).resize(function(){
    if (window.innerWidth > 899) {
      if (window.mobileMenu === true) {
        toggleMobileMenu();
        console.log("TOGGLE")
      }
    }
  });
});
