import { Exclude } from 'class-transformer'

export class BaseEntity {
  id?: string

  @Exclude()
  _id?: string

  @Exclude()
  createdAt?: Date

  @Exclude()
  updatedAt?: Date

  @Exclude()
  deletedAt?: Date

  @Exclude()
  __v?: number
}
