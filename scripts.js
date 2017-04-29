$(window).load(function() {
 // executes when complete page is fully loaded, including all frames, objects and images
 var SearchEle = $('#SearchQuery');
 var SearchQuery = '';
 var Content;
 var searchUserWants = $('#searchUserWants');
 var dropDownList = $('#dropDownList');
 $.getJSON( "content.json", function( data ) {
 	Content = data;
 });
 SearchEle.keyup(function() {
 	SearchQuery = SearchEle.val();
 	let searchClassIns = new searchClass;
 	searchClassIns.doTheSearch();
 	// console.log(SearchQuery,Content);
 	// var relatedData = [];
 	// dropDownList.empty();
 	// if(SearchQuery != ''){
 	// 	Content.forEach(function(element, index) {
 	// 		if(element.value.includes(SearchQuery) ? true : false)   
 	// 			relatedData.push(element);
 	// 		});
 	// 	relatedData.forEach( function(element, index) {
 	// 		var appendData = `<li class="list-group-item">${element.value}</li>`;
 	// 		dropDownList.append(appendData);
 	// 	});
 	// }
 });
class searchClass{
	constructor(){
		this.statusText = '';
		this.statusColor = '';
	}

	doLetterSearch(){
		var SearchArray =[...SearchQuery]; // entry="i am" => array=["i"," ","a","m"]
		let relatedData = [];
		let check = true;
		Content.forEach(function(element, index) {
			let elementValue = element.value;
			SearchArray.forEach(function(eachLetter, position) {
				check = true;
				if(elementValue.includes(eachLetter) ? false : true)
					check = false;
				});

			if(check)
				relatedData.push(element);
			});
		if(relatedData.length){
			this.statusText = "LetterSearch: " + relatedData.length + " Matches Found";
			this.statusColor = "success";
		}else{
			this.statusText = "No Matched Found \:\(";

			this.statusColor = "warning";
		}

		return relatedData;
	}
	doWordSearch(){
		let relatedData = [];
		Content.forEach(function(element, index) {
			if(element.value.includes(SearchQuery) ? true : false)   
				relatedData.push(element);
			});
		if(relatedData.length){
			this.statusText = "WordSearch: " +  relatedData.length + " Matches Found";
			this.statusColor = "success";
		}else{
			this.statusText = "No Matched Found :(";
			this.statusColor = "warning";
		}
		return relatedData;
	}
	doWordSearchFromStart(){
		let relatedData = [];
		Content.forEach(function(element, index) {
			//console.log(SearchQuery.length , element.value.slice(0, (SearchQuery.length - 1)), SearchQuery);
			if(element.value.slice(0, (SearchQuery.length)) == SearchQuery ? true : false)   
				relatedData.push(element);
			});
		if(relatedData.length){
			this.statusText = "NormalSearch: " +  relatedData.length + " Matches Found";
			this.statusColor = "success";
		}else{
			this.statusText = "No Matched Found :(";
			this.statusColor = "warning";
		}
		return relatedData;
	}
	fillTheUl(arrayOfLi){
		this.emptyTheDropDown();
		arrayOfLi.forEach( function(element, index) {
			var appendData = `<li class="list-group-item">${element.value}</li>`;
			dropDownList.append(appendData);
		});
	}
	doTheSearch(){
		this.emptyTheDropDown();
		let relatedData;
		let value = this.checkWhichSearchUserWants();
		if(SearchQuery != '') {
		if(value === 1 || value === '1' )
			relatedData = this.doWordSearchFromStart();
		else if(value === 2 || value === '2' )
			relatedData = this.doWordSearch();
		else
			relatedData = this.doLetterSearch();
		
		this.fillTheUl(relatedData);
		this.presentStatusOfSearch();
		} else {
			//console.log('Empty Input')
			this.statusText = 'Nothing Entered';
			this.statusColor = 'danger';
			this.emptyTheDropDown();
		    this.presentStatusOfSearch();
		}
	}
	giveStatusColor(){
		return this.statusColor;
	}
	giveStatusText(){
		return this.statusText;
	}
	presentStatusOfSearch(){
		console.log(this.statusText + " -- " + this.statusColor);
	}
	emptyTheDropDown(){
 		dropDownList.empty();
	}
	checkWhichSearchUserWants(){
		//console.log("Selected Option "+ searchUserWants.val() )
		return searchUserWants.val();
	}

}
});

