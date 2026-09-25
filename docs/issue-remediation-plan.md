# Open issue remediation plan

Snapshot date: 2026-09-25

After the resolved/stale cleanup, the repository had 348 open issues. Of these,
300 had no labels, 305 were created more than one year ago, 105 had no
comments, only 6 had been updated in the preceding 90 days, and only 2 in the
preceding 30 days. Title matching (categories overlap) found 154 Form, 142
Table, 61 Field, 40 EditableTable, 48 build/type/dependency, and 34 Layout
reports. The remaining backlog therefore needs reproduction and consolidation
before implementation, not another age-only closing pass.

The labeling pass assigned component and disposition labels to all 300
previously unlabeled issues. It also closed 17 issues labeled
`Need to reproduce` that had already been inactive for more than one year.
After closing five confirmed duplicates, there are now 326 open issues and zero
completely unlabeled issues. GitHub
updates an issue's `updatedAt` timestamp when labels change, so the activity
figures above are preserved as the pre-label baseline.

## Remaining 348: execution plan

### Phase 0: restore triage signal (completed)

1. Apply one primary component label to all 300 unlabeled issues: `form`,
   `table`, `editable`, `field`, `layout`, `build`, `docs`, or `question`.
2. Apply one disposition label: `confirmed`, `needs-reproduction`,
   `upstream-antd`, `duplicate`, or `roadmap`.
3. Keep a maximum of one canonical issue per exact symptom. Link and close
   duplicates only after copying any distinct reproduction details.
4. Require current `3.x + antd 6` reproduction details for implementation.
   Reports against v2/antd 5 remain useful as regression hypotheses but are not
   automatically accepted as current defects.

The 300-item unlabeled queue is complete. A follow-up normalization pass is
still needed for 48 issues that already had legacy labels: 42 lack a component
label and 6 lack a disposition label.

### Phase 1: correctness and page-freeze bugs (week 1)

Work in this order, one issue and one regression test per commit:

| Track                         | Issues                     | Acceptance criteria                                                                                                                                                                                                                  |
| ----------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Infinite rendering            | #9676 (`525291722`)        | Fixed: spreading `formItemRender` config into `ProFormSelect` no longer recursively passes the wrapper back into itself. The exact reproduction and the complete SchemaForm/search suites pass.                                      |
| Editable row loss/cache reuse | #9092, #9051, #8951        | Cancel never deletes an existing form-backed row; delete then add never restores the deleted snapshot; multi-row cancellation is order-independent. First rerun these against fixes for #8664/#9203 because they may now be covered. |
| Validation correctness        | #8085, #8348, #9166, #9553 | Row save validates only its row; error state is visible; LightFilter validation still submits; virtualized off-screen data has an explicitly supported validation path.                                                              |
| Numeric output correctness    | #9549                      | `valueType: { type: 'percent', precision: 8 }` preserves eight-digit precision and has read/edit coverage.                                                                                                                           |

Do not combine these into one large EditableTable patch. The data-loss cases
must be independently revertable.

### Phase 2: current 3.x regressions and compatibility (week 2)

- #9649: reproduce LightFilter `collapse` focus/popup dismissal and test text,
  select, and date fields.
- #9292 and #9222: compare SearchSelect behavior with native antd 6 Select,
  then document which layer owns `searchValue`, filtering, and blur behavior.
- #8473/#8743/#9407: run one light/dark token matrix with hashed styles on and
  off before modifying Layout theme code.
- #9243/#9053/#9645: test only supported package entry points and TypeScript
  versions; separate broken declarations from mixed v2/v3 dependency trees.
- #9629: make an explicit maintainer decision to deprecate or republish the old
  standalone sub-packages. The monolithic v3 manifest cannot repair already
  published v2 peer ranges.
- #9684/#9632: treat documentation-site regressions as a separate deployable
  batch so product releases are not blocked by site styling.

### Phase 3: EditableTable performance and virtualization (week 3)

Canonical performance issue: keep #9264 and fold #9263, #9271, #9275, and
#9612 into it after preserving their distinct scenarios. Keep #9424 and #9553
as correctness constraints, not performance duplicates.

Confirmed duplicate cleanup completed after triage: #8997 → #8946, #9263 →
#9264, #9110/#9615 → #9044, and #9319 → #9321. The duplicate issues carry
the repository's duplicate label and link to their canonical issue.

