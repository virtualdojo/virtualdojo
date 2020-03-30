/////////////////////////////////////////////////////////
// Constants
/////////////////////////////////////////////////////////
let api;

const options = {
  url: "./partecipanti.json", // config file
  imgPath: "assets/images/",
  navTimeout: 10000,
  modal: {
    before: "Troppo presto, l'evento inizierà Sabato alle ore 14:55.",
    live: "L'evento è iniziato. Entra nella stanza principale.",
    after: "L'evento è terminato."
  },
  // Jitsi Meet
  jitsi: {
    domain: "meet.jit.si",
    options: {
      roomName: "", // Initial room
      width: "100%",
      height: "100%",
      parentNode: document.querySelector("#meet")
    }
  }
};

/////////////////////////////////////////////////////////
// Fetch JSON
/////////////////////////////////////////////////////////
let data;

fetch(options.url)
  .then(function(u) {
    return u.json();
  })
  .then(function(json) {
    data = json;
    setDate();
  });

/////////////////////////////////////////////////////////
// Timer
/////////////////////////////////////////////////////////

const setDate = () => {
  const current = new Date();

  let start = new Date(data.date.start);
  let end = new Date(data.date.end);

  if (current.getTime() < start.getTime()) {
    document.querySelector("#close-modal").style.display = "none";
    document.querySelector("#timer").innerHTML = options.modal.before;
  } else if (current.getTime() > end.getTime()) {
    document.querySelector("#close-modal").style.display = "none";
    document.querySelector("#timer").innerHTML = options.modal.after;
  } else document.querySelector("#timer").innerHTML = options.modal.live;
};

/////////////////////////////////////////////////////////

const rooms = document.querySelector("#rooms"); // nav div
const nav = document.querySelector(".nav");

// Event Listener Close Button
const close = document.querySelectorAll(".close");
for (const item of close) {
  item.addEventListener("click", function(e) {
    const parentClass = item.getAttribute("data-close");
    const parent = document.querySelector("." + parentClass);
    parent.style.display = "none";

    // Event: Modal closed, start call on the main room and build nav
    if (item.getAttribute("data-url") === "main") {
      createRooms();
    }
  });
}

// Create Rooms - passed modal
const createRooms = function() {
  // Init Main Room
  options.jitsi.options.roomName = data.main;
  api = new JitsiMeetExternalAPI(options.jitsi.domain, options.jitsi.options);

  // add link
  setButtons(document.querySelector("#home"), data.main);
  setButtons(document.querySelector("#support"), data.support);

  // add date
  document.querySelector("#date").innerHTML = data.date.event;

  data.rooms.map(item => {
    // create new Room
    var node = document.createElement("div");
    node.classList.add("room");
    node.setAttribute("data-url", item.jitsi);

    // TODO: can we add an overlay in another way?
    node.style.backgroundImage =
      `linear-gradient(
            rgba(161, 162, 195, 0.25), 
            rgba(161, 162, 195, 0.25)
          ), url(` +
      options.imgPath +
      item.img +
      `)`;

    // text div
    var textDiv = document.createElement("div");
    textDiv.classList.add("room-text");

    // room Name
    var roomName = document.createElement("div");
    roomName.classList.add("room-name");
    roomName.innerHTML += item.name;

    // room Members
    var roomMem = document.createElement("div");
    roomMem.classList.add("room-members");
    roomMem.innerHTML += item.members; // TODO: map each items

    textDiv.appendChild(roomName);
    textDiv.appendChild(roomMem);
    node.appendChild(textDiv);
    rooms.appendChild(node);
    addRoomClick(); // add Event Handler to each room
  });
};

const initCall = function(room) {
  api.dispose(); // destroy existing meet
  options.jitsi.options.roomName = room.getAttribute("data-url"); // change room name
  api = new JitsiMeetExternalAPI(options.jitsi.domain, options.jitsi.options); // generate new meet
  nav.style.display = "none";
};

const setButtons = function(btn, link) {
  btn.setAttribute("data-url", link);
  btn.addEventListener("click", e => initCall(btn));
};

const addRoomClick = () => {
  const rows = document.querySelectorAll(".room");
  // for each room add on click listener
  for (const row of rows) {
    row.addEventListener("click", e => initCall(row));
  }
};

// Open Nav
const bookmark = document.querySelector(".bookmark");
bookmark.addEventListener("click", function(e) {
  if (nav.style.display === "none") {
    nav.style.display = "block";

    setTimeout(() => {
      nav.style.display = "none";
    }, options.navTimeout);
  } else {
    // reverse
    nav.style.display = "none";
  }
});
