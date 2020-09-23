# 9 3/4 Gag
9 3/4 Gag is an joke sharing website inpired by 9-Gag.

The project is currently a very early dev-stage. 

## Frontend
The frontend is written in Angular9 and is located at ./fisi-gag.
Dev-Server: `ng serve --watch --host 0.0.0.0`

## Backend
The backend is written in TypeScript for node.js
Dev-Server: `tsc && node ./dist/index.ts`

## Database
MariaDB will be used as its main DBMS.
During development, a local sqlite instance will be used.

## Deployment
The application will be developed for docker deployment. 
Currrent state of development will require at least three services:
- at least one backend instance
- nginx, serving html files and loadbalancing api requests
- mariaDB as the main DBMS

Docker-deployment is not implemented yet.

TODO: Detailed Readme