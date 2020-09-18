import React from 'react';
import ProForm, { ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-form';
import { mount } from 'enzyme';
import mock from 'xhr-mock';
import { act } from 'react-dom/test-utils';
import { waitTime } from '../util';

const mockFile = new File(['foo'], 'foo.png', {
  type: 'image/png',
});

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
  beforeEach(() => setup());
  afterEach(() => teardown());

  it('ProFormUploadButton support onChange', async () => {
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
      wrapper.find('input').simulate('change', {
        target: {
          files: [mockFile],
        },
      });
    });
    await waitTime(200);
    expect(fn).toBeCalled();
  });

  it('ProFormUploadDragger support onChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProForm
        onValuesChange={(_, values) => {
          fn(values.files);
        }}
      >
        <ProFormUploadDragger action="http://upload.com" label="upload" name="files" />
      </ProForm>,
    );

    act(() => {
      wrapper.find('input').simulate('change', {
        target: {
          files: [mockFile],
        },
      });
    });
    await waitTime(200);
    expect(fn).toBeCalled();
  });

  it('ProFormUploadDragger hide when max', async () => {
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

  it('ProFormUploadButton hide when max', async () => {
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
