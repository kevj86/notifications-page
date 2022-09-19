const notifications = [
  {
    name: "Mark Webber",
    avatar: "/assets/images/avatar-mark-webber.webp",
    notification: "reacted to your recent post",
    reaction: "My first tournament today!",
    timestamp: "1m",
    markasread: false,
  },
  {
    name: "Angela Gray",
    avatar: "/assets/images/avatar-angela-gray.webp",
    notification: "followed you",
    reaction: "",
    timestamp: "5m",
    markasread: false,
  },
  {
    name: "Jacob Thompson",
    avatar: "/assets/images/avatar-jacob-thompson.webp",
    notification: "has joined your group",
    reaction: "Chess Club",
    timestamp: "1 day",
    markasread: false,
  },
  {
    name: "Rizky Hasanuddin",
    avatar: "/assets/images/avatar-rizky-hasanuddin.webp",
    notification: "sent you a private message",
    reaction: "",
    timestamp: "5days",
    markasread: true,
  },
  {
    name: "Clare Creaney",
    avatar: "/assets/images/avatar-kimberly-smith.webp",
    notification: "commented on your picture",
    reaction: "",
    timestamp: "1 week",
    markasread: true,
  },
  {
    name: "Nathan Peterson",
    avatar: "/assets/images/avatar-nathan-peterson.webp",
    notification: "reacted to your recent post",
    reaction: "5-end-game strategies to increase your win rate",
    timestamp: "2 weeks",
    markasread: true,
  },
  {
    name: "Anna Kim",
    avatar: "/assets/images/avatar-anna-kim.webp",
    notification: "left the group",
    reaction: "Chess Club",
    timestamp: "2 weeks",
    markasread: true,
  },
];

let markAll = false;
document.querySelectorAll(".note-unread").length;

class Module {
  constructor(data) {
    Object.assign(this, data);
  }

  getNotificationsHtml() {
    const { name, avatar, notification, reaction, timestamp, markasread } =
      this;
    return `
        <div class="notification">
          <img src="${avatar}" alt="avatar of mark webber" class="avatar">
          <div class="user-info">
            <div class="message"><strong>${name} </strong> ${notification} <span class="reaction">${reaction}</span></div>
            <div class="timestamp">${timestamp} ago</div>
          </div>
        `;
  }
}

function render() {
  for (let i = 0; i < notifications.length; i++) {
    document.getElementById("notifications").innerHTML += new Module(
      notifications[i]
    ).getNotificationsHtml();
  }

  for (let j = 0; j < notifications.length; j++) {
    if (!notifications[j].markasread) {
      document
        .querySelectorAll(".notification")
        [j].classList.add("note-unread");
    }
  }

  checkNotifications();
}

// *************** CLICK EVENTS ********************* //

document.addEventListener("DOMContentLoaded", function () {
  const notifyThis = document.querySelectorAll(".notification");
  for (let i = 0; i < notifyThis.length; i++) {
    notifyThis[i].addEventListener("click", clicked);
  }
});

function clicked(e) {
  let tgt = e.currentTarget;
  tgt.classList.toggle("note-unread");
  checkNotifications();
}

document.getElementById("mark-read").addEventListener("click", toggleAllRead);

//***************************************************** */

function checkNotifications() {
  let notifyCount = 0;
  for (let i = 0; i < notifications.length; i++) {
    if (!notifications[i].markasread) {
      notifyCount += 1;
    }
  }

  document.getElementById("notify-count").textContent =
    document.querySelectorAll(".note-unread").length;
}

function toggleAllRead() {
  const notifyThis = document.querySelectorAll(".notification");
  if (!markAll) {
    for (let i = 0; i < notifications.length; i++) {
      notifications[i].markasread = false;
      markAll = true;
      document.getElementById("mark-read").textContent = "Mark all as un-read";
      notifyThis[i].classList.add("note-unread");
    }
  } else {
    for (let i = 0; i < notifications.length; i++) {
      notifications[i].markasread = true;
      markAll = false;
      document.getElementById("mark-read").textContent = "Mark all as read";
      notifyThis[i].classList.remove("note-unread");
    }
  }
  checkNotifications();
}

render();
