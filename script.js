const currentTime = document.querySelector("h1"),
      selectMenu = document.querySelectorAll("select"),
      setAlaremBtn = document.querySelector("button"),
      content = document.querySelector(".content");

let alarmTime, isAlarm = false,
  ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = ` <option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = ` <option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = ` <option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  // Get Hour, miniute, and seconds

  let data = new Date(),
    h = data.getHours(),
    m = data.getMinutes(),
    s = data.getSeconds(),
    ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }

  // If Hour Value is 0 set this value to 12
  h = h == 0 ? h = 12 : h;
  // Adding 0 before h, min, sec if this value less than 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime == `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
    console.log("Alarm rinngs ...");
  }
});

function setAlarm() {

  if(isAlarm){
    alarmTime = ""
    ringtone.pause();
    content.classList.remove("disabled");
    setAlaremBtn.innerText = "Set Alarm";
    return isAlarm = false;
  }


  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("Am/PM")
  ) {
    return alert("Please select a valied time  to set alarm!");
  }
  isAlarm = true;
  alarmTime = time;
  content.classList.add("disabled");
  setAlaremBtn.innerText = "Clear Alarm";
}

setAlaremBtn.addEventListener("click", setAlarm);
