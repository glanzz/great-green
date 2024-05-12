import Models from '../models/index.js';
import passport from 'passport';
import validators from "../validators/index.js";
import { InternalServerError, Unauthorized, ValidationError, validateSchema } from '../utility.js';
import { setError, setResponse } from './response-handler.js';
import badgeService from '../services/badge-service.js';
import tokenService from '../services/token-service.js';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

export const register = async (req, response) => { 
  // Get details 
  try {
  let userData = {};
  try {
    userData = validators.auth.registerUserSchema.validateSync(req.body);
  } catch (e) {
    ValidationError(e.errors[0], {others: e.errors});
  }

  const Token = await tokenService.getByEmail(userData.email);
  if(!Token) {
    ValidationError("2FA not initiated !")
  }

  if(Token.token !== userData.token) {
    ValidationError("Invalid OTP given !");
  }

  Models.User.register({
    username: userData.email,
    name: userData.name,
    gender: userData.gender,
    locationX: userData.locationX,
    locationY: userData.locationY,
    email: userData.email
  },
  userData.password, async function (err, user) {
    console.log("User data added")
    if (err) { 
      console.log("Inner catch", err);
      setError(ValidationError(err.message || "User already exists with given data", {}, false), response);
    } 
    else {
      const userInfo = await getUserResponse(user);
      setResponse({message: "User registered successfully !", user: userInfo}, response);
    } 
  })
  } catch(e) {
    console.log(e);
    setError(e, response);
  }
};


export const logout = (req, response, next) => {
  req.logout(function(err) {
    if (err) { return next(InternalServerError("Failed to logout please try again", {}, false)); }
    setResponse({message: "Logout successful !"}, response);
  });
}


export const login = (req, res, next) =>  {
  
  const userToBeChecked = new Models.User({ 
    username: req.body.username, 
    password: req.body.password, 
  }); 
  
  req.login(userToBeChecked, function (err) { 
    if (err) {
      Unauthorized("Failed to authenticate user");
    } else { 
      passport.authenticate("local")( 
        req, res, function () { 
          Models.User.find({username: req.user.username}).then(
            () => {
              // Login is successful
              setResponse({message: "Login Successful !"}, res);
            }
          ).catch((err) => {
            next(Unauthorized("Invalid credentials provided !", {}, false));
          })
          
      }); 
    } 
  }); 
};


export const userinfo = async (req, res, next) =>  {
  const userResponse = await getUserResponse(req.user);
  setResponse(userResponse, res);
};

const getUserResponse = async (user) => {
  const userBadges = [];
  for(const badgeData of user.badges) {
    const badge = await badgeService.find(badgeData.badge_id);
    if (badge) {
      userBadges.push({
        _id: badge._id,
        name: badge.name,
        logo: badge.logo,
        achieved_on: badgeData.createdDate
      });
    }
  }
  return {
    name: user.name,
    username: user.username,
    email: user.email,
    locationX: user.locationX,
    locationY: user.locationY,
    gender: user.gender,
    badges: userBadges
  }
}


export const updateUser = async (request, response) => {
  try {
    const requestBody = {...request.body}
    const userData = validateSchema(validators.auth.updateUserSchema, requestBody);
    if(userData.password) {
      request.user.setPassword(userData.password);
    }
    if(userData.name) {
      request.user.name = userData.name;
    }
    const updatedUser = await request.user.save();
    
    const userResponse = await getUserResponse(updatedUser);
    setResponse({
      message: "Profile updated !",
      user: userResponse
    }, response)
  } catch (e) {
    console.log(e);
    setError(e, response);
  }
};


const generateOTP = () => Math.floor(100000 + Math.random() * 900000);


const TEMPLATE = (OTP) => `
<body style="background-color: #f1f4f8;">
<div style="padding: 12px;width: 600px;margin: 20px auto;background-color: white;">
  <div style="text-align: center;padding: 12px;border-bottom: 1px solid #e6e6e6ee;">
    <img src="https://i.ibb.co/m506PZz/logo.png" width="140" height="100" />
  </div>
  <div style="padding: 25px;color: #58585899;border-bottom: 1px solid #e6e6e6ee;line-height: 1.5;">
    <p>
      <b style="color:#369b3d">Hello,</b> <br /><br />
      Welcome to <span style="font-size:20px;color:#369b3d">Great Green</span><br/>
      Your OTP: ${OTP}<br />
    </p>
    <br />
    <p>
      Thank You!
    </p>
</div>
</div>
</body>
`;

export const verifyUser = async (request, response) => {
  try {
    const requestBody = {...request.body}
    const tokenData = validateSchema(validators.auth.createTokenSchema, requestBody);
    
    
    const Token = await tokenService.getByEmail(tokenData.email);
    /*
    // Relaxing constraint for testing
    if (token) {
      ValidationError({"message": "Email already sent !"})
    }*/

    // Generate OTP
    const OTP  = generateOTP();

    try {
      // MailGun integration
      const mailgun = new Mailgun(FormData);
      const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});
      await mg.messages.create(process.env.MAILGUN_EMAIL, {
        from: "Great Green <support@gg.org>",
        to: tokenData.email,
        subject: "Hello,",
        text: "",
        html: TEMPLATE(OTP)
      });
    } catch(e) {
      console.log(e)
      ValidationError("Failed to send email try again later!")
    }
    if(!Token) {
      Token = await tokenService.save({...tokenData, token: OTP});
    } else {
      Token.token = OTP;
      await Token.save();
    }
    
    setResponse({
      message: "Email sent !",
      response: {
        "token": Token._id,
      }
    }, response)
  } catch (e) {
    console.log(e);
    setError(e, response);
  }
};
