import { useEffect, useMemo } from "react";
import useStore from "./store";
import { TableItem } from "./components/TableItem/TableItem";
import { TableHeader } from "./components/TableHeader/TableHeader";
import { Pagination } from "./components/Pagination/Pagination";
import SearchInput from "./components/SearchInput/SearchInput";

function App() {
      const { fetch, list, page, maxPage, sort } = useStore();
      useEffect(() => {
            void fetch();
      }, [fetch]);

      const items = useMemo(() => {
            return list.map((post) => <TableItem key={post.id} {...post} />);
      }, [list]);
      return (
            <>
                  <SearchInput />
                  <table>
                        <thead>
                              <TableHeader />
                        </thead>
                        <tbody>{items}</tbody>
                  </table>
                  <Pagination />
            </>
      );
}

export default App;
