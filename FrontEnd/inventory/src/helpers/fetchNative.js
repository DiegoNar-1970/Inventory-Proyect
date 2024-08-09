import { fetchData } from "./fetchData.js";

export const fetchEmployees = async (
  setAreaFilter,
  setLoading,
  setError,
  area
) => {
  try {
    const response = await fetchData("http://localhost:3000/employee");
    setAreaFilter(response.filter((employee) => employee.area === area));
    setLoading(false);
  } catch (err) {
    console.log(err);
    setError(err);
    setLoading(false);
  }
};
