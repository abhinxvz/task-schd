# T4skX - Advanced Task Management System

A modern, feature-rich task management application built with Next.js, React, and TypeScript. TaskFlow combines elegant design with powerful functionality to help you organize and track your tasks efficiently.

![T4skX Screenshot](https://via.placeholder.com/800x400/000000/FFFFFF?text=TaskFlow+Screenshot)

## ✨ Features

### 🎯 Core Task Management
- **Create Tasks**: Add tasks with name, description, and optional due dates
- **Edit Tasks**: Inline editing with real-time updates
- **Delete Tasks**: Remove completed or unwanted tasks
- **Mark Complete**: Toggle task completion status
- **Due Date Tracking**: Set and track task deadlines

### 📅 Calendar Integration
- **Interactive Calendar**: Mini calendar dropdown with live time display
- **Date Scheduling**: Click calendar dates to schedule tasks
- **Visual Indicators**: See which dates have pending/completed tasks
- **Task Preview**: View tasks scheduled for selected dates
- **Quick Scheduling**: One-click task creation for specific dates

### 🎨 Modern UI/UX
- **Aurora Background**: Beautiful animated gradient background
- **Dark Theme**: Sleek dark interface with gradient accents
- **Responsive Design**: Works perfectly on desktop and mobile
- **Interactive Elements**: Hover effects and smooth transitions
- **Real-time Updates**: Live clock and instant task updates

### 📊 Task Analytics
- **Task Statistics**: View total, completed, pending, and overdue tasks
- **Due Date Alerts**: Visual indicators for overdue tasks
- **Progress Tracking**: Monitor your productivity at a glance

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

\`\`\`
taskflow/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts          # Main tasks API
│   │       └── [id]/route.ts     # Individual task operations
│   ├── globals.css               # Global styles with aurora animation
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application page
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── gradient-card.tsx
│   │   ├── interactive-grid.tsx
│   │   ├── marquee.tsx
│   │   ├── shine-border.tsx
│   │   └── spotlight.tsx
│   ├── footer.tsx                # Footer with attribution
│   ├── header.tsx                # Header with calendar
│   ├── logo.tsx                  # TaskFlow logo
│   ├── mini-calendar.tsx         # Interactive calendar dropdown
│   ├── task-form.tsx             # Task creation/editing form
│   └── task-list.tsx             # Task display and management
└── README.md
\`\`\`

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **API**: Next.js API Routes
- **Data Storage**: In-memory (for demo purposes)
- **Animations**: Custom CSS keyframes and Framer Motion

## 📡 API Endpoints

### Tasks API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/tasks\` | Retrieve all tasks |
| POST | \`/api/tasks\` | Create a new task |
| PUT | \`/api/tasks/[id]\` | Update a specific task |
| DELETE | \`/api/tasks/[id]\` | Delete a specific task |

### Request/Response Examples

**Create Task (POST /api/tasks)**
\`\`\`json
{
  "name": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "dueDate": "2024-01-15T10:00:00.000Z"
}
\`\`\`

**Response**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "1704123456789",
    "name": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "completed": false,
    "dueDate": "2024-01-15T10:00:00.000Z",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
\`\`\`

## 🎨 Customization

### Aurora Background
The aurora animation can be customized in \`globals.css\`:
\`\`\`css
@keyframes aurora {
  from {
    background-position: 50% 50%, 50% 50%;
  }
  to {
    background-position: 350% 50%, 350% 50%;
  }
}
\`\`\`

### Color Scheme
Modify the gradient colors in the CSS variables:
\`\`\`css
:root {
  --gradient-primary: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
  --gradient-purple: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
}
\`\`\`

## 🔮 Future Enhancements

- [ ] **Database Integration**: PostgreSQL/MongoDB support
- [ ] **User Authentication**: Multi-user support with auth
- [ ] **Task Categories**: Color-coded task organization
- [ ] **Recurring Tasks**: Repeating task functionality
- [ ] **Task Priorities**: High/Medium/Low priority levels
- [ ] **Drag & Drop**: Reorder tasks and calendar scheduling
- [ ] **Export/Import**: JSON/CSV data management
- [ ] **Notifications**: Browser notifications for due tasks
- [ ] **Collaboration**: Share tasks with team members
- [ ] **Mobile App**: React Native companion app

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abhinav**
- GitHub: [@abhinxvz](https://github.com/abhinxvz)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

---

⭐ Star this repository if you found it helpful!
\`\`\`

## 🚀 Quick Start Commands

\`\`\`bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
\`\`\`

Made with ❤️ by [Abhinav](https://github.com/abhinxvz)
