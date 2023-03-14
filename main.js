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
const manEmptyPicture = "img/man_empty.png";
const manFilledPicture = "img/man_filled.png";
const circleEmptyPicture = "img/circle_empty.png";
const circleFilledPicture = "img/circle_filled.png";
const serverPicture = "img/server.png";
const serverByteCloudPicture = "img/server_ByteCloud.png";
let ifFirstServerChecked = false;
let clientCounter = 0;
let stepCounter = 0;
let serverCounter = 0;
let checkedClients = { "north-america_": 0, "south-america_": 0, "europe_": 0, "asia_": 0, "oceania_": 0 };
let checkedServers = { "east-usa_": 0, "west-usa_": 0, "germany_": 0, "singapore_": 0 };
let pings = {
    "eu-eu": 19, "eu-na": 101, "eu-sa": 174, "eu-as": 296, "eu-au": 253,
    "wna-na": 51, "wna-sa": 124, "wna-eu": 141, "wna-as": 143, "wna-au": 179,
    "ena-na": 21, "ena-sa": 139, "ena-eu": 97, "ena-as": 232, "ena-au": 207,
    "oc-na": 226, "oc-sa": 367, "oc-eu": 250, "oc-as": 70, "oc-au": 92
}
let text1 = () => {
    text.innerHTML = "Where is your data? Choose one spot for Object Storage System";
}
let text2 = () => {
    text.innerHTML = "Choose minimum two additional spots for ByteCloud and press <a class='startLink' onclick='nextStep()' style='color: rgb(98, 155, 240);'>Start</a>";

}
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
function arcShow(clients, servers) {
    let arcNameStart = "arc_";
    let arcName = [];
    let pathStart;
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
        if (key == "north-america_") {
            path = pings[pathStart + "na"];
            text = infoTextNorthAmerica;
        }
        else if (key == "south-america_") {
            path = pings[pathStart + "sa"];
            text = infoTextSouthAmerica;
        }
        else if (key == "europe_") {
            path = pings[pathStart + "eu"];
            text = infoTextEurope;
        }
        else if (key == "asia_") {
            path = pings[pathStart + "as"];
            text = infoTextAsia;
        }
        else if (key == "oceania_") {
            path = pings[pathStart + "au"];
            text = infoTextAustralia;
        }
        if (clients[key] == 1) {
            arcName.push(arcNameStart + key + "large");
            let device = document.querySelector(`.devices-${key}`);
            anim(device, 1, path);
            showText(text, path);
        }
        if (clients[key] == 2) {
            arcName.push(arcNameStart + key + "large");
            arcName.push(arcNameStart + key + "medium");
            let device = document.querySelector(`.devices-${key}`);
            anim(device, 2, path);
            showText(text, path);
        }
        if (clients[key] == 3) {
            arcName.push(arcNameStart + key + "small");
            arcName.push(arcNameStart + key + "medium");
            arcName.push(arcNameStart + key + "large");
            let device = document.querySelector(`.devices-${key}`);
            anim(device, 3, path);
            showText(text, path);
        }
        console.log(path);
    }
    showArc(arcName);
}
function byteCloudArcShow(clients, servers) {
    for (const server in servers) {
        for (const client in clients) {
            if (server == "east-usa_" && servers[server] > 0 && client == "north-america_" && clients[client] > 0) {
                let path = pings["ena-na"];
                if (clients[client] == 1) {
                    createByteCloudArcName(client, 1, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 1, path)
                }
                else if (clients[client] == 2) {
                    createByteCloudArcName(client, 2, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 2, path)
                }
                else if (clients[client] == 3) {
                    createByteCloudArcName(client, 3, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 3, path)
                }
                infoTextNorthAmerica.style.display = "block"
                infoTextNorthAmerica.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextNorthAmerica.innerHTML = `Time: ${path * 10}ms` }, durationCutter(path) * 100);
            }
            else if (server == "west-usa_" && servers[server] > 0 && client == "south-america_" && clients[client] > 0) {
                let path = pings["wna-sa"];
                if (clients[client] == 1) {
                    createByteCloudArcName(client, 1, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 1, path)
                }
                else if (clients[client] == 2) {
                    createByteCloudArcName(client, 2, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 2, path)
                }
                else if (clients[client] == 3) {
                    createByteCloudArcName(client, 3, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 3, path)
                }
                infoTextSouthAmerica.style.display = "block"
                infoTextSouthAmerica.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextSouthAmerica.innerHTML = `Time: ${path * 10}ms` }, durationCutter(path) * 100);
            }
            else if (server == "germany_" && servers[server] > 0 && client == "europe_" && clients[client] > 0) {
                let path = pings["eu-eu"];
                if (clients[client] == 1) {
                    createByteCloudArcName(client, 1, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 1, path)
                }
                else if (clients[client] == 2) {
                    createByteCloudArcName(client, 2, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 2, path)
                }
                else if (clients[client] == 3) {
                    createByteCloudArcName(client, 3, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 3, path)
                }
                infoTextEurope.style.display = "block"
                infoTextEurope.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextEurope.innerHTML = `Time: ${path * 10}ms` }, durationCutter(path) * 100);
            }
            else if (server == "singapore_" && servers[server] > 0 && client == "asia_" && clients[client] > 0) {
                let path = pings["oc-as"];
                if (clients[client] == 1) {
                    createByteCloudArcName(client, 1, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 1, path)
                }
                else if (clients[client] == 2) {
                    createByteCloudArcName(client, 2, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 2, path)
                }
                else if (clients[client] == 3) {
                    createByteCloudArcName(client, 3, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 3, path)
                }
                infoTextAsia.style.display = "block"
                infoTextAsia.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextAsia.innerHTML = `Time: ${path * 10}ms` }, durationCutter(path) * 100);
            }
            else if (server == "singapore_" && servers[server] > 0 && client == "oceania_" && clients[client] > 0) {
                let path = pings["oc-au"];
                if (clients[client] == 1) {
                    createByteCloudArcName(client, 1, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 1, path)
                }
                else if (clients[client] == 2) {
                    createByteCloudArcName(client, 2, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 2, path)
                }
                else if (clients[client] == 3) {
                    createByteCloudArcName(client, 3, server);
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 3, path)
                }
                infoTextAustralia.style.display = "block"
                infoTextAustralia.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextAustralia.innerHTML = `Time: ${path * 10}ms` }, durationCutter(path) * 100);
            }
            /*/////////////////////*/
            else if (server == "east-usa_" && servers[server] == 0 && servers["west-usa_"] > 0 && client == "north-america_" && clients[client] > 0) {
                let path = pings["wna-na"];
                if (clients[client] == 1) {
                    createByteCloudArcName(client, 1, "west-usa_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 1, path)
                }
                else if (clients[client] == 2) {
                    createByteCloudArcName(client, 2, "west-usa_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 2, path)
                }
                else if (clients[client] == 3) {
                    createByteCloudArcName(client, 3, "west-usa_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 3, path)
                }
                infoTextNorthAmerica.style.display = "block"
                infoTextNorthAmerica.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextNorthAmerica.innerHTML = `Time: ${path * 10}ms` }, durationCutter(path) * 100);
            }
            else if (server == "west-usa_" && servers[server] == 0 && servers["east-usa_"] > 0 && client == "north-america_" && clients[client] > 0) {
                let path = pings["ena-na"];
                if (clients[client] == 1) {
                    createByteCloudArcName(client, 1, "east-usa_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 1, path)
                }
                else if (clients[client] == 2) {
                    createByteCloudArcName(client, 2, "east-usa_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 2, path)
                }
                else if (clients[client] == 3) {
                    createByteCloudArcName(client, 3, "east-usa_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 3, path)
                }
                infoTextNorthAmerica.style.display = "block"
                infoTextNorthAmerica.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextNorthAmerica.innerHTML = `Time: ${path * 10}ms` }, durationCutter(path) * 100);
            }
            else if (server == "west-usa_" && servers[server] == 0 && servers["east-usa_"] > 0 && client == "south-america_" && clients[client] > 0) {
                let path = pings["ena-sa"];
                if (clients[client] == 1) {
                    createByteCloudArcName(client, 1, "east-usa_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 1, path)
                }
                else if (clients[client] == 2) {
                    createByteCloudArcName(client, 2, "east-usa_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 2, path)
                }
                else if (clients[client] == 3) {
                    createByteCloudArcName(client, 3, "east-usa_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 3, path)
                }
                infoTextSouthAmerica.style.display = "block"
                infoTextSouthAmerica.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextSouthAmerica.innerHTML = `Time: ${path * 10}ms` }, durationCutter(path) * 100);
            }
            else if (server == "germany_" && servers[server] == 0 && servers["singapore_"] > 0 && client == "europe_" && clients[client] > 0) {
                let path = pings["oc-eu"];
                if (clients[client] == 1) {
                    createByteCloudArcName(client, 1, "singapore_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 1, path)
                }
                else if (clients[client] == 2) {
                    createByteCloudArcName(client, 2, "singapore_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 2, path)
                }
                else if (clients[client] == 3) {
                    createByteCloudArcName(client, 3, "singapore_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 3, path)
                }
                infoTextEurope.style.display = "block"
                infoTextEurope.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextEurope.innerHTML = `Time: ${path * 10}ms` }, durationCutter(path) * 100);
            }
            else if (server == "singapore_" && servers[server] == 0 && servers["germany_"] > 0 && client == "oceania_" && clients[client] > 0) {
                let path = pings["eu-au"];
                if (clients[client] == 1) {
                    createByteCloudArcName(client, 1, "germany_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 1, path)
                }
                else if (clients[client] == 2) {
                    createByteCloudArcName(client, 2, "germany_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 2, path)
                }
                else if (clients[client] == 3) {
                    createByteCloudArcName(client, 3, "germany_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 3, path)
                }
                infoTextAustralia.style.display = "block"
                infoTextAustralia.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextAustralia.innerHTML = `Time: ${path * 10}ms` }, durationCutter(path) * 100);
            }
            else if (server == "singapore_" && servers[server] == 0 && servers["germany_"] > 0 && client == "asia_" && clients[client] > 0) {
                let path = pings["eu-as"];
                if (clients[client] == 1) {
                    createByteCloudArcName(client, 1, "germany_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 1, path)
                }
                else if (clients[client] == 2) {
                    createByteCloudArcName(client, 2, "germany_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 2, path)
                }
                else if (clients[client] == 3) {
                    createByteCloudArcName(client, 3, "germany_");
                    let device = document.querySelector(`.devices-${client}`);
                    anim(device, 3, path)
                }
                infoTextAsia.style.display = "block"
                infoTextAsia.innerHTML = `Latency: ${path}ms`;
                setTimeout(() => { infoTextAsia.innerHTML = `Time: ${path * 10}ms` }, durationCutter(path) * 100);
            }
        }
    }
    setTimeout(() => { nextStep() }, 5500);
}
function showArc(arcName) {
    for (const arc of arcName) {
        let a = document.querySelector(`.${arc}`);
        if (arc == a.classList[1]) {
            a.style.display = "block";
        }
    }
}
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
function arcHide(arcs) {
    for (const arc of arcs) {
        arc.style.display = "none";
    }
}
function anim(element, quantity, duration) {
    let small = element.querySelector('.device-small .screen')
    let medium = element.querySelector('.device-medium .screen')
    let large = element.querySelector('.device-large .screen')
    duration = durationCutter(duration);
    switch (quantity) {
        case 1: {
            small.style.transitionDuration = `${duration / 10}s`;
            small.style.width = "33%";
            console.log(duration)
            break;
        }
        case 2: {
            small.style.transitionDuration = `${duration / 10}s`;
            small.style.width = "33%";
            medium.style.transitionDuration = `${duration / 10}s`;
            medium.style.width = "49%";
            console.log(duration)
            break;
        }
        case 3: {
            small.style.transitionDuration = `${duration / 10}s`;
            small.style.width = "33%";
            medium.style.transitionDuration = `${duration / 10}s`;
            medium.style.width = "49%";
            large.style.transitionDuration = `${duration / 10}s`;
            large.style.width = "78%";
            console.log(duration)
            break;
        }
        default: break;
    }


}
function durationCutter(duration) {
    if (duration > 50) return 50;
    else if (duration < 10) return 10;
    else return duration;
}
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
            }, 1500)
            stepCounter++;
            break;
        }
        default: {
            break;
        }
    }

}
function showText(text, duration) {
    text.style.visibility = "visible";
    text.innerHTML = `Latency: ${duration}ms`;
    setTimeout(() => { text.innerHTML = `Time: ${duration * 10}ms` }, durationCutter(duration) * 100);
}