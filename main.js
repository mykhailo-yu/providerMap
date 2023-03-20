const mansSmall = document.querySelectorAll(".man-small");
const mansMedium = document.querySelectorAll(".man-medium");
const mansLarge = document.querySelectorAll(".man-large");
const servers = document.querySelectorAll(".server");
const devices = document.querySelectorAll(".device");
const arcs = document.querySelectorAll(".arc");
const mans = document.querySelectorAll(".man");
const text = document.querySelector(".text");
const screens = document.querySelectorAll(".screen")
const infoText = document.querySelectorAll(".info-text");
const infoTextNorthAmerica = document.querySelector(".info-text_northAmerica_");
const infoTextSouthAmerica = document.querySelector(".info-text_southAmerica_");
const infoTextEurope = document.querySelector(".info-text_europe_");
const infoTextAustralia = document.querySelector(".info-text_australia_");
const infoTextAsia = document.querySelector(".info-text_asia_");
const wrapper = document.querySelector(".wrapper")
const result = document.querySelector(".result-table-wrapper");
const resultByteCloud = document.querySelector(".result-byteCloud");
const resultObject = document.querySelector(".result-object");
const manEmptyPicture = "img/man_empty.png";
const manFilledPicture = "img/man_filled.png";
const circleEmptyPicture = "img/circle_empty.png";
const circleFilledPicture = "img/circle_filled.png";
const serverPicture = "img/server.png";
const serverByteCloudPicture = "img/server_ByteCloud.png";
window.addEventListener("resize", () => {
    if (window.innerHeight < result.scrollHeight) {
        wrapper.style.height = "initial";

    } else {
        wrapper.style.height = "100vh";
    }
})
let ifFirstServerChecked = false;
let clientCounter = 0;
let stepCounter = 0;
let serverCounter = 0;
let checkedClients = { "north-america_": 0, "south-america_": 0, "europe_": 0, "asia_": 0, "oceania_": 0 };
let checkedServers = { "east-usa_": 0, "west-usa_": 0, "germany_": 0, "singapore_": 0 };
let pings = {
    "eu-eu": 19, "eu-na": 101, "eu-sa": 174, "eu-as": 143, "eu-au": 179,
    "wna-na": 51, "wna-sa": 124, "wna-eu": 141, "wna-as": 296, "wna-au": 253,
    "ena-na": 21, "ena-sa": 139, "ena-eu": 97, "ena-as": 232, "ena-au": 207,
    "oc-na": 226, "oc-sa": 367, "oc-eu": 250, "oc-as": 70, "oc-au": 92
}
// Create an object with animation durations
let animTime = {
    "eu-eu": 0, "eu-na": 0, "eu-sa": 0, "eu-as": 0, "eu-au": 0,
    "wna-na": 0, "wna-sa": 0, "wna-eu": 0, "wna-as": 0, "wna-au": 0,
    "ena-na": 0, "ena-sa": 0, "ena-eu": 0, "ena-as": 0, "ena-au": 0,
    "oc-na": 0, "oc-sa": 0, "oc-eu": 0, "oc-as": 0, "oc-au": 0
}
// Compute the animation durations for animTime object in which the animation speed is proportional to the highest ping, but no longer than 10 seconds
function computeAnimTime(object) {
    // Finding biggest ping key
    const maxValue = Math.max.apply(null, Object.values(object))
    let maxNumber = Object.keys(object).filter(k => object[k] === maxValue);
    animTime[maxNumber] = 10;
    for (const key in object) {
        animTime[key] = pings[key] * 10 / pings[maxNumber];
    }
}
computeAnimTime(pings);
let text1 = () => { text.innerHTML = "Where is your data? Choose one spot for Object Storage System"; }
let text2 = () => {
    text.innerHTML = "Choose minimum two additional spots for ByteCloud and press <a class='startLink' onclick='nextStep()' style='color: rgb(98, 155, 240);'>Start</a>";
}
// Adding event listeners for mans
for (const manSmall of mansSmall) {
    manSmall.addEventListener("mouseover", (event) => {
        event.target.src = manFilledPicture;
    })
    manSmall.addEventListener("mouseout", (event) => {
        event.target.src = manEmptyPicture;
    })
    manSmall.addEventListener("click", (event) => {
        let parentElement = event.target.parentNode.parentNode.parentNode.parentNode;
        parentElement.children[1].firstElementChild.children[0].style.display = "block";
        event.target.parentNode.parentNode.style.display = "none";
        checkedClients[event.target.parentNode.parentNode.classList[2]] = 1;
        clientCounter++;
        if (clientCounter == 5) { nextStep(); }
    })
}
for (const manMedium of mansMedium) {
    manMedium.addEventListener("mouseover", (event) => {
        event.target.src = manFilledPicture;
        event.target.parentNode.previousElementSibling.firstElementChild.src = manFilledPicture;
    })
    manMedium.addEventListener("mouseout", (event) => {
        event.target.src = manEmptyPicture;
        event.target.parentNode.previousElementSibling.firstElementChild.src = manEmptyPicture;
    })
    manMedium.addEventListener("click", (event) => {
        let parentElement = event.target.parentNode.parentNode.parentNode.parentNode;
        parentElement.children[1].firstElementChild.children[0].style.display = "block";
        parentElement.children[1].firstElementChild.children[1].style.display = "block";
        event.target.parentNode.parentNode.style.display = "none";
        checkedClients[event.target.parentNode.parentNode.classList[2]] = 2;
        clientCounter++;
        if (clientCounter == 5) { nextStep(); }
    })
}
for (const manLarge of mansLarge) {
    manLarge.addEventListener("mouseover", (event) => {
        event.target.src = manFilledPicture;
        event.target.parentNode.parentNode.firstElementChild.firstElementChild.src = manFilledPicture;
        event.target.parentNode.previousElementSibling.firstElementChild.src = manFilledPicture;
    })
    manLarge.addEventListener("mouseout", (event) => {
        event.target.src = manEmptyPicture;
        event.target.parentNode.parentNode.firstElementChild.firstElementChild.src = manEmptyPicture;
        event.target.parentNode.previousElementSibling.firstElementChild.src = manEmptyPicture;
    })
    manLarge.addEventListener("click", (event) => {
        let parentElement = event.target.parentNode.parentNode.parentNode.parentNode;
        parentElement.children[1].firstElementChild.children[0].style.display = "block";
        parentElement.children[1].firstElementChild.children[1].style.display = "block";
        parentElement.children[1].firstElementChild.children[2].style.display = "block";
        event.target.parentNode.parentNode.style.display = "none";
        checkedClients[event.target.parentNode.parentNode.classList[2]] = 3;
        clientCounter++;
        if (clientCounter == 5) { nextStep(); }
    })
}
// Adding event listeners for servers
for (const server of servers) {
    const mouseoverHandler = (event) => {
        event.target.src = circleFilledPicture;
    };
    const mouseoutHandler = (event) => {
        event.target.src = circleEmptyPicture;
    };
    const clickHandler = (event) => {
        event.target.parentNode.removeEventListener("mouseover", mouseoverHandler);
        event.target.parentNode.removeEventListener("mouseout", mouseoutHandler);
        if (ifFirstServerChecked == true) {
            event.target.src = serverByteCloudPicture;
            event.target.parentNode.removeEventListener("click", clickHandler);
            serverCounter++;
            checkedServers[event.target.parentNode.classList[2]] = 1;
            if (serverCounter == 2) {
                document.querySelector(".startLink").href = "javascript:void(0)";
                document.querySelector(".startLink").removeAttribute("style");
            }
            else if (serverCounter == 3) {
                nextStep();
            }
        }
        else {
            event.target.src = serverPicture;
            event.target.parentNode.removeEventListener("click", clickHandler);
            ifFirstServerChecked = true;
            checkedServers[event.target.parentNode.classList[2]] = 2;
            text2();
        }
    };
    server.addEventListener("mouseover", mouseoverHandler);
    server.addEventListener("mouseout", mouseoutHandler);
    server.addEventListener("click", clickHandler);
}
// Function for creating arc name and results for object storage
function arcShow(clients, servers) {
    let arcNameStart = "arc_";
    let arcName = [];
    let pathStart;
    let waitingTime = 0;
    for (const key in servers) {
        if (servers[key] == 2) {
            arcNameStart += key;
            if (key == "east-usa_") pathStart = "ena-";
            else if (key == "west-usa_") pathStart = "wna-";
            else if (key == "germany_") pathStart = "eu-";
            else if (key == "singapore_") pathStart = "oc-";
        }
    }
    let text;
    for (const key in clients) {
        let path;
        let aTime;
        if (key == "north-america_") {
            path = pings[pathStart + "na"];
            aTime = animTime[pathStart + "na"];
            text = infoTextNorthAmerica;
        }
        else if (key == "south-america_") {
            path = pings[pathStart + "sa"];
            aTime = animTime[pathStart + "sa"];
            text = infoTextSouthAmerica;
        }
        else if (key == "europe_") {
            path = pings[pathStart + "eu"];
            aTime = animTime[pathStart + "eu"];
            text = infoTextEurope;
        }
        else if (key == "asia_") {
            path = pings[pathStart + "as"];
            aTime = animTime[pathStart + "as"];
            text = infoTextAsia;
        }
        else if (key == "oceania_") {
            path = pings[pathStart + "au"];
            aTime = animTime[pathStart + "au"];
            text = infoTextAustralia;
        }
        if (clients[key] == 1) {
            arcName.push(arcNameStart + key + "large");
            let device = document.querySelector(`.devices-${key}`);
            anim(device, 1, aTime);
            waitTime(aTime);
            showText(text, path, aTime);
            createResult(resultObject, key, path)
        }
        if (clients[key] == 2) {
            arcName.push(arcNameStart + key + "large");
            arcName.push(arcNameStart + key + "medium");
            let device = document.querySelector(`.devices-${key}`);
            anim(device, 2, aTime);
            waitTime(aTime);
            showText(text, path, aTime);
            createResult(resultObject, key, path)
        }
        if (clients[key] == 3) {
            arcName.push(arcNameStart + key + "small");
            arcName.push(arcNameStart + key + "medium");
            arcName.push(arcNameStart + key + "large");
            let device = document.querySelector(`.devices-${key}`);
            anim(device, 3, aTime);
            waitTime(aTime);
            showText(text, path, aTime);
            createResult(resultObject, key, path)
        }
    }
    function waitTime(time) {
        if (time * 1000 + 2000 > waitingTime) waitingTime = time * 1000 + 2000;
    }
    showArc(arcName);
    setTimeout(() => { nextStep() }, waitingTime); // Waiting for end of all animation for object storage
}
// Function to calculate name elements for arcs and to create results for Byte Cloud storage
function byteCloudArcShow(clients, servers) {
    let waitingTime = 0;
    function waitTime(time) {
        if (time * 1000 + 2000 > waitingTime) waitingTime = time * 1000 + 2000;
    }
    function clientQuantitySelect(client, server, path, aTime) {
        if (clients[client] == 1) {
            createByteCloudArcName(client, 1, server);
            let device = document.querySelector(`.devices-${client}`);
            anim(device, 1, aTime);
            createResult(resultByteCloud, client, path);
        }
        else if (clients[client] == 2) {
            createByteCloudArcName(client, 2, server);
            let device = document.querySelector(`.devices-${client}`);
            anim(device, 2, aTime);
            createResult(resultByteCloud, client, path);
        }
        else if (clients[client] == 3) {
            createByteCloudArcName(client, 3, server);
            let device = document.querySelector(`.devices-${client}`);
            anim(device, 3, aTime);
            createResult(resultByteCloud, client, path);
        }
    }
    for (const server in servers) {
        for (const client in clients) {
            if (server == "east-usa_" && servers[server] > 0 && client == "north-america_" && clients[client] > 0) {
                let path = pings["ena-na"];
                let aTime = animTime["ena-na"];
                waitTime(aTime);
                clientQuantitySelect(client, server, path, aTime);
                infoTextNorthAmerica.style.display = "block"
                infoTextNorthAmerica.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextNorthAmerica.innerHTML = `Time: ${path / 10}s` }, aTime * 1000);
            }
            else if (server == "west-usa_" && servers[server] > 0 && client == "south-america_" && clients[client] > 0) {
                let path = pings["wna-sa"];
                let aTime = animTime["wna-sa"];
                waitTime(aTime);
                clientQuantitySelect(client, server, path, aTime);
                infoTextSouthAmerica.style.display = "block"
                infoTextSouthAmerica.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextSouthAmerica.innerHTML = `Time: ${path / 10}s` }, aTime * 1000);
            }
            else if (server == "germany_" && servers[server] > 0 && client == "europe_" && clients[client] > 0) {
                let path = pings["eu-eu"];
                let aTime = animTime["eu-eu"];
                waitTime(aTime);
                clientQuantitySelect(client, server, path, aTime);
                infoTextEurope.style.display = "block"
                infoTextEurope.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextEurope.innerHTML = `Time: ${path / 10}s` }, aTime * 1000);
            }
            else if (server == "singapore_" && servers[server] > 0 && client == "asia_" && clients[client] > 0) {
                let path = pings["oc-as"];
                let aTime = animTime["oc-as"];
                waitTime(aTime);
                clientQuantitySelect(client, server, path, aTime);
                infoTextAsia.style.display = "block"
                infoTextAsia.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextAsia.innerHTML = `Time: ${path / 10}s` }, aTime * 1000);
            }
            else if (server == "singapore_" && servers[server] > 0 && client == "oceania_" && clients[client] > 0) {
                let path = pings["oc-au"];
                let aTime = animTime["oc-au"];
                waitTime(aTime);
                clientQuantitySelect(client, server, path, aTime);
                infoTextAustralia.style.display = "block"
                infoTextAustralia.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextAustralia.innerHTML = `Time: ${path / 10}s` }, aTime * 1000);
            }
            /*/////////////////////*/
            else if (server == "east-usa_" && servers[server] == 0 && servers["west-usa_"] > 0 && client == "north-america_" && clients[client] > 0) {
                let path = pings["wna-na"];
                let aTime = animTime["wna-na"];
                waitTime(aTime);
                clientQuantitySelect(client, "west-usa_", path, aTime);
                infoTextNorthAmerica.style.display = "block"
                infoTextNorthAmerica.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextNorthAmerica.innerHTML = `Time: ${path / 10}s` }, aTime * 1000);
            }
            else if (server == "west-usa_" && servers[server] == 0 && servers["east-usa_"] > 0 && client == "south-america_" && clients[client] > 0) {
                let path = pings["ena-sa"];
                let aTime = animTime["ena-sa"];
                waitTime(aTime);
                clientQuantitySelect(client, "east-usa_", path, aTime);
                infoTextSouthAmerica.style.display = "block"
                infoTextSouthAmerica.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextSouthAmerica.innerHTML = `Time: ${path / 10}s` }, aTime * 1000);
            }
            else if (server == "germany_" && servers[server] == 0 && servers["east-usa_"] > 0 && client == "europe_" && clients[client] > 0) {
                let path = pings["ena-eu"];
                let aTime = animTime["ena-eu"];
                waitTime(aTime);
                clientQuantitySelect(client, "east-usa_", path, aTime);
                infoTextEurope.style.display = "block"
                infoTextEurope.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextEurope.innerHTML = `Time: ${path / 10}s` }, aTime * 1000);
            }
            else if (server == "singapore_" && servers[server] == 0 && servers["germany_"] > 0 && client == "oceania_" && clients[client] > 0) {
                let path = pings["eu-au"];
                let aTime = animTime["eu-au"];
                waitTime(aTime);
                clientQuantitySelect(client, "germany_", path, aTime);
                infoTextAustralia.style.display = "block"
                infoTextAustralia.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextAustralia.innerHTML = `Time: ${path / 10}s` }, aTime * 1000);
            }
            else if (server == "singapore_" && servers[server] == 0 && servers["germany_"] > 0 && client == "asia_" && clients[client] > 0) {
                let path = pings["eu-as"];
                let aTime = animTime["eu-as"];
                waitTime(aTime);
                clientQuantitySelect(client, "germany_", path, aTime);
                infoTextAsia.style.display = "block"
                infoTextAsia.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextAsia.innerHTML = `Time: ${path / 10}s` }, aTime * 1000);
            }
        }
    }
    setTimeout(() => { nextStep() }, waitingTime); // Waiting for end of all animations for ByteCloud servers
}
// Function to make visible the required arcs
function showArc(arcName) {
    for (const arc of arcName) {
        let a = document.querySelector(`.${arc}`);
        if (arc == a.classList[1]) {
            a.style.display = "block";
        }
    }
}
// Function to create ByteCloud arcs
function createByteCloudArcName(client, clientCount, server) {
    let arcName = [];
    let arcNameStart = "arc_";
    if (clientCount == 1) {
        arcName.push(arcNameStart + server + client + "large");
    }
    else if (clientCount == 2) {
        arcName.push(arcNameStart + server + client + "large");
        arcName.push(arcNameStart + server + client + "medium");
    }
    else if (clientCount == 3) {
        arcName.push(arcNameStart + server + client + "large");
        arcName.push(arcNameStart + server + client + "medium");
        arcName.push(arcNameStart + server + client + "small");
    }
    showArc(arcName);
}
// Function to hide all arcs
function arcHide(arcs) {
    for (const arc of arcs) {
        arc.style.display = "none";
    }
}
// Function to add animation for screens
function anim(element, quantity, duration) {
    let small = element.querySelector('.device-small .screen')
    let medium = element.querySelector('.device-medium .screen')
    let large = element.querySelector('.device-large .screen')
    duration = durationMagnifier(duration);
    switch (quantity) {
        case 1: {
            small.style.transitionDuration = `${duration}s`;
            small.style.width = "33%";
            break;
        }
        case 2: {
            small.style.transitionDuration = `${duration}s`;
            small.style.width = "33%";
            medium.style.transitionDuration = `${duration}s`;
            medium.style.width = "49%";
            break;
        }
        case 3: {
            small.style.transitionDuration = `${duration}s`;
            small.style.width = "33%";
            medium.style.transitionDuration = `${duration}s`;
            medium.style.width = "49%";
            large.style.transitionDuration = `${duration}s`;
            large.style.width = "78%";
            break;
        }
        default: break;
    }
}
// Function to increase duration if it is shorter than 2 seconds
function durationMagnifier(duration) {
    if (duration < 2) return 2;
    else return duration;
}
// Function to make visible text with information about latency and time
function showText(text, path, aTime) {
    text.style.visibility = "visible";
    text.innerHTML = `Latency: ${path}ms`;
    setTimeout(() => { text.innerHTML = `Time: ${path / 10}s` }, aTime * 1000);
}
// Function for creating final results
function createResult(element, client, latency) {
    let time = latency / 10;
    let stars;
    let quality;
    if (client == "north-america_") client = "North America";
    else if (client == "south-america_") client = "South America";
    else if (client == "europe_") client = "Europe";
    else if (client == "asia_") client = "Asia";
    else if (client == "oceania_") client = "Oceania";

    if (latency < 50) {
        stars = `<img src="img/star.svg" alt="star">
                    <img src="img/star.svg" alt="star">
                    <img src="img/star.svg" alt="star">
                    <img src="img/star.svg" alt="star">
                    <img src="img/star.svg" alt="star">`;
        quality = "4K/2160p Ultra HD";
    }
    else if (latency < 100 && latency >= 50) {
        stars = `<img src="img/star2.svg" alt="star">
                    <img src="img/star.svg" alt="star">
                    <img src="img/star.svg" alt="star">
                    <img src="img/star.svg" alt="star">
                    <img src="img/star.svg" alt="star">`;
        quality = "1080p Full HD";
    }
    else if (latency < 150 && latency >= 100) {
        stars = `<img src="img/star2.svg" alt="star">
                    <img src="img/star2.svg" alt="star">
                    <img src="img/star.svg" alt="star">
                    <img src="img/star.svg" alt="star">
                    <img src="img/star.svg" alt="star">`;
        quality = "1080p Full HD";
    }
    else if (latency < 200 && latency >= 150) {
        stars = `<img src="img/star2.svg" alt="star">
                    <img src="img/star2.svg" alt="star">
                    <img src="img/star2.svg" alt="star">
                    <img src="img/star.svg" alt="star">
                    <img src="img/star.svg" alt="star">`;
        quality = "720p HD";
    }
    else {
        stars = `<img src="img/star2.svg" alt="star">
                    <img src="img/star2.svg" alt="star">
                    <img src="img/star2.svg" alt="star">
                    <img src="img/star.svg" alt="star">
                    <img src="img/star.svg" alt="star">`;
        quality = "480p";
    }

    element.innerHTML += `
        <div class="item">
            <div class="item-cell header">${client}
                <div class="stars">
                    ${stars}
                </div>
            </div>
            <div class="result-main">
                <div class="item-cell latency">Latency <p>${latency}</p>
                </div>
                <div class="item-cell download-time">Download time <p>${time}sec</p><span
                        class="time"></span>
                </div>
                <div class="item-cell quality">Video Streaming <p>${quality}</p>
                </div>
            </div>
        </div>
    `;
}
// Function for changing steps 
function nextStep() {
    switch (stepCounter) {
        case 0: {
            if (clientCounter == 0) {
                servers[0].parentNode.style.display = "block";
                for (const man of mans) {
                    man.style.display = "none";
                }
                for (const device of devices) {
                    device.style.display = "block";
                }
                for (const key in checkedClients) {
                    checkedClients[key] = 3;
                }
            }
            else {
                servers[0].parentNode.style.display = "block";
                for (const man of mans) {
                    man.style.display = "none";
                }
            }
            text1();
            stepCounter++;
            break;
        }
        case 1: {
            if (serverCounter < 2) break;
            for (const server of servers) {
                if (server.firstElementChild.src.includes(circleEmptyPicture)) {
                    server.style.display = "none"
                }
            }
            text.style.visibility = "hidden";
            byteCloudArcShow(checkedClients, checkedServers);
            stepCounter++;
            break;
        }
        case 2: {
            arcHide(arcs);
            for (const screen of screens) {
                screen.style.transitionDuration = "0s"
                screen.style.width = "0%";
            }
            for (const item of infoText) {
                item.style.visibility = "hidden";
            }
            setTimeout(() => {
                arcShow(checkedClients, checkedServers);
            }, 1500) // Time beetween ByteCloud animation and object storage animation
            stepCounter++;
            break;
        }
        case 3: {
            result.style.display = "block";
            if (window.innerHeight < result.scrollHeight) {
                wrapper.style.height = "initial";

            } else {
                wrapper.style.height = "100vh";
            }
            stepCounter++;
            break;
        }
        default: {
            break;
        }
    }

}