import React, { useContext } from 'react';
import {
  List,
  Divider
} from '@material-ui/core';
import BaseLayout from '../BaseLayout';
import {UserContext} from '../../context/user/context';

const LoggedInUserTemplate = props => {
  const { userState } = useContext(UserContext);

  const DrawerItems = () => (
    <React.Fragment>
        <List>
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
