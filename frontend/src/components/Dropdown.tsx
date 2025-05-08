import { DropdownProps } from '../types/props';
import styles from '../css/Dropdown.module.css';

const Dropdown = ({ categories, category, onChange }: DropdownProps) => {
  return (
    <div className={styles.dropdownContainer}>
      <select
        className={styles.categoryDropdown}
        value={category}
        onChange={(evnet) => onChange(evnet.target.value)}
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  )
};

export default Dropdown;