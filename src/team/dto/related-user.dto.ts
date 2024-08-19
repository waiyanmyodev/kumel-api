import { AuthUserTypeDto } from "src/common/src/dto/user-type.dto";

export class RelatedUserDto {
  relatedId: number;
  relatedType: string;

  constructor(partial: Partial<AuthUserTypeDto>) {
    this.relatedId = partial.id;
    this.relatedType = partial.type;
  }
}
