# StageCue - Product Specification

## Overview

StageCue is a professional event timing system designed for conferences, workshops, and live events. It provides real-time countdown displays, speaker coordination, and team notifications to keep events perfectly on schedule.

## Target Users

- **Event Organizers**: Conference directors, workshop coordinators, meeting planners
- **Moderators**: Session hosts who need to manage timing during live events
- **Speakers**: Presenters who need access to their notes and timing cues
- **Event Teams**: Support staff who need real-time coordination updates

## Core Value Proposition

Transform event timing from chaotic to seamless with:
- Professional countdown displays that can be shared via simple links
- Speaker notes synchronized with timing cues
- Automatic team notifications via Slack integration
- Real-time coordination tools for event staff

## Product Features

### 1. Event Creation & Management
- **Quick Setup**: Create events in under 15 minutes
- **Event Details**: Name, date, duration, meeting links (Zoom, Teams, etc.)
- **Multi-Session Support**: Handle multiple concurrent sessions/rooms
- **Template System**: Save and reuse event configurations

### 2. Countdown Displays
- **Shareable Links**: Generate URLs for countdown displays that work on any device
- **Clean Design**: Professional appearance suitable for projection screens
- **Real-time Updates**: All displays sync automatically when timing changes
- **Multi-Timer Support**: Run multiple sessions simultaneously
- **Visual Progress**: Progress bars and time remaining indicators

### 3. Speaker Management
- **Speaker Profiles**: Name, session title, duration, contact info
- **Session Scheduling**: Organize agenda with time slots
- **Speaker Notes**: Time-synced speaking notes and cues
- **Note Types**: Essential, optional, and transition cues
- **Self-Service Access**: Speakers can access their own notes via links

### 4. Live Event Controls
- **Timer Controls**: Start, pause, extend sessions (+5 min, +10 min, custom)
- **Session Transitions**: Move between speakers/sessions smoothly
- **Emergency Actions**: Quick alerts, time extensions, session skips
- **Team Status**: Real-time view of moderator/speaker readiness

### 5. Team Coordination
- **Slack Integration**: Automatic notifications to team channels
- **Alert Types**: Time warnings (5 min, 2 min), session transitions, custom alerts
- **Team Status**: Visual indicators for moderator, speakers, tech support readiness
- **Quick Actions**: One-click alerts and coordination messages

### 6. Subscription Plans

#### StageCue Basic - $29/month
- Up to 10 active timers
- Timer controls via web dashboard
- Speaker notes management
- Basic Slack notifications
- Save/reuse timer configurations
- 7-day free trial

#### StageCue Pro - $49/month
- Everything in Basic, plus:
- Unlimited active timers
- Custom moderator links
- Speaker self-service links
- Advanced Slack notifications
- Timer + speaker templates
- 7-day free trial

## Technical Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router for SPA navigation
- **State Management**: React Context for auth and subscription state
- **Build Tool**: Vite for development and production builds

### Backend (Supabase)
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Authentication**: Supabase Auth with email/password
- **Real-time**: Supabase real-time subscriptions for live updates
- **Edge Functions**: Serverless functions for Stripe integration

### Payment Processing (Stripe)
- **Subscriptions**: Monthly recurring billing with trials
- **Customer Portal**: Self-service billing management
- **Webhooks**: Automatic subscription status updates
- **Security**: PCI-compliant payment processing

### Deployment (Netlify)
- **Hosting**: Static site deployment with SPA routing
- **Environment**: Secure environment variable management
- **CDN**: Global content delivery for fast loading

## User Flows

### 1. New User Signup Flow
1. User visits landing page
2. Clicks "Start Free Trial" 
3. Creates account with email/password
4. Chooses Basic or Pro plan
5. Enters payment info in Stripe Checkout (with 7-day trial)
6. Redirected to dashboard with full access during trial
7. After 7 days, automatically charged unless canceled

### 2. Event Creation Flow
1. User clicks "Create New Timer" from dashboard
2. Fills out event details (name, date, duration, meeting link)
3. Adds speakers with session titles and durations
4. Sets up speaker notes with time markers
5. Generates shareable countdown display links
6. Configures Slack notifications for team

