# Consolidation tasks: javari-legal-docs → javari-legal
## Source archived: June 2026

### Features to implement in javari-legal:

#### Admin panel
- [ ] Analytics dashboard (usage, popular docs, user stats)
- [ ] Document archive with recall functionality
- [ ] Organization management (create, update, delete orgs)
- [ ] Team management within organizations
- [ ] Document workflow: approval/rejection flow for enterprise docs

#### Document versioning
- [ ] API: GET /api/documents/[id]/versions
- [ ] Version history UI component
- [ ] Diff viewer for document versions

#### Database schema to migrate (from database-schema.sql)
- [ ] user_profiles table (credits, subscription_tier, stripe fields)
- [ ] legal_documents table with full field set
- [ ] document_versions table
- [ ] organizations table
- [ ] teams table
- [ ] approval_workflows table

#### Additional APIs
- [ ] POST /api/approvals/[id]/approve
- [ ] POST /api/approvals/[id]/reject
- [ ] POST /api/archive/[id]/recall
- [ ] GET/POST /api/reports/analytics
- [ ] PDF/DOCX conversion: POST /api/convert

#### Legal document template library (200+ templates)
- [ ] NDA templates (mutual, one-way)
- [ ] LLC operating agreements
- [ ] Lease agreements (residential, commercial)
- [ ] Employment contracts
- [ ] Service agreements
- [ ] (Full list in archived javari-legal-docs repo)

#### Source reference: https://github.com/CR-AudioViz-AI/javari-legal-docs (archived)
