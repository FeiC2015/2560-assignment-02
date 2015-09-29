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
		if (area.charAt(0) == 'c') {
			newElement = document.getElementById('cognitive');
			countElement = document.getElementById('ccount');
		}else if (area.charAt(0) == 's') {
			newElement = document.getElementById('system');
			countElement = document.getElementById('scount');
		}else {
			var error = prompt('Wrong!! Please re-enter: cognitive or system:', '');
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
	//ref.setAttribute('onclick', 'pick(this)');
}







