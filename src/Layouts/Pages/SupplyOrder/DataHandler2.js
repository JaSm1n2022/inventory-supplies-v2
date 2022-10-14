
class DataHandler {
  static columns() {
    return [
      { defaultFlex: 1, minWidth: 100, name: 'edit', header: 'EDIT' },
      { defaultFlex: 1, minWidth: 200, name: 'orderPlaced', header: 'Order Placed' },
      { defaultFlex: 1, minWidth: 200, name: 'orderNumber', header: 'Order Number' },
      { defaultFlex: 1, minWidth: 200, name: 'productCd', header: 'Product Code' },
      { defaultFlex: 1, minWidth: 200, name: 'category', header: 'Category' },
      { defaultFlex: 1, minWidth: 200, name: 'items', header: 'Items' },
      { defaultFlex: 1, minWidth: 200, name: 'description', header: 'Description' },
      { defaultFlex: 1, minWidth: 100, name: 'qty', header: 'Qty' },
      { defaultFlex: 1, minWidth: 150, name: 'qtyUom', header: 'Qty Uom' },
      { defaultFlex: 1, minWidth: 200, name: 'unitPiece', header: 'Unit Price' },
      { defaultFlex: 1, minWidth: 200, name: 'totalPrice', header: 'Total Unit/Piece' },
      { defaultFlex: 1, minWidth: 200, name: 'vendor', header: 'Vendor' },
      { defaultFlex: 1, minWidth: 150, name: 'unitPrice', header: 'Unit Price' },
    { defaultFlex: 1, minWidth: 150, name: 'totalPrice', header: 'Total Price' },
      { defaultFlex: 1, minWidth: 150, name: 'pricePerPcs', header: 'Price per Pcs' },
      { defaultFlex: 1, minWidth: 150, name: 'status', header: 'Status' },
      { defaultFlex: 1, minWidth: 150, name: 'dateDelivered', header: 'Date Delivered' },
      { defaultFlex: 1, minWidth: 150, name: 'paymentMethod', header: 'Payment Method' },
      { defaultFlex: 1, minWidth: 150, name: 'paymentInfo', header: 'Payment Info' },
      { defaultFlex: 1, minWidth: 230, name: 'cardTransaction', header: 'Card Transaction' }
 
    ]
  }
  static mapData(items, lang) {
  return items;
  }
}
 
export default DataHandler;
