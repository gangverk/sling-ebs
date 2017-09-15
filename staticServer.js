const express = require('express');
const path = require('path');

const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')));

// No matter what url you go to you alwyas get the same file
// React-Router should handle navigation within the application
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
