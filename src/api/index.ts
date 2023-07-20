import { Post } from "../store";

class API {
      protected static URI = `${import.meta.env.VITE_BACKEND_URI}/`;

      protected useRequest<ResponseObject>(
            method: string,
            path = "",
            params?: unknown
      ): Promise<ResponseObject> {
            const url = `${API.URI}${path}`;

            const options: RequestInit = {
                  method,
                  headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                  },
                  credentials: "include",
            };

            if (params) {
                  if (params instanceof FormData) options.body = params;
                  else options.body = JSON.stringify(params);
            }

            const request = fetch(url, options).then(async (response) => {
                  if (!response.ok) {
                        throw new Error(`Failed to fetch: ${url}`);
                  }
                  return response.json();
            });
            return request as Promise<ResponseObject>;
      }
}

export class PostsAPI extends API {
      private links = {
            GET_POSTS: "posts",
      };

      getPosts() {
            return this.useRequest<Post[]>("GET", this.links.GET_POSTS);
      }
}
