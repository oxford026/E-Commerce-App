const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
    <div>
      <form method="POST">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="password" name="passwordConfirmation" placeholder="Password confirmation" />
        <button>Sign Up</button>
     
      </form> 
    </div>`);
});



app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Account created!!!');
});

app.listen(3000, () => {
    console.log('Running');
});