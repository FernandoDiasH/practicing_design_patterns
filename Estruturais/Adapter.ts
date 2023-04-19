class RoundedHole {
    
    constructor(
        private radius:number
    ){}

    get Radius(){
        return this.radius
    }

    fits(peg:RoundPeg){
        return this.Radius >= peg.Radius
    }
}

class RoundPeg{
    constructor(
        private radius: number
    ){}

    get Radius(){
        return this.radius
    }
}


class SquarePegAdapter extends RoundPeg{

    constructor(
        private squarePeg:SquarePeg
    ){
      super(squarePeg.Width * Math.sqrt(2) / 2)
    }

    getRadius(){
        return this.Radius
    }
}

class SquarePeg {

    constructor(
        private width:number
    ){}

    get Width(){
        return this.width
    }
}

let hole = new RoundedHole(5)
let rolePeg = new RoundPeg(5)
console.log("Utilizando uma peça redonda em um buraco redodondo com 5 de raio: " , hole.fits(rolePeg));

let small_sqpeg = new SquarePeg(5)
let large_sqpeg = new SquarePeg(10)

//Neste caso o buraco nao vai aceitar a peça quadrada.
//hole.fits(small_sqpeg)

let smallSquareAdapter = new SquarePegAdapter(small_sqpeg) 
let largeSquareAdapter = new SquarePegAdapter(large_sqpeg) 

console.log("Utilizando uma peça quadrada de 5 de largura passando por um adapdador para virar uma peça redonda: ",hole.fits(smallSquareAdapter))
console.log("Utilizando uma peça quadrada de 10 de largura passando por um adapdador para virar uma peça redonda: ",hole.fits(largeSquareAdapter))

