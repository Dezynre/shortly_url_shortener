

//The following source code is associated with the navigation section

let menu_icon = document.querySelector("#menu_icon")
let nav_links = document.getElementById("nav_links")
console.log(nav_links)
let count=1;
menu_icon.addEventListener("click", (event)=>{
    console.log(`menu clicked round ${count++}`)
    if(nav_links.style.display=="") {
        nav_links.style.display="flex"
    } else if(nav_links.style.display=="flex") {
        nav_links.style.display=""
    }
})

//At the start of page loads retrieve the localStorage Object and Display its Key - Value Pairs

for(let item in localStorage) {
    if (!localStorage.hasOwnProperty(item)) {
        continue;
    }
    let wrapper_section = document.querySelector(".app")
    let card = document.createElement("section")
    card.className = "shortened_links"
    let links_card = document.createElement("div")
    links_card.className = "links_card"
    let original_link = document.createElement("p")
    original_link.textContent = item
    original_link.className = "original_link"
    let new_link = document.createElement("p")
    new_link.textContent = localStorage[item]
    new_link.className = "new_link"
    let copy_button = document.createElement("button")
    copy_button.textContent = "Copy"
    copy_button.className = "copy_button"
    links_card.append(original_link)
    links_card.append(new_link)
    links_card.append(copy_button)
    card.append(links_card)
    card.classList.add("animate_on_scroll")
    wrapper_section.append(card)
    copy_button.addEventListener("click", (e)=>{
        let links_parent = copy_button.previousElementSibling
        let link_to_be_copied = links_parent.textContent
        navigator.clipboard.writeText(link_to_be_copied)
        copy_button.style.backgroundColor = "hsl(257, 27%, 26%)"
        copy_button.textContent = "Copied!"
        setTimeout(()=>{
            copy_button.textContent = "Copy"
            copy_button.style.backgroundColor = "hsl(180, 66%, 49%)"
        }, 3000)
    })
}



let form = document.querySelector("#form")

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    let input = document.querySelector("#link")
    let link_to_be_shortened = input.value
    let request_link = `https://api.shrtco.de/v2/shorten?url=${link_to_be_shortened}`
    fetch(request_link).then(response => response.json()).then((data) => {
        // Here Is Where All actions after form submission are supposed to be performed
        let wrapper_section = document.querySelector(".app")
        let card = document.createElement("section")
        card.className = "shortened_links"
        let links_card = document.createElement("div")
        links_card.className = "links_card"
        
        //Create Card Content
        let original_link = document.createElement("p")
        original_link.textContent = data.result.original_link
        original_link.className = "original_link"

        
        let new_link = document.createElement("p")
        new_link.textContent = data.result.full_short_link
        new_link.className = "new_link"

        //Store The Pair Of Links In Local Storage
        localStorage.setItem(original_link.textContent, new_link.textContent)
        
        let copy_button = document.createElement("button")
        copy_button.textContent = "Copy"
        copy_button.className = "copy_button"

        copy_button.addEventListener("click", (e)=>{
            let links_parent = copy_button.previousElementSibling
            let link_to_be_copied = links_parent.textContent
            navigator.clipboard.writeText(link_to_be_copied)
            copy_button.style.backgroundColor = "hsl(257, 27%, 26%)"
            copy_button.textContent = "Copied!"
            setTimeout(()=>{
                copy_button.textContent = "Copy"
                copy_button.style.backgroundColor = "hsl(180, 66%, 49%)"
            }, 3000)
        })

        //Append Card Content to card
        links_card.append(original_link)
        links_card.append(new_link)
        links_card.append(copy_button)

        //Append Card To Sub-Wrapper Section
        card.append(links_card)
        card.classList.add("animate_on_scroll")

        //Append Card To Wrapper Section
        wrapper_section.append(card)

        console.log(data)
    });
})



// the following code snippets are used to control this sites scroll animation


function animate_on_scroll() {
    let elements_to_animate = document.querySelectorAll(".animate_on_scroll")
    for(let i=0; i<elements_to_animate.length; i++) {
        let viewport_height = window.innerHeight
        let distance_from_top_of_viewport = elements_to_animate[i].getBoundingClientRect().top
        let distance = 50
        if (distance_from_top_of_viewport < viewport_height-distance) {
            elements_to_animate[i].classList.add("active")
        } else {
            elements_to_animate[i].classList.remove("active")
        }
    }
}

window.addEventListener("scroll", animate_on_scroll)
animate_on_scroll()