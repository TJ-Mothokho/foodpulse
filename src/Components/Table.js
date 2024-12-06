import React from 'react';
import { Table, Button } from 'react-bootstrap';

// This is a reusable table component
function CustomTable({ headers, data, actions }) {
  return (
    <Table striped bordered hover>
      {/* Table headers */}
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>

      {/* Table rows */}
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header, idx) => (
              <td key={idx}>{row[header]}</td>
            ))}
            {/* Render actions if provided */}
            {actions && <td>{actions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CustomTable;

// Example usage:
// <CustomTable headers={['ID', 'Name']} data={[{ ID: 1, Name: 'John' }]} actions={(row) => <Button>Edit</Button>} />
