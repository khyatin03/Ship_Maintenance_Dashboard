# Ship Maintenance Dashboard - Application Overview

The **Ship Maintenance Dashboard** is a comprehensive web application designed for managing ship maintenance operations. It provides a centralized platform for administrators, inspectors, and engineers to track ships, components, and maintenance jobs with role-based access control.

## Purpose

This application helps maritime organizations efficiently manage their fleet maintenance by:
- Tracking the status and details of all ships in the fleet
- Managing maintenance jobs and their assignments
- Monitoring component health and maintenance schedules
- Providing role-specific access to different features

## Key Features

- **Interactive Dashboard**: Visual representation of KPIs and maintenance status
- **Ship Management**: Add, view, edit, and track ships in the fleet
- **Job Management**: Create, assign, and monitor maintenance jobs
- **Role-Based Access Control**: Different access levels for Admins, Inspectors, and Engineers
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: User-selectable interface theme
- **Context-Based State Management**: Efficient global state handling with React Context API
- **Local Storage**: Persistent data storage between sessions

---

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps
1. Clone the repository
   ```
   https://github.com/khyatin03/Ship_Maintenance_Dashboard.git
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Build for production
   ```
   npm run build
   ```

5. Preview production build
   ```
   npm run preview
   ```

---

## Project Structure

### Root Files
- **App.jsx**: Main application component with routing and context providers
- **main.jsx**: Entry point that renders the App component
- **index.html**: HTML template with font imports and root element
- **tailwind.config.js**: Tailwind CSS configuration with Poppins font family

### Context Providers
The application uses the following context providers to manage global state:
- **AuthContext.jsx**: Manages user authentication, login/logout, and role-based access
- **ShipsContext.jsx**: Manages ship data including CRUD operations
- **ComponentsContext.jsx**: Manages component data for ships
- **JobsContext.jsx**: Manages maintenance jobs, assignments, and status

### Pages
The application includes the following pages:
- **LoginPage.jsx**: User authentication with email and password
- **DashboardPage.jsx**: Main dashboard with KPIs, charts, and notifications
- **ShipsPage.jsx**: Displays a list of ships with filtering and sorting options
- **ShipDetailPage.jsx**: Shows detailed information about a specific ship and its components
- **ShipFormPage.jsx**: Form for creating new ships with validation
- **ShipEditPage.jsx**: Form for editing existing ship details
- **JobsPage.jsx**: Displays and manages maintenance jobs with filtering by status

### Components
Organized by feature area:
- **Authentication**: Login forms and authentication-related components
- **Dashboard**: KPI cards, charts, and summary components
- **Ships**: Ship list, detail views, and form components
- **Components**: Ship component management interfaces
- **Jobs**: Job list, detail views, and assignment components
- **Notifications**: Alert and notification components

### Utilities
- **roleUtils.js**: Helper functions for role-based access control
- **localStorageUtils.js**: Functions for persistent data storage

---

## Routing Structure

The application uses `react-router-dom` to define routes. Below is the routing structure:

### Public Routes
- `/login`: Displays the login page for authentication

### Private Routes
Protected routes are wrapped in the `PrivateRoute` component, which ensures:
1. The user is authenticated
2. The user has the required role(s) to access the route

#### Routes and Roles
| Path               | Component          | Roles Allowed                  | Description                       |
|--------------------|--------------------|---------------------------------|-----------------------------------|
| `/`                | DashboardPage      | All authenticated users        | Main dashboard with KPIs and charts |
| `/ships`           | ShipsPage          | Admin, Inspector               | List of all ships in the fleet    |
| `/ships/new`       | ShipFormPage       | Admin, Inspector               | Form to create a new ship         |
| `/ships/:id`       | ShipDetailPage     | Admin, Inspector               | Detailed view of a specific ship  |
| `/ships/:id/edit`  | ShipEditPage       | Admin, Inspector               | Form to edit an existing ship     |
| `/jobs`            | JobsPage           | Admin, Inspector, Engineer     | List and management of jobs       |

### Fallback Route
- `*`: Redirects to `/` for undefined routes

---

## Role-Based Access Control

The application implements a comprehensive role-based access control system with three user roles:

### User Roles
1. **Admin**: Full access to all features
   - Can manage ships, components, and jobs
   - Can assign jobs to engineers
   - Can view all dashboard data

2. **Inspector**:
   - Can view and edit ships and components
   - Can create and assign maintenance jobs
   - Cannot delete critical data

3. **Engineer**:
   - Can view assigned maintenance jobs
   - Can update job status and add notes
   - Limited access to ship details

### Implementation
The `PrivateRoute` component in `App.jsx` handles access control:
```jsx
<PrivateRoute roles={["Admin", "Inspector"]}>
  <ShipsPage />
</PrivateRoute>
```

### Default User Accounts
The system comes with pre-configured user accounts for testing:
- Admin: admin@entnt.in / admin123
- Inspector: inspector@entnt.in / inspect123
- Engineer: engineer@entnt.in / engine123

---

## UI and Styling

The application features a clean, professional design with:
- **Tailwind CSS**: For utility-based styling
- **Poppins Font**: Modern, readable typography
- **Responsive Layout**: Adapts to different screen sizes
- **Dark/Light Theme**: Toggle between color schemes
- **Interactive Elements**: Hover effects and transitions for buttons and links

---

## Data Management

The application uses React Context API for state management and localStorage for persistence:

1. **Context Providers**: Each major data type (auth, ships, components, jobs) has its own context
2. **Local Storage**: Data persists between sessions using browser localStorage
3. **Seed Data**: Initial data is loaded when the application first runs

---

## Technologies Used

- **React 18**: Component-based UI library
- **React Router 6**: For routing and navigation
- **Context API**: For global state management
- **Tailwind CSS**: For styling and responsive design
- **Vite**: Fast build tool and development server

---

## License

This project is licensed under the MIT License.
