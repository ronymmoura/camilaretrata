# Camila Retrata - Photography Portfolio Website

A modern, responsive photography portfolio website built with Next.js 15, featuring both public portfolio views and an admin studio for content management.

## 🌟 Features

### Public Website
- **Responsive Portfolio Gallery**: Browse photography by categories with smooth transitions
- **Individual Essay Pages**: Detailed view of photo collections with client testimonials
- **About Page**: Photographer's story and services
- **Contact Form**: Integrated email functionality with form validation
- **Testimonials**: Client feedback displayed beautifully
- **Mobile-First Design**: Optimized for all devices

### Admin Studio
- **Category Management**: Organize portfolio by categories (Retratos, Casamentos, Eventos)
- **Essay Management**: Create and edit photo collections within categories
- **Photo Upload**: Multi-image upload with main photo selection
- **Content Management**: Full CRUD operations for all content
- **Responsive Admin Interface**: Manage content from any device

## 🛠 Tech Stack

### Frontend
- **Next.js 15.4.5** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Hook Form + Zod** - Form management and validation

### Backend
- **Next.js API Routes** - Backend endpoints
- **Prisma 6.13.0** - Database ORM
- **PostgreSQL** - Primary database
- **React Email** - Email template system

### Development
- **Turbopack** - Fast development builds
- **ESLint + Prettier** - Code quality
- **TypeScript** - Type checking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Gmail account (for email functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd camilaretrata
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your database and email credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/camilaretrata?schema=public"
   GMAIL_USER="your.email@gmail.com"
   GMAIL_PASSWORD="your_app_password"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Run database migrations
   npx prisma migrate dev
   
   # Seed the database with default categories
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
camilaretrata/
├── src/
│   ├── app/
│   │   ├── (user)/              # Public portfolio routes
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── about/           # About page
│   │   │   ├── portfolio/       # Portfolio gallery
│   │   │   ├── contact/         # Contact form
│   │   │   └── testimonials/    # Client testimonials
│   │   ├── (studio)/           # Admin content management
│   │   │   └── studio/         # Studio dashboard
│   │   └── api/                # Backend API routes
│   ├── lib/                    # Utilities and configurations
│   └── styles/                 # Global styles
├── prisma/                     # Database schema and migrations
├── emails/                     # Email templates
└── public/                     # Static assets
```

## 🗄 Database Schema

The application uses the following main entities:

- **Category**: Photography categories (e.g., "Retratos", "Casamentos", "Eventos")
- **Essay**: Individual photo shoots or collections within categories
- **Photo**: Individual images within essays, supporting both IMAGE and VIDEO types
- **User**: Admin users for studio access

## 🎨 Design Features

### Color Palette
- **Primary**: `#776E59` (Accent color)
- **Background**: `#eaac8a` (Warm background)
- **Foreground**: `#ededed` (Text color)

### Typography
- **Primary Font**: Moderustic (headings)
- **Secondary Font**: Poppins (body text)

### Responsive Design
- Mobile-first approach
- Breakpoints: `md:768px`, `lg:1024px`, `xl:1280px`
- Touch-friendly navigation
- Optimized image loading

## 📧 Email Configuration

To enable contact form functionality:

1. **Set up Gmail App Password**:
   - Enable 2-factor authentication on your Gmail account
   - Generate an app-specific password
   - Use this password in the `GMAIL_PASSWORD` environment variable

2. **Email Template**: The contact form uses React Email for beautiful, responsive email templates

## 🔒 Security Features

- Input validation with Zod schemas
- SQL injection protection via Prisma
- Environment variable protection
- Rate limiting considerations for production

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel

2. **Configure environment variables** in Vercel dashboard

3. **Database**: Use a managed PostgreSQL service like:
   - Vercel Postgres
   - Supabase
   - PlanetScale
   - AWS RDS

4. **Deploy**: Vercel will automatically deploy on push to main branch

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
GMAIL_USER="your.email@gmail.com"
GMAIL_PASSWORD="your_app_password"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:seed      # Seed database with default data
npm run db:reset     # Reset database and re-seed

# Prisma
npx prisma studio    # Open Prisma Studio
npx prisma migrate dev # Run database migrations
npx prisma generate  # Generate Prisma client
```

## 🎯 Usage

### Public Website
1. **Homepage**: Welcome visitors with hero section and call-to-action
2. **Portfolio**: Browse categories and individual photo essays
3. **About**: Learn about the photographer's story and services
4. **Contact**: Send inquiries through the contact form
5. **Testimonials**: Read client feedback and reviews

### Admin Studio
1. **Access**: Navigate to `/studio` (authentication required)
2. **Categories**: Manage portfolio categories and their display order
3. **Essays**: Create new photo collections within categories
4. **Photos**: Upload and organize images within essays
5. **Content**: Edit names, descriptions, and client feedback

## 🔮 Future Enhancements

### Planned Features
- [ ] Authentication system for studio access
- [ ] Image optimization and automatic resizing
- [ ] Advanced photo cropping tools
- [ ] SEO optimization with dynamic meta tags
- [ ] Google Analytics integration
- [ ] Social media sharing
- [ ] Blog functionality
- [ ] Client gallery access with passwords
- [ ] Online booking system
- [ ] Payment integration

### Technical Improvements
- [ ] Comprehensive testing suite
- [ ] Performance monitoring
- [ ] Image CDN integration
- [ ] Advanced caching strategies
- [ ] Progressive Web App features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from modern photography portfolios
- Built with love for photographers and their art
- Community feedback and suggestions

---

**Camila Retrata** - Capturing special moments with art and sensitivity
