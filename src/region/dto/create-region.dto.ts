import { IsNotEmpty, IsString } from "class-validator"

export class CreateRegionDto {
    @IsNotEmpty()
    @IsString()
    nameRu: string
    @IsNotEmpty()
    @IsString()
    nameUz: string
    @IsNotEmpty()
    @IsString()
    nameEn: string
}
