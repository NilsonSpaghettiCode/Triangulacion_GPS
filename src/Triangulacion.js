import { IPublisher } from "./interfaces/IObserver.js";
import { geomath, Coordenada } from "./util/geomath.js";

import { Dom } from "./util/dom.js";

class Triangulacion extends IPublisher {
  constructor(satelites) {
    super();
    this.satelites = satelites;
    this.located_target = [];
    //Heredados
    this.suscribers = [];
  }

  addSuscriber(suscriber) {
    this.suscribers.push(suscriber);
  }

  notifySuscribers(data, i) {
    for (let index = 0; index < this.suscribers.length; index++) {
      const suscriber = this.suscribers[index];
      suscriber.update(data, i);
    }
  }

  getLocatedTarget()
  {
    return this.located_target
  }

  aprox() {
    let S1 = this.satelites[0];
    let S2 = this.satelites[1];
    let S3 = this.satelites[2];

    //console.log(S1, S2, S3)
    let s_1 = 0;
    let s_2 = 0;
    let s_3 = 0;
    let aumento_grados = 0.1;
    let grados_revision = 360;
    let precision_distancia = 13350; //En metros
    let iteracion = 0;

    //Eje S3

    let lat2 = S3.getLatLon().Lat;
    let lon2 = S3.getLatLon().Lon;
    let distancia2 = S3.distancia;

    //Eje S2
    let lat1 = S2.getLatLon().Lat;
    let lon1 = S2.getLatLon().Lon;
    let distancia1 = S2.distancia;

    //Eje S1
    let lat = S1.getLatLon().Lat;
    let lon = S1.getLatLon().Lon;
    let distancia = S1.distancia;

    let target_state = false;

    //Coordenadas target

    let coordenada_target3 = {}
    let coordenada_target2 = {}
    let coordenada_target = {}


    while (s_2 <= grados_revision) {
      let init_state = false;
      let angulo1 = s_2;
      coordenada_target2 = geomath.coordenada_alredor(lat1,lon1,distancia1,angulo1);
      //this.notifySuscribers(coordenada_target2, iteracion)

      while (s_1 <= grados_revision) {
        let angulo = s_1;
        coordenada_target = geomath.coordenada_alredor(lat,lon,distancia,angulo);
        init_state = this.puntos_cercanos(coordenada_target,coordenada_target2,precision_distancia);
        if (init_state) {
          console.log("Punto encontrado");
          this.notifySuscribers(coordenada_target, iteracion);
          this.notifySuscribers(coordenada_target2, iteracion);
          break;
        }
        s_1 += aumento_grados;
        iteracion++;
        Dom.setIteracion(iteracion)
      }

      if (init_state) {
        
        while (s_3 <= grados_revision) {
          
          let angulo2 = s_3
          coordenada_target3 = geomath.coordenada_alredor(lat2,lon2,distancia2,angulo2);
          let status1 = this.puntos_cercanos(coordenada_target3, coordenada_target2, precision_distancia)
          let status2 = this.puntos_cercanos(coordenada_target3, coordenada_target, precision_distancia)
          if (status1 || status2) {
            target_state = true
            this.notifySuscribers(coordenada_target3, iteracion);
            this.located_target.push(coordenada_target, coordenada_target2, coordenada_target3)
            Dom.setStateLocalizado(target_state)
            Dom.setLocalizacion(this.located_target)
            return target_state
          } 
          s_3 += aumento_grados;
          iteracion++;
          Dom.setIteracion(iteracion)
        }
        s_3 = 0
        
      }
      
      s_1 = 0;
      s_2 += aumento_grados;
      iteracion++;
      Dom.setIteracion(iteracion)
    }
    
    console.log("Evaluacion terminada");
    console.log("Target localizado:", target_state);
    console.log("Posición target:", posicion_aprox);
  }

  puntos_cercanos(coordenada_A, coordenada_B, precision) {
    let state = false;
    let distancia = geomath.haversine(coordenada_A, coordenada_B);
    if (distancia <= precision) {
      state = true;
    }
    return state;
  }
  /**
   * Recibe como parametro una listra con 3 coordenadas
   * @param {*} coordenadas
   */
  punto_medio_triangular(coordenadas) {
    let coordenadas_medias = [];
    for (let i = 0; i < coordenadas.length; i++) {
      const coordenada_i = coordenadas[i];
      let coordenadas_filter = Array.from(coordenadas);
      coordenadas_filter = coordenadas_filter.filter(
        (coordenada) =>
          coordenada.Lon !== coordenada_i.Lon &&
          coordenada.Lat !== coordenada_i.Lat
      );
      for (let t = 0; t < coordenadas_filter.length; t++) {
        const coordenada_t = coordenadas_filter[t];
        let coordenada_media_it = geomath.puntoMedio(
          coordenada_i,
          coordenada_t
        );
        let encontrado = coordenadas_medias.find(
          (coordenada) =>
            coordenada.Lon === coordenada_media_it.Lon &&
            coordenada.Lat === coordenada_media_it.Lat
        );
        if (encontrado == undefined) {
          coordenadas_medias.push(coordenada_media_it);
          if (coordenadas_medias.length == 3) {
            return coordenadas_medias;
          }
        }
      }
    }

    return coordenadas_medias;
  }

  iteracionTriangularEquilateral() {
    let interacion_max = 2000;
    let precision = 0.1;

    let coordenadas_iniciales = [];
    for (let i = 0; i < this.satelites.length; i++) {
      coordenadas_iniciales.push(this.satelites[i].getLatLon());
    }

    let puntos_medios_calculados = [];

    let iteracion = 1;

    while (iteracion <= interacion_max) {
      let coordenadas_medias = this.punto_medio_triangular(
        coordenadas_iniciales
      );
      puntos_medios_calculados.push(coordenadas_medias);
      this.notifySuscribers(coordenadas_medias);
      console.log(coordenadas_medias);
      iteracion++;
      coordenadas_iniciales = coordenadas_medias;
    }
  }
}

export { Triangulacion };
