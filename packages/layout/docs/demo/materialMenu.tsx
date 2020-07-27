import React from 'react';
// eslint-disable-next-line import/no-unresolved
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

export default () => (
  <ProLayout
    style={{
      height: 500,
    }}
    location={{
      pathname: '/welcome',
    }}
    menuRender={(props) => (
      <div
        style={{
          background: '#fff',
          boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)',
          transition: 'all 0.2s',
        }}
      >
        <List
          component="nav"
          style={{
            transition: 'all 0.2s',
            width: props.collapsed ? 80 : 256,
          }}
          aria-label="main mailbox folders"
        >
          <ListItem button>
            <ListItemText primary="welcome" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="one" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="two" />
          </ListItem>
        </List>
      </div>
    )}
  >
    <PageContainer content="欢迎使用">Hello World</PageContainer>
  </ProLayout>
);
