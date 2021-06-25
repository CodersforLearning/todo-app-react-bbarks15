var express = require('express');
var path = require('path');
var logger = require('morgan');
const { Sequelize, DataTypes } = require('sequelize');

var app = express();
const port = 3001;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false
});

const Todo = sequelize.define('Todo', {
    identifier: { type: DataTypes.STRING, allowNullL: false },
    text: { type: DataTypes.STRING },
    completed: { type: DataTypes.BOOLEAN },
    position: { type: DataTypes.INTEGER },
  }, {
    timestamps: false
});

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.get('/todo', async (req, res) =>{
  const todos = await Todo.findAll({
    attributes: [['identifier', 'id'], 'text', 'completed', 'position']
  });
  res.send(JSON.stringify(todos, null));
})

app.post('/todo', async (req, res) =>{
  const newTodo = await Todo.create({
    identifier: req.body.id,
    text: req.body.text,
    completed: req.body.completed,
    position: req.body.position
  });

  res.json(req.body);
})

app.delete('/todo/:id', async (req, res) => {
  await Todo.destroy({
    where: { identifier: req.params.id }
  });

  res.json({});
})

app.put('/todo/:id', async (req, res) => {
  await Todo.update({
    identifier: req.body.id,
    text: req.body.text,
    completed: req.body.completed,
    position: req.body.position
  }, {
    where: {identifier: req.body.id}
  });

  res.json(req.body);
})

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log(`Listening at http://localhost:${port}`)
})


module.exports = app;
