/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/* Global variables */
/**
   @const searchInput is set based on what's entered into the search input box.
   @const studentList selects the unordered list where the HTML from the data array is dynamically inserted.
   @const studentItem is where the list item from the studentList item from the dynamic HTML is added.
   @const linkList selects the ul element with a class of `link-list` and is used by the addPagination function eventListener.
   @const searchButton selects the button used by the searchPeople function
   @const itemsPerPage sets the number of student cards to place on each page and how many pages to add via addPagination 
*/

const searchInput = document.getElementById("search").value;
const studentList = document.querySelector('.student-list');
const studentItem = document.querySelectorAll(".student-item");
const linkList = document.querySelector('.link-list');
const searchButton = document.querySelector("button");
const itemsPerPage = 9;

/** 
The showPage function will insert/append the elements needed to display a "page" of nine student cards.
*/

function showPage(list, page){
   /** the list parameter passes an array into the function, 
   the page parameter determines what page the display starts on e.g. 1 = page 1.
   startIndex provides an index number for the for loop that determines how many cards to display on the page.
   endIndex provides an index that determines the last card to add to the page. */
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   /** studentList is set to an empty string to clear it so that cards can be dynamically added to it. */
   studentList.innerText = "";
   /** This loops over the length of the `list` parameter and adds student cards until it reaches endIndex. */
   for (let i = 0; i < list.length; i++) {
     /** This conditional determines when the page begins and ends.*/
      if ( i >= startIndex && i < endIndex) {
          /** This template literal creates the elements needed to display the student information cards.*/
         const studentItem =  
         ` <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3 class="name"> ${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">${list[i].registered.date}</span>
               </div>
            </li>
         `;
         studentList.insertAdjacentHTML("beforeend", studentItem);
         /** This inserts the above elements from studentItem into studentList. */
      } 
   } 
}

/** 
The `addPagination` function creates and inserts/appends the elements needed for the pagination buttons
* @param {array} list - an array of student data.
*/
function addPagination(list) {
   /**list parameter is an array
   numOfPages calculates the number of pages needed based on the length of the array.*/
   const numOfPages = Math.ceil(list.length / itemsPerPage);  
   /** linkList is set to an empty string so that items can be added to it. */
   linkList.innerHTML=""
   /** This loops over the number of pages needed and determines the number of pagination buttons to add based on
   the length of the array passed into the function. */
   for (let i = 1; i <= numOfPages; i++) {
     /** button provides the HTML needed to display the pagination button */
      const button = 
      `<li>
            <button type="button">${[i]}</button>
      </li>`;
      /** The buttons are inserted in the link-list unordered list. */
      linkList.insertAdjacentHTML("beforeend", button);
      /** The first pagination button is set to a class of "active", using the descendant selector between the 
      .link-list class and button tagname. */
      document.querySelector('.link-list button').className = "active";
   }
   /** inkList event listener on the `link-list` element allows user to click on the pagination button. */
   linkList.addEventListener("click", (e) => {
      /** if the click target is a button: */
      if (e.target.tagName === "BUTTON") {
         /** remove the "active" class from the previous button */
         document.querySelector('.active').className = "";
         /** add the active class to the clicked button */
         e.target.className = "active";
         /** call the showPage function passing the `list` parameter and page to display as arguments */
         showPage(list, e.target.textContent);
      } 
   });      
 }
 
/** searchPeople has to pull object data for each student from the entire list of objects contained in data.  
showPage students are limited to groups of 9. */
searchButton.addEventListener("click", () => {
   const searchInput = document.getElementById("search").value;
   /** namesArr creates an empty array to hold the result of the for loop that uses the searchInput. */
   const namesArr = [];
   /** This loop matches the search entry letters with the letters from the first and last names in data, then 
   pushes them to namesArr.  namesArr is then passed into showPage and addPagination to show the results of the search. */
   for (let i = 0; i < data.length; i++) {
      if (data[i].name.first.toLowerCase().includes(searchInput.toLowerCase()) || 
      data[i].name.last.toLowerCase().includes(searchInput.toLowerCase())) {
         namesArr.push(data[i]);
         showPage(namesArr, 1);
         addPagination(namesArr);
       } 
   }
   /** conditional that determines if no results should be shown if the namesArr is empty. */
   if (namesArr.length === 0) {
   /** HTML is added via template literal to show that no results were found from the search. */
      studentList.innerHTML = 
         `<li class="student-item cf">
            <div class="no-results">
                  <h3>No Results Found</h3>
            </div>
         </li>`;
      linkList.innerHTML="";   
   }
});

 /** Call functions */

showPage(data, 1);
addPagination(data);






