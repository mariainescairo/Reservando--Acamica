var expect=chai.expect;

const RestoIne = new Restaurant(0,
    'Resto de Ine','Organica',
    'Campana',
    ["13:30", "15:00", "20:00"],
    "../img/ensalada2.jpg",
    [6, 5, 9, 10, 5]);

const Resto0 = new Restaurant (25,
    'Ultimo Resto',
    'Vegan','Campana',
    ["13:30", "15:00", "20:00"],
    "../img/ensalada2.jpg",[]);
    
const restaurante = new Restaurant(
	1,
	'TAO Uptown',
	'Asiática',
	'Nueva York',
	[ '13:00', '15:30', '18:00' ],
	'../img/asiatica1.jpg',
	[ 6, 7, 9, 10, 5 ]
);

//TEST FUNCION RESERVAR HORARIO

describe('Test Funcion ReservarHorario', function(){
    it('Se elimina un horario existente', function(){
        RestoIne.reservarHorario('15:00');
        expect(RestoIne.horarios.length).to.be.eql(2);}
    );
    it('El horario se mantiene igual por horario inexistente', function(){
        RestoIne.reservarHorario('21:00');
        expect(RestoIne.horarios.length).to.be.eql(2);
    });
    it('El horario no varia por falta de parametro', function(){
        RestoIne.reservarHorario();
        expect(RestoIne.horarios.length).to.be.eql(2);
    });
});

//TEST FUNCION OBTENER PUNTUACION

describe('Test Funcion obtenerPuntuacion', function(){
    it('Da el promedio de todas las puntuaciones', function(){
        let promedio = RestoIne.obtenerPuntuacion();
        expect (promedio).to.equal(7);
    });
    it('Da cero al no tener calificaciones que promediar', function(){
        let resultado = Resto0.obtenerPuntuacion();
        expect (resultado).to.equal(0);
    })
});

//TEST FUNCION CALIFICAR

describe('Test Funcion CALIFICAR', function(){
    it('Agrega nueva calificacion', function(){
        RestoIne.calificar(9);
        expect(RestoIne.calificaciones.length).to.be.eql(6);
    })
    it('No agrega nada si el numero es igual a 10', function(){
        RestoIne.calificar(10);
        expect(RestoIne.calificaciones.length).to.be.eql(6);
    })
    it('No agrega nada si el numero es >10', function(){
        RestoIne.calificar(11);
        expect(RestoIne.calificaciones.length).to.be.eql(6);
    })
    it('No agrega nada si el numero es igual a 0', function(){
        RestoIne.calificar(0);
        expect(RestoIne.calificaciones.length).to.be.eql(6);
    })
    it('No agrega nada si el numero es <0', function(){
        RestoIne.calificar(-1);
        expect(RestoIne.calificaciones.length).to.be.eql(6);
    })
})

describe('Test Funcion BuscarRestaurante(id)', function(){
    it('El id indicado coincide con el id de un restaurante', function(){
        expect(listado.buscarRestaurante(2).id).to.eql(2);
        })
    it('Se proporciona un id inexistente y da mensaje correcto', function(){
            expect(listado.buscarRestaurante(30)).to.eql("No se ha encontrado ningún restaurant");
            })
    it('No se da id para buscar y da mensaje correcto', function(){
        expect(listado.buscarRestaurante('')).to.eql("No se ha encontrado ningún restaurant");
            
        })
})

describe('Test Funcion obtenerRestaurantes', function(){
    it('Filtra el arreglo de restaurantes por rubro, ciudad y horario', function(){
        let FiltroXRubro = listado.obtenerRestaurantes('Desayuno','Nueva York','21:00');
        expect(FiltroXRubro.length).to.eql(1)
    })
    it('No filtra el arreglo de restaurantes por que no se proporciona un parametro', function(){
        let FiltroSinParametro = listado.obtenerRestaurantes('');
        expect(FiltroSinParametro.length).to.eql(0)
    })
    it('Devuelve el arreglo completo de restaurantes al ser todos los parametros NULL', function(){
        let FiltroNULL = listado.obtenerRestaurantes(null,null,null);
        expect(FiltroNULL.length).to.eql(24)
    })
    it('Filtra solo por Rubro y valor NULL para Ciudad y Horario', function(){
        let FiltroXRubro = listado.obtenerRestaurantes('Desayuno',null,null);
        expect(FiltroXRubro.length).to.eql(4)
    })
    it('Filtra solo por Ciudad y valor NULL para Rubro y Horario', function(){
        let FiltroXCiudad = listado.obtenerRestaurantes(null,'Nueva York',null);
        expect(FiltroXCiudad.length).to.eql(7)
    })
    it('Filtra solo por Horario y valor NULL para Rubro y Ciudad', function(){
        let FiltroXHorario = listado.obtenerRestaurantes(null,null,'21:00');
        expect(FiltroXHorario.length).to.eql(1)
    })

})

