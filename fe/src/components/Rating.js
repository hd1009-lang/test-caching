import React from 'react';
import PropTypes from 'prop-types'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Rating = ({ value, text,color }) => {
  return (
    <div className='rating'>
      <span style={{color:color}}>
        {value >= 1 ? (
          <BsStarFill />
        ) : value >= 0.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span style={{color:color}}>
        {value >= 2 ? (
          <BsStarFill />
        ) : value >= 1.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span style={{color:color}}>
        {value >= 3? (
          <BsStarFill />
        ) : value >= 2.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span style={{color:color}}>
        {value >= 4 ? (
          <BsStarFill />
        ) : value >= 4.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span style={{color:color}}>
        {value >= 5 ? (
          <BsStarFill />
        ) : value >= 4.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span>{text && text}</span>
    </div>
  );
};
Rating.defaultProps={
  color:'#f8e825'
}
Rating.propTypes={
  value:PropTypes.number.isRequired,
  text:PropTypes.string.isRequired,
  color:PropTypes.string.isRequired,
}
export default Rating;
