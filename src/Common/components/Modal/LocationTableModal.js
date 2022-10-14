import React, { lazy, Suspense } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { 
       Modal,
       Table, TableBody,TableCell, TableContainer,
       TableHead, TableRow,Paper,  Tooltip, Grid, IconButton, TextField
} from '@material-ui/core';

const CancelOutlined = lazy(() => import(/* webpackChunkName: 'iconCancelOutlined' */ "@material-ui/icons/CancelOutlined"));

const cellFontSize = '10px';
const ROW_HEIGHT = 53;
const HEAD_ROW_HEIGHT = 57;
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  tableContainer: {
    overflowY: "auto"
  },
  table: { //...
    height: "100%",
    overflowY: "scroll"
  },
  
}));

  
/*** 
 * Author 
 * Nargel Velasco - Tech Team
 * @param {Object} data - header and rows data
 * @param {Function} exportHandler - handle export function
 * @param {Function} closeModal - close modal 
 * @param {Function} isOpen - open modal if true
 * 
*/
 
export default function LocationTableModal({data,filterHandler,closeModal,isOpen,onClickHandler,distribution}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [maxRows, setMaxRows] = React.useState(5);

  const handleClose = () => {
    setOpen(false);
  };
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
     <div style={{ maxHeight: 400, width: '100%' }}>
     <Grid container direction="row" justify="space-between" alignItems="center">
    <h4>Location</h4>
    <IconButton aria-label="close" onClick={closeModal}>
      <Suspense fallback="Loading..."><CancelOutlined  style={{ fontSize: '16pt' }}/></Suspense>
    </IconButton>
  </Grid>
  <Grid>
 										<div className="form-field">
											{/*
											<input name="search" className="form-control" placeholder="Search Accessorial Table" />
											*/}
											<TextField
												width="100%"
												placeholder="Search Location"
												name="searchLocation"
												id="searchLocationFilter"
												className="form-control"
												onChange={(e) => filterHandler(e.target.value)} />
											<button className="search-btn" type="button" onClick={() => filterHandler(document.getElementById("searchLocationFilter").value)}>
												<i className="fas fa-search"></i>
											</button>
										</div>
  </Grid>
     <TableContainer component={Paper} className={classes.tableContainer}
        style={{
          maxHeight: maxRows * ROW_HEIGHT + HEAD_ROW_HEIGHT
        }}>
          
      <Table   stickyHeader className={classes.table}  aria-label="rate table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontSize:cellFontSize}}>Row</TableCell>
      
          {data && data.headers && data.headers.length > 0 && data.headers.map((row,h) => (
         
            <TableCell style={{fontSize:cellFontSize}} key={h}>{row}</TableCell>
          ))}
        </TableRow>
        </TableHead>
        <TableBody>
          {data && data.rows && data.rows.length > 0 && data.rows.map((row,i) => (
            <TableRow key={`loc-tr-${i}`} onClick={() => onClickHandler(row, distribution)} style={{cursor:'pointer'}}>
              <TableCell key={`loc-th-${i}`} component="th" scope="row" style={{fontSize:cellFontSize}}>{i + 1}</TableCell>
           
                {row.map((c,x) => (
                    
              <TableCell key={`loc-th-${x}-b`} component="th" scope="row" style={{fontSize:cellFontSize}}>
                  
                        <LightTooltip title={c}><span className="rate-ellipsis">{c}</span></LightTooltip>
                        
                
              </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      
      </Table>
    </TableContainer>
 
    </div>
      <LocationTableModal />
    </div>
  );

  return (
    <div>
      <Modal
        fullWidth={true}
        maxWidth={'md'}
        maxHeight={'500px'}
        open={isOpen ? true :  false}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}