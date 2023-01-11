


function myfn() {
    var b = document.getElementById('sidenavbar');

    var k = b.classList.contains("Resume-titleshow");


    if (k) {
        b.classList.remove("Resume-titleshow")
        b.classList.add("Resume-titlehide")
    } else {
        b.classList.add("Resume-titleshow")
        b.classList.remove("Resume-titlehide")
    }
}


var k = screen.width;

if (k == '768px') {
    var b = document.getElementById('sidenavbar');
    var k = b.classList.contains("Resume-titleshow");

     if(k)
     {
        b.classList.remove("Resume-titleshow")
        b.classList.add("Resume-titleabsolutehide")
     }else{
        b.classList.remove("Resume-titleabsolutehide")
        b.classList.add("Resume-titleabsoluteshow ")
     }
}







