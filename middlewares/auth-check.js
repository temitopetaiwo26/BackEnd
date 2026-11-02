export function requireAuth(req, res, next) {
 const authHeader = req.headers.authorization;
 
 if (!authHeader){
    return res.status(401).json({message:"Authorization header missing"});
 }
console.log(authHeader);

const headerPaths = authHeader.split("");

 next();
}