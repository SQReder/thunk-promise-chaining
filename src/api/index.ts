import { SampleData } from "../components/sample/sample.model";

class Api {
  fetchData = () =>
    new Promise<SampleData[]>(resolve => {
      setTimeout(() => {
        resolve([{ value: 1 }, { value: 2 }]);
      }, 2000);
    });
}

const api = new Api();

export default api;
