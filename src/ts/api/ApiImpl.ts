import { Api } from './Api.js';
import { stubApi } from './stub-api.js';
import { serverApi } from './server-api.js';
import { USE_STUBS } from './config.js';

let api: Api = USE_STUBS ? stubApi : serverApi;

export { api };
