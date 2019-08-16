class Reserva{
    constructor(fechaYhora, Qpersonas, precioXpersona, codigoDeDescuento){
        this.fechaYhora = fechaYhora;
        this.Qpersonas = Qpersonas;
        this.precioXpersona = precioXpersona;
        this.codigoDeDescuento = codigoDeDescuento;
     
    }
    calcularPrecioBase(){
        let precioBase = this.Qpersonas*this.precioXpersona;
        return precioBase;
    }
    
    calcularDescuentoPorGrupo(){
        let descuentoXgrupo=1;
    if(this.Qpersonas<4){
            descuentoXgrupo=0;
    }else if(this.Qpersonas>=4 && this.Qpersonas<=6){
            descuentoXgrupo=5 ;
    }else if(this.Qpersonas === 7 || this.Qpersonas === 8){
            descuentoXgrupo=10;
    }else if(this.Qpersonas>8){
            descuentoXgrupo=15;
    };
    return descuentoXgrupo/100 * this.calcularPrecioBase();
}
    calcularDescuentoxCodigo(){
        let descuentoXcodigo=0;
        switch(this.codigoDeDescuento){
            case 'DES15': descuentoXcodigo=this.calcularPrecioBase()*0.15;
                break;
            case 'DES200': descuentoXcodigo=200;
                break;
            case 'DES1':descuentoXcodigo=this.precioXpersona;
                break;
            default: descuentoXcodigo=0;
        }
        return descuentoXcodigo;
    }

    calcularAdicionales(){
        let adicional=0;
        let hora = this.fechaYhora.getHours();
        let dia = this.fechaYhora.getDay();
        
        
if((hora>=13 && hora<=14 ) || (hora>=20 && hora<=22)){ 
    adicional+= (this.calcularPrecioBase()*0.05)}

//4 viernes 5 sabado 6 domingo
if((dia ===0 || dia>=5 && dia<=6)){ 
    adicional+= (this.calcularPrecioBase()*0.1)}

    return adicional;
    }

    calcularPrecioTotal(){
        let precioTotal= this.calcularPrecioBase() +
                         this.calcularAdicionales() - 
                         this.calcularDescuentoPorGrupo() - 
                         this.calcularDescuentoxCodigo();
        return precioTotal;
    }
}
