import { Component, OnInit } from '@angular/core';
import { TreeTableData, TreeTableHeaderObject, TreeTableRow } from 'angular-tree-table';

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
    showExpandAllArrows: true // Expand all button
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
      const row = new TreeTableRow(i + '', { sno: i+1, name: 'John '+(i+1), age: i+1}, false, new TreeTableData);
      if (i % 10 !== 0) {
        row.expandable = true;
        const subTableData = new TreeTableData(this.tableConfig); //We can add new config object if required
        const subData = [];
        for (let j = 0; j < (10 - i % 10); j++) {
          const subRow = new TreeTableRow(j + '', { sno: j + 1, name: 'Paul ' + (j + 1), age: j + 1}, false, new TreeTableData);
          subData.push(subRow);
        }
        subTableData.headers = this.tableHeaders; //Using the same headers as parent table, we can use separate if required
        subTableData.data = subData;
        row.children = subTableData;
      }
      data.push(row);
    }
    this.tableData = new TreeTableData(this.tableConfig);
    this.populateHeaders();
    this.tableData.data = data;
  }
  
  populateHeaders() {
    this.tableHeaders.splice(0, this.tableHeaders.length);
    this.tableHeaders.push(new TreeTableHeaderObject('Sno', 'sno', "text-danger", true));
    this.tableHeaders.push(new TreeTableHeaderObject('Name', 'name', "", true));
    this.tableHeaders.push(new TreeTableHeaderObject('Age', 'age', "", true));
    this.tableHeaders.push(new TreeTableHeaderObject('User Details', '=CONCAT(Name: |||name|||<br/>|||Age: |||age)', "", true));
    // this.tableHeaders.push(new TreeTableHeaderObject('D.no', 'address.dno', "", true));
    this.tableData.headers = this.tableHeaders;
  }
}
