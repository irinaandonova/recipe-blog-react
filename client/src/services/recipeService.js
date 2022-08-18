const baseUrl = 'http://localhost:4000/recipe';

exports.getRecipes = async (category) => {
    let url = baseUrl;
    try {
        if (category) {
            url += `/${category}`
        }

        let response = await fetch(url);

        let result = await response.json();

        return result;
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}
exports.createRecipe = async (recipeInfo, instructions) => {
    try {
        let response = await fetch(`${baseUrl}/create`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ recipeInfo, instructions })
        });
        let result = await response.json();

        return result;
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}
exports.getOne = async (_id) => {
    try {
        const response = await fetch(`${baseUrl}/details/${_id}`);
        let result = await response.json();
        console.log(result);
        return result;
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}

