
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import React, {useEffect } from "react";
import DataHandler from "./DataHandler";
import FilterTable from "./FilterTable";

import AddIcon from "@material-ui/icons/Add";

import { ACTION_STATUSES, SUPPLY_CATEGORY } from "../../../utils/constants";
import { useState } from "react";
import * as FileSaver from 'file-saver';

import StockForm from "./StockForm";
import { connect } from "react-redux";
import { stockCreateStateSelector, stockDeleteStateSelector, stockListStateSelector, stockUpdateStateSelector } from "../../../store/selectors/stockSelector";
import { attemptToCreateStock, attemptToDeleteStock, attemptToFetchStock, attemptToUpdateStock, resetCreateStockState, resetDeleteStockState, resetFetchStockState, resetUpdateStockState } from "../../../store/actions/stockAction";

import moment from "moment";
import Helper from "../../../utils/helper";
import InventoryTable from "../../../Common/components/inventorySystem/InventoryTable";
import ActionsFunction from "../../../Common/components/inventorySystem/ActionsFunction";
import { productListStateSelector } from "../../../store/selectors/productSelector";
import { attemptToFetchProduct, resetFetchProductState } from "../../../store/actions/productAction";

let grandTotal = 0;
let productList = [];
const DEFAULT_DATE_RANGE = Helper.formatDateRangeByCriteriaV2('thisMonth');
function payloadHandler() {
  /*
  const payload = {
  from : `${DEFAULT_DATE_RANGE.from} 00:00:00`,
  to: `${DEFAULT_DATE_RANGE.to} 23:59:00`
*/

return null;
}

