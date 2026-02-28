import { createFFmpeg, fetchFile } from 
'https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.6/dist/ffmpeg.min.js';

const ffmpeg = createFFmpeg({ log: true });

document.getElementById("videoInput").addEventListener("change", async function(){
const files = this.files;

if(!ffmpeg.isLoaded()){
await ffmpeg.load();
}

for(const file of files){

if(file.size > 700 * 1024 * 1024){
alert("File exceeds 700MB limit");
continue;
}

ffmpeg.FS("writeFile", file.name, await fetchFile(file));

await ffmpeg.run(
"-i", file.name,
"-vcodec", "libx264",
"-crf", "28",
"compressed-"+file.name
);

const data = ffmpeg.FS("readFile", "compressed-"+file.name);

const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
const link = document.createElement("a");
link.href = URL.createObjectURL(videoBlob);
link.download = "compressed-"+file.name;
link.click();
}
});