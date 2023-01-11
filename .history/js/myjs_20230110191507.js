

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

$(document).ready(function () {


    setInterval(function () {
    var k = window.innerWidth;

    if (k <= 768) {

        var b = document.getElementById('sidenavbar');

        var k = b.classList.contains("Resume-titleshow");

        if (k) {
            b.classList.remove("Resume-titleshow")
            b.classList.add("Resume-titleabsolutehide")
        } else {
            var x = b.classList.contains("Resume-titleabsoluteshow");

            if (x) {
                b.classList.add("Resume-titleabsolutehide")
                b.classList.remove("Resume-titleabsoluteshow")
            }  
        }

    }

})
},1000)






