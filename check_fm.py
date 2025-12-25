import glob
import os

files = glob.glob('/workspace/site/components/**/*.md', recursive=True)
files = [f for f in files if not f.endswith('/index.md') and not f.endswith('/index.en-US.md')] # Check subfiles if any, though most seem to be index.md in subdirs.

# Wait, the structure is site/components/<component>/index.md
# So I should check site/components/*/*.md

files = glob.glob('/workspace/site/components/*/*.md')

print(f"{'File':<50} | {'Group':<20} | {'Title':<40} | {'Order':<5}")
print("-" * 120)

for filepath in sorted(files):
    if filepath.endswith('.en-US.md'):
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()

    if not content.startswith('---\n'):
        continue

    parts = content.split('---\n', 2)
    if len(parts) < 3:
        continue

    fm = parts[1]
    
    group = ""
    title = ""
    order = ""
    
    for line in fm.split('\n'):
        if line.strip().startswith('group:'):
            group = line.split(':', 1)[1].strip()
        if line.strip().startswith('title:'):
            title = line.split(':', 1)[1].strip()
        if line.strip().startswith('order:'):
            order = line.split(':', 1)[1].strip()
            
    component_name = os.path.basename(os.path.dirname(filepath))
    print(f"{component_name:<50} | {group:<20} | {title:<40} | {order:<5}")
