import { memo } from "react";
import { Post } from "../../store";
import css from "./TableItem.module.css";
export const TableItem: React.FC<Post> = memo((props) => {
      const { body, id, title } = props;
      return (
            <tr className={css.wrapper}>
                  <td className={css.id}>{id}</td>
                  <td className={css.title}>{title}</td>
                  <td className={css.content}>{body}</td>
            </tr>
      );
});
