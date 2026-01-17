Runwal Seagull Society - Implementation Task Checklist
This document provides a sequential task list for implementing the Runwal Seagull Society portal. Work through these tasks one by one, in order.

📋 Phase 1: Foundation & Infrastructure Setup
Task 1.1: Project Initialization
 Initialize Next.js project with TypeScript (npx create-next-app@latest)
 Configure Tailwind CSS
 Set up ESLint and Prettier for code quality
 Configure environment variables structure (.env.local, .env.example)
 Set up Git repository and configure .gitignore
 Create project folder structure (components, lib, app, etc.)
Task 1.2: Database Setup
 Create Supabase project (free tier)
 Install Prisma (npm install prisma @prisma/client)
 Initialize Prisma (npx prisma init)
 Define all 14 database schemas in schema.prisma
 Run initial migration (npx prisma migrate dev)
 Set up database indexes for query performance
 Create seed data script for buildings and flats
 Test database connection
Task 1.3: Authentication System
 Install NextAuth.js v5 (npm install next-auth)
 Configure NextAuth with credentials provider
 Create user registration API endpoint
 Implement email/password login
 Set up session management with JWT
 Create middleware for route protection
 Implement role-based access control (RBAC) utilities
 Test authentication flow
Task 1.4: File Upload Configuration
 Create Cloudinary account (free tier) or Uploadthing
 Install upload library
 Configure API keys in environment variables
 Create reusable upload utility functions
 Create file upload React components
 Implement image optimization settings
 Set file size limits (images: 5MB, documents: 10MB)
 Set allowed file types
 Test file upload and retrieval
👥 Phase 2: User Management System
Task 2.1: User Registration Flow
 Create registration page UI (/register)
 Build registration form with react-hook-form
 Add building dropdown (fetch from database)
 Add flat number dropdown (filtered by selected building)
 Add user type selector (Owner/Tenant)
 Implement form validation with Zod
 Create registration API endpoint
 Insert user with status='PENDING'
 Send registration confirmation email
 Create success/pending approval page
Task 2.2: Admin Approval System
 Create admin dashboard route (/admin/pending-users)
 Build pending users list UI with filters
 Display user details (name, email, building, flat, type)
 Create approve API endpoint
 Create reject API endpoint
 Update user status in database
 Send approval email with login instructions
 Send rejection email with reason
 Add activity log for admin actions
Task 2.3: User Profile Management
 Create user profile page (/profile)
 Display current user information
 Add profile image upload functionality
 Create form for updating contact information
 Create password change form with current password verification
 Display assigned building and flat details
 Create profile update API endpoint
 Add validation and error handling
 Show success messages
Task 2.4: Building & Flat Management (Admin)
 Create buildings management page (/admin/buildings)
 Build building creation form
 Create building list with edit/delete actions
 Build building edit modal
 Create flats management page (/admin/flats)
 Build flat creation form (linked to building)
 Create flat list with filters by building
 Add owner/tenant assignment interface
 Create API endpoints for CRUD operations
 Add validation for unique building codes and flat numbers
🏠 Phase 3: Public Pages
Task 3.1: Home Page
 Design landing page hero section
 Add society overview section with description
 Display society contact information
 Create image gallery component (optional)
 Add quick links to login/register
 Implement fully responsive design
 Optimize for SEO (meta tags, titles)
Task 3.2: Public Notices Section
 Create public notices section on homepage
 Fetch notices with visibility='PUBLIC' and published=true
 Display notice cards (title, date, type)
 Add notice type badges with color coding
 Implement pagination (10 notices per page)
 Create notice detail modal/page
 Add "Read More" functionality
 Show notice attachments if any
Task 3.3: Public Events Section
 Create upcoming events section on homepage
 Fetch events where start_date > today
 Display event cards with date, time, title
 Add event type icons
 Implement event filtering (All, This Month, etc.)
 Create event detail modal
 Show event countdown timer
 Add "Login to Register" CTA for public users
📱 Phase 4: Registered User Features
Task 4.1: User Dashboard
 Create user dashboard page (/dashboard)
 Display welcome message with user name
 Show quick stats (upcoming events count, new notices count)
 Create "My Registrations" widget
 Create "Recent Notices" widget
 Add shortcuts to main features (Events, Marketplace, etc.)
 Implement notification bell with unread count
 Design responsive dashboard layout
Task 4.2: Notice Board (Registered Users)
 Create notices page (/notices)
 Fetch all published notices (PUBLIC + REGISTERED visibility)
 Display notice list with filters (All, General, Urgent, Maintenance)
 Add search functionality by title/content
 Show notice detail page
 Display and enable attachment downloads
 Track read/unread status (optional)
 Add pagination
