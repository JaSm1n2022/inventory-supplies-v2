import React, { lazy, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { loadImg } from '../../../Util/loadImg';
import { withRouter } from 'react-router-dom';
import { LAYOUT_URL } from '../../../../utils/constants';
import RegularSkeleton from '../Skeleton/RegularSkeleton';

const Edit = lazy(() => import(/* webpackChunkName: 'iconEdit' */ "@material-ui/icons/Edit"));

const font12_bold = { fontSize: '12pt', fontWeight: '500' };
const font10_bold = { fontSize: '10pt', fontWeight: '500' };
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  media: {
    height: 0,     // as an example I am modifying width and height
    width: '0%'

  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: props => props.avatarBkg ? props.avatarBkg : red
  },
}));

function ProfileCard(props) {
  const { logo, title, subheader, item, editHandler } = props;
  const classes = useStyles(props);
  const [expanded, setExpanded] = React.useState(false);
  const [isShowMore, setIsShowMore] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="customer">
            <img src={logo} alt="" />

          </Avatar>

        }
        action={
          title ?
            <span style={{ display: title ? '' : 'none' }}>
              <IconButton aria-label="settings" onClick={() => editHandler()}>
                <Suspense fallback="Loading..."><Edit style={{ fill: 'blue' }} /></Suspense>
              </IconButton>
            </span>
            : <RegularSkeleton />

        }
        title={<h3>{title}</h3>}
        subheader={<h4>{subheader}</h4>}
      />
      {/*
      <CardMedia
        className={classes.media}
        image={NoResult}
        title="Paella dish"
      />
      */}

      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={null}
          title="Dark Logo"
        />
        <CardContent>
          <Grid container>
            <Grid item xs={4}>
              <div align="float-left" style={{padding:0}}>
                <h4>General Information</h4>
                </div>
            </Grid>
            <Grid item xs={8} align="right">
              <div align="float-right" style={{padding:0}}>
                {isShowMore ?
                <Button color="primary" onClick={() => setIsShowMore(!isShowMore)}><h5>Show Less...</h5></Button>
              
              :
                <Button color="primary" onClick={() => setIsShowMore(!isShowMore)}><h5>Show More...</h5></Button>
}
</div>
            </Grid>
          </Grid>
          <Grid container>
          <Grid item xs={3}>
              <Typography gutterBottom>
              <label htmlFor="" style={font12_bold}>Account Type</label>
                     
              </Typography>
              <Typography gutterBottom >
              <label htmlFor="" style={font10_bold}>{item.businessType||'-'}</label>
            
              </Typography>
            
            </Grid>
            <Grid item xs={3}>
            <Typography gutterBottom>
              <label htmlFor="" style={font12_bold}>Phone</label>
                     
              </Typography>
              <Typography gutterBottom >
              <label htmlFor="" style={font10_bold}>{item.telephone||'-'}</label>
            
              </Typography>
            
            </Grid>
            <Grid item xs={3}>
            <Typography gutterBottom>
              <label htmlFor="" style={font12_bold}>Customer #</label>
                     
              </Typography>
              <Typography gutterBottom >
              <label htmlFor="" style={font10_bold}>{item.customerNbr}</label>
            
              </Typography>
            
            </Grid>
            <Grid item xs={3}>
            <Typography gutterBottom>
              <label htmlFor="" style={font12_bold}>Enterprise Customer Code</label>
                     
              </Typography>
              <Typography gutterBottom >
              <label htmlFor="" style={font10_bold}>{item.enterpriseCustCd}</label>
            
              </Typography>
            
            </Grid>

            <Grid container style={{display: isShowMore ? '':'none'}}>
            <Grid item xs={3}>
            <Typography gutterBottom>
              <label htmlFor="" style={font12_bold}>Controlling Branch</label>
                     
              </Typography>
              <Typography gutterBottom >
              <label htmlFor="" style={font10_bold}>{item.controllingBranch}</label>
            
              </Typography>
            
            </Grid>
            <Grid item xs={3}>
            <Typography gutterBottom>
              <label htmlFor="" style={font12_bold}>Date Created</label>
                     
              </Typography>
              <Typography gutterBottom >
              <label htmlFor="" style={font10_bold}>{item.created}</label>
            
              </Typography>
            
            </Grid>
            <Grid item xs={3}>
            <Typography gutterBottom>
              <label htmlFor="" style={font12_bold}>Contact Email</label>
                     
              </Typography>
              <Typography gutterBottom >
              <label htmlFor="" style={font10_bold}>{item.contactEmail || '-'}</label>
            
              </Typography>
            
            
            </Grid>
            <Grid item xs={3}>
            <Typography gutterBottom>
              <label htmlFor="" style={font12_bold}>Contact Person</label>
                     
              </Typography>
              <Typography gutterBottom >
              <label htmlFor="" style={font10_bold}>{item.contactPerson || '-'}</label>
            
              </Typography>
            
            </Grid>
            <Grid item xs={3}>
            <Typography gutterBottom>
              <label htmlFor="" style={font12_bold}>Time Zone</label>
                     
              </Typography>
              <Typography gutterBottom >
              <label htmlFor="" style={font10_bold}>{item.dtFormat ? item.dtFormat.utcName : '-'}</label>
            
              </Typography>
            
            </Grid>
         </Grid>
         
          </Grid>
          

        </CardContent>
      </CardActionArea>

      {/*
    
    
    <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">

         </Typography>
      </CardContent>
      }
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
        */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>General Information:</Typography>
          <Typography paragraph>
            Customer # : 1111
            Enterprise Customer Code :
            Date Format :
          </Typography>
        </CardContent>
      </Collapse>

    </Card>
  );
}
export default withRouter(ProfileCard);