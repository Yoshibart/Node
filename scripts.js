
let combined = []
let startTime = 0,endTime = 0,elapsedTime=0;

const loadDoc = () =>{
	let read = ""
	const data = {}
	//Stores the different elements of data thats to be merged
	let data1, data2,data3, data4,data5, data6;
	const url1 = "currency.json",
	url2 = "city.json",
	url3 = "coastline.json",
	url4 = "continent.json",
	url5 = "domain.json",
	url6 = "flag.json";

	//Uses ajax to receive resources from the server
	//The function accepts  arguments url for accessing a resource and a callback function
	//after successfully receiving all resources 
	const getData = (url, call) => {
		url = `http://127.0.0.1:8081/${url}`
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200)  {
				call(JSON.parse(xhttp.responseText));
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	};

	//On completion following code is executed
	//This includes measuring time taken for execution
	startTime = performance.now();
	getData(url1, (content) => {
		endTime = performance.now();
		//Sums up the timetaken for execution
		elapsedTime += endTime - startTime;
		read += `<p>File ${url1} has been read</p>`
		document.getElementById("read").innerHTML = read;
		data1 = content;
		//calls the combine function
		if(content) combine();
	});
	startTime = performance.now();
	getData(url2, (content) => {
		endTime = performance.now();
		elapsedTime += endTime - startTime;
		read += `<p>File ${url2} has been read</p>`
		document.getElementById("read").innerHTML = read;
		data2 = content;
		if(content) combine();
	});
	startTime = performance.now();
	getData(url3, (content) => {
		endTime = performance.now();
		elapsedTime += endTime - startTime;
		read += `<p>File ${url3} has been read</p>`
		document.getElementById("read").innerHTML = read;
		data3 = content;
		if(content) combine();
	});
	startTime = performance.now();
	getData(url4, (content) => {
		endTime = performance.now();
		elapsedTime += endTime - startTime;
		read += `<p>File ${url4} has been read</p>`
		document.getElementById("read").innerHTML = read;
		data4 = content;
		if(content) combine();
	});
	startTime = performance.now();
	getData(url5, (content) => {
		endTime = performance.now();
		elapsedTime += endTime - startTime;
		read += `<p>File ${url5} has been read</p>`
		document.getElementById("read").innerHTML = read;
		data5 = content;
		if(content) combine();
	});
	startTime = performance.now();
	getData(url6, (content) => {
		endTime = performance.now();
		elapsedTime += endTime - startTime;
		read += `<p>File ${url6} has been read</p>`
		document.getElementById("read").innerHTML = read;
		document.getElementById("finished").innerHTML = `The table has been created and has taken ${Math.ceil(elapsedTime/1000)} second${(Math.ceil(elapsedTime/1000)) > 1 ? "s" : ""}`;

		data6 = content;
		if(content) combine();
	});
	//The combine function is executed to merge different sets of data
	const combine = () => {

		//If not all data has completed loading the return
		if(!data1 || !data2 || !data3 || !data4 || !data5 || !data6){
			//console.log("Wait!! Data Still Loading");
			return;
		}
		
		//Uses the map function to create an array of countries 
		const countries = data1.map((key)=> key.country);

		//for each country create a new row entry in the data object
		for(let country of countries){
			data[country] = {country}
			//searches different datasets matching and creating data rows
			data[country]["currency"] = data1.find(item => item.country === country)?.currency_name;
			data[country]["city"] = data2.find((obj) => obj.country === country)?.city;
			data[country]["coastline"] = data3.find(item => item.country === country)?.costline
			data[country]["continent"] = data4.find(item => item.country === country)?.continent;
			data[country]["domain"] = data5.find(item => item.country === country)?.tld;
			data[country]["flag"] = data6.find(item => item.country === country)?.flag_base64;
		}

		let ta = 1;
		let tabe = ""
		//Creates table row Header
		tabe += '<thead><tr>'
		tabe += 	'<th id="name">Country</th>';
		tabe += 	'<th class="fade-city">City</th>';
		tabe += 	'<th>Continent</th>';
		tabe += 	'<th class="h-currency">Currency</th>';
		tabe += 	'<th>CoastLine</th>';
		tabe += 	'<th>Domain</th>';
		tabe += 	'<th  class="h-flag">Flag</th>';
		tabe += '</tr></thead>';
		combined.push(tabe)
		//creates data rows using the data merged in the data element
		for(let country of countries){
			let tabe ='<tr id="'+country+'">';
				tabe += `<td tabindex=${ta++} >`+data[country].country+'</td>';
				tabe += `<td class="fade-city" tabindex=${ta++} >`+data[country].city+'</td>';
				tabe += `<td tabindex=${ta++}>`+data[country].continent+'</td>';
				tabe += `<td class="h-currency" tabindex=${ta++}>`+data[country].currency+'</td>';
				tabe += `<td tabindex=${ta++}>`+data[country].coastline+'</td>';
				tabe += `<td tabindex=${ta++}>`+data[country].domain+'</td>';
				tabe += `<td class="h-flag" tabindex=${ta++}>` +'<img src="'+data[country].flag+ '" alt="'+data[country].country+ ' flag" style="width:6.25rem; height:3.125rem;"></td>';
			tabe += '</tr>'
			//Inserts data rows in the combined array
			combined.push(tabe)
		}
	};
}
//this code is executed after the website has completed loading
$(document).ready(function(){
	//Buttons are hidden when website has completed loading
	$("#hide-albania-button").hide();
	$("#fade-thead").hide();
	$("#first20-button").hide();
	$("#hide-flags").hide();
	$("#slide-currency").hide();
	$("#animate-thead").hide();
	$("#fadeToggle-city").hide();
	//Set 5second time interval when button is clicked
	$("#start-button").click(function(){
		setTimeout(loadDoc, 5000);
		setTimeout(run, 5090);
	});
})

