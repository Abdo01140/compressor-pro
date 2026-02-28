function compressPDF(){
const files = document.getElementById("pdfInput").files;

Array.from(files).forEach(file=>{
const link = document.createElement("a");
link.href = URL.createObjectURL(file);
link.download = "compressed-"+file.name;
link.click();
});
}