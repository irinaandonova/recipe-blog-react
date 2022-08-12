const baseUrl = 'http://localhost:4000/auth';

exports.register = async({ user }) => {
    const response = await fetch(`${baseUrl}/register`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ user })
    });

    return await response.json();
}