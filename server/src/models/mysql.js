// @flow
import type { Model } from 'sequelize';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import { validatePassword, hashPassword } from '../util';

export const sequelize = new Sequelize(
  process.env.MYSQL_DB || 'News',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || '',
  {
    host: process.env.MYSQL_HOST || 'mysql',
    dialect: 'mysql',
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

/*------------  User table  ------------*/
export const User: Class<
  Model<{ id?: number, username: string, email: string, password: string, active?: boolean }>
> = sequelize.define(
  'users',
  {
    username: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
      isEmail: true
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        isLongEnough: function(val) {
          if (val.length < 6) {
            throw new Error('Please choose a longer password');
          }
        }
      }
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    hooks: {
      beforeCreate: (user: User): void => {
        // $FlowFixMe
        user.password = hashPassword(user.password);
      }
    }
  }
);

// $FlowFixMe
User.prototype.isValidPassword = function(password: string): boolean {
  return validatePassword(password, this.password);
};

/*------------  Article table  ------------*/
export const Article: Class<
  Model<{
    id?: number,
    title: string,
    description: string,
    content: string,
    picture: string,
    categoryName: string,
    important: boolean,
    userId: number
  }>
> = sequelize.define('articles', {
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
    notEmpty: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: false
  },
  important: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

/*------------  Comment table  ------------*/
export const Comment: Class<
  Model<{ id?: number, content: string, articleId: number, userId: number }>
> = sequelize.define('comments', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

/*------------  Rating table  ------------*/
/* Sequalize kan ikke bruke composite foreign key, ellers ville jeg hatt articleid og userId som en felles primary key */
export const Rating: Class<
  Model<{ id?: number, value: '1' | '2' | '3' | '4' | '5', articleId: number, userId: number }>
> = sequelize.define(
  'ratings',
  {
    value: { type: Sequelize.ENUM('1', '2', '3', '4', '5'), allowNull: false }
  },
  { timestamps: false }
);

/*------------  Category table  ------------*/

export const Category: Class<Model<{ name: string }>> = sequelize.define(
  'categories',
  {
    name: { type: Sequelize.STRING(25), primaryKey: true, allowNull: false }
  },
  { timestamps: false }
);

/*------------  Associations   ------------*/

User.hasMany(Article);
User.hasMany(Rating);
User.hasMany(Article);

Category.hasMany(Article);

Article.belongsTo(Category);
Article.belongsTo(User);
Article.hasMany(Rating);
Article.hasMany(Comment);

Rating.belongsTo(Article);
Rating.belongsTo(User);

Comment.belongsTo(Article);
Comment.belongsTo(User);
