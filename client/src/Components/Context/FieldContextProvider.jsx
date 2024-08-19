import { createContext, useState } from "react"


export const FieldContext = createContext()


const FieldDataProvider = ({children}) =>{

    const [FieldData,setFieldData] = useState([
        {id:1,name:"Select Designation"},
        {id:2,name:"Tester"},
        {id:3,name:"Devops Engineer"},
        {id:4,name:"Front End Engineer"},
        {id:5,name:"Back end engineer"},
        {id:6,name:"Software Engineer"},
    ])
    
    return(
       
        <FieldContext.Provider value={FieldData}>
            {children}
        </FieldContext.Provider>
    )
}
export default FieldDataProvider;

