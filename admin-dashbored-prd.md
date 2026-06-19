\# Product Requirements Document (PRD)



\## Islam Tibyan Academy – Content Management \& Admin Dashboard System



\*\*Version:\*\* 1.0

\*\*Project:\*\* Islam Tibyan Academy Website CMS \& Admin Dashboard

\*\*Platform:\*\* Next.js + Tailwind CSS + Supabase + Vercel

\*\*Document Owner:\*\* Development Team

\*\*Status:\*\* Draft for Implementation



\---



\# 1. Overview



The current Islam Tibyan Academy website is a static marketing and informational platform built using \*\*Next.js\*\* and \*\*Tailwind CSS\*\*, deployed on \*\*Vercel\*\*, with the domain managed through \*\*Hostinger\*\*.



The academy administration requires an internal \*\*Admin Dashboard\*\* that enables authorized administrators to manage all website content without modifying source code or redeploying the project manually.



The dashboard will focus exclusively on \*\*content management\*\*, while the website design, layout, and visual identity remain fixed and controlled by the development team.



\---



\# 2. Objectives



\### Primary Goals



\* Allow administrators to edit website content dynamically.

\* Manage courses (Create, Update, Archive/Delete).

\* Manage images and media assets.

\* Manage administrator accounts and permissions.

\* Display website analytics inside the dashboard.

\* Display and manage registered student records.

\* Maintain high performance and security while preserving the existing frontend architecture.



\### Non-Goals



\* No visual page builder.

\* No drag-and-drop layout editor.

\* No modification of website structure or UI components.

\* No LMS (Learning Management System) or online classroom functionality in Phase 1.

\* No payment gateway integration in Phase 1.



\---



\# 3. Technology Stack



| Layer              | Technology                |

| ------------------ | ------------------------- |

| Frontend           | Next.js (App Router)      |

| Styling            | Tailwind CSS              |

| Deployment         | Vercel                    |

| Database           | Supabase PostgreSQL       |

| Authentication     | Supabase Auth             |

| File Storage       | Supabase Storage          |

| Image Optimization | Sharp + WebP Conversion   |

| Analytics          | Google Analytics Data API |

| Domain Management  | Hostinger                 |



\---



\# 4. System Architecture



```

Public Website

&#x20;     │

&#x20;     ├───────────────┐

&#x20;     │               │

&#x20;     ▼               ▼

Admin Dashboard   Public Pages

&#x20;     │               │

&#x20;     └──────┬────────┘

&#x20;            │

&#x20;    Server Actions / API Routes

&#x20;            │

&#x20;            ▼

&#x20;       Supabase Backend

&#x20;       ├── PostgreSQL Database

&#x20;       ├── Authentication

&#x20;       └── Storage (Media Files)

```



\---



\# 5. Admin Authentication \& Authorization



\## Authentication



\* Email and password login.

\* Secure session management.

\* Password reset via email.

\* Change password from dashboard.



\## User Roles



\### Super Admin



\* Full system access.

\* Create/Edit/Delete administrator accounts.

\* Manage all website content.

\* View analytics.

\* View and manage student records.

\* Configure general settings.



\### Editor



\* Manage website content.

\* Manage courses.

\* Manage media files.

\* Cannot manage administrator accounts.

\* Cannot modify system-level settings.



\---



\# 6. Dashboard Modules



\## 6.1 Dashboard Home



Displays a high-level overview including:



\* Total active courses.

\* Total registered students.

\* Website visits (Today / Week / Month).

\* Recent student registrations.

\* Recent content updates.



\---



\## 6.2 Content Management



Administrators can edit all textual content without changing the design.



Editable sections include:



\* Hero title.

\* Hero subtitle.

\* About section.

\* Mission and vision.

\* Call-to-action sections.

\* Contact information.

\* Footer content.

\* Social media links.

\* Announcement banners.

\* Seasonal and religious event messages.



The UI layout and styling are not editable.



\---



\## 6.3 Course Management



\### Features



\* Add new course.

\* Edit existing course.

\* Archive or delete course.

\* Change course image.

\* Update registration/Zoom links.

\* Control course visibility (Published / Hidden).



\### Course Data Model



| Field             | Type               |

| ----------------- | ------------------ |

| Title             | Text               |

| Slug              | Unique Text        |

| Short Description | Text               |

| Full Description  | Rich Text          |

| Featured Image    | Media              |

| Instructor Name   | Text               |

