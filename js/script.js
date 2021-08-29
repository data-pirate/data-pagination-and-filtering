/*** 
 * Author: Damanpreet singh
 * August 28, 2021
 * pagintion Script
 ***/


/***
 * `createElement` function
 * @params{tag} string: element to be made
 * @parames{properties} object: Object with all necessary information to be injected in the element
 * @returns{element} Node: desired element
 ***/
function createElement(tag, properties){
   // create the element using javascript createElement method
   const element = document.createElement(tag);

   // loop through the each property whose value need to be added
   for(let each in properties){
      const value = properties[each];

      // check if there are multiple values for the desired property
      if(Array.isArray(value)){
         for(let item of value){
            element[each] += item + ' ';
         }
      }else{
         element[each] = value;
      }
   }
   return element;
}


/***
 * `createAndAddChild` function
 * @params{parent} Node: parent node on which new element need to be appended
 * @params{childTag} 'string': element to be created and appended
 * @params{properties} object: Object with all necessary information to be injected in the element
 ***/
function createAndAddChild(parent, childTag, properties){
   const child = createElement(childTag, properties);
   parent.appendChild(child);
}



/***
 * `addSearchField` function
***/
function addSearchField(){
   const header = document.querySelector('.header');
   const label = createElement('label', {'for': 'search', 'className': 'student-search'});
   createAndAddChild(label, 'span', {'textContent': 'Search By Name'});
   createAndAddChild(label, 'input', {'type': 'text', 'id': 'search', 'placeholder': 'Search By Name...'});
   const button = createElement('button', {'type': 'button'});
   createAndAddChild(button, 'img', {'src': 'img/icn-search.svg', 'alt': 'search icon'});
   label.appendChild(button);
   header.appendChild(label);
}

addSearchField();

// grab search input field and the student list
const input = document.getElementById('search');
const studentList = document.querySelector('.student-list');

const searchMsg = createAndAddChild(studentList, 'li', {'className': ['student-item', 'no-user', 'h3'], 'style': 'display: none'});

const lis = studentList.children;

function search(text){
   let count = 0;
   for(let i = 0; i < lis.length; i++){
      if(lis[i].textContent.toLowerCase().includes(text.toLowerCase())){
         lis[i].style.display = '';
      }else{
         lis[i].style.display = 'none';
         count++;
      }
   }

   let noUser = document.querySelector('.no-user');

   if(count === lis.length && text.length > 0){
      noUser.innerHTML = `No users Found for <h3 style="color: red">${text}</h3>`;
      noUser.style.display = '';
   }else{
      noUser.innerHTML = '';
      noUser.style.display = 'none';
   }
}

input.addEventListener('keyup', (e)=>{
   search(e.target.value);
});

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
@params{listOfStudent} array of objects : list of all the students
@params{pageNumber} integer: current page number
*/

function showPage(listOfStudents, pageNumber){
   let startIndex = (pageNumber * 9) - 9, endIndex = pageNumber * 9;

   for(let i = startIndex; i < endIndex; i++){

      let each = listOfStudents[i];
      if(each === undefined){
         break;
      }

      const li = createElement('li', {'className': ['student-item', 'cf']});
   
      // div student-details
      const div = createElement('div', {'className': ['student-details']});

      // creating and appending img, h3 and span tag to the div element
      createAndAddChild(div, 'img', {'src': each['picture']['large'], 'alt': 'profile picture', 'className': 'avatar'})

      createAndAddChild(div, 'h3', {'textContent': each['name']['first'] + ' ' + each['name']['last']})

      createAndAddChild(div, 'span', {'className': 'email', 'textContent': each['email']});

      // div joined-details
      const div2 = createElement('div', {'className': 'joined-details'});

      createAndAddChild(div2, 'span', {'className': 'date', 'textContent': each['registered']['date']});
      li.appendChild(div);
      li.appendChild(div2);

      studentList.appendChild(li);
   }

}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const linkList = document.querySelector('.link-list');


function addPagination(listOfStudents){
   let numberOfPages = Math.round(listOfStudents.length / 9);
   for(let i = 1; i <= numberOfPages; i++){
      let li = document.createElement('li');
      // if the site is just loaded we need to have at least one page with active state
      if(i === 1){
         createAndAddChild(li, 'button', {'type': 'button', 'value': i, 'textContent': i, 'className': 'active'});
      }else{
         createAndAddChild(li, 'button', {'type': 'button', 'value': i, 'textContent': i});
      }
      linkList.appendChild(li);
   }
}

function hideExtraButtons(){
   const active = document.querySelector('.active');
   for(let each of linkList.children){
      let val = parseInt(each.firstChild.value);
      let activeVal = parseInt(active.value);
      if(val === activeVal || val === activeVal - 1 || val === activeVal + 1){
         each.style.display = '';
      }else{
         each.style.display = 'none';
      }
   }
}

// Call functions
showPage(data, 1);
addPagination(data);
hideExtraButtons();

/***
 * `removeAndAddActive` funtion
 * @params{e} object: event object to add active class
 ***/
function removeAndAddActive(e){
   // remove the previous elements from the list to add new;
   studentList.innerHTML = '';
   let previousPage = document.querySelector('.active');
   previousPage.classList.remove('active');
   e.target.classList.add('active');
}

/***
 * `add event listener to the links`
 * if the target is a button then 
 * remove the active state from the previous button and add to the new one
 * and fetch new items
 ***/

linkList.addEventListener('click', (e)=>{
   if(e.target.tagName === 'BUTTON'){
      removeAndAddActive(e);
      let pagenumber = e.target.value;
      showPage(data, pagenumber);
      hideExtraButtons();
   }
});


