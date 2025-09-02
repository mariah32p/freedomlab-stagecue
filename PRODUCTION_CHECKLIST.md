Overview: Subscription + App MVP (Supabase + Stripe on Netlify)

## 1) Core flow (happy path) ✅ COMPLETE

✅ **Landing page**: Every button is a single CTA ("Start Free Trial"). All of them open the sign-up flow (no plan-specific buttons on the landing page).

✅ **Sign-up**: Create the user in Supabase Auth (email confirmation is turned off), then send them to /get-started.

✅ **Get Started**: User chooses Basic or Pro. When they click "Start 7-day trial," the server creates a Stripe Checkout Session with a trial and opens in new window.

✅ **Return**: After Checkout, Stripe sends the user back to /dashboard. Your webhook marks the subscription as "trialing" and stores the trial end date.

✅ **Dashboard**: Shows the product's real sections (Dashboard with event timing features) plus Settings access via navbar. A subscription status card shows trial info. All features work during the trial.

❌ **Auto-upgrade**: At the end of the trial, Stripe automatically charges the card and the subscription becomes "active." (Webhook handles this but not tested)

## 2) App structure ✅ COMPLETE

### Routes ✅ COMPLETE
- ✅ `/` landing page
- ✅ `/signup`: email/password sign-up  
- ✅ `/get-started`: plan selection + start trial (opens Stripe Checkout in new window)
- ✅ `/dashboard`: protected app with event timing features + subscription status

✅ **Sections are tailored to the product**: Dashboard shows event timing features (countdown displays, speaker notes, Slack notifications) instead of generic "Features" tab.

## 3) Plans, trials, and portal ⚠️ PARTIALLY COMPLETE

✅ **Trial**: 7 days; card is collected at start; everything is unlocked during the trial.

❌ **After trial**: 
- ❌ If active and Pro → full access. (Logic exists but not tested)
- ❌ If active and Basic → same UI, but Basic-gated actions remain disabled. (Feature gating not implemented)

❌ **Payment issues**: 
- ❌ If past_due or other payment issues → show a "Payment issue" banner and allow a 30-day grace window; after 30 days, treat as no active subscription. (PaymentIssueBanner component exists but payment_issue_since field not in database)

✅ **No active subscription**: If canceled or sign-up abandoned before payment → route to /get-started.

❌ **Settings → Manage Subscription**: Opens Stripe Customer Portal. (Not implemented - no portal session endpoint)

❌ **Upgrade/Downgrade**: Handled manually in-app with new Checkout Sessions. (Not implemented)

## 4) Data model (Supabase) ✅ COMPLETE

✅ **users table**: Stores id, email, full_name, avatar_url, created_at, updated_at with RLS

✅ **stripe_customers**: Maps user_id to customer_id with RLS

✅ **stripe_subscriptions**: Stores subscription data with RLS  

✅ **stripe_user_subscriptions view**: Joins user subscription data

❌ **payment_issue_since field**: Missing from stripe_subscriptions table for grace period tracking

✅ **Feature data**: App has placeholder event timing features structure

✅ **RLS**: Users can read and update only their own data

## 5) Environment & deployment (Netlify) ⚠️ NEEDS SETUP

❌ **Server-only env vars**: Need to set Stripe Secret Key, Stripe Webhook Secret, Supabase Service Role Key, App URL in Netlify

❌ **Client env vars**: Need to set Stripe Publishable Key, Supabase URL, Supabase Anon Key in Netlify

❌ **Redeploy after setting env**

## 6) Server endpoints ✅ COMPLETE

✅ **Create Checkout Session** (`/functions/v1/stripe-checkout`):
- ✅ For sign-up trials: Creates subscription Checkout Session with 7-day trial
- ✅ Success URL to /dashboard, cancel URL to /get-started  
- ✅ Returns Stripe URL to open in new window
- ❌ For plan changes: Not implemented yet

❌ **Create Portal Session** (`/functions/v1/create-portal-session`): Not implemented

✅ **Stripe Webhook** (`/functions/v1/stripe-webhook`):
- ✅ Verifies signature
- ✅ On checkout.session.completed: stores customer_id and subscription_id
- ✅ On customer.subscription.created/updated: updates plan, status, periods
- ✅ Creates users table record if needed
- ❌ On invoice.payment_failed: payment_issue_since tracking not implemented
- ✅ On customer.subscription.deleted: sets status to canceled
- ✅ Includes idempotency handling

## 7) Client logic ✅ MOSTLY COMPLETE

✅ **Route guard**: 
- ✅ If not signed in → send to /signup
- ✅ If status is trialing or active → send to /dashboard  
- ⚠️ If past_due and within 30 days → allow /dashboard with banner (banner exists but payment_issue_since field missing)
- ✅ Otherwise → send to /get-started

✅ **Grace helper**: Functions exist to determine 30-day grace window

⚠️ **Feature gating**:
- ✅ If status is trialing, allow all features
- ❌ Basic vs Pro feature gating not implemented (no actual restricted features yet)

✅ **Trial banner**: Shows on dashboard during trial with correct days and charge date

## 8) Analytics & notifications ❌ NOT IMPLEMENTED

❌ **Events to track**: None implemented

❌ **Attribution**: No UTM tracking  

❌ **Emails**: No email notifications set up

## 9) QA checklist ⚠️ NEEDS TESTING

❌ **Sign-up → Get Started → Checkout (trial) → Dashboard**: Needs end-to-end testing

❌ **Trial banner**: Needs testing with real trial data

❌ **Webhooks**: Need to test trialing → active transition

❌ **Basic vs Pro gates**: No gating implemented yet

❌ **Payment failure**: Grace period logic needs testing

❌ **Settings → Portal**: Not implemented

❌ **Plan changes**: Not implemented

✅ **Feature data**: Placeholder structure exists with RLS

## 10) Final "don't forgets" ⚠️ PARTIALLY COMPLETE

✅ **Timezone handling**: Uses toLocaleDateString() for date display

✅ **Abandoned signup**: Routes to /get-started correctly

❌ **Proration policy**: Not documented or implemented for plan changes

## SUMMARY

### ✅ READY FOR BASIC TESTING:
- Core signup → trial → dashboard flow
- Basic subscription status display
- Route protection
- Database structure with RLS

### ❌ STILL NEEDED FOR PRODUCTION:
1. **Environment variables setup in Netlify**
2. **Stripe Customer Portal endpoint**
3. **Plan change functionality** 
4. **Payment failure grace period** (add payment_issue_since field)
5. **Basic vs Pro feature gating**
6. **End-to-end testing**
7. **Email notifications**

### 🔧 PRIORITY FIXES:
1. Set up environment variables in Netlify
2. Add payment_issue_since field to database
3. Implement Stripe Customer Portal
4. Test the core signup flow end-to-end