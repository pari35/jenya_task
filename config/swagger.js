import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Event Booking API",
            version: "1.0.0",
            description: "API for managing users and events"
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1"
            }
        ]
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec; // ✅ IMPORTANT