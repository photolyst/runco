# Requirements Document

## Introduction

runcoは、計測・写真・コミュニティ機能を統合したスポーツイベントプラットフォームです。現在のPhotolystシステムを再構築し、組織ベースの権限管理、正確なタイム計測、エントリー管理、コミュニティ運営、写真販売機能を提供する統合プラットフォームを構築します。

## Glossary

- **System**: runcoプラットフォーム
- **Organization**: 計測会社や運営委員会などの主体組織
- **Event**: 組織が主催するスポーツイベント・大会
- **User**: プラットフォームを利用する個人ユーザー
- **Member**: 組織に所属するユーザー
- **Owner**: 組織の管理者権限を持つメンバー
- **Staff**: 組織のイベント運営権限を持つメンバー
- **Timer_System**: タイム計測機能
- **Entry_System**: 大会申込み管理機能
- **Photo_System**: 走行写真の閲覧・購入機能
- **Community_System**: サブスクリプション型コミュニティ運営機能
- **RLS**: Row Level Security（行レベルセキュリティ）
- **Server_Actions**: Next.jsのサーバーアクション機能

## Requirements

### Requirement 1

**User Story:** As a user, I want to create and manage organizations, so that I can organize and run multiple sports events under a single entity.

#### Acceptance Criteria

1. THE System SHALL allow authenticated users to create new organizations
2. WHEN a user creates an organization, THE System SHALL automatically assign the user as the organization owner
3. THE System SHALL allow organization owners to invite other users as staff members
4. THE System SHALL maintain organization membership data with role-based permissions (owner/staff)
5. THE System SHALL provide organization switching functionality for users belonging to multiple organizations

### Requirement 2

**User Story:** As an organization owner, I want to create and manage events, so that I can organize sports competitions and track participants.

#### Acceptance Criteria

1. THE System SHALL allow organization owners to create new events within their organization
2. THE System SHALL associate each event with exactly one organization via organization_id
3. THE System SHALL allow organization owners and staff to edit event details
4. WHILE a user is not a member of an organization, THE System SHALL prevent access to that organization's events
5. THE System SHALL allow organization owners to delete events

### Requirement 3

**User Story:** As an event organizer, I want to manage participant entries, so that I can track who is registered for each event.

#### Acceptance Criteria

1. THE System SHALL provide entry management functionality for each event
2. THE System SHALL allow participants to register for events
3. THE System SHALL track entry status and participant information
4. THE System SHALL allow event organizers to manage entry data
5. THE System SHALL prevent unauthorized access to entry information through RLS policies

### Requirement 4

**User Story:** As an event organizer, I want to record accurate timing data, so that I can provide official results for participants.

#### Acceptance Criteria

1. THE System SHALL provide precise timing measurement capabilities
2. THE System SHALL store timing results associated with specific events and participants
3. THE System SHALL allow authorized staff to input and modify timing data
4. THE System SHALL generate result reports from timing data
5. THE System SHALL maintain timing data integrity and accuracy

### Requirement 5

**User Story:** As a participant, I want to view and purchase event photos, so that I can obtain memories of my participation.

#### Acceptance Criteria

1. THE System SHALL provide photo viewing functionality for event participants
2. THE System SHALL allow participants to purchase photos
3. THE System SHALL associate photos with specific events and participants
4. THE System SHALL handle photo payment processing
5. THE System SHALL deliver purchased photos to participants

### Requirement 6

**User Story:** As an organization, I want to operate subscription-based communities, so that I can build ongoing relationships with participants.

#### Acceptance Criteria

1. THE System SHALL provide community creation and management functionality
2. THE System SHALL support subscription-based community access
3. THE System SHALL allow community content management
4. THE System SHALL handle subscription payments and member management
5. THE System SHALL provide community interaction features

### Requirement 7

**User Story:** As a system administrator, I want to ensure data security through organization-based access control, so that sensitive information is protected.

#### Acceptance Criteria

1. THE System SHALL implement Row Level Security (RLS) policies at the database level
2. THE System SHALL verify organization membership before granting data access using helper functions like is_org_member(org_id)
3. THE System SHALL separate UI components from direct database access
4. THE System SHALL use dedicated API functions for data retrieval
5. THE System SHALL use Server Actions for data modifications

### Requirement 8

**User Story:** As a developer, I want to maintain clean architecture separation, so that the system can be easily maintained and potentially migrated.

#### Acceptance Criteria

1. THE System SHALL separate UI components from database access logic
2. THE System SHALL organize code using feature-based folder structure under src/features/
3. THE System SHALL use dedicated API functions in features/[feature]/api/ for data reading
4. THE System SHALL use Server Actions in features/[feature]/actions/ for data writing
5. THE System SHALL prohibit direct Supabase client calls from UI components (page.tsx, components/)

### Requirement 9

**User Story:** As a developer, I want to use modern web technologies, so that the system is maintainable and performant.

#### Acceptance Criteria

1. THE System SHALL use Next.js 16 with App Router as the framework
2. THE System SHALL use TypeScript for type safety
3. THE System SHALL use Supabase for authentication, database, and realtime functionality
4. THE System SHALL use shadcn/ui with Tailwind CSS for UI components
5. THE System SHALL use pnpm v10 as the package manager

### Requirement 10

**User Story:** As a quality assurance engineer, I want comprehensive testing coverage, so that the system reliability is ensured.

#### Acceptance Criteria

1. THE System SHALL include unit and integration tests using Vitest for all API functions and Server Actions
2. THE System SHALL include E2E tests using Playwright for critical user journeys
3. THE System SHALL test signup/login flows, organization management, and event management
4. THE System SHALL prioritize logic testing over UI component testing
5. THE System SHALL focus on integration tests rather than snapshot tests
