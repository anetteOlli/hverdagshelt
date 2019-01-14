// @flow
import multer from 'multer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/*---     Using multer to store image     ---*/
const storage = multer.diskStorage({
  destination: (req: express$Request, file: multer, callback: express$RenderCallback): void => {
    //null = error.
    callback(null, '../client/public/res/images/');
  },
  filename: (req: express$Request, file: multer, callback: express$RenderCallback): void => {
    callback(null, Date.now() + '-' + file.originalname);
  }
});
const imgFilter = (file: multer, callback: (?Error, boolean) => mixed): void => {
  //reject a file check if a file does not ends with jpg, jpeg, png or gif
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) callback(new Error('Invalid file'), false);
  callback(null, true);
};
export const upload = multer({
  storage: storage,
  fileFilter: (req: express$Request, file: express$SendFileOptions, callback: (?Error, boolean) => mixed): void => {
    imgFilter(file, callback);
  },
  limits: { fileSize: 1024 * 1024 * 5 }
});

/*---      Verify token       ---*/
export const checkAuth = (req: () => mixed, res: express$Response, next: express$NextFunction): void => {
  req.userData = {user:{ isAdmin: true}};
  next();
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.userData = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Authentication failed'
    });
  }
};

/*---     Generate token        ---*/
export const genToken = ( id: number, email: string, isAdmin: boolean) =>
  jwt.sign(
    {
      user: {
        id,
        email,
        isAdmin
      }
    },
    process.env.JWT_KEY,
    {
      expiresIn: '30s'
    }
  );
/**
 * A method for generating the token a user uses to verify his account
 * @param packageJson json with the packageInformation
 * @returns the token made specifically for the user
 */
export const genTokenEmail = (packageJson: object) => {
  return jwt.sign(
    packageJson,
    process.env.EMAIL_KEY,
    {
      expiresIn: '100s'
    }
  );
};

export const verifyTokenEmail = (token: object ) => {
  try {
    return {
      status: true,
      data: jwt.verify(token, process.env.EMAIL_KEY)
    };
  } catch(error) {
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