Task 4.3: Event Management (Registered Users)
 Create events page (/events)
 Display all published events with filters (Upcoming, Past, All)
 Show event cards with registration status (Open/Closed/Not Started)
 Check if registration is active (between registration_start_date and registration_end_date)
 Display registration countdown (time until registration closes)
 Create event registration form modal
 Determine registration type (Individual or Team) based on event.participation_type
 For Individual events: collect only individual registration
 For Team events: add team member input fields (dynamic form array)
 Validate registration time bounds before allowing registration
 Check max participants limit before registration
 Create event registration API endpoint with validation
 Show real-time registration count/summary on event cards
 Display "X out of Y spots filled" if max participants set
 Show registration confirmation message
 Create "My Events" page showing user's registered events with status
 Implement registration cancellation (before event starts)
 Send registration confirmation email with event details
Task 4.4: Neighbor Directory
 Create neighbor directory page (/neighbors)
 Build search interface (select building, select flat)
 Display resident contact details (name, phone, email)
 Show owner vs tenant badge
 Implement privacy controls (users can hide their info)
 Add "Export Contact" button (vCard download)
 Show building-wise resident list view
 Add filters and sorting
Task 4.5: Vehicle Owner Search
 Create vehicle search page (/vehicles/search)
 Build vehicle number search form
 Display owner contact details when found
 Show vehicle details (type, brand, model, color)
 Create "My Vehicles" page (/vehicles/my-vehicles)
 Build vehicle registration form
 Allow adding multiple vehicles
 Create edit/delete functionality
 Create vehicle CRUD API endpoints
Task 4.6: Buy & Sell Marketplace
 Create marketplace page (/marketplace)
 Display all active ads in grid/list view
 Add category filters (Sell, Rent, Service, Other)
 Implement search by title/description
 Create ad posting page (/marketplace/create)
 Build ad posting form with rich text editor
 Add multiple image upload (max 5 images)
 Create ad submission API endpoint
 Create ad detail page with contact information
 Build "My Ads" page showing user's ads
 Add edit ad functionality
 Implement "Mark as Sold" button
 Add delete ad functionality
 Show "Sold" badge on sold items
👨‍💼 Phase 5: Admin Portal
Task 5.1: Admin Dashboard
 Create admin dashboard (/admin)
 Display system statistics (total users, pending approvals)
 Show active ads count
 Display complaint summaries
 Show recent user registrations
 Add quick action buttons (Create Notice, Create Event)
 Display activity feed
 Design admin navigation menu
Task 5.2: Notice Management (Admin)
 Create notice management page (/admin/notices)
 Build notice creation form with rich text editor (Tiptap/Quill)
 Add attachment upload (PDFs, images)
 Select notice type and visibility
 Add "Save as Draft" and "Publish" buttons
 Create notice creation/update API endpoints
 Create notice list with edit/delete actions
 Add notice preview functionality
 Track notice views (optional analytics)
Task 5.3: Event Management (Admin)
 Create event management page (/admin/events)
 Build comprehensive event creation form with all fields:
 Event name and description (rich text)
 Event category dropdown (Sports, Cultural, Other)
 Event start date/time picker
 Event end date/time picker
 Venue/location input
 Registration start date/time picker
 Registration end date/time picker
 Participation type selector (Individual/Team)
 Max participants limit (optional)
 Add event image upload functionality
 Implement "Save as Draft" and "Publish" buttons
 Published events appear in public domain (published=true)
 Create event creation/update API endpoints
 Build real-time registration dashboard for each event:
 Show live registration count
 Display total participants (including team members)
 List all registered users with their team details
 Show registration status (Open/Closed/Not Started) based on dates
 Display time remaining until registration closes
 Implement automatic registration enable/disable:
 Registration disabled before registration_start_date
 Registration enabled between start and end dates
 Registration disabled after registration_end_date
 View detailed participant information and team compositions
 Export registration list to CSV/Excel with team member data
 Send event notification emails to all registered users
 Edit event details (with validation if registrations exist)
 Cancel events with notification to registered participants
 Manually close event registrations before end date (if needed)
 View event analytics (total views, registrations over time)
Task 5.4: User Management (Admin)
 Create user management page (/admin/users)
 Display all users in table view
 Add filters (by role, status, building)
 Implement search by name, email, flat number
 Create user detail modal
 Add suspend/reactivate user functionality
 Implement role change (upgrade user to admin)
 Add password reset functionality
 View user activity logs
 Export user list (CSV)