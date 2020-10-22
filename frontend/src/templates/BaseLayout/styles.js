export const drawerStyle = theme => ({
  drawer: {
    width: theme.width.drawer,
    flexShrink: 0
  },
  drawerPaper: {
    width: theme.width.drawer
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
});

export const topBarStyle = theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${theme.width.drawer}px)`,
    marginLeft: theme.width.drawer,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  title: {
    display: 'block'
  },
  sectionDesktop: {
    display: 'flex',
    alignItems: 'center'
  },
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
});

export default theme => ({
  grow: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: theme.width.drawer
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
});
