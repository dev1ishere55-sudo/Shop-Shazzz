# EMOS Academy — Product & Technical Plan

## Product direction

Build a standalone learning/rewards platform inspired by the educational/read-to-earn mechanics observed on Emostically, but implemented as a proper application rather than a Blogger-style content site.

Core loop:

**Discover → Learn → Complete lesson → Pass quiz → Earn XP → Level up → Compete → Unlock rewards**

Long-term loop:

**Partner campaign → Sponsored learning path → Learner participation → Verified completion → Reward eligibility → Campaign analytics**

## MVP

1. Authentication
2. Course catalog
3. Course detail pages
4. Lesson reader with progress
5. Quiz engine with server-side scoring
6. XP transaction ledger
7. User profile
8. Global/weekly/monthly leaderboard
9. Admin course/lesson/quiz management
10. Draft/published course state

## Phase 2

- Achievements and badges
- Learning streaks
- Certificates
- Campaigns/quests
- Rewards center
- Discord integration
- Referral system
- Solana wallet connection

## Phase 3

- Partner/sponsor portal
- Sponsored educational campaigns
- Campaign analytics
- Automated reward eligibility
- Reputation/profile layer
- Advanced anti-abuse/fraud signals

## Suggested stack

- Frontend: Next.js/React
- Database: Supabase PostgreSQL
- Auth: Supabase Auth
- Storage: Supabase Storage
- Server-side logic: Supabase Edge Functions / server actions
- Realtime: Supabase Realtime where useful
- Source control: GitHub

## Database model

### profiles
- id (uuid, auth user id)
- username
- display_name
- avatar_url
- bio
- country
- total_xp (cached/read model; ledger remains source of truth)
- level
- current_streak
- longest_streak
- created_at
- updated_at

### courses
- id
- slug
- title
- description
- cover_image_url
- difficulty
- estimated_minutes
- xp_reward
- status (draft/published/archived)
- author_id
- created_at
- updated_at

### lessons
- id
- course_id
- title
- slug
- position
- content
- estimated_minutes
- xp_reward
- published
- created_at
- updated_at

### lesson_progress
- id
- user_id
- lesson_id
- started_at
- completed_at
- last_position
- completion_percent
- unique(user_id, lesson_id)

### quizzes
- id
- lesson_id (nullable for course final quizzes)
- title
- pass_percentage
- max_attempts
- cooldown_seconds
- published

### questions
- id
- quiz_id
- question_text
- explanation
- position
- points

### answers
- id
- question_id
- answer_text
- position
- is_correct (server-only/admin-only access)

### quiz_attempts
- id
- user_id
- quiz_id
- score
- passed
- started_at
- submitted_at
- attempt_number

### xp_transactions
- id
- user_id
- amount
- reason
- source_type
- source_id
- idempotency_key
- created_at

### achievements
- id
- slug
- name
- description
- icon_url
- criteria_json

### user_achievements
- user_id
- achievement_id
- earned_at

### rewards
- id
- title
- description
- image_url
- xp_cost
- stock
- active
- claim_rules_json
- created_at

### reward_claims
- id
- user_id
- reward_id
- status
- claimed_at
- fulfilled_at
- metadata_json

### campaigns
- id
- sponsor_id
- title
- slug
- description
- starts_at
- ends_at
- status
- reward_pool_description
- created_at

### campaign_participants
- id
- campaign_id
- user_id
- status
- progress_json
- eligible_at
- created_at

### sponsors
- id
- name
- slug
- logo_url
- website_url
- contact_email
- status

### wallets
- id
- user_id
- chain
- address
- verified_at
- is_primary
- unique(chain, address)

### notifications
- id
- user_id
- type
- title
- body
- read_at
- created_at

## Security rules

- Enable RLS on every exposed public table.
- Never let the browser write XP balances directly.
- XP must be awarded through trusted server-side operations and an append-only transaction ledger.
- Quiz correctness must not be exposed to the public client before submission.
- Reward eligibility must be calculated server-side.
- Never store private wallet keys.
- Never use editable user metadata as an authorization source.
- Admin authorization should use trusted app-level authorization, not client-controlled profile fields.
- Use idempotency keys for XP awards and reward claims.

## Initial routes

/
/learn
/courses/[slug]
/lesson/[id]
/quiz/[id]
/leaderboard
/rewards
/campaigns
/profile/[username]
/settings
/login
/signup

/admin
/admin/dashboard
/admin/courses
/admin/courses/new
/admin/courses/[id]
/admin/lessons/[id]
/admin/quizzes/[id]
/admin/users
/admin/campaigns
/admin/rewards
/admin/analytics

## UX principles

- Mobile-first.
- Do not require a wallet to start learning.
- Show progress everywhere.
- Make the next action obvious.
- Use XP/levels as motivation, not as a promise of financial return.
- Keep sponsored campaigns clearly labeled.
- Design the visual identity as a modern Web3 learning product, not a Blogger template.

## First release acceptance criteria

A new user can:

1. Sign up.
2. Browse published courses.
3. Start a course.
4. Read lessons.
5. Resume where they stopped.
6. Complete a lesson.
7. Take a quiz.
8. Receive server-validated XP exactly once for the relevant completion.
9. See their updated profile and leaderboard position.
10. Return later and see persistent progress.

An admin can:

1. Create a course.
2. Add/reorder lessons.
3. Add quizzes/questions/answers.
4. Publish/unpublish content.
5. Inspect users, progress and XP history.

## Important implementation note

The existing Shop-Shazzz repository is currently not an Academy codebase. Treat this document as the product specification/blueprint. The Academy should ultimately live in a dedicated repository if a separate GitHub repository can be created; do not couple Academy production code to Shop-Shazzz unless intentionally decided later.
