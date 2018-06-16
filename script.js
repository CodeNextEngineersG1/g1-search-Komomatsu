/* write your script here */ 
var hp = 28;
var searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keypress", checkKey);
searchBar.addEventListener("input", getAutoSuggestions);
var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", processInput);
var autoSuggestions = document.getElementById("auto-suggestions");
var display = document.getElementById("display");
var database = [
	{	
		name: "Cut Man",
		model: "DLN-003",
		origin: "Originally created by Dr. Light to be a timber-felling robot for the lumber industry.",
		health: "Health Points:" + hp,
		dmg: "Damage: 4 (contact); 4 (Rolling Cutter)",
		weapon: "Special Weapon: Rolling Cutter",
		weakness: "Weakness: Super Arm",
		img: "img/Cutsprite.jpg"
	},
	{
		name: "Guts Man",
		model: "DLN-004",
		origin: "Originally a civil engineering robot created by Dr. Light for land reclamation and construction.",
		health: "Health Points:" + hp,
		dmg: "Damage: 4 (contact); 4 (Super Arm)",
		weapon: "Special Weapon: Super Arm",
		weakness: "Weakness: Hyper Bomb; Time Slow (Powered Up only)",
		img: "img/Gutssprite.jpg"
	},
	{
		name: "Ice Man",
		model: "DLN-005",
		origin: "Built by Dr. Light to be impervious to sub-zero temperatures, he was originally used for Antarctic exploration and later worked in a cold storage warehouse.",
		health: "Health Points:" + hp,
		dmg: "Damage:4 (contact); 10 (Ice Slasher)",
		weapon: "Special Weapon: Ice Slasher",
		weakness: "Weakness: Thunder Beam; Hyper Bomb (Powered Up only)",
		img: "img/Icesprite.jpg"
	},
	{
		name: "Bomb Man ",
		model: "DLN-006",
		origin: "Created by Dr. Light for mining and construction purposes, as well as to blast away debris so that land could be cleared for construction projects.",
		health: "Health Points:" + hp,
		dmg: "Damage: 4 (contact); 4 (Hyper Bomb); 4 (Hyper Bomb explosion)",
		weapon: "Special Weapon: Hyper Bomb",
		weakness: "Weakness: Fire Storm; Rolling Cutter (Powered Up only)",
		img: "img/Bombsprite.jpg"
	},
	{
		name: "Fire Man",
		model: "DLN-007",
		origin: "Previously worked at a waste management facility, he is able to wield flames that can reach 7000-8000 degrees",
		health: "Health Points:" + hp,
		dmg: "Damage: 4 (contact); 4 (Fire Storm); 4 (flame)",
		weapon: "Special Weapon: Fire Storm",
		weakness: "Weakness: Ice Slasher",
		img: "img/Firesprite.jpg"
	},
	{
		name: "Elec Man",
		model: "DLN-008",
		origin: "Built by Dr. Light to control electrical operations, Elec Man previously managed a power plant facility.",
		health: "Health Points:" + hp,
		dmg: "Damage: 4 (contact); 10 (Thunder Beam)",
		weapon: "Thunder Beam",
		weakness: "Weakness: Rolling Cutter; Oil Slider (Powered Up only)",
		img: "img/Elecsprite.jpg"
	},
];

function checkKey(e) {
	var key = e.which || e.keyCode;
	if(key == 13) {
		processInput();
	}
}

function processInput () {
	var cleanedInput = searchBar.value.toLowerCase().trim()
	autoSuggestions.innerHTML = "";
	autoSuggestions.style.display = "none";
	searchBar.value = "";
	var databaseRecord = getRecord(cleanedInput);
	if (databaseRecord != null) {
		displayRecord(databaseRecord);
	}
	else {
		displaySuggestions(getSuggestions(cleanedInput));
	}

	
}

function getRecord(cleanedInput) {
	var i;
	for (i = 0; i < database.length; i++) {
		var cleanedRecordName = database[i].name.toLowerCase().trim();
		if (cleanedInput == cleanedRecordName) {
			return database[i]
		}
	}

	return null;

}

function displayRecord(databaseRecord) {

	var recordName = document.createElement("h2");
	recordName.innerHTML = databaseRecord.name;
	var recordModel = document.createElement("h3");
	recordModel.innerHTML = databaseRecord.model;
	var recordOrigin = document.createElement("p");
	recordOrigin.innerHTML = databaseRecord.origin;
	var recordHealth = document.createElement("h4");
	recordHealth.innerHTML = databaseRecord.health;
	var recordDmg = document.createElement("h4");
	recordDmg.innerHTML = databaseRecord.dmg;
	var recordWeapon = document.createElement("h4");
	recordWeapon.innerHTML = databaseRecord.weapon;
	var recordWeakness = document.createElement("h4");
	recordWeakness.innerHTML = databaseRecord.weakness;
	var recordPicture = document.createElement("img");
	recordPicture.src = databaseRecord.img;
	
	display.appendChild(recordPicture);
	display.appendChild(recordName);
	display.appendChild(recordModel);
	display.appendChild(recordOrigin);
	display.appendChild(recordHealth);
	display.appendChild(recordDmg);
	display.appendChild(recordWeapon);
	display.appendChild(recordWeakness);
}

function getAutoSuggestions() {

	var cleanedInput = searchBar.value.toLowerCase().trim();
	autoSuggestions.innerHTML = "";
	var i;
	for (i = 0; i<database.length; i++) {
		var cleanedRecordName = database[i].name.toLowerCase().trim();
	
		if (cleanedRecordName.startsWith(cleanedInput) && cleanedInput.length > 0 ) {
			var matching = cleanedRecordName.substring(0, searchBar.value.length);
			var remaining = cleanedRecordName.substring(searchBar.value.length);
			var result = matching + "<b>" + remaining + "</b>"
			var button = document.createElement("button");
			button.innerHTML = result;
			button.style.display = "block";
			button.className = "suggestion";
			activateSuggestionButton(button,database[i]);
			autoSuggestions.appendChild(button);
		}
	}

	if (autoSuggestions.hasChildNodes()) {
		autoSuggestions.style.display = "block";
	}

	else {
		autoSuggestions.style.display = "none";
	}
}

function activateSuggestionButton(button, record) {
	button.addEventListener("click", function() {
		displayRecord(record);
		autoSuggestions.innerHTML = "";
		autoSuggestions.style.display = "none";
		searchBar.value = "";
	});
}

function getSuggestions(cleanedInput) {
	var suggestions = [];
	var i;
	for (i = 0; i<database.length; i++) {
		var cleanedRecordName = database[i].name.toLowerCase().trim();
	if (cleanedRecordName.startsWith(cleanedInput) && cleanedInput.length > 0) {
		suggestions.push(database[i]);
		}
	}
	return suggestions
}

function displaySuggestions(suggestions) {
	display.innerHTML = "";
	var paragraph = document.createElement("p");
	if (suggestions.length > 0) {
		paragraph.innerHTML = "Did you mean"
		display.appendChild(paragraph);
		for (i=0; i<suggestions.length; i++) {
			var button = document.createElement("button");
			button.innerHTML = suggestions[i].name;
			button.style.display = "block";
			button.className = "suggestion";
			activateSuggestionButton(button,suggestions[i]);
			display.appendChild(button);
		}
	}
	else {
		paragraph.innerHTML = "No results!";
		display.appendChild(paragraph);
	}

}


