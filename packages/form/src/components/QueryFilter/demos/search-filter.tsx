import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormDatePicker,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import { Input, Tabs } from 'antd';
import React, { useState } from 'react';

type AdvancedSearchProps = {
  onFilterChange?: (allValues: any) => void;
  onSearch?: (text: string) => void;
  onTypeChange?: (type: string) => void;
  defaultType?: string;
};

const AdvancedSearch: React.FC<AdvancedSearchProps> = (props) => {
  const {
    onSearch,
    onTypeChange,
    defaultType = 'articles',
    onFilterChange,
  } = props;
  const [searchText, setSearchText] = useState<string>();
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const quickSearch = ['小程序开发', '入驻', 'ISV 权限'];
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onSearch={onSearch}
          style={{ maxWidth: 522, width: '100%' }}
        />
        <div
          style={{
            display: 'flex',
            gap: 12,
          }}
        >
          {quickSearch.map((text) => (
            <a
              key={text}
              onClick={() => {
                setSearchText(text);
                if (onSearch) {
                  onSearch(text);
                }
              }}
            >
              {text}
            </a>
          ))}
        </div>
      </div>

      <Tabs
        defaultActiveKey={defaultType}
        onChange={onTypeChange}
        tabBarExtraContent={
          <a
            style={{
              display: 'flex',
              gap: 4,
            }}
            onClick={() => {
              setShowFilter(!showFilter);
            }}
          >
            高级筛选 {showFilter ? <UpOutlined /> : <DownOutlined />}
          </a>
        }
        items={[
          {
            key: 'articles',
            label: '文章',
          },
          {
            key: 'projects',
            label: '项目',
          },
          {
            key: 'applications',
            label: '应用',
          },
        ]}
      />

      {showFilter ? (
        <QueryFilter
          submitter={false}
          span={24}
          labelWidth="auto"
          split
          onChange={onFilterChange}
        >
          <ProForm.Group title="姓名">
            <ProFormText name="name" />
          </ProForm.Group>
          <ProForm.Group title="详情">
            <ProFormText name="age" label="年龄" />
            <ProFormDatePicker name="birth" label="生日" />
          </ProForm.Group>
        </QueryFilter>
      ) : null}
    </div>
  );
};

export default AdvancedSearch;
