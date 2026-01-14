// controllers/input.js
const { timelineElementsData } = require('../models/timeline_elements.js');
const { timelineAssociationTypesData } = require('../models/timeline_assoctaion_types.js');

class InputController {

    /**
     * Render the input page with form data
     */
    async showInputPage(req, res) {
        try {
            const elementsModel = new timelineElementsData();
            const assocTypesModel = new timelineAssociationTypesData();

            const [elements, associationTypes] = await Promise.all([
                elementsModel.getAllElements(),
                assocTypesModel.getAssociationTypes()
            ]);

            console.log("elements");
            console.log(elements);

            res.render('input', {
                title: 'Add Timeline Data',
                elements: elements || [],
                associationTypes: associationTypes || [],
                success: req.session.inputSuccess || null,
                error: req.session.inputError || null
            });

            delete req.session.inputSuccess;
            delete req.session.inputError;

        } catch (error) {
            console.error('Input page error:', error);
            res.render('input', {
                title: 'Add Timeline Data',
                elements: [],
                associationTypes: [],
                success: null,
                error: 'Failed to load form data'
            });
        }
    }

    /**
     * Handle new timeline element creation
     */
    async createTimelineElement(req, res) {
        const { name, start_date, end_date } = req.body;

        if (!name || !start_date) {
            req.session.inputError = 'Name and start date are required';
            return res.redirect('/input');
        }

        try {
            const startTimestamp = Math.floor(new Date(start_date).getTime() / 1000);
            const endTimestamp = end_date ? Math.floor(new Date(end_date).getTime() / 1000) : null;

            const sql = `INSERT INTO timeline_element (name, start_date, end_date) VALUES (?, ?, ?)`;
            await Database.runQuery(sql, [name, startTimestamp, endTimestamp]);

            req.session.inputSuccess = `Timeline element "${name}" created successfully`;
            res.redirect('/input');

        } catch (error) {
            console.error('Create element error:', error);
            req.session.inputError = 'Failed to create timeline element';
            res.redirect('/input');
        }
    }

    /**
     * Handle new association creation
     */
    async createAssociation(req, res) {
        const { parent_id, element_id, association_type_id, start_date, end_date } = req.body;

        if (!parent_id || !element_id || !association_type_id) {
            req.session.inputError = 'Parent, element, and association type are required';
            return res.redirect('/input');
        }

        try {
            const startTimestamp = start_date ? Math.floor(new Date(start_date).getTime() / 1000) : null;
            const endTimestamp = end_date ? Math.floor(new Date(end_date).getTime() / 1000) : null;

            const sql = `INSERT INTO element_association
                         (parent_id, element_id, association_type_id, start_date, end_date)
                         VALUES (?, ?, ?, ?, ?)`;
            await Database.runQuery(sql, [parent_id, element_id, association_type_id, startTimestamp, endTimestamp]);

            req.session.inputSuccess = 'Association created successfully';
            res.redirect('/input');

        } catch (error) {
            console.error('Create association error:', error);
            req.session.inputError = 'Failed to create association';
            res.redirect('/input');
        }
    }
}

module.exports = {
    InputController
};