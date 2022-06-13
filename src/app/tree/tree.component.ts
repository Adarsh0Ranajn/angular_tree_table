import { Component, Input, OnInit } from '@angular/core';
import { RouterEvent } from '@angular/router';
import { TreeTableData, TreeTableHeaderObject, TreeTableRow, TreeTableRowAction, TtDataType } from 'angular-tree-table';


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  tableData: TreeTableData = new TreeTableData(); //Table Data Holder
  // tableConfig = new TreeTableDataConfig(); //Table Configuration
  tableHeaders: TreeTableHeaderObject[] = []; //Table Headers and Property Binding

  tableConfig = {
    showExpandArrows: true, // Showing Arrows each possible row
    showExpandAllArrows: true, // Expand all button
    rowClickablesContext: null,
    rowClickables: {}
  };

  constructor() { }

  ngOnInit(): void {
    this.tableData = new TreeTableData(this.tableConfig);
    this.populateHeaders();
    this.populateDummyData();
  }
 
  populateDummyData() {
    const data = [];
    for (let i = 0; i < 120; i++) {
      

      const subTableData = new TreeTableData(this.tableConfig); //We can add new config object if required
      // if (i % 10 !== 0) {
        // row.expandable = true;
        const subData = [];
        for (let j = 0; j < (10 - i); j++) {
          const subRow = new TreeTableRow(j + '', { sno: j + 1, name: 'Paul ' + (j + 1), age: j + 1,}, false, new TreeTableData);
          subData.push(subRow);
        }
        subTableData.headers = this.tableHeaders; //Using the same headers as parent table, we can use separate if required
        subTableData.data = subData;
        // row.children = subTableData;
      // }

      const row = new TreeTableRow(i + '', { sno: i+1, name: 'John '+(i+1), age: i+1}, true, subTableData);
      const action = new TreeTableRowAction("info",'info',"btn btn-secondary", this.info);
      const removeAction = new TreeTableRowAction("delete",'delete',"btn btn-secondary",this.delete);
      removeAction.context = this;
      action.context=this;
      row.actions.push(action,removeAction);
      row.clickablesContext= this;
      row.clickables= {showData: this.show}
      data.push(row);
    }
    
    this.tableData.data = data;
  }
  
  populateHeaders() {
    this.tableHeaders.splice(0, this.tableHeaders.length);
    this.tableHeaders.push(new TreeTableHeaderObject('Sno', 'sno', "text-danger", true));
    this.tableHeaders.push(new TreeTableHeaderObject('Name', 'name', "", true));
    this.tableHeaders.push(new TreeTableHeaderObject('Age', 'age', "", true));
    this.tableHeaders.push(new TreeTableHeaderObject('User Details', '=CONCAT(Name: |||name|||<br/>|||Age: |||age)', "", true));
    this.tableHeaders.push(new TreeTableHeaderObject('show', 'showData', "", true));
    const actionHeader = new TreeTableHeaderObject('Action',"", "", true);
    actionHeader.dataType = TtDataType.ACTIONS;
    this.tableHeaders.push(actionHeader);
    
    //this.tableHeaders.push(new TreeTableHeaderObject('D.no', 'address.dno', "", true));
    this.tableData.headers = this.tableHeaders;
  }
  info(data: any){
    alert('action works')
    console.log(data)
  }
  delete(){
    alert('do ou really ena')
  }
  show(data : any){
    alert("Name "+data.name +" ,Age "+data.age)
  }
  
}


