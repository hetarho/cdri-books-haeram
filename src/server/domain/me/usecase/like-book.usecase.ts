import Container, { Service } from 'typedi';
import { IMeRepository, ME_REPOSITORY_TOKEN } from './interface/me.repository.interface';
import { Book } from '@shared/types/book';

@Service()
export class LikeBookUsecase {
  private readonly meRepository: IMeRepository;

  constructor() {
    this.meRepository = Container.get(ME_REPOSITORY_TOKEN);
  }

  async execute(request: LikeBookRequest): Promise<void> {
    return this.meRepository.addLikeBook(request.book);
  }
}

interface LikeBookRequest {
  book: Book;
}
