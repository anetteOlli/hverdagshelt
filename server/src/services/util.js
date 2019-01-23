// @flow
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/*---      Verify token       ---*/
export const checkAuth = (req: () => mixed, res: express$Response, next: express$NextFunction): void => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    req.userData = jwt.verify(token, process.env.JWT_KEY || "123213");
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Authentication failed'
    });
  }
};

/*---     Generate token        ---*/
export const genToken = (id: number, priority: string) =>
  jwt.sign(
    {
      id,
      priority
    },
    process.env.JWT_KEY || "123213",
    {
      expiresIn: '1h'
    }
  );
/**
 * A method for generating the token a user uses to verify his account
 * @param packageJson json with the packageInformation
 * @returns the token made specifically for the user
 */
export const genTokenEmail = (packageJson: object) => {
  return jwt.sign(packageJson, process.env.EMAIL_KEY || "123123", {
    expiresIn: '24h'
  });
};

export const verifyTokenEmail = (token: object) => {
  try {
    return {
      status: true,
      data: jwt.verify(token, process.env.EMAIL_KEY || "123123")
    };
  } catch (error) {
    return {
      status: false,
      data: error
    };
  }
};
/*--- Hashing and validation password ---*/
export const hashPassword = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync());
export const validatePassword = (inputPassword: string, currentPassword: string) =>
  bcrypt.compareSync(inputPassword, currentPassword);
