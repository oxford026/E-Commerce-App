const express = reqiure('express')
const usersRepo = require('../../repositories/users');

const router = express.Router()

router.get('/signup', (req, res) => {
    res.send(`
    <div>
    ${req.session.userId ? 'You are logged in' : 'You are NOT logged in'}
      <form method="POST">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="password" name="passwordConfirmation" placeholder="Password confirmation" />
        <button>Sign Up</button>
     
      </form> 
    </div>`);
});



router.post('/signup', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email in use');
    }
    if (password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }

    const user = await usersRepo.create({ email, password });
    req.session.userId = user.id;

    res.send('Account created!!!');
});

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
})

router.get('/signin', (req, res) => {
    res.send(`
    <div>
      <form method="POST">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button>Sign In</button>
     
      </form> 
    </div>`);
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.getOneBy({ email });
    if (!user) {
        return res.send('Email not found');
    }
    const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
    )
    if (!validPassword) {
        return res.send('Invalid password');
    }

    req.session.userId = user.id;
    res.send('You are signed in');
});

module.exports = router