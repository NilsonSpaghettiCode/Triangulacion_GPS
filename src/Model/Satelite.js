import { Coordenada } from "../util/geomath.js";
class Satelite {
  /**
   *
   * @param {*} numero_satelite es un numero del 1 al 3
   * @param {*} distancia Debe estar en metros
   * @param {*} latitud
   * @param {*} longitud
   * @param {*} px
   */
  constructor(numero_satelite, distancia, latitud, longitud) {
    this._numero_satelite = numero_satelite;
    this._distancia = distancia;
    this._latitud = latitud;
    this._longitud = longitud;
    this._conexiones = [];
  }

  valueOf() {
    return this.numero_satelite;
  }

  getConexiones() {
    return this._conexiones;
  }
  agregarConexion(conexion) {
    this._conexiones.push(conexion);
  }

  get conexiones() {
    return this._conexiones;
  }

  // Getter para el número de satélite
  get numero_satelite() {
    return this._numero_satelite;
  }

  // Setter para el número de satélite
  set numero_satelite(numero_satelite) {
    this._numero_satelite = numero_satelite;
  }

  // Getter para la distancia
  get distancia() {
    return this._distancia;
  }

  // Setter para la distancia
  set distancia(distancia) {
    this._distancia = distancia;
  }

  // Getter para la latitud
  get latitud() {
    return this._latitud;
  }

  // Setter para la latitud
  set latitud(latitud) {
    this._latitud = latitud;
  }

  // Getter para la longitud
  get longitud() {
    return this._longitud;
  }

  // Setter para la longitud
  set longitud(longitud) {
    this._longitud = longitud;
  }

  getLatLon() {
    return new Coordenada(this._latitud, this._longitud);
  }

  getLatLonArray() {
    return [this._latitud, this._longitud];
  }
}

export { Satelite };
