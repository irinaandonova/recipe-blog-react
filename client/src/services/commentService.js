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
exports.deleteComment = async({ recipeId, commentId }) => {
    try {
        const response = await fetch(`${baseUrl}/${commentId}/delete`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({ recipeId })
        });
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}
exports.editComment = async ({ recipeId, commentId, text }) => {
    

    try {
        const response = await fetch(`${baseUrl}/${commentId}/edit`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({ recipeId, text })
        });
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}