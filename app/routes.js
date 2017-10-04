var Todo = require('./models/todo');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "mysqlforlambdatest.cmxethvyqbqt.us-east-1.rds.amazonaws.com",
  user: "tmoon",
  password: "Test1234",
  database: "ExampleDB"
});

con.connect(function(err){
  if(err) throw err;
  console.log("Connected!");
});

function getTodos(res) {
    var sql = "SELECT * FROM todos";
    con.query(sql, function(err, result){
      if(err) throw err;
      console.log("Found " + JSON.stringify(result));
      res.json(result);
    });
};

module.exports = function (app) {
    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        var sql = "INSERT INTO todos (text) VALUES (" + "\"" + req.body.text + "\"" + ")"
        con.query(sql, function(err, result){
          if(err) throw err;
          console.log("Inserting record with query: " + sql);
          console.log(JSON.stringify(result));
          getTodos(res);
        });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        var sql = "DELETE FROM todos WHERE id=" + req.params.id;
        console.log(req.params);
        /*Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });*/
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
