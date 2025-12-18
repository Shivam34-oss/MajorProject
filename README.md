# 🌍 StaySphere | Travels and Market Place

![Project Banner](https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop)
## 🚀 Live Demo
> *Check out the live website here:* [https://wonderlust-listing-fgbx.onrender.com]

---

## 📖 Project Description
*Wanderlust* is a full-stack vacation rental marketplace inspired by Airbnb. It allows users to browse, create, and review listings for accommodations around the world.

The application is built using the *MVC (Model-View-Controller)* architecture to ensure clean code structure and scalability. It features secure authentication, image uploading via cloud storage, and interactive maps using geocoding.

### 🌟 Key Features
* *Authentication & Authorization:*
    * User Signup & Login (using Passport.js with Salt/Hash).
    * *Role-Based Access:* Users can only edit/delete their own listings.
* *Search & Filters:*
    * Advanced search functionality to find listings by location.
    * Category-based filtering (e.g., Mountains, Pools, Trending).
* *Map Integration:*
    * *MapTiler API* integration to show exact listing locations.
    * *Geocoding:* Automatically converts addresses into Latitude/Longitude coordinates.
* *Image Handling:*
    * Seamless image uploads stored directly on *Cloudinary* (Cloud Storage).
* *Review System:*
    * Users can leave star ratings and comments on listings.
* *Responsive Design:*
    * Mobile-first layout using Bootstrap 5.

---

## 🛠 Tech Stack

### Backend
* *Node.js & Express.js:* For handling server-side logic and RESTful APIs.
* *Passport.js:* For secure authentication and session management.
* *Joi:* For server-side data validation.

### Database
* *MongoDB Atlas:* Cloud-based NoSQL database.
* *Mongoose:* ODM for modeling application data.

### Frontend
* *EJS (Embedded JavaScript):* Templating engine for dynamic content.
* *Bootstrap 5:* For styling and responsive layout.
* *MapTiler SDK:* For rendering interactive maps.

### Deployment & Tools
* *Render:* Cloud platform for hosting the application.
* *Cloudinary:* For image storage and optimization.
* *Git & GitHub:* For version control.

---

## ⚙ Project Structure (MVC)

This project follows the industry-standard *Model-View-Controller* pattern:

`text
Wanderlust/
├── controllers/      # Contains the logic for handling requests (Brain of the app)
├── models/           # Mongoose schemas (Listing, User, Review)
├── routes/           # API Endpoints (Restful Routes)
├── views/            # Frontend Templates (EJS files)
├── public/           # Static files (CSS, JS, Images)
├── utils/            # Helper functions (Error handling, Middleware)
└── app.js            # Main entry point of the server

## Environment Variables
​To run this project locally, you will need to create a .env file in the root directory with the following variables:
env:
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_maptiler_token
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key
GMAIL_USER=your_email_address
GMAIL_PASS=your_app_password

🚀 How to Run Locally
  1 . Clone the repository:
  git clone [https://github.com/Shivam34-oss/MajorProject.git]
  cd StaySphere
  2 . install dependencies:
    bash 
    npm install
  3 . Setup Environment:
  Create a .env file and add your API keys (as shown above).
  4 . Start the server:
  bash 
    node app.js
  5 . Access the app:
   Open your browser and navigate to http://localhost:3000
🧑‍💻 Author 
Shivam
  . Full Stack Developer 
  . https://www.linkedin.com/in/shivam-chauhan-86067a209/
  . https://github.com/Shivam34-oss
Made with ❤️ by Shivam
