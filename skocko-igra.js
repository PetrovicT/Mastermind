var sekvenca1;
var sekvenca2;
var mesto_fokusa = ["", "fokus_1", "fokus_2"]

function zapocniPodesavanja() {
	sekvenca_zemalja1 = [];
	localStorage.setItem("sekvenca_zemalja1", "");
	igrac2_sekvenca_zemalja = [];
	localStorage.setItem("sekvenca_zemalja2", "");
	var p = document.getElementById("gotova_komb");
	p.style.visibility = "hidden";
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
	var kartice = document.querySelectorAll("div.kartica");


	var vracen_fokus_na_prvu_karticu = 0;
	// 4 za po svakog igraca posto smo dohvatili sve kartice, a zelimo da brisemo samo za jednog
	for (let i = 0; i < 8; i++) {
		let vlasnik_kartice = nadji_igraca(kartice[i]);
		if (vlasnik_kartice != br_igraca) continue;
		else {
			// kada obrise sekvencu da se ispise ? na kartici
			kartice[i].innerHTML = "<img class='icon' src='skocko-dodatno/upitnik2.png' alt='?'>";
			kartice[i].classList.remove(mesto_fokusa[br_igraca]);

			// prva na koju naidjemo je zapravo prva kartica od tog igraca i na nju treba da se vratimo kada sve obrisemo
			if (vracen_fokus_na_prvu_karticu == 0) {
				kartice[i].classList.add(mesto_fokusa[br_igraca]);
				vracen_fokus_na_prvu_karticu = 1;
			}
		}
	}
}

