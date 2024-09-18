import { NavLink } from 'react-router-dom';

function DaysNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="summary">Summary</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default DaysNav;
