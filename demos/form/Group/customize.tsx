import {
  CopyOutlined,
  DeleteOutlined,
  HeartOutlined,
  HomeOutlined,
  PlusOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormField,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@xxlabs/pro-components';
import { useState } from 'react';

const IconMap = {
  PlusOutlined,
  HeartOutlined,
  DeleteOutlined,
  CopyOutlined,
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
};
const initialValue = {
  copyIconProps: {
    show: true,
    Icon: 'CopyOutlined',
    tooltipText: '复制此项',
  },
  deleteIconProps: {
    show: true,
    Icon: 'DeleteOutlined',
    tooltipText: '删除此项',
  },
  creatorButtonProps: {
    show: true,
    creatorButtonText: '新建一行',
    position: 'button',
    type: 'dashed',
    icon: 'PlusOutlined',
  },
};
const Demo = () => {
  const [stateValue, setStateValue] = useState({});
  const [json, setJson] = useState(() => JSON.stringify(initialValue));
  return (
    <ProCard headerBordered split="vertical" variant="outlined">
      <ProCard colSpan="calc(100% - 400px)">
        <ProForm>
          <ProFormList
            creatorButtonProps={{
              position: 'bottom',
            }}
            initialValue={[
              {
                name: '1111',
              },
            ]}
            label="用户信息"
            name="users"
            {...stateValue}
          >
            <ProForm.Group key="group" size={8}>
              <ProFormText label="姓名" name="name" />
              <ProFormText label="姓名" name="nickName" />
            </ProForm.Group>
          </ProFormList>
        </ProForm>
      </ProCard>
      <ProCard colSpan="400px" title="配置菜单">
        <ProForm
          initialValues={initialValue}
          submitter={false}
          onValuesChange={(_, values) => {
            if (values?.creatorButtonProps?.show === false) {
              values.creatorButtonProps = false;
            }

            if (values?.copyIconProps?.show === false) {
              values.copyIconProps = false;
            }
            if (values?.deleteIconProps?.show === false) {
              values.deleteIconProps = false;
            }

            delete values.creatorButtonProps.show;
            delete values.deleteIconProps.show;
            delete values.creatorButtonProps.show;

            setJson(JSON.stringify(values));

            if (values?.copyIconProps?.Icon) {
              values.copyIconProps.Icon = IconMap[values?.copyIconProps?.Icon as 'PlusOutlined'];
            }

            if (values?.deleteIconProps?.Icon) {
              values.deleteIconProps.Icon = IconMap[values?.deleteIconProps?.Icon as 'PlusOutlined'];
            }
            if (values?.creatorButtonProps?.icon) {
              const Icon = IconMap[values?.creatorButtonProps?.icon as 'PlusOutlined'];
              values.creatorButtonProps.icon = <Icon />;
            }
            setStateValue(values);
          }}
        >
          <ProForm.Group
            extra={
              <ProFormSwitch
                noStyle
                fieldProps={{
                  size: 'small',
                }}
                name={['creatorButtonProps', 'show']}
              />
            }
            title="新建按钮配置"
          >
            <ProFormDependency name={['creatorButtonProps']}>
              {({ creatorButtonProps }) => {
                if (!creatorButtonProps.show) {
                  return null;
                }
                return (
                  <ProForm.Group size={8}>
                    <ProFormText label="按钮文字" name={['creatorButtonProps', 'creatorButtonText']} width="sm" />
                    <ProFormSelect
                      label="图标"
                      name={['creatorButtonProps', 'icon']}
                      request={async () => {
                        return Object.keys(IconMap).map((value) => {
                          const Icon = IconMap[value as 'PlusOutlined'];
                          return {
                            label: <Icon />,
                            value,
                          };
                        });
                      }}
                      width="xs"
                    />
                    <ProFormSelect
                      label="按钮位置"
                      name={['creatorButtonProps', 'position']}
                      request={async () => {
                        return ['bottom', 'top'].map((value) => {
                          return {
                            label: value,
                            value,
                          };
                        });
                      }}
                      width="xs"
                    />
                    <ProFormSelect
                      label="按钮类型"
                      name={['creatorButtonProps', 'type']}
                      request={async () => {
                        return ['default', 'primary', 'ghost', 'dashed', 'link', 'text'].map((value) => {
                          return {
                            label: value,
                            value,
                          };
                        });
                      }}
                      width="xs"
                    />
                  </ProForm.Group>
                );
              }}
            </ProFormDependency>
          </ProForm.Group>

          <ProForm.Group
            extra={
              <ProFormSwitch
                noStyle
                fieldProps={{
                  size: 'small',
                }}
                name={['copyIconProps', 'show']}
              />
            }
            title="复制按钮配置"
          >
            <ProFormDependency name={['copyIconProps']}>
              {({ copyIconProps }) => {
                if (!copyIconProps.show) {
                  return null;
                }
                return (
                  <ProForm.Group size={8}>
                    <ProFormText label=" tooltip 提示文字" name={['copyIconProps', 'tooltipText']} width="sm" />
                    <ProFormSelect
                      label="图标"
                      name={['copyIconProps', 'Icon']}
                      request={async () => {
                        return Object.keys(IconMap).map((value) => {
                          const Icon = IconMap[value as 'PlusOutlined'];
                          return {
                            label: <Icon />,
                            value,
                          };
                        });
                      }}
                      width="xs"
                    />
                  </ProForm.Group>
                );
              }}
            </ProFormDependency>
          </ProForm.Group>
          <ProForm.Group
            extra={
              <ProFormSwitch
                noStyle
                fieldProps={{
                  size: 'small',
                }}
                name={['deleteIconProps', 'show']}
              />
            }
            title="删除按钮配置"
          >
            <ProFormDependency name={['deleteIconProps']}>
              {({ deleteIconProps }) => {
                if (!deleteIconProps.show) {
                  return null;
                }
                return (
                  <ProForm.Group size={8}>
                    <ProFormText label=" tooltip 提示文字" name={['deleteIconProps', 'tooltipText']} width="sm" />
                    <ProFormSelect
                      label="图标"
                      name={['deleteIconProps', 'Icon']}
                      request={async () => {
                        return Object.keys(IconMap).map((value) => {
                          const Icon = IconMap[value as 'PlusOutlined'];
                          return {
                            label: <Icon />,
                            value,
                          };
                        });
                      }}
                      width="xs"
                    />
                  </ProForm.Group>
                );
              }}
            </ProFormDependency>
          </ProForm.Group>
          <ProFormField ignoreFormItem mode="read" text={json} valueType="jsonCode" />
        </ProForm>
      </ProCard>
    </ProCard>
  );
};

export default Demo;
