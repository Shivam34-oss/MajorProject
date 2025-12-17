   let taxToggle = document.getElementById("flexSwitchCheckDefault");
   
   // security check 
   if(taxToggle){
    taxToggle.addEventListener("change",()=>{
      let taxInfoElements = document.querySelectorAll("#tax-info");
      if(taxToggle.checked){
        taxInfoElements.forEach((elem)=>{
          elem.style.display = "inline";
        });
      }else{
        taxInfoElements.forEach((elem)=>{
          elem.style.display = "none";
        });
      }
    });
   }
