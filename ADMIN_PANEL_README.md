# Admin Panel Documentation

## Overview

This admin panel provides complete control over your website content, allowing you to manage all sections without touching the code.

## Access

- **URL**: `/admin/login`
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin123`

⚠️ **Important**: Change the default password in production!

## Features

### 1. Dashboard
- View website statistics
- Monitor active projects
- Track task progress
- View analytics overview

### 2. Messages
- View all user messages and consultation requests
- Mark messages as read/unread
- Delete messages
- View message details

### 3. Pages Management
- Edit Homepage content
- Edit About Us page
- Edit Services page
- Edit Contact page

### 4. Projects
- Add, edit, and delete projects
- Set project status (working/completed)
- Track project progress
- Upload project images

### 5. Services
- Add, edit, and delete services
- Manage service descriptions, features, and benefits
- Upload service images

### 6. Team
- Add, edit, and delete team members
- Set member roles (CEO, Director, Manager, Employee)
- Upload team member photos
- Manage team member details

### 7. Clients
- Add, edit, and delete clients
- Manage client feedback and ratings
- Track client information

### 8. Blog
- Create, edit, and delete blog posts
- Publish/unpublish posts
- Manage post content and images

### 9. Analytics
- View website traffic statistics
- Daily, weekly, and monthly visitor data
- Page view analytics
- Visual charts and graphs

### 10. Quotes
- View all generated quotes
- Download quote PDFs
- Track quote requests

### 11. Notifications
- View all notifications
- Mark notifications as read
- Filter by type (messages, quotes, system)

### 12. Settings
- Update admin account information
- Change password
- Manage admin settings

## Data Storage

The admin panel uses JSON-based file storage located in the `/data` directory:
- `home.json` - Homepage content
- `about.json` - About Us content
- `services.json` - Services data
- `projects.json` - Projects data
- `team.json` - Team members data
- `messages.json` - User messages
- `quotes.json` - Generated quotes
- `clients.json` - Client information
- `blog.json` - Blog posts
- `analytics.json` - Analytics data

⚠️ **Note**: For production, consider migrating to a database (MongoDB, PostgreSQL, etc.)

## Get Quote Feature

Users can click the "Get Quote" button on the website to:
1. Enter their information
2. Generate a PDF quote automatically
3. Download the PDF
4. The quote is saved in the admin panel

## Security

- JWT-based authentication
- Protected admin routes
- Secure password hashing (bcrypt)
- HTTP-only cookies for tokens

## Dark/Light Mode

Toggle between dark and light mode using the sun/moon icon in the header.

## Responsive Design

The admin panel is fully responsive and works on:
- Desktop
- Tablet
- Mobile devices

## API Endpoints

All admin operations use RESTful API endpoints:
- `/api/auth/*` - Authentication
- `/api/content/*` - Content management
- `/api/messages` - Message management
- `/api/quotes` - Quote management
- `/api/clients` - Client management
- `/api/blog` - Blog management
- `/api/analytics` - Analytics data

## Development

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Access admin panel: `http://localhost:3000/admin/login`

## Production Deployment

1. Set `JWT_SECRET` environment variable
2. Change default admin password
3. Consider migrating to a database
4. Set up proper file storage for images
5. Configure CORS if needed
6. Set up SSL/HTTPS

## Support

For issues or questions, please contact the development team.

