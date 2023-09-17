let boxes = document.getElementsByClassName("box");
let flag = true;
const arr = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function winner(ele) {
  switch (ele) {
    case "X":
      return 1; // First Player Won!
    case "O":
      return -1; //Second Player Won!
  }
}

function check(arr) {
  // Checking all rows
  let element;
  for (let i = 0; i < 3; i++) {
    if (!arr[i][0]) continue;
    if (arr[i][0] == arr[i][1] && arr[i][1] == arr[i][2]) {
      element = arr[i][0];

      //win color
      for (let box of boxes) {
        if (box.dataset.r == i) {
          box.style.color = "#17A589";
        } else {
          box.style.color = "#E5E8E8";
        }
      }

      return winner(element);
    }
  }

  // Checking all columns
  for (let i = 0; i < 3; i++) {
    if (!arr[0][i]) continue;
    if (arr[0][i] == arr[1][i] && arr[1][i] == arr[2][i]) {
      element = arr[0][i];

      //win color
      for (let box of boxes) {
        if (box.dataset.c == i) {
          box.style.color = "#17A589";
        } else {
          box.style.color = "#E5E8E8";
        }
      }

      return winner(element);
    }
  }

  // Checking diagonal Elements

  if (arr[0][0] && arr[0][0] == arr[1][1] && arr[1][1] == arr[2][2]) {
    //Right Diagonal
    element = arr[1][1];
    //win color
    let c = 0;
    for (let box of boxes) {
      if (box.dataset.r == c && box.dataset.c == c) {
        box.style.color = "#17A589";
        c++;
      } else {
        box.style.color = "#E5E8E8";
      }
    }

    return winner(element);
  }

  if (arr[2][0] && arr[2][0] == arr[1][1] && arr[1][1] == arr[0][2]) {
    //Left Diagonal
    element = arr[1][1];
    //win color
    let c = 0;
    for (let box of boxes) {
      if (box.dataset.r == c && box.dataset.c == 2 - c) {
        box.style.color = "#17A589";
        c++;
      } else {
        box.style.color = "#E5E8E8";
      }
    }

    return winner(element);
  }
  return 0;
}

function trigger() {
  if (!this.textContent) {
    text = flag ? "X" : "O";
    this.style.color = flag ? "#B03A2E" : "#2874A6";
    this.textContent = text;
    arr[this.dataset.r][this.dataset.c] = text;
    flag = flag ? false : true;

    let result = check(arr);
    if (trigger.count === undefined) {
      trigger.count = 0;
    }

    if (result) {
      if (result == 1) {
        document.getElementById("winX").classList.add("visible");
      }
      else {
        document.getElementById("winO").classList.add("visible");
      }
      return;
    }
    trigger.count++;
    if (trigger.count == 9) {
      for (box of boxes) {
        box.style.color = "#424949";
      }
      console.log("No one Won");
      document.getElementById("tie").classList.add("visible");
      return;
    }
  }
}

for (let box of boxes) {
  box.addEventListener("click", trigger);
}

const replays = document.getElementsByClassName("replay");

Array.from(replays).forEach((replay) => {
  replay.addEventListener("click", () => {
    for (let box of boxes) {
      box.textContent = "";
      box.removeAttribute("style");
    }
    for(let i =0;i<3;i++){
      for(let j=0;j<3;j++){
        arr[i][j] = 0;
      }
    }

    flag = true;
    trigger.count = 0;

    document.querySelector(".visible").classList.remove("visible");
  });
});

const play = document.getElementById("play");
play.addEventListener("click",function(){
  document.getElementById("intro").classList.remove("visible");
})
