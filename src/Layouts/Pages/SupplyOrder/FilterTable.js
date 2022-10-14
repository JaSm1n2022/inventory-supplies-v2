import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import { SEARCH_KEYWORDS, SUPPLY_STATUS } from "../../../utils/constants";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
let searchKeywordTypes = [];
SEARCH_KEYWORDS.forEach((item,i) => {
    searchKeywordTypes.push({
        id : i,
        name : item,
        value : item,
        label : item,
        category : 'keyword'
    })
})
let statuses = [];
SUPPLY_STATUS.forEach((item, index) => {
    statuses.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'status'

    })
});
const FilterSupplyOrder = (props) => {
    const [keywordType,setKeywordType] = useState('ALL');
    const [keywordValue, setKeywordValue] = useState('');
    const [status,setStatus] = useState({name:'',value:'',label:''})
    const inputHandler = ({ target }) => {

        switch (target.name) {
            case "keywordType":
                setKeywordType(target.value);
                
                return;
            case "keywordValue":
               setKeywordValue(target.value);
                return;
            default:
                return;
        }

    };
    const autoCompleteInputHander = (item, source) => {
        if (item.category === 'status') {
            setStatus(item);
            
        }
    }
    const onChangeInputHandler = (e) => {
        if (!e.target.value && e.target.name === 'status') {
           setStatus({name:'',value:'',label:''});
        }
    }
    return (
        <React.Fragment>
            <Grid container direction="row" spacing={1} xs={12}>
                    <Grid item xs={3}>
                    <RegularSelect
							options={searchKeywordTypes}
							name={'keywordType'}
							onChange={inputHandler}
							value={keywordType}
							label={'Search Type'}
							placeholder={'Search Type'}
						/>
                    </Grid>
                    <Grid item xs={3}>
                    <RegularTextField
                  height={40} size={12} onChange={inputHandler} placeholder={'Search Keyword'} name={'keywordValue'} value={keywordValue} />
                    </Grid>
                    <Grid item xs={3}>
                    <SingleWithClearAutoComplete
                                                        label={'Status'}
                                                        placeholder={'Status'}
                                                        value={status}
                                                        options={statuses}
                                                        onSelectHandler={autoCompleteInputHander}
                                                        onChangeHandler={onChangeInputHandler}
                                                        />
                                      </Grid>              
                    <Grid item xs={3}>
                       <div style={{display:'flex',gap:10}}>
                           <Button variant="contained" color="primary" style={{fontSize:14}}>Apply</Button>
                           <Button variant="contained" color="secondary" style={{fontSize:14}}>Clear</Button>
                       </div>
                    </Grid>
            </Grid>

        </React.Fragment>
    )
}
export default FilterSupplyOrder;