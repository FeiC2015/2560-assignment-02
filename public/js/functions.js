/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

init = true;

function open() {
	var name = prompt('Please enter student name:', 'N/A');
	var advisor = prompt('Please enter advisor name:', 'N/A');
	var date = new Date();

	var elemt = document.createElement('p');
	var node_name = document.createTextNode('This preparedlan of study is prepared for ' + name + ' under the instruction of ' + advisor);
	var node_time = document.createTextNode('Today is ' + date.getMonth() + '/' + date.getDate() + '/' + date.getYear() + '.');

	var node_head = document.getElementById('input');
	node_head.appendChild(elemt);
	node_head.appendChild(node_name);
	node_head.appendChild(node_time);
}

function pick(course) {
	/* every time the page is opened, or refreshed, it will start a new process.
	   Refresh page to re-start the process. */
	if(init) {
		open();
		init = false;
	}
	if(course.getAttribute('class') == 'selected') {
		alert('This course has been chosen.');
		return;
	}

	// add the selected course into the print-out window.
	var courseID = course.getAttribute('id');

	if(courseID < 2300 || courseID == 12130) {
		newElement = document.getElementById('foundation');
		countElement = document.getElementById('fcount');
	}else if (courseID < 2400) {
		newElement = document.getElementById('cognitive');
		countElement = document.getElementById('ccount');
	}else if (courseID < 2500) {
		var area = prompt('Do you want this course counted as Cognitive or System?', '');
		while (area.charAt(0) != 'c' && area.charAt(0) != 's'){
			area = prompt('Wrong!! Please re-enter: cognitive or system:', '');
		}
		if (area.charAt(0) == 'c') {
			newElement = document.getElementById('cognitive');
			countElement = document.getElementById('ccount');
		}else if (area.charAt(0) == 's') {
			newElement = document.getElementById('system');
			countElement = document.getElementById('scount');
		}
	}else if (courseID < 3000) {
		newElement = document.getElementById('system');
		countElement = document.getElementById('scount');
	}else {
		newElement = document.getElementById('elective');
		countElement = document.getElementById('ecount');
	}

	newChild = course.cloneNode(true);
	tn = newChild.firstChild;
	txt = tn.nodeValue.substr(0, 11);
	tn.data = txt;
	newChild.appendChild(tn);
	newChild.setAttribute('onclick', 'deselect(this)');
	course.setAttribute('class', 'selected');
	newChild.setAttribute('class', 'chosen');
	newElement.appendChild(newChild);
	count = newElement.childNodes.length;
	countText = document.createTextNode(count);
	while(countElement.hasChildNodes()) {
		countElement.removeChild(countElement.childNodes[0]);
	}
	countElement.appendChild(countText);
}


function deselect(coursePicked) {
	var courseID = coursePicked.getAttribute('id');
	newElement = coursePicked.parentNode;
	newElement.removeChild(coursePicked);
	var countID = newElement.getAttribute('id').charAt(0) + 'count';
	count = newElement.childNodes.length;
	countText = document.createTextNode(count);
	countElement = document.getElementById(countID);
	while(countElement.hasChildNodes()) {
		countElement.removeChild(countElement.childNodes[0]);
	}
	countElement.appendChild(countText);
	course = document.getElementById(courseID);
	course.setAttribute('class', 'available');
}

// var fModel {
// 	selectedClasses: ko.observableArray([]);
// 	availableClasses: ko.observableArray([
// 		{'id': 2000, 'title': 'INFSCI 2000 Introduction to Information Science'},
// 		{'id': 2500, 'title': 'INFSCI 2500 Data Structure'};
// 		{'id': 2801, 'title': 'INFSCI 2801 Geospatial Information Systems'};
// 		{'id': 2020, 'title': 'INFSCI 2020 MATHEMATICAL FOUNDATIONS FOR INFORMATION SCIENCE'};
// 		{'id': 2040, 'title': 'INFSCI 2040 RESEARCH DESIGN'};
// 		{'id': 2060, 'title': 'INFSCI 2060 STATISTICS IN INFORMATION SCIENCE'};
// 		{'id': 2120, 'title': 'INFSCI 2120 INFORMATION AND CODING THEORY'};
// 		{'id': 2130, 'title': 'INFSCI 2130 DECISION ANALYSIS AND DECISION SUPPORT SYSTEMS'};
// 		{'id': 2140, 'title': 'INFSCI 2140 INFORMATION STORAGE AND RETRIEVAL'};
// 		{'id': 2150, 'title': 'INFSCI 2150 INTRODUCTION TO SECURITY'};
// 		{'id': 2160, 'title': 'INFSCI 2160 DATA MINING'};
// 		{'id': 2170, 'title': 'INFSCI 2170 CRYPTOGRAPHY'};
// 		{'id': 2180, 'title': 'INFSCI 2180 (2906) KNOWLEDGE REPRESENTATION AND THE SEMANTIC WEB'};
// 	]);
// 	classCliked: function(new) {
// 		console.log('Selecting', new);
// 		if(_.find(viewModel.selectedClasses(), new)) {
// 			viewModel.selectedClasses.remove(new);
// 		}else {
// 			viewModel.selectedClasses.push(new);
// 		}

// 		return false;
// 	}
// }

// ko.applyBindings(fModel);





