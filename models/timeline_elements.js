class timelineElementsData{

    constructor() {
        this.element_id = element_id;
    }

    async getAllElements() {
        var element_sql = "SELECT * FROM timeline_element";
        return Database.runQuery(element_sql, []);
    }
    //TODO: insert time line element
    //TODO: edit time line element

}
module.exports = {
    timelineElementsData
};