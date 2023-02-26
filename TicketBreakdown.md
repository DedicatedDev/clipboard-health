# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
1. Create a database migration for the Agents table. Add a column for `assigned_id` that accepts text and should be unique for each agent and can be nullable on creation.
- Acceptance Criteria: The Agents table should have the assigned_id column and can accept text.
- Time/Effort Estimate: 1 point
2. **[Depends on Task 1]** Create an update function `updateAgentAssignedIds` that is called with a Facility's id and a map of Agent's id to custom id to update the `assigned_id` field in Agents table.
- Acceptance Criteria: A Facility should be able to update one or more Agents with custom ids in the `assigned_id` column of the Agent table.
- Time/Effort Estimate: 1 point
3. **[Depends on Task 2]** Update `getShiftsByFacility` function to include the `assigned_id` field in Agent metadata, if all Agents for the facility have an `assigned_id`, replace the database generated id for each Agent in the metadata with their `assigned_id`.
- Acceptance Criteria: The `generateReport` function should produce a PDF file that includes custom id for all their Agents with `assigned_id` values in the Agents Table.
- Time/Effort Estimate: 2 points