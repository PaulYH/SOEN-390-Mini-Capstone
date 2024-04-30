import React from "react";
import { useNavigate } from 'react-router-dom';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";

const NotificationBoard = () => {
  const navigate = useNavigate();



  return (
    <div className='page_container'>

      <Button style={{ alignSelf:'start' }} className='back-button' onClick={() => navigate('/home')} > Back </Button >

      <div className="header-container">
        <h2>'s Notification Board</h2>
      </div>
        
      <div className='d-flex justify-content-center'>
        <div className="table-container">
            <Table aria-label="Company's Financial Transactions">
              <TableHeader>
                  <TableColumn>Ticket ID</TableColumn>
                  <TableColumn>Title</TableColumn>
                  <TableColumn>Updated Status</TableColumn>
              </TableHeader>
                <TableBody>
                <TableRow>
                  <TableCell>--</TableCell>
                  <TableCell>--</TableCell>
                  <TableCell>--</TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </div>
      </div>
    </div>
  );
}

export default NotificationBoard;

