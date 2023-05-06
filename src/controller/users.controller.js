import { NotFoundError } from "../helpers/error.js";
import { getAllUserInfo, getOneUserInfo, saveUserInfo } from "../models/queries/users.query.js";

export const signUpUser = async (req, res)=> {
    const {email,mobile, firstName, lastName, password} = req.body;
  
    if(
        email != "" && email != null &&
        password != "" && password != null &&
        firstName != "" && firstName != null &&
        lastName != "" && lastName != null &&
        mobile != "" && mobile != null 
    ){
        const data = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            mobile: mobile
        }
  
          const checkUser = await getOneUserInfo(email);
  
          if (!checkUser) {
            const resp = await saveUserInfo(data);
            res.status(200).json({
                status: "success",
                message: "User successfully created",
                data: resp
            });
          }
          else {
            res.status(203).json({
                status: "failed",
                message: "User with this email alreaady exist",
                data: []
            });
          }
    }
    else {
        res.status(200).json({
            status: "failed",
            message: "Incomplete parameter",
            data: []
        });
    }
}

export const getUsersData = async (req, res) => {
    const userData = await getAllUserInfo();

    if (userData) {
        res.status(200).json({
            status: "success",
            message: "User data retrieved successfully",
            data: userData
        })
    }
    else {
        // throw new NotFoundError("No User found")
        res.status(200).json({
            status: "success",
            message: "no User yet",
            data: userData
        })
    }
   
}

export const getOneUserData = async (req, res) => {
    const email = req.params.email;
    const userData = await getOneUserInfo(email);

    if (userData) {
        res.status(200).json({
            status: "success",
            message: "User data retrieved successfully",
            data: userData
        })
    }
    else {
        // throw new NotFoundError("Student not found");
        res.status(200).json({
            status: "failed",
            message: "User not found",
            data: userData
        })
    }
}

export const  loginUser = async (request, response) => {
    const { email, password } = request.body;

    const user = await getOneUserInfo(email);

    if (!user) {
    //   throw new UnauthorizedError("Email or password do not match.");
    return response.status(200).json({
        status: "failed",
        message: "User does not exist",
        data: []
      });
    }

    if (!user.validatePassword(password)) {
    //   throw new UnauthorizedError("Email or password do not match.");
    return response.status(200).json({
        status: "failed",
        message: "password or email does not",
        data: []
      });
    }

    return response.status(200).json({
      status: "success",
      data: user,
    });
  }