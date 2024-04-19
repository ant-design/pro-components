rm -rf results
mkdir results
cloc --exclude-dir=demos --exclude-lang=Markdown ../packages/card/src > results/ProCard.txt
cloc --exclude-dir=demos --exclude-lang=Markdown ../packages/layout/src > results/ProLayout.txt
cloc --exclude-dir=demos --exclude-lang=Markdown ../packages/layout/src/components/PageContainer > results/PageContainer.txt
cloc --exclude-dir=demos --exclude-lang=Markdown ../packages/layout/src/components/WaterMark > results/WaterMark.txt
cloc --exclude-dir=demos --exclude-lang=Markdown ../packages/form/src > results/ProForm.txt
cloc --exclude-dir=demos --exclude-lang=Markdown ../packages/table/src > results/ProTable.txt
cloc --exclude-dir=demos --exclude-lang=Markdown ../packages/list/src > results/ProList.txt
cloc --exclude-dir=demos --exclude-lang=Markdown ../packages/descriptions/src > results/ProDescription.txt
cloc --exclude-dir=demos --exclude-lang=Markdown ../packages/skeleton/src > results/ProSkeleton.txt

