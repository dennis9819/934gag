import { PropertyService } from "../services/PropertyService";

declare global {
    namespace NodeJS {
      interface Global {
          cnf: PropertyService
      }
    }
  }