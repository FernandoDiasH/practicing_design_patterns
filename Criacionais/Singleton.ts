

class Database {

    private static instance: Database 

    private constructor (){

    }

    public static getInstance(){
        if(Database.instance == null){
            this.instance = new Database()
        }
        return Database.instance
    }

    public query (query:String){
        console.log(query)
    }
}

class Aplication{
    public main (){
        const  base1:Database = Database.getInstance()
        base1.query("select...1")

        const base2: Database = Database.getInstance()
        base2.query("select ...2")
        if(base1 === base2){
            console.log("as duas instancias são iguais");
        }else{
            console.log("as duas instancias não são iguais");
        }
    }
}

let appSingleton = new Aplication()
appSingleton.main()