import jwt from 'jsonwebtoken';

const auth  =  (req, resp, next) =>{

    const { token } = req.headers;

        if(!token) {
            return resp.status(400).json({message: "user are not authorization"})
        }
    try {

        const token_decode = jwt.verify(token , process.env.SECERT_TOKEN);
        req.body.userId = token_decode.id;
        next();

    } catch (error) {
        console.log(error);
        return resp.status(500).json({message:"sever error"})
    }
}

export default auth