import {
  DrawerForm,
  ModalForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { Button } from 'antd';
import React, { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

/**
 * End-to-end style user journey for ModalForm / DrawerForm:
 * open the dialog from a trigger, fill required fields (with a validation
 * failure first), submit successfully, and assert the dialog closes and the
 * server receives the transformed values.
 */
describe('ModalForm journey (e2e)', () => {
  it('open -> validation error -> fill -> submit -> close', async () => {
    const onFinish = vi.fn(async () => true);
    const onOpenChange = vi.fn();
    const html = render(
      <ModalForm
        title="New User"
        trigger={<Button>新建</Button>}
        onFinish={onFinish}
        onOpenChange={onOpenChange}
      >
        <ProFormText
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter name' }]}
        />
        <ProFormSelect
          name="role"
          label="Role"
          request={async () => [
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
          ]}
        />
      </ModalForm>,
    );

    // Step 1: user opens the modal
    await act(async () => {
      html.getByText('新 建').click();
    });
    await waitFor(() => {
      expect(html.getByText('New User')).toBeTruthy();
    });

    // Step 2: submit with empty name -> validation error keeps modal open
    await act(async () => {
      html.getByText('确 认').click();
    });
    await waitFor(() => {
      expect(html.getByText('Please enter name')).toBeTruthy();
    });
    expect(onFinish).not.toHaveBeenCalled();

    // Step 3: user fills the name and picks a role
    const nameInput = document.querySelector<HTMLInputElement>('#name')!;
    fireEvent.change(nameInput, { target: { value: 'Alex' } });

    await act(async () => {
      fireEvent.mouseDown(
        document.querySelector('#role')!.closest('.ant-select')!,
      );
    });
    await waitFor(() => {
      expect(html.getByText('Admin')).toBeTruthy();
    });
    await act(async () => {
      html.getByText('Admin').click();
    });

    // Step 4: submit succeeds -> values delivered, modal closed
    await act(async () => {
      html.getByText('确 认').click();
    });
    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({ name: 'Alex', role: 'admin' });
    });
    // authoritative close signal
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });
});

describe('DrawerForm journey (e2e)', () => {
  it('open -> fill -> submit(false) keeps drawer -> submit(true) closes', async () => {
    let shouldClose = false;
    const onFinish = vi.fn(async () => {
      return shouldClose;
    });
    const onOpenChange = vi.fn();
    const html = render(
      <DrawerForm
        title="Edit Profile"
        trigger={<Button>编辑</Button>}
        onFinish={onFinish}
        onOpenChange={onOpenChange}
      >
        <ProFormText name="nickname" label="Nickname" />
      </DrawerForm>,
    );

    // Step 1: open the drawer
    await act(async () => {
      html.getByText('编 辑').click();
    });
    await waitFor(() => {
      expect(html.getByText('Edit Profile')).toBeTruthy();
    });

    // Step 2: fill and submit; the first attempt fails server-side
    const input = document.querySelector<HTMLInputElement>('#nickname')!;
    fireEvent.change(input, { target: { value: 'Qixian' } });
    await act(async () => {
      html.getByText('确 认').click();
    });
    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledTimes(1);
      expect(onFinish).toHaveBeenCalledWith({ nickname: 'Qixian' });
    });
    // Drawer stays open because onFinish returned false
    await waitFor(() => {
      expect(html.getByText('Edit Profile')).toBeTruthy();
    });

    // Step 3: retry submission now succeeds and closes the drawer
    shouldClose = true;
    await act(async () => {
      html.getByText('确 认').click();
    });
    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledTimes(2);
    });
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it('dependency: choosing a different type renders and submits different fields', async () => {
    const onFinish = vi.fn(async () => true);
    const html = render(
      <ModalForm
        title="Advanced"
        trigger={<Button>高级</Button>}
        onFinish={onFinish}
      >
        <ProFormSelect
          name="type"
          label="Type"
          request={async () => [
            { label: 'Personal', value: 'personal' },
            { label: 'Company', value: 'company' },
          ]}
        />
        <ProFormDependency name={['type']}>
          {({ type }) => {
            if (type === 'company') {
              return <ProFormText name="companyName" label="Company Name" />;
            }
            return <ProFormText name="personName" label="Person Name" />;
          }}
        </ProFormDependency>
      </ModalForm>,
    );

    await act(async () => {
      html.getByText('高 级').click();
    });
    await waitFor(() => {
      expect(html.getByText('Person Name')).toBeTruthy();
    });

    // Switch to company -> the dependent field changes
    await act(async () => {
      fireEvent.mouseDown(
        document.querySelector('#type')!.closest('.ant-select')!,
      );
    });
    await waitFor(() => {
      expect(html.getAllByText('Company').length).toBeGreaterThan(0);
    });
    await act(async () => {
      html.getAllByText('Company')[0].click();
    });
    await waitFor(() => {
      expect(html.getByText('Company Name')).toBeTruthy();
    });

    // Fill and submit -> only the rendered dependent field is submitted
    const companyInput =
      document.querySelector<HTMLInputElement>('#companyName')!;
    fireEvent.change(companyInput, { target: { value: 'Ant Group' } });
    await act(async () => {
      html.getByText('确 认').click();
    });
    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({
        type: 'company',
        companyName: 'Ant Group',
      });
    });
  });
});
