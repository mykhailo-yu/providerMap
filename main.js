const mansSmall = document.querySelectorAll(".man-small");
const mansMedium = document.querySelectorAll(".man-medium");
const mansLarge = document.querySelectorAll(".man-large");
const servers = document.querySelectorAll(".server");
let ifFirstServerChecked = false;
let checkedClients = { "man-northAmerica": 0, "man-southAmerica": 0, "man-europe": 0, "man-asia": 0, "man-australia": 0 };
for (const manSmall of mansSmall) {
    manSmall.addEventListener("mouseover", (event) => {
        event.target.src = "img/man_filled.png";
    })
    manSmall.addEventListener("mouseout", (event) => {
        event.target.src = "img/man_empty.png";
    })
    manSmall.addEventListener("click", (event) => {
        let parentElement = event.target.parentNode.parentNode.parentNode.parentNode;
        parentElement.children[1].firstElementChild.children[0].style.display = "block";
        event.target.parentNode.parentNode.style.display = "none";
        checkedClients[event.target.parentNode.parentNode.classList[1]] = 1;
    })
}
for (const manMedium of mansMedium) {
    manMedium.addEventListener("mouseover", (event) => {
        event.target.src = "img/man_filled.png";
        event.target.parentNode.previousElementSibling.firstElementChild.src = "img/man_filled.png";
    })
    manMedium.addEventListener("mouseout", (event) => {
        event.target.src = "img/man_empty.png";
        event.target.parentNode.previousElementSibling.firstElementChild.src = "img/man_empty.png";
    })
    manMedium.addEventListener("click", (event) => {
        let parentElement = event.target.parentNode.parentNode.parentNode.parentNode;
        parentElement.children[1].firstElementChild.children[0].style.display = "block";
        parentElement.children[1].firstElementChild.children[1].style.display = "block";
        event.target.parentNode.parentNode.style.display = "none";
        checkedClients[event.target.parentNode.parentNode.classList[1]] = 2;
    })
}
for (const manLarge of mansLarge) {
    manLarge.addEventListener("mouseover", (event) => {
        event.target.src = "img/man_filled.png";
        event.target.parentNode.parentNode.firstElementChild.firstElementChild.src = "img/man_filled.png";
        event.target.parentNode.previousElementSibling.firstElementChild.src = "img/man_filled.png";
    })
    manLarge.addEventListener("mouseout", (event) => {
        event.target.src = "img/man_empty.png";
        event.target.parentNode.parentNode.firstElementChild.firstElementChild.src = "img/man_empty.png";
        event.target.parentNode.previousElementSibling.firstElementChild.src = "img/man_empty.png";
    })
    manLarge.addEventListener("click", (event) => {
        let parentElement = event.target.parentNode.parentNode.parentNode.parentNode;
        parentElement.children[1].firstElementChild.children[0].style.display = "block";
        parentElement.children[1].firstElementChild.children[1].style.display = "block";
        parentElement.children[1].firstElementChild.children[2].style.display = "block";
        event.target.parentNode.parentNode.style.display = "none";
        checkedClients[event.target.parentNode.parentNode.classList[1]] = 3;
    })
}
for (const server of servers) {
    const mouseoverHandler = (event) => {
        event.target.src = "img/circle_filled.png";
        console.log(checkedClients)
    };
    const mouseoutHandler = (event) => {
        event.target.src = "img/circle_empty.png";
    };
    const clickHandler = (event) => {
        event.target.parentNode.removeEventListener("mouseover", mouseoverHandler);
        event.target.parentNode.removeEventListener("mouseout", mouseoutHandler);
        if (ifFirstServerChecked == true) {
            event.target.src = "img/server_ByteCloud.png";

        }
        else {
            event.target.src = "img/server.png";
            event.target.parentNode.removeEventListener("click", clickHandler);
            ifFirstServerChecked = true;
        }
    };
    server.addEventListener("mouseover", mouseoverHandler);
    server.addEventListener("mouseout", mouseoutHandler);
    server.addEventListener("click", clickHandler);
}