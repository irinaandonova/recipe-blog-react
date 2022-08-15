const baseUrl = 'http://localhost:4000/my-recipes';

exports.getAll = async({ _id }) => {
    try {
        let response = await fetch(`${baseUrl}/${_id}`);
        let result = await response.json();

        return result;
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}