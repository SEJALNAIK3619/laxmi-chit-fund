# Initialize local git directory
git init

# Create the main deploy branch
git branch -M main

# Add your GitHub remote origin (Replace with your actual GitHub username)
git remote add origin https://github.com

# Track and save files to commit snapshot
git add index.html sw.js manifest.json
git commit -m "Initial commit: 21 din mein paisa double edition 💰"

# Push to your remote repository
git push -u origin main
