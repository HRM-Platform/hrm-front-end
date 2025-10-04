# HRIS Frontend

A modern Human Resource Information System (HRIS) frontend built with Next.js, TypeScript, and React Query.

## 🚀 Features

- **Employee Management** - Manage employee records, departments, and positions
- **Attendance Tracking** - Clock in/out system with real-time tracking
- **Leave Management** - Request and approve leave applications
- **Dashboard Analytics** - Real-time statistics and insights
- **API Integration** - Full REST API integration with React Query
- **Type-Safe** - Complete TypeScript support
- **Modern UI** - Built with shadcn/ui and Tailwind CSS

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **React Query** - Data fetching and state management
- **Axios** - HTTP client
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd hris-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your API URL

# Run development server
npm run dev
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📚 Documentation

- [API Integration Guide](./API_INTEGRATION.md) - Complete API integration documentation
- [Component Documentation](./docs/components.md) - Component usage guide

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── not-found.tsx      # 404 page
│   └── providers.tsx      # React Query & UI providers
├── components/
│   ├── attendance/        # Attendance components
│   ├── dashboard/         # Dashboard components
│   ├── employees/         # Employee components
│   ├── layout/            # Layout components
│   └── ui/                # UI components (shadcn)
├── hooks/
│   ├── api/               # React Query hooks
│   │   ├── useEmployees.ts
│   │   ├── useAttendance.ts
│   │   ├── useDashboard.ts
│   │   └── useLeave.ts
│   └── use-toast.ts       # Toast notifications
├── lib/
│   ├── api/
│   │   └── client.ts      # Axios API client
│   └── utils.ts           # Utility functions
├── services/              # API service layer
│   ├── employees.service.ts
│   ├── attendance.service.ts
│   ├── dashboard.service.ts
│   └── leave.service.ts
└── types/
    └── index.ts           # TypeScript types
```

## 🔌 API Integration

This frontend is designed to work with a REST API backend. See [API_INTEGRATION.md](./API_INTEGRATION.md) for:

- API endpoint structure
- Request/response formats
- Authentication setup
- Usage examples

## 🎨 UI Components

Built with [shadcn/ui](https://ui.shadcn.com/) components:

- Avatar
- Badge
- Button
- Card
- Input
- Progress
- Toast/Sonner
- Tooltip

## 🔐 Authentication

The API client supports JWT token authentication. Tokens are stored in localStorage and automatically included in requests.

```typescript
// Login
localStorage.setItem("auth_token", "your-jwt-token");

// Logout
localStorage.removeItem("auth_token");
```

## 📱 Responsive Design

Fully responsive design that works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, email support@your-domain.com or open an issue in the repository.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
# hrm-front-end
