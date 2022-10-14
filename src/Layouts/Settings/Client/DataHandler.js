
class DataHandler {
  static columns() {
    return [
      { width: 120, name: 'edit', header: 'EDIT' },
      { defaultFlex: 1, minWidth: 120, name: 'name', header: 'Name' },
      { defaultFlex: 1, minWidth: 200, name: 'dob', header: 'Date of Birth' },
      { defaultFlex: 1, minWidth: 200, name: 'gender', header: 'Gender' },
      { defaultFlex: 1, minWidth: 200, name: 'evaluator', header: 'Evaluator/Assess' },
      { defaultFlex: 1, minWidth: 200, name: 'admittedDt', header: 'Date Admitted' },
      { defaultFlex: 1, minWidth: 200, name: 'status', header: 'Status' },
      
     
    
     
    ]
  }
  static mapData(items, lang) {
  return items;
  }
}
 
export default DataHandler;
