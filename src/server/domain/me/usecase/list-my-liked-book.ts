import { IMeRepository, ME_REPOSITORY_TOKEN } from './interface/me.repository.interface';
import Container, { Service } from 'typedi';
import { Book } from '@shared/types/book';

@Service()
export class ListMyLikedBookUsecase {
  private readonly meRepository: IMeRepository;

  constructor() {
    this.meRepository = Container.get(ME_REPOSITORY_TOKEN);
  }

  async execute(): Promise<Book[]> {
    return this.meRepository.listMyLikedBooks();
  }
}
