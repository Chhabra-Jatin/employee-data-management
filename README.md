📘 Employee Data Management System
A full-stack web application to manage employee records — allowing users to create, update, list, and delete employee entries. The application is built using Spring Boot for the backend and ReactJS for the frontend.

🚀 Tech Stack
🧩 Backend
Java 17
Spring Boot 3
Spring Data JPA
MySQL Database
HikariCP (Connection Pooling)
CORS Configuration (for frontend-backend interaction)
REST API Design

🎨 Frontend
ReactJS (functional components)
React Router DOM
Bootstrap 5
FontAwesome / Bootstrap Icons
Axios (for HTTP requests)

🔄 How Frontend & Backend Communicate
The frontend (React) runs on port 3000, and the backend (Spring Boot) runs on port 8080.

To allow cross-origin requests between them, CORS is enabled in the backend via a global configuration.

✅ CORS Setup (Example in Spring Boot):

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

🧑 Add new employee with first name, last name, and email
✏️ Edit existing employee details
🗑️ Delete employee record
🔍 Search/filter employees
🔃 Sort employees by first or last name
🧾 Real-time table updates using Axios
🎨 Responsive & animated UI using Bootstrap

📁 Folder Structure

/EmployeeDataManagement
│
├── springboot-backend        # Spring Boot REST API + MySQL integration
│   └── src/main/java/...     # Controllers, Services, Repository
│
├── react-hooks-frontend      # ReactJS frontend using hooks and routing
│   └── src/components        # Components like List, Add, Header, etc.


🛠️ Setup Instructions
🔧 Backend (Spring Boot)
Import springboot-backend into Eclipse/IntelliJ
Update your application.properties with MySQL DB credentials
Run SpringbootBackendApplication.java
Ensure it starts on: http://localhost:8080

🌐 Frontend (React)
Navigate to react-hooks-frontend folder
Install dependencies:
npm install
Start the React app:
npm start
Visit: http://localhost:3000
