import { settings_map } from "../settings/settings.js";
import { ISuscriber } from "./interfaces/IObserver.js";
class Map extends ISuscriber {
  constructor(satelites) {
    super();
    this.map = {};
    this.features = [];
    this.satelites = satelites
  }

  update(data) {

  }
  
  initMap(
    lat = settings_map.initial_lat,
    lon = settings_map.initial_lon,
    zoom = settings_map.zoom
  ) {
    this.map = L.map(settings_map.idMap, { maxZoom: settings_map.max_zoom}).setView([lat, lon], zoom);
  }

  setTileLayer(max_zoom = settings_map.zoom) {
    let tile_layer = L.tileLayer(settings_map.urlTemplate, {
      attribution: settings_map.atribution,
    });

    this.addFeature(tile_layer);
  }

  setMarks() {
    for (const satelite of this.satelites) {
      console.log(satelite)
      let contentPopup = "Satelite #" + satelite.numero_satelite +", "+ "Localizacion: [" + satelite.latitud + "," + satelite.longitud + "]" 
      let feature = L.marker([satelite.latitud, satelite.longitud]);
      console.log(satelite.distancia/111.32)
      let circle_feature = L.circle([satelite.latitud, satelite.longitud],{radius:(satelite.distancia)})
      feature.bindPopup(contentPopup)
      this.addFeature(feature)
      this.addFeature(circle_feature)
    }
  }

  setControlScaleMap()
  {
    let control = L.control.scale()
    this.features.push(control)
  }

  addFeature(feature) {
    this.features.push(feature);
  }

  showMap() {
    for (let index = 0; index < this.features.length; index++) {
      let feature = this.features[index];
      feature.addTo(this.map);
    }
  }

  startMap() {
    this.initMap();
    this.setTileLayer();
    this.setMarks();
    this.setControlScaleMap()


    this.showMap();
    
  }
}

export { Map };
