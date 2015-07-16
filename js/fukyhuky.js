function fnDalej () {
//***************************************************************
// zobrazí vstupný formulár

	document.getElementById("divMemento").style.display="none";
	document.getElementById("divUvod").style.display="inline";
	document.getElementById("som").focus();
	}

function fnIdes() {
//***************************************************************
// skontroluje formulár a dáta a vypíše zostávajúcu dĺžku života 
			
	var e=validateForm();			//skontroluje formulár 'vstup'
	if (e===false) {				//ak nie je niečo OK, zastaví beh programu
		return;
		};
			
	var d=validateData();			//skontroluje a vypočíta vstupné data
	if (d===false) {				//ak nie je niečo OK, zastaví beh programu
		return;
		};
	
	document.getElementById("btnIdes").style.display="none";
	document.getElementById("pUvod").style.display="none";
	document.getElementById("som").setAttribute("readonly");
//	document.getElementById("narodeny").setAttribute("readonly");
//	document.getElementById("narodeny_mesiac").setAttribute("readonly");
	document.getElementById("narodeny_rok").setAttribute("readonly");
	document.getElementById("vek").setAttribute("readonly");
	document.getElementById("divPocty").style.display="inline";
	document.getElementById("btnPocty").focus();
	}

function fnPocty() {
//***************************************************************
// zobrazí tabuľku 'tblPocty' atď.
	document.getElementById("pPocty").style.display="none";
	document.getElementById("btnPocty").style.display="none";
	document.getElementById("divFuky").style.display="inline";	
	document.getElementById("btnGrafy").focus();
	editableVstup();
	}
	
function fnGrafy() {
//***************************************************************
//vypočíta a zobrazí grafy

	vyplnRoky();
	vytvorGrafy ();
	document.getElementById("btnGrafy").style.display="none";
	document.getElementById("pSkore").style.display="none";
	document.getElementById("divZnova").style.display="inline";	
	document.getElementById("btnZnova").focus();
	}

function fnZnova()  {
//***************************************************************
//znova načíta stránkuu

	location.reload();
  }
				 
function validateForm() {
//****************************************************************
// skontroluje úplnosť vyplnených polí formulára "vstup" 
			
	var a=document.forms.frmVstup.som.value;
	if (a===null || a==="") {		//ak je prázdne pole "som" ...
		alert ("Nehanbi sa - kto si ?");
		return false;				//zastaví beh funkcie
		};

//	nepoužívané po zmene input poľa pre dátum narodenia (kvôli IE a FF)
//	var b=document.forms.frmVstup.narodeny.value;
//	if (b===null || b==="") {		//ak je prázdne pole "narodeny"
//		alert ("Zadaj dátum narodenia !");
//		return false;				//zastaví beh funkcie
//		};

//	var bm=document.forms.frmVstup.narodeny_mesiac.value;
//	if (bm===null || bm==="") {		//ak je prázdne pole "narodeny_mesiac"
//		alert ("Zadaj mesiac narodenia !");
//		return false;				//zastaví beh funkcie
//		};

	var br=document.forms.frmVstup.narodeny_rok.value;
	if (br===null || br==="") {		//ak je prázdne pole "narodeny_rok"
		alert ("Zadaj rok narodenia !");
		return false;				//zastaví beh funkcie
		};

	var c=document.forms.frmVstup.vek.value;
	if (c===null || c==="") {		//ak je prázdne pole "vek"
		alert ("Zadaj vek dožitia !");
		return false;				//zastaví beh funkcie
		};
	}
	
function validateData(){
//****************************************************************
// skontroluje a vypočíta vstupné data

	var y=aktualnyRok();			//zistí aktuálny rok
	var x=rokNarodenia();			//vypočíta rok narodenia							
	var s=ktoSom();					//zistí užívateľa
	var v=vekDozitia();				//zistí požadovaný vek dožitia
	var w=x+v-y;					//vypočíta počet zostávajúcich rokov
	if (w < 0) {					//ak je záporný ...
		alert("Už by si bol mŕtvy, zadaj iný vek dožitia !");
		return false;				//zastaví beh programu
	};
	var e=y-x;
	var z=(w <= 4)?"Máš "+e+" rokov a už Ti zostávajú iba "+w+" roky života, "+s+" !":"Máš "+e+" rokov a už Ti zostáva iba "+w+" rokov života, "+s+" !";
									//zostaví reťazec s výsledkom
	document.getElementById("pZostava").innerHTML=z;
									//zapíše do elementu
	}	 

