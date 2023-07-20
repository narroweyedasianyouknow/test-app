import SearchIcon from "../../icons/SearchIcon";
import useStore from "../../store";
import css from "./SearchInput.module.css";

const SearchInput = () => {
      const { setConfig } = useStore();
      const handleChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
            const value = ev.target.value;
            setConfig({
                  search: value,
            });
      };
      return (
            <label className={css.wrapper}>
                  <input
                        placeholder="Поиск"
                        onChange={handleChange}
                        className={css.input}
                  />
                  <SearchIcon className={css.icon} />
            </label>
      );
};

export default SearchInput;
