/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/* Global variables*/
//searchInput is set based on what's entered into the search input box.
//studentList selects the unordered list where the HTML from the data array is dynamically inserted.
//studentItem is where the list item from the studentList item from the dynamic HTML is added.
//itemsPerPage sets the number of student cards to place on each page and determine how many pages to add via addPagination
const searchInput = document.getElementById("search").value;
const studentList = document.querySelector('.student-list');
const studentItem = document.querySelectorAll(".student-item");
const searchButton = document.querySelector("button");
const itemsPerPage = 9;

/*
The showPage function will insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page){
   //the list parameter is used to hold the data from the data array, 
   //the page parameter determines what page the display starts on.
   //create two variables which will represent the index for the first and last student on the page
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   // set the innerText property of studentList to empty to an empty string to clear it. 
   studentList.innerText = "";
    // loop over the length of the `list` parameter
   for (let i = 0; i < list.length; i++) {
     // inside the loop create a conditional to display the proper students
      if ( i >= startIndex && i < endIndex) {
         // inside the conditional:
          // create the elements needed to display the student information
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
         // insert the above elements
      }
      
   } 
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   // numOfPages to calculates the number of pages needed
   const numOfPages = Math.ceil(list.length / itemsPerPage);  
   // linklist selects the element with a class of `link-list` and assign it to a variable
   const linkList = document.querySelector('.link-list');
   // set the innerHTML property of the variable you just created to an empty string
   linkList.innerHTML=""
   // loop over the number of pages needed
   for (let i = 1; i <= numOfPages; i++) {
     // create the elements needed to display the pagination button
      const button = 
      `<li>
            <button type="button">${[i]}</button>
      </li>`;
      // insert the above elements
      linkList.insertAdjacentHTML("beforeend", button);
      // give the first pagination button a class of "active", element is selected using the
      //descendant selector between the .link-list class and button tagname. 
      document.querySelector('.link-list button').className = "active";
   }

   // create an event listener on the `link-list` element
   linkList.addEventListener("click", (e) => {
      // if the click target is a button:
      if (e.target.tagName === "BUTTON") {
         // remove the "active" class from the previous button
         document.querySelector('.active').className = "";
         // add the active class to the clicked button
         e.target.className = "active";
         // call the showPage function passing the `list` parameter and page to display as arguments
         showPage(list, e.target.textContent);
      } 
   });      
 }
 
 


// Call functions - conditional statment in place to only run showPage and addPagination if the search field is blank.

showPage(data, 1);
addPagination(data);





//searchPeople has to pull object data for each student from the entire list of objects contained in data.  showPage students are limited to groups of 9. 
searchButton.addEventListener("click", (e) => {
   const searchInput = document.getElementById("search").value;
   const namesArr = [];
   console.log(searchInput);
   //names creates an array of objects that include the names from each student in the data array.     
   const names = data.map(a => a.name);
   console.log(names);
   if (searchInput === names) {
      namesArr.push(searchInput);
   }
   console.log(namesArr);
   //studentItem sets a variable for the studentItem cards generated by the array, which is them used to display or hide
   //the cards based on the search input.  
   //This loop matches the search entry letters with the letters from the names in data, then .
   for (let i = 0; i < data.length; i++) {
      if (names[i].first.toLowerCase().includes(searchInput.toLowerCase()) || names[i].last.toLowerCase().includes(searchInput.toLowerCase())) {
         const studentItem =  
         ` <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${data[i].picture.large}" alt="Profile Picture">
                  <h3 class="name"> ${data[i].name.first} ${data[i].name.last}</h3>
                  <span class="email">${data[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">${data[i].registered.date}</span>
               </div>
            </li>
         `;
         studentList.insertAdjacentHTML("beforeend", studentItem);

       }
   }
});

// searchButton.addEventListener("click", (e) => {
//    console.log("yay! The button worked!");
//    const searchInput = document.getElementById("search").value;
//    console.log(searchInput);

//    //searchPeople(searchInput);
     
//    if (searchInput === "") {
//       showPage(data, 1); 
//       addPagination(data);
//       console.log('door #1');
//       } else {
//          console.log('door #2');
//          searchPeople(searchInput);
//       }

//    });