// const shouldUpdateScroll = (prevRouterProps, { location, history }) => (
//     prevRouterProps && location.pathname !== prevRouterProps.location.pathname
//   );
  
 const shouldUpdateScroll = (prevRouterProps, { location, history }) => {
    if (history.action === 'POP') {
      return false;
    }
  
    if (location.state["MY-USER-KEY"] === "NoScroll") {
      return [0, 0];
    }
  
    return true;
  };