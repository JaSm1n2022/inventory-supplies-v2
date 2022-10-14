
class DataHandler {
  static columns() {
    return [
      { width: 120, name: 'edit', header: 'EDIT' },
      { defaultFlex: 1, minWidth: 120, name: 'name', header: 'Name' },
      { defaultFlex: 1, minWidth: 200, name: 'position', header: 'Position' },
      { defaultFlex: 1, minWidth: 200, name: 'status', header: 'Status' },
      { defaultFlex: 1, minWidth: 200, name: 'hired', header: 'Date hired' },
      { defaultFlex: 1, minWidth: 200, name: 'email', header: 'Email' },
      { defaultFlex: 1, minWidth: 200, name: 'phone', header: 'Contact Number' },
          
     
    
     
    ]
  }
  static mapData(items, lang) {
  return items;
  }
}
 
export default DataHandler;
