var map = L.map('map').setView([46.3, 2.3], 6);
        
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
		function reset() 
		{
			javascript:window.location.reload();
		}

		
        Papa.parse("caracteristiques_2014.csv", {
            header: true,
			delimiter:";",
			dynamicTyping: true,
			download: true,
            complete: function(results) {

                var accident = results.data;
                $.getJSON("departements.geojson", function (data) {
					
			    function couleur (d) {

					var depp = 0;
					console.log(d);
					for(var i =0; i < 29291; i++){
						if(accident[i].dep == d){
							depp++;
						}
					}
					console.log(depp);
					
                    var r = 255,
                    g = Math.floor((1 - (depp - 3) / (731 - 3)) * 255),
                    b = Math.floor((1 - (depp - 3) / (731 - 3)) * 255);
	
                    return "rgb(" + r + ", " + g + ", " + b + ")";
					
                }     

					
                    // Ajout des départements, avec un remplissage en fonction de la variable an15trim2
                    L.geoJson(data, {
                        // option de style à mettre ici
                        style: function (feature) {
                            return { 
								fillColor: couleur(feature.properties.code),
                                fillOpacity: 1,
                                weight: 1,
                                color: "#000",
                                opacity: 1
                            };
                        },
                        // option pour gestion des événements
                        onEachFeature: function (feature, layer) {
                            layer.on({
                                mouseover: function (e) {
                                    var prop = e.target.feature.properties;
                                    document.getElementById("info").innerHTML = prop.nom + ' (' + prop.code + ')';
									var dep = 0;
										for(var i =0; i < 29291; i++){
											if(accident[i].dep == prop.code){
												dep++;
											}
										}
									document.getElementById("nbaccident").innerHTML = dep;
									},
								click: function (e) {
// ------------------------------------ GOOGLE CHART ----------------------------------------------------------------								
																		
									// javascript:window.location.reload();
									 // Load the Visualization API and the corechart package.
									google.charts.load('current', {'packages':['corechart']});

									// Set a callback to run when the Google Visualization API is loaded.
									  google.charts.setOnLoadCallback(drawChart);
									  google.charts.setOnLoadCallback(drawChart2);
									  google.charts.setOnLoadCallback(drawSeriesChart);
									  google.charts.setOnLoadCallback(drawChart3);

									  // Callback that creates and populates a data table,
									  // instantiates the pie chart, passes in the data and
									  // draws it.
									  function drawChart() {

										var prop = e.target.feature.properties;	
										// Create the data table.
										var normale = 0, Pluielegere = 0, Pluieforte = 0, Neige = 0, Brouillard = 0, Ventfort = 0, Tempe = 0, Tempc = 0, Autre = 0;
										
										for(var i =0; i < 29291; i++){
											if(accident[i].dep == prop.code)
											{
												if(accident[i].atm == 1)
													normale++;
												if(accident[i].atm == 2)
													Pluielegere++;
												if(accident[i].atm == 3)
													Pluieforte++;
												if(accident[i].atm == 4)
													Neige++;
												if(accident[i].atm == 5)
													Brouillard++;
												if(accident[i].atm == 6)
													Ventfort++;
												if(accident[i].atm == 7)
													Tempe++;
												if(accident[i].atm == 8)
													Tempc++;
												if(accident[i].atm == 9)
													Autre++;
											}
										}
										
										var data = new google.visualization.DataTable();
										data.addColumn('string', 'Topping');
										data.addColumn('number', 'Slices');
										
										data.addRows([
										  ['Normale', normale],
										  ['Pluie legere', Pluielegere],
										  ['Pluie forte', Pluieforte],
										  ['Neige', Neige],
										  ['Brouillard', Brouillard],
										  ['Vent fort', Ventfort],
										  ['Temps eblouissant', Tempe],
										  ['Temps couvert', Tempc],
										  ['Autre', Autre]
										]);
										
												// Set chart options
										var options = {'title':'Les accidents en fonction du temps',
													   'width':600,
													   'height':350,
													   pieHole: 0.4};

										// Instantiate and draw our chart, passing in some options.
										var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
										chart.draw(data, options);
									  }	
									  
									function drawChart2() {

										var prop2 = e.target.feature.properties;	
										// Create the data table.
										var deuxvehiculefront = 0, deuxvehiculearr = 0, deuxvehiculecot = 0, troisvehiculechaine = 0, troisvehiculecol = 0, autrecolli = 0, Sanscolli = 0;
										
										for(var i =0; i < 29291; i++){
											if(accident[i].dep == prop2.code)
											{
												if(accident[i].col == 1)
													deuxvehiculefront++;
												if(accident[i].col == 2)
													deuxvehiculearr++;
												if(accident[i].col == 3)
													deuxvehiculecot++;
												if(accident[i].col == 4)
													troisvehiculechaine++;
												if(accident[i].col == 5)
													troisvehiculecol++;
												if(accident[i].col == 6)
													autrecolli++;
												if(accident[i].col == 7)
													Sanscolli;
											}
										}
										
										var data2 = new google.visualization.DataTable();
										data2.addColumn('string', 'Topping');
										data2.addColumn('number', 'Slices');
										
										data2.addRows([
										  ['Deux vehicules frontale', deuxvehiculefront],
										  ['Deux vehicules par l’arriere', deuxvehiculearr],
										  ['Deux vehicules par le cote', deuxvehiculecot],
										  ['Trois vehicules et plus en chaine', troisvehiculechaine],
										  ['Trois vehicules et plus collisions multiples', troisvehiculecol],
										  ['Autre collision', autrecolli],
										  ['Sans collision', Sanscolli],
										]);
										
												// Set chart options
										var options2 = {'title':'Les différents types de collisions',
													   'width':600,
													   'height':350};

										// Instantiate and draw our chart, passing in some options.
										var chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
										chart.draw(data2, options2);
									  }
										function drawChart3() {

										var prop = e.target.feature.properties;	
										// Create the data table.
										var PleinJour = 0, Aube = 0, NuitSans = 0, NuitAvecN = 0, NuitAvecO = 0;
										
										for(var i =0; i < 29291; i++){
											if(accident[i].dep == prop.code)
											{
												if(accident[i].atm == 1)
													PleinJour++;
												if(accident[i].atm == 2)
													Aube++;
												if(accident[i].atm == 3)
													NuitSans++;
												if(accident[i].atm == 4)
													NuitAvecN++;
												if(accident[i].atm == 5)
													NuitAvecO++;									
											}
										}
										
										var data = new google.visualization.DataTable();
										data.addColumn('string', 'Topping');
										data.addColumn('number', 'Slices');
										
										data.addRows([
										  ['Plein jour', PleinJour],
										  ['Crépuscule ou aube', Aube],
										  ['Nuit sans éclairage public', NuitSans],
										  ['Nuit avec éclairage public non allumé', NuitAvecN],
										  ['Nuit avec éclairage public allumé', NuitAvecO]
										]);
										
												// Set chart options
										var options = {'title':'Conditions d’éclairage dans lesquelles l’accident s’est produit',
													   'width':600,
													   'height':350,
													   pieHole: 0.4};

										// Instantiate and draw our chart, passing in some options.
										var chart = new google.visualization.PieChart(document.getElementById('chart_div4'));
										chart.draw(data, options);
									  }	
										function drawSeriesChart() {
										var prop3 = e.target.feature.properties;
										var enagglo1 = 0, horsagglo1 = 0,enagglo2 = 0, horsagglo2 = 0,enagglo3 = 0, horsagglo3 = 0,enagglo4 = 0, horsagglo4 = 0,enagglo4 = 0, horsagglo4 = 0, enagglo5 = 0, horsagglo5 = 0,enagglo6 = 0, horsagglo6 = 0,enagglo7 = 0, horsagglo7 = 0,enagglo8 = 0, horsagglo8 = 0,enagglo9 = 0, horsagglo9 = 0, enagglo10 = 0, horsagglo10 = 0,enagglo11 = 0, horsagglo11 = 0,enagglo12 = 0, horsagglo12 = 0;										
										for(var i =0; i < 29291; i++){
											if(accident[i].dep == prop3.code)
											{
												if(accident[i].mois == 1)
												{
													if(accident[i].agg == 1)
														enagglo1++;
													if(accident[i].agg == 2)
														horsagglo1++;
												}
												if(accident[i].mois == 2)
												{
													if(accident[i].agg == 1)
														enagglo1++;
													if(accident[i].agg == 2)
														horsagglo1++;
												}
												if(accident[i].mois == 2)
												{
													if(accident[i].agg == 1)
														enagglo2++;
													if(accident[i].agg == 2)
														horsagglo2++;
												}
												if(accident[i].mois == 3)
												{
													if(accident[i].agg == 1)
														enagglo3++;
													if(accident[i].agg == 2)
														horsagglo3++;
												}
												if(accident[i].mois == 4)
												{
													if(accident[i].agg == 1)
														enagglo4++;
													if(accident[i].agg == 2)
														horsagglo4++;
												}	
												if(accident[i].mois == 5)
												{
													if(accident[i].agg == 1)
														enagglo5++;
													if(accident[i].agg == 2)
														horsagglo5++;
												}	
												if(accident[i].mois == 6)
												{
													if(accident[i].agg == 1)
														enagglo6++;
													if(accident[i].agg == 2)
														horsagglo6++;
												}
												if(accident[i].mois == 7)
												{
													if(accident[i].agg == 1)
														enagglo7++;
													if(accident[i].agg == 2)
														horsagglo7++;
												}
												if(accident[i].mois == 8)
												{
													if(accident[i].agg == 1)
														enagglo8++;
													if(accident[i].agg == 2)
														horsagglo8++;
												}
												if(accident[i].mois == 9)
												{
													if(accident[i].agg == 1)
														enagglo9++;
													if(accident[i].agg == 2)
														horsagglo9++;
												}
												if(accident[i].mois == 10)
												{
													if(accident[i].agg == 1)
														enagglo10++;
													if(accident[i].agg == 2)
														horsagglo10++;
												}
												if(accident[i].mois == 11)
												{
													if(accident[i].agg == 1)
														enagglo11++;
													if(accident[i].agg == 2)
														horsagglo11++;
												}
												if(accident[i].mois == 12)
												{
													if(accident[i].agg == 1)
														enagglo12++;
													if(accident[i].agg == 2)
														horsagglo12++;
												}												
											}
										}
																						
										var data = google.visualization.arrayToDataTable([
												  ['Mois', 'En agglo', 'Hors agglo'],
												  ['Janvier',  enagglo1,      horsagglo1],
												  ['Fevrier',  enagglo2,      horsagglo2],
												  ['Mars',  enagglo3,       horsagglo3],
												  ['Avril',  enagglo4,      horsagglo4],
												  ['Mai',  enagglo5,      horsagglo5],
												  ['Juin',  enagglo6,      horsagglo6],
												  ['Juillet',  enagglo7,      horsagglo7],
												  ['Aout',  enagglo8,      horsagglo8],
												  ['Septembre',  enagglo9,      horsagglo9],
												  ['Octobre',  enagglo10,      horsagglo10],
												  ['Novembre',  enagglo11,      horsagglo11],
												  ['Decembre',  enagglo12,      horsagglo12],
												]);
										console.log(data);
												var options = {
												  title: 'Accidents en/hors agglomeration par mois',
												  'width':1200,
												  'height':350,											  
												  hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
												  vAxis: {minValue: 0}
												};
												var chart = new google.visualization.AreaChart(document.getElementById('chart_div3'));
												chart.draw(data, options);
										}									  
									},
																		
// ------------------------------- FIN GOOGLE CHART ------------------------------------------------------------------		
                                mouseout: function (e) {
                                    document.getElementById("info").innerHTML = "";
									document.getElementById("nbaccident").innerHTML = "";
                                }
                            })
						}
                    }).addTo(map);
                });
            }
        });