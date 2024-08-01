trigger oppLineItemTrigger on OpportunityLineItem (after insert, after update, after delete, after undelete) {
	if (Trigger.isAfter) {
        if (Trigger.isInsert || Trigger.isUpdate || Trigger.isDelete || Trigger.isUndelete) {
            oppLineItemTriggerHandler.handleOppLineItems(Trigger.new, Trigger.oldMap);
        }
    }
}