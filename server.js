import app from './app.js';

app.listen(app.get('port'), () => {
  console.log(`Running on port : ${app.get('port')}`);
});
