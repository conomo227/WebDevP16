const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/contact', (req, res) => {
    const { firstName, lastName, email, comments } = req.body;
    console.log('Received form data:', req.body);

    res.json({
        message: 'Thank you for signing up!',
        firstName,
        lastName,
        email,
        comments,
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
