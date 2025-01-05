# Webapp - Favorite Dogs

This is a web application built using Angular.

---

## Requirements

The **Favorite Dogs** web application was created to fulfill the following requirements:

### Gallery of Dog Images
- The application fetches and displays a gallery of 6 random dog images from [https://random.dog/woof.json](https://random.dog/woof.json).

### Favorite Feature
- Users can choose one or more images to mark as favorites.
- Favorites are stored in the browser's local storage.

### Refresh Functionality
- If users don’t like the displayed images, they can click a "Refresh" or "Next" button to load a new set of 6 random images.

### Endpoints
- `/`: Displays the gallery with options to mark favorites.
- `/favorites`: Displays all the user's favorite dog images.

### Responsive Design
- The application uses a flexbox layout to ensure it adjusts properly for mobile and desktop screens.

---

## Angular Application Setup

### Steps to Run the Application

1. **Import the Project**
   - Open the project in VSCode.
   - Project Name: `DogProject`.

2. **Install Dependencies**
   - Run the following command to install the required dependencies:
     ```bash
     npm install --save-dev @angular-devkit/build-angular --legacy-peer-deps
     ```

3. **Start the Development Server**
   - Run the following command to start the server:
     ```bash
     ng serve
     ```

4. **Access the Application**
   - Open your browser and navigate to:
     ```
     http://localhost:4200
     ```

5. **Run Test Cases**
   - Run the following command to execute test cases:
     ```bash
     ng test
     ```

### Notes on Test Cases
- Test cases are configured to run using the Karma/Jasmine test framework.
- The tests typically run on a dynamically assigned URL, such as:

http://localhost:9876/

- Check your console output to determine the specific URL.
- Test results will be visible in the console. Ensure Karma and Jasmine are properly installed if you encounter issues.

---

### Troubleshooting

If Karma or Jasmine is not installed, run the following commands to install the required test framework dependencies:

**For Jasmine**:
```bash
npm install --save-dev jasmine-core jasmine --legacy-peer-deps

**For Karma**:
```bash
npm install --save-dev karma-coverage-istanbul-reporter --legacy-peer-deps
