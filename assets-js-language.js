const translations = {
en:{title:"Fast & Professional File Compression"},
ar:{title:"ضغط ملفات احترافي وسريع"},
es:{title:"Compresión profesional rápida"},
zh:{title:"快速专业压缩"}
};

document.getElementById("languageSelect")?.addEventListener("change",e=>{
setLanguage(e.target.value);
});

function setLanguage(lang){
document.querySelectorAll("[data-lang]").forEach(el=>{
el.innerText = translations[lang][el.dataset.lang];
});
localStorage.setItem("lang",lang);
}

window.onload=()=>{
let saved = localStorage.getItem("lang") || "en";
setLanguage(saved);
};