window.initializeQuickViewButtons = () => {
    document.querySelectorAll(".--product-card-v3.--august-product-card .--quick-add-trigger").forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();     
        console.log('clicked')
        // Get the product URL from the button's data attribute
        // const productUrl = button.getAttribute("data-product-url");
        
       
       
        // const productUrl = button.closest('.--product-card-v3')?.querySelector('a.--product-card-url')?.getAttribute('href') || '';   
        const productUrl = button.dataset.url;  
       

        const xproductUrl = `${productUrl}`;
        // const xproductUrl = `${productUrl}&section_id=template--17226260938818__info`;
      







        console.log("Fetch Url", xproductUrl);
        

        // Check if quick view is already open
        if (document.body.classList.contains("adding-to-cart")) {
          return;
        }
         
        if (productUrl) {
          document.body.classList.add("adding-to-cart");

          fetch(xproductUrl)
            .then((res) => res.text())
            .then((res) => {

  
              const wholehtml = new DOMParser().parseFromString(res, "text/html");
            //   const html = wholehtml.querySelector('#--custom-product-section');
            // const html = wholehtml.querySelector('#MainContent').firstElementChild;
            const html = wholehtml.querySelector('#MainContent').querySelector('section.--product-section');

              console.log("wholehtml: ",wholehtml)
              if(!html){
                console.log("html missing")
                return;
              }
              // Remove unnecessary elements
              if (html.querySelector(".pinfo-bundle-wrapper")) {
                html.querySelector(".pinfo-bundle-wrapper").remove();
              }
              if (html.querySelector(".product-faq-wrapper")) {
                html.querySelector(".product-faq-wrapper").remove();
              }
            //  Remove only for mobile
              if (window.innerWidth < 600) {
                if (html.querySelector(".pdp-media-lg")) {
                  html.querySelector(".pdp-media-lg").remove();
                }
                 if (html.querySelector(".pinfo-breadcrumb")) {
                // html.querySelector(".pinfo-breadcrumb").remove();
              }
              if (html.querySelector(".pd-shipping__info")) {
                html.querySelector(".pd-shipping__info").remove();
              }
              if (html.querySelector(".product__description.mb")) {
                html.querySelector(".product__description.mb").remove();
              }
              if (html.querySelector(".pinfo-size-guide.openPopup")) {
                html.querySelector(".pinfo-size-guide.openPopup").remove();
              }
              }
              
              if (html.querySelector("product-information")) {
                html.querySelector("product-information").setAttribute("data-update-url", "false");
              }

              // Open the product quick view and render content
              if (!productQuickView.container.classList.contains("open")) {
                productQuickView.container.open();
              }

              productQuickView.container.renderContent(
                html.querySelector("#product-information-container").innerHTML
              );
              console.log("Printed values", html)
              // window.viewerCountPastDay();
              // window.getDeliveryWindow();
            })
            .catch((err) => console.log(err))
            .finally(() => {
              // document.body.classList.remove("adding-to-cart");
            });
        }
      });
    });
  };

  document.addEventListener("DOMContentLoaded", initializeQuickViewButtons);





window.setEqualHeightv2 = function(sectionSelector, selector) {
  let section = document.querySelector(sectionSelector);
  if(!sectionSelector){
    return;
  }
  let divs = section.querySelectorAll(selector);
  let max = 0;

  // First pass: Calculate the maximum height
  divs.forEach((div) => {
    // let height = div.clientHeight;
    let temp = window.getComputedStyle(div);
    let height = parseFloat(temp.getPropertyValue("height"));
    
    if (height > max) {
      console.log("Height: ", height, " Max: ", max)
      max = height;
    } else {
      console.log("Lesser Height: ", height, " Max: ", max)
    }
  });

  // Second pass: Set all divs to the max height
  divs.forEach((div) => {
    console.log( "Set  Max: ", max)
    div.style.height = `${max}px`;
  });
}

// document.addEventListener("DOMContentLoaded", (event) => {
//   setEqualHeightv2(".sec-{{ id }}", ".--card-content-wrapper")
// });

// document.addEventListener("DOMContentLoaded", (event) => {
//   setEqualHeightv2(".product-grid-container", ".--product-info")
// });
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.key === "Esc") {
    if (productQuickView.container.classList.contains("open")) {
                productQuickView.container.close();
    }
    
  }
});

document.addEventListener("click", function (event) {
  // Get the product-quick-view element
  const quickView = document.querySelector("product-quick-view.open");
  const container = quickView ? quickView.querySelector(".pqv-container") : null;
  
  // If quickView is open and the click happened outside pqv-container
  if (quickView && container && !container.contains(event.target)) {
    const closeButton = quickView.querySelector(".pqv-close-btn");
    if (closeButton) {
      closeButton.click(); // Trigger click on the close button
    }
  }
});