
class DataHandler {
  static columns() {
    return [
      { width: 120, name: 'edit', header: 'EDIT' },
      { defaultFlex: 1, minWidth: 120, name: 'recordDate', header: 'Record Date' },
      { defaultFlex: 1, minWidth: 200, name: 'patient', header: 'Patient Name' },
      { defaultFlex: 1, minWidth: 200, name: 'facility', header: 'Facility/POS' },
      { defaultFlex: 1, minWidth: 200, name: 'requestor', header: 'Requested By' },
      { defaultFlex: 1, minWidth: 200, name: 'caregiver', header: 'Patient Caregiver' },
      { defaultFlex: 1, minWidth: 120, name: 'status', header: 'Status' },
   
      { defaultFlex: 1, minWidth: 120, name: 'details', header: 'View Items' },
     
    ]
  }
  static mapData(items, lang) {
  return items;
  }
}
 
export default DataHandler;
