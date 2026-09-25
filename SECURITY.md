# Security policy

Please report suspected vulnerabilities privately through GitHub Security
Advisories instead of opening a public issue. Include affected commits or
versions, reproduction details, and indicators of compromise when available.

## Repository automation

This repository does not use executable Claude workspace scripts or VS Code
tasks. CI and the npm prepublish check reject these files because editor and
agent automation may execute immediately after checkout.

## Incident response

For a confirmed repository compromise, maintainers must:

1. Remove the malicious content with an auditable revert and preserve evidence.
2. Rotate GitHub, npm, CI, and maintainer credentials that could have been
   exposed, and revoke active sessions and tokens.
3. Audit branch protection, deploy keys, GitHub Apps, workflow runs, npm
   maintainers, provenance, and every release produced during the exposure
   window.
4. Deprecate or unpublish affected packages where npm policy permits, publish a
   clean replacement, and verify its tarball before changing dist-tags.
5. Publish a GitHub Security Advisory describing affected commits, versions,
   indicators of compromise, and remediation steps.
