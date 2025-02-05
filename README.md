
# BookDelight

Project and implementation of a social web portal to manage a database of books


## Author

- [@Narothe](https://github.com/Narothe)

# BookDelight - Setup Guide  

This guide will help you set up and run both the backend and frontend of **BookDelight**.

---

### Backend  

1. Install Dependencies  
Navigate to the backend folder and install dependencies:  
```bash
cd BookDelight_Backend
npm install
```

2. Configure Environment Variables  
Create a `.env` file in the `BookDelight_Backend` directory and add the following configuration:  

```
SERVER_PORT=3000
DB_USER=
DB_HOST=
DB_DATABASE=
DB_PASSWORD=
DB_PORT=
JWT_SECRET=
JWT_TOKEN_EXPIRATION=
MAIL_HOST_NAME=
SMTP_HOST=
SMTP_PORT=
POP3_HOST=
POP3_PORT=
EMAIL_USER=
EMAIL_PASSWORD=
URL=http://localhost:3000
```

Replace the placeholder values with actual credentials and configuration details.

### 3. Start the Server  
Run the backend with:  
```bash
npm start
```
or:
```bash
npm run dev
```

The backend will be available at `http://localhost:3000/`.

---

### Frontend  

1. Install Dependencies  
Navigate to the frontend folder and install dependencies:  
```bash
cd BookDelight_Frontend
npm install
```

2. Configure Environment Variables  
Create a `.env` file in the `BookDelight_Frontend` directory and add the following configuration:  

```
PORT=4000
REACT_APP_BACKEND_URL=http://localhost:3000
REACT_APP_BOOK_PHOTO_URL=http://localhost:3000/book-photo/
REACT_APP_USER_PHOTO_URL=http://localhost:3000/user-photo/
```

Modify the URLs if your backend runs on a different port.

3. Start the Application  
Run the frontend with:  
```bash
npm start
```
The frontend will be available at `http://localhost:4000/` (or the port specified in `.env`).

---

Both the backend and frontend should now be running and connected! 🚀
