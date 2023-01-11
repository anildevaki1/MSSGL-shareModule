


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