function vyplnRoky() {
//*****************************************************************
// vypočíta hodnoty a vyplní formulár "fucky"
					
	var vekOdDoId=["oddo1","oddo2","oddo3","oddo4","oddo5","oddo6"];
	var pocetId=["pocet1","pocet2","pocet3","pocet4","pocet5","pocet6"];
	var rokyEsteId=["rokyEste1","rokyEste2","rokyEste3","rokyEste4","rokyEste5","rokyEste6"];
	var pocetEsteSpoluId=["pocetEsteSpolu1","pocetEsteSpolu2","pocetEsteSpolu3","pocetEsteSpolu4","pocetEsteSpolu5","pocetEsteSpolu6"];
	var pocetEsteKumulId=["pocetEsteKumul1","pocetEsteKumul2","pocetEsteKumul3","pocetEsteKumul4","pocetEsteKumul5","pocetEsteKumul6"];
	var rokyDoterazId=["rokyDoteraz1","rokyDoteraz2","rokyDoteraz3","rokyDoteraz4","rokyDoteraz5","rokyDoteraz6"];
	var pocetDoterazSpoluId=["pocetDoterazSpolu1","pocetDoterazSpolu2","pocetDoterazSpolu3","pocetDoterazSpolu4","pocetDoterazSpolu5","pocetDoterazSpolu6"];
	var pocetDoterazKumulId=["pocetDoterazKumul1","pocetDoterazKumul2","pocetDoterazKumul3","pocetDoterazKumul4","pocetDoterazKumul5","pocetDoterazKumul6"];
	var vekOD,vekDO,pocet;
	var rokyEste,pocetEsteSpolu;
	var rokyDoteraz,pocetDoterazSpolu;
	var pocetEsteKumul=0;
	var pocetDoterazKumul=0;
		
	for (var i=0;i < 6;i++) {
		vekOD=document.getElementById(vekOdDoId[i]).innerHTML.slice(0,2);
		vekDO=document.getElementById(vekOdDoId[i]).innerHTML.slice(3,5);
		rokyEste=vypocitajRokyEste(vekOD,vekDO);
		document.getElementById(rokyEsteId[i]).innerHTML=rokyEste;
		pocet=document.getElementById(pocetId[i]).innerHTML;		
		pocetEsteSpolu=pocetSpolu(pocet,rokyEste);		
		document.getElementById(pocetEsteSpoluId[i]).innerHTML=pocetEsteSpolu;
		pocetEsteKumul=pocetEsteKumul+pocetEsteSpolu;
		//document.getElementById(pocetEsteKumulId[i]).innerHTML=pocetEsteKumul;
		rokyDoteraz=vypocitajRokyDoteraz(vekOD,vekDO);
		document.getElementById(rokyDoterazId[i]).innerHTML=rokyDoteraz;
		pocetDoterazSpolu=pocetSpolu(pocet,rokyDoteraz);
		document.getElementById(pocetDoterazSpoluId[i]).innerHTML=pocetDoterazSpolu;
		pocetDoterazKumul=pocetDoterazKumul+pocetDoterazSpolu;
		//document.getElementById(pocetDoterazKumulId[i]).innerHTML=pocetDoterazKumul;
		};
	}
	
function editableVstup() {
//*********************************************************************
// umožní editáciu polí v tabuľke "pocty"
	
	$('#tblPocty td')
	//****************************************************************
	//make table editable, refresh charts on blur$(function()
		.click(function(){
		if( !$(this).is('.input') ){
			$(this).addClass('input')
				.html('<input type="text" value="'+ $(this).text() +'" />')
				.find('input').focus()
				.blur(function(){
				//remove td class, remove input
					$(this).parent().removeClass('input').html($(this).val() || 0);
						//update charts	
						vyplnRoky();
						$('.visualize').trigger('visualizeRefresh');
								});					
									}
					})
		.hover(function(){
			$(this).addClass('hover'); },function(){ $(this).removeClass('hover'); })
	}

function vytvorGrafy (){
//*********************************************************************
// vytvorí grafy
			
	$(function(){
	//****************************************************************
	//zavolá metódu visualize a zobrazí graf
		$('#tblFukyHuky')
			.visualize({type: 'pie', width: '400px', height: '150px', title:'Tvoj sex - celkom'});
		});	

	$(function(){
	//*****************************************************************
	//zavolá metódu visualize a zobrazí graf
		$('#tblFukyHuky')
			.visualize({type: 'bar', width: '400px', height: '150px', title: 'Tvoj sex - podľa veku'});
		});
	}