| Duration          | Text               |

| Category          | Text               |

| Registration Link | URL                |

| Zoom Link         | URL                |

| Status            | Published / Hidden |

| Created Date      | Timestamp          |



\### Dynamic Routing



Each course automatically generates a dynamic page:

`/courses/\[slug]`



No manual page creation is required.



\---



\## 6.4 Media Library



\### Features



\* Upload images.

\* Replace existing images.

\* Delete unused images.

\* Image preview.

\* Copy image URL.



\### Image Processing



\* Automatic conversion to WebP.

\* Automatic compression during upload.

\* Target maximum size: 100 KB per image.

\* Optional automatic resizing for oversized uploads.



\### Storage Rules



\* Images stored in Supabase Storage.

\* Existing images replaced using upsert functionality.

\* No unnecessary media duplication.



\---



\## 6.5 Administrator Management



\### Features



\* Add new administrator via email.

\* Edit administrator information.

\* Disable or remove administrator access.

\* Change own password.

\* Role assignment (Super Admin / Editor).



\### Administrator Profile Fields



\* Name.

\* Email.

\* Role.

\* Status.

\* Last Login Timestamp.



\---



\## 6.6 Student Management



A dedicated module for displaying and managing registered students.



\### Features



\* List all students.

\* Search by name, email, or phone number.

\* Filter by enrolled course.

\* View registration date.

\* Export student data (future enhancement).



\### Student Data Model



| Field             | Type             |

| ----------------- | ---------------- |

| Full Name         | Text             |

| Email             | Text             |

| Phone Number      | Text             |

| Country           | Text             |

| Registered Course | Relation         |

| Registration Date | Timestamp        |

| Status            | Active / Pending |



\---



\## 6.7 Analytics Dashboard



Integrate with Google Analytics Data API to display:



\* Total visitors.

\* Daily visitors.

\* Weekly visitors.

\* Monthly visitors.

\* Most visited pages.

\* Traffic sources.

\* Top performing content.



The dashboard will provide summary statistics only and will not replace the full Google Analytics interface.



\---



\# 7. Database Structure



\## Table: settings



Stores editable website content.



| Column     |

| ---------- |

| key        |

| value      |

| updated\_at |



\---



\## Table: courses



| Column            |

| ----------------- |

| id                |

| title             |

| slug              |

| short\_description |

| full\_description  |

| image\_url         |

| instructor        |

| duration          |

| registration\_link |

| zoom\_link         |

| status            |

| created\_at        |

| updated\_at        |



\---



\## Table: admin\_profiles



| Column     |

| ---------- |

| id         |

| email      |

| name       |

| role       |

| active     |

| last\_login |



\---



\## Table: students



| Column     |

| ---------- |

| id         |

| full\_name  |

| email      |

| phone      |

| country    |

| course\_id  |

| status     |

| created\_at |



\---



\# 8. Security Requirements



\* Supabase Row Level Security (RLS) enabled.

\* Service Role Key stored only in Vercel Environment Variables.

\* No sensitive credentials exposed to the client.

\* All write operations performed through Server Actions or protected API routes.

\* Middleware protection for all `/admin/\*` routes.

\* Role-based authorization.

\* Secure password hashing and authentication handled by Supabase Auth.

\* HTTPS enforced across all environments.



\---



\# 9. Performance Requirements



\* Maintain existing website performance and SEO.

\* Use Server Components where appropriate.

\* Use caching and revalidation for content updates.

\* Optimize all uploaded images before storage.

\* Preserve fast loading times comparable to static site generation.



\---



\# 10. Future Expansion (Out of Scope for Phase 1)



\* Student portal.

\* Teacher portal.

\* Online course delivery.

\* Assignment management.

\* Payment gateway integration.

\* Multi-language content management.

\* Email notifications and newsletters.

\* LMS functionality.



\---



\# 11. Acceptance Criteria



The implementation will be considered complete when:



1\. Administrators can securely log in.

2\. Website text and images can be edited without code changes.

3\. Courses can be added, edited, archived, and deleted dynamically.

4\. Dynamic course pages are automatically generated.

5\. Administrator accounts can be managed by Super Admins.

6\. Google Analytics metrics are visible inside the dashboard.

7\. Registered student records can be viewed and managed.

8\. Images are automatically optimized and stored securely.

9\. The public website design remains unchanged.

10\. All changes are reflected on the live website without requiring manual source code edits.



