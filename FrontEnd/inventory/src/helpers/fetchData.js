//funciona muy bien para gets pero para post esto es una mierda
const getSuspender = (promise) => {
    let status = 'pending';
    let response;
  
    const suspender = promise.then(
      (res) => {
        status = 'success';
        response = res;
      },
      (err) => {
        status = 'error';
        response = err;
      }
    );
  
    const read = () => {
      switch (status) {
        case "pending":
          throw suspender;
        case "error":
          throw response;
        default:
          return response;
      }
    };
  
    return { read };
  };
  export function fetchData(url, options = {}) {
    const promise = fetch(url, options)
      .then((response) => response.json())
      .then((data) => data);
    console.log(promise);
    return getSuspender(promise);
  }