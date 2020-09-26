import * as fs from "fs";
import { logInfo, logError, logCritical } from "../util/logging";

import { Repository, getManager } from "typeorm";
import { AuditEntry } from "../entity/AuditEntry";

export class AuditService {
   
    constructor () {
       
    }

    public async logAudit(message: string, severity: number = 0, ip: string = ""):Promise<void> {
        try {
            let ae: AuditEntry = new AuditEntry;
            ae.timestamp = new Date();
            ae.ip = ip;
            ae.msg = message;
            ae.risk = severity;
            let aeRepository: Repository<AuditEntry> = getManager().getRepository(AuditEntry);
            aeRepository.save(ae);
        } catch (error) {
            logError("Storing audit failed!");
        }
        return;
    }
}
