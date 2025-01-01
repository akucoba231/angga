function cls(){
	console.clear();
}

let macan = document.getElementById('macan');
let bebek = document.getElementById('bebek');
let gajah = document.getElementById('gajah');
let kerbau = document.getElementById('kerbau');
let pionPlayer = document.getElementsByClassName('pion');

let reload = document.getElementById('reload');
reload.onclick = ()=>{
	return confirm("Apakah ingin mengatur ulang permainan ?") ? window.location.reload() : pesan('Permainan dilanjutkan');
}

let numberOfWinner = 0;
let main = document.getElementById('main');
let musik = new Audio("assets/musik.mp3");
musik.load();
musik.onended = ()=>{playMusik()}

let notifSound = new Audio("assets/notif.mp3");
notifSound.load();
function playNotif(){
	if(notifSound.play()){
		notifSound.load();
		notifSound.play();
	}
	else {
	notifSound.play();
}
}

let winSound = new Audio("assets/win.mp3");
winSound.load();
function playWin(){
	if(winSound.play()){
		winSound.load();
		winSound.play();
	}
	else {
	winSound.play();
}
}

let step = new Audio("assets/step.mp3");
step.load();
function playStep(){
	if(step.play()){
		step.load();
		step.play();
	}
	else {
	step.play();
}
}


function playMusik(){
	if(!musik.play()){
		musik.play();
	}
}

function getEl(nama){
	return document.getElementById(nama);
}

let posisi = {
	'macan' : 0,
	'bebek' : 0,
	'gajah' : 0,
	'kerbau' : 0,
}

let player = ['macan','bebek','gajah','kerbau'];

function setPos(el, str) {
	playStep();
	let arr = str.split(',');
	let x = arr[0];
	let y = arr[1];
	let element = getEl(el);
	element.style.left = x + "px";
	element.style.top = y + "px";
	//console.log(el);
	//console.log(x + ',' + y);
}

function mundur(el, sisa){
	console.log('mundur');
	console.log(sisa);
	let element = getEl(el);
	let lokasi = posisi[el]; //26
	//console.log(lokasi);
	let min = 0;

	let m = setInterval(()=>{
		--lokasi //25
		setPos(el, map[el][lokasi]);
		++min;
		console.log(lokasi);
		console.log(min);
		if(min >= sisa){
			posisi[el] = lokasi;
			clearInterval(m);
			cekTile();
			//nextActive();
		}
	}
	, 500);

}


//urutan

function getActive(){
	let tmp = document.getElementsByClassName('active')[0];
	let key = tmp.getAttribute('id');
	return key;
}

function move(){
	if(nilaiDice == 0){
		//do nothing
	}
	else {
		let pion = getActive();
		let lokasi = posisi[pion];
		if(lokasi == 26){
			//lanjut
			//nextActive();
		}
		else {
		let n = 0;
		let x = setInterval(()=>{
			//console.log('jalan');
			++n;
			setPos(pion, map[pion][++lokasi]);
			if(n >= nilaiDice || lokasi >= 26){
				posisi[pion] = lokasi;
				clearInterval(x);
				//console.log(posisi[pion]);
				if(lokasi >= 26){
					let sisa = nilaiDice - n;
					//console.log(sisa);
					if(sisa == 0){
						pesan(`Selamat, pemain ${pion} telah menang!`); // gpp alert
						menang();
						removePlayer(pion);
					}
					else {
						mundur(pion, sisa);
					}
				}
				else {
					cekTile()
					//nextActive();
				}

				
			}
		}, 500);
		}
	}
}


function removePlayer(nama){
	let index = player.indexOf(nama);
	player[index] = "-"; //agar pemenang tidak bisa bermain lagi
	numberOfWinner += 1;
	nextActive();
}

function nextActive(){

	let nama = getEl();
	if(nilaiDice == 6 && numberOfWinner < 4){
		cekPlayer();
	}
	else if(nilaiDice == 6 && numberOfWinner >= 4){
		return confirm(`Semua pemain telah sampai ke finish, reset permainan ?`) ? window.location.reload() : '';
	}
	else if(nilaiDice != 6 && numberOfWinner >= 4){
		return confirm(`Semua pemain telah sampai ke finish, reset permainan ?`) ? window.location.reload() : '';
	}
	else {
		let pionNumber = getEl(getActive()).getAttribute('pion'); //wkwkwk
		pionNumber = parseInt(pionNumber);
		pionPlayer[pionNumber].classList.remove('active');
		if(pionNumber >= 3){
			pionNumber = -1;
		}
		pionPlayer[++pionNumber].classList.add('active');
		updateStatus();
		cekPlayer();
	}
}

function cekPlayer(){
	let nama = getActive();
	if(posisi[nama] >= 26 && nilaiDice == 6){
		nilaiDice = 0;
		pesan(`Pemain ${nama} telah menang, silakan lanjut ke pemain berikutnya.`); //jangan alert
		//removePlayer(nama);
		nextActive();
	}
	else if(posisi[nama] >= 26 && nilaiDice != 6){
		nilaiDice = 0;
		pesan(`Pemain ${nama} telah menang, silakan lanjut ke pemain berikutnya.`); //jangan alert
		//removePlayer(nama);
		nextActive();
	}
	else if(posisi[nama] < 26 && nilaiDice == 6){
		nilaiDice = 0;
		pesan(`Pemain ${nama} mendapat giliran sekali lagi.`); //masih cocok pakai alert
	}
	else {
		//setTimeout(()=>{dice.click()}, 500); //keren euy, main sendiri, unexpected
	}
}


function pesan(text){
	playNotif();
	let box  = document.createElement('div');
	box.setAttribute('class','modal');
	let isiBox =document.createElement('p');
	isiBox.textContent = text;
	box.appendChild(isiBox);

	document.body.appendChild(box);
	setTimeout(()=>{
		document.body.removeChild(box);
	}, 4500);
}

function cekTile(){
	let nama = getActive();
	//nextActive(); //jika misi rahasia sudah dikerjakan
	//alert(`Pemain ${nama} berada pada posisi ${posisi[nama]}`);
	if(!(posisi[nama] in misi[nama])){
		//do nothing
	}
	else{
		let tmpMisi = misi[nama][posisi[nama]];
		tmpMisi = tmpMisi.split(',');
		let title = tmpMisi[0];
		let video = tmpMisi[1];
		video = video.replace('view','preview');
		modal(title, video);
		//setTimeout(()=>{
			//window.open(video);
		//}, 800);
	}

	nextActive();
	
}

function modal(text, video){
	let videoContainer = document.createElement('div');
	videoContainer.setAttribute('class','videoContainer');
	videoContainer.innerHTML = `
	<iframe src="${video}" width="640" height="480" allow="autoplay">
	</iframe>
	<a href="${video.replace('preview','view')}">Tekan di sini, jika video gagal dimuat...</a>
	`;
	let modal = document.createElement('div');
	modal.setAttribute('class','modalMisi');
	let isiModal = document.createElement('p');
	isiModal.textContent = text;
	modal.appendChild(videoContainer);
	modal.appendChild(isiModal);
	let close = document.createElement('button');
	close.setAttribute('class','btnClose');
	close.textContent = "X";
	modal.appendChild(close);

	main.appendChild(modal);
	close.onclick = (e)=>{
		main.removeChild(modal);
	}
}


document.body.onclick = ()=>{ playMusik() }
