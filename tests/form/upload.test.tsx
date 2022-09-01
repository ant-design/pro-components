import ProForm, { ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-form';
import type { UploadFile } from 'antd/es/upload/interface';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import mock from 'xhr-mock';
import { waitForComponentToPaint, waitTime } from '../util';

const mockFile = new File(['foo'], 'foo.png', {
  type: 'image/png',
}) as unknown as UploadFile;

export function setup() {
  mock.setup();
  // @ts-ignore
  mock.post('http://upload.com/', (req, res) => {
    req.headers({
      'content-length': '100',
    });
    req.body('thisisbody');
    return res;
  });
}

export const teardown = mock.teardown.bind(mock);

describe('ProFormUpload', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => setup());
  afterEach(() => {
    teardown();
    errorSpy.mockReset();
  });

  it('🏐 ProFormUploadButton support onChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProForm
        onValuesChange={(_, values) => {
          fn(values.files);
        }}
      >
        <ProFormUploadButton
          action="http://upload.com"
          listType="text"
          label="upload"
          name="files"
        />
      </ProForm>,
    );

    act(() => {
      wrapper.find('.ant-upload input').simulate('change', {
        target: {
          files: [mockFile],
        },
      });
    });
    await waitTime(1000);
    expect(fn).toBeCalled();
  });

  it('🏐 ProFormUploadButton support beforeUpload', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProForm
        onValuesChange={(_, values) => {
          fn(values.files);
        }}
      >
        <ProFormUploadButton
          action="http://upload.com"
          listType="text"
          label="upload"
          name="files"
          fieldProps={{
            beforeUpload: () => {
              return false;
            },
          }}
        />
      </ProForm>,
    );

    act(() => {
      wrapper.find('.ant-upload input').simulate('change', {
        target: {
          files: [mockFile],
        },
      });
    });
    await waitTime(200);

    act(() => {
      expect(wrapper.find('div.ant-upload-list-picture-container').length).toBe(0);
    });
  });

  it('🏐 ProFormUploadButton support disable', async () => {
    const wrapper = mount(
      <ProFormUploadButton
        disabled
        action="http://upload.com"
        listType="text"
        label="upload"
        name="files"
      />,
    );
    expect(wrapper.find('Upload Button').html()).toMatchSnapshot();
    act(() => {
      wrapper.setProps({
        buttonProps: {
          disabled: true,
          type: 'dashed',
        },
      });
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('Upload Button').find('.ant-btn-dashed').exists()).toBeTruthy();
    act(() => {
      wrapper.setProps({
        disabled: false,
        buttonProps: {},
        fieldProps: {
          disabled: true,
        },
      });
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('Upload Button').find('.ant-btn-dashed').exists()).toBeFalsy();
  });

  it('🏐 ProFormUploadDragger support onChange', async () => {
    const fn = jest.fn();
    const onChangeFn = jest.fn();
    const wrapper = mount(
      <ProForm
        onValuesChange={(_, values) => {
          fn(values.files);
        }}
      >
        <ProFormUploadDragger
          onChange={() => onChangeFn()}
          action="http://upload.com"
          label="upload"
          name="files"
        />
      </ProForm>,
    );

    act(() => {
      wrapper.find('.ant-upload input').simulate('change', {
        target: {
          files: [mockFile],
        },
      });
    });
    await waitTime(200);
    expect(fn).toBeCalled();
    expect(onChangeFn).toBeCalled();
  });

  it('🏐 ProFormUploadDragger hide when max', async () => {
    const wrapper = mount(
      // @ts-ignore
      <ProFormUploadDragger
        max={2}
        value={[mockFile, mockFile, mockFile]}
        action="http://upload.com"
        label="upload"
        name="files"
      />,
    );

    await waitTime(200);
    expect(wrapper.find('.ant-upload.ant-upload-drag').props().style?.display).toBe('none');
  });

  it('🏐 ProFormUploadDragger support children', async () => {
    const extra = 'extra';
    const wrapper = mount(
      // @ts-ignore
      <ProFormUploadDragger
        value={[mockFile, mockFile, mockFile]}
        action="http://upload.com"
        label="upload"
        name="files"
      >
        {extra}
      </ProFormUploadDragger>,
    );

    await waitTime(200);
    expect(wrapper.find('.ant-upload-drag .ant-upload-extra').first().text()).toBe(extra);
  });

  it('🏐 ProFormUploadButton hide when max', async () => {
    const wrapper = mount(
      // @ts-ignore
      <ProFormUploadButton
        max={2}
        value={[mockFile, mockFile, mockFile]}
        action="http://upload.com"
        label="upload"
        name="files"
      />,
    );

    await waitTime(200);
    expect(wrapper.find('.anticon.anticon-upload').exists()).toBe(false);
  });
});
