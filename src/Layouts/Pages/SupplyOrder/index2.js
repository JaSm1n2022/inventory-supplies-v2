
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import React, { lazy, useEffect } from "react";
import DataHandler from "./DataHandler";
import FilterSupplyOrder from "./FilterTable";
import ResultSupplyOrder from "./ResultTable";
import AddIcon from "@material-ui/icons/Add";

import { SAMPLE_ORDER } from "../../../utils/constants";
import { useState } from "react";
import SupplyOrderForm from "./SupplyOrderForm";
import EditFunction from "./EditFunction";
import ActionsFunction from "../../../Common/components/inventorySystem/ActionsFunction";

const Transaction = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isSupplyFormModal, setIsSupplyFormModal] = useState(false);
  const [item, setItem] = useState(undefined);
  const createSupplyFormHandler = (data) => {
    setItem(data);
    setIsSupplyFormModal(true);
  }
  const closeSupplyModalHandler = () => {

    
    setIsSupplyFormModal(false);
  }
  useEffect(() => {

    const source = SAMPLE_ORDER;
    const cols = DataHandler.columns().map((col, index) => {
      if (col.name === 'edit') {
        return {
          ...col,
          editable: () => false,
						render: (cellProps) =>   <ActionsFunction createSupplyFormHandler={createSupplyFormHandler} data={{...cellProps.data}} />
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
    }, [props.data]);
    return (
      <React.Fragment>
        <Grid container spacing={24} justify="space-between" style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
          <Grid item xs={12}>

            <Typography variant="h3">Supply Order Transaction</Typography>
            <br />
          </Grid>
          <Grid item xs={12}>
            <FilterSupplyOrder />
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

          <Grid container item xs={12} style={{ paddingBottom: 10 }}>
            <Button
              onClick={() => createSupplyFormHandler()}
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
              CREATE SUPPLY ORDER
            </Button>
          </Grid>
          <Grid item xs={12}>

            <ResultSupplyOrder columns={columns} dataSource={dataSource} />
          </Grid>
        </Grid>
        {isSupplyFormModal &&
          <SupplyOrderForm isOpen={isSupplyFormModal} isEdit={false} item={item} onClose={closeSupplyModalHandler} />
        }
      </React.Fragment>
    )
  }
export default Transaction;