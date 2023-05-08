interface SqlQueryBuilder{
    select(table:string, fields: string[]): SqlQueryBuilder
    where(field:string, value:string, operator:string):SqlQueryBuilder
    limit(start:number, offset: number): SqlQueryBuilder
    
    getSql():string
}

interface query {
    select?:string
    where?:string[],
    limit?:string
}

class MySqlBuilder implements SqlQueryBuilder{

    private query: query

    constructor(){
        this.reset()
    }

    reset(){
        this.query = {
            where:[] 
        }
    }

    select(table:string, fields: string[]): SqlQueryBuilder {
        this.query.select = `SELECT ${fields.join(', ')} FROM ${table}`

        return this
    }

    where(field: string, value: string, operator: string = '='): SqlQueryBuilder {
        this.query.where.push(`${field} ${operator} ${value}`)

        return this
    }

    limit(start: number, offset: number): SqlQueryBuilder {
        
        this.query.limit = `LIMIT ${start}, ${offset} `
        return this
    }

    getSql(): string {

        let query = ''

        query = `${ this.query.select } WHERE ${this.query.where.join(' AND ')} ${this.query.limit};`
    
        return query   
    }

}

// aqui eu poderia ter dois tipos de bulders, como por exempolo para mongo.

function clientCode(sqlBuilder: SqlQueryBuilder){
    let query = sqlBuilder
                    .select('person', ['id', 'name', 'student'])
                    .where('id', '1', '=')
                    .where('name', 'maria', '=')
                    .limit(0, 4)

    console.log(query.getSql())
}

let mysqlBuilder = new MySqlBuilder()


clientCode(mysqlBuilder)



// Optional 

// class Director {
//     private builder:BuilderInterface

//     public setBuilder(builder: BuilderInterface){
//         this.builder = builder
//     }

//     public buildMinimalViableProduct(){
//         this.builder?.produceA();
//     }

//     public buildFullFeatureProduct(): void {
//         this.builder.produceA();
//         this.builder.produceB();
//         this.builder.produceC();
//     }
// }