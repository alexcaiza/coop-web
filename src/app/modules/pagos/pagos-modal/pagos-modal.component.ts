import { PagoType } from './../../../models/enum/PagoType';
import { MessagesAppService } from './../../../services/messages-app/messages-app.service';
import { PagoCuotaLote } from './../../../models/PagoCuotaLote';
import { CuotasService } from './../../../servicios/cuotas/cuotas.service';
import { Deposito } from './../../../models/Deposito';
import {  Component,   OnInit,   EventEmitter,   Output,   ViewChild } from "@angular/core";
import {  NgbModalRef, NgbModal,  ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import { Pago } from 'src/app/models/Pago';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subject, merge } from 'rxjs';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, filter  } from 'rxjs/operators';

@Component({
  selector: 'app-pagos-modal',
  templateUrl: './pagos-modal.component.html',
  styleUrls: ['./pagos-modal.component.css']
})
export class PagosModalComponent implements OnInit {

  public mensaje: string;
  public titleModal: string;
  public pagoType: PagoType;

  pago: Pago;

  codigodeposito: Number;

  deposito: Deposito = new Deposito();

  modelDeposito: any;

  valorpagocuotaloteTotal: Number;  

  private modalRef: NgbModalRef;

  formModalPago: FormGroup;

  @ViewChild("childmodalpago", { static: false }) 
  childmodalpago: any;

  @ViewChild('instanceDeposito', {static: true}) 
  instanceDeposito: NgbTypeahead;

