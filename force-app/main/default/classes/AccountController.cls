public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsByName(String searchName){
        String searchTermWithWildCard = '%' + searchName + '%';
        return [SELECT Id, Name, Type, Industry, Phone FROM Account WHERE Name LIKE: searchTermWithWildCard LIMIT 10];
    }
}