require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});

