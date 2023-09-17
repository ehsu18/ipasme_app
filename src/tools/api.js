const API_URL = "http://192.168.0.108:8000/api/"; //TODO manejar con env
const RECORD = "record";
const RECORD_AFFILIATES = "record_affiliates";
const RECORD_BENEFICIARYS = "record_beneficiarys";
const CREATE_AFFILIATE = "create_affiliate";
const CREATE_BENEFICIARY = "create_beneficiary";
const FILTER_AFFILIATES = "filter_affiliates";
const FILTER_RECORDS = "filter_records";
const RECORDS_COUNT = "records_count";

const CITAS = "citas";
const RECORD_CITAS = "record_citas";
const CITASODON = "citasodon";
const RECORD_CITASODON = "record_citasodon";

const REPOSOS = "reposos";
const SEARCH_REPOSOS = "search_reposos";
const CUIDOS = "cuidos";
const SEARCH_CUIDOS = "search_cuidos";

const INFORMES = "informes";
const SEARCH_INFORME_CITAS = "search_informe_citas";

function authToken() {
  // return window.localStorage.getItem('IpasmeRMSUserToken')
  return "46e3c5275e3ca8d91d99752cd4428ff7fe7e3050";
}

function checkResponseCode(func) {
  // return func.then((response)=>{
  //   if(response.status === 403 || response.status === 401){
  //     alert('Error de credenciales, deberá ingresar de nuevo.');
  //     window.localStorage.removeItem('IpasmeRMSUserToken');
  //     window.location.href = '/';
  //   }
  //   return response
  // })
  return func;
}

export async function getRecords(id = "") {
  if (id !== "") {
    id = "/" + id;
  }
  return await checkResponseCode(
    fetch(API_URL + RECORD + id, {
      headers: {
        Authorization: `token ${authToken()}`,
      },
    })
  );
}

export function getInformes() {
  return checkResponseCode(
    fetch(API_URL + INFORMES, {
      headers: {
        Authorization: `token ${authToken()}`,
      },
    })
  );
}

export function getInforme(id){
  return checkResponseCode(fetch(API_URL + INFORMES + '/' + id, {
    headers: { 
      Authorization: `token ${authToken()}`
    },
  }))
}

export async function getInformeCitas(informe_id = "") {
  if (informe_id === "") {
    throw new Error('Id required')
  }
  return await checkResponseCode(fetch(API_URL + SEARCH_INFORME_CITAS + '/' +informe_id, {
    headers: {
      Authorization: `token ${authToken()}`
    },
  }));
}

export async function getCita(citaId) {
  return await checkResponseCode(fetch(API_URL + CITAS + "/" + citaId, {
    headers: {
      Authorization: `token ${authToken()}`  
    },
  }));
}

export function postInforme(data){
  if (data === undefined) {
    throw new Error("no data received");
  }
  return checkResponseCode(fetch(API_URL + INFORMES, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${authToken()}`
    },
    body: JSON.stringify(data),
  }))
}

export function postCita(citaData){
  if (citaData === undefined) {
    throw new Error("no data received");
  }
  return checkResponseCode(fetch(API_URL + CITAS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${authToken()}`  
    },
    body: JSON.stringify(citaData),
  }));
}

export function putCita(citaId, citaData){
  if (citaData === undefined) {
    throw new Error("no data received");
  }
  return checkResponseCode(fetch(API_URL + CITAS + '/' + citaId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${authToken()}`  
    },
    body: JSON.stringify(citaData),
  }));
}

export function deleteCita(citaId){
  return checkResponseCode(fetch(API_URL + CITAS + '/' + citaId, {
    method: "DELETE",
    headers: {
      Authorization: `token ${authToken()}`  
    },
  }));
}