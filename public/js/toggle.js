   let taxToggle = document.getElementById("flexSwitchCheckDefault");
    taxToggle.addEventListener("change", () => {
      let taxInfoElements = document.querySelectorAll("#tax-info");
      if (taxToggle.checked) {
        taxInfoElements.forEach((elem) => {
          elem.style.display = "inline";
        });
      } else {
        taxInfoElements.forEach((elem) => {
          elem.style.display = "none";
        });
      }
    });
