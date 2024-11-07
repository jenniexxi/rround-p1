import { APIResponse, axiosInstance } from './api';
import { SystemUrl } from './urls';

type LoginResp = APIResponse & {};

const SystemAPI = {
  forceLogin: (): Promise<LoginResp> => {
    return axiosInstance
      .post(SystemUrl.forceLogin)
      .then((resp) => resp.data.data)
      .catch((e) => {
        console.error('API Error:', e);
        throw e;
      });
  },
};

export default SystemAPI;
