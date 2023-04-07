import { FetchOptions } from "~/utils/http";

export const useBaseFetch = async <Response>(
  path: string,
  opts?: FetchOptions
) => {
  const config = useRuntimeConfig();
  const isLoading = useIsLoading();

  const { data, error, refresh } = await useFetch<Response>(path, {
    ...opts,
    baseURL: `${config.public.baseURL}/${config.public.baseVersion}`,
    server: false,
    onRequest: (request) => {
      if (!opts?.stopLoading) {
        isLoading.value = true;
      }
      if (opts && opts.query) {
        request.options.query = unref(opts.query);
      }
    },
    onRequestError: () => {
      if (!opts?.stopLoading) {
        isLoading.value = false;
      }
    },
    onResponse: ({ response }) => {
      if (!opts?.stopLoading) {
        isLoading.value = false;
      }
      return response._data;
    },
    onResponseError: () => {
      if (!opts?.stopLoading) {
        isLoading.value = false;
      }
    },
  });

  watchEffect(() => {
    if (error.value) {
      throw createError(error.value);
    }
  });

  return {
    data: data as Ref<Response>,
    refresh,
  };
};
