## Project Overview
Build a responsive e-commerce website called **"Paper and Peach"**, a merchandise shop selling custom pins (button badges) and stickers. Core features: a design editor where users upload and adjust their own artwork, and an online photobooth connected to the user's camera.

- Style: cute, warm, handmade stationery vibe
- Palette: peach (#FFB38A), cream (#FFF6EC), paper white, soft brown or mint accents
- Typography: playful headings (Fredoka/Baloo), clean body font
- Details: rounded corners, sticker-style outlines, subtle paper texture
- Language: Indonesian by default (i18n-ready for English)
- Mobile-first and responsive

---

## Navigation Structure

### Top Navigation Tabs
- Home (default view)
- Shop
- Design Studio
- Photobooth
- Gallery
- About / FAQ

### Header Elements
- Logo (Paper and Peach)
- Search
- Language toggle (ID / EN)
- Dark/Light mode toggle
- Cart icon with item count badge
- Notifications (order updates)
- User profile with name and avatar (Login / Register when signed out)

---

## Home Page

### Hero Section
- Headline, short tagline, and two CTAs: "Start Designing" and "Try the Photobooth"
- Animated preview of a pin and sticker being customized

### How It Works (3 Cards)
**Card 1: Choose**
- Pick a product, size, shape, and finish

**Card 2: Design**
- Upload artwork or snap a photobooth picture, then adjust it in the editor

**Card 3: Order**
- Check out and receive it at your door

### Featured Products
- Carousel of best-selling pins and stickers with price and quick "Customize" button

### Customer Gallery
- Grid of customer-made designs and photos, with a "Make yours" CTA

---

## Shop Page

### Filter & Sort Bar
- Category: Pins / Stickers
- Shape, size, finish, price range
- Sort by: Popular, Newest, Price

### Product Cards
- Product image, name, starting price, available sizes
- "Customize" button

### Product Options
**Pins**
- Sizes: 25mm, 32mm, 44mm, 58mm
- Shapes: round, square, heart

**Stickers**
- Types: die-cut, kiss-cut, sticker sheet
- Finishes: glossy, matte, holographic

### Pricing
- Tiered pricing by quantity (e.g. 1–9, 10–49, 50+)
- Price updates automatically when options change

---

## Design Studio Page (Core Feature)

### Setup Step
- Select product, size, shape, and finish
- Canvas template appears matching the chosen shape

### Canvas Area
- Interactive canvas (Fabric.js or Konva.js)
- On-canvas guides: **bleed area**, **safe zone**, **cut line**
- Zoom, pan, snapping, and alignment guidelines
- Undo / Redo

### Left Toolbar (Tools)
**Upload**
- Drag & drop or pick from phone gallery
- Formats: JPG, PNG, WebP, SVG (max 10 MB)

**Text**
- Font, size, color, outline, shadow, curved text (optional)

**Elements**
- Built-in stickers, icons, shapes, patterns, background colors

**Photobooth**
- Shortcut to open the photobooth and import the result directly

### Right Properties Panel
- Move, resize, rotate, flip, crop
- Layer order (forward / backward), duplicate, delete
- Image filters: brightness, contrast, saturation, B&W, sepia
- Background removal (optional)

### Quality Check
- Warning if image resolution is too low for print (target 300 DPI)
- Warning if content sits outside the safe zone

### Live Preview
- Realistic mockup: glossy pin on fabric/bag, sticker with white die-cut outline
- Toggle between flat view and mockup view

### Save & Order Actions
- Autosave to account, "Save Design" button
- Quantity selector per design
- "Add to Cart" (supports multiple different designs per order)
- Auto-export print-ready files (high-res PNG + PDF with bleed) attached to the order

---

## Photobooth Page (Core Feature)

### Camera Setup
- Friendly camera permission prompt with explanation
- Error states: permission denied, no camera found, unsupported browser
- Live preview with mirror (selfie) mode
- Front / back camera switch

### Layout Selector
- Single photo
- 3-photo strip
- 4-photo strip
- 2x2 grid

### Capture Controls
- Start button with automatic 3-2-1 countdown between shots
- Flash effect and shutter sound (mute toggle)
- Retake single photo or retake all

### Customization
**Filters (real-time)**
- Warm Peach, Black & White, Vintage, Soft Pastel

**Frames & Props**
- Paper and Peach themed borders
- Digital stickers/props and text overlay

### Result Actions
- Download (PNG)
- Share
- **Send to Design Studio** to turn it into a pin or sticker

### Privacy Note
- Photos are processed in the browser
- Uploaded only if the user chooses "Make into pin/sticker" or saves to account

---

## Cart & Checkout

### Cart
- Item list with design thumbnail, product, size, finish, quantity, price
- Edit design, change quantity, remove item
- Promo code field and order summary

### Checkout Steps
**Step 1: Shipping Address**
- Address form with province/city/district selection

**Step 2: Shipping Method**
- Real-time shipping cost (RajaOngkir or Biteship)

**Step 3: Payment**
- Midtrans or Xendit: QRIS, virtual account, e-wallets

### Order Confirmation
- Order summary, payment status, estimated delivery
- Email/WhatsApp notification

---

## Account Page

### Tabs
- My Orders (status: Awaiting Payment → Processing → In Production → Shipped → Completed)
- Saved Designs
- Photobooth Gallery
- Addresses
- Profile Settings

---

## Admin Dashboard

### Key Metrics Section (4 Cards)
**Card 1: Total Orders**
- Orders this month, percentage change from last month

**Card 2: Revenue**
- Revenue this month, percentage change from last month

**Card 3: In Production**
- Number of orders currently being produced

**Card 4: Pending Payment**
- Number of unpaid orders

### Sales Chart
- Bar chart of monthly revenue
- Time period selector (dropdown): This month, Last 3 months, Last 6 months, This year
- Split data by category: Pins and Stickers

### Management Sections
- Orders: list, download print-ready files, update status, enter tracking number
- Products: manage prices, sizes, finishes
- Promo codes
- Gallery content

---

## Non-Functional Requirements

### Tech Stack
- Next.js + React + TypeScript + Tailwind CSS
- Fabric.js or Konva.js, WebRTC + Canvas API
- PostgreSQL (Prisma) or Supabase, S3/Cloudinary storage
- Midtrans or Xendit, RajaOngkir or Biteship

### Quality Standards
- Performance: lazy loading, image compression, Lighthouse > 85 on mobile
- Security: server-side file validation, input sanitization, rate limiting, HTTPS, CSRF protection
- Accessibility: good color contrast, clear labels, keyboard navigation
- SEO and social media meta tags
- Clean, modular code with README (installation, environment variables, deployment)

---

## Build Order
1. Project structure, design tokens, base UI components
2. Shop + cart
3. Design Studio
4. Photobooth + Studio integration
5. Checkout, payments, accounts
6. Admin dashboard
7. Testing, optimization, deployment docs

Start with a brief architecture and folder structure overview, then build stage 1. Confirm with me before moving to the next stage.