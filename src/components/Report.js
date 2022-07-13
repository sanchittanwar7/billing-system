import { useState, useEffect } from "react";
import { Table, Row, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Report = () => {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/bill/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  const formatDate = (date) => {
    const length = date.length;
    const year = date.substring(length-4);
    const month = date.substring(length-6, length-4);
    const day = date.substring(0, length-6);
    return `${day}/${month}/${year}`;
  }

  const renderBills = (bills) => {
    return bills.map(bill => (
      <Link to={`/invoice/${bill._id}`}>{bill._id}</Link>   
    ))
  }

  const renderHeader = () => {
    return (
      <thead>
        <tr>
          <th>Date</th>
          <th>Bill IDs</th>
          <th>Total Sale</th>
        </tr>
      </thead>
    );
  };

  const renderRows = Object.keys(records).map((date) => {
    return (
      <tr key={date}>
        <td>{formatDate(date)}</td>
        <td>{renderBills(records[date].bills)}</td>
        <td>{records[date].totalSaleOfTheDay}</td>
      </tr>
    );
  });

  const renderTable = () => {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Table striped bordered hover>
            {renderHeader()}
            <tbody>{renderRows}</tbody>
          </Table>
        </Row>
      </Container>
    );
  };

  return renderTable();
};

export default Report;
