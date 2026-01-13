require("../models/timeline.js");
const timeDiffCalculator = require("@ask-imon/time_diff_calc");
const timeDiffCalc = timeDiffCalculator.timeDiffCalc;
console.log(timeDiffCalc);
const {timelineData} = require("../models/timeline");
class timeline {

    constructor(element_id) {
        this.element_id = element_id;
    }

    async getTLElements(callback){
        callback(final_data);
    }

    async getTLJson(callback,element_id,time_interval,zoom){

            zoom = 1; //WHOLE
            time_interval = "year";
            if (!this.element_id && element_id) this.element_id = element_id;
            if(!element_id) return false;


            var gettimelineData = new timelineData(element_id);

            //All promises
            var main_element_promise = gettimelineData.getMainElement();
            var children_promise = gettimelineData.getChildren();

            await Promise.all(
                [
                    main_element_promise,
                    children_promise
                ]).then((tl_data) => {
                //console.log(tl_data);
                //return data
                //res.json({tl_data});


                let main_element = tl_data[0][0];
                let children = tl_data[1];
                main_element.duration =  main_element.end_date -  main_element.start_date;

                const main_start_date = new Date(main_element.start_date * 1000)
                main_element.start_rough_year = main_start_date.getFullYear();
                main_element.start_rough_month = main_start_date.getMonth();
                main_element.start_rough_day = main_start_date.getDay();

                main_element.start_render_year = main_element.start_rough_year;
                let loopmax = 10;
                while(loopmax > 0 && main_element.start_render_year % 5 != 0){
                    main_element.start_render_year --;
                    loopmax --;
                }

                const main_end_date = new Date(main_element.end_date * 1000)
                main_element.end_rough_year = main_end_date.getFullYear();
                main_element.end_rough_month = main_end_date.getMonth();
                main_element.end_rough_day = main_end_date.getDay();

                main_element.year_duration = timeDiffCalc(main_element.end_date * 1000,main_element.start_date * 1000, timeDiffCalculator.FormatTypes.YEAR)
                main_element.month_duration = timeDiffCalc(main_element.end_date * 1000,main_element.start_date * 1000, timeDiffCalculator.FormatTypes.MONTH)
                main_element.week_duration = timeDiffCalc(main_element.end_date * 1000,main_element.start_date * 1000, timeDiffCalculator.FormatTypes.WEEK)

                main_element.render_year_duration = main_element.end_rough_year - main_element.start_render_year;

                /*console.log("********************************");
                console.log(main_element);
                console.log(main_element.start_date);
                console.log("********************************");*/

                children.forEach((item, index, arr)=>{
                    if(!arr[index].association_end_date || arr[index].association_end_date > main_element.end_date) {
                        arr[index].association_end_date = main_element.end_date;
                    }
                    if(!arr[index].association_start_date || arr[index].association_start_date < main_element.start_date) {
                        arr[index].association_start_date = main_element.start_date;
                    }

                    let child_start_date = new Date(arr[index].association_start_date * 1000)
                    arr[index].association_start_year = child_start_date.getFullYear();
                    arr[index].association_start_month = parseFloat(child_start_date.getMonth()) ;
                    arr[index].association_start_day = child_start_date.getDay();
                    let child_end_date = new Date(arr[index].association_end_date * 1000)

                    arr[index].association_end_year = child_end_date.getFullYear();
                    arr[index].association_end_month = parseFloat( child_end_date.getMonth()) ;
                    arr[index].association_end_day = child_end_date.getDay();

                    arr[index].association_year_duration  = timeDiffCalc(arr[index].association_start_date * 1000, arr[index].association_end_date * 1000, timeDiffCalculator.FormatTypes.YEAR);
                    arr[index].association_month_duration = timeDiffCalc(arr[index].association_end_date * 1000, arr[index].association_start_date * 1000, timeDiffCalculator.FormatTypes.MONTH);
                    arr[index].association_week_duration  = timeDiffCalc(arr[index].association_end_date * 1000, arr[index].association_start_date * 1000, timeDiffCalculator.FormatTypes.WEEK);
                    //console.log("Child: "+index);
                    //console.log(arr[index]);
                });

                let final_data = {main:main_element,children:children};

                //console.log(final_data);
                callback(final_data);
                //console.log(tl_data);

                //TODO: Cache this result
                return tl_data;
            });

    }


}//end class
module.exports = {
    timeline
};