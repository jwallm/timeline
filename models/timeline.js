class timelineData{

    constructor(element_id) {
        this.element_id = element_id;
    }

    async getMainElement(element_id) {
        if (!this.element_id) this.element_id = element_id;
        var element_sql = "SELECT * FROM timeline_element WHERE id = ?"; //TODO: add left join tags
        return Database.runQuery(element_sql, [this.element_id]);
    }

    async getChildren(element_id){
        if (!this.element_id) this.element_id = element_id;
        var child_sql = ' SELECT  \n' +
            '\tel_assoc.start_date as association_start_date,\n' +
            '    el_assoc.end_date as association_end_date, \n' +
            '    associate.*,\n' +
            '    association_type.description as assocation_name\n' +
            '\tFROM element_association as el_assoc\n' +
            '     LEFT JOIN timeline_element as associate\n' +
            '\t\tON el_assoc.element_id = associate.id\n' +
            '\t LEFT JOIN association_type\n' +
            '\t\tON el_assoc.association_type_id = association_type.id\n' +
            '\tWHERE el_assoc.parent_id = ? \n'+
            '\tORDER BY el_assoc.start_date ASC';

        return Database.runQuery(child_sql, [this.element_id]);

    }


}
module.exports = {
    timelineData
};