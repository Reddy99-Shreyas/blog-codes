/* eslint-disable eqeqeq */
import { LightningElement, track } from "lwc";
import getAccounts from "@salesforce/apex/AccountController.getAccounts";

const columns = [
  { label: "Id", fieldName: "Id", type: "text" },
  { label: "Name", fieldName: "Name", type: "text" },
  { label: "Rating", fieldName: "Rating", type: "text" },
  { label: "Phone", fieldName: "Phone", type: "phone" }
];

export default class LazyLoading extends LightningElement {
  accountList = [];
  error;
  columns = columns;
  limit = 15;
  offset = 0;
  @track isInfinateLoadingEnabled = false;

  connectedCallback() {
    this.loadData();
  }

  loadData() {
    return getAccounts({ limitSize: this.limit, offSet: this.offset })
      .then((result) => {
        let updatedRecords = [...this.accountList, ...result];
        this.accountList = updatedRecords;
        this.isInfinateLoadingEnabled =
          result.length == this.limit || result.length != 0;
        this.error = undefined;
      })
      .catch((error) => {
        this.error = error;
        this.accountList = undefined;
      });
  }

  loadMoreData(event) {
    const currentRecord = this.accountList;
    const { target } = event;
    target.isLoading = true;

    this.offset = this.offset + this.limit;
    this.loadData().then(() => {
      target.isLoading = false;
    });
  }
}
