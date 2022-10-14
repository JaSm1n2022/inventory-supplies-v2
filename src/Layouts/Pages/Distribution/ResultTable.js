import React, { useCallback, useEffect, useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';



const DistributionTable = props => {
        const [columns,setColumns] = useState([]);
        const [dataSource,setDataSource] = useState([]);
        const [loading, setLoading] = useState(true);
        const [selected, setSelected] = useState({});
        useEffect(() => { 
          setColumns(props.columns);
          setDataSource(props.dataSource);
        }, [props]);
      
      
        useEffect(() => {
          setLoading(props.loading)
          // setReservedViewportWidth(null)
      
        }, [props.loading]);
     
        const onCellClick = useCallback((event, cellProps) => {
          event.stopPropagation();
        });
        const onRowClick = useCallback((rowProps, event) => {
          event.preventDefault();
          event.stopPropagation();
      
        });
        const onSelectionChange = useCallback(({ selected: selectedMap, data }) => {
          console.log('[selected]', selectedMap, data);
          if (JSON.stringify(selectedMap) === '{}') {
            // no selected
            props.onCheckboxSelectionHandler([], false);
          } else if (data && Array.isArray(data) && data.length > 1) {
            // is Mark as All
            setSelected(selectedMap);
            props.onCheckboxSelectionHandler(data, true)
          } else {
            // there is selection
            setSelected(selectedMap);
            props.onCheckboxSelectionHandler(Object.keys(selectedMap), false);
          }
      
        });
        // use to save it in storage and 
         
          return (
            <ReactDataGrid
              idProperty="id"
              columns={columns}
              dataSource={dataSource}
              style={{height:500}}
              editable={false}
              showColumnMenuTool={false}
              checkboxOnlyRowSelect={true}
              activateRowOnFocus={true}
              checkboxColumn={true}
              defaultLimit={100}
              loading={loading}
              selected={selected}
              onSelectionChange={onSelectionChange}
             // onColumnVisibleChange={props.onColumnVisibleChangeHandler}
              onRowClick={onRowClick}
              onCellClick={onCellClick}
              pagination  
            />
      
          )
        
        };
      
export default DistributionTable;