Build a benchmark before changing render paths:

| Scenario                   | Sizes           | Measurements                                            | Target                                              |
| -------------------------- | --------------- | ------------------------------------------------------- | --------------------------------------------------- |
| Controlled EditableTable   | 20/100/200 rows | keystroke-to-paint, commits, heap                       | p95 under 100 ms at 100 rows                        |
| EditableTable in Form.Item | 20/100/200 rows | parent/table/row render counts                          | changed row only where possible                     |
| Multiple-row editing       | 20/100 rows     | validation and cancellation time                        | linear growth, no row loss                          |
| Virtual table              | 200/1000 rows   | focus navigation, header alignment, validation coverage | no alignment drift; documented validation semantics |

Profile field registration, form-wide subscriptions, `onValuesChange`, and
column recreation separately. Do not trade away validation or data integrity
to hit the latency target.

### Phase 4: product behavior and documentation (week 4)

- Merge #9683 for #9679 after rebasing and add a focused test for custom
  `loadingContent` plus the default Spin fallback.
- Resolve #9319/#9321 through one documented local-vs-remote sorting contract.
- Answer and close roadmap/how-to reports such as #9555, #9279, #9433, #9565,
  #9569, and #9583 rather than routing them through code changes.
- Review enhancements (#9643, #9682, #9664) against API surface and maintenance
  cost; accepted features need an owner and milestone, otherwise close with a
  concrete alternative.

### Release gates

Each implementation batch must pass focused tests, `pnpm run tsc`, repository
safety checks, and the relevant complete component suite. Before a release,
also run the full suite and declaration build. Close fixed issues only after the
fix is present in a published version, with the release number in the closing
comment.

## P0: security and data integrity

| Issue       | Status                                                                       | Required action                                                                                                    |
| ----------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| #9704       | Repository content reverted; npm tarball checked; guard added in `bf34225fb` | Organization owners must rotate credentials, audit sessions/apps/releases, and publish a GitHub Security Advisory. |
| #9703       | Fixed in `79ff92327`                                                         | Release and close after the remount regression is green in CI.                                                     |
| #8352       | Fixed in `8489d6a5d`                                                         | Release with #9703; verify external Form instances in Modal and Drawer.                                            |
| #8675/#8664 | Fixed in `9d9f5a1cf`                                                         | Close the duplicate after release.                                                                                 |
| #6572       | Covered in `3821e54c3`                                                       | Close if the current 3.x reproduction remains green.                                                               |
| #6966/#9280 | Fixed or covered in `8198de2de` and `8bffd5a3f`                              | Release as one validation batch, but keep separate changelog entries.                                              |

## P1: current compatibility regressions

The following fixes are ready as independent, revertable commits:

- #9699: `df9413a16`
- #9680: `f9b4b3ea8`
- #9675: `f3d98d3ba`
- #9695/#9677: `69b4af11a`
- #9697: `ab90ec5b1`
- #9698: `b91365c17`
- #9017: `7e7e97e7d`

#9629 refers to the retired independently published sub-packages. The current
3.x package is monolithic and declares `antd: ^6.0.0`; the old packages still
have antd 5 peer ranges on npm. Resolve this as a release/deprecation decision,
not by adding manifests that the current repository no longer publishes.

#8830 is an old dependency-chain warning. Current source and installed
dependencies contain no `findDOMNode` call. Ask for a current 3.x + antd 6
reproduction, then close after 30 days if none is supplied.

## P1: EditableTable data correctness

Completed:

- #8472: `92533055a`
- #6992: `575694960`
- #5942: `93f2d3877`
- #9203: `09299c8b7`
- #9318/#9474: already fixed upstream by #9356; its 12 cancellation tests pass.

Next work:

1. Reproduce #8583 against the current `@dnd-kit` implementation. Verify
   pointer cancellation outside the table before changing auto-scroll.
2. Treat #9424 as a browser/antd virtual-table integration issue and obtain a
   current antd 6 reproduction.
3. Document #9553 as a virtualization constraint: unmounted fields cannot be
   validated by Form. Offer pagination or application-level schema validation.
4. Build a repeatable 20/100/200-row benchmark before changing render paths for
   #9271/#9275/#9264/#9612. Record keystroke-to-commit latency, render count,
   and memory; the acceptance target is under 100 ms at 100 rows.

## P1: Form value conversion

The shared conversion path now has coverage or fixes for #5803, #5873, #8452,
#9179, #9285, #9663, and #9703 in commits `672df62f0`, `eeba5997b`,
`386494502`, `5c3f9f4ae`, `722faeeae`, `113c7c190`, and `79ff92327`.

Before release, run the matrix for a normal field, FormList, and nested
FormList, each with transform, convertValue, dateFormatter, and
get/validateFieldsFormatValue.

## P2: ProTable state and requests

Completed or classified:

- #7197: regression coverage in `52a256902`.
- #7423: expected double request when consumers call their API in
  `pagination.onChange` as well as supplying `request`; document that
  `onChange` should only synchronize controlled pagination.
- #8649: fixed in `97c6ab3e5`.
- #9143: fixed upstream by #9216/#9306; all 13 sorter tests pass.
- #9193: usage issue; search-form values are in `params`, not `filter`.
- #9227: fixed in `e24302c9e`.
- #9236: fixed in `9c4d3aa75`.
- #9613: fixed in `6a49c5acd`; switching query/light remounts the form and
  removes the previous toolbar node.
- #9319/#9321: one documentation/design issue for mixing remote request data
  with local sorting and filtering.
- #9687/#9688: fixed in `982cb7ad5`; close #9688 as duplicate.

## Layout

- #9697 and #9698 are fixed as listed above.
- #8095 is fixed in `d3f1c5033`; collapsed sider popups now consume the
  documented `colorBgMenuItemCollapsedElevated` token.
- #7312 is fixed locally; mobile layouts no longer render a collapse trigger
  when an empty menu suppresses the sider.
- #7670 was fixed upstream by `8f08d3d809`; ProLayout deletes only its own SWR
  cache key on unmount instead of clearing the shared cache.
- #8691 and likely #9188 are covered by merged theme refresh fix #9538.
- #9308 is reporter-confirmed resolved and can be closed.
- #9188, #9291, #9311, and #9646 need standalone current-version
  reproductions before code changes.
- #7493, #9164, and #9279 are documentation/how-to requests.

## Additional recent reports

- #9545 is already fixed by merged PR #9493 and has direct `classNames` test
  coverage; close after pointing the reporter to a release containing it.
- #9348 is a duplicate dependency-tree installation caused by consumers that
  install both v2 sub-packages and the monolithic v3 package. Route it to the
  depending package (reported as `@umijs/plugins`) and document `npm ls`/pnpm
  inspection; do not use forced overrides without compatibility testing.
- #9555 is a release-roadmap question and needs a maintainer answer, not a code
  change.
- #9292 needs comparison against the native antd Select behavior before any
  ProFormSelect-specific blur handling is added.

## Oldest backlog sample (2020–2023)

- #5497 was fixed by the existing disabled-column handling: bulk select and
  deselect preserve `columnsState[*].disable`, and the tree disables that
  checkbox. Add a direct regression assertion before closing if maintainers
  want issue-linked coverage.
- #6848 is a ProComponents 2.4.2 + antd 5 nested FormList/preserve report with
  only an old external sandbox. It is data correctness related, so request a
  self-contained current-version reproduction rather than auto-closing it.
- #7312 is fixed in `9edb8ace5`.
- #7670 was already fixed upstream by `8f08d3d809` and can be closed with that
  commit reference.
- #6336 (antd 5 theme customization) and #6432 (use antd Watermark) have been
  overtaken by the current antd 6/token implementation and should be closed as
  completed or obsolete after a documentation link is supplied.

## Backlog policy

1. Never auto-close security, data-loss, or current official-demo regressions.
2. Add `needs-reproduction` to old reports that only contain dead sandboxes or
   lack versions and steps.
3. Ask for reproduction on current 3.x + antd 6. Close after 30 days without a
   response, with an explicit invitation to reopen with a new reproduction.
4. Consolidate exact duplicates before implementation: #9688 into #9687,
   #9263 into #9264, #8441 into #8437, #8898 into #8897, and
   #9615/#9110/#9044 into the best ProForm `help` reproduction.
5. Convert #50 into a CI bundle-budget task and #6370 into the documentation
   roadmap rather than leaving them as ordinary bug reports.
