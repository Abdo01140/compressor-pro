const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("imageInput");

dropZone.addEventListener("click",()=>fileInput.click());

dropZone.addEventListener("dragover",(e)=>{
e.preventDefault();
dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave",()=>{
dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop",(e)=>{
e.preventDefault();
dropZone.classList.remove("dragover");
handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener("change",()=>{
handleFiles(fileInput.files);
});

function handleFiles(files){
Array.from(files).forEach(file=>{
compressImage(file);
});
}

function compressImage(file){
const reader = new FileReader();
reader.onload = function(e){
const img = new Image();
img.src = e.target.result;

img.onload = function(){
const canvas = document.createElement("canvas");
canvas.width = img.width;
canvas.height = img.height;
const ctx = canvas.getContext("2d");
ctx.drawImage(img,0,0);

const progress = document.createElement("div");
progress.className="progress";
progress.innerHTML='<div class="progress-bar"></div>';
document.body.appendChild(progress);

canvas.toBlob(blob=>{
progress.querySelector(".progress-bar").style.width="100%";

const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download="compressed-"+file.name;
link.click();

},"image/jpeg",0.8);
};
};
reader.readAsDataURL(file);
}