  focusDeposito$ = new Subject<Deposito>();
  clickDeposito$ = new Subject<Deposito>();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private cuotasService: CuotasService,
    private messagesService: MessagesAppService,
    ) { }

  ngOnInit() {
    this.createForm();
  }

  openModal(pago: Pago, titleModal: string, pagoType: PagoType) {

    console.log('Metodo openModal(.)');
    
    this.pago = pago;
    this.titleModal = titleModal;
    this.pagoType = pagoType;

    this.createForm();

    this.valorpagocuotaloteTotal = 0;

    this.cuotasService.consultarPagoCuotaLoteSum(this.pago.codigocuota, this.pago.codigolote).subscribe((data: any) => {
      console.log(data);
      console.log(data.data);
      console.log(data.data.valorpago);
      if (data && data.data && data.data.valorpago) {
        this.valorpagocuotaloteTotal = data.data.valorpago;
      }
    });

    this.modalRef = this.modalService.open(this.childmodalpago, { size: 'xl' });
    this.modalRef.result.then(result => {}, reason => {});
  }

  hideModal() {
    this.modalRef.close();
  }

  private createForm() {

    this.mensaje = '';

    this.modelDeposito = null;
    this.deposito = null;
    
    this.valorpagocuotaloteTotal = null;
    
    this.formModalPago = this.formBuilder.group({
      deposito: ['', Validators.required],
      valorpagocuotalote: ['', Validators.required],
    });
  }

  selectedDeposito(item){
    //console.log(item.item);
    console.log(this.deposito);
    this.codigodeposito = item.item.codigodeposito;
    console.log(this.codigodeposito);
    this.modelDeposito = item.item;
    console.log(this.modelDeposito);

    if (this.modelDeposito && this.modelDeposito.codigodeposito) {
      this.modelDeposito.valorpendientedeposito = (Number(this.modelDeposito.valordeposito) - Number(this.modelDeposito.valorutilizado));
    }
  }

  searchDeposito = (text$: Observable<Deposito>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickDeposito$.pipe(filter(() => {
      if (this.instanceDeposito) {
        return !this.instanceDeposito.isPopupOpen();
      }
      return false;
    }));
    const inputFocus$ = this.focusDeposito$;

    console.log('this.pago.codigopersona: ' + this.pago.codigopersona);

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        switchMap( (searchText) => 
        //this.albumService.artistLookup(searchText)
        this.cuotasService.readDeposito(this.pago.codigopersona)
      )
    );
  }

  resultFormatDepositoListValue(value: any) {            
    return value.numerodeposito;
  }
  
  inputFormatDepositoListValue(value: any)   {
    if(value.numerodeposito)
      return value.numerodeposito
    return value;
  }

  savePagoCuotaLote(){
    console.log('Metodo: savePagoCuotaLote()');

    this.mensaje = '';

    console.log(this.formModalPago.value);

    // VALIDA LOS DATOS DE LA CUOTA
    if (this.pago.codigocuota == null) {
      this.mensaje = 'Ingrese el tipo de cuota a pagar.';
      this.messagesService.warning(this.mensaje);
      return;
    }

    // VALIDA LOS DATOS DE LA PERSONA
    if (this.pago.codigopersona == null) {
      this.mensaje = 'Ingrese la cedula de la persona.';
      this.messagesService.warning(this.mensaje);
      return;
    }

    // VALIDA LOS DATOS DEL LOTE
    if (this.pago.codigolote == null) {
      this.mensaje = 'Ingrese el lote para pagar la cuota pendiente.';
      this.messagesService.warning(this.mensaje);
      return;
    }

    // VALIDA LOS DATOS DEL DEPOSITO
    const deposito = this.formModalPago.get("deposito").value;
    console.log('deposito: ' + deposito);

    if (deposito == null || deposito === '') {
      this.mensaje = 'Ingrese el numero del deposito.';
      this.messagesService.warning(this.mensaje);
      return;
    }

    // VALIDA SI EL DEPOSITO TIENE SALDO DISPONIBLE PARA PAGAR LA COUTA
    let valorDeposito: Number = Number(deposito.valordeposito);
    let valorUtilizadoDeposito: Number = Number(deposito.valorutilizado);
    let valorPendienteDeposito: Number = (Number(valorDeposito) - Number(valorUtilizadoDeposito));
    if (valorUtilizadoDeposito >= valorDeposito) {
      this.mensaje = 'El deposito ('+deposito.numerodeposito+') del socio ('+this.pago.cedula+') esta utilizado completamente.'; 
      this.messagesService.warning(this.mensaje);
      return;
    }

    // VALIDA EL VALOR PAGO CUOTA
    const valorPagoCuotaLote = this.formModalPago.get("valorpagocuotalote").value;
    console.log('valorPagoCuotaLote: ' + valorPagoCuotaLote);

    if (valorPagoCuotaLote == null || valorPagoCuotaLote === '') {
      this.mensaje = 'Ingrese el valor del pago de la cuota.';
      this.messagesService.error(this.mensaje);
      return;
    }

    if (valorPagoCuotaLote <= 0) {
      this.mensaje = 'El valor del pago de la cuota tiene que ser mayor a cero (0).';
      this.messagesService.error(this.mensaje);
      return;
    }

    if (valorPagoCuotaLote > valorPendienteDeposito) {
      this.mensaje = 'El valor del pago de la cuota no tiene que ser mayor al valor pendiente del deposito seleccionado (' + valorPendienteDeposito + ').';
      this.messagesService.error(this.mensaje);
      return;
    }

    // VALIDA EL VALOR PAGO CUOTA NO SEA MAYOR AL VALOR DE LA CUOTA
    let valorpagocuotaloteN: Number = Number(valorPagoCuotaLote);
    let valorcuotaN: Number = Number(this.pago.valorcuota);

    if (valorpagocuotaloteN > valorcuotaN) {
      this.mensaje = 'El valor del pago de la cuota no puede ser mayor al valor de la cuota ('+valorpagocuotaloteN+' - '+valorcuotaN+').';
      this.messagesService.error(this.mensaje);
      return;
    }

    // VALIDA EL VALOR PAGO CUOTA PENDIENTE
    let valorpagopendienteN = Number(valorcuotaN) - Number(this.valorpagocuotaloteTotal);
    
    if (valorpagopendienteN > 0 && valorpagocuotaloteN > valorpagopendienteN) {
      this.mensaje = 'El valor del pago de la cuota no puede ser mayor al valor pendiente de la cuota ('+valorpagocuotaloteN+' - '+valorpagopendienteN+').';
      this.messagesService.error(this.mensaje);
      return;
    }

    // VALIDA SI EXISTE PAGO PENDIENTE DE LA CUOTA
    var valorCuota: Number = Number(this.pago.valorcuota);

    console.log('valorCuota: ' + valorCuota);
    console.log('valorpagocuotaloteTotal: ' + this.valorpagocuotaloteTotal);
    
    if (this.valorpagocuotaloteTotal >= valorCuota) {
      this.mensaje = 'La cuota ('+this.pago.descripcioncuota+') del lote ('+this.pago.codigoreferencia+') esta pagada completamente.'; 
      this.messagesService.warning(this.mensaje);
      return;
    }

    const datosForm : any = this.formModalPago.value;

    console.log(datosForm);

    let pagoCuotaLote: PagoCuotaLote = new PagoCuotaLote();

    pagoCuotaLote.codigocuota = this.pago.codigocuota;
    pagoCuotaLote.codigolote = this.pago.codigolote;
    pagoCuotaLote.codigodeposito = datosForm.deposito.codigodeposito;    
    pagoCuotaLote.valorpagocuotalote = datosForm.valorpagocuotalote;

    console.log(pagoCuotaLote);
    
    this.cuotasService.createPagoCuotaLote(pagoCuotaLote).subscribe((response: any) => {
      console.log("response:");
      console.log(response);

      if (response) {
        if (response.pagocuotalote && response.pagocuotalote.codigopagocuotalote !== null && response.pagocuotalote.codigopagocuotalote > 0) {
          this.createForm();
          this.modalRef.close();

          this.mensaje = 'El pago $'+  datosForm.valorpagocuotalote +' del socio ' + this.pago.cedula + ' se realizo correctamente.';
          console.log(this.mensaje);
          this.messagesService.info(this.mensaje);
          console.log(this.mensaje);
        }
        else {
          if (response.mensaje) {
            this.mensaje = response.mensaje;
            this.messagesService.error(response.mensaje);
          } else {
            this.mensaje = "Error al registrar el pago del deposito";
            this.messagesService.error(this.mensaje);
          }
        }
      }

    });
    console.log('Fin guardar pago');
  }

}
