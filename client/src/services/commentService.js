const baseUrl = 'http://localhost:4000/comment';

exports.addComment = async({ commentInfo }) => {
    try {
        const response = await fetch(`${baseUrl}/add`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ commentInfo })
        });
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}