import { createContext, useState} from "react"

export const hobbiesContext = createContext()

const HobbiesDataProvider = ({children}) =>{
    const [hobbies,setHobbies] = useState([
        {id:1,name:"Sports"},
        {id:2,name:"Travelling"},
        {id:3,name:"Music"}
    ])
    return(
        <hobbiesContext.Provider value={hobbies}>
            {children}
        </hobbiesContext.Provider>
    )
}
export default HobbiesDataProvider