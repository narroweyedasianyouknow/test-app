import { memo } from "react";
import useStore, { Post } from "../../store";
import css from "./TableHeader.module.css";
import ChevronDownIcon from "../../icons/ChevronDownIcon";

export const TableHeader = memo(() => {
      const {
            sort: { from, by },
            setConfig,
      } = useStore();
      function handleChange (key: keyof Post) {
            const _by = from === key ? by === 'asc' ? 'desc' : 'asc' : 'asc'
            setConfig({ sort: { from: key, by: _by } });

      }
      return (
            <tr className={css.wrapper}>
                  <HeaderItem
                        className={css.id}
                        title="Id"
                        onClick={() => handleChange('id')}
                        active={from === "id" ? by : ""}
                  />
                  <HeaderItem
                        className={css.title}
                        title="Загаловок"
                        onClick={() => handleChange('title')}
                        active={from === "title" ? by : ""}
                  />
                  <HeaderItem
                        className={css.content}
                        title="Описание"
                        onClick={() => handleChange('body')}
                        active={from === "body" ? by : ""}
                  />
            </tr>
      );
});
const HeaderItem: React.FC<{
      className: string;
      title: string;
      active: string;
      onClick: React.MouseEventHandler<HTMLTableCellElement>;
}> = ({ title, active, className, onClick }) => {
      return (
            <th
                  className={css.item + " " + className}
                  onClick={onClick}
                  data-active={active}
            >
                  <span>{title}</span>
                  <ChevronDownIcon />
            </th>
      );
};
