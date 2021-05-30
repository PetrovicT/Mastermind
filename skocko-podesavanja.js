var mesto_fokusa = ["", "fokus_1", "fokus_2"]

function zapocniPodesavanja() {
	sekvenca_zemalja1 = [];
	localStorage.setItem("sekvenca_zemalja1", "");
	igrac2_sekvenca_zemalja = [];
	localStorage.setItem("sekvenca_zemalja2", "");
	var p = document.getElementById("gotova_komb");
	p.style.visibility = "hidden";
	dodajDogadjaje();
}

function nadji_igraca(elem) {
	if (elem.closest("#igrac1") == null) return 2;
	else return 1;
}

function kartica_kliknuta(kliknuta_kartica) {
	// ako prvi igrac bira sekvencu, nije dozvoljeno i drugom dok prvi ne zavrsi
	if (kliknuta_kartica.classList.contains("sacekaj_igraca")) return;

	// ako kliknemo na karticu ? ili popunjenu ne radi nista
	if (kliknuta_kartica.classList.contains("kartica")) return;

	var br_igraca = nadji_igraca(kliknuta_kartica);
	var kartica_u_fokusu;
	if (br_igraca == 1) kartica_u_fokusu = document.querySelector(".fokus_1");
	if (br_igraca == 2) kartica_u_fokusu = document.querySelector(".fokus_2");
	kartica_u_fokusu.classList.remove(mesto_fokusa[br_igraca]);

	kartica_u_fokusu.innerHTML = kliknuta_kartica.innerHTML;
	// prebaci fokus na sledecu karticu u sekvenci ako ima sledece
	if (kartica_u_fokusu.nextElementSibling != null) kartica_u_fokusu.nextElementSibling.classList.add(mesto_fokusa[br_igraca]);
}

// pronadji koju karticu je igrac izabrao
function odredi_izabranu_zemlju(kartica) {
	var zemlja = new RegExp("Srbija");
	if (zemlja.test(kartica.innerHTML)) return 1;
	var zemlja = new RegExp("Španija");
	if (zemlja.test(kartica.innerHTML)) return 2;
	var zemlja = new RegExp("USA");
	if (zemlja.test(kartica.innerHTML)) return 3;
	var zemlja = new RegExp("JKoreja");
	if (zemlja.test(kartica.innerHTML)) return 4;
	var zemlja = new RegExp("Kanada");
	if (zemlja.test(kartica.innerHTML)) return 5;
	var zemlja = new RegExp("Palestina");
	if (zemlja.test(kartica.innerHTML)) return 6;
	return 0;
}

//brisanje kartica odnosno izbora sekvence da bi se omogucilo ponovno popunjavanje kombinacije
function obrisi_sekvencu(kliknuta_kartica) {
	// koji igrac zeli ponovo da popuni kombinaciju
	var br_igraca = nadji_igraca(kliknuta_kartica);
	if (br_igraca == 1) {
		localStorage.setItem("sekvenca_zemalja1", "");
		//sekvenca_zemalja1 = [];
	}

	if (br_igraca == 2) {
		localStorage.setItem("sekvenca_zemalja2", "");
		//sekvenca_zemalja2 = [];
	}

	//dohvati sve kartice kako bi ih sve obrisao
	var _niz = document.querySelectorAll("div.kartica");


	var vracen_fokus_na_prvu_karticu = 0;
	// 4 za po svakog igraca posto smo dohvatili sve kartice, a zelimo da brisemo samo za jednog
	for (let i = 0; i < 8; i++) {
		let vlasnik__niz = nadji_igraca(_niz[i]);
		if (vlasnik__niz != br_igraca) continue;
		else {
			// kada obrise sekvencu da se ispise ? na kartici
			_niz[i].innerHTML = "<img class='icon' src='skocko-dodatno/upitnik2.png' alt='?'>";
			_niz[i].classList.remove(mesto_fokusa[br_igraca]);

			// prva na koju naidjemo je zapravo prva kartica od tog igraca i na nju treba da se vratimo kada sve obrisemo
			if (vracen_fokus_na_prvu_karticu == 0) {
				_niz[i].classList.add(mesto_fokusa[br_igraca]);
				vracen_fokus_na_prvu_karticu = 1;
			}
		}
	}
}

