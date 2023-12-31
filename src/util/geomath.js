/**
 * Const eart radius
 */
const R = 6371000;

class geomath {
  constructor() {}

  static toRadians(value_degree) {
    return value_degree * (Math.PI / 180);
  }

  static toDegree(value_radian) {
    return (value_radian / Math.PI) * 180;
  }

  /**
   *
   * @param {*} coordenada
   * @returns
   */
  static haversine(coordenada_A, coordenada_B) {
    let Lat1 = this.toRadians(coordenada_A.getLatitude());
    let Lon1 = this.toRadians(coordenada_A.getLongitude());

    let Lat2 = this.toRadians(coordenada_B.getLatitude());
    let Lon2 = this.toRadians(coordenada_B.getLongitude());

    let d = 0;
    let lats_2 = (Lat2 - Lat1) / 2;
    let lons_2 = (Lon2 - Lon1) / 2;

    let sin2_lats = Math.pow(Math.sin(lats_2), 2);
    let sin2_lons = Math.pow(Math.sin(lons_2), 2);

    let cosL1 = Math.cos(Lat1);
    let costL2 = Math.cos(Lat2);

    let value_right = cosL1 * costL2 * sin2_lons;
    let intern_add = sin2_lats + value_right;

    let sqrt = Math.sqrt(intern_add);
    let arcsin = Math.asin(sqrt);

    let r2 = 2 * R;

    d = r2 * arcsin;
    return d;
  }
  /**
   *
   * @param {*} coordenada_A
   * @param {*} coordenada_B
   * @returns Retorna una coordenada C resultado de ser el punto medio entre A y B
   */
  static puntoMedio(coordenada_A, coordenada_B) {
    let Lat1 = coordenada_A.getLatitude();
    let Lon1 = coordenada_A.getLongitude();

    let Lat2 = coordenada_B.getLatitude();
    let Lon2 = coordenada_B.getLongitude();

    let latmid = (Lat1 + Lat2) / 2;
    let lonmid = (Lon1 + Lon2) / 2;

    /**
     *     
     * 
    let Lat1 = this.toRadians(coordenada_A.getLatitude());
    let Lon1 = this.toRadians(coordenada_A.getLongitude());

    let Lat2 = this.toRadians(coordenada_B.getLatitude());
    let Lon2 = this.toRadians(coordenada_B.getLongitude());

    let diferenciaLon = Lon2-Lon1
    let sinLat1 = Math.sin(Lat1)
    let sinLat2 = Math.sin(Lat2)
    let sumaSin = (sinLat1+sinLat2)/2
    let Lat3 = Math.atan(sumaSin)
    
    let sincosLonLat = Math.sin(diferenciaLon) * Math.cos(Lat2)
    
    let cos2sin = Math.cos(Lat1) + (Math.cos(Lat2) * Math.sin(diferenciaLon))
    
    let Lon3 = Lon1 + Math.atan2(sincosLonLat, cos2sin)
     * 
     */
    //return new Coordenada(this.toDegree(Lat3), this.toDegree(Lon3))
    return new Coordenada(latmid, lonmid);
  }
  /**
   * 
   * @param {*} latitud 
   * @param {*} longitud 
   * @param {*} distancia 
   * @param {*} angulo 
   * @returns Retorna una cordenada alrededor de una latitud y longitud, usando distancia como Radio
   */
  static coordenada_alredor(latitud, longitud, distancia, angulo)
  {
    //Conversion y nombramiento de varibles
    
    let d = distancia; //Distancia en metros
    let zeta = this.toRadians(angulo); //Angulo en radianes
    let delta = d/R // δ - Delta
    let lat1 = this.toRadians(latitud);
    let lon1 = this.toRadians(longitud);

    //Variables auxiliares

    let sinlat = Math.sin(lat1)
    let coslat = Math.cos(lat1)

    let cos_delta = Math.cos(delta)
    let sin_delta = Math.sin(delta)

    let sin_zeta = Math.sin(zeta)
    let cos_zeta = Math.cos(zeta)


    //Calculo

    let lat2 = Math.asin((sinlat*cos_delta)+(coslat*sin_delta*cos_zeta))
    let lon2 = lon1 + Math.atan2(sin_zeta*sin_delta*coslat,(cos_delta-sinlat*Math.sin(lat2)))

    return new Coordenada(this.toDegree(lat2), this.toDegree(lon2)) 
  }
}

class Coordenada {
  constructor(lat, lon) {
    this._Lat = lat;
    this._Lon = lon;
  }
  getLatitude() {
    return this._Lat;
  }
  getLongitude() {
    return this._Lon;
  }
  get Lat() {
    return this._Lat;
  }

  get Lon() {
    return this._Lon;
  }

  toString()
  {
    return `[${this._Lat} , ${this._Lon}]`
  }

  isEqual(otroObjeto) {
    // Aquí puedes definir la lógica para comparar dos objetos de la clase.
    return this._Lat == otroObjeto.Lat && this._Lon == otroObjeto.Lon;
  }
}

export { R, geomath, Coordenada };
