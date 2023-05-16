const apiKey = 'ydaxD1Er4+jPLsZrWBsSgg==51cBbZGCIdTnAEq8'; 

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('resultsContainer');

searchButton.addEventListener('click', searchRecipes);

function searchRecipes() {
    const searchTerm = searchInput.value;

    // Make a GET request to the Recipe API
    fetch(`https://api.api-ninjas.com/v1/recipe?query=${searchTerm}`, {
        headers: {
            'X-Api-Key': apiKey
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error: ' + response.status);
        }
    })
    .then(data => {
        // Clear previous results
        resultsContainer.innerHTML = '';

        if (data.length === 0) {
            resultsContainer.innerHTML = 'No recipes found.';
        } else {
            data.forEach(recipe => {
                // Create a div element for each recipe
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');

                // Add recipe details to the div
                recipeDiv.innerHTML = `
                    <h2>${recipe.title}</h2>
                    <p>${recipe.ingredients}</p>
                    <p>Servings: ${recipe.servings}</p>
                    <p>${recipe.instructions}</p>
                `;

                // Append the div to the results container
                resultsContainer.appendChild(recipeDiv);
            });
        }
    })
    .catch(error => {
        console.log('Error:', error.message);
        resultsContainer.innerHTML = 'An error occurred. Please try again later.';
    });
}
