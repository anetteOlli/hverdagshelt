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

/*---     Verify token        ---*/
export const checkAuth = (req: () => mixed, res: express$Response, next: express$NextFunction): void => {
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
export const genToken = (user: { id: number, email: string, username: string, password?: string }) =>
  jwt.sign(
    {
      user: {
        id: user.id,
        email: user.email,
        username: user.email,
        status:
      }
    },
    process.env.JWT_KEY,
    {
      expiresIn: '1h'
    }
  );

/*--- Hashing and validation password ---*/
export const hashPassword = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync());
export const validatePassword = (inputPassword: string, currentPassword: string) =>
  bcrypt.compareSync(inputPassword, currentPassword);
