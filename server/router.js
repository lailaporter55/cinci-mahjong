const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {

  app.get('/', (req, res) => res.render('home'));
  app.get('/home', mid.requiresLogin, (req, res) => res.render('home'));

  app.get('/book', (req, res) => res.render('book'));

  app.get('/getParty', mid.requiresLogin, controllers.Party.getParty);
  app.post('/createParty', mid.requiresLogin, controllers.Party.createParty);
  app.get('/getParties',controllers.Party.getParties);
  
  app.get('/tiles', (req, res) => res.render('tiles'));

  app.get('/getTiles', controllers.Tiles.getTiles);
  app.get('/orders', mid.requiresLogin, controllers.Order.getOrders); 

  app.get('/cart', mid.requiresLogin, (req, res) => res.render('cart'));
  app.get('/getCart', mid.requiresLogin, controllers.Order.getCart);
  app.post('/checkout', mid.requiresLogin, controllers.Order.checkout);

  app.get('/login', (req, res) => res.render('login'));
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/review', (req, res) => res.render('review'));
  app.post('/createPost', mid.requiresLogin, controllers.Post.createPost);
  app.get('/getPosts', controllers.Post.getPosts);

};
module.exports = router;
