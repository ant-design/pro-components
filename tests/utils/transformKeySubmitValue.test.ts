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

  // 新增测试用例

  it('handles empty transform configuration', () => {
    const values = {
      name: 'John',
      age: 30,
    };
    const transforms = {};
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      name: 'John',
      age: 30,
    });
  });

  it('handles transforms with undefined values in config', () => {
    const values = {
      name: 'John',
      age: 30,
    };
    const transforms: Record<string, any> = {
      name: (value: string) => ({ displayName: value }),
      age: undefined,
      email: null,
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      displayName: 'John',
      age: 30,
    });
  });

  it('handles non-object values', () => {
    const values = 'string value';
    const transforms = {
      name: (value: string) => ({ displayName: value }),
    };
    expect(transformKeySubmitValue(values as any, transforms)).toBe('string value');
  });

  it('handles null values', () => {
    const values = null;
    const transforms = {
      name: (value: string) => ({ displayName: value }),
    };
    expect(transformKeySubmitValue(values as any, transforms)).toBe(null);
  });

  it('handles complex nested object with multiple array levels', () => {
    const values = {
      company: {
        departments: [
          {
            name: 'Engineering',
            teams: [
              {
                name: 'Frontend',
                members: [
                  { name: 'Alice', skills: ['React', 'TypeScript'] },
                  { name: 'Bob', skills: ['Vue', 'JavaScript'] },
                ],
              },
              {
                name: 'Backend',
                members: [{ name: 'Charlie', skills: ['Node.js', 'Python'] }],
              },
            ],
          },
        ],
      },
    };
    const transforms = {
      'company.departments.0.teams.0.members.0.name': (value: string) => ({
        memberName: value,
      }),
      'company.departments.0.teams.0.members.1.name': (value: string) => ({
        memberName: value,
      }),
      'company.departments.0.teams.1.members.0.name': (value: string) => ({
        memberName: value,
      }),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      company: {
        departments: [
          {
            name: 'Engineering',
            teams: [
              {
                name: 'Frontend',
                members: [
                  { memberName: 'Alice', skills: ['React', 'TypeScript'] },
                  { memberName: 'Bob', skills: ['Vue', 'JavaScript'] },
                ],
              },
              {
                name: 'Backend',
                members: [{ memberName: 'Charlie', skills: ['Node.js', 'Python'] }],
              },
            ],
          },
        ],
      },
    });
  });

  it('handles transforms that return primitive values', () => {
    const values = {
      numbers: [1, 2, 3, 4, 5],
      text: 'hello world',
    };
    const transforms = {
      'numbers.0': (value: number) => value * 10,
      'numbers.2': (value: number) => value * 100,
      text: (value: string) => value.toUpperCase(),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      numbers: [10, 2, 300, 4, 5],
      text: 'HELLO WORLD',
    });
  });

  it('handles transforms that return arrays', () => {
    const values = {
      user: {
        name: 'John',
        hobbies: ['reading', 'gaming'],
      },
    };
    const transforms = {
      'user.hobbies': (value: string[]) => value.map((hobby) => hobby.toUpperCase()),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      user: {
        name: 'John',
        hobbies: ['READING', 'GAMING'],
      },
    });
  });

  it('handles transforms with non-existent paths', () => {
    const values = {
      name: 'John',
      age: 30,
    };
    const transforms = {
      'non.existent.path': (value: any) => ({ found: value }),
      'also.non.existent': (value: any) => ({ found: value }),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      name: 'John',
      age: 30,
    });
  });

  it('handles transforms with mixed path formats', () => {
    const values = {
      user: {
        profile: {
          name: 'John',
          contact: {
            email: 'john@example.com',
            phone: '123-456-7890',
          },
        },
      },
    };
    const transforms: Record<string, any> = {
      // 点号路径格式
      'user.profile.name': (value: string) => ({ displayName: value }),
      'user.profile.contact.email': (value: string) => ({ userEmail: value }),
      // 传统嵌套对象格式
      user: {
        profile: {
          contact: {
            phone: (value: string) => ({ userPhone: value }),
          },
        },
      },
    };
    // 传统嵌套对象格式的转换结果会被合并到根级别
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      user: {
        profile: {
          displayName: 'John',
          contact: {
            userEmail: 'john@example.com',
          },
        },
      },
      userPhone: '123-456-7890',
    });
  });

  it('handles transforms that return objects with nested structure', () => {
    const values = {
      user: {
        name: 'John',
        age: 30,
      },
    };
    const transforms = {
      user: (value: any) => ({
        profile: {
          displayName: value.name,
          userAge: value.age,
        },
        metadata: {
          createdAt: new Date().toISOString(),
        },
      }),
    };
    const result = transformKeySubmitValue(values, transforms);
    expect(result).toHaveProperty('profile');
    expect(result).toHaveProperty('metadata');
    expect((result as any).profile).toEqual({
      displayName: 'John',
      userAge: 30,
    });
    expect((result as any).metadata).toHaveProperty('createdAt');
  });

  it('handles transforms with special characters in keys', () => {
    const values = {
      'user-name': 'John',
      'user-age': 30,
      'user.email': 'john@example.com',
    };
    const transforms = {
      'user-name': (value: string) => ({ displayName: value }),
      'user-age': (value: number) => ({ userAge: value }),
      'user.email': (value: string) => ({ userEmail: value }),
    };
    // 包含点号的键会被当作点号路径处理
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      displayName: 'John',
      userAge: 30,
      'user.email': 'john@example.com',
    });
  });

  it('handles transforms with numeric keys', () => {
    const values = {
      '0': 'first',
      '1': 'second',
      '2': 'third',
    };
    const transforms = {
      '0': (value: string) => ({ first: value }),
      '1': (value: string) => ({ second: value }),
      '2': (value: string) => ({ third: value }),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      first: 'first',
      second: 'second',
      third: 'third',
    });
  });

  it('handles transforms with empty strings as keys', () => {
    const values = {
      '': 'empty key value',
      name: 'John',
    };
    const transforms = {
      '': (value: string) => ({ emptyKeyValue: value }),
      name: (value: string) => ({ displayName: value }),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      emptyKeyValue: 'empty key value',
      displayName: 'John',
    });
  });

  it('handles transforms with very deep nesting', () => {
    const values = {
      level1: {
        level2: {
          level3: {
            level4: {
              level5: {
                level6: {
                  level7: {
                    level8: {
                      level9: {
                        level10: {
                          value: 'deep value',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    const transforms = {
      'level1.level2.level3.level4.level5.level6.level7.level8.level9.level10.value': (value: string) => ({
        deepTransformedValue: value,
      }),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      level1: {
        level2: {
          level3: {
            level4: {
              level5: {
                level6: {
                  level7: {
                    level8: {
                      level9: {
                        level10: {
                          deepTransformedValue: 'deep value',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  });

  it('handles transforms with array of objects containing nested arrays', () => {
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
                  skills: ['React', 'TypeScript'],
                  projects: [
                    { name: 'Project A', status: 'active' },
                    { name: 'Project B', status: 'completed' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const transforms = {
      'departments.0.teams.0.members.0.projects.0.name': (value: string) => ({
        projectName: value,
      }),
      'departments.0.teams.0.members.0.projects.1.name': (value: string) => ({
        projectName: value,
      }),
    };
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      departments: [
        {
          name: 'Engineering',
          teams: [
            {
              name: 'Frontend',
              members: [
                {
                  name: 'Alice',
                  skills: ['React', 'TypeScript'],
                  projects: [
                    { projectName: 'Project A', status: 'active' },
                    { projectName: 'Project B', status: 'completed' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('handles transforms with function values in data', () => {
    const values = {
      name: 'John',
      handler: () => 'function value',
    };
    const transforms = {
      name: (value: string) => ({ displayName: value }),
    };
    // 函数值会被 isPlainObj 排除，不会被处理
    expect(transformKeySubmitValue(values, transforms)).toEqual({
      displayName: 'John',
    });
  });
});
