class Satelite {
  /**
   * 
   * @param {*} numero_satelite es un numero del 1 al 3
   * @param {*} distancia Debe estar en metros
   * @param {*} latitud 
   * @param {*} longitud 
   * @param {*} px 
   */
  constructor(numero_satelite, distancia, latitud, longitud, px) {
    this._numero_satelite = numero_satelite;
    this._distancia = distancia;
    this._latitud = latitud;
    this._longitud = longitud;
    this._px = px;
  }
  set px(px)
  {
    this._px = px
  }
  get px() {
    return this._px;
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
}

export { Satelite };
