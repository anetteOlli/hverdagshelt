// @flow
const articles = require('express').Router();
import { Article, Comment, Rating, User, sequelize } from '../models/mysql';
import { checkAuth, upload } from '../util';
//import { sync } from '../models/create';

/** Redirect to reviewsRoute with the selected userId and articleId */
import commentRoute from './commentRoute';
import ratingRoute from './ratingRoute';
articles.use('/:articleId(\\d+)/comments', commentRoute);
articles.use('/:articleId(\\d+)/ratings', ratingRoute);

/*--- Must send post with FormData (because of multer module) so every variables in body has a string value  ---*/
articles.post('/', checkAuth, upload.single('picture'), (req: express$Request, res: express$Response) => {
  if (
    !req.body ||
    // $FlowFixMe
    !req.file ||
    typeof req.body.title !== 'string' ||
    typeof req.body.description !== 'string' ||
    typeof req.body.content !== 'string' ||
    typeof req.file.filename !== 'string' ||
    typeof req.body.important !== 'string' ||
    typeof req.body.categoryName !== 'string' ||
    typeof req.body.userId !== 'string'
  )
    return res.sendStatus(400);
  return Article.create({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    picture: req.file.filename,
    // $FlowFixMe
    important: req.body.important,
    categoryName: req.body.categoryName,
    userId: parseInt(req.body.userId)
  }).then((newArticle: Article) => (newArticle ? res.status(200).json(newArticle) : res.sendStatus(404)));
});

/*--- If a new image is uploaded updated the article with multer---*/
articles.patch('/image', checkAuth, upload.single('picture'), (req: express$Request, res: express$Response) => {
  if (
    !req.body ||
    // $FlowFixMe
    !req.file ||
    typeof req.body.title !== 'string' ||
    typeof req.body.description !== 'string' ||
    typeof req.body.content !== 'string' ||
    typeof req.file.filename !== 'string' ||
    typeof req.body.important !== 'string' ||
    typeof req.body.categoryName !== 'string' ||
    typeof req.body.id !== 'string'
  )
    return res.sendStatus(400);
  return Article.update(
    {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      picture: req.file.filename,
      // $FlowFixMe
      important: req.body.important,
      categoryName: req.body.categoryName
    },
    // $FlowFixMe
    { where: { id: req.body.id } }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

/*--- Get 5 important articles with offset = 5 * (pageNr-1), includes username and the ratings ---*/
articles.get('/i/:pageNr(\\d+)', (req: express$Request, res: express$Response) => {
  if (typeof req.params.pageNr === 'undefined') return res.sendStatus(400);
  return Article.findAndCountAll({
    limit: 5,
    offset: (parseInt(req.params.pageNr) - 1) * 5,
    include: [{ model: User, attributes: ['username'] }, { model: Rating, attributes: ['value'] }],
    where: { important: true },
    order: [['updatedAt', 'DESC']],
    distinct: true
  })
    .then((result: { rows: Article[], count: number }) => res.status(200).json(result))
    .catch((error: Error) => res.status(500).json(error.message));
});

/*--- Include comments with the comments username ---*/
articles.get('/:articleId(\\d+)', (req: express$Request, res: express$Response) => {
  if (typeof req.params.articleId === 'undefined') return res.sendStatus(400);
  return Article.findOne({
    include: [
      { model: User, attributes: ['username'] },
      { model: Rating, attributes: ['value'] },
      {
        model: Comment,
        attributes: ['id', 'content', 'userId', 'updatedAt'],
        include: [{ model: User, attributes: ['username'] }]
      }
    ],
    where: { id: req.params.articleId }
  }).then(article => {
    if (!article) {
      res.status(404).json({ name: 'Article not found' });
    } else {
      res.status(200).json(article);
    }
  });
});
/*--- Get 5 articles that matches the categoryName, if the categoryName is all, get all articles ---*/
articles.get('/categories/:categoryName/:pageNr(\\d+)', (req: express$Request, res: express$Response) => {
  if (typeof req.params.categoryName === 'undefined') return res.sendStatus(400);
  if (req.params.categoryName === 'all') {
    return Article.findAndCountAll({
      limit: 5,
      distinct: true,
      offset: (parseInt(req.params.pageNr) - 1) * 5,
      include: [{ model: User, attributes: ['username'] }, { model: Rating, attributes: ['value'] }],
      order: [['updatedAt', 'DESC']]
    })
      .then((result: { rows: Article[], count: number }) => res.status(200).json(result))
      .catch((error: Error) => res.status(500).json(error.message));
  } else {
    return Article.findAndCountAll({
      limit: 5,
      distinct: true,
      include: [{ model: User, attributes: ['username'] }, { model: Rating, attributes: ['value'] }],
      where: { categoryName: req.params.categoryName },
      order: [['updatedAt', 'DESC']]
    })
      .then((result: { rows: Article[], count: number }) => res.status(200).json(result))
      .catch((error: Error) => res.status(500).json(error.message));
  }
});

/*--- Check if the userId in the jwt-token is equal to the userId in the article ---*/
articles.delete('/:articleId(\\d+)', checkAuth, (req: express$Request, res: express$Response) => {
  if (typeof req.params.articleId === 'undefined') return res.sendStatus(400);
  return Article.findById(req.params.articleId).then((article: ?Article) => {
    if (!article) return res.status(404).json({ message: 'Article not found' });
    else {
      // $FlowFixMe
      if (req.userData.user.id !== article.userId) return res.sendStatus(401);
      else article.destroy().then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
    }
  });
});

/*--- Returns the first article id that matches the title, for search-bar ---*/
articles.get('/title/:title', (req: express$Request, res: express$Response) => {
  if (typeof req.params.title === 'undefined') return res.sendStatus(400);
  return Article.findOne({
    attributes: ['id'],
    limit: 1,
    where: { title: req.params.title },
    order: [['updatedAt', 'DESC']]
    // $FlowFixMe
  }).then((article?: { id: number }) => {
    if (!article) {
      res.sendStatus(404);
    } else {
      res.status(200).json(article.id);
    }
  });
});

articles.patch('/', checkAuth, (req: express$Request, res: express$Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  // $FlowFixMe
  if (req.userData.user.id !== req.body.userId) return res.sendStatus(401);
  return Article.update(
    {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      important: req.body.important,
      categoryName: req.body.categoryName
    },
    { where: { id: req.body.id } }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

/*--- Get the newest articles for annoucment and sideBar ---*/
articles.get('/new', (req: express$Request, res: express$Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Article.findAll({
    limit: 5,
    attributes: ['id', 'title', 'updatedAt'],
    order: [['updatedAt', 'DESC']]
  })
    .then((articles: ?(Article[])) => res.status(200).json(articles))
    .catch((error: Error) => res.status(500).json(error.message));
});

/*--- I would have used Bayesian average to get the most popular article, but since mysql is slow enough as it is i keep it simple ---*/
articles.get('/popular', (req: express$Request, res: express$Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return sequelize
    .query(
      'SELECT articles.id, articles.title, SUM(r.value)/COUNT(r.value) AS avgRating FROM articles INNER JOIN ratings r ON articles.id = r.articleId GROUP BY articles.id ORDER BY avgRating DESC LIMIT 5',
      { type: sequelize.QueryTypes.SELECT }
    )
    .then((articles: { id: number, title: string, avgRating: number }) => res.status(200).json(articles))
    .catch((error: Error) => res.status(500).json(error.message));
});

module.exports = articles;
