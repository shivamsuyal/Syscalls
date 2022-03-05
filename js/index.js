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
readJson("assets/syscall.json", function(text){
    // return
    data = JSON.parse(text);
    data.forEach(ele => {
        d1 = `<div class="call">
        <p>${ele["System call"]}</p>
        <p>${ele["rax"]}</p>
        <p>${ele["rdi"]}</p>
        <p>${ele["rsi"]}</p>
        <p>${ele["rdx"]}</p>
        <p>${ele["r10"]}</p>
        <p>${ele["r8"]}</p>
        <p>${ele["r9"]}</p>
    </div>`
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
            d1 = `<div class="call"><p>${ele["System call"]}</p><p>${ele["rax"]}</p><p>${ele["rdi"]}</p><p>${ele["rsi"]}</p><p>${ele["rdx"]}</p><p>${ele["r10"]}</p><p>${ele["r8"]}</p><p>${ele["r9"]}</p></div>`
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


