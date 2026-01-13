const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const hostname = '127.0.0.1';
const port = 9000;
const DB_CLASS = require("./core/db.js");
const timeline_class = require("./controllers/timeline.js");
const fetch_url = 'http://127.0.0.1:9000/get_timeline';

Database = new DB_CLASS.DB;


new Promise((resolve, reject)=>{

    app.use(express.static('views'));
    //app.use(express.static(path.join(__dirname, "public")));
    //app.use(express.static('./'));


    app.get('/', (req, res) => {
        let request_url = fetch_url;
        if(req.query.element_id){
            request_url=fetch_url+"?element_id="+req.query.element_id;
        }
        if(req.query.tl_width){
            tl_width=req.query.tl_width;
        }else{
            tl_width = '100%';
        }
        if(req.query.offset_element){
            offset_element=req.query.offset_element;
        }else{
            offset_element = -1;
        }

        const min_child_width = 180;

        res.render('index', {
            title: "timeline",
            mid_content: 'Hello yall',
            fetch_url : request_url,
            tl_width: tl_width,
            offset_element: offset_element,
            min_child_width: min_child_width
        });
    });


    app.get('/2', (req, res) => {
        let request_url = fetch_url;
        if(req.query.element_id){
            request_url=fetch_url+"?element_id="+req.query.element_id;
        }
        if(req.query.tl_width){
            tl_width=req.query.tl_width;
        }else{
            tl_width = '100%';
        }
        if(req.query.offset_element){
            offset_element=req.query.offset_element;
        }else{
            offset_element = -1;
        }
        if(req.query.detail){
            show_detail=req.query.detail;
        }else{
            show_detail = false;
        }

        const min_child_width = 180;
        const fs = require('fs');
        res.render('index2', {
            title: "timeline 2",
            mid_content: 'Hello yall',
            fetch_url : request_url,
            tl_width: tl_width,
            offset_element: offset_element,
            show_detail: show_detail,
            min_child_width: min_child_width,
            line_js: fs.readFileSync('./views/js/html-line.js').toString()
        });
    });


    app.get('/edit', (req, res) => {
        if(req.query.element_id){
            element_id=req.query.element_id;
        }else{
            element_id = 0;
        }
        timelineElementsClass = new timelineElements.timelineElements;
        timelineelementsData = timelineElementsClass.getElements();
        timelineAssociationTypes = new timelineAssociationTypes.timelineElements;
        timelineelementsData = timelineElements.getElements();

        res.render('edit', {
            title: "Edit or Add timeline element",
            element_id: element_id,
            tl_elements: timelineelementsData,
            association_type: association_types
        });
    });


    app.get('/insert', (req, res) => {
        let request_url = fetch_url;
        if(req.query.element_id){
            request_url=fetch_url+"?element_id="+req.query.element_id;
        }
        //return all clear or error json
    });

    app.get('/get_timeline',(req,res)=>{
        Timeline = new timeline_class.timeline;
        Timeline.getTLJson((data)=>{
            res.json({
                data: data
            });
        },req.query.element_id);
    });

    app.listen(port,hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
       // console.log(app);
    });

}).then(()=>{
    console.log("after final promise");
   // Database.disconnectDatabase();
}).catch((errors)=>{
    console.log(errors);
});