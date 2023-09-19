let settings_map = {
  idMap: "map",
  max_zoom: 18,
  zoom: 4,
  urlTemplate: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  atribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  initial_lat: 39.07022405174613,
  initial_lon: 35.73370268964278,
  radius_circle: 70000,
  clickLatLen: true,
};

let settings_map_box = {
  format: "geojson",
};

let settings_dom = {
  id_iteraciones_max: "iteraciones_totales",
  id_iteracion_i: "iteraciones_actuales",
  btn_start: "Start",
  btn_reset: "Reset",
  id_costo: "costo",
  id_table_data: "table_data",
  id_unidad: "unidad",
  id_velocidad_base: "velocidad_base",
  state_localizacion: "state_localizacion",
  localizacion: "localizacion",
  runtime: "runtime",
  lugar_cercano: "lugar_cercano",
  ciudad: "ciudad",
  pais: "pais",
};

export { settings_map, settings_map_box, settings_dom };
