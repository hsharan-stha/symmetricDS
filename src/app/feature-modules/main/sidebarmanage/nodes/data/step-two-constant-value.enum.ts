export enum StepTwoConstantValue {
    CHECK_TOP_ONE = "All table",
    CHECK_TOP_TWO = "Select specific tables",
    CHECK_TOP_THREE = "All table for channel",

    CHECK_BOTTOM_FOUR = "Nothing just send data",
    CHECK_BOTTOM_FIVE = "Create table(s) or alter them to match the source",
    CHECK_BOTTOM_SIX = "Purge data into table(s), (initial load delete or delete all)",
    CHECK_BOTTOM_SEVEN = "Truncate the table(s)",
    CHECK_BOTTOM_EIGHT = "Run custom sql from each table",
}