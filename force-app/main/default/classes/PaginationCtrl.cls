public with sharing class PaginationCtrl {
  @AuraEnabled
  public static List<Account> fetchAccount(
    Boolean buttonTypePrevious,
    Boolean buttonTypeNext,
    String firstId,
    String lastId,
    Integer recordsLimit
  ) {
    List<Account> accountList = new List<Account>();
    if (buttonTypeNext == true) {
      // Fetch records with Id greater than the lastId
      accountList = [
        SELECT Id, Name, Phone, Fax, Site
        FROM Account
        WHERE Id > :lastId
        ORDER BY Id ASC
        LIMIT :recordsLimit
      ];
    } else if (buttonTypePrevious == true) {
      // Fetch records with Id less than the firstId
      accountList = [
        SELECT Id, Name, Phone, Fax, Site
        FROM Account
        WHERE Id < :firstId
        ORDER BY Id DESC
        LIMIT :recordsLimit
      ];
    } else {
      // Fetch the first page of records
      accountList = [
        SELECT Id, Name, Phone, Fax, Site
        FROM Account
        ORDER BY Id ASC
        LIMIT :recordsLimit
      ];
    }
    if (!accountList.isEmpty()) {
      return accountList;
    }
    return null;
  }
  @AuraEnabled(cacheable=true)
  public static Integer recordCount() {
    Integer countResult = [SELECT COUNT() FROM Account];
    System.debug('countResult => ' + countResult);
    return countResult;
  }
}