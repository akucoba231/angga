const dice = document.querySelector('.dice');
const tirai = document.querySelector("#tirai");
tirai.style.display = "none";

let nilaiDice = 0;

const diceSound = new Audio("./assets/gulir.mp3");




const randomDice = () => {
  const random = Math.floor(Math.random() * 10);
  
  
  if(random >= 1 && random <= 6)
  {
    rollDice(random);
  }
  else {
    randomDice();
  }
}

const rollDice = random => {
  dice.style.animation = "rolling 2s linear";
  tirai.style.display = "block";
  diceSound.play();
  
  setTimeout(()=>{
    switch (random) {
      case 1 :
        dice.style.transform = "rotateX(0deg) rotateY(0deg)";
        console.log(1)
        nilaiDice = 1;
  move();
        break;
      case 3 :
        dice.style.transform = "rotateX(0deg) rotateY(90deg)";
        console.log(3)
        nilaiDice = 3;
  move();
        break;
      case 4 :
        dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
        console.log(4)
        nilaiDice = 4;
  move();
        break;
      case 6 :
        dice.style.transform = "rotateX(180deg) rotateY(0deg)";
        console.log(6)
        nilaiDice = 6;
  move();
        //autoGulir(6);
        break;
      case 2 :
        dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
        console.log(2)
        nilaiDice = 2;
  move();
        //autoGulir(2);
        break;
      case 5 :
        dice.style.transform = "rotateX(90deg) rotateY(0deg)";
        console.log(5)
        nilaiDice = 5;
  move();
        //autoGulir(5);
        break;
      default :
        nilaiDice = 0;
  move();
        break;
    }
    
    dice.style.animation = "none";
    tirai.style.display = "none";

    if(diceSound.play()){
      diceSound.load()
    }
  }, 2100);
}
console.log(dice)
dice.addEventListener("click", ()=>{
  randomDice();
});