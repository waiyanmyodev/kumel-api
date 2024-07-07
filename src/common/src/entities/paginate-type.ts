export default interface PaginateType<T> {
  status: string
  data: {
    total: number
    totalPage: number
    limit: number
    page: number
    data: T[]
  }
}
