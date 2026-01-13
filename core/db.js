let mysql = require('mysql2');
class DB {

    constructor() {
        this.connectToDatabase();
    }

    connectToDatabase()  {
        //this.connection = mysql.createConnection({
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        return this.connection;
        /*this.connection.connect((err) => {
            if (err) return console.error(err.message);
            console.log('Connected to the MySQL server.');
            return this.connection;
        });*/
    }

    async runQuery(sql, params = [true], timeoutMs = 5000) {
        return  Promise.race([
            new Promise((resolve, reject) =>{
                this.connection.query(sql, params, (error, results, fields)=> {
                    if(error){
                        reject("SQL error: "+error);
                    }else{
                        resolve(results);
                    }
                });
            }),
            new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Query timeout')), timeoutMs);
            })
        ]);

    }

    disconnectDatabase(){
        console.log("trying to stop DB");
        this.connection.end((err) => {
            if (err) return console.error(err.message);
            console.log('Closed the database connection.');
        });
    }
}


module.exports = {
    DB
};