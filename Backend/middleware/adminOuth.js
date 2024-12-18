import jwt from 'jsonwebtoken';

const adminAuth = (req, resp,next)=>{
    try {
        const { token } = req.headers;
        if(!token){
            return resp.status(400).json({message:"not authorized login again"})
        }
        const token_decode = jwt.verify(token, process.env.SECERT_TOKEN)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return resp.status(404).json({message:"not authorized login again"})
        }
        next()
    } catch (error) {
        console.log(error)
        return resp.status(500).json({message:"sever error"})
    }
}

export default adminAuth;