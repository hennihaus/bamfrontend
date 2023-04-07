import { Bank, Team } from "@hennihaus/bamconfigbackend";
import { InjectionKey } from "@vue/runtime-core";
import { Ref } from "@vue/reactivity";

export const TEAM = Symbol() as InjectionKey<Ref<Team>>;
export const BANKS = Symbol() as InjectionKey<Ref<Bank[]>>;
