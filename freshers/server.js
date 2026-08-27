const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// FORCE REDIRECT: Lock users to the Freshers League page only
app.get(['/', '/index.html', '/team.html'], (req, res) => {
    res.redirect('/announcement.html?id=freshers-league');
});

// Serve static files (CSS, JS, Images)
app.use(express.static(__dirname));

// API route to handle the 6 form fields
app.post('/api/register', (req, res) => {
    const { name, roll, email, phone, position, experience } = req.body;
    
    // Clean up commas in text fields so they don't break the CSV columns
    const cleanExp = experience ? experience.replace(/,/g, ';') : 'None';
    const csvLine = `${name},${roll},${email},${phone},${position},${cleanExp}\n`;
    const filePath = path.join(__dirname, 'registrations.csv');

    // Save data to CSV file
    fs.appendFile(filePath, csvLine, (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).json({ success: false, message: 'Error saving data.' });
        }
        console.log(`Registration received: ${name} (${roll})`);
        res.json({ success: true, message: 'Registration saved successfully!' });
    });
});

// Secret URL for you to download the data
app.get('/api/data', (req, res) => {
    if (req.query.password !== 'iitfcadmin123') { // Change this password!
        return res.status(401).send('Unauthorized');
    }
    const filePath = path.join(__dirname, 'registrations.csv');
    if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=registrations.csv');
        res.sendFile(filePath);
    } else {
        res.status(404).send('No registrations yet.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});