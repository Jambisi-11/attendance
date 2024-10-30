document.getElementById('matricNumber').addEventListener('blur', function() {
    const matricNumber = this.value;

    // Check if matric number is empty
    if (!matricNumber) {
        document.getElementById('full-name').value = ''; // Clear full name if input is empty
        document.getElementById('result').innerHTML = ''; // Clear previous results
        return;
    }

    // Your Google Sheets API URL
    const apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1lRdhId9OhATL9RJW4qtRqoet-GIxM4f1D8udQf0V3xw/values/Sheet1!A:D?key=AIzaSyCDfTrkdJt9OJFW41uef62iiIrtyNuDim4';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const rows = data.values;
            let result = '';
            let found = false;

            // Assuming first row is headers: ["Matric Number", "Surname", "First Name", "Other Name"]
            for (let i = 1; i < rows.length; i++) {
                if (rows[i][0] === matricNumber) {
                    // Concatenate names
                    const fullName = `${rows[i][1]} ${rows[i][2]} ${rows[i][3]}`;
                    
                    // Set the value of the full-name input
                    document.getElementById('full-name').value = fullName;

                    result = `
                        <h2>Details:</h2>
                        <p><strong>Full Name:</strong> ${fullName}</p>
                        <!-- Adjust these indices if phone and email are in different columns -->
                        
                    `;
                    found = true;
                    break;
                }
            }

            if (!found) {
                result = '<p>No details found for this matric number.</p>';
            }

            document.getElementById('result').innerHTML = result;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('result').innerHTML = '<p>Error fetching data.</p>';
        });
});

// Handle form submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // You can handle form submission logic here, e.g., sending data to a server or API.
    
    alert("Form submitted successfully!");
});