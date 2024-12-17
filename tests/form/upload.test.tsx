import ProForm, {
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-form';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Form } from 'antd';
import type { UploadFile } from 'antd/lib/upload/interface';
import { act } from 'react';
import mock from 'xhr-mock';
import { waitForWaitTime } from '../util';

const mockFile = new File(['foo'], 'foo.png', {
  type: 'image/png',
}) as unknown as UploadFile;
const mockFile1 = new File(['foo1'], 'foo1.png', {
  type: 'image/png',
}) as unknown as UploadFile;
const mockFile2 = new File(['foo2'], 'foo2.png', {
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

afterEach(() => {
  cleanup();
});

describe('ProFormUpload', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => setup());
  afterEach(() => {
    teardown();
    errorSpy.mockReset();
  });

  it('🏐 ProFormUploadButton support onChange', async () => {
    const fn = vi.fn();
    const onChangeFn = vi.fn();
    const wrapper = render(
      <ProForm
        onValuesChange={(_, values) => {
          fn(values.files);
        }}
      >
        <ProFormUploadButton
          action="http://upload.com"
          listType="text"
          onChange={() => onChangeFn()}
          label="upload"
          name="files"
        />
      </ProForm>,
    );

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector<HTMLDivElement>('.ant-upload input')!,
        {
          target: {
            files: [mockFile],
          },
        },
      );
    });
    await waitForWaitTime(1000);
    expect(fn).toBeCalled();
    expect(onChangeFn).toBeCalledTimes(3);
  });

  it('🏐 ProFormUploadButton support beforeUpload', async () => {
    const fn = vi.fn();
    const wrapper = render(
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
      fireEvent.change(
        wrapper.baseElement.querySelector<HTMLDivElement>('.ant-upload input')!,
        {
          target: {
            files: [mockFile],
          },
        },
      );
    });
    await waitForWaitTime(200);

    act(() => {
      expect(
        wrapper.baseElement.querySelectorAll<HTMLDivElement>(
          'div.ant-upload-list-picture-container',
        ).length,
      ).toBe(0);
    });
  });

  it('🏐 ProFormUploadButton support disable', async () => {
    const wrapper = render(
      <Form>
        <ProFormUploadButton
          disabled
          action="http://upload.com"
          listType="text"
          label="upload"
          name="files"
        />
      </Form>,
    );
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>('.ant-upload')
        ?.innerHTML,
    ).toMatchSnapshot();
    act(() => {
      wrapper.rerender(
        <Form>
          <ProFormUploadButton
            disabled
            action="http://upload.com"
            listType="text"
            label="upload"
            name="files"
            buttonProps={{
              disabled: true,
              type: 'dashed',
            }}
          />
        </Form>,
      );
    });
    await waitForWaitTime(100);
    expect(
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-upload')
        ?.querySelector('.ant-btn-dashed'),
    ).toBeTruthy();
    act(() => {
      wrapper.rerender(
        <Form>
          <ProFormUploadButton
            disabled={false}
            action="http://upload.com"
            listType="text"
            label="upload"
            name="files"
            buttonProps={{}}
            fieldProps={{
              disabled: true,
            }}
          />
        </Form>,
      );
    });
    await waitForWaitTime(100);
    expect(
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.ant-upload')
        ?.querySelector('.ant-btn-dashed'),
    ).toBeFalsy();
  });

  it('🏐 ProFormUploadDragger support onChange', async () => {
    const fn = vi.fn();
    const onChangeFn = vi.fn();
    const wrapper = render(
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
      fireEvent.change(
        wrapper.baseElement.querySelector<HTMLDivElement>('.ant-upload input')!,
        {
          target: {
            files: [mockFile],
          },
        },
      );
    });
    await waitForWaitTime(200);
    expect(fn).toBeCalled();
    expect(onChangeFn).toBeCalled();
  });

  it('🏐 ProFormUploadDragger hide when max', async () => {
    const wrapper = render(
      <Form>
        <ProFormUploadDragger
          max={2}
          value={[mockFile, mockFile1, mockFile2]}
          action="http://upload.com"
          label="upload"
          name="files"
        />
      </Form>,
    );

    await waitForWaitTime(200);
    expect(
      getComputedStyle(
        wrapper.baseElement.querySelector<HTMLDivElement>(
          '.ant-upload.ant-upload-drag',
        )!,
      )?.display,
    ).toBe('none');
  });

  it('🏐 ProFormUploadDragger support children', async () => {
    const extra = 'extra';
    const wrapper = render(
      <Form>
        <ProFormUploadDragger
          value={[mockFile, mockFile1, mockFile2]}
          action="http://upload.com"
          label="upload"
          name="files"
        >
          {extra}
        </ProFormUploadDragger>
      </Form>,
    );

    await waitForWaitTime(200);
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>(
        '.ant-upload-drag .ant-upload-extra',
      )?.textContent,
    ).toBe(extra);
  });

  it('🏐 ProFormUploadButton hide when max', async () => {
    const wrapper = render(
      <Form>
        <ProFormUploadButton
          max={2}
          value={[mockFile, mockFile1, mockFile2]}
          action="http://upload.com"
          label="upload"
          name="files"
        />
      </Form>,
    );

    await waitForWaitTime(200);
    expect(
      wrapper.baseElement.querySelector<HTMLDivElement>(
        '.anticon.anticon-upload',
      ),
    ).toBeFalsy();
  });
});
