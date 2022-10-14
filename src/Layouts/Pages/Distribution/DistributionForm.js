import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./stock.module.css";
import ReactModal from "react-modal";
import { Button, Grid, Typography } from "@material-ui/core";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import { DEFAULT_ERROR, DIVINE_EMPLOYEES, DIVINE_PATIENT_LIST, HOSPICE_FACILITIES, QUANTITY_UOM, SUPPLY_CATEGORY, SUPPLY_PAYMENT_METHOD, SUPPLY_STATUS, SUPPLY_VENDOR } from "../../../utils/constants";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
let uoms = [];
let patients = [];
let employees = [];
let facilities = [];
let statuses = [];
SUPPLY_STATUS.forEach((item, index) => {
    statuses.push({
        ...item,
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'status'

    });
});
HOSPICE_FACILITIES.forEach((item, index) => {
    facilities.push({
        ...item,
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'facility'

    });
});
DIVINE_EMPLOYEES.forEach((item, index) => {
    employees.push({
        ...item,
        id: index,
        name: item.name,
        value: item.name,
        label: item.name,
        category: 'employee'

    });
});

DIVINE_PATIENT_LIST.forEach((item, index) => {
    patients.push({
        ...item,
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'patient'

    });
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
function DistributionForm(props) {
    const [generalForm, setGeneralForm] = useState({});
    const [detailForm, setDetailForm] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const { isOpen,
        onClose,

        isEdit } = props;

    const general = [
        {
            id: 'recordDate',
            component: 'datepicker',
            placeholder: 'Record Date',
            label: 'Record Date',
            name: 'recordDate',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'patient',
            component: 'singlecomplete',
            placeholder: 'Patient Name',
            label: 'Patient Name',
            name: 'patient',
            options:patients,
            disabled: props.mode && props.mode === 'view' ? true : false
        },
        {
            id: 'facility',
            component: 'singlecomplete',
            placeholder: 'Facility/POS',
            label: 'Facility/POS',
            name: 'facility',
            options:facilities,
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
     
        {
            id: 'requestor',
            component: 'singlecomplete',
            placeholder: 'Requestor',
            label: 'Requestor',
            name: 'requestor',
            options: employees,
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'position',
            component: 'textfield',
            placeholder: 'Title',
            label: 'Title',
            name: 'position',
            value : '-',
            disabled: true
            
        },
        {
            id: 'caregiver',
            component: 'textfield',
            placeholder: 'Patient Caregiver',
            label: 'Patient Caregiver',
            name: 'caregiver',
            disabled: props.mode && props.mode === 'view' ? true : false
        },
        
        {
            id: 'status',
            component: 'singlecomplete',
            placeholder: 'Status',
            label: 'Status',
            name: 'status',
            options : statuses,
            disabled: props.mode && props.mode === 'view' ? true : false

        }
        
    ]

    const details = [
        {
            id: 'item',
            component: 'textfield',
            placeholder: 'Description',
            label: 'Description',
            name: 'item',
            type:'string',
            disabled: props.mode && props.mode === 'view' ? true : false
        },
        {
            id: 'qty',
            component: 'textfield',
            placeholder: 'Qty',
            label: 'Qty',
            name: 'qty',
            type: 'number',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'qtyUom',
            component: 'singlecomplete',
            placeholder: 'Qty Uom',
            label: 'Qty Uom',
            name: 'qtyUom',
            options: uoms,
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'pcs',
            component: 'textfield',
            placeholder: 'Pcs (count)',
            label: 'Pcs (count)',
            name: 'pcs',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
    ]
    useEffect(() => {
        const fm = {};
        fm.position = 'N/A';
        setGeneralForm(fm);
      },[]);
    useEffect(() => {
        if(props.item) {
            console.log('[items]',props.item);
            const generalFm = {...props.item};
            const detailFm = generalFm.details;
            
            setGeneralForm(generalFm);
            setDetailForm(detailFm);
            
            
        }
    }, [props.item]);
    const validateFormHandler = () => {
    
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
    const inputGeneralHandler = ({ target }) => {
        console.log('[Target]',target,generalForm);
        const source = { ...generalForm};
        source[target.name] = target.value;
        setGeneralForm(source);

    };
    const inputDetailHandler = ({ target },source) => {

        source[target.name] = target.value;
        setIsRefresh(!isRefresh);

    };
    const autoCompleteGeneralInputHander = (item) => {
        const src = { ...generalForm };
        console.log('[src]',src,item);
        if(item.category === 'employee') {
         src['requestor'] = item;
         src['position'] = item.position;
        } else if (item.category === 'facility') {
            src['requestor'] = item;
        } else if (item.category === 'patient') {
            src['patient'] = item;
        }
 
        setGeneralForm(src);
        
    }
    const autoCompleteDetailInputHander = (item, source) => {
        source['qtyUom'] = item;
        setIsRefresh(!isRefresh);
        
    }
    const onChangeGeneralInputHandler = (e) => {
        const src = { ...generalForm };
        if (!e.target.value) {
            src[e.target.name] = { name: '', label: '' };
            setGeneralForm(src);
        }
    }
    const onChangeDetailInputHandler = (e,source) => {
        if (!e.target.value) {
            source[e.target.name] = undefined;
            setIsRefresh(!isRefresh);
        }
    }
    const addItemHandler = () => {
       const records = [...detailForm];
       records.push({
            id : uuidv4(),
            item: '',
            qty : 0,
            qtyUom : '',
            pcs : 0
       });
       setDetailForm(records);
    }
    if(detailForm && detailForm.length === 0) {
        addItemHandler();
    }
    const deleteItemHandler = (item) => {
        const records = detailForm.filter(d => d.id.toString() !== item.id.toString());
        setDetailForm(records); 
    }
    const dateInputHandler = (value, name) => {
        const src = { ...generalForm };
        src[name] = value;
        setGeneralForm(src);
      }
      const titleHandler = () => {
          if(props.mode === 'view') {
                return 'View Supplies Delivery Record'
          } else if (props.mode === 'edit') {
              return 'Edit Supplies Delivery Record';
          } else {
              return 'Create Supplies Delivery Record';
          }
      }
      console.log('[general form]',generalForm,detailForm);
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
            <div className={styles.stockForm}>
                <ModalHeader title={titleHandler()} onClose={onClose} />
                <div className={styles.content}>
                <Typography variant="h4">General Information</Typography>
                    <Grid container spacing={1} direction="row">
                        {general.map(item => {
                            return (
                                <Grid item xs={4}>
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
                    <br />
                    <Typography variant="h4">Supplies</Typography>
                        {detailForm.map(item => {
                            return (
                                <Grid container spacing={1} direction="row">
                                <Grid item xs={1}>
                                    <Button disabled={props.mode && props.mode === 'view' ? true : false} onClick={() => deleteItemHandler(item)} variant="contained" color="secondary" style={{fontSize:14}}>Delete</Button>
                                </Grid>
                                <Grid item xs={5}>
                                       <RegularTextField disabled={props.mode && props.mode === 'view' ? true : false} source={item}  {...details.find(d => d.id === 'item')} value={item['item']} onChange={inputDetailHandler} />
                                </Grid>
                                 <Grid item xs={2}>
                                 <RegularTextField disabled={props.mode && props.mode === 'view' ? true : false} source={item}  {...details.find(d => d.id === 'qty')} value={item['qty']} onChange={inputDetailHandler} />
                                </Grid>
                                <Grid item xs={2}>
                                <SingleWithClearAutoComplete
                                disabled={props.mode && props.mode === 'view' ? true : false}
                                                       source={item} 
                                                        {...details.find(d => d.id === 'qtyUom')}
                                                        value={item['qtyUom']}
                                                        onSelectHandler={autoCompleteDetailInputHander}
                                                        onChangeHandler={onChangeDetailInputHandler}
                                                        options={uoms}
                                                        />
                                </Grid>
                                <Grid item xs={2}>
                                 <RegularTextField disabled={props.mode && props.mode === 'view' ? true : false} source={item}  {...details.find(d => d.id === 'pcs')} value={item['pcs']} onChange={inputDetailHandler} />
                                </Grid>
                                </Grid>
                            )
                        })}
                    
                    {details && details.length > 0 &&
                        <Button disabled={props.mode && props.mode === 'view' ? true : false} variant="outlined" color="primary" style={{fontSize:14}} onClick={() => addItemHandler()}>Add Item</Button>
}

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




export default DistributionForm;
