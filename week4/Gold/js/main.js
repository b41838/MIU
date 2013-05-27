$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addItem').on('pageinit', function(){

		var myForm = $('#formId');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

	var go = function(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	function toggleControls(n) {
		switch(n) {
			case "on":
			go('addPillForm').style.display = "none";
			go('displayLink').style.display = "none";
			go('clearLink').style.display = "inline";
			go('addNew').style.display = "inline";
				break;
			case "off":
			go('addPillForm').style.display = "block";
			go('displayLink').style.display = "inline";
			go('clearLink').style.display = "inline";
			go('addNew').style.display = "none";
			go('items').style.display = "none";				
				break;
			default:
				return false;
		}
	}

var autofillData = function (){
	 
};

var getData = function(){
		toggleControls("on");
		if(localStorage.length === 0) {
			alert("There is no data to clear, entering dummyData.");
			enterDummyData();
		}
		
		// write data from localStorage to browser
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		go('items').style.display = "block";
		for (var i=0, len=localStorage.length; i<len; i++) {
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// convert string from localStorage value to object using JSON.parse
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			grabImage(obj.sugar[1], makeSubList);
			//grabImage(makeSubList);
			for (var n in obj) {
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			createItemLinks(localStorage.key(i), linksLi); // create our edit and delete buttons or links for each item in localstorage
		}
};

var storeData = function(data){
		// if no key, create new key
		if(!key) {
			// get a random number for localStorage key
			var id			= Math.floor(Math.random()*1000001);
		} else {
			// if it has a key already, set it to the existing key to overwrite
			id = key;
		}
	
		// run function to find if req checkbox is checked or not
		isRequired();
		
		// build JSON object to store
		var item			= {};
		item.date			= ["Date:", go('date').value];
		item.sugar			= ["Sugar Level:", go('sugarLevel').value];
		item.pillName		= ["Pill Name:", go('pillName').value];
		item.quantity		= ["Pill Quantity:", go('quantity').value];
		item.required		= ["Is Required:", requiredPill];
		item.notes			= ["Notes:", go('notes').value];
	
		// save into LocalStorage with stringify
		localStorage.setItem(id, JSON.stringify(item));
		alert("Save Successfull!");
		window.location.reload();
}; 

var	deleteItem = function (){
		var ask = confirm("Are you sure you want to delete this entry?");
		if(ask) {
			localStorage.removeItem(this.key);
			alert("Entry was deleted!")
			window.location.reload();
		} else {
			alert("Contact was not deleted.")
		}
};
					
var clearLocal = function(){
		if(localStorage.length === 0) {
			alert("There is no data to clear.");
		} else {
			localStorage.clear();
			alert("All data has been cleared.");
			window.location.reload();
			return false;
		}
};

	// set variable to default
	var requiredPill;
	var errorText = go('errors');

	// display stored data
	var displayLink = go('displayLink');
	displayLink.addEventListener("click", getData);

	// clear stored data
	var clearLink = go('clearLink');
	clearLink.addEventListener("click", clearLocal);

	// save data
	var saveBtn = go('submit');
	saveBtn.addEventListener("click", validateFields);