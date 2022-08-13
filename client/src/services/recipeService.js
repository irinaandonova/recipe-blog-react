const baseUrl = 'http://localhost:4000/recipe';

exports.getAll = async() => {
    try {
        let response = await fetch(baseUrl);
        let result = await response.json();

        return result;
    }
    catch(err) {
        console.log(err);
        return { status: 'err' };
    }
}
exports.createRecipe = (recipeInfo) => {
    try {
        let response = await fetch(`${baseUrl}/create`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ recipeInfo })
        });
        let result = await response.json();

        return result;
    }
    catch(err) {
        console.log(err);
        return { status: 'err' };
    }  
}