function potvrdi(kliknuta_kartica) {
	// koji igrac potvrdjuje
	var br_igraca = nadji_igraca(kliknuta_kartica);
	// uzeli smo od oba igraca _niz
	var _niz = document.querySelectorAll("div.kartica");

	// cuvanje unete sekvence
	var sekvenca = [];
	var br_dodatih = 0;
	for (let i = 0; i < 8; i++) {
		kliknuta_kartica = _niz[i];
		if (nadji_igraca(kliknuta_kartica) != br_igraca)
			continue;
		else {
			sekvenca[br_dodatih] = odredi_izabranu_zemlju(kliknuta_kartica);
			br_dodatih++;
		}
	}

	var manje_od_4 = 0;
	for (let i = 0; i < 4; ++i) {
		if (sekvenca[i] == 0) {
			manje_od_4 = 1;
		}
	}
	if (manje_od_4 == 1) {
		alert("Niste uneli sve 4 zemlje u sekvencu!");
	}
	else {
		// Ako igra igrac, i popunio je sve 4 zemlje, onda se njemu blokira/hide, a drugom igracu daje mogucnost da bira sekvencu
		_niz = document.getElementsByClassName("izbor");
		for (let i = 0; i < _niz.length; i++) {
			if (_niz[i].classList.contains("sacekaj_igraca")) _niz[i].classList.remove("sacekaj_igraca");
			else
				if (br_igraca == 1) _niz[i].style.visibility = "hidden";
		}
		if (br_igraca == 1) {
			var dugme1 = document.getElementById("dugme1");
			var dugme2 = document.getElementById("dugme2");
			dugme1.style.visibility = "hidden";
			dugme2.style.visibility = "hidden";
			var p = document.getElementById("gotova_komb");
			p.style.visibility = "visible";
			var zemlje = document.getElementsByClassName("izbor");
			for (let i = 0; i < zemlje.length; i++) {
				if (zemlje[i].classList.contains("sacekaj_igraca")) zemlje[i].classList.remove("sacekaj_igraca");
			}
			var dugmici = document.getElementsByClassName("dugme");
			for (let i = 0; i < dugmici.length; i++) {
				if (dugmici[i].classList.contains("sacekaj_igraca")) dugmici[i].classList.remove("sacekaj_igraca");
			}
			var cekaj_komb = document.getElementById("cekaj_komb");
			cekaj_komb.style.visibility = "hidden";
		}
	}

	localStorage.setItem("sekvenca_zemalja" + br_igraca, JSON.stringify(sekvenca));

	// ako je sve u redu, predji na igru
	if (localStorage.getItem("sekvenca_zemalja1") && localStorage.getItem("sekvenca_zemalja2") && manje_od_4 == 0) {
		window.location.href = "skocko-igra.html";
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dodajDogadjaje() {

	let _niz = document.getElementsByClassName("kartica");
	for (let i = 0; i < _niz.length; i++) {
		_niz[i].addEventListener("click", function () {
			kartica_kliknuta(_niz[i]);
		});
	}

	let niz2 = document.getElementsByClassName("izbor");
	for (let i = 0; i < niz2.length; i++) {
		niz2[i].addEventListener("click", function () {
			kartica_kliknuta(niz2[i]);
		});
	}

	let dugme1 = document.getElementById("dugme1");
	dugme1.addEventListener("click", function () {
		obrisi_sekvencu(dugme1);
	});

	let dugme2 = document.getElementById("dugme2");
	dugme2.addEventListener("click", function () {
		potvrdi(dugme2);
	});

	let dugme3 = document.getElementById("dugme3");
	dugme3.addEventListener("click", function () {
		obrisi_sekvencu(dugme3);
	});

	let dugme4 = document.getElementById("dugme4");
	dugme4.addEventListener("click", function () {
		potvrdi(dugme4);
	});
}