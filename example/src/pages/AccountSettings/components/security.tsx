import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';

import { List } from 'antd';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage
        id="accountsettings.security.strong"
        defaultMessage="Strong"
      />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage
        id="accountsettings.security.medium"
        defaultMessage="Medium"
      />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage
        id="accountsettings.security.weak"
        defaultMessage="Weak"
      />
      Weak
    </span>
  ),
};

class SecurityView extends Component {
  getData = () => [
    {
      title: formatMessage({ id: 'accountsettings.security.password' }, {}),
      description: (
        <Fragment>
          {formatMessage({
            id: 'accountsettings.security.password-description',
          })}
          ：{passwordStrength.strong}
        </Fragment>
      ),
      actions: [
        <a key="Modify">
          <FormattedMessage
            id="accountsettings.security.modify"
            defaultMessage="Modify"
          />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'accountsettings.security.phone' }, {}),
      description: `${formatMessage(
        { id: 'accountsettings.security.phone-description' },
        {},
      )}：138****8293`,
      actions: [
        <a key="Modify">
          <FormattedMessage
            id="accountsettings.security.modify"
            defaultMessage="Modify"
          />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'accountsettings.security.question' }, {}),
      description: formatMessage(
        { id: 'accountsettings.security.question-description' },
        {},
      ),
      actions: [
        <a key="Set">
          <FormattedMessage
            id="accountsettings.security.set"
            defaultMessage="Set"
          />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'accountsettings.security.email' }, {}),
      description: `${formatMessage(
        { id: 'accountsettings.security.email-description' },
        {},
      )}：ant***sign.com`,
      actions: [
        <a key="Modify">
          <FormattedMessage
            id="accountsettings.security.modify"
            defaultMessage="Modify"
          />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'accountsettings.security.mfa' }, {}),
      description: formatMessage(
        { id: 'accountsettings.security.mfa-description' },
        {},
      ),
      actions: [
        <a key="bind">
          <FormattedMessage
            id="accountsettings.security.bind"
            defaultMessage="Bind"
          />
        </a>,
      ],
    },
  ];

  render() {
    const data = this.getData();
    return (
      <Fragment>
        <List<Unpacked<typeof data>>
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default SecurityView;
