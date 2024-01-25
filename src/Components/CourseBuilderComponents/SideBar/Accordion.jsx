import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div>
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <div
            style={{
              border: '1px solid #ccc',
              padding: '10px',  
              cursor: 'pointer',
              backgroundColor: openIndex === index ? '#f0f0f0' : 'white',
            }}
            onClick={() => handleItemClick(index)}
          >
            {item.title}
          </div>
          {openIndex === index && (
            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
