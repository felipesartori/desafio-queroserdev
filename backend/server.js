
const app = require('./src/app');

const port = process.env.PORT || 3080;

app.listen(port, () => {
  console.log('Aplicação executando na porta ', port);
});