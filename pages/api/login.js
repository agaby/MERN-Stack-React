import connectDB from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDB();

export default async(req, res) =>{
    const {email, password } = req.body;
    try{
        //check if user exists
        const user = await User.findOne({email}).select('+password');
        console.log("user: "+user);
        // else, return error 
        if(!user){
            return res.status(404).send("No user exists with that email");
        }
        //check if user passowrd matches db
        const matchedPasswords = await bcrypt.compare(password, user.password);
        console.log("matchedPasswords: "+matchedPasswords);
        //if so generate token
        if(matchedPasswords){
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
                expiresIn: '7d'
            });
            // send to client
            res.status(200).json(token);
        }else{
            res.status(401).send("Passwords do not match");
        }
    }catch(error){
        console.error(error);
        res.status(500).send("Error logging in user");
    }
}