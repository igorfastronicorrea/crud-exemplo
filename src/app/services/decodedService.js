const jwtDecode = require('jwt-decode');

exports.decodeId = async (token) => {
    try {
        var token = await jwtDecode(token.replace('Bearer ', ''));
        return token.id;
    } catch (err) {
        console.log(err)
        return undefined;
    }

}