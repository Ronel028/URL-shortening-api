
// nav button click
let navButton = document.querySelector('.hamburger-menu');
let navLink = document.querySelector('.nav-links');

navButton.addEventListener('click', (e) =>{
    let event = e.target.id;
    if(event == 'menu-btn'){
        navLink.classList.add('nav-show');
        document.querySelector('#menu-btn').style.display = 'none';
        document.querySelector('#close-btn').style.display = 'block';
    }
    else if(event == 'close-btn'){
        navLink.classList.remove('nav-show');
        document.querySelector('#menu-btn').style.display = 'block';
        document.querySelector('#close-btn').style.display = 'none';
    } 
})

// shortly api
let inputLink = document.querySelector('#input-link');
let submitLink = document.querySelector('#submit-link');
let output = document.querySelector('.statistics-section .output');
let loading = document.querySelector('#load');

let shortLink = async (link)=>{
    loading.style.display = 'block'
    let fetchingData = await fetch(`https://api.shrtco.de/v2/shorten?url=${link.value}`);
    let response = await fetchingData.json();
    loading.style.display = 'none'
    output.innerHTML = linkOutput(response.result.original_link, response.result.full_short_link);
}
let linkOutput = (original, short)=>{
   let data = `
        <ul>
            <li>
                <div class="original-link">
                    <p>${original}</p>
                </div>
                <div class="shorter-link">
                    <p id="link-short">${short}</p>
                    <button class="copy-link" onClick="copyLink()">Copy</button>
                </div>
            </li>
        </ul>
   `;
   return data;
}


//this function in to copy short link when you click button to clipboard
let copyLink = ()=>{
    let copyLinkBtn = document.querySelector('.copy-link')
    let shortLink = document.querySelector("#link-short");

    navigator.clipboard.writeText(shortLink.innerText)
    .then(()=>{
        console.log("Text Copied")
        copyLinkBtn.style.backgroundColor = "var(--Dark-Violet)";
        copyLinkBtn.innerText = "Copied!";

        setTimeout(()=>{
           copyLinkBtn.style.backgroundColor = "var(--Cyan)";
           copyLinkBtn.innerText = "Copy";
        }, 2000)
        
    })
}



// short Link button
submitLink.addEventListener('click', ()=>{
    let urlMatch = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    if(!inputLink.value.match(urlMatch) || inputLink.value == ''){
        document.querySelector('#hide').classList.remove('hide');
        inputLink.classList.add('error-input');
        inputLink.value = ''
    }
    else{
        document.querySelector('#hide').classList.add('hide');
        inputLink.classList.remove('error-input');
        shortLink(inputLink);
        inputLink.value = ''
        output.classList.add('display-output');

    } 
})