### 3. Live Event Management Flow
1. Moderator opens live management dashboard
2. Starts countdown timer for current session
3. Monitors speaker progress with real-time countdown
4. Receives automatic alerts at 5-min and 2-min marks
5. Can extend sessions, alert team, or transition to next speaker
6. Team receives Slack notifications for all timing changes

### 4. Speaker Experience Flow
1. Speaker receives self-service link before event
2. Views their session details and timing
3. Accesses time-synced speaking notes during presentation
4. Sees countdown timer and progress indicators
5. Receives transition cues for smooth handoffs

## Database Schema

### Core Tables
- **users**: User profiles linked to Supabase Auth
- **stripe_customers**: Maps users to Stripe customer IDs
- **stripe_subscriptions**: Subscription status and billing info
- **stripe_orders**: One-time payment records (if needed)

### Feature Tables (To Be Implemented)
- **events**: Event details and configuration
- **speakers**: Speaker profiles and session info
- **speaker_notes**: Time-synced notes and cues
- **event_sessions**: Individual session timing and status
- **team_notifications**: Slack integration settings

## Security & Compliance

### Data Protection
- **Encryption**: All data encrypted in transit and at rest
- **RLS**: Row Level Security ensures users only access their data
- **Authentication**: Secure email/password with optional 2FA
- **Privacy**: No data sharing with third parties

### Payment Security
- **PCI Compliance**: Stripe handles all payment processing
- **No Card Storage**: Payment methods stored securely by Stripe
- **Webhook Security**: Signed webhooks prevent tampering

## Performance Requirements

### Response Times
- **Page Load**: < 2 seconds initial load
- **Timer Updates**: < 100ms real-time sync
- **API Responses**: < 500ms for all operations
- **Slack Notifications**: < 5 seconds delivery

### Scalability
- **Concurrent Events**: Support 100+ simultaneous events
- **Users per Event**: 50+ team members per event
- **Data Storage**: Unlimited event history retention

## Integration Requirements

### Slack Integration
- **OAuth Setup**: One-click workspace connection
- **Channel Selection**: Choose specific channels for notifications
- **Message Types**: Time warnings, transitions, custom alerts
- **Formatting**: Rich message formatting with event context

### Video Platform Compatibility
- **Zoom**: Share countdown displays in meetings
- **Microsoft Teams**: Embed timers in team calls
- **Google Meet**: Display links work in any browser
- **Generic**: Works with any video platform via browser sharing

## Success Metrics

### User Engagement
- **Trial Conversion**: > 25% trial-to-paid conversion
- **Monthly Retention**: > 85% month-over-month retention
- **Feature Adoption**: > 70% users create multiple events
- **Session Usage**: Average 3+ events per user per month

### Product Performance
- **Setup Time**: < 15 minutes from signup to first live event
- **Uptime**: 99.9% availability during business hours
- **Support Response**: < 4 hours for critical issues
- **User Satisfaction**: > 4.5/5 average rating

## Development Priorities

### Phase 1 (Current - MVP)
- ✅ User authentication and subscription management
- ✅ Basic dashboard and settings
- ✅ Stripe integration with trials
- ✅ Route protection and subscription gating

### Phase 2 (Next - Core Features)
- ❌ Event creation and management
- ❌ Speaker management system
- ❌ Countdown timer displays
- ❌ Basic Slack notifications

### Phase 3 (Future - Advanced Features)
- ❌ Speaker self-service portals
- ❌ Advanced Slack integration
- ❌ Event templates and reusability
- ❌ Multi-session coordination
- ❌ Analytics and reporting

## Known Technical Debt

### Current Issues (from PRODUCTION_CHECKLIST.md)
1. **Stripe Customer Portal**: Endpoint exists but needs testing
2. **Payment Failure Grace Period**: Logic exists but `payment_issue_since` field needs testing
3. **Feature Gating**: Basic vs Pro plan restrictions not implemented
4. **End-to-End Testing**: Core signup → trial → dashboard flow needs validation

### Missing Core Features
- No actual event timing functionality yet (currently just demo UI)
- No real speaker management system
- No Slack integration implementation
- No countdown display generation
- No speaker notes system

## Deployment Requirements

### Environment Variables (Netlify)
```
# Client-side (VITE_ prefix)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Server-side (Supabase Edge Functions)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
APP_URL=your_deployed_app_url
```

### Build Configuration
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18+
- **Redirects**: SPA routing configured in `netlify.toml`