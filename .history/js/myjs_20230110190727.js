
  var b = document.getElementById('sidenavbar');

function myfn() {
  

    var k = b.classList.contains("Resume-titleshow");


    if (k) {
        b.classList.remove("Resume-titleshow")
        b.classList.add("Resume-titlehide")
    } else {
        b.classList.add("Resume-titleshow")
        b.classList.remove("Resume-titlehide")
    }
}


var k =  window.innerWidth;

if (k <= 768) {
    
    var k = b.classList.contains("Resume-titleshow");

    if (k) {
        b.classList.remove("Resume-titleshow")
        b.classList.add("Resume-titleabsolutehide")
    } else {
        var x = b.classList.contains("Resume-titleabsoluteshow");

        if (x) {
            b.classList.add("Resume-titleabsolutehide")
            b.classList.remove("Resume-titleabsoluteshow ")
        } else {
            b.classList.remove("Resume-titleabsolutehide")
            b.classList.add("Resume-titleabsoluteshow ")
        }
    }
}







