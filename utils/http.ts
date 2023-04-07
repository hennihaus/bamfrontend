import { Unique } from "@hennihaus/bamconfigbackend";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type FetchOptions = {
  method?: HttpMethod;
  body?: Record<string, any>;
  query?: { [key: string]: any } | Ref<{ [key: string]: any }>;
  watch?: WatchSource[];
  stopLoading?: boolean;
  immediate?: boolean;
};

export const isUsernameUnique = async (
  uuid: string,
  username: string
): Promise<boolean> => {
  const config = useRuntimeConfig();

  const response = await $fetch<Unique>(
    `/teams/${uuid}/unique/username/${username}`,
    {
      baseURL: `${config.public.baseURL}/${config.public.baseVersion}`,
    }
  );
  return response.isUnique;
};

export const isPasswordUnique = async (
  uuid: string,
  password: string
): Promise<boolean> => {
  const config = useRuntimeConfig();

  const response = await $fetch<Unique>(
    `/teams/${uuid}/unique/password/${password}`,
    {
      baseURL: `${config.public.baseURL}/${config.public.baseVersion}`,
    }
  );
  return response.isUnique;
};

export const isJmsQueueUnique = async (
  uuid: string,
  jmsQueue: string
): Promise<boolean> => {
  const config = useRuntimeConfig();

  const response = await $fetch<Unique>(
    `/teams/${uuid}/unique/jmsQueue/${jmsQueue}`,
    {
      baseURL: `${config.public.baseURL}/${config.public.baseVersion}`,
    }
  );
  return response.isUnique;
};

export const isTitleUnique = async (
  uuid: string,
  title: string
): Promise<boolean> => {
  const config = useRuntimeConfig();

  const response = await $fetch<Unique>(
    `/tasks/${uuid}/unique/title/${title}`,
    {
      baseURL: `${config.public.baseURL}/${config.public.baseVersion}`,
    }
  );
  return response.isUnique;
};
