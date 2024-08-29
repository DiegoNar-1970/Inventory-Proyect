import { createEmployee, createProfile } from "../services/auth";

const urlProfile = "http://localhost:3000/profile";
const urlEmployee = (id) => `http://localhost:3000/employee/?id=${id}`;

export const OnSubmit = (async (data,setLoading,setErrorReq,setResOk) => {
    console.log(data)
    const profile = {
      birthdate: data.birthdate,
      cc: data.cc,
      email: data.email,
      eps: data.eps,
      lastName: data.lastName,
      name: data.name,
      phone: data.phone,
      sex: data.sex,
    };
    setLoading(true);
    setErrorReq([]);
    try {
      const {data:{_id}} = await createProfile(urlProfile, profile);

      const employee = {
        position: data.position,
        area: data.area,
        baseSalary: data.baseSalary,
      };
      await createEmployee(urlEmployee(_id), employee);
      setLoading(false);
      setResOk("El usuario se ha creado exitosamente ✔");
      setErrorReq([]);
      return;

    } catch (err) {
      if (err.response.data.message == "duplicate key") {
        setErrorReq([{ key: '1', value: { message: "Esta persona ya esta registrada"} }]);
        setLoading(false);
        return;
      }

      if (err.response.data.error && typeof err.response.data.error === 'object') {
        const arrError = Object.entries(err.response.data.error).map(([key, value]) => ({
          key,
          value
        }));
        setErrorReq(arrError);
        setLoading(false);
        return;
      }
      setErrorReq([{key:'1',value:{message:err.response.data.message}}]);
      
      setLoading(false);
      return;
    }
  });
