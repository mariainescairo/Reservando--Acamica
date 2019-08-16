var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}
    sumar= function(arreglo){
        let sumatoria = arreglo.reduce((valorPrevio, valorActual)=> valorPrevio + valorActual);
        return sumatoria;
        };
    
    promediar = function(arreglo){
        let promedio = sumar(arreglo) / arreglo.length;
        return Math.round(promedio * 10) / 10;
       };

//quita del array de horarios el horario reservado
Restaurant.prototype.reservarHorario = function(horarioReservado) {
    //for (var i = 0; i < this.horarios.length; i++) {
        //if (this.horarios[i] === horarioReservado) {
         //   this.horarios.splice(i, 1);
           // return;
        //}
    //}
this.horarios = this.horarios.filter(cadaHorario => cadaHorario !== horarioReservado)
}



Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        // var sumatoria = 0;
        // for (var i = 0; i < this.calificaciones.length; i++) {
            // sumatoria += this.calificaciones[i]
       // }
       // var promedio = sumatoria / this.calificaciones.length;
        //return Math.round(promedio * 10) / 10;
    //}
    return promediar(this.calificaciones);
    }
}

