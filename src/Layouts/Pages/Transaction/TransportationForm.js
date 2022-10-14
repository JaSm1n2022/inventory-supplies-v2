import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./stock.module.css";
import ReactModal from "react-modal";
import {  Grid, Paper} from "@material-ui/core";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import {QUANTITY_UOM, SUPPLY_CATEGORY } from "../../../utils/constants";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import SearchLookupTextField from "../../../Common/components/TextField/SearchLookupTextField";

let categoryList = [];
let uoms = [];
QUANTITY_UOM.forEach((item, index) => {
    uoms.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'uom'

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
function TransportationForm(props) {
    const [generalForm, setGeneralForm] = useState({});
    const [searchItem,setSearchItem] = useState('');
    const { isOpen,
        onClose,

        isEdit } = props;

    const general = [
        {
            id: 'category',
            component: 'textfield',
            placeholder: 'Category',
            label: 'Category',
            name: 'category',
            //disabled: props.mode && props.mode === 'view' ? true : false,
            disabled: true,
            cols: 3
            
            
        },
        {
            id: 'item',
            component: 'textfield',
            placeholder: 'Item',
            label: 'Item',
            name: 'item',
            //disabled: props.mode && props.mode === 'view' ? true : false,
            disabled: true,
            cols: 3
            
            
        },
        {
            id: 'description',
            component: 'textfield',
            placeholder: 'Description',
            label: 'Description',
            name: 'description',
            disabled: true,
            cols : 3
        },
        {
            id: 'size',
            component: 'textfield',
            placeholder: 'Size',
            label: 'Size',
            name: 'size',
          
            disabled: true,

            
        },
        {
            id: 'dimension',
            component: 'textfield',
            placeholder: 'Dimension',
            label: 'Dimension',
            name: 'dimension',
          
            disabled: true,

            
        },

        {
            id: 'qtyOnHand',
            component: 'textfield',
            placeholder: 'Quantity On Hand',
            label: 'Qty on Hand',
            name: 'qtyOnHand',
            type: 'number',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
     
        {
            id: 'incomingQty',
            component: 'textfield',
            placeholder: 'Incoming Qty',
            label: 'Incoming Qty',
            name: 'incomingQty',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'projectedQty',
            component: 'textfield',
            placeholder: 'Projected Qty',
            label: 'Projected Qty',
            name: 'projectedQty',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'projectedDate',
            component: 'datepicker',
            placeholder: 'Projected Date',
            label: 'Projected Date',
            name: 'projectedDate',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
     
    ]

    
    useEffect(() => {
        console.log('[effects 1]');
        const fm = {};
        fm.created_at = new Date();
        fm.item = '-';
        fm.description='-';
        fm.size='-';
        fm.category='-';
        fm.dimension='-';
        setGeneralForm(fm);
      },[]);
    useEffect(() => {
        if(props.item) {
            console.log('[effects 2]');
            console.log('[items]',props.item);
            
            const generalFm = {...props.item};
            setGeneralForm(generalFm);
            
            
            
        }
    }, [props.item]);
    const validateFormHandler = () => {
        props.createStockHandler(generalForm,props.mode);
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
    const inputSearchHandler = (e) => {
        if (!e.target.value) {
            setSearchItem({name:'',value:''});
        };
    }
    const autoCompleteInputSearchHandler = (item) => {
        console.log('[Item]',item);
        setSearchItem(item);
        const fm = {...item};
        fm.item = fm.item;
        fm.description=fm.description;
        fm.size = fm.size;
        fm.dimension = fm.dimension;
        fm.productId = fm.id;
        fm.category = fm.category;
        setGeneralForm(fm);
    }
    const inputGeneralHandler = ({ target }) => {
        console.log('[Target]',target,generalForm);
        const source = { ...generalForm};
        source[target.name] = target.value;
        setGeneralForm(source);

    };
    const autoCompleteGeneralInputHander = (item) => {
        const src = { ...generalForm };
        console.log('[src]',src,item);
        if(item.category === 'category') {
         src['category'] = item;
         src['categoryName'] = item.name;
        }
        if(item.category === 'uom') {
            src['qtyUom'] = item;
            src['uom'] = item.name;
           }
        setGeneralForm(src);
        
    }
    const onChangeGeneralInputHandler = (e) => {
        const src = { ...generalForm };
        if (!e.target.value) {
            src[e.target.name] = { name: '', label: '' };
            setGeneralForm(src);
        }
    }
    
    
    const dateInputHandler = (value, name) => {
        const src = { ...generalForm };
        src[name] = value;
        setGeneralForm(src);
      }
      const titleHandler = () => {
          if(props.mode === 'view') {
                return 'View Stock'
          } else if (props.mode === 'edit') {
              return 'Edit Stock';
          } else {
              return 'Create Stock';
          }
      }
      console.log('[general form]',generalForm);
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
            <div className={styles.invoiceForm}>
                <ModalHeader title={titleHandler()} onClose={onClose} />
                <div className={styles.content}>
                    <Grid container spacing={1} direction="row">
                    <Grid item xs={9}>
                        <SingleWithClearAutoComplete
                                                     placeholder={'Search Item'}
                                                     label={'Search Item'}
                                                     name={'searchItem'}
                                                     options={props.productList||[]}
                                                     disabled={props.mode && props.mode === 'view' ? true : false}
                                                        value={searchItem}
                                                        onSelectHandler={autoCompleteInputSearchHandler}
                                                        onChangeHandler={inputSearchHandler}
                                                        />
                </Grid>
                <Grid item xs={12}></Grid>

                        {general.map(item => {
                            return (
                                <Grid item xs={item.cols ? item.cols : 3}>
                                    {item.component === 'textfield' ?
                                        <React.Fragment>
                                            <RegularTextField {...item} value={generalForm[item.name]} onChange={inputGeneralHandler} />
                                        </React.Fragment>
                                        : item.component === 'datepicker' ?
                                            <React.Fragment>
                                                 <RegularDatePicker {...item} value={generalForm[item.name]} onChange={dateInputHandler} />
                                            </React.Fragment>
                                            : item.component === 'singlecomplete' ?
                                                <React.Fragment>
                                                    <SingleWithClearAutoComplete
                                                        {...item}
                                                        value={generalForm[item.name]}
                                                        onSelectHandler={autoCompleteGeneralInputHander}
                                                        onChangeHandler={onChangeGeneralInputHandler}
                                                        />
                                                </React.Fragment>
                                                : item.component === 'select' ?
                                                    <React.Fragment>
                                                        <RegularSelect 	{...item} 

                                                            onChange={inputGeneralHandler}
                                                            value={generalForm[item.value]}
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
                {props.mode && props.mode === 'view' ?
                null : 
                <ModalFooter actions={footerActions} />
}   
            </div>
        </ReactModal >

    );
};




export default TransportationForm;
