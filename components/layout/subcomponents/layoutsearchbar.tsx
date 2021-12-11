import { useState } from "react";
import styles from './searchbar.module.css'
export const Searchbar = () => {
    const [value, setValue] = useState("");
    
    const handleChange = (event: any) => {
        setValue(event.target.value);
        console.log(event.target.value)
    };

    const handleSubmit = () => {
        console.log(value)
    }

    return (
         
        <input className={styles.input} type="text" onChange={handleChange} placeholder="Search..."/>        
    
    )
}