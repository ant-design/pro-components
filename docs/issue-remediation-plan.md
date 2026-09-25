# Open issue remediation plan

Snapshot date: 2026-09-25

The repository currently has 779 open issues. Of those, 396 have not been
updated for more than two years and 672 have no labels. A title-based first
pass groups 246 under Form, 209 under Table, 100 under EditableTable, and 79
under Layout. This backlog must be triaged in batches rather than by age alone.

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
