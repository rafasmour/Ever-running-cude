const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 80;

// Serve static files in 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route for index.html
app.get(['/', '/index(.html)?'], (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/index.html'));
});

// Catch-all for 404 errors
app.all('*', (req, res) => {
    res.status(404).send("404: Not Found");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
