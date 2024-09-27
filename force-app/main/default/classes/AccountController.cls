public with sharing class AccountController {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccountsByName(String searchName) {
    String searchTermWithWildCard = '%' + searchName + '%';
    return [
      SELECT Id, Name, Type, Industry, Phone
      FROM Account
      WHERE Name LIKE :searchTermWithWildCard
      LIMIT 10
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Account> getAccounts(Integer limitSize, Integer offSet) {
    List<Account> accountList = [
      SELECT Id, Name, Rating, Phone
      FROM Account
      LIMIT :limitSize
      OFFSET :offSet
    ];

    return accountList;
  }
}
