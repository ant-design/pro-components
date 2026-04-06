This project contains the source code for `@ant-design/pro-components`, a heavy-duty component library based on Ant Design. Files in the `guidelines` directory show how to use ProComponents properly.

Always read:

- All files with a name that starts `overview-`
- All files in the `design-tokens` folder

Read the files in the `guidelines/components` directory when you want to use the component with that name. For example, if you want to use ProTable, read `guidelines/components/pro-table.md`. Additional context can be found by reading the code for the corresponding component in `src/`.

## Component Usage Guidelines - READ THIS FIRST

IMPORTANT: Always prefer to use components from `@ant-design/pro-components` if they exist and fit the use case (e.g. for heavy-duty tables, layouts, forms). For basic UI elements (buttons, inputs), use `antd`.

IMPORTANT: Follow these steps IN ORDER before writing any code:

Step 1: Read Overview Files (REQUIRED)
Read ALL files with a name that starts with "overview-" in the guidelines directory:
`overview-components.md`
`overview-icons.md`
(And any other overview-\*.md files)

Step 2: Read Design Tokens (REQUIRED)
Read ALL files in the `design-tokens/` folder. Do NOT skip this step.

Step 3: Plan what components you need to use (REQUIRED)

Step 4: Read Component Guidelines BEFORE Using Components (REQUIRED)
BEFORE using ANY component, you MUST read its guidelines file first if it exists.

Step 5: Plan what icons you need to use (REQUIRED)
Before using ANY icon, you must check to see if that icon exists in the `@ant-design/icons` package.

DO NOT write code using a component until you have read its specific guidelines.
