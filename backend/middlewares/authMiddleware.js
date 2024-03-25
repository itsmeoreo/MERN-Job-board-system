import jwt from "jsonwebtoken";
import 'dotenv/config'

const authMiddleware= ( req, res, next )=> {
  const token= req.cookies.token;
  const secretKey= process.env.JWT_SECRET_KEY;
  if(token) {
    const verify= jwt.verify(token, secretKey, (error, decoded)=> {
      if(error) {
        console.log(error);
        res.status(400).json({Invalid_action: "You are not allowed to perform this specific task"})
      }
      else {
        req.user=decoded;
        next();
      }
    })
  }
  else {
    res.status(400).json({Login_required: "Login to proceed"})
  }
}

export default authMiddleware;