import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateArticleDto } from "./dto";
import { UpdateArticleDto } from "./dto";
import { GeneralResponseMessageType } from "src/common/src/exception/general-type";
import { SUCCESS_RESPONSE } from "src/common/src/exception/success-response";

import { Article } from "@prisma/client";

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createArticleDto: CreateArticleDto
  ): Promise<GeneralResponseMessageType> {
    try {
      const { teamId, images, ...rest } = createArticleDto;

      // Check if the Team exists
      const teamExists = await this.prisma.team.findUnique({
        where: { id: teamId },
      });

      if (!teamExists) {
        throw new InternalServerErrorException(
          `Team with ID ${teamId} not found`
        );
      }

      await this.prisma.article.create({
        data: {
          ...rest,
          images: images || "", // Ensure images is always defined
          team: {
            connect: { id: teamId }, // Connect the article to the existing team
          },
        },
      });

      return SUCCESS_RESPONSE.SUCCESS_CREATE_ARTICLE;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error creating article");
    }
  }

  async findAll(): Promise<GeneralResponseMessageType | Article[]> {
    try {
      return await this.prisma.article.findMany({
        include: {
          team: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error fetching articles");
    }
  }

  async findOne(id: number): Promise<GeneralResponseMessageType | Article> {
    try {
      const article = await this.prisma.article.findFirst({
        where: { id },
      });
      if (!article)
        throw new InternalServerErrorException("Error fetching article");
      return article;
    } catch (error) {
      throw new InternalServerErrorException("Error fetching article");
    }
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto
  ): Promise<GeneralResponseMessageType | Article> {
    try {
      await this.prisma.article.update({
        where: { id },
        data: {
          ...updateArticleDto,
          teamId: Number(updateArticleDto.teamId),
        },
      });
      return SUCCESS_RESPONSE.SUCCESS_UPDATE_ARTICLE;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error updating article");
    }
  }

  async remove(id: number): Promise<GeneralResponseMessageType> {
    try {
      await this.prisma.article.delete({
        where: { id },
      });
      return SUCCESS_RESPONSE.SUCCESS_ARTICLE_DELETE;
    } catch (error) {
      throw new InternalServerErrorException("Error deleting article");
    }
  }
}
