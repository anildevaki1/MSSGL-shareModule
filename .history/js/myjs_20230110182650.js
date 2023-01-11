


    function myfn() {
           var b=document.getElementById('sidenavbar');

            var k=b.classList.forEach(e=>{
                if(e=="Resume-titleshow")
                {
                   return true;
                } 
            })
                if(b.classList=="Resume-titleshow")
                {
                    b.classList.remove("Resume-titleshow")
                    b.classList.add("Resume-titlehide")
                }else{
                    b.classList.add("Resume-titleshow")
                    b.classList.remove("Resume-titlehide")


                }
           
    }
