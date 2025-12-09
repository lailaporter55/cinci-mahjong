const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {


  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/getParty', mid.requiresLogin, controllers.Party.getParty);
  app.post('/createParty', mid.requiresLogin, controllers.Party.createParty);
  app.get('/getParties',controllers.Party.getParties);

  app.post('/createPost', mid.requiresLogin, controllers.Post.createPost);
  app.get('/getPosts', controllers.Post.getPosts);

  app.get('/getTiles', controllers.Tiles.getTiles);
  app.post('/createOrder', mid.requiresLogin, controllers.Order.createOrder);
  app.get('/orders', mid.requiresLogin, controllers.Order.getOrders);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/home', mid.requiresLogin, (req, res) => res.render('home'));
};
module.exports = router;
