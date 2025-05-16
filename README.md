# 📘 Employee Data Management System

A full-stack web application to manage employee records — allowing users to create, update, list, and delete employee entries. The application is built using **Spring Boot** for the backend and **ReactJS** for the frontend.

---

## 🚀 Tech Stack

### 🧩 Backend
- Java 17
- Spring Boot 3
- Spring Data JPA
- MySQL
- HikariCP
- REST APIs
- Global CORS Configuration

### 🎨 Frontend
- ReactJS (Hooks)
- React Router DOM
- Axios (for API requests)
- Bootstrap 5
- FontAwesome / Bootstrap Icons

---

## 🔄 Frontend & Backend Communication

The React frontend (running on port `3000`) communicates with the Spring Boot backend (port `8080`) using **RESTful API calls** via Axios.

To enable this cross-origin communication, CORS is configured in Spring Boot:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return registry -> registry.addMapping("/**")
                                   .allowedOrigins("http://localhost:3000")
                                   .allowedMethods("*");
    }
}

This allows the React frontend to communicate with backend APIs like:

POST   /api/employees
GET    /api/employees
PUT    /api/employees/{id}
DELETE /api/employees/{id}



✨ Features
🧑 Add new employee (first name, last name, email)
✏️ Edit employee details
🗑️ Delete employee record
🔍 Search employees by name/email
⬇️⬆️ Sort employees by first or last name
📋 Real-time table updates
🎨 Clean UI with responsive layout


📁 Folder Structure

/EmployeeDataManagement
│
├── springboot-backend        # Spring Boot REST API + MySQL
│   └── src/main/java/...     # Controllers, Services, Repository
│
├── react-hooks-frontend      # ReactJS frontend
│   └── src/components        # Components like List, Add, Header, etc.



🛠️ Setup Instructions

🔧 Backend (Spring Boot)
Import springboot-backend into Eclipse/IntelliJ
Update your application.properties with MySQL DB credentials
Run SpringbootBackendApplication.java
Ensure it starts on: http://localhost:8080

🌐 Frontend (React)
Navigate to react-hooks-frontend folder
Install dependencies: npm install
Start the React app: npm start
Visit: http://localhost:3000
