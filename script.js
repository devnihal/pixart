"use strict"
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
if(innerWidth>500){
    canvas.width=600;
    canvas.height=300;
}
else{
    canvas.width=innerWidth-(innerWidth%20)-40;
    canvas.height=500; 
}
let gear = `
<svg width="16" height="16" fill="white" class="bi bi-gear-wide-connected" viewBox="0 0 16 16">
  <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z"/>
</svg>
`
let init=false;
ctx.fillStyle="#000";
canvas.classList.add("canvas");
let pen="red";
let grid=false;
// let colors=["red","blue","violet","green","yellow","orange","brown"];
const colors = ["Black", "White","Red", "Orange", "Yellow", "Green", "Teal", "Blue", "Indigo", "Purple", "Magenta", "Maroon", "Brown", "Navy"];
let brush=`
<svg  width="30" height="30" fill="white" class="whbrush" viewBox="0 0 16 16">
  <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04M4.705 11.912a1.2 1.2 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.4 3.4 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3 3 0 0 0 .126-.75zm1.44.026c.12-.04.277-.1.458-.183a5.1 5.1 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005zm3.582-3.043.002.001h-.002z"/>
</svg>`;
let blbrush=`
<svg  width="30" height="30" fill="black" class="whbrush" viewBox="0 0 16 16">
  <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04M4.705 11.912a1.2 1.2 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.4 3.4 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3 3 0 0 0 .126-.75zm1.44.026c.12-.04.277-.1.458-.183a5.1 5.1 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005zm3.582-3.043.002.001h-.002z"/>
</svg>`;

  
ctx.fillRect(0,0,canvas.width,canvas.height);
let block={
    width:20,
    height:20
};
let colarea = document.querySelector(".colors");
function palatte(){
    for (let i = 0; i < colors.length; i++) {
        let span = document.createElement("span");
        span.classList.add("color");
        span.style.backgroundColor=colors[i];
        if(colors[i]=="Red"&&!init){
            init=true;
            span.innerHTML=brush;
            span.classList.add("selcol");
        }
        span.addEventListener("click",()=>{
            if(document.querySelector(".selcol")){
                document.querySelector(".selcol").innerHTML="";
                document.querySelector(".selcol").classList.toggle("selcol");
            }
            if(span.style.backgroundColor=="white"){
                span.innerHTML=blbrush;
                span.classList.add("selcol");
            }
            else{
                span.innerHTML=brush;
                span.classList.add("selcol");
            }
            pen=span.style.backgroundColor;
        })
        colarea.appendChild(span);    
    }
    let span = document.createElement("span");
    span.classList.add("color");
    span.style.backgroundColor="transparent";
    span.innerHTML=gear;
    span.style.marginLeft="20px";
    span.addEventListener("click",settings);
    colarea.appendChild(span);    
}
palatte();
let drawing=false;
let cols = canvas.width/block.width;
let rows = canvas.height/block.height;
let blocks=[[]];
class Block{
    constructor(x,y,color="white"){
        this.width=20;
        this.height=20;
        this.x=x*this.width;
        this.y=y*this.height;
        this.color=color;
    }
    draw(ctx){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
        // ctx.strokeRect(this.x,this.y,this.width,this.height);
    }
    stroke(ctx){
        ctx.strokeStyle="black";
        ctx.strokeRect(this.x,this.y,this.width,this.height);
        // ctx.strokeRect(this.x,this.y,this.width,this.height);
    }
    fill(color){
        this.color=color;
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}
for (let i = 0; i < rows ; i++) {
    blocks.push([]);
    for (let j = 0; j < cols ;  j++) {
        // ctx.fillStyle="white";
        // ctx.fillRect(j*block.width,i*block.height,block.width,block.height);
        // ctx.strokeRect(j*block.width,i*block.height,block.width,block.height);
        blocks[i].push(new Block(j,i));
    }
}
for(let i=0;i<blocks.length;i++){
    for(let j=0;j<blocks[i].length;j++){
        blocks[i][j].draw(ctx);
    }
}
let mouse={
    X:0,
    Y:0
}
canvas.addEventListener("mousemove",(e)=>{
    if(grid){
        for(let i=0;i<blocks.length;i++){
            for(let j=0;j<blocks[i].length;j++){
                blocks[i][j].stroke(ctx);
            }
        }
    }
    if(drawing){
        mouse.X=e.clientX-canvas.offsetLeft;
        // mouse.Y=e.clientY-canvas.offsetTop+canvas.height/2;
        mouse.Y=e.clientY-canvas.offsetTop;
        for(let i=0;i<blocks.length;i++){
            for(let j=0;j<blocks[i].length;j++){
                if(mouse.X>blocks[i][j].x&&mouse.X<blocks[i][j].x+blocks[i][j].width&&mouse.Y>blocks[i][j].y&&mouse.Y<blocks[i][j].y+blocks[i][j].height){
                    blocks[i][j].fill(pen);
                }
            }
        }
    }
})
canvas.addEventListener("mousedown",()=>{
    drawing=true;
})
canvas.addEventListener("mouseup",()=>{
    drawing=false;
})


function showGrid(){
    grid = true;
    for(let i=0;i<blocks.length;i++){
        for(let j=0;j<blocks[i].length;j++){
            blocks[i][j].stroke(ctx);
        }
    }
}
function hideGrid(){
    grid = false;
    for(let i=0;i<blocks.length;i++){
        for(let j=0;j<blocks[i].length;j++){
            blocks[i][j].draw(ctx);
        }
    }
}
canvas.addEventListener("touchmove",(e)=>{
    if(grid){
        for(let i=0;i<blocks.length;i++){
            for(let j=0;j<blocks[i].length;j++){
                blocks[i][j].stroke(ctx);
            }
        }
    }
    if(drawing){
        mouse.X=e.touches[0].clientX-canvas.offsetLeft;
        // mouse.Y=e.clientY-canvas.offsetTop+canvas.height/2;
        mouse.Y=e.touches[0].clientY-canvas.offsetTop;
        for(let i=0;i<blocks.length;i++){
            for(let j=0;j<blocks[i].length;j++){
                if(mouse.X>blocks[i][j].x&&mouse.X<blocks[i][j].x+blocks[i][j].width&&mouse.Y>blocks[i][j].y&&mouse.Y<blocks[i][j].y+blocks[i][j].height){
                    blocks[i][j].fill(pen);
                }
            }
        }
    }
})
canvas.addEventListener("touchstart",()=>{
    drawing=true;
})
canvas.addEventListener("touchend",()=>{
    drawing=false;
})
function settings(){
    let set = document.querySelector(".setings-bg");
    set.style.display="flex";
}

function gridstate(el){
    if(el.checked){
        showGrid();
    }
    else{
        hideGrid();
    }
}
function closeset(){
    let set = document.querySelector(".setings-bg");
    set.style.display="none";
}
closeset();

function download(){
    let x = false;
    if(grid){
        x=true;
    }
    hideGrid();
    var dataURL = canvas.toDataURL('image/png');
    var downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'canvas_image.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    closeset();
    if(x){
        showGrid();
    }
}
//feature yet to come
function data(){
    console.log(blocks);
}