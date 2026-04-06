This project is a prototype hospital management system for use by hospital administrators. It is built using a REACT.js front end connected to a MongoDB Atlas database through Java Spring Boot. 

### Running This Project

To run, you will need your own database cluster; create a file called application.properties inside of backend/src/main/resources and paste the following, replacing the placeholder username and password with your own (or just replace the whole string with your own URI):

spring.application.name=st-albatross-management-system
spring.mongodb.uri=mongodb+srv://<your mongodb username>:<mongodb password>@st-albatross-management.eguy0au.mongodb.net/st-albatross-management?retryWrites=true&w=majority
server.port=9090

Use two terminals to get it up and running; one navigated to the backend directory and the other to frontend:

frontend - npm run dev
backend - .\mvnw spring-boot:run