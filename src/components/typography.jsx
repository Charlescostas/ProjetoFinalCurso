import { Typography } from "@mui/material"
// para manutenção é muito mais prático
export function Tgraphy({...rest}) {
    return (
        <Typography
        variant="h4" 
        fontWeight="bold" 
        marginBottom={-3.5}
        marginLeft="50px"
        {...rest}/>
    )
}