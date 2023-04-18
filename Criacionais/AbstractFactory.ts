interface AbstractUiFactory{
    createButton():Button
    createCheckButton():Checkbox   
}

interface Button{
    paint():string
}

interface Checkbox{
    paint():string
}


class WinFactory implements AbstractUiFactory{
    createButton(): Button {
        return new WinButton()
    }
    createCheckButton(): Checkbox {
        return new WinCheckbox()
    }

}

class WinCheckbox implements Checkbox{
    paint(): string {
        return 'Criando um Checkbox para windows.'
    }

}

class WinButton implements Button{
    paint(): string {
        return 'Criando um button para windows'
    }

}


class MacFactory implements AbstractUiFactory{
    
    createButton(): Button {
       return new MacButton()
    }

    createCheckButton(): Checkbox {
       return new MacCheckbox()
    }

}


class MacCheckbox implements Checkbox{
    paint(): string {
        return 'Criando um checbox para mac '
    }

}

class MacButton implements Button{
    paint(): string {
        return 'Criando um button para mac '
    }
    
}


class Application {

    protected button: Button
    protected checkBox: Checkbox

    constructor(
        private uiFactory: AbstractUiFactory
    ){}

    
    createUI(){
        this.button = this.uiFactory.createButton()
        this.checkBox = this.uiFactory.createCheckButton()
    }

    paint(){
        return {
            button:this.button.paint(),
            checkbox:this.checkBox.paint()
        }
    }
} 


class applicationConfigurator{
    private factory: AbstractUiFactory

    main(){
        let config = this.readApplicationFile() // O contexto onde ele esta inserido, Windows ou Mac

        if(config.OS == "windows"){
            this.factory = new WinFactory()
        }
        if(config.OS == "Mac"){
            this.factory = new MacFactory()
        }

        let app = new Application(this.factory)
        app.createUI()  
        let ui = app.paint()

        console.log(ui.button)
        console.log(ui.checkbox)
    }

    private readApplicationFile(){
        return { OS: 'windows'}
    }
}


let app = new applicationConfigurator()

app.main()



