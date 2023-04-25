
abstract class Food {

    abstract getPrice():number
    abstract getName(): string
}


class FoodDecorator implements Food {

    constructor(
        protected food:Food
    ){}

    getPrice(): number {
        return this.food.getPrice()
    }
    getName(): string {
        return this.food.getName()
    }
    
    
}

class HotDog implements Food {

    public price: number = 20
    public name: string = 'simple hot dog'

    getPrice(): number {
        return this.price
    }

    getName(): string{
        return this.name
    }
}

class HotDogWithChicken extends FoodDecorator{

    getName(): string {
        return super.getName() + ' with chicken'
    }   

    getPrice(): number {
        return super.getPrice() + 10
    }
}

class HotDogLarge extends FoodDecorator {


    getName(): string {
        return 'large hot dog'
    }   

    getPrice(): number {
        return super.getPrice() + 20
    }

}


function order(food:Food){
    console.log(`RESULT: ${food.getName()}, Price:  ${food.getPrice()}`);   
}


const hotDog = new HotDog()

console.log('Client: I\'ve got a simple hotdog:')
order(hotDog)
console.log('');

const hotDogWithChicken = new  HotDogWithChicken(hotDog)
const HotDogGrande = new  HotDogLarge(hotDogWithChicken)

console.log('Client: Now I\'ve got a decorated hotdog:');
order(hotDogWithChicken)
console.log('');


console.log('Client: Now I\'ve got a decorated hotdog:');
order(HotDogGrande)