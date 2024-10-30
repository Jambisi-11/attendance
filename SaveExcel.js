const express = require('express');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post('/signup', async (req, res) => {
    const { matricNumber, fullName, email, phoneNumber, password } = req.body;

    // Define the path for the Excel file
    const filePath = path.join(__dirname, 'StudentDatabase.xlsx');

    // Create a new workbook or read existing one
    const workbook = new ExcelJS.Workbook();
    let worksheet;

    if (fs.existsSync(filePath)) {
        await workbook.xlsx.readFile(filePath);
        worksheet = workbook.getWorksheet(1);
    } else {
        worksheet = workbook.addWorksheet('SignUpData');
        worksheet.columns = [
            { header: 'Matric Number', key: 'matricNumber' },
            { header: 'Full Name', key: 'fullName' },
            { header: 'Email Address', key: 'email' },
            { header: 'Phone Number', key: 'phoneNumber' },
            { header: 'Password', key: 'password' }
        ];
    }

    // Add new row with submitted data
    worksheet.addRow({ matricNumber, fullName, email, phoneNumber, password });

    // Write the updated workbook back to the file
    await workbook.xlsx.writeFile(filePath);

    // Send a success response
    res.json({ message: 'Registration successful!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});