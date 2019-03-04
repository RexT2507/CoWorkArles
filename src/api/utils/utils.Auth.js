//import
var jwt = require('jsonwebtoken');

//Constantes
const JWT_SIGN_SECRET = '94jlkdf5hghj7hgf8d9kj99k0ghuobvcml87jk5hg4f33hgf5dhfdytdf7g8fgh8';

//exporth
module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
            userId: userData.id,
            catId: userData.idCat
        },
            JWT_SIGN_SECRET,
            {
                expiresIn: '1h'
            })
    },
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', ''): null;
    },
    getUserId: function (authoriztion) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authoriztion);
        if (token != null){
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null){
                    userId = jwtToken.userId;
                }
            }catch(err){
                return err;
            }
        }
        return userId;
    },
    getCatId: function (authoriztion) {
        var catId = -1;
        var token = module.exports.parseAuthorization(authoriztion);
        if (token != null){
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null){
                    catId = jwtToken.catId;
                }
            }catch(err){
                return err;
            }
        }
        return catId;
    }
}