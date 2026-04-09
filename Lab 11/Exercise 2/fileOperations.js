// Import file system module
const fs = require('fs');

// 1. Create a new file (writeFile)
fs.writeFile('sample.txt', 'Hello, this is Node.js file handling!', (err) => {
    if (err) {
        console.log('Error creating file:', err);
        return;
    }
    console.log('File created successfully.');

    // 2. Read the file (readFile)
    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:', err);
            return;
        }
        console.log('File content:', data);

        // 3. Append data (appendFile)
        fs.appendFile('sample.txt', '\nAppended text.', (err) => {
            if (err) {
                console.log('Error appending file:', err);
                return;
            }
            console.log('Data appended successfully.');

            // 4. Read updated file
            fs.readFile('sample.txt', 'utf8', (err, updatedData) => {
                if (err) {
                    console.log('Error reading updated file:', err);
                    return;
                }
                console.log('Updated content:', updatedData);

                // 5. Delete file (unlink)
                fs.unlink('sample.txt', (err) => {
                    if (err) {
                        console.log('Error deleting file:', err);
                        return;
                    }
                    console.log('File deleted successfully.');
                });
            });
        });
    });
});