const User  = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

       
        

        await newUser.save();

        
      

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }


      
       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
             process.env.JWT_SECRET,
              { expiresIn: process.env.JWT_EXPIRES_IN,}
        );


        // res.cookie('jwt', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production', 
        //     sameSite: 'Strict', 
        //     maxAge: process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000, 
        // });


        res.json({
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token

        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};









const updateProfileImage = async (req, res) => {
    try {
        const { id } = req.body; 
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'profile_pictures',
        });


        
        user.profileImage = {
            public_id: result.public_id,
            url: result.secure_url,
          };

        await user.save();

        res.json({ message: 'Profile image updated successfully', profileImage: user.profileImage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// const logoutUser = (req, res) => {
//     req.header

//     res.cookie('jwt', '', { 
//         httpOnly: true, 
//         expires: new Date(0) 
//     });

//     res.json({ message: 'Logged out successfully' });
// };


const updateUser = async(req, res) =>{
    try{
        const {id, name} = req.body;

         await User.findByIdAndUpdate(id, { name }, { new: true });

        
        const user = await User.findById(id).select('-password');

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated', user });


    }
    catch(error){
        res.status(500).json({ error: error.message });
    }

}


const changePassword = async (req,res)=>{
    try{

        const {id, oldPassword, newPassword} = req.body;

        const user = await User.findById(id);


        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Your Old password is Incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });

    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

const getAUser = async (req , res)=>{
    try {

        const {id } = req.user;
      const user = await User.findById(id).select('-password');
       res.json(user)
        
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }

}

module.exports = { updateProfileImage, registerUser,loginUser, getAUser, updateUser, changePassword };
