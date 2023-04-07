import { Student, Team } from "@hennihaus/bamconfigbackend";
import { v4 as uuid } from "uuid";

export const createEmptyTeam = (): Team => ({
  uuid: uuid(),
  type: TeamType.REGULAR,
  username: "",
  password: "",
  jmsQueue: "",
  students: [createEmptyStudent()],
  statistics: {},
  hasPassed: false,
  createdAt: "",
  updatedAt: "",
});

export const createEmptyStudent = (): Student => ({
  uuid: uuid(),
  firstname: "",
  lastname: "",
});
