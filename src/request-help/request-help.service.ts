import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RequestHelpDto } from './dto/create-request-help.dto';
import { UpdateRequestHelpDto } from './dto/update-request-help.dto';
import { GeneralResponseMessageType } from 'src/common/src/exception/general-type';
import { SUCCESS_RESPONSE } from 'src/common/src/exception/success-response';
import { FailCreateRequestHelpException, FailDeleteRequestHelpException, FailToFindRequestHelpException, FailUpdateRequestHelpException } from 'src/common/src/exception/general-exception';
import { RequestHelp } from '@prisma/client';

@Injectable()
export class RequestHelpService {
  constructor(private prisma: PrismaService) {}

  async create(createRequestHelpDto: RequestHelpDto): Promise<GeneralResponseMessageType> {
    try {
      await this.prisma.requestHelp.create({
        data: {
          ...createRequestHelpDto,
          townshipId: Number(createRequestHelpDto.townshipId),
          cityId: Number(createRequestHelpDto.cityId),
        location: createRequestHelpDto.location,
        note: createRequestHelpDto.note || '', 
        adminReply: createRequestHelpDto.adminReply || '' 
        }
      })
      return SUCCESS_RESPONSE.SUCCESS_CREATE_REQUEST_HELP
    } catch (error) {
      throw new FailCreateRequestHelpException()
    }
  }

  async findAll(): Promise<GeneralResponseMessageType | RequestHelp[]> {
    try {
      const requestHelps = await this.prisma.requestHelp.findMany();
      return requestHelps;
    } catch (error) {
      throw new FailToFindRequestHelpException();
    }
  }

  async findOne(id: number) {
    try {
      return this.prisma.requestHelp.findFirst({ where: { id: id } });
    } catch (error) {
      throw new FailToFindRequestHelpException()
    }
  }

  async update(id: number, updateRequestHelpDto: UpdateRequestHelpDto) {
    try {
      await this.prisma.requestHelp.update({
        where: {
          id: Number(id)
        },
         data: {
          ...updateRequestHelpDto,
          townshipId: Number(updateRequestHelpDto.townshipId),
          cityId: Number(updateRequestHelpDto.cityId)
         }
      })
      return SUCCESS_RESPONSE.SUCCESS_UPDATE_REQUEST_HELP
    } catch (error) {
      throw new FailUpdateRequestHelpException()
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.requestHelp.delete({ where: { id } });
      return SUCCESS_RESPONSE.SUCCESS_DELETE_REQUEST_HELP;
    } catch (error) {
      throw new FailDeleteRequestHelpException()
    }
  }
}