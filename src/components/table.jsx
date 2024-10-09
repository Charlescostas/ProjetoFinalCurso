import {
  Paper,Table,TableBody,TableCell,TableRow,
  TableContainer,TableHead,TablePagination

} from '@mui/material';
import {useEffect, useState } from 'react';

const columns = [
  { id: 'local', label: 'Local', minWidth: 100 },
  { id: 'usuario', label: 'Usuário', minWidth: 170 },
];

export function TablePage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [rows,setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  function createData(local, usuario) {
    return {local, usuario};
  }

  useEffect(() => {
    const localidadeStorage = JSON.parse(localStorage.getItem('Localidades'))
    var locais = []

    localidadeStorage.forEach(function (local, i){
       locais[i] = createData(local.local,local.nome) 
    })
    setRows(locais)
  }, [])

  return (
    <Paper sx={{ width: '70%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4, 14, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
