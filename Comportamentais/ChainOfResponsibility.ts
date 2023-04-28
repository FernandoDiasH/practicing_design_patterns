interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: BankPaymentRequest): BankPaymentResponse | null;
}
  
abstract class HandlerBase implements Handler {

    private nextHandler: Handler | null = null;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: BankPaymentRequest): BankPaymentResponse | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return null;
    }
}
  
  
class DebitCardHandler extends HandlerBase {

    public handle(request: BankPaymentRequest): BankPaymentResponse | null {

        if(request.getPaymentMethod() == PaymentMethod.DebitCard){
            return new BankPaymentResponse('Débito realizado com sucesso' , request.getAmount())
        }

        return super.handle(request)
    }

}
  
  class CreditCardHandler extends HandlerBase {

    public handle(request: BankPaymentRequest): BankPaymentResponse | null {
  
        if (request.getPaymentMethod() === PaymentMethod.CreditCard) {
            return new BankPaymentResponse('Credito gerado com sucesso', request.getAmount());
        } 

        return super.handle(request)
    }
  }
  
  class BankTransferHandler extends HandlerBase {

    public handle(request: BankPaymentRequest): BankPaymentResponse | null {

      if (request.getPaymentMethod() === PaymentMethod.BankTransfer) {

        return new BankPaymentResponse('Transferencia realizado com sucesso', request.getAmount());

      } 

      return super.handle(request);

    }
  }
  
  class BankPaymentRequest {
       constructor(
            private _amount: number, 
            private _paymentMethod: PaymentMethod,
      ) {}
  
      getAmount(){
          return this._amount
      }
  
      getPaymentMethod(){
          return this._paymentMethod
      }
  }
  
  class BankPaymentResponse {
  
      constructor(
          private _message: string,
          private _amount:number
      ){}
  
      get message (){
          return this._message
      }
  
      get amount(){
          return this._amount
      }
  }
  
  enum PaymentMethod {
    CreditCard,
    DebitCard,
    BankTransfer,
  }
  
  function main(payMentRequest: BankPaymentRequest){
  
      const debitCardHandler = new DebitCardHandler()
      const creditCardHandler = new CreditCardHandler();
      const bankTransferHandler = new BankTransferHandler();
      
      debitCardHandler
      .setNext(creditCardHandler)
      .setNext(bankTransferHandler);
      
      const paymentResponse = debitCardHandler.handle(payMentRequest);
      
      if (paymentResponse) {
          console.log( {message:paymentResponse.message, value: paymentResponse.amount} );
          return 
      } 
  
      console.log("Nenhum manipulador disponível para processar o pagamento");
  
  }
  
  const DebitPaymentRequest = new BankPaymentRequest(200, PaymentMethod.DebitCard);
  const CreditPaymentRequest = new BankPaymentRequest(150, PaymentMethod.CreditCard);
  const TransferPaymentRequest = new BankPaymentRequest(300, PaymentMethod.BankTransfer);
  
  
  main(DebitPaymentRequest)
  main(CreditPaymentRequest)
  main(TransferPaymentRequest)