document.addEventListener('DOMContentLoaded', function () {

        // Task Manager selectors
        let addId = document.querySelector('#add');
        let close = document.getElementsByClassName("close");

        // Method to hide list item when close button clicked
        for (a of close) {
            a.onclick = function () {
                let task = this.parentElement;
                task.style.display = "none";
            }
        }

        // Create a new list item when clicking on the "Add" button
        function newElement() {

            // Declare main variables
            let inputValue = document.querySelector("#userInput").value;
            let li = document.createElement("li");
            let text = document.createTextNode(inputValue);
            let button = document.createElement("BUTTON");
            let label = document.createTextNode("x");

            // Alert if input field is empty otherwise create li item with user input
            if (inputValue === '') {
                alert("Please enter a task!");
            } else {
                li.appendChild(text);
                document.querySelector("#userUL").appendChild(li);
            }

            // Clear the user input field
            document.querySelector("#userInput").value = "";

            // Create and append close button to task item
            button.className = "close";
            button.appendChild(label);
            li.appendChild(button);

            // Hide item on click
            for (a of close) {
                a.onclick = function () {
                    let div = this.parentElement;
                    div.style.display = "none";
                }
            }
        } // End of newElement Function

        // Method for add button to work
        addId.addEventListener('click', function () {
            newElement();
        });

}) 