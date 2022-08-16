const baseUrl = 'http://localhost:4000/my-recipes';

exports.getAll = async ({ userId }) => {
    try {
        let response = await fetch(`${baseUrl}/${userId}`);
        let result = await response.json();

        return result.myRecipes;
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}
exports.deleteRecipe = async ({ _id, userId }) => {
    try {
        let response = await fetch(`${baseUrl}/delete/${_id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({ userId })
        });
        let result = await response.json();

        return result;
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}