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
  selector: 'app-asistencia-modal',
  templateUrl: './asistencia-modal.component.html',
  styleUrls: ['./asistencia-modal.component.css']
})
export class AsistenciaModalComponent implements OnInit {

  public mensaje: string;
  public titleModal: string;
  public pagoType: PagoType;

  pago: Pago;

  codigodeposito: Number;

  deposito: Deposito = new Deposito();

  modelDeposito: any;

  public valorpagoTotal: Number;  

  private modalRef: NgbModalRef;

  formModalPago: FormGroup;

  @ViewChild("childmodalasistencia", { static: false }) 
  childmodalasistencia: any;

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
    console.log("METODO: constructor()");
    this.createForm();
  }

  openModalAsistencia(pago: Pago, titleModal: string, pagoType: PagoType) {

    console.log("METODO: openModal()");
    
    this.pago = pago;
    this.titleModal = titleModal;
    this.pagoType = pagoType;

    this.createForm();

    this.valorpagoTotal = 0;

    this.cuotasService.consultarPagoCuotaLoteSum2(this.pago.codigocuota, this.pago.codigolote, this.pago.codigoreunion).subscribe((data: any) => {
      console.log(data);
      console.log(data.data);
      console.log(data.data.valorpago);
      if (data && data.data && data.data.valorpago) {
        this.valorpagoTotal = data.data.valorpago;
      }
    });

    this.modalRef = this.modalService.open(this.childmodalasistencia, { size: 'xl' });
    this.modalRef.result.then(result => {}, reason => {});
  }

  hideModal() {
    console.log("METODO: hideModal()");
    this.modalRef.close();
  }

  private createForm() {

    console.log("METODO: createForm()");

    this.mensaje = '';

    this.modelDeposito = null;
    this.deposito = null;
    
    this.valorpagoTotal = null;
    
    this.formModalPago = this.formBuilder.group({
      deposito: ['', Validators.required],
      valorpagocuotalote: ['', Validators.required],
    });
  }

  selectedDeposito(item) {

    console.log("METODO: selectedDeposito()");

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

    console.log("METODO: searchDeposito()");

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
        switchMap( (searchText) => {
          let data = this.cuotasService.readDeposito(this.pago.codigopersona)
          console.log(data);          
          return data;
        }
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

  savePagoAsistencia() {
    console.log('Metodo: savePagoAsistencia()');

    this.mensaje = '';

    console.log(this.formModalPago.value);

    // VALIDA LOS DATOS DE LA CUOTA
    if (this.pago.codigoreunion == null) {
      this.mensaje = 'Ingrese el tipo de reunion a pagar.';
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
      this.mensaje = 'Ingrese el valor del pago de la multa.';
      this.messagesService.error(this.mensaje);
      return;
    }

    if (valorPagoCuotaLote <= 0 || valorPagoCuotaLote == '0') {
      this.mensaje = 'El valor del pago de la cuota tiene que ser mayor a cero (0).';
      this.messagesService.error(this.mensaje);
      return;
    }

    // VALIDA EL VALOR PAGO CUOTA NO SEA MAYOR AL VALOR DE LA CUOTA
    let valorPagoCuotaLoteN: Number = Number(valorPagoCuotaLote);
    let valorMultaN: Number = Number(this.pago.valormulta);

    if (valorPagoCuotaLoteN > valorMultaN) {
      this.mensaje = 'El valor del pago: '+valorPagoCuotaLoteN+',  no puede ser mayor al valor de la multa: ' + valorMultaN;
      this.messagesService.error(this.mensaje);
      return;
    }

    // VALIDA EL VALOR DEL PAGO PENDIENTE
    if (valorPagoCuotaLoteN > valorPendienteDeposito) {
      this.mensaje = 'El valor del pago: '+valorPagoCuotaLoteN+', no tiene que ser mayor al valor pendiente del deposito seleccionado: ' + valorPendienteDeposito;
      this.messagesService.error(this.mensaje);
      return;
    }

    let valorpagopendienteN = Number(valorMultaN) - Number(this.valorpagoTotal);
    
    if (valorpagopendienteN > 0 && valorPagoCuotaLoteN > valorpagopendienteN) {
      this.mensaje = 'El valor del pago: '+valorPagoCuotaLoteN+' no puede ser mayor al valor pendiente de la multa: '+valorpagopendienteN+' .';
      this.messagesService.error(this.mensaje);
      return;
    }

    // VALIDA SI EXISTE PAGO PENDIENTE DE LA CUOTA
    var valorMulta: Number = Number(this.pago.valormulta);

    console.log('valorCuota: ' + valorMulta);
    console.log('valorpagocuotaloteTotal: ' + this.valorpagoTotal);
    
    if (this.valorpagoTotal >= valorMulta) {
      this.mensaje = 'La multa: ('+this.pago.nombrereunion+') del lote ('+this.pago.codigoreferencia+') esta pagada completamente.'; 
      this.messagesService.warning(this.mensaje);
      return;
    }

    const datosForm : any = this.formModalPago.value;

    console.log(datosForm);

    let pagoCuotaLote: PagoCuotaLote = new PagoCuotaLote();

    pagoCuotaLote.codigoreunion = this.pago.codigoreunion;
    pagoCuotaLote.codigocuota = this.pago.codigocuota;
    pagoCuotaLote.codigolote = this.pago.codigolote;
    pagoCuotaLote.codigodeposito = datosForm.deposito.codigodeposito;    
    pagoCuotaLote.valorpagocuotalote = datosForm.valorpagocuotalote;

    console.log(pagoCuotaLote);
    
    this.cuotasService.createPagoCuotaLote(pagoCuotaLote).subscribe((response: any) => {
      console.log("response:");
      console.log(response);

      if (response.pagocuotalote && response.pagocuotalote.codigopagocuotalote !== null && response.pagocuotalote.codigopagocuotalote > 0) {
        this.createForm();
        this.modalRef.close();

        this.mensaje = 'El registro de la multa:  '+  datosForm.valorpagocuotalote +' del socio ' + this.pago.primerapellido + ' ' + this.pago.primernombre + ' se realizo correctamente.';

        this.messagesService.info(this.mensaje);
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

    });

    console.log('Fin guardar pago');

  }

}
