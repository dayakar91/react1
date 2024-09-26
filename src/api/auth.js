import { Jwt } from "jsonwebtoken";
 export default function handler(req,res){
    const jwtSecretKey=process.env.DIY_JWT_SECRET
    const {email,passord}=req.body;

    if(passord!=''){
        return res.status(401).json({ message: "Invalid password" });
    }

    let data = {
        signInTime: Date.now(),
        email,
      };
    
      const token = Jwt.sign(data, jwtSecretKey);
      res.status(200).json({ message: "success", token });
    }