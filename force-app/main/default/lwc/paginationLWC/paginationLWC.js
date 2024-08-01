import { api, LightningElement, track, wire } from "lwc";
import fetchAccount from "@salesforce/apex/PaginationCtrl.fetchAccount";
import recordCount from "@salesforce/apex/PaginationCtrl.recordCount";

const columns = [
  { label: "Name", fieldName: "Name" },
  { label: "Phone", fieldName: "Phone" },
  { label: "Fax", fieldName: "Fax" }
];

export default class PaginationLWC extends LightningElement {
  // Public properties
  @api recordsPerPage = 10;
  // Data table columns
  columns = columns;
  // State variables
  @track accounts = [];
  @track showLoading = false;
  searchKey;
  @api lastId;
  @api firstId;
  @api buttonTypePrevious;
  @api buttonTypeNext;
  totalRecountCount = 0;
  totalPage = 0;
  pageNumber = 1;
  // Initialization when the component is connected
  connectedCallback() {
      this.getRecords();
  }
  // Wire service to retrieve the total record count
  @wire(recordCount)
  wiredAccounts({ error, data }) {
      if (data) {
          // Update total record count and calculate total pages
          this.totalRecountCount = data;
          this.totalPage = Math.ceil(this.totalRecountCount / this.recordsPerPage);
          // Ensure pageNumber is within valid range
          if (this.pageNumber <= 1) {
              this.pageNumber = 1;
          } else if (this.pageNumber >= this.totalPage) {
              this.pageNumber = this.totalPage;
          }
      } else if (error) {
          this.error = error;
          this.data = undefined;
      }
  }
  // Disable the "Previous" button when on the first page
  get disablePrevious() {
      return this.pageNumber == 1;
  }
  // Disable the "Next" button when on the last page
  get disableNext() {
      return this.pageNumber == this.totalPage;
  }
  // Fetch records based on pagination parameters
  getRecords() {
      this.showLoading = true;
      fetchAccount({
          buttonTypePrevious: this.buttonTypePrevious,
          buttonTypeNext: this.buttonTypeNext,
          firstId: this.firstId,
          lastId: this.lastId,
          recordsLimit: this.recordsPerPage
      })
      .then(result => {
          // Update accounts data and pagination details
          this.accounts = result;
          this.firstId = result[0].Id;
          this.lastId = result[result.length - 1].Id;
          // Sort accounts if navigating to the previous page
          if (this.buttonTypePrevious === true) {
              this.accounts.sort((a, b) => (a.Id > b.Id) ? 1 : -1);
          }
          this.showLoading = false;
      })
      .catch(error => {
          this.showLoading = false;
          console.error('Error: ' + error.body.message);
      });
  }
  // Handle click on "Previous" button
  previousHandler() {
      if (this.pageNumber > 1) {
          this.pageNumber = this.pageNumber - 1;
          this.buttonTypePrevious = true;
          this.buttonTypeNext = false;
          this.getRecords();
      }
  }
  // Handle click on "Next" button
  nextHandler() {
      if ((this.pageNumber < this.totalPage) && this.pageNumber !== this.totalPage) {
          this.pageNumber = this.pageNumber + 1;
          this.buttonTypeNext = true;
          this.buttonTypePrevious = false;
          this.getRecords();
      }
  }
  // Handle search key input change
  handelSearchKey(event) {
      this.searchKey = event.target.value;
  }
  // Show all records by resetting pagination
  showAllRecords() {
      this.getRecords();
  }
}