import { Injectable } from '@nestjs/common';
import { UpdateFileManageDto } from './dto/update-file-manage.dto';
import { Files } from '../upload/entities/upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class FileManageService {
  constructor(
    @InjectRepository(Files) private files: Repository<Files>,
    private utilsService: UtilsService,
  ) {}

  findAll() {
    return this.files.find({
      where: { id: Not('ead9805f-1943-47b6-a2f1-5c101ec1b29e') },
    });
  }

  async findOne(id: string) {
    return await this.files.findOne({ where: { id } });
  }

  async update(id: string, updateFileManageDto: UpdateFileManageDto) {
    return await this.files.update(id, updateFileManageDto);
  }

  async remove(id: string) {
    const file = await this.files.findOne({ where: { id } });
    console.log(file);
    await this.utilsService.deleteOneBlob(file.fileUrl);
    return await this.files.delete(id);
  }
}
