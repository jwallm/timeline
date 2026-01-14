class timelineElementsData{

    constructor(element_id) {
        this.element_id = element_id;
    }

    async getAllElements() {
        var element_sql = "SELECT * FROM timeline_element ORDER BY name";
        return Database.runQuery(element_sql, []);
    }
    //TODO: insert time line element
    //TODO: edit time line element

}
module.exports = {
    timelineElementsData
};