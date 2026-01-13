# Phase 5: Admin Portal - Task Breakdown

**Status**: ⏳ Not Started
**Start Date**: Pending
**Goal**: Create a comprehensive administration interface for managing users, content, and system operations.

---

## 📋 Task List

### Task 5.1: Admin Dashboard ✅ COMPLETE
- [x] Create admin dashboard page (`/admin`)
- [x] Display system statistics (total users, pending approvals)
- [x] Show active ads count (from Marketplace)
- [x] Display complaint summaries (Open, In Progress, Resolved)
- [x] Show recent user registrations list
- [x] Add quick action buttons (Create Notice, Create Event)
- [x] Display recent activity feed
- [x] Design admin navigation menu/sidebar layout
- [x] Implement Admin Layout wrapper

**Status**: ✅ Complete - January 13, 2026
**Components**: `AdminSidebar`, `AdminStatsCards`, `RecentActivityFeed`, `QuickActions`
**Page**: `/admin/page.tsx`, `/admin/layout.tsx`
**Server Actions**: `getAdminStats`, `getRecentActivity`, `getRecentRegistrations`

### Task 5.2: Notice Management (Admin) ✅ COMPLETE
- [x] Create notice management page (`/admin/notices`)
- [x] Build notice creation form with rich text editor (Tiptap/Quill)
- [x] Add attachment upload (PDFs, images)
- [x] Select notice type (General, Urgent, Maintenance, Event) and visibility
- [x] Implement "Save as Draft" and "Publish" buttons
- [x] Create notice creation/update API endpoints
- [x] Create notice list with edit/delete actions
- [x] Add notice preview functionality
- [x] Track notice views (optional analytics)

**Status**: ✅ Complete - January 13, 2026

### Task 5.3: Event Management (Admin) ⏳ PENDING
- [ ] Create event management page (`/admin/events`)
- **Event Creation:**
    - [ ] Build comprehensive event creation form
    - [ ] Event name and description (rich text)
    - [ ] Event category dropdown (Sports, Cultural, Other)
    - [ ] Event start/end date/time pickers
    - [ ] Venue/location input
    - [ ] Registration start/end date/time pickers
    - [ ] Participation type selector (Individual/Team)
    - [ ] Max participants limit (optional)
    - [ ] Event image upload functionality
    - [ ] Implement "Save as Draft" and "Publish" buttons
    - [ ] Ensure published events appear in public domain
    - [ ] Create event creation/update API endpoints
- **Registration Management:**
    - [ ] Build real-time registration dashboard for each event
    - [ ] Show live registration count and total participants (incl. team members)
    - [ ] List all registered users with team details
    - [ ] Show registration status (Open/Closed/Not Started) logic
    - [ ] Display time remaining until registration closes
    - [ ] Implement automatic registration enable/disable based on dates
    - [ ] View detailed participant info and team compositions
    - [ ] Export registration list to CSV/Excel
- **Admin Actions:**
    - [ ] Send event notification emails to registered users (Deferred - Email Service)
    - [ ] Edit event details (with validation if registrations exist)
    - [ ] Cancel events with notification
    - [ ] Manually close event registrations
    - [ ] View event analytics

**Status**: ⏳ Pending

### Task 5.4: User Management (Admin) ⏳ PENDING
- [ ] Create user management page (`/admin/users`)
- [ ] Display all users in table view
- [ ] Add filters (by role, status, building)
- [ ] Implement search by name, email, flat number
- [ ] Create user detail modal
- [ ] Add suspend/reactivate user functionality
- [ ] Implement role change (upgrade user to admin)
- [ ] Add password reset functionality (Admin trigger)
- [ ] View user activity logs
- [ ] Export user list (CSV)

**Status**: ⏳ Pending

### Task 5.5: Marketplace Moderation (Admin) ⏳ PENDING
- [ ] Create marketplace moderation page (`/admin/marketplace`)
- [ ] Display all ads (active, sold, removed)
- [ ] Add filters and search
- [ ] Implement "Remove Ad" functionality (for inappropriate content)
- [ ] Add reason for removal input
- [ ] Notify ad poster about removal (System notification)
- [ ] View ad statistics (total ads, active, sold)

**Status**: ⏳ Pending

---

## 📊 Phase 5 Progress Summary

**Overall Progress**: 40% (2 of 5 tasks complete)

### Completed (✅):
1. Task 5.1: Admin Dashboard
2. Task 5.2: Notice Management

### Pending (⏳):
1. Task 5.3: Event Management
2. Task 5.4: User Management
3. Task 5.5: Marketplace Moderation

---

## 📝 Notes
- Admin routes must be protected by middleware checking `role === 'ADMIN'`.
- Sidebar navigation should be distinct from the user dashboard.
- Event management logic for registration windows is critical.
