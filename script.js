import {  Map } from "./src/MapController.js";
import {  loadData } from "./src/DataController.js";
import { Satelite } from "./src/Model/Satelite.js";

async function Main(params) {

    //Load Satelites
    let satelites = await getSatelites()
    console.log(satelites)
    //Aprox Localizacion

    //Load Map
    let mapa = new Map(satelites)
    mapa.startMap()
}

async function getSatelites() {
    let satelites = []
    let result = await loadData("./data/data.json")
    let satelites_json = result.satelites

    for (let i = 0; i< satelites_json.length; i++) {
        let data = satelites_json[i]
        let satelite = new Satelite((i+1),data.distancia, data.lat, data.lon, data.px)
        satelites.push(satelite)
    }
    return satelites
}

Main();