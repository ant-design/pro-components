import { mount } from 'enzyme';
import React from 'react';
import { ListToolBar } from '@ant-design/pro-table';
import { SettingOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

describe('Table valueEnum', () => {
  it('ListToolBar onAction', () => {
    const onAction = jest.fn();
    const wrapper = mount(
      <ListToolBar
        actions={[
          <Button>批量导入</Button>,
          <Button
            type="primary"
            onClick={() => {
              onAction('add');
            }}
          >
            添加
          </Button>,
        ]}
      />,
    );
    wrapper.find('button.ant-btn-primary').simulate('click');
    expect(onAction).toHaveBeenLastCalledWith('add');
  });

  it('ListToolBar onSettingClick', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <ListToolBar
        settings={[
          {
            icon: <SettingOutlined />,
            tooltip: '设置',
            onClick,
            key: 's-value',
          },
          {
            icon: <FullscreenOutlined />,
          },
          // 测试空的情况
          null,
        ]}
      />,
    );
    wrapper.find('.anticon-setting').simulate('click');
    expect(onClick).toHaveBeenLastCalledWith('s-value');
    expect(wrapper.find('.ant-divider').length).toEqual(0);
  });

  it('ListToolBar search left', () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <ListToolBar
        search={{
          placeholder: '自定义 placeholder',
          onSearch,
        }}
      />,
    );
    const inputEle = wrapper.find('input');
    inputEle.simulate('focus');
    inputEle.simulate('change', { target: { value: 'input 值' } });
    inputEle.simulate('keyDown', { keyCode: 13 });
    expect(wrapper.find('.ant-pro-table-list-toolbar-left input').prop('value')).toEqual(
      'input 值',
    );
    expect(onSearch).toHaveBeenCalled();
    expect(wrapper.find('input').prop('placeholder')).toEqual('自定义 placeholder');
  });

  it('ListToolBar search right and custom input search', () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <ListToolBar
        title="I am title"
        search={<Input.Search placeholder="自定义 placeholder" onSearch={onSearch} />}
      />,
    );
    const inputEle = wrapper.find('input');
    inputEle.simulate('focus');
    inputEle.simulate('change', { target: { value: 'input 值' } });
    inputEle.simulate('keyDown', { keyCode: 13 });
    expect(wrapper.find('.ant-pro-table-list-toolbar-right input').prop('value')).toEqual(
      'input 值',
    );
    expect(onSearch).toHaveBeenCalled();
    expect(wrapper.find('input').prop('placeholder')).toEqual('自定义 placeholder');
  });

  it('ListToolBar menu', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <ListToolBar
        menu={{
          type: 'dropdown',
          items: [
            {
              label: '全部事项',
              key: 'all',
            },
            {
              label: '已办事项',
              key: 'done',
            },
          ],
          onChange,
        }}
      />,
    );
    wrapper.find('.ant-pro-table-list-toolbar-dropdownmenu-label').simulate('click');
    wrapper.find('.ant-dropdown-menu-item').at(1).simulate('click');

    expect(onChange).toHaveBeenCalledWith('done', undefined);
  });

  it('ListToolBar inline menu', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <ListToolBar
        menu={{
          type: 'inline',
          items: [
            {
              label: '全部事项',
              key: 'all',
            },
            {
              label: '已办事项',
              key: 'done',
            },
          ],
          onChange,
        }}
      />,
    );
    wrapper.find('.ant-pro-table-list-toolbar-inlinemenu-item').at(1).simulate('click');
    expect(onChange).toHaveBeenCalledWith('done', undefined);
  });

  it('ListToolBar render no menu with item empty', () => {
    const wrapper = mount(
      <ListToolBar
        menu={{
          type: 'inline',
          items: [],
        }}
      />,
    );
    expect(wrapper.find('.ant-pro-table-list-toolbar-menu').length).toBe(0);
  });
});
