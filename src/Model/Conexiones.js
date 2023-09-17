import { geomath } from "../util/geomath.js";
class Conexiones {
  constructor(satelite_i, satelite_f) {
    this._distancia = geomath.haversine(
      satelite_i.getLatLon(),
      satelite_f.getLatLon()
    );
    this._satelite_f = satelite_f;
    this._satelite_i = satelite_i;
  }

  get distancia() {
    return this._distancia;
  }

  getSateliteI() {
    return this._satelite_i;
  }
  getSateliteF() {
    return this._satelite_f;
  }
}

export { Conexiones };
