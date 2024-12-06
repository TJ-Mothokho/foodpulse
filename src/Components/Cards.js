import React from 'react';
import { Card, Button } from 'react-bootstrap';

// This is a reusable card component
function CustomCards({ data, renderCard }) {
  return (
    <div className="d-flex flex-wrap">
      {data.map((item, index) => (
        <Card key={index} className="m-2" style={{ width: '18rem' }}>
          <Card.Body>
            {renderCard(item)}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default CustomCards;

// Example usage:
// <CustomCards data={[{ name: 'Dept A' }]} renderCard={(item) => (<><Card.Title>{item.name}</Card.Title></>)} />
