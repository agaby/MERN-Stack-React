import connectDB from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import Cart from '../../models/Cart';


connectDB();

export default async (req, res) =>{
    const { name, email, password } = req.body;
    console.log(typeof(password));
    try{
        //validate name, email and passowrd
        if(! isLength(name, {min: 2, max:10})){
            return res.status(422).send("Name must be within 2 to 10 charecters long");
        } else if(!isLength(password, {min:2, max: 10})){
            return res.status(422).send("Passowrd must be within 2 to 10 charecters long");
        } 
        // else if(!isEmail(email)){
        //     return res.status(422).send("Email must be valid");
        // }
        //check if user already exists 
        const user = await User.findOne({email});
        if(user){
            return res.status(422).send(`User already exists with email ${email}`);
        } else{
        //else hash passowrd
        const hash = await bcrypt.hash(password, 10);
        console.log("hash: "+ hash.toString);
        // create  user
        const newUser = await new User({
            name,
            email,
            password: hash
          }).save();
          console.log({ newUser });
        //create cart for new user
          await new Cart({user: newUser._id}).save();
        //create token for the new user
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: '7d'  })
        // send back token 
            res.status(201).json(token);
        }
    }catch(error){
        console.error(error);
        res.status(500).send("Error signing up user. Please try again later");
    }
}
