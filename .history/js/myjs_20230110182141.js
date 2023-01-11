


    function myfn() {
           var b=document.getElementById('sidenavbar');

                if(b.classList[0]=="Resume-titleshow")
                {
                    b.classList.remove("Resume-titleshow")
                    b.classList.add("Resume-titlehide")
                }else{
                    b.classList.add("Resume-titleshow")
                    b.classList.remove("Resume-titlehide")


                }
           
    }
