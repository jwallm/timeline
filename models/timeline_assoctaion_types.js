class timelineAssociationTypesData{

    constructor(element_id) {
        this.element_id = element_id;
    }

    async getAssociationTypes(element_id) {
        if (!this.element_id) this.element_id = element_id;
        var element_sql = "SELECT * FROM association_type";
        return Database.runQuery(element_sql, []);
    }
    //TODO: insert association type

}
module.exports = {
    timelineAssociationTypesData
};