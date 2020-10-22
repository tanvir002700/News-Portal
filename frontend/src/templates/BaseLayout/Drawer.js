import React from 'react';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';
import { drawerStyle } from './styles';

const useStyles = makeStyles(drawerStyle);

const PersistentDrawer = props => {
  const { open, onClose } = props;
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerClose = () => {
    onClose();
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        {/*<img style={{ width: '100%' }} alt="logo" src={""} />*/}
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      {props.children}
    </Drawer>
  );
};

export default PersistentDrawer;
