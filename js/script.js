/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page){
   // create two variables which will represent the index for the first and last student on the page
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   
   // select the element with a class of `student-list` and assign it to a variable
   const studentList = document.querySelector('.student-list');
   
    // set the innerHTML property of the variable you just created to an empty string
   studentList.innerHTML = "";
    // loop over the length of the `list` parameter
   for (let i = 0; i < list.length; i++) {
     // inside the loop create a conditional to display the proper students
      if ( i >= startIndex, i < endIndex) {
         // inside the conditional:
          // create the elements needed to display the student information
         const studentItem =  
         ` <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${data[i].picture.large}" alt="Profile Picture">
                  <h3> ${data[i].name.first} ${data[i].name.last}</h3>
                  <span class="email">${data[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">${data[i].registered.date}</span>
               </div>
            </li>
         `
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
   // create a variable to calculate the number of pages needed
   const numOfPages = Math.ceil(list.length / 9);  
   // select the element with a class of `link-list` and assign it to a variable
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
      document.querySelector('.link-list button').className = "active";
      // give the first pagination button a class of "active"
   }
   console.log(document.querySelector('.link-list button'));
   // create an event listener on the `link-list` element
   linkList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
         e.target.querySelector('.active').className = "";
      }
   )

     // if the click target is a button:
       // remove the "active" class from the previous button
       // add the active class to the clicked button
       // call the showPage function passing the `list` parameter and page to display as arguments
 }
 



// Call functions 
showPage(data, 1);
addPagination(data);