const Stock = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState(DataHandler.columns());
  const [isStocksCollection, setIsStocksCollection] = useState(true);
  const [isCreateStockCollection, setIsCreateStockCollection] = useState(true);
  const [isUpdateStockCollection, setIsUpdateStockCollection] = useState(true);
  const [isDeleteStockCollection, setIsDeleteStockCollection] = useState(true);
  const [isFormModal, setIsFormModal] = useState(false);
  const [item, setItem] = useState(undefined);
  const [mode, setMode] = useState('create');
  const [isAddGroupButtons,setIsAddGroupButtons] = useState(false);

  const createFormHandler = (data, mode) => {
    setItem(data);
    setMode(mode || 'create');
    setIsFormModal(true);
  }
  const closeFormModalHandler = () => {


    setIsFormModal(false);
  }

  useEffect(() => {
    console.log('[useEffect]',isDeleteStockCollection,props.deleteStockState.status);
  
    if (!isStocksCollection && props.stocks && props.stocks.status === ACTION_STATUSES.SUCCEED) {
      props.resetListStocks();
   
      setIsStocksCollection(true);
    }

    if (!isCreateStockCollection && props.createStockState && props.createStockState.status === ACTION_STATUSES.SUCCEED) {
      props.resetCreateStock();

      setIsCreateStockCollection(true);
   
    }
    if (!isUpdateStockCollection && props.updateStockState && props.updateStockState.status === ACTION_STATUSES.SUCCEED) {
      props.resetUpdateStock();

      setIsUpdateStockCollection(true);

     
    }
    if (!isDeleteStockCollection && props.deleteStockState && props.deleteStockState.status === ACTION_STATUSES.SUCCEED) {
      console.log('[change me to true]');
      props.resetDeleteStock();
      setIsDeleteStockCollection(true);
     
    }
  }, [isStocksCollection,isCreateStockCollection,isUpdateStockCollection,isDeleteStockCollection]);
  useEffect(() => {
   console.log('list stocks');
    props.listProducts();
    props.listStocks();
  }, []);

  if(props.products && props.products.status === ACTION_STATUSES.SUCCEED) {
    productList = [...props.products.data];
    props.products.data.forEach(item => {
      item.name = item.description;
      item.value = item.description;
      item.label = item.description;
      item.categoryType = 'description'
    });

    props.resetListProducts();
  }
  console.log('[props.Stocks]', props.stocks);
  if (isStocksCollection && props.stocks && props.stocks.status === ACTION_STATUSES.SUCCEED) {
    grandTotal = 0.0;
    let source = props.stocks.data;
    if (source && source.length) {
      source  = DataHandler.mapData(source);
      const grands = source.map(map => map.grand_total);
      grands.forEach(g => {
        grandTotal += parseFloat(g) || 0.00;
      });
    }

    const cols = DataHandler.columns().map((col, index) => {
      if (col.name === 'actions') {
        return {
          ...col,
          editable: () => false,
          render: (cellProps) => <ActionsFunction deleteRecordItemHandler={deleteRecordItemHandler} createFormHandler={createFormHandler} data={{ ...cellProps.data }} />
        }

      } else {
        return {
          ...col,
          editable: () => false
        }
      }
    });
    setColumns(cols);
    setDataSource(source);
    setIsStocksCollection(false);
  }
  const deleteRecordItemHandler = (id) => {
    console.log('[delete stock id]',id);
    props.deleteStock(id);
  }
  const createStockHandler = (payload,mode) => {
    console.log('[Create Stock Handler]',payload,mode);
    const params = {
      created_at : new Date(),
      item: payload.item,
      dimension : payload.dimension,
      size: payload.size,
      description: payload.description,
      qty_on_hand : payload.qtyOnHand,
      incoming_qty : payload.incomingQty,
      projected_qty : payload.projectedQty,
      incoming_order_at: payload.projectedDate,
      productId : payload.productId,
      category : payload.category
    };
    if(mode === 'create') {
      props.createStock(params);
    
    } else if (mode === 'edit') {
      params.id = payload.id;
      props.updateStock(params);
    }
    setIsFormModal(false);
    

    

  }
  console.log('[Is Create Stock Collection]',props.createStockState);
  if (isCreateStockCollection && props.createStockState && props.createStockState.status === ACTION_STATUSES.SUCCEED) {
    setIsCreateStockCollection(false);
    props.listStocks();
 
  }
  if (isUpdateStockCollection && props.updateStockState && props.updateStockState.status === ACTION_STATUSES.SUCCEED) {
    setIsUpdateStockCollection(false);
    props.listStocks();
  
  }
  console.log('[isDeleteStock]',isDeleteStockCollection,props.deleteStockState);
  if (isDeleteStockCollection && props.deleteStockState && props.deleteStockState.status === ACTION_STATUSES.SUCCEED) {
    setIsDeleteStockCollection(false);
    props.listStocks();
  
  }
  
  const filterRecordHandler = (payload) => {
    props.listStocks(payload);
  };

  const onCheckboxSelectionHandler = (data, isAll, itemIsChecked) => {
    console.log('[data ALl]', data, isAll, itemIsChecked);
  const dtSource = [...dataSource];
    if (isAll) {
        dtSource.forEach(item => {
            item.isChecked = isAll; // reset
        });
    } else if (!isAll && data && data.length > 0) {
        dtSource.forEach(item => {
            if (item.id.toString() === data[0].toString()) {
                item.isChecked = itemIsChecked;
            }
        });

    } else if (!isAll && Array.isArray(data) && data.length === 0) {
        dtSource.forEach(item => {
            item.isChecked = isAll; // reset
        });
    }
    setIsAddGroupButtons(dtSource.find(f => f.isChecked));
    setDataSource(dtSource);
    
}
const exportToExcelHandler = () => {
  const excelData = dataSource.filter((r) => r.isChecked);
  const headers = columns;
  const excel = Helper.formatExcelReport(headers, excelData);
  console.log("headers", excel);
  const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  let fileName = `stock_list_batch_${new Date().getTime()}`;

  if (excelData && excelData.length) {
    import(/* webpackChunkName: 'json2xls' */ "json2xls")
          .then((json2xls) => {
              // let fileName = fname + '_' + new Date().getTime();
              const xls = typeof json2xls === 'function' ? json2xls(excel) : json2xls.default(excel);
              const buffer = Buffer.from(xls, "binary");
              // let buffer = Buffer.from(excelBuffer);
              const data = new Blob([buffer], { type: fileType });
              FileSaver.saveAs(data, fileName + fileExtension);
          })
          .catch((err) => {
              // Handle failure
              console.log(err);
          });
  }


}



  return (
    <React.Fragment>
      <Grid container spacing={24} justify="space-between" style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
        <Grid item xs={12}>

          <Typography variant="h3">Stock List</Typography>
          <br />
        </Grid>
        <Grid item xs={12}>
          <FilterTable filterRecordHandler={filterRecordHandler}/>
          <br />
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Divider variant="fullWidth" style={{
              height: '.02em',
              border: 'solid 1px rgba(0, 0, 0, 0.12)'
            }} orientation="horizontal" flexItem />
          </Grid>
          <br />
        </Grid>

        <Grid container spacing={24} justify="space-between" style={{ paddingBottom: 10 }}>
          <div style={{display:'inline-flex',gap:10}}>
          <Button
            onClick={() => createFormHandler()}
            variant="contained"
            style={{
              border: 'solid 1px #2196f3',
              color: 'white',
              background: '#2196f3',
              fontFamily: "Roboto",
              fontSize: "12px",
              fontWeight: 500,
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: 1.71,
              letterSpacing: "0.4px",
              textAlign: "left",
              cursor: 'pointer'
            }}
            component="span"
            startIcon={<AddIcon />}
          >
            ADD STOCK
          </Button>
          {isAddGroupButtons &&
          <Button
          onClick={() => exportToExcelHandler()}
          variant="contained"
          style={{
            border: 'solid 1px blue',
            color: 'white',
            background: 'blue',
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: 500,
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: 1.71,
            letterSpacing: "0.4px",
            textAlign: "left",
            cursor: 'pointer'
          }}
          component="span"
          startIcon={<AddIcon />}
        > Export Excel </Button>
}
          </div>
        </Grid>
        <Grid item xs={12}>

          <InventoryTable onCheckboxSelectionHandler={onCheckboxSelectionHandler} columns={columns} dataSource={dataSource} />
        </Grid>
      </Grid>
      {isFormModal &&
        <StockForm productList={productList} createStockHandler={createStockHandler} mode={mode} isOpen={isFormModal} isEdit={false} item={item} onClose={closeFormModalHandler} />
      }
    </React.Fragment>
  )
}
const mapStateToProps = store => ({
  products: productListStateSelector(store),
  stocks: stockListStateSelector(store),
  createStockState : stockCreateStateSelector(store),
  updateStockState : stockUpdateStateSelector(store),
  deleteStockState : stockDeleteStateSelector(store),
  

});

const mapDispatchToProps = dispatch => ({
  listProducts: (data) => dispatch(attemptToFetchProduct(data)),
  resetListProducts: () => dispatch(resetFetchProductState()),
  listStocks: (data) => dispatch(attemptToFetchStock(data)),
  resetListStocks: () => dispatch(resetFetchStockState()),
  createStock : (data) => dispatch(attemptToCreateStock(data)),
  resetCreateStock : () => dispatch(resetCreateStockState()),
  updateStock : (data) => dispatch(attemptToUpdateStock(data)),
  resetUpdateStock : () => dispatch(resetUpdateStockState()),
  deleteStock : (data) => dispatch(attemptToDeleteStock(data)),
  resetDeleteStock : () => dispatch(resetDeleteStockState())


});

export default connect(mapStateToProps, mapDispatchToProps)(Stock);

