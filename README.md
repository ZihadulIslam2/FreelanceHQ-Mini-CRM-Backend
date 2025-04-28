# FlexiCRM

A modern and flexible Customer Relationship Management (CRM) system built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- 🔐 User Authentication and Authorization
- 👥 Client Management
- 📊 Project Tracking
- 📝 Interaction Logging
- ⏰ Reminder System
- 🎯 Project Status Management

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Postman Collection

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ZihadulIslam2/FreelanceHQ-Mini-CRM-Backend.git
cd FreelanceHQ-Mini-CRM-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/flexicrm"
JWT_SECRET="your-jwt-secret"
```

4. Set up the database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Documentation

The API documentation is available in two formats:

1. **Postman Collection**: Import the `postman_collection.json` file into Postman to explore and test the API endpoints.
2. **Online Documentation**: View the complete API documentation at [FlexiCRM API Documentation](https://documenter.getpostman.com/view/39309128/2sB2j1hCkj)

## Database Schema

The application uses the following main models:

- **User**: Manages user accounts and authentication
- **Client**: Stores client information
- **Project**: Tracks project details and status
- **InteractionLog**: Records client interactions
- **Reminder**: Manages user reminders

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build the application
- `npm start`: Start production server
- `npm run prisma:generate`: Generate Prisma client
- `npm run prisma:migrate`: Run database migrations
- `npm run prisma:studio`: Open Prisma Studio for database management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the GitHub repository. 