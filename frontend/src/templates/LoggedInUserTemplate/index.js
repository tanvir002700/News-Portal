import React, { useContext } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';
import {
  MenuBook as MenuBookIcon,
} from '@material-ui/icons';
import BaseLayout from '../BaseLayout';
import {UserContext} from '../../context/user/context';

const LoggedInUserTemplate = props => {
  const { userState } = useContext(UserContext);

  const DrawerItems = () => (
    <React.Fragment>
        <List>
          <ListItem
            button
            key="test"
          >
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="test" />
          </ListItem>
        </List>
      <Divider />
    </React.Fragment>
  );
  return (
    <BaseLayout DrawerItemsComponent={DrawerItems} user={userState}>
      {props.children}
    </BaseLayout>
  );
};

export default LoggedInUserTemplate;
