const mansSmall = document.querySelectorAll(".man-small");
const mansMedium = document.querySelectorAll(".man-medium");
const mansLarge = document.querySelectorAll(".man-large");
const servers = document.querySelectorAll(".server");
const devices = document.querySelectorAll(".device");
const arcs = document.querySelectorAll(".arc");
const mans = document.querySelectorAll(".man");
const text = document.querySelector(".text");
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
                byteCloudArcShow(checkedClients, checkedServers);
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
            arcShow(checkedClients, checkedServers);
            stepCounter++;
            break;
        }
        default: {
            break;
        }
    }

}

function arcShow(clients, servers) {
    let arcNameStart = "arc_";
    let arcName = [];
    for (const key in servers) {
        if (servers[key] == 2) {
            arcNameStart += key;
        }
    }
    for (const key in clients) {
        if (clients[key] == 1) {
            arcName.push(arcNameStart + key + "large");
        }
        if (clients[key] == 2) {
            arcName.push(arcNameStart + key + "large");
            arcName.push(arcNameStart + key + "medium");
        }
        if (clients[key] == 3) {
            arcName.push(arcNameStart + key + "small");
            arcName.push(arcNameStart + key + "medium");
            arcName.push(arcNameStart + key + "large");
        }
    }
    showArc(arcName);
}
function byteCloudArcShow(clients, servers) {
    for (const server in servers) {
        for (const client in clients) {
            if (server == "east-usa_" && servers[server] > 0 && client == "north-america_" && clients[client] > 0) {
                if (clients[client] == 1) { createByteCloudArcName(client, 1, server); }
                else if (clients[client] == 2) { createByteCloudArcName(client, 2, server); }
                else if (clients[client] == 3) { createByteCloudArcName(client, 3, server); }
            }
            else if (server == "west-usa_" && servers[server] > 0 && client == "south-america_" && clients[client] > 0) {
                if (clients[client] == 1) { createByteCloudArcName(client, 1, server); }
                else if (clients[client] == 2) { createByteCloudArcName(client, 2, server); }
                else if (clients[client] == 3) { createByteCloudArcName(client, 3, server); }
            }
            else if (server == "germany_" && servers[server] > 0 && client == "europe_" && clients[client] > 0) {
                if (clients[client] == 1) { createByteCloudArcName(client, 1, server); }
                else if (clients[client] == 2) { createByteCloudArcName(client, 2, server); }
                else if (clients[client] == 3) { createByteCloudArcName(client, 3, server); }
            }
            else if (server == "singapore_" && servers[server] > 0 && client == "asia_" && clients[client] > 0) {
                if (clients[client] == 1) { createByteCloudArcName(client, 1, server); }
                else if (clients[client] == 2) { createByteCloudArcName(client, 2, server); }
                else if (clients[client] == 3) { createByteCloudArcName(client, 3, server); }
            }
            else if (server == "singapore_" && servers[server] > 0 && client == "oceania_" && clients[client] > 0) {
                if (clients[client] == 1) { createByteCloudArcName(client, 1, server); }
                else if (clients[client] == 2) { createByteCloudArcName(client, 2, server); }
                else if (clients[client] == 3) { createByteCloudArcName(client, 3, server); }
            }
            ////////////////////////////////
            else if (server == "east-usa_" && servers[server] == 0 && servers["west-usa_"] == 1 && client == "north-america_" && clients[client] > 0) {
                if (clients[client] == 1) { createByteCloudArcName(client, 1, "west-usa_"); }
                else if (clients[client] == 2) { createByteCloudArcName(client, 2, "west-usa_"); }
                else if (clients[client] == 3) { createByteCloudArcName(client, 3, "west-usa_"); }
            }
            else if (server == "west-usa_" && servers[server] == 0 && servers["east-usa_"] == 1 && client == "south-america_" && clients[client] > 0) {
                console.log(servers["east-usa_"]);
                if (clients[client] == 1) { createByteCloudArcName(client, 1, "east-usa_"); }
                else if (clients[client] == 2) { createByteCloudArcName(client, 2, "east-usa_"); }
                else if (clients[client] == 3) { createByteCloudArcName(client, 3, "east-usa_"); }
            }
            else if (server == "germany_" && servers[server] == 0 && servers["singapore_"] == 1 && client == "europe_" && clients[client] > 0) {
                if (clients[client] == 1) { createByteCloudArcName(client, 1, "singapore_"); }
                else if (clients[client] == 2) { createByteCloudArcName(client, 2, "singapore_"); }
                else if (clients[client] == 3) { createByteCloudArcName(client, 3, "singapore_"); }
            }
            else if (server == "singapore_" && servers[server] == 0 && servers["germany_"] == 1 && client == "oceania_" && clients[client] > 0) {
                if (clients[client] == 1) { createByteCloudArcName(client, 1, "germany_"); }
                else if (clients[client] == 2) { createByteCloudArcName(client, 2, "germany_"); }
                else if (clients[client] == 3) { createByteCloudArcName(client, 3, "germany_"); }
            }
            else if (server == "singapore_" && servers[server] == 0 && servers["germany_"] == 1 && client == "asia_" && clients[client] > 0) {
                if (clients[client] == 1) { createByteCloudArcName(client, 1, "germany_"); }
                else if (clients[client] == 2) { createByteCloudArcName(client, 2, "germany_"); }
                else if (clients[client] == 3) { createByteCloudArcName(client, 3, "germany_"); }
            }
        }
    }
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