


    function myfn() {
           var b=document.getElementById('sidenavbar');

                if(b.classList[0]=="Resume-titleshow")
                {
                    b.style.left='0% !important';
                }else{
                    b.classList.remove("Resume-titleshow")
                    b.classList.add("Resume-titlehide")


                }
           
    }
