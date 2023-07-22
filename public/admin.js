// Your Code Here
//retrieve a list of books 
//display the list of books on the admin
// Your Code Here
// Retrieve a list of books and display the list of books on the admin
async function main() {
    try {
        let response = await fetch('http://localhost:3001/listBooks', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        let booksData = await response.json();
        console.log(booksData);

        let bookListElement = document.getElementById("bookList");
        bookListElement.innerHTML = "";

        booksData.forEach(book => {

            let listItem = document.createElement("li");


            let quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.value = book.quantity || 0; // Set the initial value from the book quantity (if available)


            let submitButton = document.createElement("button");
            submitButton.textContent = "Update";
            submitButton.addEventListener("click", async () => {
                // Get the updated quantity from the input field
                let updatedQuantity = parseInt(quantityInput.value);

                // Send the updated quantity to the server
                try {
                    let updateResponse = await fetch('http://localhost:3001/updateBook', {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "id": book.id,
                            "quantity": updatedQuantity
                        })
                    });

                    if (updateResponse.ok) {
                        console.log("Quantity updated successfully!");
                    } else {
                        console.error("Failed to update quantity:", updateResponse.status);
                    }
                } catch (error) {
                    console.error("Error updating quantity:", error);
                }
            });

            // Append the book title, quantity input, and submit button to the list item
            listItem.textContent = `Title: ${book.title}, ID: ${book.id}, Author: ${book.author}`;
            listItem.appendChild(quantityInput);
            listItem.appendChild(submitButton);

            // Append the list item to the bookListElement
            bookListElement.appendChild(listItem);
        });

    } catch (error) {
        console.error("Error with the fetch:", error);
    }
}

main();
