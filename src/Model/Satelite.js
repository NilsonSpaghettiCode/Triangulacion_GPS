class Satelite {
    constructor(numero_satelite, distancia, latitud, longitud) {
      this._numero_satelite = numero_satelite;
      this._distancia = distancia;
      this._latitud = latitud;
      this._longitud = longitud;
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
  