const run = ()=>{
	first_twenty();
	$("#hide-albania-button").show();
	$("#fade-thead").show();
	$("#first20-button").show();
	$("#hide-flags").show();
	$("#slide-currency").show();
	$("#animate-thead").show();
	$("#fadeToggle-city").show();
	$("#start-button").hide();

	//OnClick toggles the section with ID Albania and changes the innerHTML of the button
	let showAlbania = true;
	$("#hide-albania-button").click(function(){
  		$("#Albania").toggle("slow");
  		if(showAlbania){
  		  	document.getElementById("hide-albania-button").innerHTML = '<i class="icon-expand-alt"></i> ToggleIn Albania';
  		}else{
  			document.getElementById("hide-albania-button").innerHTML = '<i class="icon-expand-alt"></i> ToggleOut Albania';
  		}
  		showAlbania = !showAlbania;
	});
	//OnClick fadeIn and Out the section with ID fade-thead and changes the innerHTML of the button
	let fade_thead = true;
	$("#fade-thead").click(function(){
  		if(fade_thead){
  			$("thead").fadeOut(); 
  			$("thead").fadeOut("slow"); 
  			$("thead").fadeOut(5000); 
  		  	document.getElementById("fade-thead").innerHTML = '<i class="icon-expand-alt"></i> FadeIn THead';
  		}else{
  			$("thead").fadeIn(); 
  			$("thead").fadeIn("slow"); 
  			$("thead").fadeIn(5000); 
  			document.getElementById("fade-thead").innerHTML = '<i class="icon-expand-alt"></i> FadeOut THead';
  		}
  		fade_thead = !fade_thead;
	});
	//OnClick hides or shows the section with class h-flag and changes the innerHTML of the button
	let hide_flags = true;
	$("#hide-flags").click(function(){
  		if(hide_flags){
  			$(".h-flag").hide(); 
  		  	document.getElementById("hide-flags").innerHTML = '<i class="icon-expand-alt"></i> Show Flags';
  		}else{
  			$(".h-flag").show();
  			document.getElementById("hide-flags").innerHTML = '<i class="icon-expand-alt"></i> Hide Flags';
  		}
  		hide_flags = !hide_flags;
	});
	//OnClick animates the thead by changing the height
	let animate_thead = true;
	$("#animate-thead").click(function(){
  		if(animate_thead){
  			$("thead").animate({height: '15rem'},"slow");
  		}else{
  			$("thead").animate({height: '5rem'},"slow");
  		}
  		animate_thead = !animate_thead;
	});
	//OnClick SlideUp or down the section with ID h-currency and changes the innerHTML of the button
	let slide_currency = true;
	$("#slide-currency").click(function(){
  		if(slide_currency){
  			$(".h-currency").slideUp("slow"); 
  		  	document.getElementById("slide-currency").innerHTML = '<i class="icon-expand-alt"></i> SlideIn Currency';
  		}else{
  			$(".h-currency").slideDown("slow");
  			document.getElementById("slide-currency").innerHTML = '<i class="icon-expand-alt"></i> SlideOut Currency';
  		}
  		slide_currency = !slide_currency;
	});
	//OnClick fadeToggle the section with class fade-city and changes the innerHTML of the button
	let fade_toggle_city = true;
	$("#fadeToggle-city").click(function(){
		$( ".fade-city" ).fadeToggle( "slow", "linear" );
  		if(fade_toggle_city){
  		  	document.getElementById("fadeToggle-city").innerHTML = '<i class="icon-expand-alt"></i> FadeToggleIn City';
  		}else{
  			document.getElementById("fadeToggle-city").innerHTML = '<i class="icon-expand-alt"></i> FadeToggleOut City';
  		}
  		fade_toggle_city = !fade_toggle_city;
	});
	//OnClick show the first 20 rows or all the rows changes the innerHTML of the button
	let showFirstTwenty = false;
	$("#first20-button").click(function(){
	  if(showFirstTwenty){
	    first_twenty();
	  	document.getElementById("first20-button").innerHTML = '<i class="icon-expand-alt"></i> Show All';
	  } else {
	    all();
	  	document.getElementById("first20-button").innerHTML = '<i class="icon-expand-alt"></i> Show 20';
	  }
	  showFirstTwenty = !showFirstTwenty;
	});
}

//Loads all the data and inserts innerHTML with ID of main-content
const all = ()=>{
	let tabe = '<table>';
	for(let row of combined){
		tabe+=row;
	}
	tabe += '</table>';
	document.getElementById("main-content").innerHTML = tabe;
}
//Loads 20 first rows of the data and inserts innerHTML with ID of main-content
const first_twenty = ()=>{
	let tabe = '<table>';
	for(let row = 0; row < 21; row++){
		tabe+=combined[row];
	}
	tabe += '</table>';
	document.getElementById("main-content").innerHTML = tabe;
}


