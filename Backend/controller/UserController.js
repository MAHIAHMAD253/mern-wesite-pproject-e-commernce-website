import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';

const createToken = (id) =>{
    return jwt.sign({id}, process.env.SECERT_TOKEN)
}


const loginUser = async (req, resp) =>{

    try {
        const {email, password} = req.body;

        const user = await UserModel.findOne({email})

        if(!user){
            return resp.status(401).json({message:"user are invalid email"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return resp.status(400).json({message:"Not match the password"})
        }

        const token = createToken(user._id);


        resp.status(200).json({message:"User succssfully login", success:true, token})

    } catch (error) {
        console.log(error)
        return resp.status(500).json({message:"sever error"})
    }
}




const registerUsr =  async (req, resp) =>{

    try {
        
        const {name, email, password} = req.body;

        // checking user alrady exists or not 

        const exists = await UserModel.findOne({email});

        if(exists){
            return resp.status(400).json({message:" user are already exist", succes: false})
        }

        // validation email format & strong password

        if(!validator.isEmail(email)){
            return resp.status(400).json({message:"please enter a vlaid email", succes: false})
        }

        if(password.length < 8){
            return resp.status(400).json({message:"please enter a strong password"})
        }

        // hashing the password

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new UserModel({
            name,
            email,
            password:hashPassword
        })

        const user = newUser.save();

        const token = createToken(user._id)
        
        
        resp.status(200).json({message:"User are successfully register", success:true, token})



    } catch (error) {
        console.log(error)
    }
 
}

// admin user Login 

const adminLogin = async  (req,resp) =>{

    try {
        const {email, password} = req.body;
        if ( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.SECERT_TOKEN)
            resp.status(200).json({message:"suceesfully",token ,success:true})
        }
    } catch (error) {
        console.log(error)
        resp.status(500).json({message:"sever error", success:false })
    }
}

export { loginUser, registerUsr, adminLogin};