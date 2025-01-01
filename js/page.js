let cover = document.getElementById('cover');
let hint = document.getElementById('hint');
let btnHint = document.getElementById('btnHint');

cover.onclick = ()=>{
	fadeOut(cover);
}

hint.onclick = ()=>{
	fadeOut(hint);
}

function fadeOut(el) {
	if(!(el.classList.contains('fadeIn'))){
		el.classList.add('fadeOut');
	}
	else {
		el.classList.replace('fadeIn','fadeOut');
	}
	setTimeout(()=>{
		if(!(el.getAttribute('style'))){
			el.setAttribute('style','display: none');
		}
		else {
			el.style.display = "none";
		}
	},1500);
}

function fadeIn(el) {
	el.style.display = "block";
	if(!(el.classList.contains('fadeOut'))){
		el.classList.add('fadeIn');
	}
	else {
		el.classList.replace('fadeOut','fadeIn');
	}
}

btnHint.onclick = ()=>{
	fadeIn(hint);
}