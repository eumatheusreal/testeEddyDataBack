import Database from "../database/index";

export default class FindRoute{

    constructor(app){
        this.app = app;
        this.database = new Database();
        this.connectDatabase();
    }

    async init(){
        this.findById();
        this.findByGender();
        this.findByBirthday();
    }

    async findById(){
        this.app.get("/find/id", async (req, res) => {
            
            const id = req.body.id;

            try {
                
                if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")
    
                let foundClient = await this.database.findById(id);
    
                if(foundClient == null) return res.status(500).send("Cannot complete your request. Try again later.")

                let jsonClient = foundClient.toJSON();

                if(jsonClient == null) return res.status(500).send("Cannot complete your request. Try again later.")
    
                return res.send(jsonClient);

            } catch (error) {
                console.log("An error ocurred when trying to search by id.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.")
            }

        });
    }

    async findByGender(){
        this.app.get("/find/gender", async (req, res) => {
            const gender = req.body.gender;

            try {

                if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

                let foundClient = await this.database.findByGender(gender);

                if(foundClient == null) return res.status(500).send("Cannot complete your request. Try again later.")

                let jsonClient = foundClient;

                if(jsonClient == null) return res.status(500).send("Cannot complete your request. Try again later.")
    
                return res.send(jsonClient);
            } catch (error) {
                console.log("An error ocurred when searching for gender.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.")
            }
            
        });
    }

    async findByBirthday(){
        this.app.get("/find/birthday", async (req, res) => {
            const {initDate, finalDate} = req.body;
            
            try {
                if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

                let foundClients = await this.database.findByBirthday(new Date(initDate), new Date(finalDate));

                if(foundClients == null) return res.status(500).send("Cannot complete your request. Try again later.")

                console.log(foundClients);

                return res.send(foundClients);
            } catch (error) {
                console.log("An error ocurred when trying to search by birthday");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.") 
            }
        });
    }

    async connectDatabase(){

        try {
            this.database.connect();
            // await this.database.authenticate();
            await this.database.setModel();
            await this.database.sync();
            return "ok";
        } catch (error) {
            console.log("An error ocurred when syncing the database.");
            console.log(error);
            return null;
        }
    }

}