import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./vendor.module.css";
import ReactModal from "react-modal";
import { Button, Grid, Typography } from "@material-ui/core";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import { SUPPLY_PAYMENT_METHOD, SUPPLY_STATUS, SUPPLY_VENDOR } from "../../../utils/constants";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

function Form(props) {
    const [generalForm, setGeneralForm] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);
    const { isOpen,
        onClose,

        isEdit } = props;

    const general = [
    
        {
            id: 'name',
            component: 'textfield',
            placeholder: 'Name',
            label: 'Name',
            name: 'name',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'website',
            component: 'textfield',
            placeholder: 'Website',
            label: 'Website',
            name: 'website',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        }, 
        {
            id: 'location',
            component: 'textfield',
            placeholder: 'Location',
            label: 'Location',
            name: 'location',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'contactPerson',
            component: 'textfield',
            placeholder: 'Contact Person',
            label: 'Contact Person',
            name: 'contactPerson',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'phone',
            component: 'textfield',
            placeholder: 'Phone',
            label: 'Phone',
            name: 'phone',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'fax',
            component: 'textfield',
            placeholder: 'Fax',
            label: 'Fax',
            name: 'fax',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'accountNumber',
            component: 'textfield',
            placeholder: 'Account Number',
            label: 'Account Number',
            name: 'accountNumber',
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
            setGeneralForm(generalFm);
            
            
            
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
                return 'View Invoice Statement'
          } else if (props.mode === 'edit') {
              return 'Edit Invoice Statement';
          } else {
              return 'Create Invoice Statement';
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




export default Form;
