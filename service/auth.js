const jwt = require(
    'jsonwebtoken'
)

const secret = "Abhishek123@";

function setUser(user){

    return jwt.sign({
        _id:user._id,
        email : user.email,
        role:user.role,
    }, secret);
}

// 

function getUser(token) {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        // You can log the error or handle it as needed
        return null; // or throw a custom error
    }
}


module.exports = { 
    setUser,
    getUser,
};

// legal compliances particularly the different one to create the write content , particularyl the 

// code...
// great => Hire Right is Correct ! => Using Resultant partitions! + > result 