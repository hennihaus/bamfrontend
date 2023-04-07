import { Bank, Team } from "@hennihaus/bamconfigbackend";

export const TEAM = Symbol("TEAM") as InjectionKey<Ref<Team>>;
export const BANKS = Symbol("BANKS") as InjectionKey<Ref<Bank[]>>;
