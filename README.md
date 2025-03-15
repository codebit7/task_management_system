# Task Management System

## Overview
The **Task Management System** is a full-stack MERN application designed to help users manage their tasks efficiently. It provides features like task creation, updating, deletion, and status tracking.

## Features
- User authentication (JWT-based)
- Task creation, editing, and deletion
- Task status management (Pending, In Progress, Completed)
- Responsive UI with React.js
- REST API powered by Express.js and MongoDB
- Secure authentication and authorization

---

## **Installation & Setup**

### **Prerequisites**
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### **Clone the Repository**
```sh
 git clone https://github.com/codebit7/task_management_system.git
 cd task_management_system
```

### **Backend Setup**
1. Navigate to the `server` directory:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `server` directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### **Frontend Setup**
1. Navigate to the `client` directory:
   ```sh
   cd ../client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `client` directory and add:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```sh
   npm start
   ```

### **Access the Application**
Once both servers are running, you can access the application at:
[http://localhost:3000](http://localhost:3000)

---

## **Contributing**
Contributions are welcome! To contribute:
1. **Fork** the repository
2. **Create** a new branch (`git checkout -b feature-branch`)
3. **Commit** your changes (`git commit -m "Added a new feature"`)
4. **Push** to your fork (`git push origin feature-branch`)
5. **Submit** a Pull Request

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgements**
This project is inspired by various MERN stack task management applications and tutorials. Special thanks to the open-source community for continuous learning and improvement.


