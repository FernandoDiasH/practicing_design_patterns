interface Observer{
    update(context:string, emailProvider: EmailProvider):void
}

interface Subject {
    attach(observer:Observer):void
    detach(observer:Observer):void
    notify(context:string):void
}

interface EmailProps {
    email: string
    message: string
}

interface EmailProviderInterface{
    sendEmail(data:EmailProps):void
}


class EmailProvider implements EmailProviderInterface {

    sendEmail(data: EmailProps){
        console.log(`Enviando o email para ${data.email}, message: ${data.message}`);
    }
}


class SendEmails implements Subject{

    public subscribers: number = 0

    private observers: Observer[] = []

    constructor(
        protected emailProvider: EmailProvider
    ){}

    attach(observer: Observer): void {
        const isExist = this.observers.includes(observer)

        if(isExist){
            return console.log("This observer has already exist")
        }
        this.subscribers ++
        console.log("This observer attached")

        this.observers.push(observer)
    }

    detach(observer: Observer): void {
        const indexObserver = this.observers.indexOf(observer)
        
        if(indexObserver === -1){
            return console.log('This observer not exist')
        }

        this.subscribers --
        this.observers.slice(indexObserver, 1)

        return console.log('This observer Detached')
    }

    notify(context:string): void {
        for(const observer of this.observers){
            observer.update(context, this.emailProvider)
        }
    }

    public sendEmails(context:string){
        console.log('\n total de assinantes ' + this.subscribers )
        console.log("Enviando os emails.")
        this.notify(context)
    }
}

class Student implements Observer{
    
    private Observer: string = Student.name

    update(interested:string,  emailProvider: EmailProvider): void {
        if(interested === this.Observer) {
            emailProvider.sendEmail({
                email: "student@email.com",
                message: "welcome"
            })
        }
    }
}

class StudentInterested implements Observer{

    private Observer: string = StudentInterested.name

    update(interested: string,  emailProvider: EmailProvider): void {
        if(interested === this.Observer){
            emailProvider.sendEmail({
                email: "StudentInterested@email.com",
                message: "welcome"
            })
        }
    }
}

class Administrator implements Observer{

    private Observer: string = Administrator.name

    update(interested: string,  emailProvider: EmailProvider): void {
        if(interested === this.Observer){
            emailProvider.sendEmail({
                email: "Administrator@email.com",
                message: "welcome"
            })            
        }
    }
}


const emailProvider = new EmailProvider()
const subject = new SendEmails(emailProvider)


const student = new Student()
const interested = new StudentInterested()
const administrator = new Administrator()


subject.attach(student)
subject.attach(interested)
subject.attach(administrator)

subject.sendEmails("Administrator")
subject.sendEmails("StudentInterested")