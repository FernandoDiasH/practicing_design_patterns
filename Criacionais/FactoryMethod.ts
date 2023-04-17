interface Transport{
    deliver():string
}

abstract class Creator {

    public abstract factoryMethod():Transport

    public contactTransport():string {

        const transport = this.factoryMethod()
        return `A empresa contatou a trasportadora. \n${transport.deliver()} \n`
    }
}

class DeliveryCompany1 extends Creator{
    
    public factoryMethod(): Transport {

        return new Ship()

    }
}

class DeliveryCompany2 extends Creator{
    
    public factoryMethod(): Transport {

        return new Truck()

    }
}


class Ship implements Transport{
    
    deliver(): string {
       return 'Estou enviando a encomenda por navio.'
    }
}

class Truck implements Transport {
    
    deliver(): string {
        return 'Estou enviando a encomenda por Caminhao.'
    }
}

class Car implements Transport {
    
    deliver(): string {
        return 'Estou enviando a encomenda por Carro.'
    }
}


function main(creator: Creator){
    console.log('Nao conheço a classe construtora mas ainda funciona.');

    console.log(creator.contactTransport());
}

// main 

console.log('App -> Delivery company - 1 ');
main(new DeliveryCompany1())
console.log('');

console.log('App -> Delivery company - 2');
main(new DeliveryCompany2())
console.log('');
