let auth = require('../controllers/auth')

function checkAuth(req,resp,next){
    let token = req.cookies['auth-token'];
    if(token && auth.checkToken(token)){
        next();
    }else{
        resp.status(400);
        resp.send("Not Authorized");
    }
  
}

module.exports = checkAuth;