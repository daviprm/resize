// vars
const upload = document.querySelector("#upload");
const result = document.querySelector("#result");

const result_container = document.querySelector("#result");

const label_upload = document.getElementById("label_upload");
const buttons = document.getElementById("buttons");
const download = document.getElementById("download");
const cancel = document.getElementById("cancel");

// loading
const loading_container = document.getElementById("loading_container");

// resize function

function resize() {
  
  const file = upload.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (event) {
    
    const elementImage = document.createElement("img");
    elementImage.src = event.target.result;
    elementImage.onload = function (e) {
      
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 600;
      const scaleSize = MAX_WIDTH / e.target.width;
      canvas.width = MAX_WIDTH;
      canvas.height = e.target.height * scaleSize;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
      const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
      // buttons and label
      label_upload.style.display = "none";
      
      loading_container.style.display = "flex";
      setTimeout(function () {
        loading_container.style.display = "none";
        result.src = srcEncoded;
        buttons.style.display = "flex";
        download.href = srcEncoded;
        download.download = 'resized_image';
      }, 2000);

    };
    
  };
  
}

// click events
window.addEventListener('click', function(e) {
  
  if(cancel.contains(e.target)) {
    
    label_upload.style.display = "flex";
    buttons.style.display = "none";
    result.src = "";
    
  }
  
});