import { SetMetadata } from "@nestjs/common";
import { UserRole } from "./enums";
export let TYPE = "type"

export let Roles = (roles:UserRole[]) => SetMetadata(TYPE, roles)