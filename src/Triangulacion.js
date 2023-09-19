import { IPublisher } from "./interfaces/IObserver.js";
import { geomath, Coordenada } from "./util/geomath.js";
class Triangulacion extends IPublisher {
  constructor(satelites) {
    super();
    this.satelites = satelites;
    this.located_target = {};

    //Heredados
    this.suscribers = [];
  }

  addSuscriber(suscriber) {
    this.suscribers.push(suscriber);
  }

  notifySuscribers(data) {
    for (let index = 0; index < this.suscribers.length; index++) {
      const suscriber = this.suscribers[index];
      suscriber.update(data);
    }
  }

  aprox() {
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

  iteracionTriangularEquilateral()
  {
    let interacion_max = 2000;
    let precision = 0.1;

    let coordenadas_iniciales = [];
    for (let i = 0; i < this.satelites.length; i++) {
      coordenadas_iniciales.push(this.satelites[i].getLatLon());
    }

    let puntos_medios_calculados = [];

    let iteracion = 1;

    while (iteracion <= interacion_max) {
      let coordenadas_medias = this.punto_medio_triangular(coordenadas_iniciales);
      puntos_medios_calculados.push(coordenadas_medias);
      this.notifySuscribers(coordenadas_medias);
      console.log(coordenadas_medias)
      iteracion++;
      coordenadas_iniciales = coordenadas_medias;
    }
  }
}

export { Triangulacion };
