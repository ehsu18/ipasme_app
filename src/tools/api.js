import { getToken, getServerUrl } from "./manageStorage";
// import { serverURL } from "./global";

const API_URL = async () => {
  return (await getServerUrl()) + "api/";
}; //TODO manejar con env

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

async function authToken() {
  // return window.localStorage.getItem('IpasmeRMSUserToken')
  // return "46e3c5275e3ca8d91d99752cd4428ff7fe7e3050";
  const token = await getToken();
  // console.log("api> ", token);
  return token;
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
  const apiUrl = await API_URL();
  if (id !== "") {
    id = "/" + id;
  }
  return await checkResponseCode(
    fetch(apiUrl + RECORD + id, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
  );
}

export async function getInformes() {
  const apiUrl = await API_URL();
  const token = await authToken();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  return checkResponseCode(
    fetch(apiUrl + INFORMES, {
      headers: {
        signal: controller.signal,
        Authorization: `token ${token}`,
      },
    })
  );
}

export async function getInforme(id) {
  const apiUrl = await API_URL();
  const token = await authToken();
  return checkResponseCode(
    fetch(apiUrl + INFORMES + "/" + id, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
  );
}

export async function getInformeCitas(informe_id = "") {
  const apiUrl = await API_URL();
  const token = await authToken();
  if (informe_id === "") {
    throw new Error("Id required");
  }
  return await checkResponseCode(
    fetch(apiUrl + SEARCH_INFORME_CITAS + "/" + informe_id, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
  );
}

export async function getCita(citaId) {
  const apiUrl = await API_URL();
  const token = await authToken();
  return await checkResponseCode(
    fetch(apiUrl + CITAS + "/" + citaId, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
  );
}

export async function postInforme(data) {
  const apiUrl = await API_URL();
  const token = await authToken();
  if (data === undefined) {
    throw new Error("no data received");
  }
  return checkResponseCode(
    fetch(apiUrl + INFORMES, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify(data),
    })
  );
}

export async function postCita(citaData) {
  const apiUrl = await API_URL();
  const token = await authToken();
  if (citaData === undefined) {
    throw new Error("no data received");
  }
  return checkResponseCode(
    fetch(apiUrl + CITAS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify(citaData),
    })
  );
}

export async function putCita(citaId, citaData) {
  const apiUrl = await API_URL();
  const token = await authToken();
  if (citaData === undefined) {
    throw new Error("no data received");
  }
  return checkResponseCode(
    fetch(apiUrl + CITAS + "/" + citaId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify(citaData),
    })
  );
}

export async function deleteCita(citaId) {
  const apiUrl = await API_URL();
  const token = await authToken();
  return checkResponseCode(
    fetch(apiUrl + CITAS + "/" + citaId, {
      method: "DELETE",
      headers: {
        Authorization: `token ${token}`,
      },
    })
  );
}

export async function putInforme(id, data) {
  const apiUrl = await API_URL();
  const token = await authToken();
  if (data === undefined) {
    throw new Error("no data received");
  }
  return checkResponseCode(
    fetch(apiUrl + INFORMES + "/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify(data),
    })
  );
}

export async function deleteInforme(id) {
  const apiUrl = await API_URL();
  const token = await authToken();
  return checkResponseCode(
    fetch(apiUrl + INFORMES + "/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `token ${token}`,
      },
    })
  );
}
