public class oppTriggerHandler {
    public static void handleOppCount(List<Opportunity> newOpps, Map<Id, Opportunity> oldMap){
        set<Id> accIds = new Set<Id>();
        
        for(Opportunity opp: newOpps){
            accIds.add(opp.AccountId);
        }
        
        Map<Id, Integer> accountOppCountMap = new Map<Id, Integer>();
        for (AggregateResult result : [SELECT AccountId, COUNT(Id) oppCount FROM Opportunity WHERE AccountId IN :accIds GROUP BY AccountId]) {
            Id accId = (Id)result.get('AccountId');
            Integer oppCount = (Integer)result.get('oppCount');
            accountOppCountMap.put(accId, oppCount);
        }
        
        List<Account> accountsToUpdate = new List<Account>();
        for (Id accId : accountOppCountMap.keySet()) {
            Account acc = new Account(Id = accId);
            acc.NumberOfOpps__c = accountOppCountMap.get(accId);
            accountsToUpdate.add(acc);
        }
        update accountsToUpdate;
    } 
}