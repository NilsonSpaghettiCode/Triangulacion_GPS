import { loadData } from "../DataController.js";
import { settings_map_box } from "../../settings/settings.js";
const Mapbox = window.mapboxgl;
//https://nominatim.openstreetmap.org/reverse?lat=<value>&lon=<value>&<params>

const endpoint_consulta = "https://nominatim.openstreetmap.org/reverse?lat={0}&lon={1}&{2}";

function formatString(template, ...values) {
  return template.replace(/{(\d+)}/g, (match, index) => {
    return typeof values[index] !== "undefined" ? values[index] : match;
  });
}
/**
 * 
 * @param {*} latitud 
 * @param {*} longitude 
 * @returns 
 */
async function getGeoData(latitud, longitude) {
  let geodata = {}
  let params = `format=${settings_map_box.format}`

  let query = formatString(endpoint_consulta, latitud, longitude, params)
  geodata = await loadData(query)
  return geodata
}

export {getGeoData}
