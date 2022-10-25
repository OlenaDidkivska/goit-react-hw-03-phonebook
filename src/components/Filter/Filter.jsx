import { FilterField, FilterLabel, FilterInput } from './Filter.styled';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  return (
    <FilterField>
      <FilterLabel>Find contacts by name </FilterLabel>
      <FilterInput
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={onChange}
        value={value}
      />
    </FilterField>
  );
};

export default Filter;

Filter.prototype = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
