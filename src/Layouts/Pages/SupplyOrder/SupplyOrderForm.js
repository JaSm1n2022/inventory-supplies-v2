import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./supply.module.css";
import ReactModal from "react-modal";
import { Grid } from "@material-ui/core";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import { DEFAULT_ERROR, QUANTITY_UOM, SUPPLY_CATEGORY, SUPPLY_PAYMENT_METHOD, SUPPLY_STATUS, SUPPLY_VENDOR } from "../../../utils/constants";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import moment from "moment";

let categoryList = [];
let uoms = [];
let vendors = [];
let statuses = [];
let cards = [];
SUPPLY_PAYMENT_METHOD.forEach((item, index) => {
    cards.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'payment'

    })
});
SUPPLY_STATUS.forEach((item, index) => {
    statuses.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'status'

    })
});
SUPPLY_VENDOR.forEach((item, index) => {
    vendors.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'vendor'

    })
});

QUANTITY_UOM.forEach((item, index) => {
    uoms.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'uoms'

    })
});
SUPPLY_CATEGORY.forEach((item, index) => {
    categoryList.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'category'

    })
});


function SupplyOrderForm(props) {
    const [form, setForm] = useState({});
   
    const { isOpen,
        onClose,

        isEdit } = props;

    const forms = [
        {
            id: 'orderPlaced',
            component: 'datepicker',
            placeholder: 'Order Placed',
            label: 'Order Placed',
            name: 'orderPlaced',
            type:'string'
        },
        {
            id: 'orderNumber',
            component: 'textfield',
            placeholder: 'Order Number',
            label: 'Order Number',
            name: 'orderNumber',
            type:'string'
        },
        {
            id: 'productCd',
            component: 'textfield',
            placeholder: 'Product Code',
            label: 'Product Code',
            name: 'productCd',
            type:'string'
        },
        {
            id: 'category',
            component: 'singlecomplete',
            placeholder: 'Category',
            label: 'Category',
            name: 'category',
            options:categoryList
        },
        {
            id: 'items',
            component: 'textfield',
            placeholder: 'Items',
            label: 'Items',
            name: 'items',
            type:'string'
        },
        {
            id: 'description',
            component: 'textfield',
            placeholder: 'Description',
            label: 'Description',
            name: 'description',
            type:'string'
        },
        {
            id: 'qty',
            component: 'textfield',
            placeholder: 'Qty',
            label: 'Qty',
            name: 'qty',
            type:'number'
        },
        {
            id: 'qtyUom',
            component: 'singlecomplete',
            placeholder: 'Qty Uom',
            label: 'Qty Uom',
            name: 'qtyUom',
            options:uoms
        },
        {
            id: 'unitPiece',
            component: 'textfield',
            placeholder: 'Unit/Piece',
            label: 'Unit/Piece',
            name: 'unitPiece',
            type:'number'
        },
        {
            id: 'totalUnitPiece',
            component: 'textfield',
            placeholder: 'Total Unit/Piece',
            label: 'Total Unit/Piece',
            name: 'totalUnitPiece',
            type : 'number',
            disabled:true
        },
        {
            id: 'vendor',
            component: 'singlecomplete',
            placeholder: 'Vendor',
            label: 'Vendor',
            name: 'vendor',
            options:vendors
        },
        {
            id: 'unitPrice',
            component: 'textfield',
            placeholder: 'Unit Price',
            label: 'Unit Price',
            name: 'unitPrice',
            type: 'number'
        },
        {
            id: 'totalPrice',
            component: 'textfield',
            placeholder: 'Total Price',
            label: 'Total Price',
            name: 'totalPrice',
            type:'number',
            disabled:true
        },
        {
            id: 'pricePerPcs',
            component: 'textfield',
            placeholder: 'Price Per Pcs',
            label: 'Price Per Pcs',
            name: 'pricePerPcs',
            type: 'number',
            disabled:true
        },
        {
            id: 'status',
            component: 'singlecomplete',
            placeholder: 'Status',
            label: 'Status',
            name: 'status',
            options:statuses
        },
        {
            id: 'dateDelivered',
            component: 'datepicker',
            placeholder: 'Date Delivered',
            label: 'Date Delivered',
            name: 'dateDelivered'
        },
        {
            id: 'paymentMethod',
            component: 'singlecomplete',
            placeholder: 'Payment Method',
            label: 'Payment Method',
            name: 'paymentMethod',
            options: cards
        },
        {
            id: 'paymentInfo',
            component: 'textfield',
            placeholder: 'Payment Info',
            label: 'Payment Info',
            name: 'paymentInfo'
        },
        {
            id: 'cardTransaction',
            component: 'datepicker',
            placeholder: 'Card Transaction',
            label: 'Card Transaction',
            name: 'cardTransaction'
        },




    ]
    const actions = [
        {
            id: "Submit",
            value: "Submit",
            description: isEdit ? "Edit Existing" : "Select Existing Group Area",
            category: 'area'
        },
        {
            id: "NEW",
            value: "New",
            description: "Create",
            category: 'area'
        },
    ]
    useEffect(() => {
      const fm = {};
      fm.totalUnitPiece = 0.0;
      fm.totalPrice = 0.0;
      fm.pricePerPcs = 0.0;
      fm.totalUnitPiece = 0.0;

      setForm(fm);
    },[]);

    useEffect(() => {
        if(props.item) {
            console.log('[items]',props.item);
            const fm = {...props.item};
            fm.category = categoryList.find(f => f.name === fm.category);
            fm.status = statuses.find(f => f.name === fm.status);
            fm.vendor = vendors.find(f => f.name === fm.vendor);
            fm.qtyUom = uoms.find(f => f.name === fm.qtyUom);
            fm.orderPlaced = fm.orderPlaced;
            fm.paymentMethod = cards.find(f => f.name === fm.paymentMethod);
            setForm(fm);
        } 
        
    }, [props.item]);
    const validateFormHandler = () => {
        console.log('[forms]', form);
    }
    const footerActions = [
        {
            title: props.distribution ? "Apply" : "Save",
            type: "primary",
            event: "submit",
            callback: () => {
                validateFormHandler();
            },
        },
        {
            title: "Cancel",
            type: "default",
            event: "cancel",
            callback: () => {
                props.onClose();
            },
        },
    ];
    const inputHandler = ({ target }) => {

        const source = { ...form };
        source[target.name] = target.value;
        if((target.name === 'qty' || target.name === 'unitPiece') && source['qty'] && source['unitPiece']) {
            source['totalUnitPiece'] = parseFloat(parseFloat(source['unitPiece']) * parseFloat(source['qty'])).toFixed(2);
            source['totalPrice'] = parseFloat(parseFloat(source['qty']) * parseFloat(source['unitPrice'] || 1.0)).toFixed(2);
            source['pricePerPcs'] = parseFloat(parseFloat(source['unitPrice']) / parseFloat(source['unitPiece'] || 1.0)).toFixed(2);
        }  else if ((target.name === 'unitPrice' || target.name === 'unitPiece')  && source['unitPiece'] && source['unitPrice']) {
            source['pricePerPcs'] = parseFloat(parseFloat(source['unitPrice']) / parseFloat(source['unitPiece'] || 1.0)).toFixed(2);
        }
        setForm(source);

    };
    const autoCompleteInputHander = (item, source) => {
        const src = { ...form };
        src[item.name] = item;
        setForm(src);
        
    }
    const onChangeInputHandler = (e) => {
        const src = { ...form };
        if (!e.target.value) {
            src[e.target.name] = { name: '', label: '' };
            setForm(src);
        }
    }
    const dateInputHandler = (value, name) => {
        const src = { ...form };
        src[name] = value;
        setForm(src);
      }
    console.log('[fmt]',form);
    return (
        <ReactModal
            style={{
                overlay: {
                    zIndex: 999,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.65)'
                },
                content: {
                    position: 'absolute',
                    top: '0',
                    bottom: '0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: '0',
                    left: '0',
                    overflow: 'none',
                    WebkitOverflowScrolling: 'touch',
                    border: 'none',
                    padding: '0px',
                    background: 'none'
                }
            }}
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
        >
            <div className={styles.supplyForm}>
                <ModalHeader title={'Supply Order Form'} onClose={onClose} />
                <div className={styles.content}>
                    <Grid container spacing={1} direction="row">
                        {forms.map(item => {
                            return (
                                <Grid item xs={4}>
                                    {item.component === 'textfield' ?
                                        <React.Fragment>
                                            <RegularTextField {...item} value={form[item.name]} onChange={inputHandler} />
                                        </React.Fragment>
                                        : item.component === 'datepicker' ?
                                            <React.Fragment>
                                                 <RegularDatePicker  {...item} value={form[item.name]} onChange={dateInputHandler} />
                                            </React.Fragment>
                                            : item.component === 'singlecomplete' ?
                                                <React.Fragment>
                                                    <SingleWithClearAutoComplete
                                                        {...item}
                                                        value={form[item.name]}
                                                        onSelectHandler={autoCompleteInputHander}
                                                        onChangeHandler={onChangeInputHandler}
                                                        />
                                                </React.Fragment>
                                                : item.component === 'select' ?
                                                    <React.Fragment>
                                                        <RegularSelect 	{...item} 

                                                            onChange={inputHandler}
                                                            value={form[item.value]}
                                                        />
                                                    </React.Fragment>
                                                    : null
                                    }
                                </Grid>
                            )
                        })}
                    </Grid>


                </div>
                <br />

                <ModalFooter actions={footerActions} />
            </div>
        </ReactModal >

    );
};




export default SupplyOrderForm;
