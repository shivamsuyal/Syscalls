const searchIcon = document.getElementById('searchIcon')
const crossIcon = document.getElementById('crossIcon')
const searchText = document.getElementById('searchText')
const search = document.getElementById('search')
const head = document.querySelector('.head')
const dropupContent = document.querySelector('.dropup-content')
const syscalls = document.getElementById('syscalls')
const content1 = document.getElementById('content1')
const content2 = document.getElementById('content2')
const showArch = document.getElementById('showArch')
const architecture = document.getElementById('architecture')
const archs = document.querySelectorAll('.dropup-content a')

// Detecting For mobile Devices
check=false
a=navigator.userAgent || navigator.vendor || window.opera
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
if(check){
    document.getElementById("help").style.display="none"
}



// Read json file function
function readJson(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET",file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

let syscallArgs
readJson('assets/syscallArgs.json',(txt)=>{
    syscallArgs = JSON.parse(txt);
})
let syscallArchs
readJson('assets/syscallArchs.json',(txt)=>{
    syscallArchs = JSON.parse(txt);
})


archs.forEach((ele)=>{
    ele.addEventListener('click',(event)=>{
        var name = event.target.innerText
        showArch.innerText = name
        // return
        d1 = `<p>Arch : ${name}</p>
        <p>Instruction : ${syscallArchs[name]["Instruction"]}</p>
        <p>System_calls : ${syscallArchs[name]["System_calls"]}</p>
        <p>Ret_val1 : ${syscallArchs[name]["Ret_val1"]}</p>
        <p>Ret_val2 : ${syscallArchs[name]["Ret_val2"]}</p>
        <p>Error : ${syscallArchs[name]["Error"]}</p>`

        architecture.innerHTML=d1

        d2 = `<p>Syscall</p>
        <p>${syscallArchs[name]["System_calls"]}</p>
        <p>${syscallArgs[name][0]}</p>
        <p>${syscallArgs[name][1]}</p>
        <p>${syscallArgs[name][2]}</p>
        <p>${syscallArgs[name][3]}</p>
        <p>${syscallArgs[name][4]}</p>
        <p>${syscallArgs[name][5]}</p>`

        head.innerHTML=d2

        // let data; // contain syscalls (json) 
        content2.innerHTML=""
        readJson(`assets/syscall${name}.json`, function(text){
            data = JSON.parse(text);
            data.forEach(ele => {
                d1='<div class="call">'
                for (i in ele){
                    // console.log(i)
                    d1+=`<p>${ele[i]}</p>`
                }
                d1+="</div>"
                content2.insertAdjacentHTML('beforeend',d1)
            });
        });
    })
});

searchIcon.addEventListener("mouseover", (event)=>{
    searchText.style.opacity="1"
});

search.addEventListener("mouseleave", (event)=>{
    if(!searchText.value){
        searchText.style.opacity="0"
    }
});


let data; // contain syscalls (json) 
readJson("assets/syscallx64.json", function(text){
    data = JSON.parse(text);
    content2.innerHTML=""
    data.forEach(ele => {
        d1='<div class="call">'
        for (i in ele){
            d1+=`<p>${ele[i]}</p>`
        }
        d1+="</div>"
        content2.insertAdjacentHTML('beforeend',d1)
    });
});

// Search Function
function TextChange(val){
    // console.log(val)
    if(val==""){
        crossIcon.style.zIndex="90"
        searchIcon.style.zIndex="100"
        content1.style.display="none"
        content2.style.display="block"
        return
    }
    crossIcon.style.zIndex="100"
    searchIcon.style.zIndex="90"

    // searching
    content2.style.display="none"
    content1.innerHTML=""
    
    data.forEach(ele => {
        if(ele["System call"].includes(val)){
            d1='<div class="call">'
            for (i in ele){
                d1+=`<p>${ele[i]}</p>`
            }
            d1+="</div>"
            content1.insertAdjacentHTML('beforeend',d1)
        }
    });
    content1.style.display="block"
}

// cross function
function clearText(){
    searchText.value=""
    crossIcon.style.zIndex="90"
    searchIcon.style.zIndex="100"
    content1.style.display="none"
    content2.style.display="block"
}

searchText.onfocus = ()=>{
    searchText.style.opacity = "1"
}
searchText.onblur = ()=>{
    if(!searchText.value){
        searchText.style.opacity="0"
    }
}
TextFocus = 0
document.addEventListener("keydown", function(event) {
    if (event.key == "Escape") {
        if(TextFocus == 1){
            searchText.blur()
            searchText.style.opacity="0"
            TextFocus=0
        }else{
            searchText.focus()
            TextFocus = 1
        }
    }
    // if (event.key == "Escape") {
    //     searchText.blur()
    //     searchText.value=""
    // }
    // console.log(event)
  });

// document.onkeydown = function(evt) {
//     evt = evt || window.event;
//     var isEscape = false;
//     if ("key" in evt) {
//         isEscape = (evt.key === "Escape" || evt.key === "Esc");
//     } else {
//         isEscape = (evt.keyCode === 27);
//     }
//     if (isEscape) {
//         alert("Escape");
//     }
// };
// document.addEventListener(KeyboardEvent,(e)=>{
//     console.log(e)
// })
