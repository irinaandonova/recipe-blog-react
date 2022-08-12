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


