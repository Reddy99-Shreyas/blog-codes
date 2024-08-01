public class oppLineItemTriggerHandler {
    public static void handleOppLineItems(List<OpportunityLineItem> newItems, Map<Id, OpportunityLineItem> oldItemsMap){
        Set<Id> opportunityIds = new Set<Id>();
        
        for (OpportunityLineItem item : newItems) {
            opportunityIds.add(item.OpportunityId);
        }
        
        List<Account> accountsToUpdate = new List<Account>();
        
        // Query the related Opportunities and count the OpportunityLineItems
        List<AggregateResult> oppLineItemCounts = [SELECT Opportunity.AccountId, COUNT(Id) oppLineItemCount 
                                                    FROM OpportunityLineItem 
                                                    WHERE OpportunityId IN :opportunityIds 
                                                    GROUP BY Opportunity.AccountId];
        
        // Update the Account records with the count of OpportunityLineItems
        for (AggregateResult result : oppLineItemCounts) {
            Id accId = (Id) result.get('AccountId');
            Integer lineItemCount = (Integer) result.get('oppLineItemCount');
            
            Account acc = new Account(Id = accId, OppLineItemCount__c = lineItemCount);
            accountsToUpdate.add(acc);
        }
        
        update accountsToUpdate;
    }
}