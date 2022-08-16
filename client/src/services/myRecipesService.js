const baseUrl = 'http://localhost:4000/my-recipes';

exports.getAll = async({ userId }) => {
    try {
        let response = await fetch(`${baseUrl}/${userId}`);
        let result = await response.json();
        console.log(result.myRecipes);
        return result.myRecipes;
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}