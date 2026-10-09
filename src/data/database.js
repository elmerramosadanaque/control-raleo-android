import Dexie from 'dexie';
import { databaseStores as stores }  from './databaseStores';

const databaseName = import.meta.env.VITE_DB_NAME;
export const database = new Dexie(databaseName);

let storesCreated = {};
stores.forEach((o,i)=>{
    let definition = o.definition;
    if (Boolean(o.indexes?.length > 0)){
        definition = `${definition},${o.indexes.toString()}`;
    }
    
    storesCreated[o.storeName] = definition;
});

database.version(1).stores(storesCreated);