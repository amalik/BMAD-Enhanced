# Project Classification

- **Project Type:** `developer_tool` *(CSV match; at first principles Convoke is LLM-interpreted content — see `hostFrameworkDependencies` for the real dependency stack)*
- **Domain:** `general` *(CSV match; actual target market is IT consultancy for enterprise brownfield transformations)*
- **Complexity:** `high` *(multi-workstream coordinated breaking release)*
- **Project Context:** `brownfield` *(Convoke 3.2.0 is live on npm; 88 ranked backlog items; ~15 parallel initiatives in flight)*
- **Release Type:** `host_framework_sync` / `distribution_change` *(new release class — first of its kind; will recur on every BMAD major rev)*
- **User Migration Friction:** `unknown_until_validated` *(behavioral equivalence is a testable assumption; validation plan in architecture NFRs)*
- **Host Framework Dependencies:** `claude-code` (LLM runtime) + `bmad-method@6.3.0` (convention framework, target) + `claude-opus-4-6` (model behavior contract)
