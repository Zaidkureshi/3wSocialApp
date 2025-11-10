const jwt = require('jsonwebtoken');
module.exports = (req,res,next) => {
  const header = req.headers.authorization;
  if(!header) return res.status(401).json({msg:'No token'});
  const token = header.split(' ')[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id };
    next();
  } catch(e){
    return res.status(401).json({msg:'Invalid token'});
  }
};
