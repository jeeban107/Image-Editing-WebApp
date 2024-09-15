let choose_img_btn = document.querySelector(".select-img button");

let choose_input = document.querySelector(".select-img input");

let img_src = document.querySelector(".upload-img img");

let filter_btn =document.querySelectorAll(".icon-list button");

let slider = document.querySelector(".slider input");

let filter_name = document.querySelector(".filter-info .name");

let slider_value = document.querySelector(".filter-info .value");

let rotate_btn = document.querySelectorAll(".icon-list2 button");

let reset = document.querySelector(".reset");

let save =document.querySelector(".save");

let brightness = 100,
contrast=100,
saturate=100,
invert=0,
blur=0,
rotate=0,
flip_x=1,
flip_y=1;

//click on Upload Button
choose_img_btn.addEventListener("click",() => choose_input.click());

//Image Upload
choose_input.addEventListener('change',()=> {
    let file = choose_input.files[0];
    if(!file) return;
    img_src.src=URL.createObjectURL(file);
    img_src.addEventListener("load",()=>{
      document.querySelector('.container').classList.remove('disabled');
      
    });
    
});

//filter
filter_btn.forEach((element) => {
  element.addEventListener("click",() =>{
    document.querySelector(".active").classList.remove("active");
    element.classList.add("active")
    filter_name.innerText =element.id;
    if(element.id === "brightness"){
      slider.max="200";
      slider.value = brightness;
      slider_value.innerText=`${brightness}`;
    }
    else if(element.id==="contrast"){
      slider.max="200";
      slider.value = contrast;
      slider_value.innerText=`${contrast}`;
    }
    else if(element.id ==="saturate"){
      slider.max="200";
      slider.value = saturate;
      slider_value.innerText=`${saturate}`;
    }
    else if(element.id ==="invert"){
      slider.max="100";
      slider.value = invert;
      slider_value.innerText=`${invert}`;
    }
    else if(element.id ==="blur"){
      slider.max="100";
      slider.value = blur;
      slider_value.innerText=`${blur}`;
    }

  });
});

slider.addEventListener('input',()=>{
    slider_value.innerText=`${slider.value}%`;
    let sliderState = document.querySelector(".icon-list .active");
    if(sliderState.id === "brightness"){
      brightness = slider.value;
    }else if(sliderState.id ==="contrast"){
      contrast=slider.value;
    }
    else if(sliderState.id ==="saturate"){
      saturate=slider.value;
    }
    else if(sliderState.id ==="invert"){
      invert=slider.value;
    }
 
    else if(sliderState.id ==="blur"){
      blur =slider.value;
    }
 
    
    img_src.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`; 
});


rotate_btn.forEach((element)=>{
  element.addEventListener('click',()=>{
    if(element.id === "rotate_left"){
      rotate -=90;
    } 
    else if(element.id === "rotate_right"){
      rotate +=90;
    }
    else if(element.id === "flip_x"){
      flip_x = flip_x === 1 ? -1:1;
    }
    else if(element.id === "flip_y"){
      flip_y = flip_y === 1 ? -1:1;
    }
    img_src.style.transform =`rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
  })
})

reset.addEventListener('click',()=>{
  brightness = "100";
  contrast= "100";
  saturate="100";
  invert="0";
  blur="0";
  rotate="0";
  flip_x="1";
  flip_y="1";
  img_src.style.transform =`rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
  img_src.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`; 


});



save.addEventListener("click",()=>{
  let canvas =document.createElement("canvas");
  let ctx=canvas.getContext("2d");
 
  canvas.width= img_src.naturalWidth;
  canvas.height= img_src.naturalHeight;

  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`; 

  ctx.scale(flip_x,flip_y);
  ctx.translate(canvas.width / 2,canvas.height /2);

  ctx.drawImage(
   img_src,-canvas.width /2,
   -canvas.height /2 ,
   canvas.width ,
   canvas.height
  );

  let link = document.createElement("a");

  link.download="NewImage.jpg";

  link.href =canvas.toDataURL();
  link.click();

});