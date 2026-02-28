self.addEventListener("install", e=>{
e.waitUntil(
caches.open("compressor-cache").then(cache=>{
return cache.addAll(["/","index.html"]);
})
);
});