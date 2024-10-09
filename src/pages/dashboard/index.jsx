import { Card, CardContent, Typography } from "@mui/material";
import { Box, Grid, MapPinned, Users } from "lucide-react";
import { Tgraphy } from '../../components/typography'
import { Helmet } from "react-helmet";
import styles from "./style.module.css"
import 'leaFlet/dist/leaflet.css'

export function Dashboard(){
    const qtdUsuario = 2
    const qtdLocais = 3

    return (
        <>  
            <Helmet>
                <title>Dashboard</title>
                <meta
                name="description"
                content="Dashboard com totais cadastrados e listagem de locais"
                />
            </Helmet>

            <div className={styles.container}>
                <div className={styles.containerText}>
                    <Typography variant="h4" color="#000000" marginLeft="50px" marginTop="5px" >Dashboard</Typography>
                </div>

                <div className={styles.containerCard}> 
                    <Card sx={{height: 130, width: 250, borderRadius: 3, }}
                        elevation={0}>
                        <CardContent
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                            }}                          
                        >
                            <Typography color="#4D4D53" marginBottom={-1.0} marginLeft="10px" >Usuários</Typography>
                                <Box className={styles.containerGrid} display="flex" alignItems="center" justifyContent= "space-between" 
                                                      fontSize={36}
                                                      fontWeight={600}
                                >
                                <Tgraphy>{qtdUsuario}</Tgraphy>
                                <Users size={60} color="#00B37E" />
                            </Box>
                        </CardContent>                            
                    </Card>

                    <Card elevation={0}>
                        <CardContent>
                            <Typography color="#4D4D53" marginBottom={-1.0} marginLeft="10px">Locais</Typography>
                            <Box className={styles.containerGrid} display="flex" alignItems="center" justifyContent= "space-between" >
                                <Tgraphy>{qtdLocais}</Tgraphy>
                                <MapPinned size={60} color="#00B37E" />
                            </Box>
                        </CardContent>                            
                    </Card>
                </div>

                <Typography variant="h5" color="#000000" marginLeft="50px" marginTop="10px" >Locais</Typography>
                <Typography color="#000000" marginLeft="60px" marginTop="1px" >Listagem das localidades cadastradas</Typography>
            </div> 
        </>
    )
}