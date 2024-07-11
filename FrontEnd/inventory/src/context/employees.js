import { createContext } from "react";

export const EmployeeContext=createContext();

export function EmployeeProvider({children}){
    return (
        <EmployeeContext.Provider value={{

        }}>
            {children}
        </EmployeeContext.Provider>
    )
}