function potvrdi(kliknuta_kartica) {
	// koji igrac potvrdjuje
	var br_igraca = nadji_igraca(kliknuta_kartica);
	// uzeli smo od oba igraca kartice
	var kartice = document.querySelectorAll("div.kartica");

	// cuvanje unete sekvence
	var sekvenca = [];
	var br_dodatih = 0;
	for (let i = 0; i < 8; i++) {
		kliknuta_kartica = kartice[i];
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
		kartice = document.getElementsByClassName("izbor");
		for (let i = 0; i < kartice.length; i++) {
			if (kartice[i].classList.contains("sacekaj_igraca")) kartice[i].classList.remove("sacekaj_igraca");
			else
				if (br_igraca == 1) kartice[i].style.visibility = "hidden";
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

	localStorage.setItem("sekvenca_zemalja" + br_igraca, JSON.stringingingify(sekvenca));

	// ako je sve u redu, predji na igru
	if (localStorage.getItem("sekvenca_zemalja1") && localStorage.getItem("sekvenca_zemalja2") && manje_od_4 == 0) {
		window.location.href = "skocko-igra.html";
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var trenutni_igrac = 1;
var kraj_partije = false;

function zapocni_igru() {
	sekvenca1 = localStorage.getItem("sekvenca_zemalja1");
	sekvenca2 = localStorage.getItem("sekvenca_zemalja2");
	if (sekvenca1 == null || sekvenca2 == null) {
		alert("Nisu dobro unete sekvence drzava!");
		window.location.href = "skocko-podesavanja.html";
	}
	sekvenca1 = JSON.parse(sekvenca1);
	sekvenca2 = JSON.parse(sekvenca2);
	dodajDogadjaje();
	setInterval(stoperica, 1000);
}

function oznaci_pogodke(pogodak) {
	var kartice = document.querySelectorAll(".trenutni_red >.vertical_raspored > .raspored > .kartica_igra_mini");
	for (let i = 0; i < pogodak[0] + pogodak[1]; ++i) {
		if (i < pogodak[0]) kartice[i].classList.add("tacno_mesto_i_zemlja");
		else kartice[i].classList.add("tacna_zemlja");
	}
}

function setCharAt(string, index, novi_karakter) {
	if (index > string.length - 1) return string;
	return string.substring(0, index) + novi_karakter + string.substring(index + 1);
}
function nereseno() {
	alert("Nerešeno - niko nije pogodio kombinaciju!");
	window.location.href = "skocko-podesavanja.html";
}

function prebaci_na_sled_igraca() {
	var trenutniRed = document.querySelector(".trenutni_red");

	var br_reda_igraca = trenutniRed.id;
	trenutniRed.classList.remove("trenutni_red");
	if (br_reda_igraca.charAt(4) == "7" && trenutni_igrac == 2) {
		kraj_partije = true;
		setTimeout(nereseno, 1000);
	}
	var protivnikov_sledeci_red = "";
	if (trenutni_igrac == 1) {
		protivnikov_sledeci_red = br_reda_igraca;
		protivnikov_sledeci_red = setCharAt(protivnikov_sledeci_red, 5, "2");
	}
	else {
		protivnikov_sledeci_red = br_reda_igraca;
		protivnikov_sledeci_red = setCharAt(protivnikov_sledeci_red, 5, "1");
		var karakter = protivnikov_sledeci_red.charAt(4);
		karakter = String.fromCharCode(karakter.charCodeAt(0) + 1);
		protivnikov_sledeci_red = setCharAt(protivnikov_sledeci_red, 4, karakter);
	}
	var sledeci_red = document.getElementById(protivnikov_sledeci_red);
	sledeci_red.classList.add("trenutni_red");

	// dohvati prvu karticu novog trenutnog reda i stavi u fokus
	var kartica = document.querySelector(".row.red_igra.trenutni_red > .kartice > .kartica_igra");
	kartica.classList.add(mesto_fokusa[3 - trenutni_igrac]);
}

function toggle_kartice_unos() {
	var kartice_unos = document.getElementsByClassName("izbor_mini");
	for (let i = 0; i < kartice_unos.length; i++) {
		if (kartice_unos[i].classList.contains("ne_prikazuj"))
			kartice_unos[i].classList.remove("ne_prikazuj");
		else kartice_unos[i].classList.add("ne_prikazuj");
	}
}

function kliknuto(kliknuta_kartica) {
	// ako prvi igrac pogadja sekvencu, nije dozvoljeno i drugom dok prvi ne zavrsi
	if (kliknuta_kartica.classList.contains("sacekaj_igraca")) return;
	// ako kliknemo na karticu ? ili popunjenu ne radi nista
	if (kliknuta_kartica.classList.contains("kartica_igra")) return;
	// ako kliknemo na one 4 kartice koje prikazuju pogodak ne radi nista
	if (kliknuta_kartica.classList.contains("kartica_igra_mini")) return;

	var br_igraca = nadji_igraca(kliknuta_kartica);
	var kartica_u_fokusu;
	if (br_igraca == 1) kartica_u_fokusu = document.querySelector(".fokus_1");
	if (br_igraca == 2) kartica_u_fokusu = document.querySelector(".fokus_2");

	// staru odfokusiraj
	kartica_u_fokusu.classList.remove(mesto_fokusa[br_igraca]);

	if (kartica_u_fokusu.classList.contains("izbor_mini")) var kartica = kliknuta_kartica;
	else var kartica = kartica_u_fokusu;

	kartica_u_fokusu.innerHTML = kliknuta_kartica.innerHTML;

	// prebaci fokus na sledecu karticu u sekvenci ako ima sledece
	if (kartica.nextElementSibling != null)
		kartica.nextElementSibling.classList.add(mesto_fokusa[br_igraca]);
}

function pogodak(pokusano, tacno) {
	var biti_pogodka = [0, 0];
	// koliko se ponavlja svaka od zemalja, 0 indeks nam ne treba, 1-6 su zemlje
	var br_ponavljanja = [0, 0, 0, 0, 0, 0, 0];

	for (let i = 0; i < 4; i++) {
		var trenutna_zemlja_tacne_sekvence = tacno[i];
		br_ponavljanja[trenutna_zemlja_tacne_sekvence] = br_ponavljanja[trenutna_zemlja_tacne_sekvence] + 1;
	}
	for (let i = 0; i < pokusano.length; i++) {
		if (pokusano[i] == tacno[i]) {
			// i na mestu i tacna drzava
			biti_pogodka[0] = biti_pogodka[0] + 1;
			br_ponavljanja[pokusano[i]] = br_ponavljanja[pokusano[i]] - 1;
		}
	}
	for (let i = 0; i < pokusano.length; ++i) {
		var trenutna_zemlja_tacne_sekvence = tacno[i];
		var trenutna_zemlja_pokusane_sekvence = pokusano[i];
		if ((trenutna_zemlja_pokusane_sekvence != trenutna_zemlja_tacne_sekvence) && br_ponavljanja[trenutna_zemlja_pokusane_sekvence] > 0) {
			biti_pogodka[1]++;
			br_ponavljanja[trenutna_zemlja_pokusane_sekvence]--;
		}
	}
	return biti_pogodka;
}

function prikazi_pogodak(dugme_proveri) {
	var br_igraca = nadji_igraca(dugme_proveri);
	// Ako pokusam da proverim red tudjeg igraca
	if (br_igraca != trenutni_igrac) { return; }
	// Da li se proverava red koji se trenutno puni?
	var trenutni_red = dugme_proveri.closest(".trenutni_red");
	if (trenutni_red == null) { return; }

	var kartice = document.querySelectorAll(".trenutni_red > .kartice > .kartica_igra");
	var sekvenca = [];
	var br_dodatih = 0;
	for (let i = 0; i < kartice.length; i++) {
		kliknuta_kartica = kartice[i];
		if (nadji_igraca(kliknuta_kartica) != br_igraca) { continue; }
		sekvenca[br_dodatih] = odredi_izabranu_zemlju(kliknuta_kartica);
		br_dodatih++;
	}

	var manje_od_4 = 0;
	for (let i = 0; i < sekvenca.length; ++i) {
		if (sekvenca[i] == 0) {
			manje_od_4 = 1;
		}
	}

	if (manje_od_4 == 1) {
		alert("Niste uneli sve 4 zemlje u sekvencu!");
	} else {

		var izabrana1 = document.getElementsByClassName("fokus_1");
		var izabrana2 = document.getElementsByClassName("fokus_2");
		for (let i = 0; i < izabrana1.length; ++i) { izabrana1[i].classList.remove("fokus_1"); }
		for (let i = 0; i < izabrana2.length; ++i) { izabrana2[i].classList.remove("fokus_2"); }

		if (trenutni_igrac == 1)
			var pogodak_biti = pogodak(sekvenca, sekvenca2);
		else
			var pogodak_biti = pogodak(sekvenca, sekvenca1);

		// oznaci pogodke - 4 kvadratica desno
		oznaci_pogodke(pogodak_biti);

		if (pogodak_biti[0] == 4) {
			kraj_partije = true;
			alert("Pobeda igrača " + br_igraca);
			window.location.href = "skocko-uputstvo.html";
		}
		prebaci_na_sled_igraca();
		toggle_kartice_unos();

		if (trenutni_igrac == 1) trenutni_igrac = 2;
		else trenutni_igrac = 1;
	}
}

function stoperica() {
	var tajmeri = document.getElementsByClassName("tajmer_text");
	
	var elem1 = tajmeri[0];
	if (trenutni_igrac == 1) {
		if (tajmeri[0].closest("#igrac1") == null) {
			tajmeri[1].innerHTML = tajmeri[1].innerHTML - 1;
			aktivan_tajmer = tajmeri[1];
		}
		else {
			tajmeri[0].innerHTML = tajmeri[0].innerHTML - 1;
			aktivan_tajmer = tajmeri[0];
		}
	}
	else {
		if (tajmeri[0].closest("#igrac1") == null) {
			aktivan_tajmer = tajmeri[0];
			tajmeri[0].innerHTML = tajmeri[0].innerHTML - 1;
		}
		else {
			tajmeri[1].innerHTML = tajmeri[1].innerHTML - 1;
			aktivan_tajmer = tajmeri[1];
		}
	}

	if (!kraj_partije && aktivan_tajmer.innerHTML == 0) {
		if (trenutni_igrac == 1)
			alert("Igrač " + trenutni_igrac + " nema više vremena za pogađanje!" + "\nPobedio je igrač 2!");
		else alert("Igrač " + trenutni_igrac + " nema više vremena za pogađanje!" + "\nPobedio je igrač 1!");
		kraj_partije = true;
		window.location.href = "skocko-podesavanja.html";
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dodajDogadjaje() {

	let niz = document.getElementsByClassName("kartica_igra");
	for (let i = 0; i < niz.length; i++) {
		niz[i].addEventListener("click", function () {
			kliknuto(niz[i]);
		});
	}

	let niz2 = document.getElementsByClassName("dugme_proveri");
	for (let i = 0; i < niz2.length; i++) {
		niz2[i].addEventListener("click", function () {
			prikazi_pogodak(niz2[i]);
		});
	}

	let niz3 = document.getElementsByClassName("izbor_mini");
	for (let i = 0; i < niz3.length; i++) {
		niz3[i].addEventListener("click", function () {
			kliknuto(niz3[i]);
		});
	}
}