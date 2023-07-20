import { create } from "zustand";
import { PostsAPI } from "./api";

/** Чтобы при разработке несколько запросов */
const isFetched = {
      value: false,
};
/** Элементы которые отображаются на странице */
const RENDER_LIMIT = 10;

export type Post = {
      userId: number;
      id: number;
      title: string;
      body: string;
};
type Store = {
      page: number;
      maxPage: number;
      search: string;
      posts: Post[];
      list: Post[];
      sort: {
            from: keyof Post;
            by: "asc" | "desc";
      };
      fetch: () => Promise<void | false>;
      setPage: (value: number) => void;
      setConfig: (config: Partial<Store>) => void;
};

/** Возвращяет функцию для сортировки Post */
function sortComparer({ by, from }: Store["sort"]) {
      return function (a: Post, b: Post) {
            const first = a[from];
            const second = b[from];
            if (typeof first === "number" || typeof second === "number") {
                  if (by == "asc") return first > second ? 1 : -1;
                  else return first < second ? 1 : -1;
            }
            if (by == "asc") return first.localeCompare(second);
            else return second.localeCompare(first);
      };
}

/** Возвращяет 10 постов, которых нужно рендерить */
function postsFilter(
      posts: Post[],
      page: number,
      sort: Store["sort"],
      search?: string
) {
      const offset = page * RENDER_LIMIT - RENDER_LIMIT;
      const value = {
            items: posts,
      };
      if (search || search?.length) {
            value.items = posts.filter(({ title, body }) => {
                  const isIncludes =
                        title.search(new RegExp(search, "g")) ||
                        body.search(new RegExp(search, "g"));

                  return isIncludes > -1;
            });
      }
      return value.items
            .sort(sortComparer(sort))
            .slice(offset, offset + RENDER_LIMIT);
}
const useStore = create<Store>()((set, get) => ({
      posts: [],
      list: [],
      search: "",
      sort: {
            by: "asc",
            from: "id",
      },
      page: 1,
      maxPage: 0,
      fetch: async () => {
            if (isFetched.value) return false;
            isFetched.value = true;
            const posts = await new PostsAPI().getPosts();
            const { page, sort, search } = get();
            const filter = postsFilter(posts, page, sort, search);
            const maxPage = posts.length / RENDER_LIMIT;
            return set({ posts, list: filter, maxPage });
      },
      setPage: (page: number) => {
            const { posts, sort, maxPage, search } = get();
            if (page < 1) page = 1;
            if (page > maxPage) page = maxPage;
            const filter = postsFilter(posts, page, sort, search);
            set({ page, list: filter });
      },
      setConfig: ({ search, sort }) => {
            const { page, posts, ...store } = get();

            const filter = postsFilter(
                  posts,
                  page,
                  sort || store.sort,
                  search || store.search
            );
            set({ page, list: filter, search, sort });
      },
}));

export default useStore;
