   let timer = new easytimer.Timer();
   timer.start();

   let waktu = document.getElementById('waktu');
   
   timer.addEventListener('secondsUpdated', (e)=>{
     waktu.innerHTML = timer.getTimeValues().toString();
   });

let updatePos = document.getElementsByClassName('posisi');

function updateStatus(){
  for(let i=0; i<updatePos.length; ++i){
  //pesan('update status ' + updatePos[i].textContent);
  if(posisi[player[i]]>=26){
   updatePos[i].textContent = "finish";
  }
  else {
   updatePos[i].textContent = posisi[player[i]];
    
  }
  }
}