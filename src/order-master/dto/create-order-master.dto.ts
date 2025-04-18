import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderMasterDto {
@ApiProperty({example: "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv", description: "Buyurtmaning noyob ID raqami"})
@IsString()
@IsNotEmpty()
orderId: string;
}
