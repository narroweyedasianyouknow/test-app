import { memo } from "react";
import useStore from "../../store";
import { getPaginationPages } from "./getPaginationPages";
import css from "./Pagination.module.css";

export const Pagination = memo(() => {
      const { maxPage, page, setPage } = useStore();
      const list = getPaginationPages(maxPage, page);

      return (
            <div className={css.wrapper}>
                  <Button onClick={() => setPage(page - 1)}>Назад</Button>
                  {list.map((value) => (
                        <Button
                              key={value}
                              onClick={() => setPage(value)}
                              active={page === value}
                        >
                              {value}
                        </Button>
                  ))}
                  <Button onClick={() => setPage(page + 1)}>Далее</Button>
            </div>
      );
});

interface IButton {
      children: React.ReactNode;
      active?: boolean;
      onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const Button: React.FC<IButton> = (props) => {
      const { children, active, onClick } = props;
      return (
            <button
                  className={css.button}
                  onClick={onClick}
                  data-active={active ? "active" : ""}
            >
                  {children}
            </button>
      );
};
