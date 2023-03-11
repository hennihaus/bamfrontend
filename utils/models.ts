import {TeamQuery} from "@hennihaus/bamconfigbackend";

export enum MessageType {
    POSITIVE = "positive",
    NEGATIVE = "negative",

    WARNING = "warning",
}

export enum RatingLevel {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
    H = "H",
    I = "I",
    J = "J",
    K = "K",
    L = "L",
    N = "N",
    O = "O",
    P = "P",
}

export enum TeamType {
    EXAMPLE = "EXAMPLE",
    REGULAR = "REGULAR",
}

export enum IntegrationStep {
    FIRST = 1,
    SECOND = 2,
    THIRD = 3,
}

export type HasPassed = "PASSED" | "NOT_PASSED";
export type TeamFormQuery = Omit<TeamQuery, "limit" | "hasPassed"> & { hasPassed?: HasPassed };

export type Statistics = { [key: string]: number };
export type Statistic = {
    bank: string;
    requests: number;
    percentage: number;
    hasPassed: boolean;
}
