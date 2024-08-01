trigger opportunityTrigger on Opportunity (after insert, after update, after delete, after undelete) {
	if (Trigger.isAfter) {
        if (Trigger.isInsert || Trigger.isUpdate || Trigger.isUndelete) {
            oppTriggerHandler.handleOppCount(Trigger.new, Trigger.oldMap);
        }
    }
}