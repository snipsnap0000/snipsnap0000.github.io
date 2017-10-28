function alertPurr(text) {
	window.alert('asd')
	document.getElementById('fadeout').style.opacity = '1';
	document.getElementById('fadeout').innerHTML = text;

	window.setTimeout(function(document.getElementById('fadeout').style.opacity = '0';) {}, 5000); //8 seconds
}

function getSound() {
	var s = randn_bm() * 4.5;

	if (s <= -10) {
		return 'мяу...';
	}

	if (s > -10 && s <= -9) {
		return 'мяу';
	}

	if (s >= -9 && s < -8) {
		return '*принес мышку*';
	}

	if (s >= -8 && s < -7) {
		return '...';
	}

	if (s >= -7 && s < -6) {
		return 'Zzz...';
	}

	if (s >= -6 && s < -5) {
		return 'мур...';
	}

	if (s >= -5 && s < -4) {
		return '*кусь*';
	}

	if (s >= -4 && s < -3) {
		return '*лизнул ручку*';
	}

	if (s >= -3 && s < -2) {
		return '*погладился*';
	}

	if (s >= -2 && s < 2) {
		return 'мур';
	}

	if (s >= 2 && s < 3) {
		return 'мурр';
	}

	if (s >= 3 && s < 4) {
		return 'мур-мур';
	}

	if (s >= 4 && s < 8) {
		return 'м' + 'y'.repeat(s) + 'р';
	}

	if (s >= 8 && s <= 10) {
		return 'мур ^-^';
	}

	if (s > 10) {
		return 'мур ❤';
	}
}

function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

document.addEventListener(
	"keyup",
	function onKeyUp(e) {
	  if (e.keyCode === 13) alertPurr(getSound());
	},
	false
);

