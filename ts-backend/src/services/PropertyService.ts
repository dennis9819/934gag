import * as fs from "fs";
import { logInfo, logError, logCritical } from "../util/logging";

export interface CnfGlobal {
    auth: CnfAuth;
    host: CnfHost;
    modeDebug: boolean;
}

export interface CnfAuth {
    salt: string;
    activateTokenTimout: number;
    sessionTimeout: number;
    sessionKeep: boolean;
    auditRetentionPolicy: CnfAuthAuditRetPol;
}

export interface CnfAuthAuditRetPol {
    L0: number;
    L1: number;
    L2: number;
    L3: number;
}


export interface CnfHost {
    fqdn: string;
    proto: string;
}

export class PropertyService {
    config!: CnfGlobal;
    constructor (configfile: string) {
        logInfo(`Loading config from ${configfile}`)
        //prep obj
        this.config = <CnfGlobal>{
            modeDebug: false,
            auth:{
                salt: '',
                activateTokenTimout: 5,
                sessionTimeout: 5,
                sessionKeep: true,
                auditRetentionPolicy: {
                    L0: 356,
                    L1: 356,
                    L2: 356,
                    L3: 356
                }
            },
            host: {
                fqdn: "127.0.0.1",
                proto: "http"
            }
        }
        try {
            const schema: CnfGlobal = <CnfGlobal>(JSON.parse(fs.readFileSync(configfile, {encoding:"utf8"})));
            //check Global Properties
            if ('auth' in schema){
                if ('salt' in schema.auth){
                    this.config.auth.salt = schema.auth.salt;
                }else{ throw "Missing property 'salt' in config.auth" }
                if ('activateTokenTimout' in schema.auth){
                    this.config.auth.activateTokenTimout = schema.auth.activateTokenTimout;
                }else{ throw "Missing property 'activateTokenTimout' in config.auth" }
                if ('sessionTimeout' in schema.auth){
                    this.config.auth.sessionTimeout = schema.auth.sessionTimeout;
                }else{ throw "Missing property 'sessionTimeout' in config.auth" }
                if ('sessionKeep' in schema.auth){
                    this.config.auth.sessionKeep = schema.auth.sessionKeep;
                }else{ throw "Missing property 'sessionKeep' in config.auth" }
                if ('auditRetentionPolicy' in schema.auth){
                    if ('L0' in schema.auth.auditRetentionPolicy){
                        this.config.auth.auditRetentionPolicy.L0 = schema.auth.auditRetentionPolicy.L0;
                    }else{ throw "Missing property 'L0' in config.auth.auditRetentionPolicy" }
                    if ('L1' in schema.auth.auditRetentionPolicy){
                        this.config.auth.auditRetentionPolicy.L1 = schema.auth.auditRetentionPolicy.L1;
                    }else{ throw "Missing property 'L1' in config.auth.auditRetentionPolicy" }
                    if ('L2' in schema.auth.auditRetentionPolicy){
                        this.config.auth.auditRetentionPolicy.L2 = schema.auth.auditRetentionPolicy.L2;
                    }else{ throw "Missing property 'L2' in config.auth.auditRetentionPolicy" }
                    if ('L3' in schema.auth.auditRetentionPolicy){
                        this.config.auth.auditRetentionPolicy.L3 = schema.auth.auditRetentionPolicy.L3;
                    }else{ throw "Missing property 'L3' in config.auth.auditRetentionPolicy" }
                }else{ throw "Missing property 'auditRetentionPolicy' in config.auth" }
            }else{ throw "Missing property 'auth' in config." }
            if ('host' in schema){
                if ('fqdn' in schema.host){
                    this.config.host.fqdn = schema.host.fqdn;
                }else{ throw "Missing property 'salt' in host.fqdn" }
                if ('proto' in schema.host){
                    this.config.host.proto = schema.host.proto;
                }else{ throw "Missing property 'activateTokenTimout' in host.proto" }
            }else{ throw "Missing property 'host' in config." }
            if ('modeDebug' in schema){
                this.config.modeDebug = schema.modeDebug;
            }else{ throw "Missing property 'modeDebug' in config." }

        } catch (error) {
            logCritical("Loading config failed");
            logCritical(error)
            process.exit(2);
        }
    }
}

export function loadProperties(configfile: string): void{
    global.cnf = new PropertyService(configfile);
}

export function getProperties(): CnfGlobal{
    return global.cnf.config;
}

export function getBaseURL(): string {
    return `${global.cnf.config.host.proto}://${global.cnf.config.host.fqdn}`
}