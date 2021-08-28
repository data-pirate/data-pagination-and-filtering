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


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
@params{listOfStudent} array of objects : list of all the students
@params{pageNumber} integer: current page number
*/

const studentList = document.querySelector('.student-list');

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
      if(i === 1){
         createAndAddChild(li, 'button', {'type': 'button', 'value': i, 'textContent': i, 'className': 'active'});
      }else{
         createAndAddChild(li, 'button', {'type': 'button', 'value': i, 'textContent': i});
      }
      linkList.appendChild(li);
   }
}


// Call functions
showPage(data, 1);
addPagination(data);

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

linkList.addEventListener('click', (e)=>{
   if(e.target.tagName === 'BUTTON'){
      removeAndAddActive(e);
      let pagenumber = e.target.value;
      showPage(data, pagenumber);
   }
});


