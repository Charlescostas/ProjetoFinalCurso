import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { AlignJustify, MapPinned, Users } from "lucide-react";
import { Tgraphy } from '../../components/dashboard/typography'
import { Helmet } from "react-helmet";
import { MapMak } from '../../components/dashboard/maps'
import {TablePage} from '../../components/dashboard/table'
import styles from "./style.module.css"
import 'leaFlet/dist/leaflet.css'
import { useState } from "react";

export function Dashboard(){
    const [isAcessaMap,setIsAcessaMap] = useState(false)
    const [isAcessaTable,setIsAcessaTable] = useState(true)
    const qtdUsuario = 2;
    const qtdLocais = 3;

    function fAcessaMapTable(mapTable) {
        setIsAcessaMap(false)
        setIsAcessaTable(true)
        
        if (mapTable) {
            setIsAcessaMap(true)
            setIsAcessaTable(false)
        }
    } 

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

                <Grid container spacing={4} maxWidth={"850px"} marginTop={"-30px"} marginLeft={1}>
                    <Grid item md={4} xs={12} >
                        <Card 
                            sx={{height: 120,
                                width: 250,
                                borderRadius: 4,
                                backgroundColor: "#0F0F0F",
                            }}
                            elevation={0}>
                            <CardContent>
                                <Typography color={"#F4F6F4"} marginBottom={-1.0} alignItems="center" marginLeft="30px">Usuários</Typography>
                                <Box className={styles.containerGrid} 
                                    display="flex" flex-direction="row" 
                                    alignItems="center" justifyContent= "space-between"
                                    height= {60} width= {200}>
                                    <Tgraphy className={styles.number} fontSize={36} fontWeight={600}>{qtdUsuario}</Tgraphy>
                                    <Users size={40} className={styles.icon} />
                                </Box>
                            </CardContent>                            
                        </Card>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Card 
                            sx={{height: 120,
                                width: 250,
                                borderRadius: 3,
                                backgroundColor: "#0F0F0F",
                            }}
                            elevation={0}>
                            <CardContent>
                                <Typography color={"#F4F6F4"} marginBottom={-1.0} marginLeft="30px">Locais</Typography>
                                <Box className={styles.containerGrid} 
                                    display="flex" flex-direction="row" 
                                    alignItems="center" justifyContent= "space-between"
                                    height= {60} width= {200}>                                    <Tgraphy className={styles.number} fontSize={36} fontWeight={600}>{qtdLocais} </Tgraphy>
                                    <MapPinned size={40} className={styles.icon} />
                                </Box>
                            </CardContent>                            
                        </Card>
                    </Grid>
                </Grid>

                <Typography variant="h5" color="#000000" marginLeft="90px" marginTop="20px" >Locais</Typography>
                <Typography color="#000000" marginLeft="100px" marginTop="1px" >Listagem das localidades cadastradas</Typography>
                
                <div className={styles.tableLocais}>
                    <MapPinned onClick={() => fAcessaMapTable(true)} />
                    <AlignJustify onClick={() => fAcessaMapTable(false)}/>
                    
                    {isAcessaMap?<MapMak></MapMak>: true}
                    {isAcessaTable?<TablePage></TablePage>: true}
                </div>                
            </div> 
        </>
    )
}