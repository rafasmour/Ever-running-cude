const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 80;
app.use(express.static(path.join(__dirname, 'public')));
app.use( '^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/index.html'));
})

app.all('*', (req, res) => {
    res.status(404);
});

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
})