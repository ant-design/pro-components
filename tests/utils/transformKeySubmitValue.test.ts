import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';
import { transformKeySubmitValue } from '../../src/utils/transformKeySubmitValue';

describe('transformKeySubmitValue', () => {
  it('transforms single-level values', () => {
    const values = {
      name: 'John Doe',
    };
    const transforms = {
      name: (value: string) => ({ displayName: value }),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      displayName: 'John Doe',
    });
  });

  it('transforms array values', () => {
    const values = {
      users: [{ name: 'John' }, { name: 'Alice' }],
    };
    const transforms = {
      'users.0.name': (value: string) => ({ displayName: value }),
      'users.1.name': (value: string) => ({ displayName: value }),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      users: [{ displayName: 'John' }, { displayName: 'Alice' }],
    });
  });

  it('transforms nested object values', () => {
    const values = {
      company: {
        name: 'Acme Corp',
        employees: [{ name: 'Bob' }],
      },
    };
    const transforms = {
      'company.name': (value: string) => ({ companyName: value }),
      'company.employees.0.name': (value: string) => ({ employeeName: value }),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      company: {
        companyName: 'Acme Corp',
        employees: [{ employeeName: 'Bob' }],
      },
    });
  });

  it('transforms date values', () => {
    const date = dayjs('2024-03-15');
    const values = {
      events: [
        {
          name: 'Conference',
          date,
        },
      ],
    };
    const transforms = {
      'events.0.name': (value: string) => ({ eventName: value }),
      'events.0.date': (value: string) => {
        return {
          timestamp: dayjs(value).valueOf(),
        };
      },
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      events: [
        {
          eventName: 'Conference',
          timestamp: date.valueOf(),
        },
      ],
    });
  });

  it('handles undefined values', () => {
    const values = {
      name: undefined,
      age: null,
    };
    const transforms = {
      name: (value: any) => ({ displayName: value }),
      age: (value: any) => ({ userAge: value }),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      displayName: undefined,
      userAge: null,
    });
  });

  it('handles deep nested arrays', () => {
    const values = {
      departments: [
        {
          name: 'Engineering',
          teams: [
            {
              name: 'Frontend',
              members: [
                {
                  name: 'Alice',
                },
              ],
            },
          ],
        },
      ],
    };
    const transforms = {
      'departments.0.name': (value: string) => ({ deptName: value }),
      'departments.0.teams.0.name': (value: string) => ({ teamName: value }),
      'departments.0.teams.0.members.0.name': (value: string) => ({
        memberName: value,
      }),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      departments: [
        {
          deptName: 'Engineering',
          teams: [
            {
              teamName: 'Frontend',
              members: [
                {
                  memberName: 'Alice',
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('handles mixed transforms at different levels', () => {
    const values = {
      org: {
        name: 'Acme',
        departments: [
          {
            name: 'Engineering',
            employees: [
              {
                name: 'Alice',
                role: 'Developer',
              },
            ],
          },
        ],
      },
    };
    const transforms = {
      'org.name': (value: string) => ({ orgName: value }),
      'org.departments.0.name': (value: string) => ({ deptName: value }),
      'org.departments.0.employees.0.name': (value: string) => ({
        employeeName: value,
      }),
      'org.departments.0.employees.0.role': (value: string) => ({
        jobTitle: value,
      }),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      org: {
        orgName: 'Acme',
        departments: [
          {
            deptName: 'Engineering',
            employees: [
              {
                employeeName: 'Alice',
                jobTitle: 'Developer',
              },
            ],
          },
        ],
      },
    });
  });

  it('preserves non-transformed values', () => {
    const values = {
      name: 'John',
      age: 30,
      email: 'john@example.com',
    };
    const transforms = {
      name: (value: string) => ({ displayName: value }),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      displayName: 'John',
      age: 30,
      email: 'john@example.com',
    });
  });

  it('handles array index transforms', () => {
    const values = {
      list: ['a', 'b', 'c'],
    };
    const transforms = {
      'list.0': (value: string) => value.toUpperCase(),
      'list.2': (value: string) => value.toUpperCase(),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      list: ['A', 'b', 'C'],
    });
  });
});
