import React, { useState, useRef, useLayoutEffect, lazy,useEffect,useCallback, Suspense } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Button, ButtonGroup, Tooltip } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Paper, } from '@material-ui/core'
import { makeStyles, withStyles } from "@material-ui/core/styles";

const CheckCircleIcon = lazy(() =>
  import(
    /* webpackChunkName: 'iconCheckCircle' */ "@material-ui/icons/CheckCircle"
  )
);
const ErrorCircleIcon = lazy(() =>
  import(/* webpackChunkName: 'iconError' */ "@material-ui/icons/Error")
);

const cellFontSize = "10px";
const ROW_HEIGHT = 53;
const HEAD_ROW_HEIGHT = 57;

let jsonData = [];
let cntSuccess = 0;
let cntFailed = 0;
let cntAll = 0;


const generateItems = (sourceData,currentData,start,end) => {
  console.log('[generate items]',sourceData,currentData,start,end);
  for (let i = start; i < end; i++) {
    if(sourceData[i] && i < sourceData.length ) {
      console.log('[sourceData[i]',i,sourceData[i]);
    currentData.push(sourceData[i]);
    }
  }
  console.log('[Current Data]',currentData);
  return currentData;
}
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
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  tableContainer: {
    overflowY: "auto",
  },
  table: {
    //...
    height: "100%",
    overflowY: "scroll",
  },
}));

export default function ExportTableWithInfiniteScroll({
  data,
  exportHandler,
  closeModal,
  isOpen,
}) {
  const classes = useStyles();
  const tableEl = useRef()
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(isOpen);
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [distanceBottom, setDistanceBottom] = useState(0)
  const [isRefresh,setIsRefresh] = React.useState(false);
  // hasMore should come from the place where you do the data fetching
  // for example, it could be a prop passed from the parent component
  // or come from some store
  const [hasMore] = useState(true)
  const loadMore = useCallback(() => {
    const loadItems = async () => {
      await new Promise(resolve =>
        setTimeout(() => {
          const amount = rows.length + 50
          setRows(generateItems([...jsonData.rows],rows,rows.length, amount))
          setLoading(false)
          resolve()
        }, 2000)
      )
    }
    setLoading(true)
    loadItems()
  }, [rows])
  const scrollListener = useCallback(() => {
    let bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight
    // if you want to change distanceBottom every time new data is loaded
    // don't use the if statement
    if (!distanceBottom) {
      // calculate distanceBottom that works for you
      setDistanceBottom(Math.round((bottom / 100) * 20))
    }
    if (tableEl.current.scrollTop > bottom - distanceBottom && hasMore && !loading) {
      loadMore()
    }
  }, [hasMore, loadMore, loading, distanceBottom])
  useLayoutEffect(() => {
    console.log('[when modal is open');
    const tableRef = tableEl.current
    if (tableRef) {
      console.log('[add EventListner scroll]');
      tableRef.addEventListener('scroll', scrollListener)
      return () => {
        tableRef.removeEventListener('scroll', scrollListener)
      }
    }
  }, [scrollListener])
 
  useEffect(() => {
    if(data && data.length === 1) {
      jsonData = (data[0]);
    } else if(data && data.length > 1) {
      // organize it
      const hdrs = data[0].headers;
      const allRows = [];
      data.forEach(d => {
        d.rows.forEach(r => {
          allRows.push(r);
        })
      });
     jsonData = {
        headers: hdrs, rows : allRows
      };
    }
    console.log('JsonData]',jsonData);
    cntSuccess = 0;
    cntFailed = 0;
    cntAll = 0;
    jsonData.rows.forEach(r => {
      cntAll = parseInt(cntAll, 10) + 1;
      if(r[0] === 'Success') {
        cntSuccess = parseInt(cntSuccess,10) + 1;
      } else if (r[0] === 'Failed') {
        cntFailed = parseInt(cntFailed, 10) + 1;
      }
    });
    setRows(generateItems([...jsonData.rows],rows,0, 50));
    setIsRefresh(!isRefresh);

}, [data]);
console.log('[Rows]',rows);

  return (
    <div style={modalStyle} className={classes.paper}>
    <div style={{ maxHeight: 500, width: "100%" }}>
      <TableContainer
        component={Paper}
        className={classes.tableContainer}
        style={{ maxWidth: '600px', margin: 'auto', maxHeight: '400px' }}  ref={tableEl}
      >
            {loading && <CircularProgress style={{ position: 'absolute', top: '100px' }} />}
           
        <Table stickyHeader className={classes.table} aria-label="rate table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: cellFontSize }}>Row</TableCell>

              {jsonData &&
                jsonData.headers &&
                jsonData.headers.length > 0 &&
                jsonData.headers.map((row, h) => (
                  <TableCell style={{ fontSize: cellFontSize }} key={h}>
                    {row}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows &&
              rows.length > 0 &&
              rows.map((row, i) => (
                <TableRow key={`tr-${i}`}>
                  <TableCell
                    key={`th-${i}`}
                    component="th"
                    scope="row"
                    style={{ fontSize: cellFontSize }}
                  >
                    {i + 1}
                  </TableCell>

                  {row.map((c, x) => (
                    <TableCell
                      key={`th-${x}-b`}
                      component="th"
                      scope="row"
                      style={{ fontSize: cellFontSize }}
                    >
                      {x === 0 && c === "Success" ? (
                        <span
                          style={{ width: "80px", display: "inline-block" }}
                        >
                          <Suspense fallback="Loading...">
                            <CheckCircleIcon style={{ fill: "green" }} />
                          </Suspense>{" "}
                          {c}
                        </span>
                      ) : x === 0 && c === "Failed" ? (
                        <span
                          style={{ width: "80px", display: "inline-block" }}
                        >
                          <Suspense fallback="Loading...">
                            <ErrorCircleIcon style={{ fill: "red" }} />
                          </Suspense>{" "}
                          {c}
                        </span>
                      ) : (
                        <LightTooltip title={c}>
                          <span className="rate-ellipsis">{c}</span>
                        </LightTooltip>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <ButtonGroup
        color="primary"
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          color="primary"
          onClick={() => exportHandler(jsonData, "Success")}
        >
          {`Export Success (${cntSuccess})`} 
        </Button>
        <Button color={cntFailed === 0 ? "default" : "primary"} disabled={cntFailed === 0} onClick={() => exportHandler(jsonData, "Failed")}>
          {`Export Failed (${cntFailed})`}
        </Button>
        <Button color="primary" onClick={() => exportHandler(jsonData, "All")}>
          {`Export All (${cntAll})`}
        </Button>
        <Button color="default" onClick={() => closeModal()}>
          Exit
        </Button>
      </ButtonGroup>
    </div>
  
  </div>
  );
}
