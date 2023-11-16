import React from 'react';
import {FixedSizeList} from 'react-window';
import oui from '../../assets/images/oui.jpg';

const MyList = ({data}) => {
  const Row = ({index, style}) => (
    <div style={style}>
      <img
        style={{width: 60, height: 60, marginRight: 10}}
        src={oui}
        alt="oui"
      />
      {data[index]}
    </div>
  );

  return (
    <FixedSizeList
      height={500}
      width={300}
      itemSize={35}
      itemCount={data.length}>
      {Row}
    </FixedSizeList>
    // <div>
    //   {data.map((item, index) => (
    //     <Row key={index} index={index} />
    //   ))}
    // </div>
  );
};

export default MyList;
