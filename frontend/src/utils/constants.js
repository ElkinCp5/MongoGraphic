import config from'./config';
let { hostname } = window.location;
let production = hostname !== "localhost";
export default {
  //URL_BASE: "http://copol-dev.co/service",
  URL_BASE: production
    ? "http://ec2-18-206-226-161.compute-1.amazonaws.com:3000"
    : ("http://localhost:" + config.host.port),

  URL_LOGIN: "/api/auth",
  URL_DOCUMENTS: 'api/ducuments',
  URL_MUDULES: 'api/modules',
  URL_VALIDAR_CUENTA: "/admin/validar_codigo",
  URL_SOLICITAR_CONTRASENA: "/admin/reset_password",
  URL_CAMBIAR_CONTRASENA: "/admin/change_password",
};
