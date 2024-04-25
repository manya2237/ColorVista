
const colorPickerBtn=document.querySelector("#color-picker");
const colorList=document.querySelector(".all-colors");
const clearAll=document.querySelector(".clear-all");
const pickedColors=JSON.parse(localStorage.getItem("picked-colors") || "[]");
const copyColor = elem =>{
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText="Copied";
    setTimeout(()=>elem.innerText=elem.dataset.color,1000);
}
const getColorName = (hexCode) => {
    const n_match = ntc.name(hexCode);
    return n_match[1];
};
const showColors = ()=>{
    if(!pickedColors.length) return;//Returning if there are no picked colors
    colorList.innerHTML=pickedColors.map(color=>`
    <li class="color">
    <span class="rect" style="background:${color}; border:1px solid ${color == '#ffffff' ? '#ccc' : color};"></span>
    <span class="value" data-color=${color}>${color}</span>
    <span class="name" data-color=${getColorName(color)}>${getColorName(color)}</span>
    </li>
    `).join("");//Generting li tag for the picked color and adding it to the colorlist
    document.querySelector(".picked-colors").classList.remove("hide");
    document.querySelectorAll(".color").forEach(li=>{
        li.addEventListener("click",e=>copyColor(e.currentTarget.lastElementChild));
    });
}
showColors();
const activateEyeDropper=async()=>{
    try{
        const eyeDropper=new EyeDropper();
        const {sRGBHex} = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex);
        //Add color to the list if it dosen't already exist
        if (!pickedColors.includes(sRGBHex)){
            pickedColors.push(sRGBHex);
            localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
            showColors();
        }
    }catch (error){
        console.log(error);
    }
}
//Clearing all picked colors and updating local storage
const clearAllColors = () => {
    pickedColors.length=0;
    localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
}
clearAll.addEventListener("click",clearAllColors);
colorPickerBtn.addEventListener("click",activateEyeDropper);