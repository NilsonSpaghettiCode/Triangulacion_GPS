import { settings_dom } from "../../settings/settings.js";
import { getGeoData } from "../services/MapBoxService.js";
class Dom {
  static loadDataTable(data) {
    let table = document.getElementById(settings_dom.id_table_data);
    let trs = table.querySelectorAll("tr");

    for (const element of trs) {
      if (element.children[0].tagName != "TH") {
        element.parentNode.removeChild(element);
      }
    }

    for (let i = 0; i < data.length; i++) {
      const satelite = data[i];
      let row_element_s = this.createRowElementTable(satelite);
      table.appendChild(row_element_s);
    }
  }

  static createRowElementTable(data) {
    let tr_i = document.createElement("tr");

    let td_id = document.createElement("td");
    let td_pais = document.createElement("td");
    let td_ciudad = document.createElement("td");
    let td_proximidad = document.createElement("td");

    td_id.textContent = data.satelite;
    td_pais.textContent = data.pais;
    td_ciudad.textContent = data.ciudad;
    td_proximidad.textContent = data.proximidad;

    tr_i.appendChild(td_id);
    tr_i.appendChild(td_pais);
    tr_i.appendChild(td_ciudad);
    tr_i.appendChild(td_proximidad);
    return tr_i;
  }

  static setIteracion(iteracion) {
    let space_iteracion = document.getElementById(settings_dom.id_iteracion_i);
    space_iteracion.textContent = iteracion;
  }

  static setStateLocalizado(state) {
    let state_localizacion_e = document.getElementById(
      settings_dom.state_localizacion
    );
    state_localizacion_e.textContent = state;
  }
  static setLocalizacion(coordenadas) {
    let localizacion = document.getElementById(settings_dom.localizacion);
    let area = "";
    for (let i = 0; i < coordenadas.length; i++) {
      const coordenada = coordenadas[i];
      area = area.concat(" ", coordenada.toString())
    }
    console.log(coordenadas)
    localizacion.textContent = area
  }
  /**
   * 
   * @param {*} runtime establece el valor en el dom del tiempo de ejecucion del algoritmo en segundos
   */
  static setRuntime(runtime)
  {
    let rm_e = document.getElementById(settings_dom.runtime)
    rm_e.textContent = runtime
  }

  static async setInformacionLocalizacion(Coordenada)
  {
    let ciudad = document.getElementById(settings_dom.ciudad)
    let pais = document.getElementById(settings_dom.pais)
    let lugar_interes = document.getElementById(settings_dom.lugar_cercano)

    let result = await getGeoData(Coordenada.Lat, Coordenada.Lon)
    let data = result.features[0].properties
    let info = data.address

    ciudad.textContent = info.state
    pais.textContent = info.country
    lugar_interes.textContent = data.addresstype.concat(", Mesquita")
    console.log(data)
  }

  static setStart(algoritm) {
    let btn_start = document
      .getElementById(settings_dom.btn_start)
      .addEventListener("click", () => {
        let time_i = 0
        let time_f = 0
        time_i = performance.now()
        algoritm.aprox();
        time_f = performance.now()
        let runtime_minutes = (time_f-time_i)/1000
        Dom.setRuntime(runtime_minutes)
        Dom.setInformacionLocalizacion(algoritm.getLocatedTarget()[0]) //Accede a 1 de las 3 coordenadas

      });
  }
}

export { Dom };
