import { ProForm, ProFormTreeSelect } from '@ant-design/pro-components';
import { useState } from 'react';

const treeData = [
  {
    title: 'Node1',
    treeValue: '0-0',
    children: [
      {
        title: 'Child Node1',
        treeValue: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    treeValue: '0-1',
    children: [
      {
        title: 'Child Node3',
        treeValue: '0-1-0',
      },
      {
        title: 'Child Node4',
        treeValue: '0-1-1',
      },
      {
        title: 'Child Node5',
        treeValue: '0-1-2',
      },
    ],
  },
];

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectOpen, setSelectOpen] = useState(false);

  function onBlur() {
    setSelectOpen(false);
  }

  function onFocus() {
    setSelectOpen(true);
  }

  /** 点击常用关键字的字母 */
  function onClick(e: any) {
    const text = e.target as HTMLSpanElement;
    // 更改搜索框文字
    setSearchValue(text.innerText);
    onFocus();
  }

  /** 下拉搜索 */
  function onSearch(value: string) {
    setSearchValue(value);
  }

  return (
    <div>
      <ProForm
        initialValues={{
          name: ['0-0'],
        }}
        onFinish={async (e) => console.log(e)}
      >
        <ProFormTreeSelect
          name="name"
          placeholder="请输入搜索关键字"
          allowClear
          width={330}
          label="TreeSelect异步加载"
          secondary
          request={async () => {
            await waitTime(1000);
            return treeData;
          }}
          fieldProps={{
            showArrow: false,
            filterTreeNode: true,
            showSearch: true, // 使单选模式可搜索
            popupMatchSelectWidth: false,
            searchValue,
            labelInValue: true,
            autoClearSearchValue: true,
            open: selectOpen,
            multiple: true,
            treeNodeFilterProp: 'title',
            fieldNames: {
              label: 'title',
              value: 'treeValue',
            },
            onBlur: () => onBlur(),
            onFocus: () => onFocus(),
            onSearch: (val) => onSearch(val),
          }}
        />
        <ProFormTreeSelect
          name="name2"
          initialValue={['0-0', '0-1']}
          label="TreeSelect treeData"
          placeholder="请输入搜索关键字"
          allowClear
          width={330}
          secondary
          fieldProps={{
            treeData,
            showArrow: false,
            filterTreeNode: true,
            showSearch: true, // 使单选模式可搜索
            popupMatchSelectWidth: false,
            labelInValue: true,
            autoClearSearchValue: true,
            multiple: true,
            treeNodeFilterProp: 'title',
            fieldNames: {
              label: 'title',
              value: 'treeValue',
            },
          }}
        />
        <div className="keys">
          <b>常用关键字：</b>
          {['l', 'c', 'a'].map((item) => {
            return (
              <span
                key={item}
                onClick={onClick}
                style={{
                  marginInlineStart: 8,
                  cursor: 'pointer',
                }}
              >
                {item}
              </span>
            );
          })}
        </div>
      </ProForm>
    </div>
  );
}
