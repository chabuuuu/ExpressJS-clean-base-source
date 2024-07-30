import config from "config";
import cors from "cors";

export class GlobalConfig {
    //Morgan config
    public static readonly morgan= config.get<{
    format: string;
  }>("morgan");
  
  //Helmet config
    public static readonly helmet = config.get<{
    enable: boolean;
  }>("helmet");
  
  //Cors config
    public static readonly cors = config.get<cors.CorsOptions>("cors");
  
  //Server config
    public static readonly server = config.get<{
    port: number;
    host: string;
    api_version: string;
  }>("server");
  
  //Enviroment
    public static readonly enviroment = config.get<string>("enviroment");
  
  //Swagger config
    public static readonly swagger = config.get<{
    enable: boolean;
  }>("swagger");
}