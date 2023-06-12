import "./from-input.styles.scss";
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className='group'>
      <input className='form-input' {...otherProps} />
      {label && ( // if label exists then render the label else dont
        <label
          className={`${
            otherProps.value.lenght ? "shrink" : ""
          } form-input-label`}>
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