function vypocitajRokyEste(DatumOd,DatumDo) {
//*****************************************************************
			
	var y=aktualnyRok();			//zistí aktuálny rok
	var x=rokNarodenia();			//vypočíta rok narodenia
	var v=vekDozitia();				//zistí požadovaný vek dožitia	
	var o=new Number(DatumOd);		//zistí rok OD a upraví formát na NUMBER
	var xo=x+o;						//vypočíta začiatok periódy		
		
	var d=new Number(DatumDo);		//zistí rok DO a upraví formát na NUMBER
	var dx=d+x;						//vypočíta koniec periódy	
			
	if (y>dx) {						//ak je aktuálny rok vyšší ako koniec periódy ...
			return 0;				//... vráti 0
			}
		else {
			if (y>=xo && y<=dx)	{	//ak je aktuálny rok v rámci periódy a ...
				if ((x+v)>=xo && (x+v)<=dx){
									// ... rok dožitia je v rámci periódy ...
						var r=x+v-y;
						return r;	//... vráti rok dožitia mínus aktuálny rok
						}
					else {			// ... rok dožitia nie je v rámci periódy ...
//						var r=(dx-xo)-(y-xo)
						var r=dx-y;
						return r;	//... vráti počet rokov do začiatku periódy
						}
					}
				else {
					if ((x+v)>=xo && (x+v)<=dx){
									// ... rok dožitia je v rámci periódy ...
						var r=x+v-xo;
						return r;	//... vráti počet zostávajúcich rokov v rámci periódy
						}
					else {			//... rok dožitia nie je v rámci periódy ...
						if(xo >= (x+v)) {
								return 0;	//... vráti 0
								}
							else {
								var r=dx-xo;
								return r;	//... vráti 0
								}
						}
					}
			}
	}
		
function vypocitajRokyDoteraz(DatumOd,DatumDo) {
//*****************************************************************	
	var y=aktualnyRok();			//zistí aktuálny rok
	var x=rokNarodenia();			//vypočíta rok narodenia
	var v=vekDozitia();				//zistí požadovaný vek dožitia	
	var o=new Number(DatumOd);		//zistí rok OD a upraví formát na NUMBER
	var xo=x+o;						//vypočíta začiatok periódy		
			
	var d=new Number(DatumDo);		//zistí rok DO a upraví formát na NUMBER
	var dx=d+x;						//vypočíta koniec periódy
				
	if (y>dx) {						//ak je aktuálny rok vyšší ako koniec periódy ...
			var r=dx-xo;
			return r;				//... vráti dĺžku periódy
			}
		else {
			if (y>=xo && y<=dx)	{	//ak je aktuálny rok v rámci periódy ...
//				var r=(dx-xo)-(dx-y);
				var r=y-xo;
				return r;			//... vráti počet rokov doteraz v rámci periódy
				}
				else {				//ak je aktuálny rok nižší, ako začiatok periódy ...
					return 0;		//... vráti nulu
					}
				}
	}
		
function aktualnyRok() {
//*****************************************************************
	var a=new Date();				//zistí aktuálny dátum
	var b=a.getFullYear();			//zistí aktuálny rok
	return b;
	}
		
function rokNarodenia() {
//*****************************************************************
//	nepoužívané po zmene input poľa pre dátum narodenia (kvôli IE a FF)
//	var n=document.forms.frmVstup.narodeny.value;
//									//zistí dátum narodenia
//	n=new Date(n);					//upraví formát na DATE
//	var x=n.getFullYear();			//vypočíta rok narodenia
	
	var x=document.forms.frmVstup.narodeny_rok.value;
	x=new Number(x);				//upraví formát na NUMBER
	return x;						//zistí rok narodenia
	}

function ktoSom() {
//*****************************************************************
	var s=document.forms.frmVstup.som.value;
	return s;						//zistí užívateľa
	}
		
function vekDozitia() {
//*****************************************************************
	var v=document.forms.frmVstup.vek.value;
									//zistí požadovaný vek dožitia
	v=new Number(v);				//upraví formát na NUMBER
	return v;
	}
		
function pocetSpolu(Pocet,Roky) {
//*****************************************************************
	var p=new Number(Pocet);
	var ps=p*Roky;
	return ps;
	}
		
function callVisualize() {
//*************************************************************
	$("tblFucky").visualize();
	alert ("Fungujem !");
		}