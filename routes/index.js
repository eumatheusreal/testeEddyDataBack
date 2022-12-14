import ClientRoute from "./ClientRoute";
import FindRoute from "./FindRoute";
import XMLRoute from "./XMLRoute";

export default class Route{

    constructor(app){
        this.app = app;
        
        this.clientRoute = new ClientRoute(this.app);
        this.findRoute = new FindRoute(this.app);
        this.xmlRoute = new XMLRoute(this.app);
    }

    router(){
        this.home();
        this.clientRoute.init();
        this.findRoute.init();
        this.xmlRoute.init();
    }

    home(){
        this.app.get("/", (req, res) => {
            res.status(404).send("Nothing here. Go back.")
        })
    }

}