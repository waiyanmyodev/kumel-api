import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { GeneralResponseMessageType } from "src/common/src/exception/general-type";
import { Post } from "@prisma/client";
import { SUCCESS_RESPONSE } from "src/common/src/exception/success-response";
import { BasePaginationQueryDto } from "src/common/src/dto/base-pagination-query.dto";
import { PaginationService } from "src/common/src/helper/pagination.service";
import PaginateType from "src/common/src/entities/paginate-type";

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService, private readonly paginationService: PaginationService) {}

  async create(
    createPostDto: CreatePostDto
  ): Promise<GeneralResponseMessageType> {
    try {
      const { userId } = createPostDto;

      const userExists = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        throw new InternalServerErrorException(
          `User with ID ${userId} not found`
        );
      }

      await this.prisma.post.create({
        data: {
          userId: userId,
          content: createPostDto.content,
          items: createPostDto.items,
          images: createPostDto.images,
          location: createPostDto.location,
          status: createPostDto.status,
          priority: createPostDto.priority,
          type: createPostDto.type,
        },
      });

      return SUCCESS_RESPONSE.SUCCESS_CREATE_POST;
    } catch (error) {
      throw new InternalServerErrorException("Error creating post");
    }
  }

  async findAll(baseQuery: BasePaginationQueryDto): Promise<GeneralResponseMessageType | PaginateType<Post>> {
    try {
      const searchColumns = ['location', 'content', 'items'];
      const result = await this.paginationService.paginate<Post>(
        baseQuery,
        this.prisma.post,
        searchColumns,
        {
          user: {
            select: {
              id: true,
              username: true,
            },
          }
        }
      )
      return result;
    } catch (error) {
      throw new InternalServerErrorException("Error fetching posts");
    }
  }

  async findOne(id: number): Promise<GeneralResponseMessageType | Post> {
    try {
      const post = await this.prisma.post.findFirst({
        where: { id },
      });
      if (!post) throw new InternalServerErrorException("Error fetching post");
      return post;
    } catch (error) {
      throw new InternalServerErrorException("Error fetching post");
    }
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto
  ): Promise<GeneralResponseMessageType | Post> {
    try {
      await this.prisma.post.update({
        where: { id },
        data: {
          ...updatePostDto,
          userId: Number(updatePostDto.userId),
        },
      });
      return SUCCESS_RESPONSE.SUCCESS_UPDATE_POST;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error updating post");
    }
  }

  async remove(id: number): Promise<GeneralResponseMessageType> {
    try {
      await this.prisma.post.delete({
        where: { id },
      });
      return SUCCESS_RESPONSE.SUCCESS_POST_DELETE;
    } catch (error) {
      throw new InternalServerErrorException("Error deleting post");
    }
  }
}