describe ('Test Calcular Precio Base y Precio Total',() =>{
    describe ('class Reserva', () =>{
        it('deberia calcular el precio Base', () =>{
            let reservaPrecioBase = new Reserva(new Date (2019,8,7,13,00), 4, 1000, 'DES200');
            let calculoPrecioBase = reservaPrecioBase.calcularPrecioBase();
            expect(calculoPrecioBase).to.eql(4000)
        })
        it('deberia calcular el precio Total', () => {
            //Dia Sabado 25 de Agosto 
            let reservaPrecioTtl = new Reserva (new Date(2018, 7, 26, 14, 00), 8, 350, "DES200");
            let calculoPrecioTotal = reservaPrecioTtl.calcularPrecioTotal();
            expect(calculoPrecioTotal).to.be.eql(2740)
        })
    })
})

describe ('Test Codigos de descuentos',() =>{
    describe ('DES200', () =>{
        it('El descuento DES200 es 200', () =>{
            let reservaD200 = new Reserva(new Date (2019,8,7,13,00), 4, 1000, 'DES200');
            let descuentoD200 = reservaD200.calcularDescuentoxCodigo();
            expect(descuentoD200).to.eql(200)
        })
        })
    describe ('DES1', () => {
        it('El descuento DES1 es igual al del valor de 1 persona', () => {
            let reservaD1 = new Reserva(new Date (2019,8,7,13,00), 4, 1000, 'DES1');
            let descuentoD1 = reservaD1.calcularDescuentoxCodigo();
            expect(descuentoD1).to.be.eql(reservaD1.precioXpersona)
        })
    })
    describe('DES150', () => {
        it('El descuento DES15 es del 15% del precio base', () =>{
            let reservaD15 = new Reserva(new Date (2019,8,7,13,00), 4, 1000, 'DES15');
            let descuentoD15 = reservaD15.calcularDescuentoxCodigo();
            expect(descuentoD15).to.be.eql(reservaD15.calcularPrecioBase()*15/100)
        })
    })
})

describe('Test de Descuentos por Grupos', () =>{
    describe('Grupo entre 4 y 6 personas reciben 5% de descuento', () => {
        it('El descuento es del 5%',() =>{
            let reservaEntre4y6 = new Reserva(new Date (2019,8,7,13,00), 5, 1000, 'DES15');
            let descuentoEntre4y6 = reservaEntre4y6.calcularDescuentoPorGrupo();
            expect(descuentoEntre4y6).to.be.eql(reservaEntre4y6.calcularPrecioBase()*5/100)
        })
    })
    describe('Grupo entre 7 y 8 personas reciben 10% de descuento', () => {
        it('El descuento es del 10%',() =>{
            let reservaEntre7y8 = new Reserva(new Date (2019,8,7,13,00), 8, 1000, 'DES15');
            let descuentoEntre7y8 = reservaEntre7y8.calcularDescuentoPorGrupo();
            expect(descuentoEntre7y8).to.be.eql(reservaEntre7y8.calcularPrecioBase()*10/100)
        })
    })
    describe('Grupo de mas de 8 personas reciben 15% de descuento', () => {
        it('El descuento es del 15%',() =>{
            let reservaMasDe8 = new Reserva(new Date (2019,8,7,13,00), 10, 1000, 'DES15');
            let descuentoMasDe8 = reservaMasDe8.calcularDescuentoPorGrupo();
            expect(descuentoMasDe8).to.be.eql(reservaMasDe8.calcularPrecioBase()*15/100)
        })
    })
})

describe('Test de Calcular Adicionales', () => {
    it('El adicional deberia ser del 1500, 1000(10% por horario) y 500 (5% por dia viernes)', () => {
        //la fecha es Viernes 9 de AGOSTO 
        let reservaAdic = new Reserva( new Date (2019,7,9,14,00), 10, 1000, 'DES');  
        let adicionalReserva = reservaAdic.calcularAdicionales();
        expect (adicionalReserva).to.eql(reservaAdic.calcularPrecioBase()*15/100)
    })
})

