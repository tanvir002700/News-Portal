import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from './Drawer';
import TopBar from './TopBar';
import styles from './styles';

const useStyles = makeStyles(styles);

const BaseLayout = props => {
  const { DrawerItemsComponent = React.Fragment, ...others } = props;
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <React.Fragment>
      <div className={classes.grow}>
        <TopBar
          {...others}
          onClickMenu={() => setDrawerOpen(true)}
          drawerOpen={drawerOpen}
        />
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <DrawerItemsComponent />
        </Drawer>
      </div>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default BaseLayout;
