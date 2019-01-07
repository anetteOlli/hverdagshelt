// @flow

import { Article, User, Category, Comment, Rating } from '../src/models/mysql.js';
import { sync } from '../src/models/create';
import { sequelize } from '../src/models/mysql';

beforeAll(async () => {
  await sync;
});

describe('Article test', () => {
  it('correct getById', async () => {
    // $FlowFixMe
    let article: Article = await Article.findById(2);
    expect({
      id: article.id,
      title: article.title,
      description: article.description,
      categoryName: article.categoryName,
      content: article.content,
      picture: article.picture,
      important: article.important,
      userId: article.userId
    }).toEqual({
      id: 2,
      title: 'Tittel 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat ligula, consequat id ullamcorper quis, imperdiet sed eros. Sed gravida.',
      categoryName: 'Kultur',
      content: 'Lorem ipsum dolor sit amet',
      picture: 'article2.jpg',
      important: true,
      userId: 1
    });
  });

  it('correct findMostPopular', async () => {
    let articles: { id: number, title: string, avgRating: number }[] = await sequelize.query(
      'SELECT articles.id, articles.title, SUM(r.value)/COUNT(r.value) AS avgRating FROM articles INNER JOIN ratings r ON articles.id = r.articleId GROUP BY articles.id ORDER BY avgRating DESC LIMIT 5',
      { type: sequelize.QueryTypes.SELECT }
    );
    expect(
      articles.map(article => ({
        id: article.id,
        title: article.title,
        avgRating: article.avgRating
      }))
    ).toEqual([
      {
        id: 7,
        title: 'Tittel 7',
        avgRating: 5
      },
      {
        id: 4,
        title: 'Tittel 4',
        avgRating: 4.5
      },
      {
        id: 3,
        title: 'Tittel 3',
        avgRating: 4
      },
      {
        id: 1,
        title: 'Tittel 1',
        avgRating: 3.5
      },
      {
        id: 5,
        title: 'Tittel 5',
        avgRating: 3.333333333333333
      }
    ]);
  });

  it('correct delete', async () => {
    await Article.destroy({ where: { id: 1 } });
    let articles: Article[] = await Article.findAll({ attributes: ['id'] });
    expect(
      articles
        .map(article => article.toJSON())
        .map(article => ({
          id: article.id
        }))
    ).toEqual(expect.not.objectContaining({ id: 1 }));
  });
  it('correct update', async () => {
    await Article.update(
      {
        title: 'New title',
        description: 'New desc',
        content: 'New content',
        picture: 'newArticle.jpg',
        important: false,
        categoryName: 'Sport'
      },
      { where: { id: 3 } }
    );
    // $FlowFixMe
    let article: Article = await Article.findById(3);
    expect({
      id: article.id,
      title: article.title,
      description: article.description,
      content: article.content,
      picture: article.picture,
      important: article.important,
      categoryName: article.categoryName,
      userId: article.userId
    }).toEqual({
      id: 3,
      title: 'New title',
      description: 'New desc',
      content: 'New content',
      picture: 'newArticle.jpg',
      important: false,
      categoryName: 'Sport',
      userId: 1
    });
  });
});

describe('User test', () => {
  it('correct findAll', async () => {
    let users: User[] = await User.findAll();
    expect(
      users
        .map(user => user.toJSON())
        .map(user => ({
          id: user.id,
          username: user.username,
          email: user.email
        }))
    ).toEqual([
      {
        id: 1,
        username: 'Per persen',
        email: 'per.persen@ntnu.no'
      },
      {
        id: 2,
        username: 'Ola Olsen',
        email: 'ola.olsen@ntnu.no'
      },
      {
        id: 3,
        username: 'Snorre Strand',
        email: 'snorrestrand@hotmail.com'
      }
    ]);
  });

  it('check create', async () => {
    await User.create({
      username: 'Test testern',
      email: 'test@hotmail.com',
      password: '1234567'
    });
    // $FlowFixMe
    let user: User = await User.findById(4);
    expect({
      id: user.id,
      username: user.username,
      email: user.email
    }).toEqual({
      id: 4,
      username: 'Test testern',
      email: 'test@hotmail.com'
    });
  });
  it('check hash', async () => {
    // $FlowFixMe
    let user: User = await User.findById(4);
    expect({
      password: user.password
    }).not.toBe({
      password: '1234567'
    });
  });

  it('check validation false', async () => {
    // $FlowFixMe
    let user: User = await User.findById(4);
    expect(user.isValidPassword('wrongPassword')).toBeFalsy();
  });

  it('check validation true', async () => {
    // $FlowFixMe
    let user: User = await User.findById(4);
    expect(user.isValidPassword('1234567')).toBeTruthy();
  });
});

describe('Category test', () => {
  it('correct findAll', async () => {
    let categories: Category[] = await Category.findAll();
    expect(
      categories
        .map(category => category.toJSON())
        .map(category => ({
          name: category.name
        }))
    ).toEqual(
      expect.arrayContaining([
        {
          name: 'Sport'
        },
        {
          name: 'Kultur'
        },
        {
          name: 'Nyhet'
        },
        {
          name: 'Vitenskap'
        },
        {
          name: 'Data'
        }
      ])
    );
  });
});

describe('Comment test', () => {
  it('correct create', async () => {
    await Comment.create({
      content: 'Testing',
      userId: 3,
      articleId: 5
    });
    // $FlowFixMe
    let comment: Comment = await Comment.findById(5);

    expect({
      content: comment.content,
      userId: comment.userId,
      articleId: comment.articleId
    }).toEqual({
      content: 'Testing',
      userId: 3,
      articleId: 5
    });
  });
});

describe('Rating test', () => {
  it('correct create', async () => {
    await Rating.findOrCreate({
      where: { userId: 3, articleId: 10 },
      defaults: { value: '5' }
      // $FlowFixMe
    }).spread((rating, created) => {
      if (!created) {
        rating.updateAttributes({
          value: '5'
        });
      }
    });
    // $FlowFixMe
    let rating: Rating = await Rating.findById(19);
    expect({
      value: rating.value,
      userId: rating.userId,
      articleId: rating.articleId
    }).toEqual({
      value: '5',
      userId: 3,
      articleId: 10
    });
  });

  it('correct only one instance of rate', async () => {
    await Rating.findOrCreate({
      where: { userId: 3, articleId: 10 },
      defaults: { value: '2' }
      // $FlowFixMe
    }).spread((rating, created) => {
      if (!created) {
        rating.update({
          value: '2'
        });
      }
    });
    // $FlowFixMe
    let rating: Rating = await Rating.findById(19);
    expect({
      value: rating.value,
      userId: rating.userId,
      articleId: rating.articleId
    }).toEqual({
      value: '2',
      userId: 3,
      articleId: 10
    });
  });
});
