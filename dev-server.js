const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Form submission endpoint
app.post('/dev/submit-form', async (req, res) => {
  try {
    const { name, age, email, phone, experience, message } = req.body;

    // Validate required fields
    if (!name || !age || !email) {
      return res.status(400).json({
        error: 'Missing required fields: name, age, and email are required'
      });
    }

    // Create the submission data
    const submission = {
      id: Date.now().toString(),
      name,
      age: parseInt(age),
      email,
      phone: phone || '',
      experience: experience || '',
      message: message || '',
      timestamp: new Date().toISOString(),
      status: 'new'
    };

    // Save to local JSON file (for development)
    const submissionsFile = path.join(dataDir, 'submissions.json');
    let submissions = [];
    
    if (fs.existsSync(submissionsFile)) {
      const data = fs.readFileSync(submissionsFile, 'utf8');
      submissions = JSON.parse(data);
    }
    
    submissions.push(submission);
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));

    console.log('Form submission received:', submission);

    // Return success response
    res.json({
      message: 'Form submitted successfully',
      id: submission.id
    });

  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/dev/health', (req, res) => {
  res.json({ status: 'OK', message: 'Local development server is running' });
});

// Get all submissions (for debugging)
app.get('/dev/submissions', (req, res) => {
  try {
    const submissionsFile = path.join(dataDir, 'submissions.json');
    if (fs.existsSync(submissionsFile)) {
      const data = fs.readFileSync(submissionsFile, 'utf8');
      const submissions = JSON.parse(data);
      res.json(submissions);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read submissions' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Local development server running on http://localhost:${PORT}`);
  console.log(`📝 Form submission endpoint: http://localhost:${PORT}/dev/submit-form`);
  console.log(`💾 Submissions saved to: ${dataDir}/submissions.json`);
});
