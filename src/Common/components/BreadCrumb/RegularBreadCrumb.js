import React, { lazy, Suspense } from 'react';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import { withRouter } from 'react-router-dom';

const Home = lazy(() => import(/* webpackChunkName: 'iconHome' */ "@material-ui/icons/Home"));

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

  
function RegularBreadCrumb(props) {
  const {links} = props;
  const linkHandler = (event,url) => {
    if(url) {
      props.history.push(url);
    }
  }
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {links && links.map((l,i) => (
      <StyledBreadcrumb
        key={`breadcrumb-${i}`}
        component="a"
        label={<h6 style={{color : l.url ? 'blue':''}}>{l.label}</h6>}
        onClick={(e) => linkHandler(e,l.url)}
        icon={l.label === 'Home' ? <Suspense fallback="Loading..."><Home  style={{fontSize:'12pt',paddingBottom:'4px'}}/></Suspense> : ''}
      />
      ))}
    </Breadcrumbs>
  );
}
export default withRouter(RegularBreadCrumb);