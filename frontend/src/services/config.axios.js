import Qs from 'qs';
import http from 'http';
import https from 'https'
import Axios from "axios";
import SessionStorage from "./storage/session"
import Config from "../utils/config";

let { host }= Config;
let { serve, port } = host;
let baseURL = '';
let token = SessionStorage.getToken();
let CancelToken = Axios.CancelToken; 

// development
//baseURL = serve + port + '/api/';
// production
baseURL = '/api/';

export default Axios.create(
  {
    
      // `baseURL` se antepondrá a` url` a menos que `url` sea absoluto.
     // Puede ser conveniente configurar `baseURL` para que una instancia de axios pase URL relativas
     // a los métodos de esa instancia.
    baseURL,
    // `encabezados` son encabezados personalizados para enviar
    headers: {
      'Access':'application/json',
      'Content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authenticate': token
    },

    // `transformRequest` permite cambios en los datos de la solicitud antes de enviarlos al servidor
    // Esto solo es aplicable para los métodos de solicitud 'PUT', 'POST', 'PATCH' y 'DELETE'
    // La última función en la matriz debe devolver una cadena o una instancia de Buffer, ArrayBuffer,
    // FormData o Stream
    // Puedes modificar el objeto de encabezado.
    
   /* 
    transformRequest: [function (data, headers) {
      // Haz lo que quieras para transformar los datos
      console.log( 
      {
        'msg:': 'config.axios Request',
        'headers: ': headers,
        'data: ':  data
      })
      return data;
    }],
    */

    // `transformResponse` permite realizar cambios en los datos de respuesta antes de
    // se pasa a entonces / catch
   /* 
    transformResponse: [function (data, headers) {
      console.log(
      {
        'msg: ': 'config.axios Response',
        'headers: ': headers,
        'data: ':  data
      })
      return data;
    }],
    /*

    // `params` son los parámetros de URL que se enviarán con la solicitud
    // Debe ser un objeto simple o un objeto URLSearchParams
    /*
    params: {
      ID: 12345
    },
    */

    // `paramsSerializer` es una función opcional encargada de serializar` params`
    // (por ejemplo, https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    /*
    paramsSerializer: function (params) {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
    */
    // `data` son los datos que se enviarán como el cuerpo de la solicitud
    // Solo aplicable para los métodos de solicitud 'PUT', 'POST' y 'PATCH'
    // Cuando no se establece `transformRequest`, debe ser de uno de los siguientes tipos:
    // - cadena, objeto plano, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - Solo navegador: FormData, File, Blob
    // - Solo nodo: Stream, Buffer
    
    /*data: {
      firstName: 'Fred'
    },*/
  
      // alternativa de sintaxis para enviar datos al cuerpo
     // método de publicación
     // solo se envía el valor, no la clave

    //data: 'Country=Brasil&City=Belo Horizonte',

      // `timeout` especifica el número de milisegundos antes de que la solicitud agote el tiempo de espera.
     // Si la solicitud lleva más tiempo que `timeout`, la solicitud se cancelará.
    
    //timeout: 1000, // default is `0` (no timeout)

      // `withCredentials` indica si las solicitudes de control de acceso entre sitios o no
     // debe hacerse con credenciales
    
    //withCredentials: false, // default

    // `adaptador` permite el manejo personalizado de solicitudes, lo que facilita las pruebas.
    // Devuelve una promesa y proporciona una respuesta válida (ver lib / adapters / README.md).
    /*
    adapter: function (config) {
      
    },
    */
      // `auth` indica que se debe usar la autenticación básica HTTP y proporciona credenciales.
     // Esto establecerá un encabezado `Autorización`, sobrescribiendo cualquier existente
     // Encabezados personalizados de `Autorización` que ha establecido usando` encabezados`.
     // Tenga en cuenta que solo la autenticación HTTP básica es configurable a través de este parámetro.
     // Para los tokens de portador y similares, utilice en su lugar los encabezados personalizados `Autorización`.
    /*
    auth: {
      username: 'janedoe',
      password: 's00pers3cret'
    },
    */
    // `Authorization` 

    // `responseType` indica el tipo de datos con los que el servidor responderá
    // las opciones son: 'arraybuffer', 'document', 'json', 'text', 'stream'
    // solo navegador: 'blob'
    //responseType: 'json', // default

    // `responseEncoding` indica la codificación a usar para decodificar respuestas
     // Nota: Ignorado para `responseType` de 'stream' o solicitudes del lado del cliente
    //responseEncoding: 'utf8', // default

    // `xsrfCookieName` es el nombre de la cookie que se utilizará como valor para el token xsrf
    //xsrfCookieName: 'XSRF-TOKEN', // default

    // `xsrfHeaderName` es el nombre del encabezado http que lleva el valor del token xsrf
    //xsrfHeaderName: 'X-XSRF-TOKEN', // default

    /*
    // `onUploadProgress` permite el manejo de eventos de progreso para cargas
    onUploadProgress: function (progressEvent) {
      // Haz lo que quieras con el evento de progreso nativo
    },

    // `onDownloadProgress` permite el manejo de eventos de progreso para descargas
    onDownloadProgress: function (progressEvent) {
      // Haz lo que quieras con el evento de progreso nativo
    },
    */

    // `maxContentLength` defines the max size of the http response content in bytes allowed
    
    //maxContentLength: 2000,

    // `validateStatus` define si se debe resolver o rechazar la promesa de un determinado
     // Código de estado de respuesta HTTP. Si `validateStatus` devuelve` true` (o se establece en `null`
     // o `undefined`), la promesa se resolverá; de lo contrario, la promesa será
     // rechazado.
    /*
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },
    */

    // `maxRedirects` define el número máximo de redireccionamientos a seguir en node.js.
     // Si se establece en 0, no se seguirán redireccionamientos.
    
    //maxRedirects: 5, // default

      // `socketPath` define un Socket UNIX para ser usado en node.js.
     // p.ej. '/var/run/docker.sock' para enviar solicitudes al demonio docker.
     // Solo se puede especificar `socketPath` o` proxy`.
     // Si se especifican ambos, se usa `socketPath`.
    
    //socketPath: null, // default


    // `httpAgent` y` httpsAgent` definen un agente personalizado que se utilizará al realizar http
    // y solicitudes https, respectivamente, en node.js. Esto permite agregar opciones como
    // `keepAlive` que no están habilitados por defecto.
    
    //httpAgent: new http.Agent({ keepAlive: true }),
    //httpsAgent: new https.Agent({ keepAlive: true }),
    


    // 'proxy' define el nombre de host y el puerto del servidor proxy.
    // También puedes definir tu proxy usando el `http_proxy` convencional y
    // Variables de entorno `https_proxy`. Si está utilizando variables de entorno
    // para su configuración de proxy, también puede definir un entorno `no_proxy`
    // variable como una lista de dominios separados por comas que no deben ser proxy.
    // Use `false` para deshabilitar proxies, ignorando las variables de entorno.
    // `auth` indica que se debe usar la autenticación HTTP básica para conectarse al proxy, y
    // suministra credenciales.
    // Esto establecerá un encabezado `Proxy-Authorization`, sobrescribiendo cualquier existente
    // Encabezados personalizados `Proxy-Authorization` que ha establecido usando` encabezados`.
    /*proxy: {
      host: '127.0.0.1',
      port: 9000,
      auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
      }
    },*/

    // `cancelToken` specifies a cancel token that can be used to cancel the request
    // (see Cancellation section below for details)
    /*
    cancelToken: new CancelToken(function (cancel) {

    })
    */
  }
);